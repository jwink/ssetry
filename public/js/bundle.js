


$(document).ready(function() {
    var source = new EventSource('/stream');
    source.addEventListener('message', function(e) {
        console.log(e.data);
    });
    source.addEventListener('open', function(e) {
        console.log('connected');
    });
    source.addEventListener('error', function(e) {
        console.log(e.target.readyState);
    });
    console.log('whattup');
    $("#click-me-button").click(function(e) {
        //console.log(e);
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/ssetest',
            success: function(data) {
                console.log('response from GET: ' + data);
            }
        })
        console.log('button clicked!');
    });
});

