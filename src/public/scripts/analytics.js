let load_time = new Date();
let view_duration = 0;
let session = random(7);

fetch("/analytics/init")
        .then((response) => response.text())
        .then(() => {
            
        });

setTimeout(function() {
    view_duration++;
}, 1000);
