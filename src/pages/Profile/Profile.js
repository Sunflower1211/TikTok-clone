import { useParams } from 'react-router-dom';
import Info from './Info';
import Video from './Video';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { profile } from '~/services/profileService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ListFollow from './Info/ActionListFollow/ListFollow';
import { useSelector } from 'react-redux';
import Editprofile from './Info/EditProfile/EditProfile';

const cx = classNames.bind(styles);
function Profile() {
    const { nickname } = useParams();
    const [data, setData] = useState();
    const [posts, setPosts] = useState([]);

    const listFollow = useSelector((state) => state.listFollow.data);
    const typeListFollow = useSelector((state) => state.listFollow.type);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await profile(nickname);
            if (result.statusCode === 200) {
                setData(result.data);
                setPosts(result.data.posts);
            }
        };
        fetchApi();
    }, [nickname]);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);
    if (loading) {
        if (!data) {
            return (
                <div className={cx('wrapper-error')}>
                    <div className={cx('icon-error')}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <span className={cx('header-error')}>Couldn't find this account</span>

                    <span className={cx('body-error')}>
                        Looking for videos? Try browsing our trending creators, hashtags, and sounds.
                    </span>
                </div>
            );
        }

        return (
            <div className={cx('wrapper')}>
                <Editprofile data={data.profile} />
                <ListFollow userId={data.profile._id} data={listFollow} type={typeListFollow} />
                <Info data={data.profile} />
                <div className={cx('list-video')}>
                    {posts.map((item) => (
                        <Video key={item._id} data={item} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Profile;
