import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const infoUser = async () => {
    try {
        const res = await httpRequest.get('user/infoUser');
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
