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
const alert = document.querySelector(".alert");
const list = document.querySelectorAll('.mdc-text-field');

const reader = new FileReader();

document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);

    elems = document.querySelectorAll('select');
    instances = M.FormSelect.init(elems);
    alert.style = "display: none;"
    clock1();
    setInterval(clock1, 1000);
    document.querySelector(".main2").style = "display: none !important;"
    const updatebtn = document.querySelector("#update");
    updatebtn.addEventListener("click", function (event) {
            event.preventDefault();
            var url = new URL(window.location.href);
            var mail = url.searchParams.get("email");
            var authtoken = url.searchParams.get("authtoken");
            var name = document.querySelector("#name").value;
            var tel = document.querySelector("#phno").value;
            var gender = document.querySelector(".gender").value;
            var dob = document.querySelector("#dob").value;
            url = `/update/profile`;
            fetch(url, {
                method: "POST",
                body: new URLSearchParams(`email=${mail}&authtoken=${authtoken}&name=${name}&tel=${tel}&gender=${gender}&dob=${dob}`),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.updatestat == true) {
                        alert.innerHTML = `Profile Updated successfully <sub><i class="close material-icons">close</i></sub> `;
                        alert.style = "background-color: green !important;display: inherit;";
                    } else {
                        alert.innerHTML = `${data.err}`;
                        alert.style = "display: inherit;";
                    }
                })
                .catch((err) => {
                    alert.innerHTML = `${err} plz retry <sub><i class="close material-icons">close</i></sub> `;
                    alert.style = "display: inherit;";
                });
        }
    )

})

list.forEach((item) => {
    mdc.textField.MDCTextField.attachTo(item);
});

function hide() {
    alert.style = "display: none;"
}


function active(id) {
    const present = document.querySelector(`#${id}`)
    var current = document.querySelector(".active");
    current.className = current.className.replace(" active", "");
    present.className += " active";
}

const updatebtn = document.querySelector("#update");
updatebtn.addEventListener("click", function (event) {
        event.preventDefault();
        var url = new URL(window.location.href);
        var mail = url.searchParams.get("email");
        var authtoken = url.searchParams.get("authtoken");
        var name = document.querySelector("#name").value;
        var tel = document.querySelector("#phno").value;
        var gender = document.querySelector(".gender").value;
        var dob = document.querySelector("#dob").value;
        url = `/update/profile`;
        fetch(url, {
            method: "POST",
            body: new URLSearchParams(`email=${mail}&authtoken=${authtoken}&name=${name}&tel=${tel}&gender=${gender}&dob=${dob}`),
        })
            .then((res) => {
                console.log("res")
                res.json()
            })
            .then((data) => {
                if (data.updatestat == true) {
                    alert.innerHTML = `Profile Updated successfully <sub><i class="close material-icons">close</i></sub> `;
                    alert.style = "background-color: green !important;display: inherit;";
                } else {
                    alert.innerHTML = `${data.err}`;
                    alert.style = "display: inherit;";
                }
            })
            .catch((err) => {
                alert.innerHTML = `${err} plz retry <sub><i class="close material-icons">close</i></sub> `;
                alert.style = "display: inherit;";
            });
    }
)


function show() {
    document.querySelector('.ipfile').innerHTML = "<img class=\"p\" src=\"\">";
    const file = document.querySelector('input[type=file]').files[0];
    document.querySelector(".filename").innerHTML = file.name;
    const p = document.querySelector(".p");
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        p.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var secs = date.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + secs + ' ' + ampm;
    return strTime;
}


function clock1() {
    const d = new Date();
    document.querySelector(".date").innerHTML = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    document.querySelector(".time").innerHTML = formatAMPM(new Date());

}


function dashboard() {
    document.querySelector(".main1").style = "display: grid !important;"
    document.querySelector(".main2").style = "display: none !important;"
}

function update() {
    document.querySelector(".main1").style = "display: none !important;"
    document.querySelector(".main2").style = "display: grid !important;"
}
