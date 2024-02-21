import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const insertEmotion = async (postsId) => {
    try {
        const res = await httpRequest.post(`/emotions/insertEmotions/${postsId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const deleteEmotion = async (postsId) => {
    try {
        const res = await httpRequest.deleted(`/emotions/deleteEmotions/${postsId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
