import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLogout } from './modalLogoutSlice';
import Button from '../Button';
import classNames from 'classnames/bind';
import styles from './ModalLogout.module.scss';
import { logout } from '~/services/logoutService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ModalLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const show = useSelector((state) => state.modalLogout.show);

    const closeModal = async () => {
        dispatch(setShowLogout(false));
    };
    const handleLogOut = () => {
        const fetchApi = async () => {
            await logout();
            dispatch(setShowLogout(false));
            navigate('/');
            window.location.reload();
        };
        fetchApi();
    };

    const customStyles = {
        overlay: {
            background: 'none rgba(84, 84, 84, 0.20)',
            zIndex: 9999,
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '194px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };

    return (
        <div>
            <Modal isOpen={show} style={customStyles}>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>Are you sure you want to log out ?</div>
                    <div className={cx('body')}>
                        <Button className={cx('button')} onClick={closeModal} rounded>
                            Cancel
                        </Button>
                        <Button onClick={handleLogOut} className={cx('button')} outline>
                            Log out
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ModalLogout;
