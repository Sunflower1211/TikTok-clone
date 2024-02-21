import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const profile = async (accountId) => {
    try {
        const res = await httpRequest.get(`user/profile/${accountId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const editProfile = async ({ avatar, account, nickname }) => {
    try {
        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('account', account);
        formData.append('nickname', nickname);
        const res = await httpRequest.put('user/editProfile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
