import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const listComment = async (postsId) => {
    try {
        const res = await httpRequest.get(`/comment/listComment/${postsId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
