import Modal from 'react-modal';
import { setShowEditProfile } from './editProfileSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from './EditProfile.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useState, useLayoutEffect, useEffect } from 'react';
import * as userService from '~/services/userService';
import { editProfile } from '~/services/profileService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Editprofile() {
    const customStyles = {
        overlay: {
            background: 'none rgba(84, 84, 84, 0.20)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '650px',
            height: '700px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: 'white',
        },
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const show = useSelector((state) => state.editProfile.show);
    const handleClose = () => {
        setNameEdit(data.nickname);
        setUserNameEdit(data.account);
        setEditAvatar();
        dispatch(setShowEditProfile(false));
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await userService.infoUser();
            result.statusCode === 200 && setData(result.data);
        };
        fetchApi();
    }, []);

    const [statusEdit, setStatusEdit] = useState(false);
    const [userName, setUserName] = useState();
    const [name, setName] = useState();
    const [userNameEdit, setUserNameEdit] = useState();
    const [nameEdit, setNameEdit] = useState();
    const [avatar, setAvatar] = useState();
    const [editAvatar, setEditAvatar] = useState();

    useEffect(() => {
        setName(data.nickname);
        setUserName(data.account);
        setNameEdit(data.nickname);
        setUserNameEdit(data.account);
        setAvatar(data.avatar);
    }, [data]);
    useEffect(() => {
        return () => {
            editAvatar && URL.revokeObjectURL(editAvatar.preview);
        };
    }, [editAvatar]);

    useLayoutEffect(() => {
        if (editAvatar) {
            setStatusEdit(true);
        } else if (userName !== userNameEdit || name !== nameEdit) {
            setStatusEdit(true);
        } else {
            setStatusEdit(false);
        }
    }, [userName, userNameEdit, name, nameEdit, editAvatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setEditAvatar(file);
    };

    const handleSaveEdit = () => {
        const fetchApi = async () => {
            await editProfile({ account: userNameEdit, nickname: nameEdit, avatar: editAvatar ? editAvatar : avatar });
            handleClose();
            navigate(`/profile/${userNameEdit}`);
            window.location.reload();
        };
        fetchApi();
    };

    return (
        <Modal isOpen={show} style={customStyles}>
            <div className={cx('wrapper-edit-profile')}>
                <div className={cx('header')}>
                    <span className={cx('span-header')}>Edit Profile</span>
                    <FontAwesomeIcon onClick={handleClose} className={cx('close')} icon={faXmark} />
                </div>
                <div className={cx('content-container')}>
                    <div className={cx('item-content-container')}>
                        <div className={cx('edit-profile-label')}>Avatar</div>

                        <div className={cx('edit-profile-avatar')}>
                            <label htmlFor="fileInput" className={cx('custom-file-input')}>
                                {editAvatar ? (
                                    <Image className={cx('profile-avatar')} url={editAvatar.preview} />
                                ) : (
                                    <Image className={cx('profile-avatar')} src={avatar} />
                                )}
                            </label>

                            <input id="fileInput" type="file" onChange={(e) => handlePreviewAvatar(e)} />
                        </div>
                    </div>
                    <div className={cx('item-content-container')}>
                        <div className={cx('edit-profile-label')}>Username</div>
                        <div className={cx('edit-profile-username-input')}>
                            <input
                                value={userNameEdit}
                                onChange={(e) => setUserNameEdit(e.target.value)}
                                className={cx('input-text')}
                                placeholder="Username"
                            />
                            <span className={cx('span-edit-profile-username')}>
                                Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                username will also change your profile link.
                            </span>
                        </div>
                    </div>
                    <div className={cx('item-content-container')}>
                        <div className={cx('edit-profile-label')}>Username</div>
                        <div className={cx('edit-profile-username-input')}>
                            <input
                                value={nameEdit}
                                onChange={(e) => setNameEdit(e.target.value)}
                                className={cx('input-text')}
                                placeholder="Name"
                            />
                            <span className={cx('span-edit-profile-username')}>
                                Your nickname can only be changed once every 7 days.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('footer-container')}>
                    <Button onClick={handleClose} rounded>
                        Cancel
                    </Button>
                    {statusEdit ? (
                        <Button onClick={handleSaveEdit} primary>
                            Save
                        </Button>
                    ) : (
                        <Button disabled>Save</Button>
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default Editprofile;
