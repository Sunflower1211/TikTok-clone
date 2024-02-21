import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import styles from './ListFollow.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AccountItem from '~/components/AccountItem';
import { useDispatch } from 'react-redux';
import { setShowListFollow, createData } from './listFollowSlice';
import { listFollowing, listFollower } from '~/services/followService';

const cx = classNames.bind(styles);

function ListFollow({ userId, data, type }) {
    const customStyles = {
        overlay: {
            background: 'none rgba(84, 84, 84, 0.20)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '550px',
            height: '700px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };

    const dispatch = useDispatch();

    const show = useSelector((state) => state.listFollow.show);

    const handleCloseModal = () => {
        dispatch(setShowListFollow(false));
    };

    const handleListFollowing = () => {
        const fetchApi = async () => {
            const res = await listFollowing(userId);
            if (res.statusCode === 200) {
                dispatch(createData({ data: res.data, type: 'following' }));
                dispatch(setShowListFollow(true));
            }
        };
        fetchApi();
    };

    const handleListFollower = () => {
        const fetchApi = async () => {
            const res = await listFollower(userId);
            if (res.statusCode === 200) {
                dispatch(createData({ data: res.data, type: 'follower' }));
                dispatch(setShowListFollow(true));
            }
        };
        fetchApi();
    };

    return (
        <Modal isOpen={show} style={customStyles}>
            <div className={cx('wrapper-modal-list-user-follow')}>
                <div className={cx('header-list-user-follow')}>
                    <h1 className={cx('text-header-list-user-follow')}>Ngo Luong</h1>
                    <FontAwesomeIcon onClick={handleCloseModal} className={cx('button-close')} icon={faXmark} />
                </div>
                <div className={cx('tabs-list-user-follow')}>
                    <div
                        onClick={handleListFollowing}
                        className={cx('list-following', type === 'following' && 'follow-display')}
                    >
                        <div>Following</div>
                        <span>12</span>
                    </div>
                    <div
                        onClick={handleListFollower}
                        className={cx('list-follower', type === 'follower' && 'follow-display')}
                    >
                        <div>Follower</div>
                        <span>12</span>
                    </div>
                </div>
                <div className={cx('list-user-follow-container')}>
                    {data.map((item) => (
                        <AccountItem key={item._id} data={item} onClick={handleCloseModal} />
                    ))}
                </div>
            </div>
        </Modal>
    );
}

export default ListFollow;
