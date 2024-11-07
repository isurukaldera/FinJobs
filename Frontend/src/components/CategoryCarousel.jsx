import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "Requirement Eng",
  "Graphic Designer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? categories.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div style={styles.carouselContainer}>
      <div style={styles.carousel}>
        <div style={{ ...styles.carouselContent, transform: `translateX(-${currentIndex * 100}%)` }}>
          {categories.map((cat, index) => (
            <div key={index} style={styles.carouselItem}>
              <button
                onClick={() => searchJobHandler(cat)}
                style={hoverIndex === index ? { ...styles.carouselButton, ...styles.carouselButtonHover } : styles.carouselButton}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {cat}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.carouselControls}>
        <button onClick={handlePrevious} style={styles.carouselControlButton}>Previous</button>
        <button onClick={handleNext} style={styles.carouselControlButton}>Next</button>
      </div>
    </div>
  );
};

const styles = {
  carouselContainer: {
    width: '100%',
    maxWidth: '40rem',
    margin: '2.5rem auto',
    position: 'relative',
  },
  carousel: {
    display: 'flex',
    overflow: 'hidden',
  },
  carouselContent: {
    display: 'flex',
    transition: 'transform 0.3s ease-in-out',
  },
  carouselItem: {
    flexShrink: 0,
    width: '100%',
    textAlign: 'center',
  },
  carouselButton: {
    display: 'block',
    width: '100%',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  carouselButtonHover: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  carouselControls: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '1rem',
  },
  carouselControlButton: {
    cursor: 'pointer',
    color: '#3b82f6',
    transition: 'color 0.3s ease',
  },
  carouselControlButtonHover: {
    color: '#2563eb',
  },
};

export default CategoryCarousel;
