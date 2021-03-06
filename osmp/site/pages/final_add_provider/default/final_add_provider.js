(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            this._providerName = this.paySession.sessionInfo.addProviderName;
        },

        paint: function () {
            this.base();
            $('payInfo').text(this._providerName);
            this.pageControls.bottomMenu.paint([
                { name: 'home' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'help':
                    this.next('help');
                    break;
                case 'home':
                    this.exit();
                    break;
            }
        }
    });
});