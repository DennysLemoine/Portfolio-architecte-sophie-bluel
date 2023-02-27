// MODALE
let modal = null;
let isDataFetched = false;
const buttonH2 = document.querySelector('.buttonH2');
const modalWrapper1 = document.querySelector('.modal_wrapper1');
const modalWrapper2 = document.querySelector('.modal_wrapper2');


// PREMIERE MODAL
buttonH2.addEventListener('click', () => {
    const aside = document.querySelector('#modal');
    // console.log(aside)
    aside.style.display = null;
    aside.removeAttribute('aria-hidden');
    aside.setAttribute('aria-modal', 'true');
    modal = aside;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.fa-xmark').addEventListener('click', closeModal);
    modal.querySelector('.modal_wrapper1').addEventListener('click', stopPropagation);

    // EMPECHER LE BUTTON D'APPELER L'API PLUSIEURS FOIS
    if (!isDataFetched) {
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
                isDataFetched = true;
            })
            .catch(error => console.error(error));
    }

    const displayWorks = (works) => {
        const divImages = document.querySelector('.imagesModal');

        works.forEach((work) => {
            const container = document.createElement('div');
            container.setAttribute('class', 'imageContainer');

            const img = document.createElement('img');

            const buttonArrow = document.createElement('button');
            buttonArrow.classList.add('buttonArrow');
            const iconArrow = document.createElement('span');
            iconArrow.classList.add('fas', 'fa-arrows-alt');
            iconArrow.classList.add('fa-arrows');

            const buttonTrash = document.createElement('button');
            buttonTrash.classList.add('buttonTrash');
            const iconTrash = document.createElement('span');
            iconTrash.classList.add('fas', 'fa-trash-alt');
            iconTrash.classList.add('fa-trash');

            buttonArrow.appendChild(iconArrow);
            buttonTrash.appendChild(iconTrash);

            const text = '<button class="buttonTextImg">éditer</button>';

            img.crossOrigin = 'anonymous';
            img.src = work.imageUrl;
            img.id = work.id;

            container.append(img);
            container.append(buttonArrow, buttonTrash);
            container.insertAdjacentHTML('beforeend', text);
            divImages.append(container);
        });
    };
});

const lineGrey = document.createElement('div');
lineGrey.setAttribute('class', 'lineGrey');

modalWrapper1.appendChild(lineGrey);

const addButton = document.createElement('button');
addButton.setAttribute('class','addButton');
addButton.innerText = 'Ajouter une photo';

modalWrapper1.appendChild(addButton);

const deleteHref = document.createElement('a');
deleteHref.setAttribute('class', 'deleteHref');
deleteHref.innerText = 'Supprimer la galerie'

modalWrapper1.appendChild(deleteHref);

// DEUXIEME MODAL
addButton.addEventListener('click', ()  => {
    closeModal();
    const aside2 = document.querySelector('#modal2');
    aside2.style.display = null;
    aside2.removeAttribute('aria-hidden');
    aside2.setAttribute('aria-modal', 'true');
    modal = aside2;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.fa-xmark').addEventListener('click', closeModal);
    modal.querySelector('.modal_wrapper2').addEventListener('click', stopPropagation);
});

const divAddPhoto = document.createElement('div');
divAddPhoto.setAttribute('class', 'divAddPhoto');

const iconPng = document.createElement('span');
iconPng.classList.add('far', 'fa-image');

const addPhoto = document.createElement('button');
addPhoto.setAttribute('class','addPhoto');
addPhoto.innerText = '+ Ajouter photo';

const spanAddPhoto = document.createElement('span');
spanAddPhoto.setAttribute('class', 'spanAddPhoto');
spanAddPhoto.innerText = 'jpg, png : 4mo max'

modalWrapper2.appendChild(divAddPhoto);

divAddPhoto.append(iconPng, addPhoto, spanAddPhoto);

const divInput1 = document.createElement('div');
divInput1.setAttribute('class', 'divInput');

modalWrapper2.appendChild(divInput1);

const labelTitle = document.createElement("label");
labelTitle.setAttribute('class', 'label');
labelTitle.setAttribute('for', 'titleimage');
labelTitle.innerText = 'Titre';

const input1 = document.createElement('input');
input1.setAttribute('class', 'input2');
input1.type = 'text';

divInput1.append(labelTitle, input1);

const divInput2 = document.createElement('div');
divInput2.setAttribute('class', 'divInput');

modalWrapper2.appendChild(divInput2);

const labelCategorie = document.createElement("label");
labelCategorie.setAttribute('class', 'label');
labelCategorie.setAttribute('for', 'selectcategorie');
labelCategorie.innerText = 'Catégorie';

const input2 = document.createElement('input');
input2.setAttribute('class', 'input2');
input2.type = 'text';

divInput2.append(labelCategorie, input2);

const lineGrey2 = document.createElement('div');
lineGrey2.setAttribute('class', 'lineGrey2');

modalWrapper2.appendChild(lineGrey2);

const OkButton = document.createElement('button');
OkButton.setAttribute('class','addButton2');
OkButton.innerText = 'Valider';

modalWrapper2.appendChild(OkButton);


// FERMER MODAL
const closeModal = function (e) {
    if (modal === null) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal', 'true');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.fa-xmark').removeEventListener('click', closeModal);
    modal.querySelector('.modal_wrapper1').removeEventListener('click', stopPropagation);
    modal = null;
};

const stopPropagation = function (e) {
    e.stopPropagation()
}
