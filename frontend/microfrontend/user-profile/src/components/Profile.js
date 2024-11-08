import React from "react";
import "../blocks/profile/profile.css";
import api from "../utils/api";

function Profile() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageStyle, setImageStyle] = React.useState({
    backgroundImage: null,
  });

  const handleUserInfoUpdate = (event) => {
    setName(event.detail.name);
    setDescription(event.detail.description);
  };

  const handleAvatarUpdate = (event) => {
    setImageStyle({ backgroundImage: `url(${event.detail})` });
  };

  React.useEffect(() => {
    window.addEventListener("user-info-update", handleUserInfoUpdate);
    // return () => window.removeEventListener("user-info-update", handleUserInfoUpdate);
  }, []);

  React.useEffect(() => {
    window.addEventListener("avatar-update", handleAvatarUpdate);
    // return () => window.removeEventListener("avatar-update", handleAvatarUpdate);
  }, []);

  // Какой же это не приятный костыль. Однако профиль обычно подгружается после авторизации так что не так уж важно.
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        window.dispatchEvent(
          new CustomEvent("user-info-update", {
            detail: {
              name: userData.name,
              description: userData.about,
            },
          })
        );
        window.dispatchEvent(
          new CustomEvent("avatar-update", {
            detail: userData.avatar,
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const openEditProfilePopup = (event) => {
    window.dispatchEvent(
      new CustomEvent("open-edit-profile-popup", {
        detail: "",
      })
    );
  };

  const openEditAvatarPopup = (event) => {
    window.dispatchEvent(
      new CustomEvent("open-edit-avatar-popup", {
        detail: "",
      })
    );
  };

  return (
    <section className="profile page__section">
      <div
        className="profile__image"
        onClick={openEditAvatarPopup}
        style={imageStyle}
      ></div>
      <div className="profile__info">
        <h1 className="profile__title">{name}</h1>
        <button
          className="profile__edit-button"
          type="button"
          onClick={openEditProfilePopup}
        ></button>
        <p className="profile__description">{description}</p>
      </div>

      <button
        className="profile__add-button"
        type="button"
        // onClick={onAddPlace}
      ></button>
    </section>
  );
}

export default Profile;
