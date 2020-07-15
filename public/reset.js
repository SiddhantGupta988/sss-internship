const otpform = document.querySelector(".otpform");
otpform.style = "display: none;"
const loader = document.querySelector(".loader");
const submit = document.querySelector(".submit");
submit.addEventListener("click", function (event) {
    event.preventDefault();
    loader.innerHTML = "query_builder"
    loader.style.animation = "rotate 3s ease 0s 3";
    window.email = document.querySelector("#email").value;
    window.password = document.querySelector("#password").value;
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
        loader.innerHTML = `query_builder`;
        loader.style.animation = "none";
    } else if (password != cpassword) {
        alert.innerHTML = `Both Passwords should be same <sub><i class="close material-icons">close</i></sub> `;
        alert.style = "display: inherit;";
        loader.innerHTML = `query_builder`;
        loader.style.animation = "none";
    } else {
        const url = `/reset/sendcode`;
        fetch(url, {
                method: "POST",
                body: new URLSearchParams(`email=${email}&password=${password}`),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.sendstat == true) {
                    alert.innerHTML = "Code Sent Successfully to your mail Id";
                    alert.style = "background-color: green !important;"
                    window.setTimeout(() => {
                        alert.style = "display: none;"
                        otpform.style = "display: grid;"
                        document.querySelector(".formone").style = "display: none;"
                    }, 3000);
                } else {
                    alert.innerHTML = `${data.err} <sub><i class="close material-icons">close</i></sub> `;
                    alert.style = "display: inherit;";
                    loader.innerHTML = `query_builder`;
                    loader.style.animation = "none";
                }
            })
            .catch((err) => {
                alert.innerHTML = `${err} <sub><i class="close material-icons">close</i></sub> `;
                alert.style = "display: inherit;";
                loader.innerHTML = `query_builder`;
                loader.style.animation = "none";
            });
    }
});


const update = document.querySelector(".update");
update.addEventListener("click", function (event) {
    event.preventDefault();
    const url = `/reset/pwupdate`;
    const otp = document.querySelector("#otp").value;
    fetch(url, {
            method: "POST",
            body: new URLSearchParams(`email=${email}&password=${password}&otp=${otp}`),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data.sendstat == true) {
                alert.innerHTML = "Password updated successfuly";
                alert.style = "background-color: green !important;"
                window.setTimeout(() => {
                    window.location.replace("/")
                }, 2000);
            } else {
                alert.innerHTML = `${data.err} <sub><i class="close material-icons">close</i></sub> `;
                alert.style = "display: inherit;";
                loader.innerHTML = `query_builder`;
                loader.style.animation = "none";
            }
        })
        .catch((err) => {
            alert.innerHTML = `${err} <sub><i class="close material-icons">close</i></sub> `;
            alert.style = "display: inherit;";
            loader.innerHTML = `query_builder`;
            loader.style.animation = "none";
        });
});