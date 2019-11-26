import Card from './card.js'


class CardList {
    constructor(container, initialCards, button) {
      this.container = container;
      this.initialCards = initialCards;
      this.buttonAddCard = button;
      this.buttonAddCard.addEventListener('click', function(){
        document.querySelector('#cardmaker').classList.add('popup_is-opened')
      });
        
      const buttonSaveCard = document.querySelector('#saveCardButton'); 
  
      this.addcard = this.addcard.bind(this);
      buttonSaveCard.addEventListener('click', this.addcard);
  
      this.render();
    }
  
    addcard(event) {
      event.preventDefault();
      const formNewCard = document.forms.newCard;
      const name = formNewCard.elements.placeName.value;
      const link = formNewCard.elements.placeLink.value;
      const newcard = new Card(name, link);
      this.container.append(newcard.cardItem);
      document.querySelector('#cardmaker').classList.remove('popup_is-opened'); 
    }
  
    render() {
      this.initialCards.forEach( (item) => { 
        const name = item.name;
        const link = item.link;      
        const {cardItem} = new Card(name, link);
        this.container.appendChild(cardItem);
      })
    }
  }

  export default CardList