import React, { lazy, Suspense } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Profile = lazy(() =>
  import("user_profile/Profile").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

function Main({
  cards,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  return (
    <main className="content">
      <Suspense>
        <Profile />
      </Suspense>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
