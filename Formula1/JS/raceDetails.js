import * as main from "./global.js"

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Races/Race?id=');
    self.displayName = 'Race Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.RaceId = ko.observable('');
    self.Circuit = ko.observable('');
    self.Year = ko.observable('');
    self.Name = ko.observable('');
    self.Round = ko.observable('');
    self.Date = ko.observable('');
    self.Time = ko.observable('');
    self.Url = ko.observable('');
    self.Results = ko.observableArray("");

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getDriver...');
        var composedUri = self.baseUri() + id;
        main.ajaxHelper(composedUri, 'GET', self).done(function (data) {
            console.log(data);
            self.RaceId(data.RaceId);
            self.Circuit(data.Circuit);
            self.Year(data.Year);
            self.Name(data.Name);
            self.Round(data.Round);
            self.Date(data.Date);
            self.Time(data.Time);
            self.Url(data.Url);
            self.Results(data.Results);
            console.log(self.Results())
            self.Date(self.Date().split("T")[0])
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
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
};

$(document).ready(function () {
    main.darkToggle();
    main.sortTable();
    main.gridToggle();
    main.searchToggle();
    ko.applyBindings(new vm());
});
