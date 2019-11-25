/* Можно лучше: Использование строгого режима.
* Подробнее можно почитать здесь: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Strict_mode (ES5 стандарт)
* */



// **** КЛАССЫ ****

class Api {
  constructor(options){
    console.log(this);
    this.baseUrl = options.baseUrl;
    this.token = options.headers.authorization;
  }

  getUser(){
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
  
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
  .catch((err)=> {
    console.log('Ошибка. Запрос не выполнен. Код ошибки:', err);
  });
}

getInitialCards() {
  return fetch(`${this.baseUrl}/cards`, {
    headers: {
      authorization: this.token
    }
  })
  .then((res) => {
    if (res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
  .catch((err) => {
    console.log(`Ошибка. Запрос не выполнен. Код ошибки:`, err);
  });
}

editUserOnServer(){
  return fetch(`${this.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization:  this.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: document.forms.userInfoEdit.userName.value,
      about: document.forms.userInfoEdit.userJob.value
    })
  })  

  .then((res) => {
    if (res.ok) {
      return res.json();        
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен. Код ошибки:', err);      
  });


}

}

const api = new Api ({
  baseUrl: 'http://95.216.175.5/cohort3',
  headers: {
    authorization: '8191c73e-5084-4b04-b556-a3a99acdba1b',
    'Content-Type': 'application/json'
  }
});

api.getUser().then(data => {
  if (data.name && data.about) {
    document.querySelector('.user-info__name').textContent = data.name;
    document.querySelector('.user-info__job').textContent = data.about;
    document.querySelector('.user-info__photo').style.backgroundImage = `url(${data.avatar})`;
  }
});

api.getInitialCards().then(cards => {
  new CardList(document.querySelector('.places-list'), cards, buttonAddCard);
});


const formUserInfo = document.forms.userInfoEdit;
formUserInfo.addEventListener('submit', function(e){
  e.preventDefault();
  api.editUserOnServer().then(user => {
    if (user.name && user.about) {
      document.querySelector('.user-info__name').textContent = user.name;
      document.querySelector('.user-info__job').textContent = user.about;
      document.querySelector('#userInfoEdit').classList.remove('popup_is-opened');
    }
  });
});


class Card {
constructor(name, link) {
  this.placeName = name;
  this.placeLink = link;    
  this.cardItem = this.create(name, link); // Хорошо разметка передается в поле класса
  /**
   * Спринт 9
   * Можно улучшить имя и ссылка записаны в поля класса - 
   * в методах можно использовать без указания параметров
   * по this.placeName
   */
  
  this.like = this.like.bind(this);
  this.remove = this.remove.bind(this); // Хорошо - используется привязка контекста


  this.cardItem
    .querySelector('.place-card__delete-icon')
    .addEventListener('click', this.remove);
  this.cardItem
    .querySelector('.place-card__like-icon')
    .addEventListener('click', this.like); 
}

like() {
  this.cardItem.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked')
}

remove() {
  this.cardItem.parentNode.removeChild(this.cardItem);
  // Спринт 9
  // Можно улучшить в cardItem уже записана конкретная карточка
  // удалить можно через метод this.cardItem.remove()
}

create(name, link) { // Спринт 9 Лишние параметры
  const theCard = document.createElement('div');
  const cardImageElement = document.createElement('div');
  const deleteIconElement = document.createElement('button');
  const cardDescription = document.createElement('div');
  const cardName = document.createElement('h3');
  const likeIcon = document.createElement('button');
  /* Отлично: Правильно выделены переменные в начале функции, единообразным способом.
  * */

  theCard.classList.add('place-card');

  cardImageElement.classList.add('place-card__image');
  cardImageElement.style.backgroundImage = `url(${link})`;
  /* Отлично: Использована интерполяция.
  * */

 cardImageElement.addEventListener('click', function(event){
  if (!event.target.classList.contains('place-card__delete-icon')) {
    popupimg.popupimage(cardImageElement.style.backgroundImage);
  } 
})

  deleteIconElement.classList.add('place-card__delete-icon');
  cardImageElement.appendChild(deleteIconElement);

  cardDescription.classList.add('place-card__description');

  cardName.classList.add('place-card__name');
  cardName.textContent = name;

  likeIcon.classList.add('place-card__like-icon');

  cardDescription.appendChild(cardName);
  cardDescription.appendChild(likeIcon);

  theCard.appendChild(cardImageElement);
  theCard.appendChild(cardDescription);

  return theCard;
}

} // Спринт 9 Можно улучшить форматирование - тело класса должно иметь отступ

class CardList { // Спринт 9 Можно улучшить форматирование - тело класса должно иметь отступ

  constructor(container, initialCards, button) {
  
    this.container = container;
  this.initialCards = initialCards;
  this.buttonAddCard = button;
  this.buttonAddCard.addEventListener('click', function(){
    document.querySelector('#cardmaker').classList.add('popup_is-opened')
  });

  const buttonSaveCard = document.querySelector('#saveCardButton'); //кнопка добавить карточки

  this.addcard = this.addcard.bind(this);
  buttonSaveCard.addEventListener('click', this.addcard);

  this.render();
}

addcard(event) { // Спринт 9 Можно улучшить имена методов разделяют camelCase
  event.preventDefault();
  const name = formNewCard.elements.placeName.value;
  const link = formNewCard.elements.placeLink.value;
  const newcard = new Card(name, link);
  // Спринт 9 Можно улучшить вместо промежуточных переменных
  // удобнее использовать поля класса const { cardItem } = new card
  this.container.append(newcard.cardItem);
  document.querySelector('#cardmaker').classList.remove('popup_is-opened'); 
}
// Спринт 9 Можно улучшить важно разделять обработчики и обычные методы
// получение и отрисовку одной карточки лучше вынести в отдельный метод 
// и вызывать его в обработчике и цикле создания карточек из массива данных

render() {
  this.initialCards.forEach( (item) => {
    //({ name, link }) Спринт 9 можно улучшить получая переменные разбором объекта
    const name = item.name;
    const link = item.link;      
    const {cardItem} = new Card(name, link);
    this.container.appendChild(cardItem);
})
}
}

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

class PopupImage extends Popup {
constructor(popupElem) {
  super(popupElem);
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
  this.popupIncreaseImage.firstElementChild.style.width = '80vw';
  this.popupIncreaseImage.firstElementChild.style.height = '80vh';
  this.popupIncreaseImage.classList.add('place-card__image-popup');  
  this.popupIncreaseImage.classList.add('popup_is-opened');
}

close(){
  this.popupIncreaseImage.classList.remove('place-card__image-popup');
  this.popupIncreaseImage.classList.remove('popup_is-opened');  
}
}

class PopupWithValidation extends Popup {
constructor(popupElem, button){
  super(popupElem, button);

}

open() {

  if (this.button.classList.contains('user-info__editButton')) {
    this.popupElem.classList.add('popup_is-opened');

    const formUserInfo = document.forms.userInfoEdit;
    formUserInfo.userName.value = document.querySelector('.user-info__name').textContent;
    formUserInfo.userJob.value = document.querySelector('.user-info__job').textContent;

    document.querySelector(`.popup__input_userName`).classList.remove('popup__invalid');  
    document.querySelector(`.popup__input_userJob`).classList.remove('popup__invalid');  
    document.getElementById(`error-userName`).textContent = '';
    document.getElementById(`error-userJob`).textContent = '';

    formUserInfo.addEventListener('input', function(event){  
      event.preventDefault();
      handleValidate(event);
    })


  }

  //случай открытия формы добавления нового места
  if (this.button.id === "newCardButton") {
    //валидация на ввод в форму нового места
    formNewCard.addEventListener('input', function(event){
      event.preventDefault();
      handleValidate(event);
    })
  }      
} 
}

// ***** Валидация *****

function handleValidate(event) {    
resetError(event.target);
validate(event.target);
}

function validate(element) {
const errorElement = document.querySelector(`#error-${element.name}`);
if ( !(element.parentNode.elements[0].checkValidity()) || !(element.parentNode.elements[1].checkValidity()) ) {    
  if (element.validity.valueMissing) {
    errorElement.textContent = 'Это обязательное поле';
  } else if (element.validity.tooLong || element.validity.tooShort){
    errorElement.textContent = 'Должно быть от 2 до 30 символов';
  } else {
    errorElement.textContent = element.validationMessage;      
  }
  
  element.parentElement.querySelector('.popup__button').classList.remove('activate-button');    
  element.parentElement.querySelector('.popup__button').setAttribute("disabled", "disabled");
  activateError(errorElement);

} else if (!(element.parentNode.elements[0].checkValidity())) {
  activateError(errorElement);
} else if (!(element.parentNode.elements[1].checkValidity())) {
  activateError(errorElement);
} else {
  element.parentElement.querySelector('.popup__button').classList.add('activate-button');
  element.parentElement.querySelector('.popup__button').removeAttribute("disabled");
}
}

function activateError(element) {
  element.parentNode.querySelector(`.popup__input_${element.id.slice(6,)}`).classList.add('popup__invalid');
}

function resetError (element) {
  element.parentNode.querySelector(`.popup__input_${element.name}`).classList.remove('popup__invalid');  
  document.getElementById(`error-${element.name}`).textContent = '';
}



//формы
const formNewCard = document.forms.newCard;
const placeName =  formNewCard.elements[0];
const placeLink = formNewCard.elements[1];
const placeSubmit = formNewCard.elements[2];


// ПЕРЕМЕННЫЕ
const cardmaker = document.querySelector('#cardmaker'); //попап с формой добавления карточки
const buttonAddCard = document.querySelector('#newCardButton'); //кнопка - для открытия попапа добавления карточки
const popupCardmaker = new PopupWithValidation(cardmaker, buttonAddCard);

const userEdit = document.querySelector('#userInfoEdit'); //попап с формой редактирования Имени/Работы юзера
const buttonUserEdit = document.querySelector('.user-info__editButton'); //кнопка Edit для открытия попапа формы редактирования
const popupUserEdit = new PopupWithValidation(userEdit, buttonUserEdit);

const placesList = document.querySelector('.places-list');
const popupimg = new PopupImage(document.querySelector('#increaseImage'));

/**
 * Работа выполнена хорошо
 * 
 * Обратите внимание на комментарии они помогут сократить создание 
 * промежуточных переменных и не дублировать одинаковую логику
 * 
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%D0%A0%D0%B0%D0%B7%D0%B1%D0%BE%D1%80_%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2
 * https://learn.javascript.ru/coding-style
 */


/**
 * 
 * Хорошая работа спринта и класса Api
 * 
 * Не понимаю, такое чувство что вашу работу перепроверяли перед отправкой на проверку
 * Появляются вопросы после прочтения комментарий рода "Спринт 9 Можно улучшить вместо промежуточных переменных"
 *  
 * 
 * Можно лучше: валидацию убрать в отдельный класс, а валидируемые методы разнести по методам
 * 
 * Можно лучше: названия лучше убрать в объект на подобии 'Должно быть от 2 до 30 символов' 
 * 
 * строки на подобии 
 * element.parentNode.querySelector(`.popup__input_${element.id.slice(6,)}`).classList.add('popup__invalid');
 * плохочитаемы, лучше разбивать
 * 
 * метод popupimage(link)  лучше вынести в некий шаблон. Не надо строить вертуальный DOM сложно поддерживать и не тот случай
 * 
 * 
 * Работа принимается, все обязательные задания выполнены.
 * 
 * @koras
 * 
 */