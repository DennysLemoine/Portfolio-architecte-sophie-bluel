/*fetch('http://localhost:5678/api/categories', {
    // METHOD = GET/POST/PUT/DELETE
    method: 'GET',
    // HEADERS = INFO EN + POUR LA REQUETE -> Content-Type = TYPE DE DONNEE POUR QUE LE SERVEUR SACHE COMMENT INTERPRETER
    headers: {
        'Content-Type': 'application/json'
    },
})
    // 1er then = RECUPERATION DONNEES
    .then(response => response.json())
    // 2ème then = AFFICHER LES DONNEES
    .then(categorie => console.log(categorie))
    // EN CAS D'ERREUR, AFFICHER ERROR DANS LA CONSOLE
    .catch(error => console.error(error));
*/
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayWorks(data);
    })
    .catch(error => console.error(error));

const displayWorks = (works) => {

    console.log(works)

    const newWorks = works.filter((work) => {
        return work.categoryId === 2;
    });

    const newWorks2 = works.filter(work => work.categoryId === 2);

    console.log(newWorks)
    console.log(newWorks2)





    const gallery = document.querySelector('.gallery');
    console.log(gallery);
    works.forEach((work) => {

        const galleryContent = document.createElement('figure');
        const img = document.createElement('img');

        //img.setAttribute('crossorigin', 'anonymous');
        img.crossOrigin = 'anonymous';
        img.src = work.imageUrl;
        img.alt = work.title;


        const figcaption = document.createElement('figcaption');
        figcaption.innerText = work.title;

/*
        galleryContent.appendChild(img);
        galleryContent.appendChild(figcaption);
*/
        galleryContent.append(img, figcaption);
        /*
                galleryContent.innerHTML = `
                    <img crossorigin="anonymous"  src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                `;

         */
        gallery.appendChild(galleryContent);
    });
    /*
    for (let i = 0; i < data.length; i++) {
        const galleryContent = document.createElement('figure');

        galleryContent.innerHTML = `
            <img crossorigin="anonymous"  src="${data[i].imageUrl}" alt="${data[i].title}">
            <figcaption>${data[i].title}</figcaption>
        `;
        gallery.appendChild(galleryContent);
    }*/
/*
    const figureElements = document.querySelectorAll('figure');
    figureElements.forEach((figureElement) => console.log(figureElement));
*/
    //document.getElementById('test');



}