class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    if (!this.cards) return undefined;

    for (let i = 0; i < this.cards.length - 1; i++) {
      const j = randomInt(i, this.cards.length);
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  checkIfPair(card1, card2) {
    this.pairsClicked++;
    if (card1 === card2) {
      this.pairsGuessed++;
      return true;
    }
    return false;
  }

  checkIfFinished() {
    return this.pairsGuessed === this.cards.length / 2;
    
  }
}

// helper function to be used while shuffling
// returns a random integer number between a (inclusive) to b (excluded)
function randomInt(a, b) {
  
  if (a >= b) return null;

  return Math.floor(Math.random() * (b-a) + a)
}

// export default MemoryGame