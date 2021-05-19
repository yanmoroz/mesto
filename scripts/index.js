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
function openEditPopup() {
  editPopup.classList.add('popup_opened');
}

function closeEditPopup() {
  editPopup.classList.remove('popup_opened');
}

function editButtonHandler() {
  openEditPopup();
  nameInput.value = nameLabel.textContent;
  aboutInput.value = aboutLabel.textContent;
}

function closePopupButtonHandler() {
  closeEditPopup();
}

function saveFormSubmitHandler(evt) {
  evt.preventDefault();
  nameLabel.textContent = nameInput.value;
  aboutLabel.textContent = aboutInput.value;
  closeEditPopup();
}

// Click and sumbit handlers assigning
editButton.addEventListener('click', editButtonHandler);
closePopupButton.addEventListener('click', closePopupButtonHandler);
saveForm.addEventListener('submit', saveFormSubmitHandler);