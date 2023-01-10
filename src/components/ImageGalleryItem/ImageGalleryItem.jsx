import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [modal, setModal] = useState(false);
  const [imageModal, setImageModal] = useState('');
  const [alt, setAlt] = useState('');

  const toggleVisibleModal = (imageModal, alt) => {
    setModal(!modal);
    setImageModal(imageModal);
    setAlt(alt);
  };

  return (
    <>
      <li className="ImageGalleryItem">
        <img
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image"
          onClick={() => {
            toggleVisibleModal(largeImageURL, tags);
          }}
        />
      </li>
      {modal && (
        <Modal
          imageModal={imageModal}
          alt={alt}
          toggleVisibleModal={toggleVisibleModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
