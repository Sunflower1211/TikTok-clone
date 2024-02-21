import classNames from 'classnames/bind';
import styles from './ChatList.module.scss';
import Image from '~/components/Image';
import { useDispatch, useSelector } from 'react-redux';
import { createUserReceiver } from '../messageSlice';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Item({ data }) {
    const dispatch = useDispatch();
    const [checkUser, setCheckUser] = useState(false);

    const userReceiver = useSelector((state) => state.message.userReceiver);
    const handleChooseUserMessage = () => {
        dispatch(createUserReceiver(data));
    };
    useEffect(() => {
        if (userReceiver.length > 0) {
            if (userReceiver[0]._id === data._id) {
                setCheckUser(true);
            } else {
                setCheckUser(false);
            }
        }
    }, [userReceiver, data]);

    return (
        <div onClick={handleChooseUserMessage} className={cx('item', checkUser && 'user-receiver')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
            <div className={cx('info')}>
                <h4 className={cx('user-name')}>{data.nickname}</h4>
                <h4 className={cx('name')}>{data.account}</h4>
            </div>
        </div>
    );
}

export default Item;
