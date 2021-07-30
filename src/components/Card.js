// Класс карточки
export class Card {

  // Констурктор. Принимает на вход объект с данными карточки, селектор template карточки и обработчик нажатия на картинку карточки
  constructor({ cardModel, isCurrentUserOwner, hasCurrentUserLike, cardSelector, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick }) {
    this._cardSelector = cardSelector;
    this._cardModel = cardModel;
    this._isCurrentUserOwner = isCurrentUserOwner;
    this._hasCurrentUserLike = hasCurrentUserLike;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  // Получение разметки карточки из template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card') 
      .cloneNode(true);

    return cardElement;
  }

  // Инициализация карточки (DOM), наполнение её данными и подключение слушателей событий
  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._removeButton = this._element.querySelector('.card__remove-button');
    this._likesCounter = this._element.querySelector('.card__like-counter');

    if (!this._isCurrentUserOwner) {
      this._removeButton.classList.add('card__remove-button_hidden');
    }

    this.updateLikeButtonState({ isLiked: this._hasCurrentUserLike, likesCount: this._cardModel.likes.length })

    this._cardImage.src = this._cardModel.link;
    this._cardImage.alt = this._cardModel.name;
    this._cardTitle.textContent = this._cardModel.name;

    this._setEventListeners();

    return this._element;
  }

  getCardId() {
    return this._cardModel._id;
  }

  removeItem() {
    this._element.remove();
    this._element = null;
  }

  updateLikeButtonState({ isLiked, likesCount }) {
    this._hasCurrentUserLike = isLiked;
    
    if (isLiked) {
      this._likeButton.classList.add('card__like-button_liked');
    } else {
      this._likeButton.classList.remove('card__like-button_liked');
    }

    this._likesCounter.textContent = likesCount;
  }

  // Добавление слушателей событий
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeButtonClick(this._hasCurrentUserLike));
    this._removeButton.addEventListener('click', () => this._handleDeleteButtonClick());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._imageURL));
  }
}