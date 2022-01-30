import * as main from "./global.js"

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Seasons/Season?year=');
    self.extendedUri = ko.observable("http://192.168.160.58/Formula1/api/Statistics/Season?year=");
    self.displayName = 'Season Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Year = ko.observable('');
    self.Races = ko.observableArray('');
    self.Constructors = ko.observable("");
    self.Countries = ko.observable("");
    self.Drivers = ko.observable("");
    self.ConstructorStandings = ko.observableArray("");
    self.DriverStandings = ko.observableArray("");
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getSeasonDetails...');
        var composedUri = self.baseUri() + id;
        main.ajaxHelper(composedUri, 'GET', self).done(function (data) {
            console.log(data);
            self.Year(data.Year);
            self.Races(data.Races);
            main.hideLoading();
        });
        console.log("CALL: getSeasonStats...");
        var compUri = self.extendedUri() + id;
        main.ajaxHelper(compUri, "GET", self).done(function (data) {
            console.log(data);
            self.Constructors(data.Constructors);
            self.Countries(data.Countries);
            self.Drivers(data.Drivers);
            self.ConstructorStandings(data.ConstructorStandings);
            self.DriverStandings(data.DriverStandings);
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
    main.searchToggle();
    ko.applyBindings(new vm());
});
