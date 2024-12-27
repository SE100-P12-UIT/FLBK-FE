import axiosConfig from './axiosConfig';
import { API_BASE_URL } from './config';
const USER_ENDPOINT = `${API_BASE_URL}/flight`;

const getFlightById = async (id) => {
    try {
        const response = await axiosConfig.get(`${USER_ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.status;
        } else {
            throw new Error('Network Error');
        }
    }
};


const updateFlightById = async (id, updateBody) => {
    try {
        const response = await axiosConfig.patch(`${USER_ENDPOINT}/${id}`, updateBody);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.status;
        } else {
            throw new Error('Network Error');
        }
    }
};
const getAllFlights = async (planeid, sortBy, limit, page) => {
    try {
        const response = await axiosConfig.get(`${USER_ENDPOINT}`, {
            params: {
                planeid,
                sortBy,
                limit,
                page,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        return error.message;
    }
}

const createFlight = async (flight) => {
    try {
        const response = await axiosConfig.post(`${USER_ENDPOINT}`, flight);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return error.message;
    }
}

const deleteFlightById = async (id) => {
    try {
        const response = await axiosConfig.delete(`${USER_ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.status;
        } else {
            throw new Error('Lỗi xóa chuyến bay');
        }
    }
};


const FlightService = {
    getFlightById,
    updateFlightById,
    getAllFlights,
    createFlight,
    deleteFlightById,
};

export default FlightService;
