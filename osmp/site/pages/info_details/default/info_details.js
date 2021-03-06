(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            var tableBody = $('inf-det-table-body');
            var html = '';

            for (var i = 0; i < this._pageRowCount; i++) {
                html +=
                    '<tr>' +
                        '<td><div id="iftb-' + i + '-0"></div></td>' +
                        '<td><div id="iftb-' + i + '-1"></div></td>' +
                        '<td><div id="iftb-' + i + '-2"></div></td>' +
                        '<td><div id="iftb-' + i + '-3"></div></td>' +
                    '</tr>';
            }
            tableBody.html(html);

            this.buttonLeft = new crequire.controls.button.script('scroll-left', { text: 'ПРЕДЫДУЩАЯ' });
            this.buttonLeft.on('click', delegate(this, this._clickLeft));
            this.buttonRight = new crequire.controls.button.script('scroll-right', { text: 'СЛЕДУЮЩАЯ' });
            this.buttonRight.on('click', delegate(this, this._clickRight));

            this.refreshTimeout = null;
            
            this._disableLRButtons();
        },

        destructor: function () {
            clearTimeout(this.refreshTimeout);
            this.base();
        },

        // const
        _pageRowCount: 10,
        _pagesPreLoad: 15,
        _pagesStock: 2,

        _pagesCount: Infinity,
        _currentPage: null,
        _loadedTo: -1,
        _allLoaded: false,
        _nowLoading: false,

        _data: {}, // { (pageNom): [(page) [(row)],...] }

        _clickLeft: function () {
            this._currentPage--;
            if (this._currentPage < 0) {
                this._currentPage = 0;
            }

            $('inf-det-table-body').css('+=minToLeft');

            this._disableLRButtons();
            this._refreshPage();
        },
        _clickRight: function () {
            this._currentPage++;
            if (this._currentPage > this._pagesCount-1) {
                this._currentPage = this._pagesCount-1;
            }
            if (this._currentPage > this._loadedTo) {
                this._currentPage = this._loadedTo;
            }

            $('inf-det-table-body').css('-=minToLeft');

            this._disableLRButtons();
            this._refreshPage();
        },

        _disableLRButtons: function () {
            this.buttonLeft.active(false);
            this.buttonRight.active(false);
        },
        _enableOrDisableLRButtons: function () {
            $('page-number').text((this._currentPage+1).toString());
            this.buttonLeft.active(this._currentPage > 0);
            this.buttonRight.active(this._currentPage < this._loadedTo);

            if (!this._nowLoading && !this._allLoaded && ((this._currentPage + this._pagesStock) > this._loadedTo)) {
                this._nowLoading = true;
                setTimeout(delegate(this, function () {
                    this._getData(this._loadedTo+1, this._loadedTo + 1 + this._pagesPreLoad);
                }), 10);
            }
        },

        _maratlResponce: function (fromVal, toVal, callback) {
            maratl.set('ProvListStartRange', fromVal.toString());
            maratl.set('ProvListEndRange', toVal.toString());
            maratl.set('GetProvList', function (s, e) {
                var xmlDoc = (new DOMParser()).parseFromString(e.value,"text/xml");
                if (xmlDoc.firstChild == null || xmlDoc.firstChild.tagName == 'error') {
                    return callback(null); // ERROR
                }
                var rootNode = xmlDoc.firstChild;
                var dataIsOver = rootNode.attributes['AllProvData'].value == 1;
                var childrens = rootNode.children;
                var child;
                var items = [];

                for (var i=0; i < childrens.length; i++) {
                    child = childrens[i].attributes;
                    items.push([
                        von(child.sName) || '',
                        von(child.jName) || '',
                        (von(child.jDocNum) == null ? '' : ('дог: ' + von(child.jDocNum) + ' ')) +
                            (von(child.jDocDate) == null ? '' : ('от ' + von(child.jDocDate))),
                        von(child.supportPhone)
                    ]);
                }

                function von(attr) {
                    if (attr == null) return null;
                    return attr.value;
                }

                callback({
                    isOver: dataIsOver,
                    list: items
                });
            });
        },
        _getData: function (fromPage, toPage) {
            this._maratlResponce(fromPage*this._pageRowCount, toPage*this._pageRowCount-1, delegate(this, function (data) {
                if (data == null) return; // ERROR

                var i, countI;

                countI = (((data.list.length-1)/this._pageRowCount) | 0) + 1;
                for (i = 0; i < countI; i++) {
                    this._data[i+fromPage] = data.list.slice(i*this._pageRowCount, (i+1)*this._pageRowCount);
                }
                toPage = fromPage + countI - 1;
                this._loadedTo = this._loadedTo < toPage ? toPage : this._loadedTo;

                if (data.isOver && !this._allLoaded) {
                    this._allLoaded = true;
                    this._pagesCount = toPage+1;
                    $('page-count-block').css('+=know-count');
                    $('page-count').text((this._pagesCount).toString());
                }

                if (this._currentPage === null) {
                    this._currentPage = 0;
                    this._refreshPage();
                }

                this._nowLoading = false;
                this._enableOrDisableLRButtons();
            }));
        },

        _refreshPage: function () {
            var newData = this._data[this._currentPage];
            $('inf-det-table-body').css('+=minimize');
            this.refreshTimeout = setTimeout(delegate(this, function () {
                var el, data;
                for (var i = 0; i < this._pageRowCount; i++) {
                    data = newData[i] || ['\u00A0', '\u00A0', '\u00A0', '\u00A0'];
                    for (var j = 0; j < 4; j++) {
                        el = $('iftb-' + i + '-' + j);
                        el.text(data[j]);
                    }
                }
                $('inf-det-table-body').css('-=minimize');

                this._enableOrDisableLRButtons();
            }), 250);
        },

        paint: function () {
            this.base();
            this._getData(0, this._pagesPreLoad);
            emulator.start('info_details_load');
            
            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    this.back();
                    break;
                case 'home':
                    this.exit();
                    break;
            }
        }
    });
});