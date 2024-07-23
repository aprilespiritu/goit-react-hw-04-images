//import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
    return (
        <ul className={`${css.gallery} js-gallery`}>
            {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
            ))}
        </ul>
    );
};
