import Modal from 'react-modal';
import css from './Modal.module.css';

Modal.setAppElement('#root');

const SearchModal = ({ image, modalOpen, modalClose }) => {
    return (
        <Modal
            onRequestClose={modalClose}
            isOpen={modalOpen}
            contentLabel="Image Modal"
            className={css.overlay}
        >
            <div className={css.modal}>
                <img src={image} alt={tags} />
            </div>
        </Modal>   
    );
};

export default SearchModal;