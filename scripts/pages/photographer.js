async function getPhotographerDataAndMedia(photographId) {        
    const pJsonData = await loadJsonData();
    const photographers = pJsonData.photographers;
    const photographerData = photographers.find(photographer => photographer.id == photographId);
    const photographerMedia = pJsonData.media.filter(medium => medium.photographerId == photographId);

    console.log(pJsonData);
    console.log(photographers);
    console.log(photographerData);
    console.log(photographerMedia);

    return [photographerData, photographerMedia];
}

async function displayHeaderData(photographerData) { 
    //affiche le cadre photograph-header avec les infos du photographe sélectionné
    const headerSection = document.querySelector(".photograph-header");

    const h2 = document.createElement('h2');
    h2.setAttribute("aria-label","Nom du photographe" + ", " + photographerData.name);
    h2.innerHTML = photographerData.name;

    const plocation = document.createElement('p');
    plocation.setAttribute("aria-label", "Lieu d'activité du photographe"+ ", " + photographerData.city + ", " + photographerData.country);
    plocation.innerHTML = photographerData.city + ", " + photographerData.country;

    const h3 = document.createElement('h3');
    h3.innerHTML = photographerData.tagline;
    h3.setAttribute("aria-label","Slogan du photographe" + " : " + photographerData.tagline);

    const img = document.createElement( 'img' );
    img.setAttribute("alt","Portrait du photographe dans un médaillon rond");
    img.setAttribute("src", "./assets/photographers/" + photographerData.portrait);

    const pHeader = document.createElement("div");
    pHeader.setAttribute("id", "header-text");
    headerSection.appendChild(pHeader);
    pHeader.appendChild(h2);
    pHeader.appendChild(plocation);
    pHeader.appendChild(h3);
    headerSection.appendChild(pHeader.previousElementSibling);
    headerSection.appendChild(img);
};

async function displayMedia(photographerMedia, mediaDirectory) { 
    //affiche tous les media du photographe
    const mediaContainer = document.querySelector(".media-container");
    mediaContainer.innerHTML = " ";

    var totalLikes = 0;
    var mediaCardHtml = " ";

    photographerMedia.forEach(element => {
        const mediaModel = mediaFactory(element, mediaDirectory, photographerMedia, mediaCardHtml);
        element.title = mediaModel.title;
        mediaCardHtml = mediaModel.getMediaCardDOM();
        totalLikes += element.likes;
    });
}

async function initPhotographer() {
    //récupère l'ID du photographe
    const id = window.location.href.split( "=")[1]
    
    // Récupère les datas des photographes en fonction de l'ID
    const allPhotographerData = await getPhotographerDataAndMedia(id);
    const photographerData = allPhotographerData[0];
    const photographerMedia = allPhotographerData[1];
    document.getElementById("photographerName").innerHTML = photographerData.name;
    var mediaDirectory=photographerData.name.split(' ');
    mediaDirectory.pop();

    //Affiche les données du photographe
    displayHeaderData(photographerData);

    //Affiche les media du photographe
    displayMedia(photographerMedia, mediaDirectory);
};

initPhotographer() 