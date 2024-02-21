import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const listMessage = async (receiverId) => {
    try {
        const res = await httpRequest.get(`/message/listMessage/${receiverId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const listUserMessage = async () => {
    try {
        const res = await httpRequest.get(`/message/listUserMessage`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
