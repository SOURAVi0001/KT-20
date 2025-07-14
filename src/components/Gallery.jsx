import React, { useState } from 'react';
import styles from './Gallery.module.css';
import img1 from "../KT_20_IMAGE/gallery/img at 19.07.27 (1).jpeg";
import img2 from "../KT_20_IMAGE/gallery/img at 19.07.27 (2).jpeg";
import img3 from "../KT_20_IMAGE/gallery/img at 19.07.27 (3).jpeg";
import img4 from "../KT_20_IMAGE/gallery/img at 19.07.27 (4).jpeg";
import img5 from "../KT_20_IMAGE/gallery/img at 19.07.27 (5).jpeg";
import img6 from "../KT_20_IMAGE/gallery/img at 19.07.27 (6).jpeg";
import img7 from "../KT_20_IMAGE/gallery/img at 19.07.27 (7).jpeg";
import img8 from "../KT_20_IMAGE/gallery/img at 19.07.27 (8).jpeg";
import img9 from "../KT_20_IMAGE/gallery/img at 19.07.27 (9).jpeg";
import img10 from "../KT_20_IMAGE/gallery/img at 19.07.28 (1).jpeg";
import img11 from "../KT_20_IMAGE/gallery/img at 19.07.28 (2).jpeg";
import img12 from "../KT_20_IMAGE/gallery/img at 19.07.28 (3).jpeg";
import img13 from "../KT_20_IMAGE/gallery/img at 19.07.28 (4).jpeg";
import img14 from "../KT_20_IMAGE/gallery/img at 19.07.28 (5).jpeg";
import img15 from "../KT_20_IMAGE/gallery/img at 19.07.28 (6).jpeg";
import img16 from "../KT_20_IMAGE/gallery/img at 19.07.28 (7).jpeg";
import img17 from "../KT_20_IMAGE/gallery/img at 19.07.28 (8).jpeg";
import img18 from "../KT_20_IMAGE/gallery/img at 19.07.28 (9).jpeg";
import img19 from "../KT_20_IMAGE/gallery/img at 19.07.28.jpeg";
import img20 from "../KT_20_IMAGE/gallery/img at 19.07.29 (1).jpeg";
import img21 from "../KT_20_IMAGE/gallery/img at 19.07.29.jpeg";
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
  { id: 1, src: img1 },
  { id: 2, src: img2 },
  { id: 3, src: img3 },
  { id: 4, src: img4 },
  { id: 5, src: img5 },
  { id: 6, src: img6 },
  { id: 7, src: img7 },
  { id: 8, src: img8 },
  { id: 9, src: img9 },
  { id: 10, src: img10 },
  { id: 11, src: img11 },
  { id: 12, src: img12 },
  { id: 13, src: img13 },
  { id: 14, src: img14 },
  { id: 15, src: img15 },
  { id: 16, src: img16 },
  { id: 17, src: img17 },
  { id: 18, src: img18 },
  { id: 19, src: img19 },
  { id: 20, src: img20 },
  { id: 21, src: img21 },
];

  return (
    <div className={styles.galleryContainer}>
      <h2 className={styles.galleryTitle}>Image Gallery</h2>
      <div className={styles.imageGrid}>
        {images.map((image) => (
          <div key={image.id} className={styles.imageCard} onClick={() => setSelectedImage(image)}>
            <img src={image.src} alt={image.alt} className={styles.gridImage} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.imageModal} onClick={() => setSelectedImage(null)}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton}>&times;</span>
            <img src={selectedImage.src} alt={selectedImage.alt} className={styles.modalImage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;