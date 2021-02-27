import { useEffect, useState } from 'react'; 
import { CurrentUserContext } from '../contexts/CurrentUserContext'

import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    api.getUser().then(response => {
      setCurrentUser(response);
    }).catch(error => {
      console.log(`Error: ${error}`);
    })
    api.getCards().then(response => {
      setCards(response);
    }).catch(err => {
      console.log(`Error: ${err}`)
    });
  },[])
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(selectedCard) {
    setIsOpen(true);
    setSelectedCard(selectedCard);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsOpen(false);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    
    api.changeLikeStatus(card._id, !isLiked).then(newCard => {
      const newCards = cards.map(c => c._id === card._id ? newCard : c);
      setCards(newCards);
    }).catch(error => {
      console.log(`Error: ${error}`)
    });
  }
  function handleDeleteCard(card) {
    api.removeCard(card._id).then(() => {
      const newCards = cards.filter(c => {
       return c._id !== card._id;
      })
      setCards(newCards);
    }).catch(error => {
      console.log(`Error: ${error}`)
    })
  }
  function handleUpdateUser(user) {
    api.updateUser(user).then(response => {
      setCurrentUser(response);
    })
    closeAllPopups();
  }
  function handleUpdateAvatar(item) {
    api.updateAvatar(item).then(reponse => {
      setCurrentUser(reponse)
    })
    closeAllPopups();
  }
  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteCard}
        cards={cards}
      />
      <Footer />
      
      <PopupWithForm name="place" title="Новое место" isOpen={isAddPlacePopupOpen} buttonText="Создать" onClose={closeAllPopups}>
        <section className="popup__section">
          <input type="text" className="popup__input popup__input_type_place" name="place" defaultValue="" placeholder="Название" minLength="2" maxLength="30" required/>
          <span className="popup__input-error" id="place_error"></span>
        </section>
        <section className="popup__section">
          <input type="url" className="popup__input popup__input_type_url" name="url" defaultValue="" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error" id="url_error"></span>
        </section>        
      </PopupWithForm>
      
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    
      <ImagePopup card={selectedCard} isOpen={isOpen} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    </>
  );
}
export default App;
