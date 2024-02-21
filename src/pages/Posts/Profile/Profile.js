import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faEllipsis, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useLayoutEffect } from 'react';
import { listComment } from '~/services/commentService';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '~/components/ModalLogin/modalLoginSlice';
import { setShowPosts } from '../postsSlice';
import { insertEmotion, deleteEmotion } from '~/services/emotionService';
import { insertFollow, deleteFollow } from '~/services/followService';
import HeadlessTippy from '@tippyjs/react/headless';
import { deletePosts } from '~/services/postsService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile({ data }) {
    const [avatar, setAvatar] = useState();
    const [userOn, setUserOn] = useState();
    const user = useSelector((state) => state.user.data);

    const navigation = useNavigate();
    const dispatch = useDispatch();

    //chưa đăng nhập
    useEffect(() => {
        if (!user) {
            setUserOn(false);
        } else {
            setUserOn(true);
        }
    }, [user]);

    const handleModalLogin = () => {
        dispatch(setShowPosts(false));
        dispatch(setShow(true));
    };

    //useron

    //heart
    const [countHeart, setCountHeart] = useState(0);
    const [heart, setHeart] = useState(false);

    useEffect(() => {
        if (user) {
            if (data) {
                if (data.emotions.includes(user._id)) {
                    setHeart(true);
                } else {
                    setHeart(false);
                }
            }
        }
    }, [user, data]);

    const handleHeart = async () => {
        if (heart) {
            setCountHeart((prev) => prev - 1);
            await deleteEmotion(data._id);
            setHeart(false);
        } else {
            setCountHeart((prev) => prev + 1);
            await insertEmotion(data._id);
            setHeart(true);
        }
    };

    useEffect(() => {
        setCountHeart(data.emotions.length);
    }, [data]);

    //follow
    const [follow, setFollow] = useState(false);
    const handleFollow = async () => {
        if (follow) {
            setFollow(false);
            await deleteFollow(data.userid);
        } else {
            setFollow(true);
            await insertFollow(data.userid);
        }
    };

    useLayoutEffect(() => {
        if (user) {
            if (user.following.includes(data.userid)) {
                setFollow(true);
            } else {
                setFollow(false);
            }
        }
    }, [user, data]);

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            setAvatar(data.avatar);
        }
    }, [data]);

    //comment
    const [countComment, setCountComment] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await listComment(data._id);
            if (res.statusCode === 200) {
                setCountComment(res.data.length);
            }
        };
        fetchApi();
    });

    //kiểm tra có phải đúng bài biết của người dùng
    const [checkPosts, setCheckPost] = useState(false);
    useEffect(() => {
        if (user) {
            data.userid === user._id ? setCheckPost(true) : setCheckPost(false);
        }
    }, [user, data]);

    //
    const [showEditPosts, setShowEditPosts] = useState(false);
    const handleEditPosts = () => {
        showEditPosts ? setShowEditPosts(false) : setShowEditPosts(true);
    };

    //delete posts
    const handleDeletePosts = () => {
        const fetchApi = async () => {
            const res = await deletePosts(data._id);
            if (res.statusCode === 200) {
                navigation(`/profile/${data.account}`);
                window.location.reload();
            }
        };

        fetchApi();
    };

    return (
        <div className={cx('profile-wrapper')}>
            <div className={cx('description-content')}>
                <div className={cx('info-container')}>
                    <div className={cx('avatar-and-name-profile-info')}>
                        <Image className={cx('avatar-profile-info')} src={avatar} />
                        <div className={cx('name-profile-info')}>
                            <div className={cx('account-profile-info')}>{data.account}</div>
                            <div className={cx('nickname-profile-info')}>{data.nickname}</div>
                        </div>
                    </div>
                    {userOn ? (
                        checkPosts ? (
                            <HeadlessTippy
                                interactive
                                visible={showEditPosts}
                                placement="bottom-end"
                                render={(attrs) => (
                                    <div
                                        onClick={handleDeletePosts}
                                        className={cx('tippy-edit-posts')}
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <div className={cx('delete-posts')}>Delete</div>
                                    </div>
                                )}
                                onClickOutside={handleEditPosts}
                            >
                                <FontAwesomeIcon
                                    onClick={handleEditPosts}
                                    className={cx('edit-posts')}
                                    icon={faEllipsis}
                                />
                            </HeadlessTippy>
                        ) : follow ? (
                            <Button onClick={handleFollow} className={cx('button-profile-info')} rounded>
                                Following
                            </Button>
                        ) : (
                            <Button onClick={handleFollow} className={cx('button-profile-info')} primary>
                                Follow
                            </Button>
                        )
                    ) : (
                        <Button onClick={handleModalLogin} className={cx('button-profile-info')} primary>
                            Follow
                        </Button>
                    )}
                </div>
                <div className={cx('description-main-content')}>
                    <div className={cx('wrapper-content')}>{data.content}</div>
                    <div className={cx('browes-music')}>
                        <FontAwesomeIcon icon={faMusic} />
                        <span className={cx('name-song')}>âm nhạc</span>
                    </div>
                </div>
            </div>
            <div className={cx('main-content')}>
                <div className={cx('div-wrapper-icon-main-content')}>
                    {userOn ? (
                        <div onClick={handleHeart} className={cx('div-icon-main-content', 'wrapper-icon-heart')}>
                            {heart ? (
                                <FontAwesomeIcon icon={faHeart} className={cx('icon-heart')} />
                            ) : (
                                <FontAwesomeIcon icon={faHeart} className={cx('icon-main-content')} />
                            )}
                        </div>
                    ) : (
                        <div onClick={handleModalLogin} className={cx('div-icon-main-content')}>
                            <FontAwesomeIcon icon={faHeart} className={cx('icon-main-content')} />
                        </div>
                    )}

                    <span className={cx('span-icon-main-content')}>{countHeart}</span>
                </div>

                <div className={cx('div-wrapper-icon-main-content')}>
                    {userOn ? (
                        <div className={cx('div-icon-main-content')}>
                            <FontAwesomeIcon icon={faCommentDots} className={cx('icon-main-content')} />
                        </div>
                    ) : (
                        <div onClick={handleModalLogin} className={cx('div-icon-main-content')}>
                            <FontAwesomeIcon icon={faCommentDots} className={cx('icon-main-content')} />
                        </div>
                    )}

                    <span className={cx('span-icon-main-content')}>{countComment}</span>
                </div>

                <div className={cx('div-wrapper-icon-main-content')}>
                    <div className={cx('div-icon-main-content')}>
                        <FontAwesomeIcon icon={faShare} className={cx('icon-main-content')} />
                    </div>
                    <span className={cx('span-icon-main-content')}>0</span>
                </div>
            </div>
        </div>
    );
}

export default Profile;
