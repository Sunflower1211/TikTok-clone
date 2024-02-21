import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './VideoInfo.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { useState, useLayoutEffect, useEffect } from 'react';
import { deleteFollow, insertFollow } from '~/services/followService';
import ModalLogin from '~/components/ModalLogin';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '~/components/ModalLogin/modalLoginSlice';

const cx = classNames.bind(styles);

function VideoInfo({ data }) {
    const [checkUser, setCheckUser] = useState(true);
    const [follow, setFollow] = useState(false);
    const [guest, setGuest] = useState(false);
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

    const handleModalLogin = () => {
        dispatch(setShow(true));
    };

    useEffect(() => {
        if (!user) {
            setGuest(true);
        }
    }, [user]);

    useLayoutEffect(() => {
        if (user) {
            if (user.following.includes(data.userid)) {
                setFollow(true);
            } else {
                setFollow(false);
            }
        }
    }, [user, data]);

    useLayoutEffect(() => {
        if (user) {
            if (user._id === data.userid) {
                setCheckUser(false);
            } else {
                setCheckUser(true);
            }
        }
    }, [user, data]);

    const handleFollow = () => {
        const fetchApi = async () => {
            await insertFollow(data.userid);
            setFollow(true);
        };
        fetchApi();
    };

    const handleUnFollow = () => {
        const fetchApi = async () => {
            await deleteFollow(data.userid);
            setFollow(false);
        };
        fetchApi();
    };

    return (
        <div className={cx('wrapper')}>
            <ModalLogin />
            <Image className={cx('user-avatar')} src={data.avatar} alt={data.account} />
            <div className={cx('text')}>
                <div className={cx('info')}>
                    <div>
                        <div>
                            <Button text className={cx('username-id')}>
                                {data.account}
                            </Button>
                            <span className={cx('username')}>{data.nickname}</span>
                        </div>
                    </div>
                    {checkUser && (
                        <div className={cx('wrapper-button-follow')}>
                            {follow ? (
                                <Button rounded onClick={handleUnFollow} className={cx('follow')}>
                                    Following
                                </Button>
                            ) : guest ? (
                                <Button outline onClick={handleModalLogin} className={cx('follow')}>
                                    Follow
                                </Button>
                            ) : (
                                <Button outline onClick={handleFollow} className={cx('follow')}>
                                    Follow
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                <div className={cx('content')}>{data.content}</div>
                <Button text className={cx('music')}>
                    <FontAwesomeIcon icon={faMusic} />
                    <span className={cx('name-song')}>âm nhạc</span>
                </Button>
            </div>
        </div>
    );
}

export default VideoInfo;
