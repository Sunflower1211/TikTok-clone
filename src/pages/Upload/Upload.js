import styles from './Upload.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { insertPosts } from '~/services/postsService';
import { ToastContainer, toast } from 'react-toastify';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Upload() {
    //
    const [video, setVideo] = useState();
    const [playing, setPlaying] = useState(true);
    const [volume, setVolume] = useState(0);
    const [content, setContent] = useState('');

    useEffect(() => {
        return () => {
            video && URL.revokeObjectURL(video.preview);
        };
    }, [video]);

    const handlePreviewvideo = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setVideo(file);
    };

    const handlePlayPause = () => {
        playing ? setPlaying(false) : setPlaying(true);
    };

    // const handleChangeVolume = (event) => {
    //     setVolume(parseFloat(event.target.value));
    // };

    const handleVolume = () => {
        volume === 0 ? setVolume(0.5) : setVolume(0);
    };
    const handleUpload = () => {
        const fetchApi = async () => {
            const res = await insertPosts(content, video);
            if (res.statusCode === 201) {
                toast.success(res.message);
                setContent('');
                setVideo();
            } else {
                toast.error(res.message);
            }
        };
        fetchApi();
    };
    const playerRef = useRef();

    const handleVideoEnded = () => {
        playerRef.current.seekTo(0);
        setPlaying(true);
    };

    const handleCancel = () => {
        setVideo();
        setVolume(0);
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            {video ? (
                <div className={cx('content-yes-video')}>
                    <div className={cx('header-content-upload-video')}>
                        <div className={cx('title-header')}>Upload video</div>
                        <span className={cx('span-title-header')}>Post a video to your account</span>
                    </div>
                    <div className={cx('body-content-upload-video')}>
                        <div className={cx('caption-upload-video')}>
                            <div>Caption</div>
                            <textarea
                                className={cx('input-content-video')}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows="4" // Số dòng
                                cols="50"
                            />
                            <div className={cx('footer-content-video')}>
                                <Button onClick={handleCancel} rounded>
                                    Cancel
                                </Button>
                                <Button onClick={handleUpload} primary>
                                    Upload
                                </Button>
                            </div>
                        </div>
                        <div className={cx('video-upload')}>
                            <div className={cx('video-ReactPlayer')}>
                                <ReactPlayer
                                    ref={playerRef}
                                    onEnded={handleVideoEnded}
                                    volume={volume}
                                    playing={playing}
                                    url={video.preview}
                                    width="100%"
                                    height="100%"
                                    style={{ borderRadius: '10px' }}
                                />
                            </div>

                            {/* <input
                                className={cx('volume')}
                                type="range"
                                min={0}
                                max={1}
                                step={0.1}
                                value={volume}
                                onChange={handleChangeVolume}
                            /> */}
                            <button className={cx('volume-on-off')} onClick={handleVolume}>
                                {volume > 0 ? (
                                    <FontAwesomeIcon className={cx('icon')} icon={faVolumeHigh} />
                                ) : (
                                    <FontAwesomeIcon className={cx('icon')} icon={faVolumeXmark} />
                                )}
                            </button>
                            <button className={cx('pause-play')} onClick={handlePlayPause}>
                                {playing ? (
                                    <FontAwesomeIcon className={cx('icon')} icon={faPause} />
                                ) : (
                                    <FontAwesomeIcon className={cx('icon')} icon={faPlay} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('content')}>
                    <label htmlFor="fileInput" className={cx('custom-file-input')}>
                        <span className={cx('span-header')}>Seclect video to upload</span>
                        <div className={cx('span-body')}>
                            <span>Seclect video to upload</span>
                            <span>Up to 10 minutes</span>
                            <span>Less than 10 GB</span>
                        </div>
                        <div className={cx('button')}>Seclect file</div>
                    </label>
                    <input id="fileInput" type="file" onChange={handlePreviewvideo} />
                </div>
            )}
        </div>
    );
}

export default Upload;
