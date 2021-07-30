// Импорты из других модулей

import './index.css';

import {
  validationConfig,
  cardListSelector,
  cardTemplateSelector,
  profileNameLabelSelector,
  profileAboutLabelSelector,
  profileAvatarSelector,
  nameInput,
  aboutInput,
  editProfilePopupSelector,
  editForm,
  editButton,
  addCardButton,
  addNewCardPopupSelector,
  addCardForm,
  cardInfoPopupSelector,
  deleteConfirmPopupSelector,
  profileAvatarContainer,
  changeAvatarPopupSelector,
  changeAvatarForm,
  mainContainer,
  loaderContainer,
  mainContainerVisibleSelector,
  loaderContainerHiddenSelector,
  yesString,
  isDeletingString,
  saveString,
  isSavingString,
  addString,
  isAddingString
} from '../scripts/constants.js';

import { Section } from '../components/Section';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupDeleteConfirm } from '../components/PopupDeleteConfirm';
import { UserInfo } from '../components/UserInfo';
import { Api } from '../components/Api';

const api = new Api({
  options: {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
      authorization: '16ebd79b-43e1-4359-bd06-6780c368e10f',
      'Content-Type': 'application/json'
    }
  }
});

// Инициализация и запуск валидаторов
const editFormValidator = new FormValidator({ validationConfig: validationConfig, formElement: editForm });
const addCardFormValidator = new FormValidator({ validationConfig: validationConfig, formElement: addCardForm });
const changeAvatarFormValidator = new FormValidator({ validationConfig: validationConfig, formElement: changeAvatarForm });

[editFormValidator, addCardFormValidator, changeAvatarFormValidator].forEach(formValidator => formValidator.enableValidation());

const userInfo = new UserInfo({
  nameSelector: profileNameLabelSelector,
  aboutSelector: profileAboutLabelSelector,
  avatarSelector: profileAvatarSelector
});

const cardsList = new Section({ containerSelector: cardListSelector });

const editInfoPopup = new PopupWithForm(
  {
    popupSelector: editProfilePopupSelector,
    handlePopupOpening: () => {
      const userInfoModel = userInfo.getUserInfo();
      nameInput.value = userInfoModel.name;
      aboutInput.value = userInfoModel.about;
      editFormValidator.resetFormValidationState();
    },
    handleFormSubmit: (editFormInputValues) => {
      editInfoPopup.updateSubmitButtonTitle({ title: isSavingString });
      api.updateUserInfo({ name: editFormInputValues.profileName, about: editFormInputValues.profileAbout })
        .then(userInfoModel => {
          userInfo.setUserInfo({ userInfoModel: userInfoModel });
        })
        .catch(err => console.log(err))
        .finally(() => {
          editInfoPopup.updateSubmitButtonTitle({ title: saveString });
          editInfoPopup.close();
        })
    }
  }
);

const addCardPopup = new PopupWithForm(
  {
    popupSelector: addNewCardPopupSelector,
    handlePopupOpening: () => {
      addCardFormValidator.resetFormValidationState();
    },
    handleFormSubmit: (addFormInputValues) => {
      addCardPopup.updateSubmitButtonTitle({ title: isAddingString });
      api.postNewCard({ cardInfo: { name: addFormInputValues.placeName, link: addFormInputValues.placeImage } })
        .then(cardModel => {
          const cardElement = createCard(cardModel);
          cardsList.addItem({ item: cardElement });
        })
        .catch(err => console.log(err))
        .finally(() => {
          addCardPopup.close();
          addCardPopup.updateSubmitButtonTitle({ title: addString });
        })
    }
  }
);

const changeAvatarPopup = new PopupWithForm(
  {
    popupSelector: changeAvatarPopupSelector,
    handlePopupOpening: () => {
      changeAvatarFormValidator.resetFormValidationState();
    },
    handleFormSubmit: (changeAvatarFormInputValues) => {
      changeAvatarPopup.updateSubmitButtonTitle({ title: isSavingString });
      api.changeAvatar({ avatarLink: changeAvatarFormInputValues.avatarLink })
        .then(userInfoModel => {
          userInfo.setUserInfo({ userInfoModel: userInfoModel });
        })
        .catch(err => console.log(err))
        .finally(() => {
          changeAvatarPopup.close();
          changeAvatarPopup.updateSubmitButtonTitle({ title: saveString });
        })
    }
  }
);

const cardInfoPopup = new PopupWithImage({ popupSelector: cardInfoPopupSelector });

const deleteConfirmPopup = new PopupDeleteConfirm(
  {
    popupSelector: deleteConfirmPopupSelector,
    handleFormSubmit: (card) => {
      deleteConfirmPopup.updateSubmitButtonTitle({ title: isDeletingString });
      api.deleteCard({ cardId: card.getCardId() })
        .then(() => {
          card.removeItem();
        })
        .catch(err => console.log(err))
        .finally(() => {
          deleteConfirmPopup.close();
          deleteConfirmPopup.updateSubmitButtonTitle({ title: yesString });
        })
    }
  }
);

const createCard = (cardModel) => {
  const userInfoModel = userInfo.getUserInfo();
  const isCurrentUserOwner = cardModel.owner._id === userInfoModel._id;
  const hasCurrentUserLike = cardModel.likes.some(user => user._id === userInfoModel._id);

  const card = new Card({
    cardModel: cardModel,
    isCurrentUserOwner: isCurrentUserOwner,
    hasCurrentUserLike: hasCurrentUserLike,
    cardSelector: cardTemplateSelector,
    handleCardClick: () => cardInfoPopup.open({ name: cardModel.name, imagePath: cardModel.link }),
    handleDeleteButtonClick: () => deleteConfirmPopup.open({ context: card }),
    handleLikeButtonClick: (isLiked) => {
      if (isLiked) {
        api.removeLike({ cardId: cardModel._id })
          .then((cardModel) => {
            card.updateLikeButtonState({ isLiked: false, likesCount: cardModel.likes.length });
          })
          .catch(err => console.log(err))
      } else {
        api.addLike({ cardId: cardModel._id })
          .then((cardModel) => {
            card.updateLikeButtonState({ isLiked: true, likesCount: cardModel.likes.length });
          })
          .catch(err => console.log(err))
      }
    }
  });
  const cardElement = card.generateCard();

  return cardElement;
}

// Обработчик нажатия на кнопку добавления новой карточки
function handleOpenAddCardPopupButtonClick() {
  addCardPopup.open();
}

// Обработчик нажатия на кнопку редактирования
function handleOpenEditPopupButtonClick() {
  editInfoPopup.open();
}

// 
function handleAvatarContainerClick() {
  changeAvatarPopup.open();
}

// Добавление слушателей событий
editButton.addEventListener('click', handleOpenEditPopupButtonClick);
addCardButton.addEventListener('click', handleOpenAddCardPopupButtonClick);
profileAvatarContainer.addEventListener('click', handleAvatarContainerClick);
addCardPopup.setEventListeners();
editInfoPopup.setEventListeners();
cardInfoPopup.setEventListeners();
changeAvatarPopup.setEventListeners();
deleteConfirmPopup.setEventListeners();

Promise.all(
  [
    api.getUserInfo(),
    api.getCards()
  ]
)
  .then((results) => {
    const userInfoModel = results[0];
    const cardsModel = results[1];

    userInfo.setUserInfo({ userInfoModel: userInfoModel });
    cardsList.renderItems({
      items: cardsModel.reverse(),
      renderer: cardModel => {
        const cardElement = createCard(cardModel);
        cardsList.addItem({ item: cardElement });
      }
    })
  })
  .catch(err => console.log(err))
  .finally(() => {
    mainContainer.classList.add(mainContainerVisibleSelector);
    loaderContainer.classList.add(loaderContainerHiddenSelector);
  })