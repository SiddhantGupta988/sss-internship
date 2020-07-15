const list = document.querySelectorAll('.mdc-text-field')
list.forEach((item) => {
    mdc.textField.MDCTextField.attachTo(item);
})

const alert = document.querySelector(".alert");

alert.addEventListener('click', () => {
    alert.style = "display: none;"
})


const menu = document.querySelector('.menu');
const drawer = document.querySelector('.drawer');

menu.addEventListener('click', () => {
    if (menu.innerHTML == "menu") {
        menu.innerHTML = "close"
        drawer.style = "display: inherit;"
    } else {
        menu.innerHTML = "menu";
        drawer.style = "display: none;"
    }
})

function hidemenu() {
    menu.innerHTML = "menu";
    drawer.style = "display: none;"
}

function showmenu() {
    drawer.style = "display: inherit;"
}
function hide(){
    alert.style = "display: none;"
    loader.innerHTML = "login";
}

alert.style = "display: none;"
