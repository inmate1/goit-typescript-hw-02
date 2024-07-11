import { ReactElement } from "react";
import Grid from "../Grid/Grid";

import ImageCard from "../ImageCard/ImageCard";
//////////
interface Image {
  id: string;
  alt_description: string;
  likes: number;
  user: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
}
///////////
interface ImageGalleryProps {
  images: Image[];
  onImageClick: (
    details: {
    modal: string;
    user: string;
    likes: number;
    alt: string;
    }
  ) => void;
}

const ImageGallery = ({
  images,
  onImageClick,
}: ImageGalleryProps): ReactElement => {
  return (
    <Grid>
      {images.map(
        ({
          id,
          alt_description,
          likes,
          user,
          urls: { regular, small, thumb },
        }) => (
          <ImageCard
            key={id}
            alt={alt_description}
            modal={regular}
            src={small}
            likes={likes}
            user={user}
            onImageClick={() =>
              onImageClick({
                modal: regular,
                user,
                likes,
                alt: alt_description,
              })
            }
          />
        )
      )}
    </Grid>
  );
};
// ImageGallery.propTypes = {
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       alt_description: PropTypes.string,
//       avg_color: PropTypes.string,
//       likes: PropTypes.number.isRequired,
//       user: PropTypes.object.isRequired,
//       urls: PropTypes.shape({
//         full: PropTypes.string,
//         raw: PropTypes.string,
//         regular: PropTypes.string.isRequired,
//         small: PropTypes.string.isRequired,
//         thumb: PropTypes.string,
//       }).isRequired,
//     })
//   ).isRequired,
//   onImageClick: PropTypes.func.isRequired,
// };
export default ImageGallery;
