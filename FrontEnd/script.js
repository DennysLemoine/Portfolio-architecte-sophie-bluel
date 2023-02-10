// AJOUT DES TRAVAUX PROVENANT DE L'API
fetch('http://localhost:5678/api/works', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
    // 1er then = RECUPERATION DONNEES
    .then(response => response.json())
    // 2ème then = AFFICHER LES DONNEES + RAPPEL CONST DISPLAYWORK POUR LOCALISER LES DATA A AFFICHER
    .then(data => {
        // console.log(data)
        displayWorks(data);
    })
    // EN CAS D'ERREUR, AFFICHER ERROR DANS LA CONSOLE
    .catch(error => console.error(error));

// POUR AFFICHER LE CONTENU DE L'APPEL API :
// CREATION CONST + FONCTION FLECHEE POUR WORKS + CONSOLE.LOG WORKS (PERMETS DE VISER LE GROUPE DE TRAVAUX)
const displayWorks = (works) => {
    // CREATION CONST GALLERY QUI VISE LA DIV .GALLERY DU HTML + CONSOLE.LOG
    const gallery = document.querySelector('.gallery');
    gallery.innerText = '';
    // console.log(gallery);

    // CREATION BOUCLE FOREACH DE WORKS AVEC CREATION DE FONCTION FLECHEE WORK
    works.forEach((work) => {

        // CREATION DE 3 CONST QUI SONT LES CREATEELEMENT DES ELEMENTS HTML QU'ON SOUHAITE REMETTRE EN JS DYNAMIQUE
        const galleryContent = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        // VISER LES INFORMATIONS DE L'API/ARRAY DU CONSOLE.LOG POUR TRAITER ET PERMETTRE LA VISUALISATION SUR LA PAGE :
        // img.crossOrigin EN 'anonymous' PERMET DE CONTRER LE CORS PRESENT DANS L'app.js POUR NOUS AUTORISER LE TRAITEMENT DU CONTENU API
        // SINON LES IMAGES NE SE SERAIT PAS AFFICHEES
        img.crossOrigin = 'anonymous';
        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.innerText = work.title;

        // AJOUTER LE galleryContent AU DOM
        // append AU LIEU de appendChild PERMET D'AJOUTER LA MM CHOSE ET AUSSI DU TEXT, ICI LE figcaption
        galleryContent.append(img, figcaption);

        // AJOUTER LE gallery QUI CONTIENT LE galleryContent AU DOM
        gallery.appendChild(galleryContent);
    });
};
// AJOUT DES CATEGORIES VENANT DE L'API POUR FILTRER
fetch('http://localhost:5678/api/categories', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        displayButtons(data);
    })
    .catch(error => console.error(error));

// CREATION CONSTANTE QUI EST EGALE A CATEGORIES => FONCTION FLECHEE
const displayButtons = (categories) => {

    // CREATION CONSTANTE QUI SELECTIONNE LA DIV button_filter DU HTML
    const btn_wrap = document.querySelector('.button_filter');
    // RETURNER LA CONSTANTE AVEC .innerHTML = ''; PERMET DE REMPLACER LE CONTENU EXISTANT PAR UN NOUVEAU CONTENU
    btn_wrap.innerHTML = '';
    // console.log(btn_wrap);

    // CREATION CONSTANTE QUI EST = A LA CREATION D'UN 'button'
    const btn_all = document.createElement('button')
    // TEXTE QU'IL Y AURA DANS LE BOUTON TOUS (Bouton qui n'est pas crée via les information donnée de l'api)
    btn_all.textContent = 'Tous'
    // LIER LE BUTTON A LA CLASS CSS POUR LE STYLE
    btn_all.classList.add('button_text')
    btn_all.setAttribute("data-id", 0)

    // AJOUTER LE BOUTON AU PARENT btn_all
    btn_wrap.appendChild(btn_all);

    // CREATION BOUCLE forEach DE categories INCLUANT UNE FONCTION FLECHEE category
    categories.forEach((category) => {

        const button = document.createElement('button')
        // DONNER LE NOM DU BOUTON EN METTANT .name A LA FONCTION FLECHEE, QUI EST PRESENT DANS LES INFO API
        button.innerHTML = category.name;
        // SERT A RECUPERER L'id DE LA CATEGORIE
        button.setAttribute("data-id", category.id);
        // console.log(category.id)
        button.classList.add('button_text')

        console.log(category);

        btn_wrap.appendChild(button);

    });

    let buttons = document.querySelectorAll("button[data-id]");

    buttons.forEach((button) => {

        // AJOUTER UNE ACTION QUAND ON APPUIE SUR LE BOUTON
        button.addEventListener('click', (event) => {

            // PERMET DE STOCKER L'ELEMENT QUI DECLENCHE L'EVENEMENT DANS LA CONST button POUR Y ACCEDER PLUS TARD DANS LA FONCTION
            const button = event.target;
            // PERMET DE RENVOYER LES DONNEES DE setAttribute (plus haut), ON STOCKE LA VALEUR data-id DANS LA CONST id POUR Y ACCEDER PLUS TARD DANS LA FONCTION
            const categoryId = parseInt(button.dataset.id);
            console.log(categoryId);
            // FAIRE UN FETCH POUR QU'AU CLIC JE RECUPERE LES WORKS
            fetch('http://localhost:5678/api/works', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(works => {
                    // filter PERMET D'ITERER SUR TOUT LE TABLEAU works PUIS FONCTION FLECHEE RETOURNE LE WORK SI CDT EST BONNE
                    const workFiltered = categoryId !== 0 ? works.filter(work => work.categoryId === categoryId) : works;

                    // console.log(workFiltered);
                    displayWorks(workFiltered);
                })
                .catch(error => console.error(error));
        });
    })
}

document.querySelector("#form1").addEventListener("submit", function (e) {
    e.preventDefault();

    var email = document.querySelector("#userlogin").value;
    var password = document.querySelector("#userpass").value;
})