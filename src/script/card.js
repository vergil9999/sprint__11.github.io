import PopupImage from './popupimage.js'

class Card {
  constructor(name, link) {
    this.placeName = name;
    this.placeLink = link;    
    this.cardItem = this.create(name, link);
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);

    this.cardItem
      .querySelector('.place-card__delete-icon')
      .addEventListener('click', this.remove);
    this.cardItem
      .querySelector('.place-card__like-icon')
      .addEventListener('click', this.like); 
  }

  like() {
    this.like = !this.like; 
    this.cardItem.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked')
  }

  remove() {
    this.cardItem.parentNode.removeChild(this.cardItem);
  }

  create(name, link) {
    const cardItem = document.createElement('div');
    cardItem.className = 'place-card';
    
    const cardImage = document.createElement('div'); 
    cardImage.className = 'place-card__image';
    cardImage.style.backgroundImage = 'url(' + link + ')';
    cardItem.appendChild(cardImage);
   
    cardImage.addEventListener('click', function(event){
      if (!event.target.classList.contains('place-card__delete-icon')) {
        const popupimg = new PopupImage(document.querySelector('#increaseImage'));
        popupimg.popupimage(cardImage.style.backgroundImage);
      } 
    })
    
    const cardDeleteIcon = document.createElement('button');
    cardDeleteIcon.className = 'place-card__delete-icon';
    cardImage.appendChild(cardDeleteIcon);
    
    const cardDescription = document.createElement('div');
    cardDescription.className = 'place-card__description';
    cardItem.appendChild(cardDescription);
    
    const cardName = document.createElement('h3'); 
    cardName.className = 'place-card__name';
    cardName.textContent = name;
    cardDescription.appendChild(cardName);
    
    const cardLikeIcon = document.createElement('button');
    cardLikeIcon.className = 'place-card__like-icon';
    cardDescription.appendChild(cardLikeIcon);

    return cardItem;
  }
}

export default Card