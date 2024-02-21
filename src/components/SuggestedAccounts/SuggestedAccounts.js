import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { listFollowing } from '~/services/followService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const user = useSelector((state) => state.user.data);

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await listFollowing(user._id);
            setData(res.data);
        };
        fetchApi();
    }, [user]);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.map((item) => (
                <AccountItem key={item._id} data={item} />
            ))}

            {/* <p className={cx('more-btn')}>See more</p> */}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
