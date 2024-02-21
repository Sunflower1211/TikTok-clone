import styles from './Form.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Form({ children, title }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-wrapper')}>
                <Link to={config.routes.home} className={cx('icon-tiktok')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>
                <div className={cx('form-tile')}>{title}</div>
                <div action="/api/account/login" method="post" className={cx('form')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Form;
