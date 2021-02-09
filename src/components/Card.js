function Card(props) {
  function handleClick() {
    console.log(props.card)
    props.onCardClick(props.card);
  }  
    return (
        <li className="elements__item">
          <button type="button" className="elements__delete"></button>
          <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
          <div className="elements__card-container">
            <h2 className="elements__header">{props.card.name}</h2>
            <div className="elements__like-container">
              <button className="elements__like" type="button" title="Оценить фотографию" aria-label="Поставить лайк"></button>
              <span className="elements__like-counter">{props.card.likes.length}</span>
            </div>
          </div>
        </li>
    )
}
export default Card;