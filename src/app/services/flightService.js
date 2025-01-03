import axiosConfig from './axiosConfig';
import { API_BASE_URL } from './config';
const USER_ENDPOINT = `${API_BASE_URL}/flight`;



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

const getFilteredFlight = async (departureAirport, arrivalAirport, departureTime, airline) => {
    try {
      // Chỉ giữ lại các trường có giá trị
      const params = {};
      if (departureAirport) params.departureAirport = departureAirport;
      if (arrivalAirport) params.arrivalAirport = arrivalAirport;
      if (departureTime) params.departureTime = departureTime;
      if (airline) params.airline = airline;
  
      const response = await axiosConfig.post(`${USER_ENDPOINT}/getPlanes`, {
        params,
      });
  
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      return error.message;
    }
  };


const FlightService = {
    getFilteredFlight,
    updateFlightById,
    getAllFlights,
    createFlight,
    deleteFlightById,
};

export default FlightService;
