import React, { useState } from 'react'

export default function SwipeableButton() {
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [swipeStartX, setSwipeStartX] = useState(null);
    const [fruits, setFruits] = useState([]);
    const handleTouchStart = (e) => {
        setSwipeDirection(null);
        setSwipeStartX(e.touches[0].clientX)
    }

    const handleTouchMove = (e) => {
        const distance = e.touches[0].clientX - swipeStartX;

        if (distance > 50) {
            setSwipeDirection('right');
        } else {
            setSwipeDirection('left');
        }
    };

    const handleTouchEnd = (e) => {
        if (swipeDirection === 'right'){
            setFruits(['apple']);
        }
    }
    return (
        <>
        <button
    onTouchStart={handleTouchStart}
    onTouchMove = {handleTouchMove}
    onTouchEnd={handleTouchEnd}
    >
        swipe me
    </button>
    {fruits.map(fruit => (
        <p>{fruit}</p>
    ))}
        </>
    
    
  )
}
