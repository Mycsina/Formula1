import * as main from "./global.js";

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/circuits/calendar');
    self.displayName = 'Circuits Search';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getCircuits...');
        var composedUri = self.baseUri() + "?year=" + id;
        main.ajaxHelper(composedUri, 'GET', self).done(function (data) {
            console.log(data);
            main.hideLoading();
            self.records(data);
            //self.SetFavourites();
        });
    };
    //--- Internal functions
    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        console.log("sPageURL=", sPageURL);
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
    var dark = JSON.parse(localStorage.getItem("dark")) ? JSON.parse(localStorage.getItem("dark")) : false;
    var grid = JSON.parse(localStorage.getItem("grid")) ? JSON.parse(localStorage.getItem("grid")) : false;
    main.darkToggle(dark);
    main.pagination();
    main.sortTable();
    main.gridToggle(grid);
    ko.applyBindings(new vm());
});
