import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn, onClick }) {
    const showNotification = useSelector((state) => state.notification.show);

    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    useEffect(() => {
        setHistory([{ data: items }]);
    }, [items]);

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            {showNotification || (
                <PopperWrapper className={cx('menu-popper')}>
                    {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                    <div className={cx('menu-body')}>{renderItems()}</div>
                </PopperWrapper>
            )}
        </div>
    );

    // Reset to first page
    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            interactive
            delay={[0, 500]}
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={renderResult}
            onHide={handleReset}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
