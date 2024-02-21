import Button from '~/components/Button';
import styles from './ActionListFollow.module.scss';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { setShow } from '~/components/ModalLogin/modalLoginSlice';
import { listFollowing, listFollower } from '~/services/followService';
import { createData, setShowListFollow } from './ListFollow/listFollowSlice';

const cx = classNames.bind(styles);

function ActionListFollow({ userOnOff, quantityFollowing, quantityFollowers, infoProfile }) {
    const dispatch = useDispatch();

    //chức năng chưa được đăng nhập
    const handleModalLogin = () => {
        dispatch(setShow(true));
    };

    //đã đăng nhập
    const handleListFollowing = () => {
        const fetchApi = async () => {
            const res = await listFollowing(infoProfile._id);
            if (res.statusCode === 200) {
                dispatch(createData({ data: res.data, type: 'following' }));
                dispatch(setShowListFollow(true));
            }
        };
        fetchApi();
    };

    const handleListFollower = () => {
        const fetchApi = async () => {
            const res = await listFollower(infoProfile._id);
            if (res.statusCode === 200) {
                dispatch(createData({ data: res.data, type: 'follower' }));
                dispatch(setShowListFollow(true));
            }
        };
        fetchApi();
    };
    return (
        <div className={cx('wrapper-list-follow')}>
            {userOnOff ? (
                <div className={cx('follow-container')}>
                    <div onClick={handleListFollowing} className={cx('follow-content-container')}>
                        <span className={cx('span-follow')}>{quantityFollowing}</span>
                        <Button className={cx('quantity-follow')} text>
                            Following
                        </Button>
                    </div>
                    <div onClick={handleListFollower} className={cx('follow-content-container')}>
                        <span className={cx('span-follow')}>{quantityFollowers}</span>
                        <Button className={cx('quantity-follow')} text>
                            Followers
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={cx('follow-container')}>
                    <div onClick={handleModalLogin} className={cx('follow-content-container')}>
                        <span className={cx('span-follow')}>{quantityFollowing}</span>
                        <Button className={cx('quantity-follow')} text>
                            Following
                        </Button>
                    </div>
                    <div onClick={handleModalLogin} className={cx('follow-content-container')}>
                        <span className={cx('span-follow')}>{quantityFollowers}</span>
                        <Button className={cx('quantity-follow')} text>
                            Followers
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ActionListFollow;
