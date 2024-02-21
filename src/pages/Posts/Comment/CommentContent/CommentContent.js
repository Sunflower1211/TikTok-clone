import styles from './CommentContent.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import Reply from '../Reply';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShowPosts } from '../../postsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import { deleteComment } from '../commentSlice';

const cx = classNames.bind(styles);

function CommentContent({ data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);

    const handleNextProfile = () => {
        dispatch(setShowPosts(false));
        navigate(`/profile/${data.account}`);
    };
    const [isHovered, setIsHovered] = useState(false);
    const [checkUser, setCheckUser] = useState(false);
    useEffect(() => {
        if (data.userid === user._id) {
            setCheckUser(true);
        } else {
            setCheckUser(false);
        }
    }, [data, user]);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsVisible(false);
    };

    const [isVisible, setIsVisible] = useState(false);
    const handleIsVisible = () => {
        isVisible ? setIsVisible(false) : setIsVisible(true);
    };

    const handleDeleteComment = () => {
        dispatch(deleteComment(data._id));
        setIsHovered(false);
        setIsVisible(false);
    };

    return (
        <div className={cx('wrapper-comment-content')}>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ display: 'flex' }}>
                <div onClick={handleNextProfile} className={cx('avatar-wrapper-comment')}>
                    <Image className={cx('avatar-comment')} src={data.avatar} />
                </div>
                <div className={cx('comment-content-container')}>
                    <span onClick={handleNextProfile} className={cx('nickname-comment')}>
                        {data.nickname}
                    </span>
                    <div className={cx('comment-content')}>{data.content}</div>
                </div>
                {isHovered && (
                    <div>
                        <Tippy
                            interactive
                            visible={isVisible}
                            placement="bottom-end"
                            render={(attrs) => (
                                <div className={cx('tippy-delete-comment')} tabIndex="-1" {...attrs}>
                                    {checkUser ? (
                                        <div onClick={handleDeleteComment} className={cx('delete-comment')}>
                                            Delete
                                        </div>
                                    ) : (
                                        <div className={cx('delete-comment')}>report</div>
                                    )}
                                </div>
                            )}
                        >
                            <div onClick={() => handleIsVisible()} className={cx('icon-ellipsis')}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </Tippy>
                    </div>
                )}
            </div>
            <Reply commentId={data._id} />
        </div>
    );
}

export default CommentContent;
