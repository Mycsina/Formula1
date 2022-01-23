import * as main from "./global.js"

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Seasons/Season?year=');
    self.displayName = 'Season Details';
    self.missing = "./portrait.png";
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Year = ko.observable('');
    self.Races = ko.observableArray('');
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getSeasonDetails...');
        var composedUri = self.baseUri() + id;
        main.ajaxHelper(composedUri, 'GET', self).done(function (data) {
            console.log(data);
            self.Year(data.Year);
            self.Races(data.Races);
            console.log(data.Races);
            main.hideLoading();
        });
    };
    //--- Internal functions
    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    //--- start ....
    main.showLoading();
    var pg = getUrlParameter('year');
    console.log(pg);
    if (pg == undefined)
        self.activate(2021);
    else {
        self.activate(pg);
    }
};

$(document).ready(function () {
    main.darkToggle();
    main.gridToggle();
    ko.applyBindings(new vm());
});
