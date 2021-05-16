let editPopup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let nameLabel = document.querySelector('.profile__name');
let aboutLabel = document.querySelector('.profile__about');
let saveButton = document.querySelector('.popup__save-button');

let nameTextField = document.querySelector('#name-input');
let aboutTextField = document.querySelector('#about-input');

editButton.addEventListener('click', function() {
  nameTextField.value = nameLabel.textContent;
  aboutTextField.value = aboutLabel.textContent;
  editPopup.classList.toggle('popup_opened');
});

closePopupButton.addEventListener('click', function() {
  editPopup.classList.toggle('popup_opened');
});

saveButton.addEventListener('click', function() {
  nameLabel.textContent = nameTextField.value;
  aboutLabel.textContent = aboutTextField.value;
  editPopup.classList.toggle('popup_opened');
});