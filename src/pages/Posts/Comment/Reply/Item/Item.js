import Image from '~/components/Image';
import styles from './Item.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReply } from '../replySlice';

const cx = classNames.bind(styles);

function Item({ item }) {
    //tippy edit
    const [isVisible, setIsVisible] = useState(false);
    const [showTippy, setShowTippy] = useState(false);
    const [checkUser, setCheckUser] = useState(false);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.data);

    useEffect(() => {
        if (user._id === item.userId) {
            setCheckUser(true);
        } else {
            setCheckUser(false);
        }
    }, [item, user]);

    const handleIsVisible = () => {
        isVisible ? setIsVisible(false) : setIsVisible(true);
    };

    const handleMouseEnter = () => {
        setShowTippy(true);
    };
    const handleMouseLeave = () => {
        setShowTippy(false);
        setIsVisible(false);
    };

    const handleDeleteComment = () => {
        dispatch(deleteReply({ replyId: item.replyId, commentId: item.commentId }));
        setShowTippy(false);
        setIsVisible(false);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cx('item-reply-content-container')}
        >
            <Image className={cx('avatar-reply')} src={item.avatar} />
            <div className={cx('content-container-reply')}>
                <div className={cx('nickname-reply')}>{item.nickname}</div>
                <span className={cx('reply-text-content')}>{item.content}</span>
            </div>
            {showTippy && (
                <Tippy
                    interactive
                    visible={isVisible}
                    placement="bottom-end"
                    render={(attrs) => (
                        <div className={cx('tippy-edit-reply')} tabIndex="-1" {...attrs}>
                            {checkUser ? (
                                <div onClick={handleDeleteComment} className={cx('delete-reply')}>
                                    Delete
                                </div>
                            ) : (
                                <div className={cx('delete-reply')}>report</div>
                            )}
                        </div>
                    )}
                >
                    <div onClick={handleIsVisible} className={cx('icon-ellipsis-reply')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </Tippy>
            )}
        </div>
    );
}

export default Item;
