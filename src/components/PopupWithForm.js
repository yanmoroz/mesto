import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handlePopupOpening, handleFormSubmit }) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
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

  open() {
    if (this._handlePopupOpening) {
      this._handlePopupOpening();
    }

    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}