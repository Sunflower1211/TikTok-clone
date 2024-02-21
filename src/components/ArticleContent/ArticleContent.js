import VideoContent from './VideoContent';
import VideoInfo from './VideoInfo';
import styles from './ArticleContent.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ArticleContent({ data }) {
    return (
        <div className={cx('wrapper')}>
            <VideoInfo data={data} />
            <VideoContent data={data} />
        </div>
    );
}

export default ArticleContent;
