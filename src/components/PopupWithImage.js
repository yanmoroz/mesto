import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector: popupSelector });

    this._popupCardImage = document.querySelector('.popup__place-image');
    this._captionImage = document.querySelector('.popup__place-name');
  }

  open({ name, imagePath }) {
    this._popupCardImage.src = imagePath;
    this._popupCardImage.alt = this._captionImage.textContent = name;

    super.open();
  }
}