//Grabing couple of things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 4;

playerLivesCount.textContent = playerLives;

const getData = () => [
    {imgSrc: "./images/1.jpg", name: "one"},
    {imgSrc: "./images/2.jpg", name: "two"},
    {imgSrc: "./images/3.jpg", name: "three"},
    {imgSrc: "./images/4.jpg", name: "Four"},
    {imgSrc: "./images/1.jpg", name: "one"},
    {imgSrc: "./images/2.jpg", name: "two"},
    {imgSrc: "./images/3.jpg", name: "three"},
    {imgSrc: "./images/4.jpg", name: "Four"},
];

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    // console.log(cardData);
    return cardData;
};
//card Generator function
const cardGenerator = () => {
    const cardData = randomize()
//     console.log(cardData);

cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    // Attach the cards 
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);
    // attaching the card to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
        card.classList.toggle("toggleCard");
        checkCards(e);
    });
  });
};

//card Checking 
const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    console.log(flippedCards);
    
    // STATEMENTS
    if (flippedCards.length === 2) {
        if (  
            flippedCards[0].getAttribute("name") === 
            flippedCards[1].getAttribute("name")
         ) {
            console.log("match");
            flippedCards.forEach( (card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        } else {
            console.log("Wrong");
            flippedCards.forEach( (card) => {
                card.classList.remove("flipped");
                setTimeout( () => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart("YOU LOSE, TRY AGAIN");
            }
        }
    }
    if(toggleCard.length === 8 ){
        restart("YAAY, YOU WON THE GAME")
    }
};

// restart 
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach( (item, index) => {
        cards[index].classList.remove("toggleCard")
        
        setTimeout( () => {
            cards[index].style.pointerEvents = "all";
            faces[index].scr = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000 );
    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout( () => window.alert(text), 100);
};
cardGenerator();

