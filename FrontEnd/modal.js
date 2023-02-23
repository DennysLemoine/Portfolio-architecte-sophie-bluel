// MODALE
let modal = null

const buttonH2 = document.querySelector('.buttonH2')
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
});

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

// AFFICHER IMAGES DANS LA MODALE
const divGrid = document.querySelector('.imagesModal');
const workFromJSON = localStorage.getItem('workImage');
const workToImage = JSON.parse(workFromJSON);
console.log(workToImage);

const img = document.createElement('img');

// img.crossOrigin = 'anonymous';
img.src = workToImage.imageUrl;

img.addEventListener('load', () => {
    divGrid.append(img);
});

console.log(workToImage.imageUrl);
