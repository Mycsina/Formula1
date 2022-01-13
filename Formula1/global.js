﻿export function darkToggle(state) {
    console.log(state)
    if (state) {
        $("body").addClass("bg-dark")
        $(".navbar-light").removeClass("navbar-light bg-light").addClass("navbar-dark bg-dark");
        $("#darkToggler").children().removeClass("fa-moon-o").addClass("fa-sun-o");
    }
    $("#darkToggler").click(function () {
        console.log("Dark mode toggled!")
        if (state == true) {
            $("body").removeClass("bg-dark");
            $(".navbar-dark").removeClass("navbar-dark bg-dark").addClass("navbar-light bg-light");
            $("#darkToggler").children().removeClass("fa-sun-o").addClass("fa-moon-o")
            state = false;
        }
        else {
            $("body").addClass("bg-dark")
            $(".navbar-light").removeClass("navbar-light bg-light").addClass("navbar-dark bg-dark");
            $("#darkToggler").children().removeClass("fa-moon-o").addClass("fa-sun-o");
            state = true;
        };
        localStorage.setItem("dark", state);
        // console.log(state)
    })
}

export function ajaxHelper(uri, method, self) {
    self.error(''); // Clear error message
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
            self.error(errorThrown);
        }
    });
}

export function get() {
    return localStorage.getItem("dark");
}