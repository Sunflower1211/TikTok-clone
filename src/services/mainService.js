import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const home = async () => {
    try {
        const res = await httpRequest.get('home/foryou');
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const following = async () => {
    try {
        const res = await httpRequest.get('home/newsFeeds');
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const homeGuest = async () => {
    try {
        const res = await httpRequest.get('home/guest');
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
