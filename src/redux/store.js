import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '~/layouts/components/Search/searchSlice';
import articleContentSlice from '~/components/ArticleContent/articleContentSlice';
import modalLoginSlice from '~/components/ModalLogin/modalLoginSlice';
import postsSlice from '~/pages/Posts/postsSlice';
import listFollowSlice from '~/pages/Profile/Info/ActionListFollow/ListFollow/listFollowSlice';
import editProfileSlice from '~/pages/Profile/Info/EditProfile/editProfileSlice';
import commentSlice from '~/pages/Posts/Comment/commentSlice';
import userSlice from '~/components/User/userSlice';
import notificationSlice from '~/components/Popper/Notification/notificationSlice';
import messageSlice from '~/pages/Message/messageSlice';
import replySlice from '~/pages/Posts/Comment/Reply/replySlice';
import modalLogoutSlice from '~/components/ModalLogout/modalLogoutSlice';

export const store = configureStore({
    reducer: {
        search: searchSlice,
        articleContent: articleContentSlice,
        modalLogin: modalLoginSlice,
        posts: postsSlice,
        listFollow: listFollowSlice,
        editProfile: editProfileSlice,
        comment: commentSlice,
        user: userSlice,
        notification: notificationSlice,
        message: messageSlice,
        reply: replySlice,
        modalLogout: modalLogoutSlice,
    },
});
