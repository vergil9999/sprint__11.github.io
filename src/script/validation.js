export function handleValidate(event) {    
    resetError(event.target);
    validate(event.target);
  }
  
  export function validate(element) {
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
  
  export function activateError(element) {
    element.parentNode.querySelector(`.popup__input_${element.id.slice(6,)}`).classList.add('popup__invalid');
  }
  
  export function resetError (element) {
    element.parentNode.querySelector(`.popup__input_${element.name}`).classList.remove('popup__invalid');  
    document.getElementById(`error-${element.name}`).textContent = '';
  }
