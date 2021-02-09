class Api {
    constructor({address, token, groupId}) {
        this._address = address;
        this._token = token;
        this._group = groupId;
    }
    _checkResponse() {
        return res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }
    }
    getCards() {
        return fetch(`${this._address}/v1/${this._group}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    getUser() {
        return fetch(`${this._address}/v1/${this._group}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    updateUser(item) {
        return fetch(`${this._address}/v1/${this._group}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify({
                name: item.name,
                about: item.description
            })
        }).then(this._checkResponse())
    }
    addNewCard(name, link) {
        return fetch(`${this._address}/v1/${this._group}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._checkResponse())
    }
    removeCard(id) {
        return fetch(`${this._address}/v1/${this._group}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    likeCard(id) {
        return fetch(`${this._address}/v1/${this._group}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Conetent-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    dislikeCard(id) {
        return fetch(`${this._address}/v1/${this._group}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Conetent-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    updateAvatar(item) {
        return fetch(`${this._address}/v1/${this._group}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: item.avatar,
            })
        }).then(this._checkResponse())
    }
}
const apiConfig = {
    address: 'https://mesto.nomoreparties.co', 
    token: 'd8d1cc1a-fc60-4366-9dd1-cd8eb0d5a40e', 
    groupId: 'cohort-19'
}
const api = new Api(apiConfig);
export default api;