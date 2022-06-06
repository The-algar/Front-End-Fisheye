const carousel = document.getElementById("carousel_modal");

function displayCarousel(e, typeOfMedia, mediaAdress, photographerMedia, mediaDirectory, title) {
    carousel.setAttribute('aria-hidden','false');
    main.setAttribute('aria-hidden','true');
    carousel.style.display = "block";
    const carouselMedia = document.querySelector(".carousel_media");
    if (typeOfMedia == "image") {
        carouselMedia.innerHTML = "<img src="+mediaAdress+" title="+title+" ('aria-hidden','false') tabindex='0'>";
    } else if (typeOfMedia == "video") {
        carouselMedia.innerHTML = "<video controls src="+mediaAdress+" autoplay title="+title+" tabindex='0'></video>";
    } else {
        console.log("error while displaying carousel");
    }

    //récupère le nom du fichier
    carouselMedia.innerHTML = `${carouselMedia.innerHTML}
    <p>${title}</p>`;
    const media = mediaAdress.split('/')[mediaAdress.split('/').length-1];

    //récupère l'index du media dans le tableau de media trié
    const rank = rankInCarousel(photographerMedia, media);

    //chevron de gauche
    const left = document.getElementById("arrowLeft");
    left.innerHTML = '<i class="fas fa-chevron-left" aria-label="image précédente" tabindex="0"></i>';
    left.addEventListener("click", (e) => changeMedia(e, photographerMedia, rank-1, mediaDirectory));

    //chevron de droite
    const right = document.getElementById("arrowRight");
    right.innerHTML = '<i class="fas fa-chevron-right" aria-label="image suivante" tabindex="0"></i>';
    right.addEventListener("click", (e) => changeMedia(e, photographerMedia, rank+1, mediaDirectory));

    //croix de fermeture
    const close = document.getElementById("close");
    close.innerHTML = '<i class="fas fa-times" id="close" aria-label="fermer le carousel" tabindex="0"></i>';
    close.addEventListener("click", (e) => closeCarousel());

    //navigation clavier
    ariaCompliant(carousel);
    document.addEventListener('keydown', (e) => {
        if(e.code == "Escape" && carousel.getAttribute('aria-hidden') == 'false') {
            closeCarousel()

        } else if (e.code == "arrowLeft" && carousel.getAttribute('aria-hidden') == 'false'){
            changeMedia(e, photographerMedia, rank-1, mediaDirectory)

        } else if (e.code == "arrowRight" && carousel.getAttribute('aria-hidden') == 'false'){
            changeMedia(e, photographerMedia, rank+1, mediaDirectory)
        }
    })
}

function closeCarousel(){
    carousel.setAttribute('aria-hidden','true');
    main.setAttribute('aria-hidden','false');
    carousel.style.display = "none";
    document.querySelector(".carousel_media").innerHTML = " ";
}

function rankInCarousel(photographerMedia,media) {
    return photographerMedia.findIndex(object => object.image == media || object.video == media);
}

function changeMedia(e,photographerMedia,rank,mediaDirectory) { 
    //faire un carousel infini
    if (rank<0) {
        rank = photographerMedia.length-1}
        else if (rank>photographerMedia.length-1) {
        rank = 0 };

    //déclaration des variables 
    var typeOfMedia = " ";
    var mediaAdress = " ";
    var title = " ";

    //determine typeOfMedia et mediaAdress du media à afficher
    if (Object.keys (photographerMedia[rank]).find(key => key == "image")) {
        typeOfMedia = "image";
        const image = photographerMedia[rank].image;
        mediaAdress = "./assets/images/" + mediaDirectory + "/" + image;
        title = photographerMedia[rank].title.replaceAll('_', '');
    } else if (Object.keys(photographerMedia[rank]).find(key => key == "video")){
        typeOfMedia = "video";
        const video = photographerMedia[rank].video;
        mediaAdress = "./assets/images/" + mediaDirectory + "/" + video;
        title = photographerMedia[rank].video.replaceAll('_', '');
        title = title.replace('.mp4', ''); //.replace(/[0-9]/g, '');
    } else {
        console.log("problem in loadedMedia()");
    }

    displayCarousel(e, typeOfMedia, mediaAdress, photographerMedia, mediaDirectory, title);
}