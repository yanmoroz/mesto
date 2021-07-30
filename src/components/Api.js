export class Api {
  constructor({ options }) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { method: 'GET', headers: this._headers })
      .then(res => {
        return res.ok 
          ? res.json() 
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  /* Response Example
  {
    "name": "Мороз Ян",
    "about": "Программист",
    "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
    "_id": "71fdc6652ade51e2dca75ce6",
    "cohort": "cohort-26"
  }
  */

  getCards() {
    return fetch(`${this._baseUrl}/cards`, { method: 'GET', headers: this._headers })
      .then(res => {
        return res.ok 
          ? res.json() 
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  /* Response Example
  [ { ... },
    {
    "likes": [
      {
        "name": "Кирилл Брик6",
        "about": "Frontend разработчик5",
        "avatar": "https://images.unsplash.com/photo-1532960401447-7dd05bef20b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=758&q=80",
        "_id": "fca89153f1bc16447a795a6a",
        "cohort": "cohort-26"
      },
      {
        "name": "Мороз Ян",
        "about": "Программист",
        "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
        "_id": "71fdc6652ade51e2dca75ce6",
        "cohort": "cohort-26"
      }
    ],
    "_id": "610402e14880b3034a9b1df9",
    "name": "sadasd",
    "link": "http://images.vfl.ru/ii/1602851736/c36aa1e1/31959638.jpg",
    "owner": {
      "name": "Пернатый Змей",
      "about": "Сын народа майя",
      "avatar": "https://i.postimg.cc/MZfb8PpJ/IMG-20210609-122749.jpg",
      "_id": "0c4411f571c79b433b82059c",
      "cohort": "cohort-26"
    },
    "createdAt": "2021-07-30T13:47:13.256Z"
  }]
  */

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, { method: 'PATCH', headers: this._headers, body: JSON.stringify({ name, about }) })
      .then(res => {
        return res.ok 
          ? res.json() 
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  /* Request Body Example 
  {
   "name":"Мороз Ян",
   "about":"Программист"
  }
  */

  /* Response Example 
  {
   "name":"Мороз Ян",
   "about":"Программист",
   "avatar":"https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
   "_id":"71fdc6652ade51e2dca75ce6",
   "cohort":"cohort-26"
  }
  */

  postNewCard({ cardInfo }) {
    return fetch(`${this._baseUrl}/cards`, { method: 'POST', headers: this._headers, body: JSON.stringify(cardInfo) })
      .then(res => {
        return res.ok 
          ? res.json() 
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  /* Request Body Example
  {
   "name":"Another Card Name",
   "link":"https://images.unsplash.com/photo-1622405631950-d9fae1bf0c10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
  }
  */
 
  /* Response Example
  {
   "likes":[
      
   ],
   "_id":"61041a5f4880b3034a9b1e2e",
   "name":"Another Card Name",
   "link":"https://images.unsplash.com/photo-1622405631950-d9fae1bf0c10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
   "owner":{
      "name":"Мороз Ян",
      "about":"Программист",
      "avatar":"https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
      "_id":"71fdc6652ade51e2dca75ce6",
      "cohort":"cohort-26"
   },
   "createdAt":"2021-07-30T15:27:27.464Z"
  }
  */

  deleteCard({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, { method: 'DELETE', headers: this._headers })
      .then(res => {
        return res.ok 
          ? res.json() 
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  /* Response Example
  {"message":"Пост удалён"}
  */

  addLike({ cardId }) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { method: 'PUT', headers: this._headers })
      .then(res => {
        return res.ok 
          ? res.json() 
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  /* Response Example
  {
    "likes":[
       {
          "name":"Мороз Ян",
          "about":"Программист",
          "avatar":"https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
          "_id":"71fdc6652ade51e2dca75ce6",
          "cohort":"cohort-26"
       }
    ],
    "_id":"61041f014880b3034a9b1e4b",
    "name":"ccc",
    "link":"https://images.unsplash.com/photo-1622405631950-d9fae1bf0c10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    "owner":{
       "name":"kkkk",
       "about":"iiiiiiiiiiiiiiiiiiiiiiuuuuuu",
       "avatar":"https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
       "_id":"63e9367ed5898d806a4eb3e1",
       "cohort":"cohort-26"
    },
    "createdAt":"2021-07-30T15:47:13.169Z"
  }
  */

  removeLike({ cardId }) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { method: 'DELETE', headers: this._headers })
      .then(res => {
        return res.ok 
          ? res.json() 
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  /*
  {
   "likes":[
      {
         "name":"Мороз Ян",
         "about":"Программист",
         "avatar":"https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
         "_id":"71fdc6652ade51e2dca75ce6",
         "cohort":"cohort-26"
      }
   ],
   "_id":"61041f014880b3034a9b1e4b",
   "name":"ccc",
   "link":"https://images.unsplash.com/photo-1622405631950-d9fae1bf0c10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
   "owner":{
      "name":"kkkk",
      "about":"iiiiiiiiiiiiiiiiiiiiiiuuuuuu",
      "avatar":"https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
      "_id":"63e9367ed5898d806a4eb3e1",
      "cohort":"cohort-26"
   },
   "createdAt":"2021-07-30T15:47:13.169Z"
  }
  */

  changeAvatar({ avatarLink }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, { method: 'PATCH', headers: this._headers, body: JSON.stringify({ avatar: avatarLink }) })
    .then(res => {
      return res.ok 
        ? res.json() 
        : Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  /* Request Body Example
  {
   "avatar":"https://images.unsplash.com/photo-1622405631950-d9fae1bf0c10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
  }
  */

  /* Response Example
  {
   "name":"Мороз Ян",
   "about":"Программист",
   "avatar":"https://images.unsplash.com/photo-1622405631950-d9fae1bf0c10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
   "_id":"71fdc6652ade51e2dca75ce6",
   "cohort":"cohort-26"
  }
  */
}