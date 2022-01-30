import * as main from "./global.js"

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Circuits/Circuit?id=');
    self.displayName = 'Circuit Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.CircuitId = ko.observable('');
    self.CircuitRef = ko.observable('');
    self.ImageUrl = ko.observable('');
    self.Name = ko.observable('');
    self.Country = ko.observable('');
    self.Lat = ko.observable('');
    self.Lng = ko.observable('');
    self.Url = ko.observable('');
    self.Races = ko.observableArray('');
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getDriver...');
        var composedUri = self.baseUri() + id;
        main.ajaxHelper(composedUri, 'GET', self).done(function (data) {
            console.log(data);
            self.CircuitId(data.CircuitId);
            self.CircuitRef(data.CircuitRef);
            self.ImageUrl(data.ImageUrl);
            self.Name(data.Name);
            self.Country(data.Country);
            self.Lat(data.Lat);
            self.Lng(data.Lng);
            self.Url(data.Url);
            self.Races(data.Races)
            main.hideLoading();
            map(self.Lat(), self.Lng());
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
    function map(lat, lng) {
        const map = L.map('map').setView([lat, lng], 13)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            // Só para teste
            accessToken: 'pk.eyJ1IjoibXljc2luYSIsImEiOiJja3lvY3E4ZjMwZzkzMm5veWNmc2RiOTJwIn0.MKFG5e9EjMVfKq9WerC7Mg'
        }).addTo(map);
        let circuitMarker = L.marker([lat, lng]).addTo(map);
        circuitMarker.bindPopup(self.Name());
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
