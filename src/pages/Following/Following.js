import styles from './Follwing.module.scss';
import classNames from 'classnames/bind';
import ArticleContent from '~/components/ArticleContent';
import { useEffect, useState, useRef } from 'react';
import { following } from '~/services/mainService';

const cx = classNames.bind(styles);

function Home() {
    const [data, setData] = useState([]);
    const [isBottom, setIsBottom] = useState(true);

    const contentRef = useRef(null);

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
        if (isBottom) {
            const fetchApi = async () => {
                const res = await following();
                if (res.statusCode === 200) {
                    setData((prev) => [...prev, ...res.data]);
                    setIsBottom(false);
                }
            };
            fetchApi();
        }
    }, [isBottom]);

    return (
        <div ref={contentRef} className={cx('wrapper')}>
            {data.map((item, index) => (
                <ArticleContent key={index} data={item} />
            ))}
        </div>
    );
}

export default Home;
