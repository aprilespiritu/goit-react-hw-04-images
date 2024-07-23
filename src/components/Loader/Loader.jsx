import { TailSpin } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
    return (
        <div className={css.Loader}>
            <div className={css.loaderBox}>
                <TailSpin color="#00bfff" height={80} width={80} />
            </div>
        </div>
    );
}

export default Loader;