class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Приватный метод обработки ответа
  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }
    // Если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение данных профиля с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    }).then(this._getJsonOrError);
  }

  // Получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    }).then(this._getJsonOrError);
  }

  // Отправка на сервер новой карточки
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getJsonOrError);
  }

  // Обновление данных профиля на сервере
  changeProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getJsonOrError);
  }

  // Обновление аватара на сервере
  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getJsonOrError);
  }

  // Удаление карточки на сервере
  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      credentials: 'include',
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJsonOrError);
  }

  // Постановка лайка
  putLikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      credentials: 'include',
      method: "PUT",
      headers: this._headers,
    }).then(this._getJsonOrError);
  }

  // Снятие лайка
  deleteLikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      credentials: 'include',
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJsonOrError);
  }

  changeLikeCardStatus(card, isLiked) {
    return isLiked ? this.putLikeCard(card._id) : this.deleteLikeCard(card._id)}
}

export const api = new Api({
  baseUrl: "https://api.aleksashkina.nomoredomains.icu",
  credentials: 'include',
  headers: {
    "Content-Type": "application/json",
  },
});