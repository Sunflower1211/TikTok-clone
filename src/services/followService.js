import * as httpRequest from '~/utils/httpRequest';
import { errorAxios } from './errorService';

export const listFollowing = async (userId) => {
    try {
        const res = await httpRequest.get(`/follow/listFollowing/${userId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const listFollower = async (userId) => {
    try {
        const res = await httpRequest.get(`/follow/listFollower/${userId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const insertFollow = async (userFollowId) => {
    try {
        const res = await httpRequest.post(`/follow/insertFollow/${userFollowId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};

export const deleteFollow = async (userFollowId) => {
    try {
        const res = await httpRequest.deleted(`/follow/deleteFollow/${userFollowId}`);
        return res.data;
    } catch (error) {
        return errorAxios(error);
    }
};
