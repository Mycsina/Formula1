import * as main from "./global.js"

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Drivers/Driver?id=');
    self.extendedUri = ko.observable("http://192.168.160.58/Formula1/api/Statistics/Driver?id=");
    self.displayName = 'Driver Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.DriverId = ko.observable('');
    self.DriverRef = ko.observable('');
    self.ImageUrl = ko.observable('');
    self.Name = ko.observable('');
    self.Nationality = ko.observable('');
    self.Number = ko.observable('');
    self.Races = ko.observableArray('');
    self.Url = ko.observable('');
    self.Wins = ko.observable('');
    self.RaceNumber = ko.observable('');
    self.Career = ko.observableArray('');
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getDriver...');
        var composedUri = self.baseUri() + id;
        main.ajaxHelper(composedUri, 'GET', self).done(function (data) {
            console.log(data);
            self.DriverId(data.DriverId);
            self.DriverRef(data.DriverRef);
            self.ImageUrl(data.ImageUrl);
            self.Name(data.Name);
            self.Nationality(data.Nationality);
            self.Number(data.Number);
            self.Races(data.Races);
            self.Url(data.Url);
            main.hideLoading();
        });
        console.log('CALL: getDriverStats...');
        var compUri = self.extendedUri() + id;
        main.ajaxHelper(compUri, 'GET', self).done(function (data) {
            console.log(data);
            self.Wins(data.Wins);
            self.RaceNumber(data.Races);
            self.Career(data.Career);
            const labels = [];
            const points = [];
            const positions = [];
            const careerLength = self.Career().length;
            for (var i = careerLength - 1; -1 < i; i--) {
                labels.push(self.Career()[i].Year);
            };
            for (var i = careerLength - 1; -1 < i; i--) {
                points.push(self.Career()[i].Points);
            };
            for (var i = careerLength - 1; -1 < i; i--) {
                positions.push(self.Career()[i].Position)
            };
            const lineData = {
                labels: labels,
                datasets: [{
                    label: "Points",
                    backgroundColor: "rgb(255, 33, 33)",
                    borderColor: "rgb(255, 33, 33)",
                    data: points
                },
                {
                    label: "Position",
                    backgroundColor: "rgb(255,161,38)",
                    borderColor: "rgb(255,161,38)",
                    data: positions
                }]
            };
            const lineConfig = {
                type: "line",
                data: lineData,
                options: {}
            }
            new Chart($("#lineGraph"), lineConfig);
            const pieData = {
                labels: ["Win", "Losses"],
                datasets: [{
                    label: "Win Ratio",
                    data: [self.Wins(), self.RaceNumber() - self.Wins()],
                    backgroundColor: [
                        "rgb(24,148,10)",
                        "rgb(148,6,1)"
                    ],
                    hoverOffset: 4
                }]
            };
            const pieConfig = {
                type: "doughnut",
                data: pieData
            };
            new Chart($("#pieGraph"), pieConfig);
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

function driverStats() {
    $("#statsToggler").click(function () {
        $("#statsModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        })
    });
};

$(document).ready(function () {
    main.darkToggle();
    driverStats();
    main.searchToggle();
    ko.applyBindings(new vm());
});
