//import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
    //static propTypes = {
    //    images: PropTypes.arrayOf(
    //        PropTypes.shape({
    //            id: PropTypes.number.isRequired,
    //        })
    //    ).isRequired,
    return (
        <ul className={`${css.gallery} js-gallery`}>
            {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
            ))}
        </ul>
    );
};
