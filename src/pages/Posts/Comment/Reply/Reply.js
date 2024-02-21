import styles from './Reply.module.scss';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '~/components/ModalLogin/modalLoginSlice';
import { setShowPosts } from '../../postsSlice';
import io from 'socket.io-client';
import { listReplies } from '~/services/replyService';
import Item from './Item';
import { deleteReply } from './replySlice';

const cx = classNames.bind(styles);
const socket = io('http://localhost:8888/reply');
function Reply({ commentId }) {
    const [contentReply, setContentReply] = useState('');
    const [showContentReply, setShowContentReply] = useState(false);
    const [showListReply, setShowListReply] = useState(false);
    const [replies, setReplies] = useState([]);

    const user = useSelector((state) => state.user.data);
    const deleteReplyData = useSelector((state) => state.reply.deleteReply);
    const dispatch = useDispatch();

    const contentReplyRef = useRef(null);

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
    useEffect(() => {
        if (Object.keys(deleteReplyData).length > 0) {
            socket.emit('delete reply', { commentId: deleteReplyData.commentId, replyId: deleteReplyData.replyId });
            dispatch(deleteReply({}));
        }
    }, [deleteReplyData, dispatch]);

    useEffect(() => {
        socket.on('delete reply', (deleteReply) => {
            if (deleteReply.commentId === commentId) {
                setReplies((prev) => prev.filter((item) => item.replyId !== deleteReply.replyId));
            }
        });
    }, [commentId]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await listReplies(commentId);
            if (res.statusCode === 200) {
                setReplies(res.data);
            }
        };
        fetchApi();
    }, [commentId]);

    const handleShowContentReply = () => {
        showContentReply ? setShowContentReply(false) : setShowContentReply(true);
    };
    const handleShowListReply = () => {
        showListReply ? setShowListReply(false) : setShowListReply(true);
    };

    useEffect(() => {
        if (showContentReply) {
            contentReplyRef.current.focus();
        }
    }, [showContentReply]);

    //socketio
    useEffect(() => {
        socket.emit('user connection', commentId);
    }, [commentId]);

    const handleReply = () => {
        if (contentReply.trim().length > 0) {
            socket.emit('send content reply', { commentId, content: contentReply, userId: user._id });
            setContentReply('');
        }
    };

    useEffect(() => {
        socket.on('content reply', (replyContent) => {
            if (replyContent) {
                if (replyContent.commentId === commentId) {
                    const reply = [replyContent];
                    setReplies((prev) => {
                        if (prev) {
                            return [...reply, ...prev];
                        } else {
                            return [...reply];
                        }
                    });
                    setShowListReply(true);
                    setShowContentReply(false);
                }
            }
        });
    }, [commentId]);

    const handleClose = () => {
        setShowContentReply(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (contentReply.trim().length > 0) {
                handleReply();
            }
        }
    };

    return (
        <div className={cx('wrapper-reply')}>
            {userOnOff ? (
                <div onClick={handleShowContentReply} className={cx('reply')}>
                    Reply
                </div>
            ) : (
                <div onClick={handleModalLogin} className={cx('reply')}>
                    Reply
                </div>
            )}

            {showContentReply && (
                <div className={cx('content-reply-container')}>
                    <input
                        onKeyDown={handleKeyDown}
                        ref={contentReplyRef}
                        onChange={(e) => setContentReply(e.target.value)}
                        value={contentReply}
                        placeholder="Add a reply ..."
                        className={cx('content-reply')}
                    />
                    {contentReply.trim().length > 0 ? (
                        <div onClick={handleReply} className={cx('post-reply-yes')}>
                            Post
                        </div>
                    ) : (
                        <div className={cx('post-reply-no')}>Post</div>
                    )}
                    <div onClick={handleClose} className={cx('reply-icon-xmark')}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
            )}
            {showListReply ? (
                <div className={cx('list-reply-container')}>
                    <div className={cx('list-reply-content-container')}>
                        {replies.map((item, index) => (
                            <Item item={item} key={index} />
                        ))}
                    </div>
                    <div onClick={handleShowListReply} className={cx('reply-action-container')}>
                        hiden <FontAwesomeIcon icon={faAngleUp} />
                    </div>
                </div>
            ) : (
                replies.length > 0 && (
                    <div onClick={handleShowListReply} className={cx('reply-action-container')}>
                        View {replies.length} replys <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                )
            )}
        </div>
    );
}

export default Reply;
