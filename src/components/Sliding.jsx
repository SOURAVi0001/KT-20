import { useState, useEffect, useRef } from "react";
import styles from "./Sliding.module.css";
import img1 from "../KT_20_IMAGE/sliding/img at 19.06.53 (1).jpeg";
import img2 from "../KT_20_IMAGE/sliding/img at 19.06.53 (2).jpeg";
import img3 from "../KT_20_IMAGE/sliding/img at 19.06.53 (3).jpeg";
import img4 from "../KT_20_IMAGE/sliding/img at 19.06.53.jpeg";

const images = [
  { type: "image", src: img1 },
  { type: "image", src: img2 },
  { type: "image", src: img3 },
  { type: "image", src: img4 },
  { type: "video", src: "https://www.youtube.com/embed/dhoP-tdDs5Y" },
];

function Sliding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    let interval;
    if (autoSlide) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, autoSlide]);

  useEffect(() => {
    if (images[currentIndex].type === "video") {
      setAutoSlide(false); // Pause sliding on video
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setAutoSlide(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setAutoSlide(true);
  };

  const handleVideoPlay = () => {
    setAutoSlide(false); // Pause when video starts
  };

  const handleVideoClose = () => {
    setAutoSlide(true); // Resume auto-slide when video is closed
  };

  return (
    <div className={styles.container}>
      <div className={styles.slider} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((media, index) => (
          <div key={index} className={styles.slide}>
            {media.type === "image" ? (
              <img src={media.src} alt={`slide-${index}`} />
            ) : (
              <div className={styles.videoContainer}>
                <iframe
                  ref={videoRef}
                  className={styles.video}
                  src={`${media.src}?enablejsapi=1`}
                  title="video"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  onPlay={handleVideoPlay}
                />
                <button className={styles.closeButton} onClick={handleVideoClose}>✖</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className={styles.prev} onClick={prevSlide}>❮</button>
      <button className={styles.next} onClick={nextSlide}>❯</button>
    </div>
  );
}

export default Sliding;