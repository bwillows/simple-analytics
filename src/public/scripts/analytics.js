function random(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

let load_time = new Date();
let view_duration = 0;

let session;
let session_start_token;

fetch("/analytics/init/")
        .then((response) => response.text())
        .then((res) => {
            session = res;
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
