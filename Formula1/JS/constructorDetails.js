import * as main from "./global.js"

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Constructors/Constructor?id=');
    self.displayName = 'Constructor Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.ConstructorId = ko.observable('');
    self.ConstructorRef = ko.observable('');
    self.ImageUrl = ko.observable('');
    self.Name = ko.observable('');
    self.Nationality = ko.observable('');
    self.Number = ko.observable('');
    self.Drivers = ko.observable('');
    self.Races = ko.observableArray('');
    self.Url = ko.observable('');

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getDriver...');
        var composedUri = self.baseUri() + id;
        main.ajaxHelper(composedUri, 'GET', self).done(function (data) {
            console.log(data);
            self.ConstructorId(data.ConstructorId);
            self.ConstructorRef(data.ConstructorRef);
            self.ImageUrl(data.ImageUrl);
            self.Name(data.Name);
            self.Nationality(data.Nationality);
            self.Number(data.Number);
            self.Drivers(data.Drivers);
            self.Races(data.Races);
            self.Url(data.Url);
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
    main.searchToggle();
    ko.applyBindings(new vm());
});
