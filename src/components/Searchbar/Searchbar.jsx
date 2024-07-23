import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';

export const Searchbar = ({ onSubmit }) => {
    return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={onSubmit}>
                <button type="submit" className={css.button}>
                    <FaSearch />
                    <span className={css.buttonLabel}></span>
                </button>

                <input
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images"
                    value={search}
                    onChange={handleChange}
                />
            </form>
        </header>
    );
};

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

