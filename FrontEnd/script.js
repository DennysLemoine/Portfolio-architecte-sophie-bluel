// AJOUT DES TRAVAUX PROVENANT DE L'API
fetch('http://localhost:5678/api/works', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        displayWorks(data);
    })
    .catch(error => console.error(error));


// POUR AFFICHER LE CONTENU DE L'APPEL API :
const displayWorks = (works) => {
    const gallery = document.querySelector('.gallery');
    gallery.innerText = '';
    // console.log(gallery);

    // CREATION BOUCLE FOREACH DE WORKS AVEC CREATION DE FONCTION FLECHEE WORK
    works.forEach((work) => {

        const galleryContent = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        // img.crossOrigin EN 'anonymous' PERMET DE CONTRER LE CORS PRESENT DANS L'app.js POUR NOUS AUTORISER LE TRAITEMENT DU CONTENU API
        // SINON LES IMAGES NE SE SERAIT PAS AFFICHEES
        img.crossOrigin = 'anonymous';
        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.innerText = work.title;

        galleryContent.append(img, figcaption);

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

const displayButtons = (categories) => {

    const btn_wrap = document.querySelector('.button_filter');
    btn_wrap.innerHTML = '';
    // console.log(btn_wrap);

    const btn_all = document.createElement('button')
    btn_all.textContent = 'Tous'
    btn_all.classList.add('button_text')
    btn_all.setAttribute("data-id", 0)

    btn_wrap.appendChild(btn_all);

    categories.forEach((category) => {

        const button = document.createElement('button')
        button.innerHTML = category.name;
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

            const button = event.target;
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

// CREATION PAGE DYNAMIQUE SI UTILISATEUR CONNECTE
let token = localStorage.getItem('token');
// console.log(token)

if (token) {
    console.log('TOKEN PRESENT')

    // LIGNE NOIRE, AVANT HEADER
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    header.style.marginTop = '100px';
    const blackBanner = document.createElement('div');
    blackBanner.setAttribute('class', 'blackBanner');

    // INSERTBEFORE AJOUTE AUSSI COMME Append/AppendChild
    body.insertBefore(blackBanner, header);

    const divEdition = document.createElement('div');
    divEdition.setAttribute('class', 'divEdition');
    blackBanner.appendChild(divEdition);

    // AJOUT DE L'ICONE FONTAWESOME A JS
    const editIcon = document.createElement('i');
    editIcon.classList.add('far', 'fa-pen-to-square');
    divEdition.appendChild(editIcon);

    // AJOUT TEXTE "MODE EDITION"
    const linkEditor = document.createElement('p');
    linkEditor.setAttribute('class', 'linkEditor');
    linkEditor.innerText = "Mode édition";
    divEdition.appendChild(linkEditor);

    // AJOUT BOUTON EDITION
    const buttonEdit = document.createElement('button');
    buttonEdit.setAttribute('class', 'buttonEdit');
    divEdition.appendChild(buttonEdit);

    // AJOUT TEXTE BOUTON
    const spanButton = document.createElement('span');
    spanButton.setAttribute('class', 'spanButton');
    spanButton.innerText = 'publier les changements';
    buttonEdit.appendChild(spanButton);

    // AJOUT DIV MODIFIER AVEC ICONE + P
    const figureImg = document.getElementById('figure_introduction');
    const grpEdit1 = document.createElement('div');
    grpEdit1.setAttribute('class', 'grpEdit1');
    figureImg.appendChild(grpEdit1);

    const editIconDiv1 = document.createElement('i');
    editIconDiv1.classList.add('far', 'fa-pen-to-square');
    editIconDiv1.classList.add('faPen_Black');
    grpEdit1.appendChild(editIconDiv1);

    const textModifier1 = document.createElement('p');
    textModifier1.setAttribute('class', 'textModifier1');
    textModifier1.innerText = 'modifier';
    grpEdit1.appendChild(textModifier1);

    // AJOUT DE LA MEME DIV APRES h2
    const projectH2 = document.querySelector('#portfolio h2');
    const editIconDiv2 = document.createElement('i');
    editIconDiv2.classList.add('far', 'fa-pen-to-square');
    editIconDiv2.classList.add('faPen_Black');
    projectH2.appendChild(editIconDiv2);

    const textModifier2 = document.createElement('p');
    textModifier2.setAttribute('class', 'textModifier2');
    textModifier2.innerText = 'modifier';
    projectH2.appendChild(textModifier2);

    // ESPACE EN DESSOUS H2
    projectH2.style.marginBottom = "3em";

    // SUPPRESSION DES BOUTONS FILTRES
    const divFilter = document.querySelector('.button_filter');
    divFilter.style.display = "none";
}