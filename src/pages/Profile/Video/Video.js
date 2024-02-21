import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setShowPosts, insertDataPosts } from '~/pages/Posts/postsSlice';

const cx = classNames.bind(styles);
function Video({ data }) {
    const dispatch = useDispatch();

    let content;
    const baseUrl = process.env.REACT_APP_BASE_URL_VIDEO_AND_IMAGE;
    if (data) {
        if (data.content.length > 25) {
            const text = data.content.slice(0, 23);
            content = text + ' ...';
        }
    }
    const [video, setVideo] = useState('');
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (data) {
            const video_url = `${baseUrl}${data.video}`;
            setVideo(video_url);
        }
    }, [data, baseUrl]);

    const handleMouseEnter = (e) => {
        setPlaying(true);
    };

    const handleMouseLeave = (e) => {
        setPlaying(false);
    };

    const playerRef = useRef();

    const handleVideo = () => {
        dispatch(setShowPosts(true));
        dispatch(insertDataPosts(data._id));
    };

    return (
        <div className={cx('wrapper-video')}>
            <div onClick={handleVideo} className={cx('video')}>
                <ReactPlayer
                    volume={0}
                    ref={playerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    loop={true}
                    url={video}
                    playing={playing}
                    width="100%"
                    height="100%"
                />
            </div>
            <span className={cx('video-content')}>{content ? content : data.content}</span>
        </div>
    );
}

export default Video;
