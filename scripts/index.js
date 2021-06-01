// Variables defining
const closePopupButtons = document.querySelectorAll('.popup__close-button');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_kind_edit');
const editForm = document.querySelector('.popup__form_kind_edit');
const nameLabel = document.querySelector('.profile__name');
const aboutLabel = document.querySelector('.profile__about');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_kind_add');
const addCardForm = document.querySelector('.popup__form_kind_add');
const placeNameInput = document.querySelector('#place-name-input');
const placeImagePathInput = document.querySelector('#place-image-path-input');

const fullscreenPlacePopup = document.querySelector('.popup_kind_image');
const fullscreenPlaceImage = document.querySelector('.popup__place-image');
const fullscreenPlaceLabel = document.querySelector('.popup__place-name');

const cardTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.cards-list');

// Functions defining
// Функция добавления/удаления лайка у карточки
function toggleLike(evt) {
  const likeButton = evt.currentTarget;
  likeButton.classList.toggle('card__like-button_liked');
}

// Функция удаления карточки
function removeCard(evt) {
  const card = evt.currentTarget.parentNode;
  card.remove();
}

// Функция открытия попап с фото
function openFullscreen(evt) {
  const placeImage = evt.currentTarget;
  const placeTitleLabel = placeImage.parentNode.querySelector('.card__title');
  fullscreenPlaceImage.src = placeImage.src;
  fullscreenPlaceImage.alt = placeTitleLabel.textContent;
  fullscreenPlaceLabel.textContent = placeTitleLabel.textContent;
  fullscreenPlacePopup.classList.add('popup_opened');
}

// Функция добавления новой каточки в начало списка
function prependNewCard(name, imagePath) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = imagePath;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
  cardElement.querySelector('.card__remove-button').addEventListener('click', removeCard);
  cardElement.querySelector('.card__image').addEventListener('click', openFullscreen);
  cardsList.prepend(cardElement);
}

// Функция закрытия попап при нажатии на кнопку-крестик (без сохранения)
function closePopup(evt) {
  const popup = evt.currentTarget.closest('.popup');
  popup.classList.remove('popup_opened');
}

// Функция открытия попап при нажатии на кнопку редактирования
function openEditPopup() {
  editPopup.classList.add('popup_opened');
  nameInput.value = nameLabel.textContent;
  aboutInput.value = aboutLabel.textContent;
}

// Функция сохранения введенных данных и закрытия попап при нажатии на кнопку "Сохранить"
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  nameLabel.textContent = nameInput.value;
  aboutLabel.textContent = aboutInput.value;
  closePopup(evt);
}

// Функция открытия попап при нажатии на кнопку добавления новой карточки
function openAddCardPopup() {
  addCardPopup.classList.add('popup_opened');
}

// Функция добавления новой карточки
function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  prependNewCard(placeNameInput.value, placeImagePathInput.value);
  placeNameInput.value = '';
  placeImagePathInput.value = '';
  closePopup(evt);
}

// Click and sumbit handlers assigning
editButton.addEventListener('click', openEditPopup);
addCardButton.addEventListener('click', openAddCardPopup);
editForm.addEventListener('submit', editFormSubmitHandler);
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
closePopupButtons.forEach(closeButton => {
  closeButton.addEventListener('click', closePopup);
})

// On 'document ready' code to proceed 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.reverse().forEach(card => {
  prependNewCard(card.name, card.link);
})