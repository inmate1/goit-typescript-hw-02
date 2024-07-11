import Modal, { Styles } from 'react-modal';
import css from './ImageModal.module.css';
import { ReactElement } from 'react';

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

interface ImageModal {
  imageSrc: {
    alt: string;
    modal: string;
    user: {
      name: string;
    };
    likes: number;
  } | null;
  onClose: () => void;
  isOpen: boolean;
}

const ImageModal = ({
  imageSrc,
  onClose,
  isOpen,
}: ImageModal): ReactElement => {
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
      {imageSrc?.modal && (
        <>
          <div>
            <img
              src={imageSrc && imageSrc.modal}
              alt='Full Size'
              style={{ width: '1200px', height: '700px' }}
            />
          </div>
          <p className={css.descModal}>
            Description: {imageSrc && imageSrc.alt}
          </p>
          <p className={css.descModal}>
            Author:{imageSrc && imageSrc.user.name}
          </p>
          <p className={css.descModal}>Likes: {imageSrc && imageSrc.likes}</p>
        </>
      )}
    </Modal>
  );
};

export default ImageModal;
