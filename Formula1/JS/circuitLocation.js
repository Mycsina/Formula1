import * as main from "./global.js";

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/circuits/locations');
    self.displayName = 'Circuits Locations';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    //--- Page Events
    self.activate = function () {
        console.log('CALL: getCircuitLocations...');
        var composedUri = self.baseUri()
        main.ajaxHelper(composedUri, 'GET', self).done(function (data) {
            console.log(data);
            main.hideLoading();
            self.records(data);
            map();
            //self.SetFavourites();
        });
    };
    //--- Internal functions
    //function map() {
    //    const map = L.map('map');
    //    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //        maxZoom: 18,
    //        id: 'mapbox/streets-v11',
    //        tileSize: 512,
    //        zoomOffset: -1,
    //        // Só para teste
    //        accessToken: 'pk.eyJ1IjoibXljc2luYSIsImEiOiJja3lvY3E4ZjMwZzkzMm5veWNmc2RiOTJwIn0.MKFG5e9EjMVfKq9WerC7Mg'
    //    }).addTo(map);
    //};
    function map() {
        const map = L.map('map').setView([0, 0], 2)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            minZoom: 2,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            // Só para teste
            accessToken: 'pk.eyJ1IjoibXljc2luYSIsImEiOiJja3lvY3E4ZjMwZzkzMm5veWNmc2RiOTJwIn0.MKFG5e9EjMVfKq9WerC7Mg'
        }).addTo(map);
        console.log(self.records()[0].CircuitId)
        for (var i = 0; i < self.records().length; i++) {
            var link = '<a href="circuitDetails.html?id=' + self.records()[i].CircuitId + '">' + self.records()[i].Name + '</a>'
            mapPointer(map, [self.records()[i].Lat, self.records()[i].Lng], link)
        }
    };
    function mapPointer(map, coords, name) {
        let circuitMarker = L.marker(coords).addTo(map);
        circuitMarker.bindPopup(name)
    }

    //--- start ....
    main.showLoading();
    self.activate()
};



$(document).ready(function () {
    main.darkToggle();
    ko.applyBindings(new vm());
});
