import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
    return (
        <ul className={css.gallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }, index) => (
                <ImageGalleryItem
                    key={`${id}-${index}`}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tags={tags}
                />
            ))}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ).isRequired,
};
