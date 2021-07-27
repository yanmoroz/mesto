// Импорты из других модулей

import './index.css';

import { initialCards } from '../scripts/initial-cards.js';
import {
  validationConfig,
  cardListSelector,
  cardTemplateSelector,
  profileNameLabelSelector,
  profileAboutLabelSelector,
  nameInput,
  aboutInput,
  editProfilePopupSelector,
  editForm,
  editButton,
  addCardButton,
  addNewCardPopupSelector,
  addCardForm,
  cardInfoPopupSelector
} from '../scripts/constants.js';

import { Section } from '../components/Section';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';

// Инициализация и запуск валидаторов
const editFormValidator = new FormValidator(validationConfig, editForm);
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
[editFormValidator, addCardFormValidator].forEach(formValidator => formValidator.enableValidation());

const userInfo = new UserInfo({
  nameSelector: profileNameLabelSelector,
  aboutSelector: profileAboutLabelSelector
});

const editInfoPopup = new PopupWithForm(
  {
    popupSelector: editProfilePopupSelector,
    handlePopupOpening: () => {
      const userInfoData = userInfo.getUserInfo();
      nameInput.value = userInfoData.name;
      aboutInput.value = userInfoData.about;
      editFormValidator.resetFormValidationState();
    },
    handleFormSubmit: (newUserInfo) => {
      userInfo.setUserInfo({ name: newUserInfo.profileName, about: newUserInfo.profileAbout });
      editInfoPopup.close();
    }
  }
);

const addCardPopup = new PopupWithForm(
  {
    popupSelector: addNewCardPopupSelector,
    handlePopupOpening: () => {
      addCardFormValidator.resetFormValidationState();
    },
    handleFormSubmit: (cardInfo) => {
      const cardElement = createCard({ name: cardInfo.placeName, link: cardInfo.placeImage });
      cardsList.addItem(cardElement);
      addCardPopup.close();
    }
  }
);

const cardInfoPopup = new PopupWithImage(cardInfoPopupSelector);

const createCard = (cardData) => {
  const card = new Card(
    cardData, 
    cardTemplateSelector,
    () => cardInfoPopup.open({ name: cardData.name, imagePath: cardData.link })
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsList = new Section({
  items: initialCards.reverse(),
  renderer: item => {
    const cardElement = createCard({ name: item.name, link: item.link });
    cardsList.addItem(cardElement);
  }
}, cardListSelector);

// Обработчик нажатия на кнопку добавления новой карточки
function handleOpenAddCardPopupButtonClick() {
  addCardPopup.open();
}

// Обработчик нажатия на кнопку редактирования
function handleOpenEditPopupButtonClick() {
  editInfoPopup.open();
}

// Добавление слушателей событий
editButton.addEventListener('click', handleOpenEditPopupButtonClick);
addCardButton.addEventListener('click', handleOpenAddCardPopupButtonClick);
addCardPopup.setEventListeners();
editInfoPopup.setEventListeners();
cardInfoPopup.setEventListeners();

cardsList.renderItems();