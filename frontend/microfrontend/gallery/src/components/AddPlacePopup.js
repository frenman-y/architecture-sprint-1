import React from "react";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";

function AddPlacePopup() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleOpen = (event) => {
    setIsOpen(true);
  };

  const handleClose = (event) => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    window.addEventListener("open-add-place-popup", handleOpen);
    // return () => window.removeEventListener("open-edit-avatar-popup", handleOpen);
  }, []);

  React.useEffect(() => {
    window.addEventListener("close-all-popups", handleClose);
    // return () => window.removeEventListener("close-all-popups", handleClose);
  }, []);

  const onClose = () => {
    window.dispatchEvent(new CustomEvent("close-all-popups", {}));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCard = {
      name,
      link,
    };

    api
      .addCard(newCard)
      .then((newCardFull) => {
        window.dispatchEvent(new CustomEvent("add-new-card", {}));
        window.dispatchEvent(new CustomEvent("close-all-popups", {}));
      })
      .catch((err) => console.log(err));
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Новое место"
      name="new-card"
    >
      <label className="popup__label">
        <input
          type="text"
          name="name"
          id="place-name"
          className="popup__input popup__input_type_card-name"
          placeholder="Название"
          required
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="place-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="url"
          name="link"
          id="place-link"
          className="popup__input popup__input_type_url"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__error" id="place-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
