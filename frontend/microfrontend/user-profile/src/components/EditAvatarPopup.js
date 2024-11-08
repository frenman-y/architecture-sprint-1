import React from "react";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";

function EditAvatarPopup() {
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef();

  const handleOpen = (event) => {
    setIsOpen(true);
  };

  const handleClose = (event) => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newAvatar = {
      avatar: inputRef.current.value,
    };
    api
      .setUserAvatar(newAvatar)
      .then((newUserData) => {
        window.dispatchEvent(
          new CustomEvent("avatar-update", {
            detail: newUserData.avatar,
          })
        );
        window.dispatchEvent(new CustomEvent("close-all-popups", {}));
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    window.addEventListener("open-edit-avatar-popup", handleOpen);
    // return () => window.removeEventListener("open-edit-avatar-popup", handleOpen);
  }, []);

  React.useEffect(() => {
    window.addEventListener("close-all-popups", handleClose);
    // return () => window.removeEventListener("close-all-popups", handleClose);
  }, []);

  const onClose = () => {
    window.dispatchEvent(new CustomEvent("close-all-popups", {}));
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Обновить аватар"
      name="edit-avatar"
    >
      <label className="popup__label">
        <input
          type="url"
          name="avatar"
          id="owner-avatar"
          className="popup__input popup__input_type_description"
          placeholder="Ссылка на изображение"
          required
          ref={inputRef}
        />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
