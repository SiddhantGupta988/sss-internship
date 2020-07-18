var alert = document.querySelector(".alert")
const list = document.querySelectorAll('.mdc-text-field');

const reader = new FileReader();

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);

  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
  alert.style = "display: none;"
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
})

list.forEach((item) => {
  mdc.textField.MDCTextField.attachTo(item);
});

function hide() {
  alert.style = "display: none;"
}

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

// Get the container element
var btnContainer = document.querySelector(".mynav");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("btn1");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

function update() {
  var url = new URL(window.location.href);
  var mail = url.searchParams.get("email");
  var authtoken = url.searchParams.get("authtoken");
  var name = document.querySelector("#name").value;
  var tel = document.querySelector("#phno").value;
  var gender = document.querySelector(".gender").value;
  var dob = document.querySelector("#dob").value;
    url = `/update/profile/`;
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


function show(){
    document.querySelector('.ipfile').innerHTML="<img class=\"p\" src=\"\">";
    const file = document.querySelector('input[type=file]').files[0];
    document.querySelector(".filename").innerHTML=file.name;
    const p=document.querySelector(".p");
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      p.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }