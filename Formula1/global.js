export function darkToggle(state) {
    console.log(state)
    $("tbody>tr>td").addClass("darken");
    $("tbody>tr>th").addClass("darken");
    if (state) {
        $("body").addClass("bg-dark");
        $(".navbar-light").removeClass("navbar-light bg-light").addClass("navbar-dark bg-dark");
        $("#darkToggler").children().removeClass("fa-moon-o").addClass("fa-sun-o");
        $(".darken").addClass("text-white");
    }
    $("#darkToggler").click(function () {
        console.log("Dark mode toggled!");
        if (state == true) {
            $("body").removeClass("bg-dark");
            $(".navbar-dark").removeClass("navbar-dark bg-dark").addClass("navbar-light bg-light");
            $("#darkToggler").children().removeClass("fa-sun-o").addClass("fa-moon-o");
            $(".darken").removeClass("text-white");
            state = false;
        }
        else {
            $("body").addClass("bg-dark")
            $(".navbar-light").removeClass("navbar-light bg-light").addClass("navbar-dark bg-dark");
            $("#darkToggler").children().removeClass("fa-moon-o").addClass("fa-sun-o");
            $(".darken").addClass("text-white");
            state = true;
        };
        localStorage.setItem("dark", state);
    })
};

export function ajaxHelper(uri, method, self, data) {
    self.error(''); // Clear error message
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
            self.error(errorThrown);
        }
    });

};

export function showLoading() {
    $('#myModal').modal('show', {
        backdrop: 'static',
        keyboard: false
    });
};

export function hideLoading() {
    $('#myModal').on('shown.bs.modal', function (e) {
        $("#myModal").modal('hide');
    })
}

export function get() {
    return localStorage.getItem("dark");
};

export function sortTable() {
    $('th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })
    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index) { return $(row).children('td').eq(index).text() }
}

export function pagination() {
    $(window).resize(function () {
        if (window.matchMedia("(max-width: 460px)").matches) {
            $(".pagination").addClass("pagination-sm")
        } else {
            $(".pagination").removeClass("pagination-sm")
        }
        }
    )
};

export function grid(state) {
    if (state) {
    }
    $("#gridSwitch").click(function () {
        $("#dataTable").addClass("d-none")
    });
};