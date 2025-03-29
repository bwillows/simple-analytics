let load_time = new Date().now;
let view_duration = 0;

let session;
let session_start_token;

fetch("/analytics/init/")
        .then((response) => response.text())
        .then((res) => {
            let clientObj = JSON.parse(res);

            session = clientObj.session;
            session_start_token = clientObj.session_start_token;
        });

setTimeout(function() {
    view_duration++;
}, 1000);

window.onbeforeunload = function () {
    fetch("/analytics/terminate/" + "?session=" + session + "?view-duration=" + view_duration)
        .then((response) => response.text())
        .then((res) => {

        });
};
