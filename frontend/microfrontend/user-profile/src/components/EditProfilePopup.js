import React from "react";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";

function EditProfilePopup() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = (event) => {
    setIsOpen(true);
  };

  const handleClose = (event) => {
    setIsOpen(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUserData = {
      name,
      about: description,
    };

    api
      .setUserInfo(newUserData)
      .then((userData) => {
        window.dispatchEvent(
          new CustomEvent("user-info-update", {
            detail: {
              name: userData.name,
              description: userData.about,
            },
          })
        );
        window.dispatchEvent(new CustomEvent("close-all-popups", {}));
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    window.addEventListener("open-edit-profile-popup", handleOpen);
    // return () => window.removeEventListener("open-edit-profile-popup", handleOpen);
  }, []);

  React.useEffect(() => {
    window.addEventListener("close-all-popups", handleClose);
    // return () => window.removeEventListener("close-all-popups", handleClose);
  }, []);

  const onClose = () => {
    window.dispatchEvent(new CustomEvent("close-all-popups", {}));
  };

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setName(userData.name);
        setDescription(userData.about);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Редактировать профиль"
      name="edit"
    >
      <label className="popup__label">
        <input
          type="text"
          name="userName"
          id="owner-name"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          pattern="[a-zA-Zа-яА-Я -]{1,}"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          name="userDescription"
          id="owner-description"
          className="popup__input popup__input_type_description"
          placeholder="Занятие"
          required
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
