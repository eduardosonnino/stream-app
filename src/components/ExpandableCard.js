import React, { useState, useEffect, useRef } from 'react';
import './ExpandableCard.css';

const ExpandableCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current && !isExpanded) {
        const documentAspectRatio = document.documentElement.scrollWidth / document.documentElement.scrollHeight;
        const height = 180; // Fixed height
        const width = height * documentAspectRatio;
        cardRef.current.style.width = `${width}px`;
      }
    };

    updateCardWidth();
    const resizeObserver = new ResizeObserver(updateCardWidth);
    resizeObserver.observe(document.documentElement);
    window.addEventListener('resize', updateCardWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateCardWidth);
    };
  }, [isExpanded]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isExpanded]);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      ref={cardRef} 
      className={`card ${isExpanded ? 'expanded' : ''}`}
    >
      <div className="card-overlay" onClick={toggleExpand} />
      <div className="card-content">
        <iframe
          src="https://en.wikipedia.org/wiki/Atlassian"
          title="Atlassian Wikipedia"
          className="web-frame"
          sandbox="allow-same-origin allow-scripts"
          loading="lazy"
          referrerPolicy="origin"
        />
        {isExpanded && (
          <button className="close-button" onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpandableCard; 