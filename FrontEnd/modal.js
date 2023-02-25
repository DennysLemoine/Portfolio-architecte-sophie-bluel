// MODALE
let modal = null;
let isDataFetched = false;
const buttonH2 = document.querySelector('.buttonH2');
const modalWrapper = document.querySelector('.modal_wrapper');


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
    modal.querySelector('.modal_wrapper').addEventListener('click', stopPropagation);

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

modalWrapper.appendChild(lineGrey);

const addButton = document.createElement('button');
addButton.setAttribute('class','addButton');
addButton.innerText = 'Ajouter une photo';

addButton.addEventListener('click', ()  => {
    closeModal();
    const aside2 = document.querySelector('#modal2');
    aside2.style.display = null;
    aside2.removeAttribute('aria-hidden');
    aside2.setAttribute('aria-modal', 'true');
    modal = aside2;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.fa-xmark').addEventListener('click', closeModal);
    modal.querySelector('.modal_wrapper').addEventListener('click', stopPropagation);
})

modalWrapper.appendChild(addButton);

const deleteHref = document.createElement('a');
deleteHref.setAttribute('class', 'deleteHref');
deleteHref.innerText = 'Supprimer la galerie'

modalWrapper.appendChild(deleteHref);


// FERMER MODAL
const closeModal = function (e) {
    if (modal === null) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal', 'true');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.fa-xmark').removeEventListener('click', closeModal);
    modal.querySelector('.modal_wrapper').removeEventListener('click', stopPropagation);
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation()
}
