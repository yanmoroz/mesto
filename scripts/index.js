// Variables defining
const popups = document.querySelectorAll('.popup');
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

// Функция открытия попап с данными выбранной карточки
function openFullscreen(name, imagePath) {
  fullscreenPlaceImage.src = imagePath;
  fullscreenPlaceImage.alt = name;
  fullscreenPlaceLabel.textContent = name;
  openPopup(fullscreenPlacePopup);
}

// Функция добавления карточки в начало списка
function prependCard(card) {
  cardsList.prepend(card);
}

// Функция создания новой карточки
function createCard(name, imagePath) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = imagePath;
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
  cardElement.querySelector('.card__remove-button').addEventListener('click', removeCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => openFullscreen(name, imagePath));
  return cardElement;
}

// Функция открытия переданного попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyDownHandler);
}

// Функция закрытия переданного попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyDownHandler);
}

// Функция поиска родительского попапа содержащего evt.currentTarget
function getParentPopup(evt) {
  return evt.currentTarget.closest('.popup');
}

// Обработчик нажатия на клавишу
function keyDownHandler(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup) {
      closePopup(popup);
    }
  }
}

// Обработчик нажатия на оверлей попап
function popupOverlayClickHandler(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

// Обработчик нажатия на кнопку редактирования
function openEditPopupHandler() {
  openPopup(editPopup);
  nameInput.value = nameLabel.textContent;
  aboutInput.value = aboutLabel.textContent;
  refreshFormValidationState(editForm);
}

// Обработчик формы сохранения введенных данных и закрытия попап при нажатии на кнопку "Сохранить"
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  nameLabel.textContent = nameInput.value;
  aboutLabel.textContent = aboutInput.value;
  closePopup(editPopup);
}

// Обработчик нажатия на кнопку добавления новой карточки
function openAddCardPopupHandler() {
  openPopup(addCardPopup);
  placeNameInput.value = '';
  placeImagePathInput.value = '';
  refreshFormValidationState(addCardForm);
}

// Обработчик формы добавления новой карточки
function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = createCard(placeNameInput.value, placeImagePathInput.value);
  prependCard(card);
  placeNameInput.value = '';
  placeImagePathInput.value = '';
  closePopup(addCardPopup);
}

// Обработчик нажатия кнопки закрытия popup
function closePopupButtonHandler(evt) {
  const popup = getParentPopup(evt);
  closePopup(popup);
}

// Click and sumbit handlers assigning
editButton.addEventListener('click', openEditPopupHandler);
addCardButton.addEventListener('click', openAddCardPopupHandler);
editForm.addEventListener('submit', editFormSubmitHandler);
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
closePopupButtons.forEach(closeButton => {
  closeButton.addEventListener('click', closePopupButtonHandler);
});
popups.forEach(popup => {
  popup.addEventListener('mousedown', popupOverlayClickHandler);
});

initialCards.reverse().forEach(cardData => {
  const card = createCard(cardData.name, cardData.link);
  prependCard(card);
})