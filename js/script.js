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
    }
}

