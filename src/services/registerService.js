import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const register = async (email, password, account, nickName, checked) => {
    try {
        const res = await httpRequest.post('account/register', {
            account,
            password,
            email,
            nickname: nickName,
            sex: checked,
        });
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const verifyRegister = async (email, otp) => {
    try {
        const res = await httpRequest.post(`account/verifyRegister/${email}`, {
            otp,
        });
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
