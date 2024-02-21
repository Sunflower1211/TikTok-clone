import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const login = async (email, password) => {
    try {
        const res = await httpRequest.post('account/login', {
            email,
            password,
        });
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const user = async () => {
    try {
        const res = await httpRequest.get('/user/listPostOfUser');
        return res;
    } catch (error) {
        return errorAxios(error);
    }
};
