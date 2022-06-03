const modal = document.getElementById("contact_modal");
const main = document.getElementById("main");
let firstName = document.getElementById('firstName'); 
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');

function displayModal() {
	modal.style.display = "block";
    main.setAttribute('aria-hidden','true');
    modal.setAttribute('aria-hidden','false');

    //navigation au clavier
    ariaCompliant(modal);
    const submitBtn = document.getElementById("send");

    // au clic sur "envoyer" on n'envoie que s'il n'y a pas d'erreur dans les champs (all errors = 0)
    submitBtn.addEventListener("click",(e) => {
        let errorFirstName = firstNameError(firstName.value);
        let errorLastName = lastNameError(lastName.value);
        let errorEmail = emailError(email.value);
        if (errorFirstName + errorLastName + errorEmail == 0) {
            e.preventDefault();
            console.log(document.getElementById('firstName').value);
            console.log(document.getElementById('lastName').value);
            console.log(document.getElementById('email').value);
            console.log(document.getElementById('message').value);
            closeModal();
        } else {
            e.preventDefault();
            return
        }
    });

    //"envoyer" cliquable au clavier
    submitBtn.addEventListener("keyup", (e) => {
        if (e.key === enter) {
            e.preventDefault();
            submitBtn.click();
        }
    });
}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden','true');
    main.setAttribute('aria-hidden','false');
}


//TESTS DU QUESTIONNAIRE
//Test firstName
//les letiables erreursChamp sont à 1 s'il y a une erreur dans ce champ, 0 sinon
let errorFirstName = 1;  

//string de message d'erreur affiché à l'utilisateur
const logFirstName = document.getElementById('logFirstName'); 
firstName.addEventListener('change', (e) => firstNameError(e.target.value));

function firstNameError(firstNameInput) {
    firstName.style.borderWidth = "5px";
    if (firstNameInput.length > 1) {
        firstName.style.borderColor = "green";
        logFirstName.style.display = "none";
        errorFirstName = 0;
    } else {
        firstName.style.borderColor = "red";
        errorFirstName = 1;
        logFirstName.style.display = "block";
        logFirstName.innerHTML = "<span style='font-size: 16px; font-style: italic; color: black'>Veuillez entrer 2 caractères au minimum.</span>";
    }
    return errorFirstName
};

//Test lastName
//les letiables erreursChamp sont à 1 s'il y a une erreur dans ce champ, 0 sinon
let errorLastName = 1; 

//string de message d'erreur affiché à l'utilisateur
const logLastName = document.getElementById('logLastName'); 
lastName.addEventListener('change', (e) => lastNameError(e.target.value));
//lastName.addEventListener('change', (e) => {
//    const lastNameInput = e.target.value;
//    lastNameError(lastNameInput);
//});

function lastNameError(lastNameInput) {
    lastName.style.borderWidth = "5px";
    if (lastNameInput.length > 1) {
        lastName.style.borderColor = "green";
        logLastName.style.display = "none";
        errorLastName = 0;
    } else {
        lastName.style.borderColor = "red";
        errorLastName = 1;
        logLastName.style.display = "block";
        logLastName.innerHTML ="<span style='font-size:16px; font-style: italic; color:black'>Veuillez entrer 2 caractères au minimum.</span>";
    }
    return errorLastName
};


//Test mail
//les letiables erreursChamp sont à 1 s'il y a une erreur dans ce champ, 0 sinon
let errorEmail = 1; 

//champ de message d'erreur à destination de l'utilisateur
const logEmail = document.getElementById('logEmail'); 
email.addEventListener('change', (e) => {
    const emailInput = e.target.value;
    emailError(emailInput);
});


function emailError(emailInput) {
  email.style.borderWidth = "5px";
  //Regex d'une adresse mail
  let regexEmail	= /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/; 
  if (regexEmail.exec(emailInput) != null) {
    email.style.borderColor = "green";
    logEmail.style.display = "none";
    //on valide le test dès que le champs respecte le format d'une adresse mail
    errorEmail = 0; 
  } else {
    email.style.borderColor = "red";
    errorEmail = 1;
    logEmail.style.display = "block";
    logEmail.innerHTML = "<span style='font-size:16px; color:black'> Veuillez entrer une adresse email valide.</span>";
  }
  return errorEmail
};
