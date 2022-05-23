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
        
        location.textContent = city + ", " + country;

        const h3 = document.createElement( 'h3' );
        h3.textContent = tagline;

        const h4 = document.createElement( 'h4' );
        h4.textContent = price + "€/jour";

        // ajout des balises dans la balise article
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(h3);
        article.appendChild(h4);
        
        return (linkToPhotographerPage);
    }

    return { name, picture, getUserCardDOM }
}