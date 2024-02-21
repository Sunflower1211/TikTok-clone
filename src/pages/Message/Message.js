import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import ChatList from './ChatList';
import Texting from './Texting';

import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Message() {
    const userReceiver = useSelector((state) => state.message.userReceiver);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <ChatList />
                {userReceiver.length > 0 && <Texting userReceiver={userReceiver[0]} />}
            </div>
        </div>
    );
}

export default Message;
