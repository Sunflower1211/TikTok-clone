import Item from './Item';
import classNames from 'classnames/bind';
import styles from './ChatList.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { listUserMessage } from '~/services/messageService';

const cx = classNames.bind(styles);

function ChatList() {
    const userReceiver = useSelector((state) => state.message.userReceiver);

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await listUserMessage();
            if (res.statusCode === 200) {
                setData(res.data);
            }
        };
        fetchApi();
    }, []);
    useEffect(() => {
        const test = [];
        if (data.length > 0) {
            data.forEach((element) => {
                test.push(element._id);
            });
        }
        // console.log(test.includes(userReceiver[0]._id));
        if (userReceiver.length > 0) {
            if (!test.includes(userReceiver[0]._id)) {
                setData((prev) => [...userReceiver, ...prev]);
            }
        }
    }, [userReceiver, data]);

    return (
        <div className={cx('chat')}>
            <div className={cx('header')}>Tin Nhắn</div>
            <div className={cx('chat-list')}>
                {data.length > 0 && data.map((result, index) => <Item key={index} data={result} />)}
            </div>
        </div>
    );
}

export default ChatList;
