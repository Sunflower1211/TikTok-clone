import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './VideoContent.module.scss';
import classNames from 'classnames/bind';
import { faPause, faPlay, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import useElementOnScreen from '../ElementOnScreen/useElementOnScreen';
import { useSelector, useDispatch } from 'react-redux';
import { volumeOn, volumeOff } from '../articleContentSlice';
import Item from './Item';
import { setShowPosts, insertDataPosts } from '~/pages/Posts/postsSlice';

const cx = classNames.bind(styles);

function VideoContent({ data }) {
    const baseUrl = process.env.REACT_APP_BASE_URL_VIDEO_AND_IMAGE;
    const url_video = `${baseUrl}${data.video}`;
    const videoRef = useRef(null);
    const dispatch = useDispatch();

    const handleVideo = () => {
        dispatch(setShowPosts(true));
        dispatch(insertDataPosts(data._id));
        dispatch(volumeOff());
    };

    // useEffect(() => {
    //     setPosts(data);
    // }, [show, data]);

    //xử lý bật tắt video
    const [playing, setPlaying] = useState(false);

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    };
    const isVisibile = useElementOnScreen(options, videoRef);

    const onVideoClick = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(!playing);
        } else {
            videoRef.current.play();
            setPlaying(!playing);
        }
    };

    const [pause, setPause] = useState(false);
    useEffect(() => {
        if (isVisibile) {
            if (!pause) {
                if (!playing) {
                    videoRef.current.play();
                    setPlaying(true);
                }
            } else {
                if (playing) {
                    videoRef.current.pause();
                    setPlaying(false);
                }
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisibile, playing, pause]);

    const handlePlayPause = (e) => {
        e.stopPropagation();
        pause ? setPause(false) : setPause(true);
    };

    //xử lý âm thanh
    const volume = useSelector((state) => state.articleContent.volume);
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);

    const handleVolumeOff = (e) => {
        e.stopPropagation();
        dispatch(volumeOff());
    };

    const handleVolumeOn = (e) => {
        e.stopPropagation();
        dispatch(volumeOn());
    };

    //hover video
    const [showSettingVideo, setShowSettingVideo] = useState(false);
    const handleShowSettingVideo = () => {
        setShowSettingVideo(true);
    };

    const handleUnShowSettingVideo = () => {
        setShowSettingVideo(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div onClick={handleVideo}>
                <div
                    onMouseEnter={handleShowSettingVideo}
                    onMouseLeave={handleUnShowSettingVideo}
                    className={cx('video')}
                >
                    <video loop preload="auto" ref={videoRef} onClick={onVideoClick} src={url_video} />
                    {showSettingVideo && (
                        <div>
                            <div className={cx('volume-on-off')}>
                                {volume > 0 ? (
                                    <div onClick={(e) => handleVolumeOff(e)} className={cx('wrapper-icon-edit-video')}>
                                        <FontAwesomeIcon className={cx('icon-edit-video')} icon={faVolumeHigh} />
                                    </div>
                                ) : (
                                    <div onClick={(e) => handleVolumeOn(e)} className={cx('wrapper-icon-edit-video')}>
                                        <FontAwesomeIcon className={cx('icon-edit-video')} icon={faVolumeXmark} />
                                    </div>
                                )}
                            </div>
                            <div className={cx('pause-play')} onClick={(e) => handlePlayPause(e)}>
                                {playing ? (
                                    <div className={cx('wrapper-icon-edit-video')}>
                                        <FontAwesomeIcon className={cx('icon-edit-video')} icon={faPause} />
                                    </div>
                                ) : (
                                    <div className={cx('wrapper-icon-edit-video')}>
                                        <FontAwesomeIcon className={cx('icon-edit-video')} icon={faPlay} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Item data={data} />
        </div>
    );
}

export default VideoContent;
