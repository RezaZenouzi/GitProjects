$(document).ready(function () {


    $("#signIn").click(function () {
        var name = $("#name").val();
        var pass = $("#pass").val();
        $.post("/signIn",{name:name,pass:pass},function (data) {
            if (data == "true")
            {
                var url = "/logIn";
                window.open(url, "_blank");
            }
            else
            {
                alert(data.toString());
            }
        })
    });


    $("#signOut").click(function () {
        $.post("/signOut",{signOut:"ok"},function (data) {
            if (data == "true")
            {
                var url = "/";
                window.open(url, "_blank");
            }
            else
            {
                alert(data.toString());
            }
        })
    });


    $("#back").click(function () {
                var url = "/";
                window.open(url, "_blank");
    });


    $("#list").click(function () {
        var url = "/list";
        window.open(url, "_blank");
    });


    $(".btn-edit").click(function () {
        debugger;
        var id = $(this).attr("id");
        var newName = $(".input-name").val();
        $.post("/edit",{id:id,newName:newName},function (data) {

                alert(data.toString());
        })
    });


})