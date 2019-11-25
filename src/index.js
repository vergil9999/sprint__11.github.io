import "./style.css";
import Card from './card.js'
import CardList from './cardlist.js'
import Popup from './popup.js'
import PopupImage from './popupimage.js'
import PopupWithValidation from './popupwithvalidation.js'
import {handleValidate, validate, activateError, resetError} from './validation.js'

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4' : 'https://praktikum.tk/cohort4'
