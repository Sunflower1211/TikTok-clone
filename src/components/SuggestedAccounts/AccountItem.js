import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './SuggestedAccounts.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <div className={cx('wrapper-account')}>
            <Link to={`/profile/${data.account}`}>
                <div className={cx('account-item')}>
                    <Image className={cx('avatar')} src={data.avatar} alt="" />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.account}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{data.nickname}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
