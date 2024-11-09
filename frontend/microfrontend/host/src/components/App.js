import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
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

const InfoTooltip = lazy(() =>
  import("authentication/InfoTooltip").catch(() => {
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
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  const handleIsLogged = (event) => {
    if (event.detail) {
      history.push("/signin");
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

  const onSignOut = (event) => {
    window.dispatchEvent(
      new CustomEvent("is-sign-out", {
        detail: "",
      })
    );
  };

  return (
    <div className="page__content">
      <Header email={email} onSignOut={onSignOut} />
      <Switch>
        <ProtectedRoute exact path="/" component={Main} loggedIn={isLoggedIn} />
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
        <AddPlacePopup />
        <EditAvatarPopup />
        <ImagePopup />
        <InfoTooltip />
      </Suspense>
    </div>
  );
}

export default App;
