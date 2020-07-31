document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
    elems = document.querySelectorAll('select');
    instances = M.FormSelect.init(elems);
    // var countDownDate = new Date(document.querySelector("#end").value).getTime();
    var countDownDate = new Date()
    countDownDate.setMinutes(countDownDate.getMinutes() + parseInt(document.querySelector("#end").value))
    var countDownDate1 = countDownDate.getTime();
    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate1 - now;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (seconds == 10 & minutes!=0 & hours!=0) {
            alertmsg.innerHTML = "Your running out of time"
            alert.style = "display: inherit"
        } else if (seconds == 0 & hours==0 & minutes==0 ) {
            document.querySelector("#submit").click()
            window.location.href = link();
        }
        document.querySelector("#counter").innerHTML = `${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
    var urls = window.location.href;
    var url = new URL(urls);

    document.getElementsByName("email").value = url.searchParams.get("email");
    document.getElementsByName("authtoekn").value = url.searchParams.get("authtoken");
})
var alert = document.querySelector(".alert1");
var alertmsg = document.querySelector(".alert-msg");

function hide() {
    alert.style.display = "none";
    openFullscreen();
}

function checkEnter(e) {
    e = e || event;
    var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
    return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
}

document.querySelector('form').onkeypress = checkEnter;

function handleVisibilityChange() {
    if (document.hidden) {
        alertmsg.innerHTML = "Dont cheat here";
        alert.style = "display: inherit"
    }
}
document.addEventListener("visibilitychange", handleVisibilityChange, false);


const list = document.querySelectorAll('.mdc-text-field');

list.forEach((item) => {
    mdc.textField.MDCTextField.attachTo(item);
});


function link() {
    const params = new URLSearchParams(document.location.search);
    const e = params.get("email");
    const a = params.get("authtoken");
    return `/user/login/dashboard?auth=true&email=${e}&authtoken=${a}`
}

function page(id,len) {
    var current = document.querySelector(".active");

    current.className = current.className.replace("active", "");
    var present = document.querySelector("#" + id);
    present.className += " active";

    if(present.textContent==len){
        current.setAttribute("disabled", "true");
    }

    var qid = "#qs" + (present.textContent);
    var qs = document.querySelector(qid)
    var pd = document.querySelector(".pd");
    pd.className = pd.className.replace("pd", "visuallyhidden");
    qs.className = qs.className.replace("visuallyhidden", "pd questions");
}

/* View in fullscreen */
function openFullscreen() {
    var elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

function fullscreen() {
    document.querySelector(".conf").style = "display: none;"
}

document.addEventListener('fullscreenchange', (event) => {
    if (!document.fullscreen) {
        document.querySelector(".danger").innerHTML = "Dont escape form fullscreen <br> Inorder to continue this page will load in fullscreen"
        document.querySelector(".conf").style = "display: inherit"
    }
});