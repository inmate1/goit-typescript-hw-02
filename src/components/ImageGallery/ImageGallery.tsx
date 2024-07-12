import { ReactElement } from 'react';
import Grid from '../Grid/Grid';

import ImageCard from '../ImageCard/ImageCard';
import { Image } from '../apiService/photos-api';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (details: {
    modal: string;
    user: string;
    likes: number;
    alt: string;
  }) => void;
}

const ImageGallery = ({
  images,
  onImageClick,
}: ImageGalleryProps): ReactElement => {
  return (
    <Grid>
      {images.map(image => (
        <ImageCard key={image.id} image={image} onImageClick={onImageClick} />
      ))}
    </Grid>
  );
};

export default ImageGallery;
