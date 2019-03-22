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
})