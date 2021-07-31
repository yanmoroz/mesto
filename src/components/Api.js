export class Api {
  constructor({ options }) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok 
          ? res.json() 
          : Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { method: 'GET', headers: this._headers })
      .then(this._checkResponse)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, { method: 'GET', headers: this._headers })
      .then(this._checkResponse)
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, { method: 'PATCH', headers: this._headers, body: JSON.stringify({ name, about }) })
      .then(this._checkResponse)
  }

  postNewCard({ cardInfo }) {
    return fetch(`${this._baseUrl}/cards`, { method: 'POST', headers: this._headers, body: JSON.stringify(cardInfo) })
      .then(this._checkResponse)
  }

  deleteCard({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, { method: 'DELETE', headers: this._headers })
      .then(this._checkResponse)
  }

  addLike({ cardId }) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { method: 'PUT', headers: this._headers })
      .then(this._checkResponse)
  }

  removeLike({ cardId }) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { method: 'DELETE', headers: this._headers })
      .then(this._checkResponse)
  }

  changeAvatar({ avatarLink }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, { method: 'PATCH', headers: this._headers, body: JSON.stringify({ avatar: avatarLink }) })
      .then(this._checkResponse)
  }
}