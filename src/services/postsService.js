import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const insertPosts = async (content, video) => {
    try {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('video', video);
        const res = await httpRequest.post('posts/insertPosts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const infoPost = async (postsId) => {
    try {
        const res = await httpRequest.get(`posts/infoPosts/${postsId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const deletePosts = async (postsId) => {
    try {
        const res = await httpRequest.deleted(`posts/deletePosts/${postsId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
