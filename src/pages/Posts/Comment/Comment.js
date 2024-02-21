import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import CommentContent from './CommentContent';
import { listComment } from '~/services/commentService';
import { useEffect, useState } from 'react';
import BottomComment from './BottomComment';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { createContentComment, deleteComment } from './commentSlice';

const cx = classNames.bind(styles);
const socket = io('http://localhost:8888/comment');
function Comment({ postsId }) {
    const [data, setData] = useState([]);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.data);

    const { contentComment, deleteCommentId } = useSelector((state) => state.comment);

    //socketio
    useEffect(() => {
        if (deleteCommentId) {
            socket.emit('delete-comment', { commentId: deleteCommentId, postsId });
            dispatch(deleteComment(''));
        }
    }, [deleteCommentId, postsId, dispatch]);

    useEffect(() => {
        socket.on('delete-comment', ({ commentId }) => {
            setData((prev) => prev.filter((item) => item._id !== commentId));
        });
    }, []);

    useEffect(() => {
        socket.emit('user connection', postsId);
    }, [postsId]);

    useEffect(() => {
        if (contentComment) {
            socket.emit('send-content-comment', { userId: user._id, postsId, contentComment });
            dispatch(createContentComment(''));
        }
    }, [contentComment, user, postsId, dispatch]);

    useEffect(() => {
        socket.on('content comment', (comment) => {
            if (comment) {
                const data = [comment];
                setData((prev) => {
                    if (prev) {
                        return [...data, ...prev];
                    } else {
                        return [...data];
                    }
                });
            }
        });
    }, []);

    //
    useEffect(() => {
        if (postsId) {
            const fetchApi = async () => {
                const res = await listComment(postsId);
                if (res.statusCode) {
                    setData(res.data);
                }
            };
            fetchApi();
        }
    }, [postsId]);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className={cx('wrapper-comment')}>
                <div className={cx('header-comment')}>Comments</div>
                <div className={cx('body-comment')}>
                    {data.length > 0 && data.map((item, index) => <CommentContent key={index} data={item} />)}
                </div>
                <BottomComment />
            </div>
        );
    }
}

export default Comment;
