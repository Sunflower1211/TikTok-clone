import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from './modalLoginSlice';
import Button from '../Button';
import classNames from 'classnames/bind';
import styles from './ModalLogin.module.scss';

const cx = classNames.bind(styles);

function ModalLogin() {
    const dispatch = useDispatch();

    const show = useSelector((state) => state.modalLogin.show);

    const closeModal = async () => {
        dispatch(setShow(false));
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
                    <div className={cx('header')}>Log in to TikTok</div>
                    <div className={cx('body')}>
                        <Button className={cx('button')} onClick={closeModal} rounded>
                            Cancel
                        </Button>
                        <Button to={'/login'} className={cx('button')} outline>
                            Login
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ModalLogin;
