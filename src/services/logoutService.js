import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const logout = async () => {
    try {
        const res = await httpRequest.get('account/logout');
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
