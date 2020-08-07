$("#enter").on('click', function () {
    $.post("/nameAvailable", {
        name: $("#restaurantName").val(), location: "Boston"
    }, function (data, status) {
        console.log(data)
    });
});

$("#restaurantName").keyup(() => {
    $("#entered-restaurant-name-link").text($("#restaurantName").val().replace(/ /g, '_'))
})

