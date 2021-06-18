const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, validationParams) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationParams.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationParams.errorClass);
};

const hideInputError = (formElement, inputElement, validationParams) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParams.inputErrorClass);
  errorElement.classList.remove(validationParams.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationParams) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationParams);
  } else {
    hideInputError(formElement, inputElement, validationParams);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationParams) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationParams.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(validationParams.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, validationParams) => {
  const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
  const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationParams);
      toggleButtonState(inputList, buttonElement, validationParams);
    });
  });
};

const enableValidation = (validationParams) => {
  const formList = Array.from(document.querySelectorAll(validationParams.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationParams);
  });
};

const refreshFormValidationState = (formElement, validationParams = validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
  const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationParams);
  });
  toggleButtonState(inputList, buttonElement, validationParams);
}

enableValidation(validationConfig);