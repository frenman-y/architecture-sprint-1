import React from 'react';
import PopupWithForm from 'popup/PopupWithForm';
import api from 'apiPackage/api';

function EditAvatarPopup({ isOpen, setCurrentUser, onClose }) {
  const inputRef = React.useRef();

  function handleUpdateAvatar(avatarUpdate) {
    api
        .setUserAvatar(avatarUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          onClose();
        })
        .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Обновить аватар" name="edit-avatar"
    >

      <label className="popup__label">
        <input type="url" name="avatar" id="owner-avatar"
               className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
               required ref={inputRef} />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
