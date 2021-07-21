// Импорты из других модулей

import './index.css';

import { initialCards } from '../scripts/initial-cards.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

// Используемые элементы DOM страницы

const popups = document.querySelectorAll('.popup');
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
const cardsList = document.querySelector('.cards-list');

// Настройки валидации которые будут переданы в констуктор валидаторов
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Инициализация и запуск валидаторов
const editFormValidator = new FormValidator(validationConfig, editForm);
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
[editFormValidator, addCardFormValidator].forEach(formValidator => formValidator.enableValidation());

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

// Создание карточки, селектор teplate карточки задан по умолчанию
function createCard(cardData, cardSelector = "#card") {
  const card = new Card(cardData, cardSelector, cardImageClickHandler);
  const cardElement = card.generateCard();
  return cardElement;
}

// Функция добавления карточки в начало списка
function prependCard(cardElement) {
  cardsList.prepend(cardElement);
}

// Инициализация карточек
initialCards.reverse().forEach(cardData => {
  const cardElement = createCard(cardData);
  prependCard(cardElement);
})

// Добавление слушателей событий
editButton.addEventListener('click', openEditPopupButtonClickHandler);
addCardButton.addEventListener('click', openAddCardPopupButtonClickHandler);
editForm.addEventListener('submit', editFormSubmitHandler);
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
popups.forEach(popup => {
  popup.addEventListener('click', popupClickHandler);
});

// Обработчик нажатия на кнопку добавления новой карточки
function openAddCardPopupButtonClickHandler() {
  openPopup(addCardPopup);
  addCardForm.reset();
  addCardFormValidator.resetFormValidationState();
}

// Обработчик формы добавления новой карточки
function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: placeImagePathInput.value
  };
  const card = createCard(cardData);
  prependCard(card);
  addCardForm.reset();
  closePopup(addCardPopup);
}

// Обработчик нажатия кнопки по попап (форма + все вокруг включая оверлей)
function popupClickHandler(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}

// Обработчик нажатия на клавишу
function keyDownHandler(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Обработчик нажатия на кнопку редактирования
function openEditPopupButtonClickHandler() {
  openPopup(editPopup);
  nameInput.value = nameLabel.textContent;
  aboutInput.value = aboutLabel.textContent;
  editFormValidator.resetFormValidationState();
}

// Обработчик формы сохранения введенных данных и закрытия попап при нажатии на кнопку "Сохранить"
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  nameLabel.textContent = nameInput.value;
  aboutLabel.textContent = aboutInput.value;
  closePopup(editPopup);
}

// Обработчик нажатия на картинку карточки
function cardImageClickHandler(name, imagePath) {
  fullscreenPlaceImage.src = imagePath;
  fullscreenPlaceImage.alt = name;
  fullscreenPlaceLabel.textContent = name;
  openPopup(fullscreenPlacePopup);
}