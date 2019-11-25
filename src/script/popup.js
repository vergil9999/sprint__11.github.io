class Popup {
    constructor(popupElem, button){
      this.popupElem = popupElem;    
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.popupElem
        .closest('.popup').querySelector('.popup__close')
        .addEventListener('click', this.close);
      
      if (button) { // если передаём попап, который открывается при нажатии кнопки
        this.button = button;
  
        this.button
          .addEventListener('click', this.open);
      }    
    }
  
    open() {
      console.log('open');
      this.popupElem.classList.add('popup_is-opened');
    }
  
    close(){
      this.popupElem.closest('.popup').classList.remove('popup_is-opened');
    }
  }

  export default Popup