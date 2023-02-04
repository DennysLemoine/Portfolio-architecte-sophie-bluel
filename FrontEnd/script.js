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
        localStorage.setItem('works', JSON.stringify(data));
        displayWorks(data);
    })
    // EN CAS D'ERREUR, AFFICHER ERROR DANS LA CONSOLE
    .catch(error => console.error(error));

// POUR AFFICHER LE CONTENU DE L'APPEL API :
// CREATION CONST + FONCTION FLECHEE POUR WORKS + CONSOLE.LOG WORKS (PERMETS DE VISER LE GROUPE DE TRAVAUX)
const displayWorks = (works) => {
    // CREATION CONST GALLERY QUI VISE LA DIV .GALLERY DU HTML + CONSOLE.LOG
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    console.log(gallery);

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

        // AJOUTER LA GALLERY QUI CONTIENT LE galleryContent AU DOM
        gallery.appendChild(galleryContent);
    });
}
// AJOUT DES CATEGORIES VENANT DE L'API POUR FILTRER
fetch('http://localhost:5678/api/categories', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(categories => displayCategories(categories))
    .catch(error => console.error(error));

