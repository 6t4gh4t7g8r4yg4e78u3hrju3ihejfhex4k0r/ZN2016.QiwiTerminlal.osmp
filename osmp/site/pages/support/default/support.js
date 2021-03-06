(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            this.isATM = this.interfaceConfig.get('params:index_config:ssk_atm', '') == '1' ? 0 : 1;
            this.terminalText = ['банкомат', 'терминал'];
        },

        paint: function () {
            this.base();

            $.find('[data-name]').forEach((function (el) {
                var data = el.getData('name');
                if (data) {
                    var params = data.split('||');
                    for (var i = 0; i < params.length; i++) {
                        var param = params[i] === 'terminal-id' ? this.paySession.sessionInfo.terminal : this.interfaceConfig.get('params:info:' + params[i]);
                        if (param) {
                            el.html('+=' + param);
                            break;
                        }
                    }
                }
            }).bind(this));
            
            $.find('.trm-type').forEach((function (el) {
                el.html(this.terminalText[this.isATM]);
            }).bind(this));

            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
        },

        _preparation: function (text) {
            return text.replace(/\n/g, '<br />');
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