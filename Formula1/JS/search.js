import * as main from "./global.js";

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Search/All?q=');
    self.blueprintUri = ko.observable('http://192.168.160.58/Formula1/api/Search/')
    self.displayName = 'Search Results';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.query = ko.observable("");
    self.type = ko.observable("");
    //--- Page Events
    self.activate = function (id, type) {
        console.log('CALL: getDrivers...');
        self.query(id);
        self.type(type);
        if (!type) {
            var composedUri = self.baseUri() + id;
        } else {
            var composedUri = self.blueprintUri() + type + "?q=" + id;
        };
        main.ajaxHelper(composedUri, 'GET', self).done(function (data) {
            console.log(data);
            self.records(data);
            main.hideLoading();
            //self.SetFavourites();
        });
    };
    //--- Internal functions
    self.urlHelper = function (id, type) {
        return './' + type + 'Details.html?id=' + id;
    }
    self.urlBuilder = function (type) {
        if (type == "Start") {
            return "?q=" + self.query();
        }
        return "?type=" + type + "&q=" + self.query();
    }
    self.getId = function (context) {
        var keys = Object.keys(context);
        var values = Object.values(context);
        for (var key in keys) {
            if (keys[key].includes("Id")) {
                return values[key];
            };
        };
    };
    self.getSource = function (context) {
        var keys = Object.keys(context);
        var values = Object.values(context);
        for (var key in keys) {
            if (keys[key].includes("Source")) {
                return values[key];
            } else if (type !== null) {
                return type
            }
        };
    };
    self.getText = function (context) {
        var keys = Object.keys(context);
        var values = Object.values(context);
        for (var key in keys) {
            if (keys[key].includes("Text")) {
                return values[key];
            } else if (keys[key].includes("Name")) {
                return values[key]
            };
        };
    };

    //--- start ....
    main.showLoading();
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var q = urlParams.get('q');
    var type = urlParams.get("type")
    console.log(q, type);
    if (!type)
        self.activate(q);
    else {
        self.activate(q, type);
    }
    $(".nav-pills > li > a").each(function () {
        if (this.innerText == type) {
            $(this).addClass("active")
        } else {
            $(this).removeClass("active")
        }
    })
};

$(document).ready(function () {
    main.darkToggle();
    main.pagination();
    main.sortTable();
    main.gridToggle();
    main.searchToggle();
    ko.applyBindings(new vm());
});
