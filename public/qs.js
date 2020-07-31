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
        if (seconds == 10) {
            window.alert("less than 10secs left save your work")
        } else if (seconds == 0) {
            window.location.href = "/"
        }
        document.querySelector("#counter").innerHTML = ` ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
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

function link() {
    const params = new URLSearchParams(document.location.search);
    const e = params.get("email");
    const a = params.get("authtoken");
    return `/admin/dashboard?auth=true&email=${e}&authtoken=${a}`
}

var alert = document.querySelector(".alert")
document.querySelector(".alert").style = "display: none"

function deleteqs(id) {
    url = `/delete?slno=${id}`;
    fetch(url, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => {
                alert.innerHTML = `${data.err}`;
                alert.style = "display: inherit;";
                setInterval(() => {
                    window.location.reload()
                }, 3000)
        })
.catch((err) => {
    alert.innerHTML = `${err} plz retry <sub><i class="close material-icons">close</i></sub> `;
    alert.style = "display: inherit;";
});
}