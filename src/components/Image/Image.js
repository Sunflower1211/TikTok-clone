import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, url, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const baseUrl = process.env.REACT_APP_BASE_URL_VIDEO_AND_IMAGE;
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    const avatar_url = `${baseUrl}${src}`;

    if (!url) {
        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallback || avatar_url}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    } else {
        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={url}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    }
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
