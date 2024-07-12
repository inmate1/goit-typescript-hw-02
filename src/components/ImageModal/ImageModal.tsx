import Modal, { Styles } from 'react-modal';
import css from './ImageModal.module.css';
import { ReactElement } from 'react';
import { Image } from '../apiService/photos-api';

const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    WebkitOverflowScrolling: 'touch',
    maxHeight: '800px',
    width: '1200px',
  },
  overlay: {
    backgroundColor: 'rgba(44, 44, 50, 0.85)',
    overflow: 'hidden',
  },
};

Modal.setAppElement('#root');

interface ImageModalProps {
  imageSrc: {
    modal: string;
    user: string;
    likes: number;
    alt: string;
  } | null;
  onClose: () => void;
  isOpen: boolean;
}

const ImageModal = ({
  imageSrc,
  onClose,
  isOpen,
}: ImageModalProps): ReactElement => {
  const afterOpenModal = () => {
    document.body.style.overflow = 'hidden';
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onClose}
      style={customStyles}
      className={css.modal}
      contentLabel='Example Modal'
      shouldCloseOnOverlayClick={true} // Close on click outside
      shouldCloseOnEsc={true} // Close on ESC key press
    >
      {imageSrc && (
        <>
          <div>
            <img
              src={imageSrc.modal}
              alt={imageSrc.alt}
              style={{ width: '1200px', height: '700px' }}
            />
          </div>
          <p className={css.descModal}>Description: {imageSrc.alt}</p>
          <p className={css.descModal}>Author: {imageSrc.user}</p>
          <p className={css.descModal}>Likes: {imageSrc.likes}</p>
        </>
      )}
    </Modal>
  );
};

export default ImageModal;
