import { ReactElement } from "react";
import GridItem from "../GridItem/GridItem";
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  alt: string;
  modal: string;
  src: string;
  user: string;
  likes: number;
  onImageClick: (
    details: {
    modal: string;
    user: string;
    likes: number;
    alt: string;
  }
) => void;
}


const ImageCard = ({
  alt,
  modal,
  src,
  user,
  likes,
  onImageClick,
}: ImageCardProps): ReactElement => {
  return (
    <GridItem>
      <div className={styles.thumb}>
        <img
          src={src}
          alt={alt}
          onClick={() => onImageClick({ modal, user, likes, alt })}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </GridItem>
  );
};

export default ImageCard;
