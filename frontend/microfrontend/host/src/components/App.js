import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
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

const AddPlacePopup = lazy(() =>
  import("gallery/AddPlacePopup").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const ImagePopup = lazy(() =>
  import("gallery/ImagePopup").catch(() => {
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
  };

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
    return () =>
      window.removeEventListener("close-all-popups", handleCloseAllPopups);
  }, []);

  // old --------------

  

  function closeAllPopups() {
    setIsInfoToolTipOpen(false);

    //!!! Добавить сюда сигнал на закрытие все всплывающих окон
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
          <EditProfilePopup />
          <AddPlacePopup/>
          <EditAvatarPopup />
          <ImagePopup />
          <InfoTooltip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            status={tooltipStatus}
          />
        </Suspense>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
