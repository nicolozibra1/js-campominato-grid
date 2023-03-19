/*
Consegna

L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro,
ed emetto un messaggio in console con il numero della cella cliccata.
*/

const levelForm =  document.getElementById('levelForm');
levelForm.addEventListener('submit', play);

// funzione per disegnare le celle
function drawSquare(index, numSquares) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `calc(100% / ${numSquares})`;
    square.style.height = square.style.width;
    square.innerHTML = index;
    return square;
}

// FUNZIONE PER GENERARE L'ARRAY DELLE BOMBE
function generateBombs(bombnum, numSquares) {
    const bombs = [];

    while(bombs.length < 16) {
        const bomb = getRndNumber(1, numSquares);

        if(!bombs.includes(bomb)) {
        bombs.push(bomb);
        }
    }
    return bombs;
}
function play(e) {
    e.preventDefault();

    const preload = document.querySelector('.wrapper-preload');
    preload.classList.add('d-none');
    const game = document.querySelector('.wrapper');
    game.classList.remove('d-none');
    const playground = document.getElementById('playground');
    playground.innerHTML = "";
    playground.classList.remove('d-none');

    const NUM_BOMBS = 16;

    // prendo il livello
    const level = document.getElementById('level').value;
    console.log(level);

    // imposto il numero di celle a seconda del livello               
    let squareNumbers;

    switch (level) {
        case 'easy':
            squareNumbers = 100;
            break;
        case 'medium':
            squareNumbers = 81;
            break;
        case 'hard':
            squareNumbers = 49;
    };
    console.log(squareNumbers);

    // determino il numero di celle per lato
    let squareRow = Math.sqrt(squareNumbers);
    console.log(squareRow);

    const bombs = generateBombs(NUM_BOMBS, squareNumbers);
    
    console.log(bombs);


    // ciclo per il numero di celle e genero la singola cella
    for (let i = 1; i <= squareNumbers; i++){
        const square = drawSquare(i, squareRow);

        if (bombs.includes(i)) {
            square.addEventListener('click', function() {
            square.classList.add('dead');
            });
        }
        else {
            square.addEventListener('click', function () {
            square.classList.add('safe');
            })
        }
        playground.appendChild(square);    
        
    // audio
    const audioPlayer = document.getElementById("audio-player");

    audioPlayer.play();
    }
}

// collego il bottone e con una funzione faccio apparire il canvas
const info = document.getElementById('info-btn');
const canvas = document.querySelector('.rules-canvas');

info.addEventListener('click', function() {
    canvas.classList.toggle('d-none');
    
})
const closeCan = document.querySelector('.close-canvas');

closeCan.addEventListener('click', function() {
    canvas.classList.toggle('d-none');
})

// collego il bottone e faccio apparire il modal
const chooseLevel = document.getElementById('btn-choose');
const modalAlert = document.querySelector('.modal-alert')

chooseLevel.addEventListener('click', function() {
    modalAlert.classList.remove('d-none');
})

const btnQuit = document.getElementById('btn-cancel');

btnQuit.addEventListener('click', function () {
    modalAlert.classList.add('d-none');
})

// AUDIO
const boxAudioOn = document.getElementById("box-audio-on");
const boxAudioOff = document.getElementById("box-audio-off");
const vHigh = document.querySelector(".fa-volume-high")
const vNone = document.querySelector(".fa-volume-xmark")

boxAudioOn.addEventListener('click', function() {
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.pause();
    
    boxAudioOn.classList.toggle("d-none");
    boxAudioOff.classList.toggle("d-none");

})

boxAudioOff.addEventListener('click', function() {
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.play();

    boxAudioOn.classList.toggle("d-none");
    boxAudioOff.classList.toggle("d-none");
})

const btnPlay = document.getElementById('btn-play')

btnPlay.addEventListener('mouseover', function() {
    const audioEffect = document.getElementById('audio-effect');
    audioEffect.play();
})