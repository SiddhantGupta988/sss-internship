const submit = document.querySelector(".submit");
const loader = document.querySelector(".loader");

submit.addEventListener("click", function (event) {
  event.preventDefault();
  loader.innerHTML = "sync";
  loader.style.animation = "rotate 3s ease 0s 3";
  email = document.querySelector("#email").value;
  password = document.querySelector("#password").value;
  cpassword = document.querySelector("#cpassword").value;
  if (password != "" && password.length < 8) {
    alert.innerHTML = `Password length must be atleast 8 <sub><i class="close material-icons">close</i></sub> `;
    alert.style = "display: inherit;";
  } else if (password != "" && password.length > 16) {
    alert.innerHTML = `Password maximum length must be 16 <sub><i class="close material-icons">close</i></sub> `;
    alert.style = "display: inherit;";
  } else if (email == "" || password == "" || cpassword == "") {
    alert.innerHTML = `All fields are required <sub><i class="close material-icons">close</i></sub> `;
    alert.style = "display: inherit;";
    loader.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" style="fill: currentColor" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
    <path d="M5.00003 14V8L3.50003 8V14C3.50003 14.825 4.17503 15.5 5.00003 15.5H15.5C16.325 15.5 17 14.825 17 14V8H15.5V14H5.00003Z" fill="currentColor"/>
    <path d="M6.50001 3.75L7.55001 4.8L9.50001 2.85V10.5H11V2.85L12.95 4.8L14 3.75L10.25 1.2517e-06L6.50001 3.75Z" fill="currentColor"/>
    </g>
    <defs>
    <clipPath id="clip0">
    <rect width="18" height="18" fill="white" transform="translate(18) rotate(90)"/>
    </clipPath>
    </defs>
    </svg>`;
    loader.style.animation = "none";
  } else if (password != cpassword) {
    alert.innerHTML = `Both Passwords should be same <sub><i class="close material-icons">close</i></sub> `;
    alert.style = "display: inherit;";
    loader.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" style="fill: currentColor" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
    <path d="M5.00003 14V8L3.50003 8V14C3.50003 14.825 4.17503 15.5 5.00003 15.5H15.5C16.325 15.5 17 14.825 17 14V8H15.5V14H5.00003Z" fill="currentColor"/>
    <path d="M6.50001 3.75L7.55001 4.8L9.50001 2.85V10.5H11V2.85L12.95 4.8L14 3.75L10.25 1.2517e-06L6.50001 3.75Z" fill="currentColor"/>
    </g>
    <defs>
    <clipPath id="clip0">
    <rect width="18" height="18" fill="white" transform="translate(18) rotate(90)"/>
    </clipPath>
    </defs>
    </svg>`;
    loader.style.animation = "none";
  } else {
    const url = `/signup/user`;
    fetch(url, {
        method: "POST",
        body: new URLSearchParams(`email=${email}&password=${password}`),
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.signupstat == true) {
            alert.innerHTML = "SignUp successful";
            alert.style = "background-color: green !important;"
            window.setTimeout(() => {
              window.location.replace("/")
            }, 3000);
        } else {
          alert.innerHTML = `${data.err} <sub><i class="close material-icons">close</i></sub> `;
          alert.style = "display: inherit;";
          loader.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" style="fill: currentColor" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
    <path d="M5.00003 14V8L3.50003 8V14C3.50003 14.825 4.17503 15.5 5.00003 15.5H15.5C16.325 15.5 17 14.825 17 14V8H15.5V14H5.00003Z" fill="currentColor"/>
    <path d="M6.50001 3.75L7.55001 4.8L9.50001 2.85V10.5H11V2.85L12.95 4.8L14 3.75L10.25 1.2517e-06L6.50001 3.75Z" fill="currentColor"/>
    </g>
    <defs>
    <clipPath id="clip0">
    <rect width="18" height="18" fill="white" transform="translate(18) rotate(90)"/>
    </clipPath>
    </defs>
    </svg>`;
          loader.style.animation = "none";
        }
      })
  .catch((err) => {
    alert.innerHTML = `${err} <sub><i class="close material-icons">close</i></sub> `;
    alert.style = "display: inherit;";
    loader.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" style="fill: currentColor" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
    <path d="M5.00003 14V8L3.50003 8V14C3.50003 14.825 4.17503 15.5 5.00003 15.5H15.5C16.325 15.5 17 14.825 17 14V8H15.5V14H5.00003Z" fill="currentColor"/>
    <path d="M6.50001 3.75L7.55001 4.8L9.50001 2.85V10.5H11V2.85L12.95 4.8L14 3.75L10.25 1.2517e-06L6.50001 3.75Z" fill="currentColor"/>
    </g>
    <defs>
    <clipPath id="clip0">
    <rect width="18" height="18" fill="white" transform="translate(18) rotate(90)"/>
    </clipPath>
    </defs>
    </svg>`;
    loader.style.animation = "none";
  });
}
});