
function imageFactory(data, mediaDirectory, photographerMedia, mediaCardHtml){
    const {title, image, id, likes, date, price} = data;
    heartColor = data.liked;
    if (heartColor == undefined){
        heartColor = "far fa-heart";
    };
    function getMediaCardDOM(){ 
        //créer la carte HTML pour l'affichage de l'image, de son titre et de ses likes
        mediaCardHtml += `
            <div class="media image">
            <img src="./assets/images/${mediaDirectory}/${image}" alt="${title}" tabindex="-1">
            <div class="titleAndLikes">
                <div class="title">${title}</div>
                <div class="likes">
                    <h4 aria-label="nombre de likes" tabindex="-1">${likes}&nbsp;</h4>
                    <h3 aria-label="cliquez pour liker"><i class="${heartColor}" id="${title}" tabindex="-1"></i></h3> 
                </div> 
            </div>
        </div>
        `
        return mediaCardHtml;
    }
    return {likes, title, date, getMediaCardDOM }
}

function videoFactory(data, mediaDirectory, photographerMedia, mediaCardHtml){
    const {video, id, likes, date, price} = data;
    var title = data.video.replaceAll( '_', ' ');
    title = title.replace('.mp4', ' ');
    data.title = title;
    heartColor = data.liked;
    if (heartColor == undefined) {
        heartColor = "far fa-heart";
    };

    function getMediaCardDOM() { 
        //créer la carte HTML pour l'affichage de la vidéo, de son titre et de ses likes
        mediaCardHtml += `<div class="media video">
            <video src="./assets/images/${mediaDirectory}/${video}" title="${title}" tabindex="-1">
            </video>
            <div class="titleAndLikes">
                <div class="title">${title}</div>
                <div class="likes">
                    <h4 aria-label="nombre de likes" tabindex="-1">${likes}&nbsp;</h4>
                    <h3 aria-label="cliquez pour liker"><i class="${heartColor} fa-heart" id="${title}" tabindex="-1"></i></h3> 
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
    if (mediaType == "image") {
        return imageFactory(data, mediaDirectory, photographerMedia, tabindex);
    } else {
        return videoFactory(data, mediaDirectory, photographerMedia, tabindex);
    }

}