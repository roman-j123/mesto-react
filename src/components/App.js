import { useState } from 'react'; 

import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false)

  
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
  
  
  return (
    <>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
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
      
      <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <section className="popup__section">
          <input type="text" className="popup__input popup__input_type_name" name="name" defaultValue="" placeholder="Имя пользователя" minLength="2" maxLength="40" required />
          <span className="popup__input-error" id="name_error"></span>
        </section>
        <section className="popup__section">
          <input type="text" className="popup__input popup__input_type_description" name="description" defaultValue="" placeholder="Описание пользователя" minLength="2" maxLength="200" required />
          <span className="popup__input-error" id="description_error"></span>
        </section>
      </PopupWithForm>

      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <section className="popup__section">
          <input type="url" className="popup__input popup__input_type_url" name="avatar" defaultValue="" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error" id="avatar_error"></span>
        </section>
      </PopupWithForm>
    
      <ImagePopup card={selectedCard} isOpen={isOpen} onClose={closeAllPopups}/>
    
  </>
  );
}
export default App;
