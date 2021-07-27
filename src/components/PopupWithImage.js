import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  open({ name, imagePath }) {
    const image = document.querySelector('.popup__place-image');
    const label = document.querySelector('.popup__place-name');

    image.src = imagePath;
    image.alt = label.textContent = name;

    super.open();
  }
}