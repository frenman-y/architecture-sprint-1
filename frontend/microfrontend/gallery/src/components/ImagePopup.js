import React, { useState, useEffect } from "react";
import "../blocks/popup/popup.css";
import "../blocks/popup/_is-opened/popup_is-opened.css";

function ImagePopup() {
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleSelectedCardChange = (event) => {
    setSelectedCard(event.detail);
  };

  const handleClose = (event) => {
    setSelectedCard(null);
  };

  React.useEffect(() => {
    window.addEventListener("selected-card-change", handleSelectedCardChange);
    // return () => window.removeEventListener("selected-card-change", handleSelectedCardChange);
  }, []);

  React.useEffect(() => {
    window.addEventListener("close-all-popups", handleClose);
    // return () => window.removeEventListener("close-all-popups", handleClose);
  }, []);

  const onClose = () => {
    window.dispatchEvent(new CustomEvent("close-all-popups", {}));
  }

  return (
    <div className={`popup popup_type_image ${selectedCard ? 'popup_is-opened' : ''}`}>
      <div className="popup__content popup__content_content_image">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img alt={selectedCard ? selectedCard.name : ''} src={selectedCard ? selectedCard.link : ''} className="popup__image" />
        <p className="popup__caption">{selectedCard ? selectedCard.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
