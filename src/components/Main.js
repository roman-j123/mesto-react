import { useEffect, useState } from 'react'; 
import api from '../utils/api.js'
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = useState('Пользователь');
  const [userDescription, setUserDescription] = useState('Описание');
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getUser().then(response => {
      setUserName(response.name);
      setUserDescription(response.about);
      setUserAvatar(response.avatar);
    }).catch(err => {
      console.log(`Error: ${err}`)
    })
    api.getCards().then(response => {
      setCards(response);
    }).catch(err => {
      console.log(`Error: ${err}`)
    });
  },[])
  return (
    <main className="main">
      <section className="profile">
        <button 
          className="profile__avatar-button" 
          type="button" 
          title={`Редактировать аватар ${userName}`}
          aria-label="Редактировать аватар пользователя" 
          onClick={props.onEditAvatar}
        >
          <img src={userAvatar} className="profile__avatar" alt={userName} />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
            <button 
              className="profile__button profile__button_type_edit" 
              type="button" 
              title="Редактировать профиль" 
              aria-label="Редактировать профиль" 
              onClick={props.onEditProfile}
            ></button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button 
          className="profile__button profile__button_type_add" 
          type="button" 
          title="Добавить фотографию" 
          aria-label="Добавить фотографию" 
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {
          cards.map(item => 
            ( <Card 
              key={item._id} 
              card={item}
              onCardClick={props.onCardClick}
            /> )
          )}
        </ul>
      </section>
    </main>
    )
}
export default Main;