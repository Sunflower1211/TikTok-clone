import Header from '~/layouts/components/Header';
import styles from './HeaderOnly.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useLayoutEffect } from 'react';
import images from '~/assets/images';
import ModalLogin from '~/components/ModalLogin';
import Posts from '~/pages/Posts';
import { useSelector, useDispatch } from 'react-redux';
import * as userService from '~/services/userService';
import { setDataUser } from '~/components/User/userSlice';
import ModalLogout from '~/components/ModalLogout';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    const [loading, setLoading] = useState(false);
    const posts = useSelector((state) => state.posts.dataPosts);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const fetchApi = async () => {
            const result = await userService.infoUser();
            result.statusCode === 200 && dispatch(setDataUser(result.data));
        };
        fetchApi();
    }, [dispatch]);

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
                {Object.keys(posts).length > 0 && <Posts data={posts} />}
                <Header />
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        );
    }
}

export default HeaderOnly;
