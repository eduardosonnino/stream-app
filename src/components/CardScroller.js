import React from 'react';
import ExpandableCard from './ExpandableCard';
import './CardScroller.css';

const CardScroller = ({ cards }) => {
  return (
    <div className="card-scroller">
      {cards.map((card, index) => (
        <ExpandableCard
          key={index}
          url={card.url}
          title={card.title}
          style={{
            transform: `translateX(-50%) translateY(${-index * 10}px)`,
            zIndex: cards.length - index
          }}
        />
      ))}
    </div>
  );
};

export default CardScroller; 