document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});
if (window.innerWidth >= 880) {
    document.querySelector(".brand-logo").innerHTML = "staff selection commission";
} else {
    document.querySelector(".brand-logo").innerHTML = "SSC";
}
window.addEventListener("resize", ()=>{
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
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
} 
// Get the container element
var btnContainer1 = document.querySelector(".mynav1");

// Get all buttons with class="btn" inside the container
var btns1 = btnContainer1.getElementsByClassName("btn2");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns1.length; i++) {
  btns1[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active1");
    current[0].className = current[0].className.replace(" active1", "");
    this.className += " active1";
  });
} 