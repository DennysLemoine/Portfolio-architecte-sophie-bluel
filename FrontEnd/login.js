const logCase = document.querySelector("#userlogin");
// const logCase = document.getElementById('userlogin');
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
    const urlApi = "http://localhost:5678/api/users/login";

    if (logCase.value.length === 0 || passCase.value.length === 0) {

        let errorMessage = document.createElement('p');
        errorMessage.setAttribute('id', 'empty_text');
        errorMessage.innerText = "Veuillez renseigner les champs."

        let test = document.querySelectorAll('.div_form')[0];

        test.appendChild(errorMessage);


        /*
                loginEmpty.style.display = "block";
                passEmpty.style.display = "none";*/
    } else {


        fetch(urlApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": logCase.value,
                "password": passCase.value
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                if (data.message) {

                    let errorMessage = document.createElement('p');
                    errorMessage.setAttribute('id', 'empty_text');
                    errorMessage.innerText = "Email et/ou Mot de passe incorrect(s)."

                    let test = document.querySelectorAll('.div_form')[0];
                    console.log(test);
                    test.appendChild(errorMessage);


                } else {
                    console.log(data);

                    localStorage.setItem('token', data.token);

                    //document.location.href ='index.html';


                    /*
                    window.open(

                        "logged.html"
                    );
                    passEmpty.style.display = "none";
                    loginEmpty.style.display = "none";

                     */
                }
            })
            .catch(error => console.error(error));

    }

})