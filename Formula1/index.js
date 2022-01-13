import * as main from "./global.js"

const API_KEY = "145717df27214780a7986047a583a233"

$(document).ready(function () {
    var dark = JSON.parse(localStorage.getItem("dark")) ? JSON.parse(localStorage.getItem("dark")) : false
    main.darkToggle(dark)
})