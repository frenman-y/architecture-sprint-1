import React, {useState} from 'react';
import api from "apiPackage/api";

// Объект контекста CurrentUserContext экспортируется из отдельного файла директории contexts
const CurrentUserContext = React.createContext();

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState();
    const [cards, setCards] = useState();

    React.useEffect(() => {
        api
            .getAppInfo()
            .then(([cardData, userData]) => {
                setCurrentUser(userData);
                setCards(cardData);
            })
            .catch((err) => console.log(err));
    }, []);

    return {currentUser, setCurrentUser, cards, setCards};
}

export {CurrentUserContext, useCurrentUser}