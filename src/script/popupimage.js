import Popup from './popup.js'

class PopupImage extends Popup {
    constructor(popupElem) {
      super(popupElem);
      document.querySelector('.place-card__image').addEventListener('click', this.popupimage);
      const popupIncreaseImage = document.querySelector('#increaseImage');
      this.popupIncreaseImage = popupIncreaseImage;
    }
  
    // функция создания и показа попапа при нажатии на картинку
    popupimage(link) {
      const popupIncreaseImage = document.querySelector('#increaseImage');
      this.popupIncreaseImage = popupIncreaseImage;
      this.popupIncreaseImage.firstElementChild.style.backgroundImage = link;
      this.popupIncreaseImage.firstElementChild.style.backgroundSize = 'cover';
      this.popupIncreaseImage.firstElementChild.style.backgroundRepeat = 'no-repeat';  
      this.popupIncreaseImage.firstElementChild.style.maxWidth = '80vw';
      this.popupIncreaseImage.firstElementChild.style.maxHeight = '80vh';
      this.popupIncreaseImage.classList.add('place-card__image-popup');  
      this.popupIncreaseImage.classList.add('popup_is-opened');
    }
  
    close(){
      this.popupIncreaseImage.classList.remove('place-card__image-popup');
      this.popupIncreaseImage.classList.remove('popup_is-opened');  
    }
  }

  export default PopupImage