const mots = ['fff', 'test', 'ooo'];
let motATrouver = selectionnerUnMot();
let lettreTrouvee = 0;
let mauvaiseLettre = 0;


document.addEventListener('DOMContentLoaded', function(){
    genererDesBouttons();
    afficherMot();
    rejouer();
});


function selectionnerUnMot(){
    return mots[Math.floor(Math.random() * mots.length)];
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
        let lettre = String.fromCharCode(i + 65).toLowerCase();
        button.appendChild(document.createTextNode(lettre.toUpperCase()));
        button.setAttribute("id", lettre);
        button.onclick = function(){verificationLettre(button.id)};
        boutons.appendChild(button);
    }
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
        messageFinal.innerHTML = "Felicitation tu as trouvé le mot qui était : " + motATrouver;
        popup.style.display = 'flex';
    } else if(mauvaiseLettre === figurePartie.length){
        messageFinal.innerHTML = "Tu n'es pas parvenu à trouver le mot qui était : " + motATrouver;
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

    function rejouer(){
        let mot = document.getElementById("mot");
        const popup = document.getElementById("popup-contenant");
        let rejouerBtn= document.getElementById("bouton-jouer");
        rejouerBtn.addEventListener('click', () =>{
            lettreTrouvee = 0;
            mauvaiseLettre = 0;
            motATrouver = selectionnerUnMot();
            afficherMot();
            afficherBonhomme();
            popup.style.display = 'none';
        })
    }


