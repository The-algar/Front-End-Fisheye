function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `./assets/photographers/${portrait}`;

    function getUserCardDOM() { //créer l'article HTML du photographe dans l'index

        //création du a dans balise section avec href de base
        const linkToPhotographerPage=document.createElement('a');

        // création de l'article avec id dans la balise A
        linkToPhotographerPage.setAttribute('href',"./photographer.html?photographerId=" + id)
        const article = document.createElement( 'article' );
        linkToPhotographerPage.appendChild(article);

        //création des balises à mettre dans balise section
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt",`photo de ${name}`);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement( 'p' );
        location.textContent = city +", " + country;

        const h3 = document.createElement( 'h3' );
        h3.textContent = tagline;

        const h4 = document.createElement( 'h4' );
        h4.textContent = price+"€/jour";

        // ajout des balises dans la balise article
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(h3);
        article.appendChild(h4);

        //console.log(data);
        
        return (linkToPhotographerPage);

    }
    return { name, picture, getUserCardDOM }
}

function imageFactory(data, mediaDirectory, mediaCardHtml){
    const {title, image, likes, date } = data;
    heartColor = data.liked;
    if (heartColor == undefined){
        heartColor = "far fa-heart";
    };
    function getMediaCardDOM(){ 
        //créer la carte HTML pour l'affichage de l'image, de son titre et de ses likes
        mediaCardHtml += `
        <div class="media image">
            <img src="./assets/images/${mediaDirectory}/${image}" alt="${title}" tabindex="0">
            <div class="titleAndLikes">
                <div class="title">${title}</div>
                <div class="likes">
                    <div aria-label="nombre de likes" tabindex="0">${likes}</div>
                    <div aria-label="cliquez pour liker"> <i class="${heartColor}" id="${title}" tabindex="0"></i></div> 
                </div> 
            </div>
        </div>
        `
        return mediaCardHtml;
    }
    return { likes, title, date, getMediaCardDOM }
};

function videoFactory(data, mediaDirectory, mediaCardHtml){
    const { video, id, likes, date, price } = data;
    var title = data.video.replaceAll( '_', ' ');
    title = title.replace('.mp4', ' ');
    data.title = title;
    heartColor = data.liked;
    if (heartColor == undefined){
        heartColor = "far fa-heart";
    };

    function getMediaCardDOM() { 
        //créer la carte HTML pour l'affichage de la vidéo, de son titre et de ses likes
        mediaCardHtml += `
        <div class="media video">
            <video src="./assets/images/${mediaDirectory}/${video}" title="${title}" tabindex="0">
            </video>
            <div class="titleAndLikes">
                <div class="title">${title}</div>
                <div class="likes">
                    <div aria-label="nombre de likes" tabindex="0">${likes}</div>
                    <div aria-label="cliquez pour liker"><i class="${heartColor} fa-heart" id="${title}" tabindex="0"></i></div> 
                </div>
            </div>
        </div>
        `;
        return mediaCardHtml
    }
    return { likes, title, date, getMediaCardDOM }
};

function videoFactory(data,mediaDirectory,photographerMedia,mediaCardHtml){
    const { video, id, likes, date, price } = data;
    var title = data.video.replaceAll('_',' ');
    title = title.replace('.mp4','');
    data.title = title;
    heartColor = data.liked;
    if (heartColor == undefined){
        heartColor = "far fa-heart";
    };
    function getMediaCardDOM(){ //créer la carte HTML pour l'affichage de la vidéo, de son titre et de ses likes
        mediaCardHtml +=`
        <div class="media video">
            <video src="./assets/images/${mediaDirectory}/${video}" title="${title}" tabindex="0">
            </video>
            <div class="titleAndLikes">
                <div class="title">${title}</div>
                <div class="likes">
                    <div aria-label="nombre de likes" tabindex="0">${likes}</div>
                    <div aria-label="cliquez pour liker"><i class="${heartColor} fa-heart" id="${title}" tabindex="0"></i></div> 
                </div>
            </div>
        </div>
        `;
        return mediaCardHtml
    }
    return { likes, title, date, getMediaCardDOM }
}

function mediaFactory(data, mediaDirectory, photographerMedia, tabindex) {
    var mediaType = Object.keys(data)[3];
    if (mediaType == "image"){
        return imageFactory(data, mediaDirectory, photographerMedia, tabindex);
    }else{
        return videoFactory(data, mediaDirectory, photographerMedia, tabindex);
    }

}