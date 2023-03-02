if (token) {
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
                buttonTrash.setAttribute('data-id', work.id);
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
            // SUPPRESSION ELEMENTS MODAL
            const buttonTrashList = document.querySelectorAll('.buttonTrash');

            if (token) {
                buttonTrashList.forEach(buttonTrash => {
                    buttonTrash.addEventListener('click', () => {
                        console.log(buttonTrash);
                        const token = localStorage.getItem('token');
                        console.log(token);
                        const id = buttonTrash.parentNode.querySelector('img').id;
                        fetch(`http://localhost:5678/api/works/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    const element = buttonTrash.parentNode;
                                    element.remove();
                                } else {
                                    console.error(`La suppression a échoué.`);
                                }
                            })
                            .catch(error => {
                                console.error(`Une erreur est survenue lors de la suppression de l'élément `, error)
                            });
                    });
                })
            }
        };

    });

// CREATION ELEMENT PREMIERE MODAL
    const lineGrey = document.createElement('div');
    lineGrey.setAttribute('class', 'lineGrey');
    modalWrapper1.appendChild(lineGrey);

    const addButton = document.createElement('button');
    addButton.setAttribute('class', 'addButton');
    addButton.innerText = 'Ajouter une photo';
    modalWrapper1.appendChild(addButton);

    const deleteHref = document.createElement('a');
    deleteHref.setAttribute('class', 'deleteHref');
    deleteHref.innerText = 'Supprimer la galerie'
    modalWrapper1.appendChild(deleteHref);

// DEUXIEME MODAL
    addButton.addEventListener('click', () => {
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

//CREATION ELEMENT DYNAMIQUES DEUXIEME MODAL
    const divAddPhoto = document.createElement('div');
    divAddPhoto.setAttribute('class', 'divAddPhoto');

    const divIconPng = document.createElement('div');
    divIconPng.classList.add('divIconPng');

    divAddPhoto.appendChild(divIconPng);

    const iconPng = document.createElement('span');
    iconPng.classList.add('far', 'fa-image');
    iconPng.classList.add('logoImageSvg');

    divIconPng.appendChild(iconPng);

    const addPhoto = document.createElement('input');
    addPhoto.setAttribute('type', 'file');
    addPhoto.setAttribute('id', 'filesInput');
    addPhoto.setAttribute('accept', 'image/jpeg');
    addPhoto.setAttribute('accept', 'image/png');

    addPhoto.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const img = document.createElement('img');
                img.setAttribute('src', e.target.result);
                img.style.objectFit = 'cover'
                divIconPng.classList.add('hidden');
                addPhoto.classList.add('hidden');
                addPhotoLabel.classList.add('hidden');
                spanAddPhoto.classList.add('hidden');

                divAddPhoto.appendChild(img);
            };

            reader.readAsDataURL(this.files[0]);
        }
    });

    const addPhotoLabel = document.createElement('label');
    addPhotoLabel.setAttribute('for', 'filesInput');
    addPhotoLabel.setAttribute('class', 'addPhoto');
    addPhotoLabel.innerHTML = '+ Ajouter photo';

    const spanAddPhoto = document.createElement('span');
    spanAddPhoto.setAttribute('class', 'spanAddPhoto');
    spanAddPhoto.innerText = 'jpg, png : 4mo max'
    modalWrapper2.appendChild(divAddPhoto);

    divAddPhoto.append(addPhoto, addPhotoLabel, spanAddPhoto);

    const divInput1 = document.createElement('div');
    divInput1.setAttribute('class', 'divInput1');
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
    divInput2.setAttribute('class', 'divInput2');
    modalWrapper2.appendChild(divInput2);

    const labelCategories = document.createElement("label");
    labelCategories.setAttribute('class', 'label');
    labelCategories.setAttribute('for', 'categorieimage');
    labelCategories.innerText = 'Catégorie';

    const selectCategories = document.createElement('select');
    selectCategories.setAttribute('id', 'categorieimage');
    divInput2.appendChild(labelCategories);
    divInput2.appendChild(selectCategories);

    const option1 = document.createElement('option');
    option1.text = '';
    selectCategories.appendChild(option1);

    fetch('http://localhost:5678/api/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            showCategories(data, selectCategories);
        })
        .catch(error => console.error(error));
    const showCategories = (categories, selectCategories) => {

        categories.forEach((category) => {

            const option = document.createElement('option');
            option.innerText = category.name;
            option.value = category.id;
            console.log(option);
            selectCategories.appendChild(option);
        });
    }

    const lineGrey2 = document.createElement('div');
    lineGrey2.setAttribute('class', 'lineGrey2');

    modalWrapper2.appendChild(lineGrey2);

    const OkButton = document.createElement('button');
    OkButton.setAttribute('class', 'addButton2');
    OkButton.innerText = 'Valider';
    OkButton.setAttribute('disabled', 'true');

    modalWrapper2.appendChild(OkButton);

// CREATION EVENEMENT ENVOI DOCUMENT
    const divErrorMsg = document.createElement('div');
    divErrorMsg.setAttribute('class', 'divErrorMsg');
    divInput2.appendChild(divErrorMsg);

    const emptyValue = document.createElement('p');
    emptyValue.setAttribute('id', 'emptyValue');
    const errorValue = document.createElement('p');
    errorValue.setAttribute('id', 'errorValue');
    divErrorMsg.append(emptyValue, errorValue);

// ACTIVER LE BOUTON QUE SI LES ELEMENTS SONT RENSEIGNES
    function disableButton() {
        if (addPhoto.value && input1.value && selectCategories.value) {
            OkButton.disabled = false;
            OkButton.style.cursor = 'pointer';
            OkButton.style.backgroundColor = '#1D6154';
        } else {
            OkButton.disabled = true;
        }
    }

// EVENT POUR CHAQUE INPUT MODAL2 POUR ACTIVER LE BOUTON
    addPhoto.addEventListener('input', disableButton);
    input1.addEventListener('input', disableButton);
    selectCategories.addEventListener('input', disableButton);

// ENVOI DE LA NOUVELLE PHOTO A L'API
    OkButton.addEventListener('click', () => {

        const title = document.querySelector('.input2').value;
        const category = document.querySelector('#categorieimage').value;
        //POUR LOCALISER L'IMAGE SUR MON ORDINATEUR
        const image = document.querySelector('#filesInput').files[0];
        // console.log(token);

        const formData = new FormData();
        formData.append('title', title);
        console.log(title);
        formData.append('category', category);
        console.log(category);
        formData.append('image', image);

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
                // SI LES VARIABLES ONT LE MM NOMS QUE LES CLES, PAS BESOIN DES CLES
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Le fichier a été envoyé avec succès !', data);
            })
            .catch(error => {
                console.error(`Erreur lors de l'envoi du fichier`, error);
            });
    })

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

// POUR EVITER LA FERMETURE NON DESIREE DE LA MODAL
    const stopPropagation = function (e) {
        e.stopPropagation()
    }
}

