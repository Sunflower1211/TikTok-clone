import styles from './Posts.module.scss';
import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVolumeHigh, faVolumeXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import Profile from './Profile';
import Comment from './Comment';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDataPosts, setShowPosts } from './postsSlice';
import { volumeOn } from '~/components/ArticleContent/articleContentSlice';
import { infoPost } from '~/services/postsService';

const cx = classNames.bind(styles);
function Posts({ postsId }) {
    const baseUrl = process.env.REACT_APP_BASE_URL_VIDEO_AND_IMAGE;
    const playerRef = useRef();
    const [urlVideo, setUrlVideo] = useState('');

    const dispatch = useDispatch();

    const show = useSelector((state) => state.posts.show);

    const handleExit = (e) => {
        e.stopPropagation();
        dispatch(setShowPosts(false));
        dispatch(deleteDataPosts());
        dispatch(volumeOn());
    };
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const res = await infoPost(postsId);
            if (res.statusCode === 200) {
                setData(res.data);
            }
        };
        fetchApi();
    }, [postsId]);

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const url = `${baseUrl}${data.video}`;
            setUrlVideo(url);
        }
    }, [data, baseUrl]);

    //bật tắt video
    const [playing, setPlaying] = useState(true);
    const handlePlayPause = () => {
        playing ? setPlaying(false) : setPlaying(true);
    };

    //nút space
    const handleKeyDown = (event) => {
        if (event.key === ' ') {
            playing ? setPlaying(false) : setPlaying(true);
        }
    };

    //âm thanh
    const [volume, setVolume] = useState(0.5);
    const handleChangeVolume = (e) => {
        setVolume(parseFloat(e.target.value));
    };
    const handleChangeVolumeDiv = (e) => {
        e.stopPropagation();
    };

    const handleVolume = (e) => {
        e.stopPropagation();
        volume === 0 ? setVolume(0.5) : setVolume(0);
    };

    //setmodal
    const customStyles = {
        overlay: {
            zIndex: 2000,
            background: 'none rgba(84, 84, 84, 0.20)',
        },
        content: {
            width: '100%',
            height: '100%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <Modal isOpen={show} style={customStyles}>
                <div className={cx('wrapper')}>
                    <div
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                        onClick={handlePlayPause}
                        className={cx('video-container')}
                    >
                        <ReactPlayer
                            className={cx('video')}
                            url={urlVideo}
                            width="100%"
                            height="100%"
                            ref={playerRef}
                            loop={true}
                            volume={volume}
                            playing={playing}
                        />
                        <div style={{ background: 'white' }} onClick={handleChangeVolumeDiv}>
                            <input
                                className={cx('volume')}
                                type="range"
                                min={0}
                                max={1}
                                step={0.1}
                                value={volume}
                                onChange={(e) => handleChangeVolume(e)}
                            />
                        </div>

                        <button className={cx('volume-on-off')} onClick={(e) => handleVolume(e)}>
                            {volume > 0 ? (
                                <FontAwesomeIcon className={cx('icon')} icon={faVolumeHigh} />
                            ) : (
                                <FontAwesomeIcon className={cx('icon')} icon={faVolumeXmark} />
                            )}
                        </button>
                        <button onClick={(e) => handleExit(e)} className={cx('button-xmark')}>
                            <FontAwesomeIcon icon={faXmark} className={cx('icon')} />
                        </button>

                        {!playing && (
                            <button className={cx('button-play')}>
                                <FontAwesomeIcon icon={faPlay} className={cx('icon-play')} />
                            </button>
                        )}
                    </div>
                    <div className={cx('content-container')}>
                        <Profile data={data} />
                        <Comment postsId={data._id} />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default Posts;
