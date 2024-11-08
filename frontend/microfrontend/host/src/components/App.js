import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

const Register = lazy(() =>
  import("authentication/Register").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const Login = lazy(() =>
  import("authentication/Login").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const EditProfilePopup = lazy(() =>
  import("user_profile/EditProfilePopup").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const EditAvatarPopup = lazy(() =>
  import("user_profile/EditAvatarPopup").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

function App() {
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  const history = useHistory();

  const handleIsLogged = (event) => {
    if (event.detail) {
      history.push("/signin");
      setTooltipStatus("success");
      setIsInfoToolTipOpen(true);
    } else {
      setTooltipStatus("fail");
      setIsInfoToolTipOpen(true);
    }
  };

  const handleIsSignIn = (event) => {
    if (event.detail.status) {
      setEmail(event.detail.email);
      setIsLoggedIn(true);
      history.push("/");
    } else {
      setTooltipStatus("fail");
      setIsInfoToolTipOpen(true);
    }
  };

  const handleIsSignOut = (event) => {
    setEmail("");
    setIsLoggedIn(false);
    history.push("/signin");
  };

  const handleCloseAllPopups = (event) => {
    console.log("handleCloseAllPopups");
  };

  const onSignOut = (event) => {
    window.dispatchEvent(
      new CustomEvent("is-sign-out", {
        detail: "",
      })
    );
  }

  React.useEffect(() => {
    window.addEventListener("is-logged", handleIsLogged);
    return () => window.removeEventListener("is-logged", handleIsLogged);
  }, []);

  React.useEffect(() => {
    window.addEventListener("is-sign-in", handleIsSignIn);
    return () => window.removeEventListener("is-sign-in", handleIsSignIn);
  }, []);

  React.useEffect(() => {
    window.addEventListener("is-sign-out", handleIsSignOut);
    return () => window.removeEventListener("is-sign-out", handleIsSignOut);
  }, []);

  React.useEffect(() => {
    window.addEventListener("close-all-popups", handleCloseAllPopups);
    return () => window.removeEventListener("close-all-popups", handleCloseAllPopups);
  }, []);


  // old --------------

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);


  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    // setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    // setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);

    //!!! Добавить сюда сигнал на закрытие все всплывающих окон
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Suspense>
              <Register />
            </Suspense>
          </Route>
          <Route path="/signin">
            <Suspense>
              <Login />
            </Suspense>
          </Route>
        </Switch>
        <Footer />
        <Suspense>
          <EditProfilePopup
          />
        </Suspense>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
        <Suspense>
          <EditAvatarPopup/>
        </Suspense>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
