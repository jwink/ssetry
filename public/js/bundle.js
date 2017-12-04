


$(document).ready(function() {
    console.log('whattup');
    $("#click-me-button").click(function(e) {
        //console.log(e);
        e.preventDefault();
        console.log('button clicked!');
    });
});

