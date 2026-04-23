import { useState, useEffect } from 'react';
import landing_listing from '../../assets/landing_listing.webp';
import landing_contact from '../../assets/landing_contact.webp';

const AutoImageSwitcher = () => {
  const images = [`${landing_listing}`, `${landing_contact}`];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="w-full flex justify-center items-center p-10 ">
      <div className="relative rounded-xl overflow-hidden shadow-1">
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover animate-fade-in"
        />
      </div>
    </div>
  );
};

export default AutoImageSwitcher;
