import React from 'react';
import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';
import "../blocks/popup/popup.css";
import "../blocks/popup/_is-opened/popup_is-opened.css";

function InfoTooltip() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');

  const handleClose = (event) => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    window.addEventListener("close-all-popups", handleClose);
    // return () => window.removeEventListener("close-all-popups", handleClose);
  }, []);

  const onClose = () => {
    window.dispatchEvent(new CustomEvent("close-all-popups", {}));
  };

  const handleIsLogged = (event) => {
    if (event.detail) {
      setStatus("success");
      setIsOpen(true);
    } else {
      setStatus("fail");
      setIsOpen(true);
    }
  };

  const handleIsSignIn = (event) => {
    if (event.detail.status) {
    } else {
      setStatus("fail");
      setIsOpen(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener("is-logged", handleIsLogged);
    // return () => window.removeEventListener("is-logged", handleIsLogged);
  }, []);

  React.useEffect(() => {
    window.addEventListener("is-sign-in", handleIsSignIn);
    // return () => window.removeEventListener("is-sign-in", handleIsSignIn);
  }, []);


  const icon = status === 'success' ? SuccessIcon : ErrorIcon
  const text = status === 'success' ? "Вы успешно зарегистрировались" : 
     "Что-то пошло не так! Попробуйте ещё раз."
  return (
    <div className={`popup ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={onClose}></button>
            <div>
              <img className="popup__icon" src={icon} alt=""/>
              <p className="popup__status-message">{text}</p>
            </div>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;

 