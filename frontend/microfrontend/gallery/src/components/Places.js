import React from "react";
import "../blocks/places/places.css";
import api from "../utils/api";
import Card from "./Card";

function Places() {
  let [cards, setCards] = React.useState([]);
  const [profileId, setProfileId] = React.useState("");

  const handleUserInfoUpdate = (event) => {
    setProfileId(event.detail.id);
  };

  const OnCardAdd = (event) => {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    window.addEventListener("user-info-update", handleUserInfoUpdate);
    // return () => window.removeEventListener("user-info-update", handleUserInfoUpdate);
  }, []);

  React.useEffect(() => {
    window.addEventListener("add-new-card", OnCardAdd);
    // return () => window.removeEventListener("user-info-update", handleUserInfoUpdate);
  }, []);

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  const onCardClick = (card) => {
    window.dispatchEvent(
      new CustomEvent("selected-card-change", {
        detail: card,
      })
    );
  };

  const onCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === profileId);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const onCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="places page__section">
      <ul className="places__list">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            profileId={profileId}
          />
        ))}
      </ul>
    </section>
  );
}

export default Places;
