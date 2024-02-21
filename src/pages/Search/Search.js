import AccountItem from '~/components/AccountItem';
// import { useSelector } from 'react-redux';
import { searchMoreAccount } from '~/services/searchService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search() {
    let query = '';
    let q = '';
    const queryParams = new URLSearchParams(window.location.search);
    query = queryParams.get('q');
    q = useSelector((state) => state.search.q);

    const [data, setData] = useState([]);
    useEffect(() => {
        if (query) {
            const fetchApi = async () => {
                const res = await searchMoreAccount(query);
                setData(res);
            };
            fetchApi();
        }
    }, [query]);
    useEffect(() => {
        if (!query && !q) {
            setData([]);
        }
    }, [query, q]);
    useEffect(() => {
        if (q) {
            const fetchApi = async () => {
                const res = await searchMoreAccount(q);
                setData(res);
            };
            fetchApi();
        }
    }, [q]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        if (data.length < 1) {
            return (
                <div className={cx('wrapper-error')}>
                    <div className={cx('icon-error')}>
                        <FontAwesomeIcon icon={faFaceFrown} />
                    </div>
                    <span className={cx('header-error')}>There are no accounts matching the search results</span>
                </div>
            );
        }

        return (
            <div>
                {data.map((result) => (
                    <AccountItem key={result._id} data={result} />
                ))}
            </div>
        );
    }
}

export default Search;
