import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { useState, useEffect, useLayoutEffect } from 'react';
import images from '~/assets/images';
import ModalLogin from '~/components/ModalLogin';
import Posts from '~/pages/Posts';
import { useSelector } from 'react-redux';
import * as userService from '~/services/userService';
import { useDispatch } from 'react-redux';
import { setDataUser } from '~/components/User/userSlice';
import ModalLogout from '~/components/ModalLogout';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const dispatch = useDispatch();

    const postsId = useSelector((state) => state.posts.dataPosts);

    useLayoutEffect(() => {
        const fetchApi = async () => {
            const result = await userService.infoUser();
            result.statusCode === 200 && dispatch(setDataUser(result.data));
        };
        fetchApi();
    }, [dispatch]);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    if (!loading) {
        return (
            <header className={cx('wrapper-loading')}>
                <div className={cx('inner')}>
                    <div className={cx('logo-link')}>
                        <img src={images.logo} alt="Tiktok" />
                    </div>
                </div>
            </header>
        );
    }

    if (loading) {
        return (
            <div className={cx('wrapper')}>
                <ModalLogin />
                <ModalLogout />
                {postsId !== '' && <Posts postsId={postsId} />}
                <Header />
                <div className={cx('container')}>
                    <Sidebar />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        );
    }
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
