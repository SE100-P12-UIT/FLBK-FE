import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false); 
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <Button
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            height: 64,
            width:64,
            bottom: 20,
            right: 20,
            backgroundColor: '#112211',
            color: 'white',
            borderRadius: '50%',
            padding: '10px',
            boxShadow: 3,
            zIndex: 1000,
            '&:hover': {
              backgroundColor: '#DDFAF0',
              color: '#112211',
              transform: 'scale(1.1)',
            },
            transition: showButton ? 'transform 0.3s ease' : 'transform 0.3s ease',
          }}
        >
          <ArrowUpwardIcon />
        </Button>
      )}
    </>
  );
};

export default ScrollToTopButton;