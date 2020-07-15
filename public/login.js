const loader = document.querySelector(".loader");
const login = document.querySelector(".submit");
login.addEventListener("click", function (event) {
  event.preventDefault();
  email = document.querySelector("#email").value;
  password = document.querySelector("#password").value;
  if (password != "" && password.length < 8) {
    alert.innerHTML = `Password length must be atleast 8 <sub><i class="close material-icons">close</i></sub> `;
    alert.style = "display: inherit;";
  } else if (password != "" && password.length > 16) {
    alert.innerHTML = `Password maximum length must be 16 <sub><i class="close material-icons">close</i></sub> `;
    alert.style = "display: inherit;";
  } else if (email != "" && password != "") {
    loader.innerHTML = "sync";
    loader.style.animation = "rotate 3s ease 0s 3";
    email = document.querySelector("#email").value;
    password = document.querySelector("#password").value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      url = `/user/login/`;
      fetch(url, {
        method: "POST",
        body: new URLSearchParams(`email=${email}&password=${password}`),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.loginstat == true) {
            window.location.replace(`/user/login/dashboard?auth=true&email=${email}&authtoken=${password}`);
          } else {
            alert.innerHTML = `${data.err}`;
            alert.style = "display: inherit;";
            loader.innerHTML = "login";
            loader.style.animation = "none";
          }
        })
        .catch((err) => {
          alert.innerHTML = `${err} plz retry <sub><i class="close material-icons">close</i></sub> `;
          alert.style = "display: inherit;";
          loader.innerHTML = "login";
          loader.style.animation = "none";
        });
    }else{
      alert.innerHTML = `Enter valid Email <sub><i class="close material-icons">close</i></sub> `;
    alert.style = "display: inherit;";
    loader.innerHTML = "login";
    loader.style.animation = "none";
    }
    
  } else {
    alert.innerHTML = `Both Email and Password required <sub><i class="close material-icons">close</i></sub> `;
    alert.style = "display: inherit;";
    loader.innerHTML = "login";
    loader.style.animation = "none";
  }
});
