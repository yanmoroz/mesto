// Variables defining
let editPopup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let nameLabel = document.querySelector('.profile__name');
let aboutLabel = document.querySelector('.profile__about');
let saveForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name-input');
let aboutInput = document.querySelector('#about-input');

// Functions defining
// Функция открытия попап при нажатии на кнопку редактирования
function openPopup() {
  editPopup.classList.add('popup_opened');
  nameInput.value = nameLabel.textContent;
  aboutInput.value = aboutLabel.textContent;
}

// Функция закрытия попап при нажатии на кнопку-крестик (без сохранения)
function closePopup() {
  editPopup.classList.remove('popup_opened');
}

// Функция сохранения введенных данных и закрытия попап при нажатии на кнопку "Сохранить"
function saveFormSubmitHandler(evt) {
  evt.preventDefault();
  nameLabel.textContent = nameInput.value;
  aboutLabel.textContent = aboutInput.value;
  openPopup();
}

// Click and sumbit handlers assigning
editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
saveForm.addEventListener('submit', saveFormSubmitHandler);