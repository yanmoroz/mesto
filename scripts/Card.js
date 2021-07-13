// Класс карточки
export class Card {

  // Констурктор. Принимает на вход объект с данными карточки и селектор template карточки
  constructor(data, cardSelector) {
    this._name = data.name;
    this._imageURL = data.link;
    this._cardSelector = cardSelector;
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
  // Принимает на вход необязательный параметр - обработчик нажатия на картинку карточки
  // Реализовано таким путем чтобы не противоречить ТЗ в котором четко указана сигнатура конструктора класса ...
  // ... и чтобы не делать импорт модуля index.js что привело бы к ненужной кольцевой зависимости между модулями
  generateCard(imageClickHandler = null) {
    this._element = this._getTemplate();
    this._setEventListeners(imageClickHandler);

    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._imageURL;
    cardImage.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  // Добавление слушателей событий
  _setEventListeners(imageClickHandler = null) {
    this._element.querySelector('.card__like-button').addEventListener('click', this._toggleLikeButtonClickHandler);
    this._element.querySelector('.card__remove-button').addEventListener('click', this._removeCardButtonEventHandler);

    // Если был передан обработчик нажатия на картинку от родительского View
    if (imageClickHandler) {
      this._element.querySelector('.card__image').addEventListener('click', () => {
        imageClickHandler(this._name, this._imageURL);
      });
    }
  }

  // Обработчик нажатия на кнопку удаления
  _removeCardButtonEventHandler(evt) {
    const card = evt.currentTarget.parentNode;
    card.remove();
  }

  // Обработчик нажатия на кнопку лайка
  _toggleLikeButtonClickHandler(evt) {
    const likeButton = evt.currentTarget;
    likeButton.classList.toggle('card__like-button_liked');
  }
}