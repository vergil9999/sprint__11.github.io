import Popup from './popup.js'
import {handleValidate} from './validation.js'

class PopupWithValidation extends Popup {
    constructor(popupElem, button){
      super(popupElem, button);
    }
  
    open() {
      //случай открытия формы редактирования инфо о пользователе Edit
  
      /* Можно лучше: есть условная проверка где произошел клик - можно было просто сделать два разных
      класса для каждого типа попапа, а не проверять какой класс у кнопки  */
      if (this.button.classList.contains('user-info__editButton')) {
        this.popupElem.classList.add('popup_is-opened');
  
        const formUserInfo = document.forms.userInfoEdit;
        formUserInfo.userName.value = document.querySelector('.user-info__name').textContent;
        formUserInfo.userJob.value = document.querySelector('.user-info__job').textContent;
        
  
        document.querySelector(`.popup__input_userName`).classList.remove('popup__invalid');  
        document.querySelector(`.popup__input_userJob`).classList.remove('popup__invalid');  
        document.getElementById(`error-userName`).textContent = '';
        document.getElementById(`error-userJob`).textContent = '';
  
        /* Можно лучше: здесь и далее не нужно навешивать обработчики при кадом открытии попапа, лучше 
        делать это один раз в конструкторе */
              
        formUserInfo.addEventListener('input', function(event){  
          event.preventDefault();
          handleValidate(event);
        })
  
        //функция обновления имени/работы пользователя
        // function renameUser(name, job){
        //   document.querySelector('.user-info__name').textContent = name;
        //   document.querySelector('.user-info__job').textContent = job;
        // }
      }  
  
      //случай открытия формы добавления нового места
      if (this.button.id === "newCardButton") {
        //валидация на ввод в форму нового места
        const formNewCard = document.forms.newCard;
        formNewCard.addEventListener('input', function(event){
          event.preventDefault();
          handleValidate(event);
        })
      }      
    } 
  }

  export default PopupWithValidation