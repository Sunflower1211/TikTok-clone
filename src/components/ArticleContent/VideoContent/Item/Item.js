import { setShow } from '~/components/ModalLogin/modalLoginSlice';
import { listComment } from '~/services/commentService';
import { insertEmotion, deleteEmotion } from '~/services/emotionService';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Item.module.scss';
import classNames from 'classnames/bind';
import { setShowPosts, insertDataPosts } from '~/pages/Posts/postsSlice';
import { volumeOff } from '../../articleContentSlice';

const cx = classNames.bind(styles);

function Item({ data }) {
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

    //thả tim
    const [countHeart, setCountHeart] = useState(0);
    const [heart, setHeart] = useState(false);
    useEffect(() => {
        setCountHeart(data.emotions.length);
    }, [data]);

    useEffect(() => {
        if (user) {
            if (data.emotions.includes(user._id)) {
                setHeart(true);
            } else {
                setHeart(false);
            }
        }
    }, [user, data]);

    const handleHeart = () => {
        if (heart) {
            const fetchApi = async () => {
                setHeart(false);
                setCountHeart((prev) => prev - 1);
                await deleteEmotion(data._id);
            };
            fetchApi();
        } else {
            const fetchApi = async () => {
                setHeart(true);
                setCountHeart((prev) => prev + 1);
                await insertEmotion(data._id);
            };
            fetchApi();
        }
    };

    const handleVideo = () => {
        dispatch(setShowPosts(true));
        dispatch(insertDataPosts(data._id));
        dispatch(volumeOff());
    };
    return (
        <div className={cx('ActionItemContainer')}>
            <div className={cx('wrapper-icon')}>
                <Button className={cx('button-icon')}>
                    {guest ? (
                        <div onClick={handleModalLogin} className={cx('div-icon')}>
                            <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                        </div>
                    ) : (
                        <div onClick={handleHeart} className={cx('div-icon')}>
                            {heart ? (
                                <FontAwesomeIcon icon={faHeart} className={cx('icon-heart')} />
                            ) : (
                                <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                            )}
                        </div>
                    )}

                    <div className={cx('number')}>{countHeart}</div>
                </Button>
            </div>
            <div className={cx('wrapper-icon')}>
                <Button className={cx('button-icon')}>
                    {guest ? (
                        <div onClick={handleModalLogin} className={cx('div-icon')}>
                            <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                        </div>
                    ) : (
                        <div onClick={handleVideo} className={cx('div-icon')}>
                            <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                        </div>
                    )}

                    <div className={cx('number')}>{countComment}</div>
                </Button>
            </div>
            <div className={cx('wrapper-icon')}>
                <Button className={cx('button-icon')}>
                    <div className={cx('div-icon')}>
                        <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                    </div>
                    <div className={cx('number')}>22</div>
                </Button>
            </div>
        </div>
    );
}

export default Item;
