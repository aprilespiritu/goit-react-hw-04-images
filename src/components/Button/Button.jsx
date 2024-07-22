//import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick }) => {
    //static propTypes = {
    //    onClick: PropTypes.func.isRequired,
    //};

    return (
        <button className={css.Button} onClick={onClick}>
            Load more...
        </button>
    );
};


//export default Button;