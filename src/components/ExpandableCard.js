import React, { useState, useEffect, useRef } from 'react';
import './ExpandableCard.css';

const ExpandableCard = ({ initialText = "Click to edit this text..." }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current && !isExpanded) {
        const browserAspectRatio = window.innerWidth / window.innerHeight;
        const height = 180; // Fixed height
        const width = height * browserAspectRatio;
        cardRef.current.style.width = `${width}px`;
      }
    };

    // Initial update
    updateCardWidth();

    // Add resize listener
    window.addEventListener('resize', updateCardWidth);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCardWidth);
    };
  }, [isExpanded]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (isEditing) {
          setIsEditing(false);
        } else if (isExpanded) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isExpanded, isEditing]);

  const toggleExpand = () => {
    if (!isEditing) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleTextClick = (e) => {
    if (isExpanded) {
      e.stopPropagation();
      setIsEditing(true);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div ref={cardRef} className={`card ${isExpanded ? 'expanded' : ''}`}>
      <div className="card-content" onClick={toggleExpand}>
        {isEditing ? (
          <textarea
            className="text-editor"
            value={text}
            onChange={handleTextChange}
            onBlur={handleBlur}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div 
            className={`text-content ${isExpanded ? 'expanded' : ''}`}
            onClick={handleTextClick}
          >
            {text}
          </div>
        )}
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