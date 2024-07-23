import { useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchModal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    
    const handleModalOpen = () => {
        setSelectedImage(largeImageURL);
    };

    const handleModalClose = () => {
        setSelectedImage(null);
    };

    return (
        <li className={css.galleryItem} onClick={handleModalOpen}>
            <img
                src={webformatURL}
                alt={tags}
            />
            {showModal && (
                <SearchModal
                    image={largeImageURL}
                    tags={tags}
                    onClose={handleModalClose}
                />)}
        </li>
    );
};

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
    }).isRequired,
};