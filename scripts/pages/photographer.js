async function getPhotographerDataAndMedia(photographId) {        
    const pJsonData = await loadJsonData();
    const photographers = pJsonData.photographers;
    const photographerData = photographers.find(photographer => photographer.id == photographId);
    const photographerMedia = pJsonData.media.filter(media => media.photographerId == photographId);

    //console.log(pJsonData);
    //console.log(photographers);
    console.log(photographerData);
    console.log(photographerMedia);

    return [photographerData, photographerMedia];
}

async function displayHeaderData(photographerData) { 
    //affiche le cadre photograph-header avec les infos du photographe sélectionné
    const headerSection = document.querySelector(".photograph-header");

    //affiche le nom du photographe
    const h2 = document.createElement('h2');
    h2.setAttribute("aria-label","Nom du photographe" + ", " + photographerData.name);
    h2.innerHTML = photographerData.name;

    //affiche la ville du photographe
    const plocation = document.createElement('p');
    plocation.setAttribute("aria-label", "Ville d'activité du photographe"+ ", " + photographerData.city + ", " + photographerData.country);
    plocation.innerHTML = photographerData.city + ", " + photographerData.country;

    //affiche l'accroche du photographe
    const h3 = document.createElement('h3');
    h3.innerHTML = photographerData.tagline;
    h3.setAttribute("aria-label","Accroche du photographe" + " : " + photographerData.tagline);

    //affiche le portrait du photographe
    const img = document.createElement( 'img' );
    img.setAttribute("alt","Portrait du photographe dans un médaillon rond");
    img.setAttribute("src", "./assets/photographers/" + photographerData.portrait);


    //réuni tous les éléments pour créer le header
    const pHeader = document.createElement("div");
    headerSection.appendChild(pHeader);
    pHeader.appendChild(h2);
    pHeader.appendChild(plocation);
    pHeader.appendChild(h3);
    headerSection.appendChild(pHeader.previousElementSibling);
    headerSection.appendChild(img);
};

async function displayMedia(photographerMedia, mediaDirectory) { 

    //affiche tous les media du photographe dans un container
    const mediaContainer = document.querySelector(".media-container");
    mediaContainer.innerHTML = " ";

    var totalLikes = 0;
    var mediaCardHtml = " ";

    photographerMedia.forEach(element => {
        const mediaModel = mediaFactory(element, mediaDirectory, photographerMedia, mediaCardHtml);
        element.title = mediaModel.title;
        mediaCardHtml += mediaModel.getMediaCardDOM();
        totalLikes += element.likes;
    });
    
    //mediaContainer.insertAdjacentHTML("beforeend", mediaCardHtml)
    //ou var node = new DOMParser().parseFromString(mediaCardHtml, "text/html").documentElement;
    //mediaContainer.appendChild(node);

    mediaContainer.innerHTML = mediaCardHtml;
    //ouverture du carousel
    const allMedia=(Array.from(document.getElementsByClassName("media")));

    allMedia.forEach(media => {
        const title = Array.from(media.children)[0].getAttribute('alt');
        if (media.classList.value == "media image") {
            const imageAdress = Array.from(media.children)[0].getAttribute('src');
            media.children[0].addEventListener("click",(e) => displayCarousel(e, "image", imageAdress, photographerMedia, mediaDirectory, title));
            media.children[0].addEventListener("keyup", (e) => {
                if (e.keyCode === 13) {
                 e.preventDefault();
                 media.children[0].click();
                }
              });
        } else if(media.classList.value == "media video") {
            const videoAdress = Array.from(media.children)[0].getAttribute('src');
            media.children[0].addEventListener("click",(e) => displayCarousel(e,"video",videoAdress,photographerMedia,mediaDirectory,title));
            media.children[0].addEventListener("keyup", (e) => {
                if (e.keyCode === 13) {
                 e.preventDefault();
                 media.children[0].click();
                }
              });
        }else {
            null;
            }
    });
    //gestion des likes
    displayTotalLikes(totalLikes);
    manageLikes(totalLikes, photographerMedia, mediaDirectory);
}

async function displayLikesAndPrice(price){
    document.querySelector(".price").innerHTML = price + "€/ jour ";
}

async function initPhotographer() {
    //récupère l'ID du photographe
    const id = window.location.href.split( "=")[1]; //on peut ajouter .split("#")[0]; car selon le navigateur un # se rajoute à la fin de l'adresse en tappant entrer
    
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

    //Affiche le cadre du bas
    displayLikesAndPrice(photographerData.price);

    //Menu de selection
    openCloseMenu();
    ariaMenu();
    selectedOption(photographerMedia, mediaDirectory);
};

initPhotographer() 