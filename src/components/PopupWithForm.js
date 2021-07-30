import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handlePopupOpening, handleFormSubmit }) {
    super({ popupSelector: popupSelector });

    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button');
    this._handleFormSubmit = handleFormSubmit;
    this._handlePopupOpening = handlePopupOpening;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  open(context) {
    this._context = context;
    
    if (this._handlePopupOpening) {
      this._handlePopupOpening();
    }

    super.open();
  }

  close() {
    this._context = null;
    super.close();
    this._form.reset();
  }

  getContext() {
    return this._context;
  }

  updateSubmitButtonTitle({ title }) {
    this._submitButton.textContent = title;
  }
}