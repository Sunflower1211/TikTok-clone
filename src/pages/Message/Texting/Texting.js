import classNames from 'classnames/bind';
import styles from './Texting.module.scss';
import Image from '~/components/Image';
import { useEffect, useRef, useState } from 'react';
import { MessageIcon } from '~/components/Icons';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { listMessage } from '~/services/messageService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const socket = io('http://localhost:8888/messagePrivate');
function Texting({ userReceiver }) {
    const userSender = useSelector((state) => state.user.data);
    const [mesage, setMessage] = useState('');
    const [listmessages, setListMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        socket.emit('user connection', userSender._id);
    }, [userSender]);

    const handleSendMessage = () => {
        socket.emit('chat message', { senderId: userSender._id, receiverId: userReceiver._id, content: mesage.trim() });

        setMessage('');
    };
    useEffect(() => {
        socket.on('chat message', ({ content, senderId }) => {
            const userSender = [{ content, senderId }];
            setListMessages((prev) => [...prev, ...userSender]);
        });
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await listMessage(userReceiver._id);
            if (res.statusCode === 200) {
                setListMessages(res.data);
            }
        };
        fetchApi();
    }, [userReceiver]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [listmessages]);

    //
    const handleMovePage = () => {
        navigate(`/profile/${userReceiver.account}`);
    };

    return (
        <div className={cx('texting')}>
            <div className={cx('header-texting')}>
                <Image onClick={handleMovePage} className={cx('avatar-texting')} src={userReceiver.avatar} />
                <div onClick={handleMovePage} className={cx('name-texting')}>
                    <div className={cx('texting-nickname')}>{userReceiver.nickname}</div>
                    <div className={cx('texting-uniqueid')}>{userReceiver.account}</div>
                </div>
            </div>
            <div className={cx('content-container-texting')}>
                {listmessages.length > 0 &&
                    listmessages.map((item, index) =>
                        item.senderId === userSender._id ? (
                            <div key={index} className={cx('item-sender-mesage')}>
                                <div className={cx('content-sender-message')}>{item.content}</div>
                            </div>
                        ) : (
                            <div key={index} className={cx('item-receiver-mesage')}>
                                <Image
                                    className={cx('avatar-receiver-mesage')}
                                    src={'images/avatar-1707142915964.jpg'}
                                />
                                <div className={cx('content-receiver-message')}>{item.content}</div>
                            </div>
                        ),
                    )}
                <div ref={messagesEndRef} />
            </div>
            <div className={cx('texting-bottom')}>
                <input
                    value={mesage}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cx('message-input')}
                    placeholder="Send a mesage ..."
                />
                {mesage.trim().length > 0 && (
                    <div onClick={handleSendMessage}>
                        <MessageIcon className={cx('send-message')} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Texting;
