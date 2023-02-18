// RECUPERATION D'ELEMENT HTML
const logCase = document.querySelector("#userlogin");
const passCase = document.querySelector("#userpass");
const button = document.querySelector('.btn_Tologin');

// CREATION MESSAGES D'ERREURS + PLACEMENT
const emptyMessage = document.createElement('p');
emptyMessage.setAttribute('id', 'empty_text');
const errorLog = document.createElement('p');
errorLog.setAttribute('id', 'error_login');

const errorContainer = document.querySelector(".div_form");
errorContainer.append(emptyMessage, errorLog);

// CREATION COMPORTEMENT BOUTON SE CONNECTER
button.addEventListener("click", (e) => {
    e.preventDefault();
    const urlApi = "http://localhost:5678/api/users/login";

    if (logCase.value.length === 0 || passCase.value.length === 0) {

        emptyMessage.innerText = "Veuillez renseigner les champs.";
        emptyMessage.style.display = "block";
        errorLog.style.display = "none";

    } else {

        // APPEL API/POST POUR VERIFIER L'AUTHENTIFICATION
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

                if (data.error) {

                    errorLog.innerText = "Email et/ou Mot de passe incorrect(s).";
                    errorLog.style.display = "block";
                    emptyMessage.style.display = "none";

                } else {
                    // console.log(data);
                    errorLog.style.display = "none";
                    emptyMessage.style.display = "none";

                    //ENREGISTRER LE TOKEN DANS LE LOCALSTORAGE POUR APRES
                    localStorage.setItem('token', data.token);

                    window.open(

                        "index.html"
                    );
                }
            })
            .catch(error => console.error(error));
    }
})