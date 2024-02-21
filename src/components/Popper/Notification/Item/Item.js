import styles from './Item.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowPosts, insertDataPosts } from '~/pages/Posts/postsSlice';
import { volumeOff } from '~/components/ArticleContent/articleContentSlice';
import { insertFollow, deleteFollow } from '~/services/followService';
import { setShowNotification } from '../notificationSlice';

const cx = classNames.bind(styles);

function Item({ data }) {
    const dispatch = useDispatch();

    const [friend, setFriend] = useState(false);

    const user = useSelector((state) => state.user.data);
    useEffect(() => {
        if (user.following.includes(data.user._id)) {
            setFriend(true);
        }
    }, [user, data]);

    const handleFollweBack = async (e) => {
        e.preventDefault();
        if (friend) {
            setFriend(false);
        } else {
            setFriend(true);
        }
    };

    const handleShowPosts = () => {
        if (data.postsId) {
            dispatch(volumeOff());
            dispatch(insertDataPosts(data.postsId));
            dispatch(setShowPosts(true));
        } else {
            dispatch(setShowNotification(false));
        }
    };

    const contentNotification = (value) => {
        switch (value) {
            case 'Follwer':
                return <span className={cx('notification-your')}>follow you</span>;
            case 'Comment':
                return <span className={cx('notification-your')}>Just commented on your posts</span>;
            case 'Posts':
                return <span className={cx('notification-your')}>Just posted a video</span>;
            default:
                return '';
        }
    };

    const handleFollow = (id) => {
        const fetchApi = async () => {
            await insertFollow(id);
        };
        fetchApi();
    };

    const handleUnFollow = (id) => {
        const fetchApi = async () => {
            await deleteFollow(id);
        };
        fetchApi();
    };

    const checkFollow = ({ friend }) => {
        if (friend) {
            return (
                <Button onClick={() => handleUnFollow(data.user._id)} className={cx('follow-back')} rounded>
                    Friend
                </Button>
            );
        } else {
            return (
                <Button onClick={() => handleFollow(data.user._id)} className={cx('follow-back')} primary>
                    Follow back
                </Button>
            );
        }
    };

    return (
        <Link
            to={!data.postsId && `/profile/${data.user.account}`}
            onClick={handleShowPosts}
            className={cx('wrapper-item')}
        >
            <Image className={cx('avatar')} src="images/avatar-1707142915964.jpg" />
            <div className={cx('info')}>
                <span>{data.user.nickname}</span>
                {contentNotification(data.notificationtype)}
            </div>
            {!data.postsId && <div onClick={(e) => handleFollweBack(e)}>{checkFollow({ friend })}</div>}
        </Link>
    );
}

export default Item;
