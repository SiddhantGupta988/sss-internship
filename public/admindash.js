const alert = document.querySelector(".alert");

alert.style = "display: none;"

function hide() {
    alert.style = "display: none;"
}
document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
    elems = document.querySelectorAll('select');
    instances = M.FormSelect.init(elems);
})
const list = document.querySelectorAll('.mdc-text-field');

list.forEach((item) => {
    mdc.textField.MDCTextField.attachTo(item);
  });
if (window.innerWidth >= 880) {
    document.querySelector(".brand-logo").innerHTML = "staff selection commission";
} else {
    document.querySelector(".brand-logo").innerHTML = "SSC";
}

window.addEventListener("resize", () => {
    if (window.innerWidth >= 880) {
        document.querySelector(".brand-logo").innerHTML = "staff selection commission";
    } else {
        document.querySelector(".brand-logo").innerHTML = "SSC";
    }
});

function active(id) {
    const present = document.querySelector(`#${id}`)
    var current = document.querySelector(".active");
    current.className = current.className.replace(" active", "");
    present.className += " active";
}

function compdate() {
    sd=new Date(document.querySelector("#startdate").value);
    ed=new Date(document.querySelector("#enddate").value);
    if(sd>ed){
        alert.innerHTML="End date should be after start date";
        alert.style="display: inherit;"
    }
}

function localtime(time) {
    var hourEnd = timeString.indexOf(":");
    var H = +timeString.substr(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(hourEnd, 3) + ampm;
    return timeString;

}

document.querySelector(".main").style="display: none"
function show() {
    document.querySelector(".main").style="display: grid"
}

function link(){
    const params = new URLSearchParams(document.location.search);
const e = params.get("email");
const a = params.get("authtoken");
console.log(e)
console.log(a)
return `/questions?email=${e}&authtoken=${a}`
}