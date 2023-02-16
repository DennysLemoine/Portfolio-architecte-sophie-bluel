const logCase = document.querySelector("#userlogin");
const passCase = document.querySelector("#userpass");
const button = document.querySelector('.btn_Tologin');
const loginEmpty = document.getElementById("empty_text");
const passEmpty = document.getElementById("error_login");
// const form = document.querySelector(".form_login");
// const emptyContainer = document.querySelector("#empty_text");
// const errorContainer = document.querySelector("#error_login");
// const submit = document.querySelector(".btn_Tologin");

// console.log(form);
button.addEventListener("click", (e) => {
    e.preventDefault();
    const login = "http://localhost:5678/api/users/login";

    fetch(login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: logCase.value,
            password: passCase.value,
        })
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (logCase.value.length === 0 || passCase.value.length === 0) {
                loginEmpty.style.display= "block";
                passEmpty.style.display= "none";
            } else if (data.error) {
                passEmpty.style.display= "block";
                loginEmpty.style.display= "none";
            } else {
                window.open(
                    "logged.html"
                );
                passEmpty.style.display= "none";
                loginEmpty.style.display= "none";
            }
        })
        .catch(error => console.error(error));
})