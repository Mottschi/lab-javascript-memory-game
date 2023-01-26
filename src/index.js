const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];


function startGame() {
  const memoryGame = new MemoryGame(cards);
  memoryGame.shuffleCards();
  document.querySelector('#pairs-clicked').textContent = 0;
  document.querySelector('#pairs-guessed').textContent = 0;

  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      let flippedCards = document.querySelectorAll('.turned:not(.blocked)');
      
      // cannot turn more then 2 cards at a time
      if (flippedCards.length >= 2) return;

      card.classList.add('turned');
      flippedCards = document.querySelectorAll('.turned:not(.blocked)');

      if (flippedCards.length === 2) {
        if (memoryGame.checkIfPair(flippedCards[0].dataset.cardName, flippedCards[1].dataset.cardName)) {
          document.querySelector('#pairs-guessed').textContent = memoryGame.pairsGuessed;
          flippedCards.forEach(card => {
            card.classList.add('blocked');
          })
          if (memoryGame.checkIfFinished()) {
            setTimeout(()=>{
              document.querySelector('dialog > p > span').textContent = memoryGame.pairsClicked;
              document.querySelector('dialog').showModal();
            }, 500)
          }
        } else {
          setTimeout(()=>{
            flippedCards.forEach(card => {
              card.classList.remove('turned');
            }) 
          }, 3000)
        }

        document.querySelector('#pairs-clicked').textContent = memoryGame.pairsClicked;

      }

    });

  });  
}

window.addEventListener('load', (event) => {
  startGame();
  document.querySelector('dialog > button').addEventListener('click', ()=>{
    startGame();
    document.querySelector('dialog').close();
  });
});