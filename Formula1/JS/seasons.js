import * as main from "./global.js";

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/seasons');
    self.extendedUri = ko.observable("http://192.168.160.58/Formula1/api/Statistics/Champions");
    self.anotherUri = ko.observable("http://192.168.160.58/Formula1/api/Statistics/CChampions")
    self.displayName = 'Seasons List';
    self.error = ko.observable('');
    self.Champions = ko.observableArray("");
    self.CChampions = ko.observableArray("");
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.previousPage = ko.computed(function () {
        return self.currentPage() * 1 - 1;
    }, self);
    self.nextPage = ko.computed(function () {
        return self.currentPage() * 1 + 1;
    }, self);
    self.fromRecord = ko.computed(function () {
        return self.previousPage() * self.pagesize() + 1;
    }, self);
    self.toRecord = ko.computed(function () {
        return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
    }, self);
    self.totalPages = ko.observable(0);
    self.pageArray = function () {
        var list = [];
        var size = Math.min(self.totalPages(), 9);
        var step;
        if (size < 9 || self.currentPage() === 1)
            step = 0;
        else if (self.currentPage() >= self.totalPages() - 4)
            step = self.totalPages() - 9;
        else
            step = Math.max(self.currentPage() - 5, 0);

        for (var i = 1; i <= size; i++)
            list.push(i + step);
        return list;
    };
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getSeasons...');
        var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
        main.ajaxHelper(composedUri, 'GET', self).done(function (data) {
            console.log(data);
            main.hideLoading();
            self.records(data.List);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.PageCount);
            self.totalRecords(data.Total);
            //recordJoiner();
            //self.SetFavourites();
        });
        console.log('CALL: getSeasonStats...');
        main.ajaxHelper(self.extendedUri(), 'GET', self).done(function (data) {
            console.log(data);
            self.Champions(data);
        });
        main.ajaxHelper(self.anotherUri(), "GET", self).done(function (data) {
            console.log(data);
            self.CChampions(data);
            main.hideLoading();
        });
    };
    //--- Internal functions
    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    function recordJoiner() {
        console.log(self.records())
        for (var i = 0; i < self.records().length; i++) {
            if (self.records()[i].Year == self.Champions()[i].Year) {
                self.records()[i].DriverId = self.Champions()[i].DriverId;
                self.records()[i].DriverName = self.Champions()[i].DriverName;
            };
            if (self.records()[i + 8].Year == self.CChampions()[i].Year) {
                self.records()[i + 8].ConstructorId = self.CChampions()[i].ConstructorId;
                self.records()[i + 8].ConstructorName = self.CChampions()[i].ConstructorName;
            };
        };
    };

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
            };
        };

    };

    //--- start ....
    main.showLoading();
    var pg = getUrlParameter('page');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
};



$(document).ready(function () {
    main.darkToggle();
    main.pagination();
    main.sortTable();
    main.gridToggle();
    main.searchToggle();
    ko.applyBindings(new vm());
});
