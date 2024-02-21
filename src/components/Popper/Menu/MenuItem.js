import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.module.scss';
import { useDispatch } from 'react-redux';
import { setShowLogout } from '~/components/ModalLogout/modalLogoutSlice';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const dispatch = useDispatch();

    const classes = cx('menu-item', {
        separate: data.separate,
    });
    const handleLogOut = () => {
        dispatch(setShowLogout(true));
    };
    if (data.title === 'Log out') {
        return (
            <Button className={classes} leftIcon={data.icon} onClick={handleLogOut}>
                {data.title}
            </Button>
        );
    }
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
