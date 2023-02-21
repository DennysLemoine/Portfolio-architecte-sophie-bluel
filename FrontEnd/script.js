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

    const divBlackBanner = document.createElement('div');
    divBlackBanner.setAttribute('class', 'divBlackBanner');
    blackBanner.appendChild(divBlackBanner);

    // AJOUT DE L'ICONE FONTAWESOME A JS
    const editIcon1 = () => {
        const editI = document.createElement('i');
        editI.classList.add('far', 'fa-pen-to-square');
        // editI.classList.add('faPen_Black');
        return editI;
    };

    divBlackBanner.appendChild(editIcon1());

    // AJOUT TEXTE "MODE EDITION"
    const linkEditor = document.createElement('p');
    linkEditor.setAttribute('class', 'linkEditor');
    linkEditor.innerText = "Mode édition";
    divBlackBanner.appendChild(linkEditor);

    // AJOUT BOUTON EDITION
    const buttonEdit = document.createElement('button');
    buttonEdit.setAttribute('class', 'buttonEdit');
    divBlackBanner.appendChild(buttonEdit);

    // AJOUT TEXTE BOUTON
    const spanButton = document.createElement('span');
    spanButton.setAttribute('class', 'spanButton');
    spanButton.innerText = 'publier les changements';
    buttonEdit.appendChild(spanButton);

    // AJOUT DIV MODIFIER AVEC ICONE + P
    const figureImg = document.getElementById('figure_introduction');

    const divEdit1 = document.createElement('div');
    divEdit1.setAttribute('class', 'divEdit1');
    figureImg.appendChild(divEdit1);

    // AJOUT DEUXIEME ICON
    const editIcon2 = () => {
        const editI = document.createElement('i');
        editI.classList.add('far', 'fa-pen-to-square');
        editI.classList.add('faPen_Black');
        return editI;
    };

    // AJOUT TEXTE modifier
    const textEdit = () => {
        const textModifier = document.createElement('p');
        textModifier.setAttribute('class', 'textModifier');
        textModifier.innerText = 'modifier';
        return textModifier;
    }

    divEdit1.appendChild(editIcon2());
    divEdit1.appendChild(textEdit());

    // AJOUT D'UNE MEME DIV APRES h2
    const sectionh2 = document.getElementById('portfolio');
    const projectH2 = document.querySelector('#portfolio h2');
    const buttonFilter = document.querySelector('.button_filter');


    const divH2 = document.createElement('div');
    divH2.setAttribute('class', 'divH2');
    sectionh2.insertBefore(divH2, buttonFilter);

    divH2.appendChild(projectH2);

    const divEdit2 = document.createElement('div');
    divEdit2.setAttribute('class', 'divEdit2');
    divH2.appendChild(divEdit2);

    divEdit2.appendChild(editIcon2());
    divEdit2.appendChild(textEdit());

    // ESPACE EN DESSOUS H2
    projectH2.style.marginBottom = "3em";

    // SUPPRESSION DES BOUTONS FILTRES
    const divFilter = document.querySelector('.button_filter');
    divFilter.style.display = "none";
}