import {Api, api} from './api.js'
import Card from './card.js'
import CardList from './cardlist.js'
import Popup from './popup.js'
import PopupImage from './popupimage.js'
import PopupWithValidation from './popupwithvalidation.js'
import {handleValidate, validate, activateError, resetError} from './validation.js'

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4' : 'https://praktikum.tk/cohort4'

api.getUser().then(data => {
  if (data.name && data.about)  {
    document.querySelector('.user-info__name').textContent = data.name;
    document.querySelector('.user-info__job').textContent = data.about;
    document.querySelector('.user-info__photo').style.backgroundImage = `url(${data.avatar})`;
  }
});

api.getInitialCards().then(cards => {
  if(cards && cards.length > 0) {
    new CardList(document.querySelector('.places-list'), cards, buttonAddCard);  
  }  
});

const formUserInfo = document.forms.userInfoEdit;
formUserInfo.addEventListener('submit', function(event){
  event.preventDefault();
  api.editUserOnServer().then(user => {                 
    if (user.name && user.about) {
      document.querySelector('.user-info__name').textContent = user.name;
      document.querySelector('.user-info__job').textContent = user.about;
      document.querySelector('#userInfoEdit').classList.remove('popup_is-opened');
    }      
  });         
});

export const formNewCard = document.forms.newCard;
const placeName =  formNewCard.elements[0];
const placeLink = formNewCard.elements[1];
const placeSubmit = formNewCard.elements[2];

// ********** СОЗДАНИЕ ОБЪЕКТОВ ***********
const cardmaker = document.querySelector('#cardmaker'); //попап с формой добавления карточки
const buttonAddCard = document.querySelector('#newCardButton'); //кнопка - для открытия попапа добавления карточки
const popupCardmaker = new PopupWithValidation(cardmaker, buttonAddCard);
const userEdit = document.querySelector('#userInfoEdit'); //попап с формой редактирования Имени/Работы юзера
const buttonUserEdit = document.querySelector('.user-info__editButton'); //кнопка Edit для открытия попапа формы редактирования
const popupUserEdit = new PopupWithValidation(userEdit, buttonUserEdit);
const placesList = document.querySelector('.places-list');