import styles from './Info.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useState, useEffect, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPenToSquare, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { deleteFollow, insertFollow } from '~/services/followService';
import { setShow } from '~/components/ModalLogin/modalLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import ActionListFollow from './ActionListFollow';
import { setShowEditProfile } from './EditProfile/editProfileSlice';
import { createUserReceiver } from '~/pages/Message/messageSlice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Info({ data }) {
    const [quantityFollowing, setQuantityFollowing] = useState(0);
    const [quantityFollowers, setQuantityFollowers] = useState(0);
    const [checkUser, setCheckUser] = useState(false);
    const [userOnOff, setUserOnOff] = useState(false);

    const [checkFollow, setCheckFollow] = useState(false);

    const navigator = useNavigate();
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

    //chức năng chưa được đăng nhập
    const handleModalLogin = () => {
        dispatch(setShow(true));
    };

    useLayoutEffect(() => {
        if (user) {
            setUserOnOff(true);
            if (user._id === data._id) {
                setCheckUser(true);
            } else {
                setCheckUser(false);
            }
        }
    }, [user, data]);

    useLayoutEffect(() => {
        if (user) {
            if (user.following.includes(data._id)) {
                setCheckFollow(true);
            } else {
                setCheckFollow(false);
            }
        }
    }, [user, data]);

    useEffect(() => {
        if (data) {
            setQuantityFollowers(data.followers.length);
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            setQuantityFollowing(data.following.length);
        }
    }, [data]);

    const handleUnFollow = () => {
        const fetchApi = async () => {
            await deleteFollow(data._id);
            setCheckFollow(false);
            setQuantityFollowers((prev) => prev - 1);
        };
        fetchApi();
    };

    const handleFollow = () => {
        const fetchApi = async () => {
            await insertFollow(data._id);
            setCheckFollow(true);
            setQuantityFollowers((prev) => prev + 1);
        };
        fetchApi();
    };

    const handleEditProfile = () => {
        dispatch(setShowEditProfile(true));
    };

    //
    const handleCreateUserReceiver = () => {
        dispatch(createUserReceiver(data));
        navigator(`/message`);
    };
    return (
        <div className={cx('wrapper-info')}>
            <div className={cx('info')}>
                <div className={cx('avatar')}>
                    <Image src={data.avatar} alt="Nguyen Van A" className={cx('user-avatar')} />
                </div>
                <div className={cx('user')}>
                    <div className={cx('user-header')}>
                        <h1 className={cx('username-id')}>{data.account}</h1>
                        {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </div>
                    <h3 className={cx('username')}>{data.nickname}</h3>
                    {userOnOff ? (
                        checkUser ? (
                            <Button onClick={handleEditProfile} className={cx('button-edit-profile')} rounded>
                                <FontAwesomeIcon icon={faPenToSquare} />
                                <span className={cx('span-edit-profile')}>Edit profile</span>
                            </Button>
                        ) : checkFollow ? (
                            <div className={cx('wrapper-message-icon-unfollow')}>
                                <Button onClick={handleCreateUserReceiver} className={cx('button-message')} outline>
                                    Message
                                </Button>
                                <Tippy delay={[0, 50]} content="Unfollow" placement="bottom">
                                    <button onClick={handleUnFollow} className={cx('button-icon-user-check')}>
                                        <FontAwesomeIcon icon={faUserCheck} />
                                    </button>
                                </Tippy>
                            </div>
                        ) : (
                            <Button onClick={handleFollow} className={cx('button-follow')} primary>
                                Following
                            </Button>
                        )
                    ) : (
                        <Button onClick={handleModalLogin} className={cx('button-follow')} primary>
                            Following
                        </Button>
                    )}
                </div>
            </div>
            <ActionListFollow
                quantityFollowing={quantityFollowing}
                quantityFollowers={quantityFollowers}
                userOnOff={userOnOff}
                infoProfile={data}
            />
        </div>
    );
}

export default Info;
