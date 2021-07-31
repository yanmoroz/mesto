export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return this._model;
  }

  setUserInfo({ userInfoModel }) {
    // С сервера всегда приходит одинаковая структура данных о пользователе. Храним их в переменной model, 
    // в случае расширения новым полем останется лишь извлечь новые поле в месте где оно требуется через вызов getUserInfo()
    this._model = userInfoModel;

    this._name.textContent = userInfoModel.name;
    this._about.textContent = userInfoModel.about;
    this._avatar.src = userInfoModel.avatar;
  }
}