export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const cardListSelector = '.cards-list';
export const cardTemplateSelector = "#card";

export const profileAvatarSelector = '.profile__avatar';
export const profileNameLabelSelector = '.profile__name';
export const profileAboutLabelSelector = '.profile__about';
export const editProfilePopupSelector = '.popup_kind_edit';
export const editButton = document.querySelector('.profile__edit-button');
export const editForm = document.querySelector('.popup__form_kind_edit');
export const nameInput = document.querySelector('#name-input');
export const aboutInput = document.querySelector('#about-input');
export const profileAvatarContainer = document.querySelector('.profile__avatar-container');

export const addNewCardPopupSelector = '.popup_kind_add';
export const placeNameInputSelector = '#place-name-input';
export const placeImagePathInputSelector = '#place-image-path-input';
export const addCardButton = document.querySelector('.profile__add-button');
export const addCardForm = document.querySelector('.popup__form_kind_add');

export const changeAvatarPopupSelector = '.popup_kind_change-avatar';
export const changeAvatarForm = document.querySelector('.popup__form_kind_change-avatar');

export const cardInfoPopupSelector = '.popup_kind_image';
export const deleteConfirmPopupSelector = '.popup_kind_delete-comfirm';

export const mainContainer = document.querySelector('.container');
export const loaderContainer = document.querySelector('.main-loader');

export const mainContainerVisibleSelector = 'container_visible';
export const loaderContainerHiddenSelector = 'main-loader_hidden';

export const yesString = "Да";
export const isDeletingString = "Удаление...";
export const saveString = "Сохранить";
export const isSavingString = "Сохранение...";
export const addString = "Добавить";
export const isAddingString = "Добавление...";