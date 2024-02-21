import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { searchLessAccount } from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.scss';
import { searchAccount } from './searchSlice';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function Search() {
    const queryParams = new URLSearchParams(window.location.search);
    const q = queryParams.get('q');
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    let history = useNavigate();

    const dispatch = useDispatch();

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (q) {
            setSearchValue(q);
        }
    }, [q]);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchLessAccount(debouncedValue);

            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleSearch = () => {
        if (searchValue.trim()) {
            dispatch(searchAccount(searchValue));
            setShowResult(false);
            history(`/search?q=${searchValue}&type=more`);
        } else {
            if (q) {
                setSearchValue(q);
            }
            setShowResult(false);
        }
    };

    //xử lý nút enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.blur();
            handleSearch();
        }
    };

    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result._id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onClick={handleSearch}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
