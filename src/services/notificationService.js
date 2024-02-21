import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const listAllNotify = async (typeNotify) => {
    try {
        const res = await httpRequest.get(`notify/${typeNotify}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const countNotify = async () => {
    try {
        const res = await httpRequest.get('notify/countUnreadNotify');
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
