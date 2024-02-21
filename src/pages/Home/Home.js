import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import ArticleContent from '~/components/ArticleContent';
import { useEffect, useState, useRef } from 'react';
import { home, homeGuest } from '~/services/mainService';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Home() {
    const [data, setData] = useState([]);
    const [isBottom, setIsBottom] = useState(true);

    const contentRef = useRef(null);

    const user = useSelector((state) => state.user.data);

    useEffect(() => {
        function handleScroll() {
            const element = contentRef.current;
            if (element) {
                // Tính toán chiều cao của nội dung
                const scrollTop = element.scrollTop;
                const scrollHeight = element.scrollHeight;
                const clientHeight = element.clientHeight;
                const isBottom = scrollTop + clientHeight >= scrollHeight - 1000;
                setIsBottom(isBottom);
            }
        }
        const element = contentRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
        };
    }, [contentRef]);

    useEffect(() => {
        if (user) {
            if (isBottom) {
                const fetchApi = async () => {
                    const res = await home();
                    if (res.statusCode === 200) {
                        setIsBottom(false);
                        setData((prev) => [...prev, ...res.data]);
                    }
                };
                fetchApi();
            }
        } else {
            if (isBottom) {
                const fetchApi = async () => {
                    const res = await homeGuest();
                    if (res.statusCode === 200) {
                        setData((prev) => [...prev, ...res.data]);
                    }
                };
                fetchApi();
            }
        }
    }, [user, isBottom]);
    return (
        <div>
            {user ? (
                <div ref={contentRef} className={cx('wrapper')}>
                    {data.length > 0 && data.map((item, index) => <ArticleContent key={index} data={item} />)}
                </div>
            ) : (
                <div ref={contentRef} className={cx('wrapper')}>
                    {data.length > 0 && data.map((item, index) => <ArticleContent key={index} data={item} />)}
                </div>
            )}
        </div>
    );
}

export default Home;
