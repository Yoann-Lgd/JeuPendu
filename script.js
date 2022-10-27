const mots = ['pendu', 'table', 'alphabet', 'herbe', 'califourchon', 'brevet', 'sud'];
let motATrouver;
let lettreTrouvee = 0;
let mauvaiseLettre = 0;


document.addEventListener('DOMContentLoaded', function(){
    chargerUnMot();
});


function jouer(){
    genererDesBouttons();
    afficherMot();
    rejouer();
}

function chargerUnMot(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET" , "https://random-word-api.herokuapp.com/word", true);
    xhr.onload = (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                motATrouver = JSON.parse(xhr.responseText).find(x=>x!==undefined).toUpperCase();
                jouer();
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = (e) => {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}


function afficherMot(){
    let mot = document.getElementById("mot");
    for(let i=1; i <= motATrouver.length; i++){
        let lettre = document.createElement("span");
        lettre.innerHTML = "_";
        lettre.setAttribute("id", i.toString());
        mot.appendChild(lettre);
    }
}

function genererDesBouttons(){
    let boutons = document.getElementById("boutons");
    for(let i=0; i < 26; i++){
        let button = document.createElement("button");
        let lettre = String.fromCharCode(i + 65).toUpperCase();
        button.appendChild(document.createTextNode(lettre.toUpperCase()));
        button.setAttribute("id", lettre);
        button.onclick = function(){verificationLettre(button.id) ; desactiverUnBouton(button.id)};
        boutons.appendChild(button);
    }
}

function desactiverUnBouton(btnId) {
    document.getElementById(btnId).disabled = true;
    document.getElementById(btnId).style.backgroundColor = 'grey';
}
function reinitialiserLesBoutons(){
    const button = document.querySelectorAll("button");
    button.forEach( bouton => {
        bouton.disabled = false;
        bouton.style.backgroundColor = '#eae2c7';
    });
}

function verificationLettre(lettre){
    const figurePartie = document.querySelectorAll('.figure-partie');
    const popup = document.getElementById("popup-contenant");
    const messageFinal = document.getElementById("message-final");
    let trouve = false;
    let i = 1;
    for(const element of motATrouver){
        if(lettre === element){
            trouve = true;
            document.getElementById(i.toString()).innerHTML = lettre;
            lettreTrouvee++;
        }
        i++;
    } if (!trouve){
        mauvaiseLettre ++;
        afficherBonhomme();
    }

    if (lettreTrouvee === motATrouver.length){
        messageFinal.innerHTML = "Congratulations, you found the word that was : " + motATrouver;
        popup.style.display = 'flex';
    } else if(mauvaiseLettre === figurePartie.length){
        messageFinal.innerHTML = "You didn't manage to find the word that was : " + motATrouver;
        popup.style.display = 'flex';
    }

}

function afficherBonhomme() {
    const figurePartie = document.querySelectorAll('.figure-partie');
    figurePartie.forEach((partie, index) => {
        if (index < mauvaiseLettre) {
            partie.style.display = 'block';
        } else {
            partie.style.display = 'none';
        }
    })
}

function effacerLeMot(){
    let mot = document.getElementById("mot");
    mot.innerHTML ="";
}

function rejouer(){
    const popup = document.getElementById("popup-contenant");
    let rejouerBtn= document.getElementById("bouton-jouer");
    rejouerBtn.addEventListener('click', () =>{
        lettreTrouvee = 0;
        mauvaiseLettre = 0;
        effacerLeMot();
        reinitialiserLesBoutons();
        afficherMot();
        afficherBonhomme();
        popup.style.display = 'none';
    })
}


