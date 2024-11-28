import React, { useState, useEffect, useRef } from 'react';
import './ExpandableCard.css';

const ExpandableCard = ({ initialText = "Click to edit this text..." }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

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
      if (event.key === 'Escape') {
        if (isEditing) {
          setIsEditing(false);
        } else if (isExpanded) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isExpanded, isEditing]);

  const handleMouseDown = (e) => {
    if (!isExpanded && !isEditing) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isExpanded) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const toggleExpand = () => {
    if (!isEditing && !isDragging) {
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

  const cardStyle = {
    transform: isExpanded 
      ? 'translate(-50%, 0)' 
      : `translate(${position.x}px, ${position.y}px)`
  };

  return (
    <div 
      ref={cardRef} 
      className={`card ${isExpanded ? 'expanded' : ''} ${isDragging ? 'dragging' : ''}`}
      style={cardStyle}
      onMouseDown={handleMouseDown}
    >
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