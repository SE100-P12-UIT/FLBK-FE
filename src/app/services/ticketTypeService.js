import axiosConfig from './axiosConfig';
import { API_BASE_URL } from './config';
const TICKETTYPE_ENDPOINT = `${API_BASE_URL}/ticketType`;

const getTicketTypeById = async (ticketTypeId) => {
  try {
    const response = await axiosConfig.get(`${TICKETTYPE_ENDPOINT}/getTicketType/${ticketTypeId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error('Network Error');
    }
  }
};

const getTicketTypeByName = async (ticketTypeName) => {
    try {
      const response = await axiosConfig.get(`${TICKETTYPE_ENDPOINT}/getTicketTypeByName/${ticketTypeName}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.status;
      } else {
        throw new Error('Network Error');
      }
    }
  };
  


const updateTicketTypeById = async (ticketTypeId, updateBody) => {
  try {
    const response = await axiosConfig.patch(`${TICKETTYPE_ENDPOINT}/updateTicketType/${ticketTypeId}`, updateBody);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error('Network Error');
    }
  }
};
const getTicketTypes = async () => {
  try {
    const response = await axiosConfig.get(`${TICKETTYPE_ENDPOINT}/getTicketTypes`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
}

const createTicketType = async (ticketType) => {
  try {
    const response = await axiosConfig.post(`${TICKETTYPE_ENDPOINT}/createTicketType`, ticketType);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
}

const deleteTicketTypeById = async (ticketTypeId) => {
  try {
    const response = await axiosConfig.delete(`${TICKETTYPE_ENDPOINT}/deleteTicketType/${ticketTypeId}`);
    return response.data; // Trả về kết quả từ API nếu cần
  } catch (error) {
    if (error.response) {
      throw error.response.data; // Trả về lỗi từ API
    } else {
      throw new Error('lỗi xóa người dùng');
    }
  }
};


const TicketTypeService = {
    getTicketTypeById,
    getTicketTypeByName,
    createTicketType,
    getTicketTypes,
    updateTicketTypeById,
  deleteTicketTypeById
};

export default TicketTypeService;
