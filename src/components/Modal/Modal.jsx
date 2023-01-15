import PropTypes from 'prop-types';
import { useEffect } from 'react';
export const Modal = ({ imageModal, alt, toggleVisibleModal }) => {
  const clickBackdrop = e => {
    if (e.target === e.currentTarget) {
      toggleVisibleModal(imageModal, alt);
    }
  };

  useEffect(() => {
    const closeModalEsc = e => {
      if (e.code === 'Escape') {
        toggleVisibleModal(imageModal, alt);
      }
    };
    window.addEventListener('keydown', closeModalEsc);

    return () => {
      window.removeEventListener('keydown', closeModalEsc);
    };
  }, [imageModal, alt, toggleVisibleModal]);
  return (
    <div
      className="Overlay"
      onClick={e => {
        clickBackdrop(e);
      }}
    >
      <div className="Modal">
        <img src={imageModal} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageModal: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  toggleVisibleModal: PropTypes.func.isRequired,
};
