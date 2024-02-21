import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import Item from '~/components/Item';
import ModalLogin from '~/components/ModalLogin';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '~/components/ModalLogin/modalLoginSlice';
import Notification from '~/components/Popper/Notification';
import { setShowNotification } from '~/components/Popper/Notification/notificationSlice';
import { useEffect, useState } from 'react';
import { countNotify } from '~/services/notificationService';

const cx = classNames.bind(styles);

function Header() {
    const data = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feedback and help',
            to: '/feedback',
        },
        {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Keyboard shortcuts',
        },
    ];

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: `/profile/${data && data.account}`,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            separate: true,
        },
    ];

    //modal
    const handleModalLogin = () => {
        dispatch(setShow(true));
    };

    //notification
    const [countNotification, setCountNotification] = useState(0);
    const handleShowNotification = async () => {
        dispatch(setShowNotification(true));
        setCountNotification(0);
    };

    const handleUnShowNotification = async () => {
        dispatch(setShowNotification(false));
    };

    const showNotification = useSelector((state) => state.notification.show);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await countNotify();
            if (res.statusCode === 200) {
                setCountNotification(res.data);
            }
        };
        fetchApi();
    }, []);

    return (
        <header className={cx('wrapper')}>
            <ModalLogin />
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {data ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <Item to={config.routes.upload} icon={<UploadIcon />} activeIcon={<UploadIcon />} />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <Item
                                        to={config.routes.message}
                                        icon={<MessageIcon />}
                                        activeIcon={<MessageIcon />}
                                    />
                                </button>
                            </Tippy>
                            {showNotification ? (
                                <div>
                                    <Notification>
                                        <button
                                            onClick={handleUnShowNotification}
                                            className={cx('action-btn', 'notification')}
                                        >
                                            <InboxIcon />
                                        </button>
                                    </Notification>
                                </div>
                            ) : (
                                <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                    <button onClick={handleShowNotification} className={cx('action-btn')}>
                                        <InboxIcon />
                                        {countNotification > 0 && (
                                            <span className={cx('badge')}>{countNotification}</span>
                                        )}
                                    </button>
                                </Tippy>
                            )}
                        </>
                    ) : (
                        <>
                            <Button text onClick={handleModalLogin}>
                                Upload
                            </Button>
                            <Button primary to={'/login'}>
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu items={data ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {data ? (
                            <Image className={cx('user-avatar')} src={data.avatar} alt="Nguyen Van A" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
