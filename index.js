let editPopup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let nameLabel = document.querySelector('.profile__name');
let aboutLabel = document.querySelector('.profile__about');

let likeButtons = document.querySelectorAll('.card__like-button');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name-input');
let aboutInput = document.querySelector('#about-input');

for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', function() {
    likeButtons[i].classList.toggle('card__like-button_liked');
  });
}

editButton.addEventListener('click', function() {
  nameInput.value = nameLabel.textContent;
  aboutInput.value = aboutLabel.textContent;
  editPopup.classList.toggle('popup_opened');
});

closePopupButton.addEventListener('click', function() {
  editPopup.classList.toggle('popup_opened');
});

formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();

  nameLabel.textContent = nameInput.value;
  aboutLabel.textContent = aboutInput.value;
  editPopup.classList.toggle('popup_opened');
});