// Класс карточки
export class Card {

  // Констурктор. Принимает на вход объект с данными карточки, селектор template карточки и обработчик нажатия на картинку карточки
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._imageURL = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._likeButton = this._element.querySelector('.card__like-button')
    this._removeButton = this._element.querySelector('.card__remove-button')

    this._cardImage.src = this._imageURL;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  // Добавление слушателей событий
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleToggleLikeButtonClick());
    this._removeButton.addEventListener('click', () => this._handleRemoveCardButtonEvent());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._imageURL));
  }

  // Обработчик нажатия на кнопку удаления
  _handleRemoveCardButtonEvent() {
    this._element.remove();
    this._element = null;
  }

  // Обработчик нажатия на кнопку лайка
  _handleToggleLikeButtonClick() {
    this._likeButton.classList.toggle('card__like-button_liked');
  }
}