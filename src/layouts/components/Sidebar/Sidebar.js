import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Button from '~/components/Button';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    UserIcon,
    UserActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';
import Item from '~/components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '~/components/ModalLogin/modalLoginSlice';

const cx = classNames.bind(styles);

function Sidebar() {
    const data = useSelector((state) => state.user.data);
    const profile_url = `/profile/${data && data.account}`;
    const dispatch = useDispatch();
    const handleModalLogin = () => {
        dispatch(setShow(true));
    };
    return (
        <aside className={cx('wrapper')}>
            {data ? (
                <nav>
                    <Item title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                    <Item
                        title="Following"
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                    />
                    <Item title="Profile" to={profile_url} icon={<UserIcon />} activeIcon={<UserActiveIcon />} />
                </nav>
            ) : (
                <nav>
                    <Item title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                    <div onClick={handleModalLogin} className={cx('wrapper-item')}>
                        <span className={cx('icon')}>
                            <UserGroupIcon />
                        </span>
                        <span className={cx('title')}>Following</span>
                    </div>
                    <div onClick={handleModalLogin} className={cx('wrapper-item')}>
                        <span className={cx('icon')}>
                            <UserIcon />
                        </span>
                        <span className={cx('title')}>Profile</span>
                    </div>
                </nav>
            )}
            <>
                {data ? (
                    data.following.length > 0 ? (
                        <SuggestedAccounts label="Following accounts" />
                    ) : (
                        <div className={cx('login-navbar')}>
                            <p className={cx('text-navbar')}>Follow the people you love</p>
                        </div>
                    )
                ) : (
                    <div className={cx('login-navbar')}>
                        <p className={cx('text-navbar')}>Log in to follow authors, like videos and see comments.</p>
                        <div className={cx('div-button')}>
                            <Button outline to={'/login'} className={cx('button-login-navbar')}>
                                Log in
                            </Button>
                        </div>
                    </div>
                )}
            </>
        </aside>
    );
}

export default Sidebar;
