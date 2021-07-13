// Класс валидатора
export class FormValidator {

  // Конструктор. Принимает на вход объект с настройками валидации и формой которую требуется валидировать
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }

  // Запуск механизма валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  // Сброс валидации у элементов формы: скрытие текста ошибок + откат submit-кнопки к default-состоянию
  resetFormValidationState() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(inputList, buttonElement);
  }

  // Проверка валидности элемента формы
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Добавление слушателей событий
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  // Отобразить текст ошибки у переданного элемента формы
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  };

  // Скрыть текст ошибки у переданного элемента формы
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  };

  // Поменять состояние переданной кнопки базируясь на валидности переданных элементов
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  // Проверка наличия невалидного элемента в переданном массиве элементов
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  };
}