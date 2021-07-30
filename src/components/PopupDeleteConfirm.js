import { Popup } from "./Popup";

export class PopupDeleteConfirm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector: popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button');
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._context);
    });
  }

  open({ context }) {
    this._context = context;
    super.open();
  }

  updateSubmitButtonTitle({ title }) {
    this._submitButton.textContent = title;
  }
}