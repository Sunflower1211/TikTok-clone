import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const searchLessAccount = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('search/searchAccount', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const searchMoreAccount = async (q, type = 'more') => {
    try {
        const res = await httpRequest.get('search/searchAccount', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
