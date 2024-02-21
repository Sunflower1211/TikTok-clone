import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const listReplies = async (commentId) => {
    try {
        const res = await httpRequest.get(`/reply/listReplies/${commentId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
