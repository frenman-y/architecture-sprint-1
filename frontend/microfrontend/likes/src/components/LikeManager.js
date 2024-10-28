import React from 'react';
import api from '../utils/api';

export default function LikeManager({ card, currentUser }) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    const handleLike = () => {
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((updatedCard) => {
                console.log('Card updated:', updatedCard);
            })
            .catch((err) => console.log('Failed to like card:', err));
    };

    return (
        <button onClick={handleLike}>
            {isLiked ? 'Unlike' : 'Like'}
        </button>
    );
}