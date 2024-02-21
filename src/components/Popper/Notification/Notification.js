import Tippy from '@tippyjs/react';
import styles from './Notification.module.scss';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listAllNotify } from '~/services/notificationService';
import { createData, setType } from './notificationSlice';
import { setShowNotification } from './notificationSlice';

const cx = classNames.bind(styles);

function Notification({ children }) {
    const { type, data, show } = useSelector((state) => state.notification);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await listAllNotify(type);
            if (res.statusCode === 200) {
                dispatch(createData(res.data));
            }
        };
        fetchApi();
    }, [type, dispatch]);
    const handleSetTypeNotification = (type) => {
        dispatch(setType(type));
    };

    const renderResult = (attrs) => (
        <div className={cx('notification')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('notification-popper')}>
                <div className={cx('notification-header')}>Notifications</div>
                <div className={cx('notification-action')}>
                    <div
                        onClick={() => handleSetTypeNotification('listAllNotify')}
                        className={cx('button-group-item', type === 'listAllNotify' || 'not')}
                    >
                        All activity
                    </div>
                    <div
                        onClick={() => handleSetTypeNotification('listNotifyPosts')}
                        className={cx('button-group-item', type === 'listNotifyPosts' || 'not')}
                    >
                        Posts
                    </div>
                    <div
                        onClick={() => handleSetTypeNotification('listNotifyComment')}
                        className={cx('button-group-item', type === 'listNotifyComment' || 'not')}
                    >
                        Comments
                    </div>
                    <div
                        onClick={() => handleSetTypeNotification('listNotifyFollower')}
                        className={cx('button-group-item', type === 'listNotifyFollower' || 'not')}
                    >
                        Followers
                    </div>
                </div>
                <div className={cx('notification-content-container')}>
                    {data.length > 0 && data.map((item, index) => <Item key={index} data={item} />)}
                </div>
            </PopperWrapper>
        </div>
    );

    const handleCloseNotification = () => {
        dispatch(setShowNotification(false));
    };

    return (
        <Tippy
            interactive
            visible={show}
            placement="bottom-end"
            render={renderResult}
            onClickOutside={handleCloseNotification}
        >
            {children}
        </Tippy>
    );
}

export default Notification;
