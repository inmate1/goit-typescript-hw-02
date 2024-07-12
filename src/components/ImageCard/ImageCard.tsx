import { ReactElement } from 'react';
import GridItem from '../GridItem/GridItem';
import styles from './ImageCard.module.css';
import { Image } from '../apiService/photos-api';

interface ImageCardProps {
  image: Image;
  onImageClick: (details: {
    modal: string;
    user: string;
    likes: number;
    alt: string;
  }) => void;
}

const ImageCard = ({ image, onImageClick }: ImageCardProps): ReactElement => {
  const {
    alt_description,
    urls: { regular, small },
    user,
    likes,
  } = image;
  return (
    <GridItem>
      <div className={styles.thumb}>
        <img
          src={small}
          alt={alt_description}
          onClick={() =>
            onImageClick({
              modal: regular,
              user: user.name,
              likes,
              alt: alt_description,
            })
          }
          style={{ cursor: 'pointer' }}
        />
      </div>
    </GridItem>
  );
};

export default ImageCard;
