import styles from './BottomComment.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '~/components/ModalLogin/modalLoginSlice';
import { setShowPosts } from '../../postsSlice';
import { createContentComment } from '../commentSlice';

const cx = classNames.bind(styles);

function BottomComment() {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const inputCommentRef = useRef();

    //chưa đăng nhập
    const [userOnOff, setUserOnOff] = useState(false);
    useEffect(() => {
        if (user) {
            setUserOnOff(true);
        }
    }, [user]);

    const handleModalLogin = () => {
        dispatch(setShowPosts(false));
        dispatch(setShow(true));
    };

    //đã đăng nhập
    const [contentComment, setContentComment] = useState('');

    //tạo comment
    const handleCreateContentComment = () => {
        dispatch(createContentComment(contentComment.trim()));
        setContentComment('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (contentComment.trim().length > 0) {
                handleCreateContentComment();
            }
        }
    };
    return (
        <div className={cx('wrapper-bottom-comment-container')}>
            {userOnOff ? (
                <div className={cx('bottom-comment-container')}>
                    <input
                        onChange={(e) => setContentComment(e.target.value)}
                        value={contentComment}
                        placeholder="Add comment ..."
                        className={cx('input-bottom-comment-container')}
                        ref={inputCommentRef}
                        onKeyDown={handleKeyDown}
                    />
                    {contentComment.trim().length > 0 ? (
                        <div onClick={handleCreateContentComment} className={cx('post-bottom-comment-container-yes')}>
                            Post
                        </div>
                    ) : (
                        <div className={cx('post-bottom-comment-container-no')}>Post</div>
                    )}
                </div>
            ) : (
                <div onClick={handleModalLogin} className={cx('bottom-comment-container')}>
                    <span className={cx('login-to-comment')}>Log in to comment</span>
                </div>
            )}
        </div>
    );
}

export default BottomComment;
