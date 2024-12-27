import axiosConfig from './axiosConfig';
import { API_BASE_URL } from './config';
const PLANE_ENDPOINT = `${API_BASE_URL}/plane`;

const getPlaneById = async (id) => {
  try {
    const response = await axiosConfig.get(`${PLANE_ENDPOINT}/getPlane/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error('Network Error');
    }
  }
};

const updatePlaneById = async (id, updateBody) => {
  try {
    const response = await axiosConfig.patch(`${PLANE_ENDPOINT}/updatePlane/${id}`, updateBody);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error('Network Error');
    }
  }
};

const getAllPlane = async (/* role = 'user', sortBy = null, limit, page */) => {
  try {
    const response = await axiosConfig.get(`${PLANE_ENDPOINT}/getPlanes`/* , {
      params: {
        role,
        sortBy,
        limit,
        page,
      },
    } */);
    return response.data;
  } catch (error) {
      if (error.response) {
      throw error.response.data;
      }
    return error.message;
  }
}

const createPlane = async (requestBody) => {
  try {
    const response = await axiosConfig.post(`${PLANE_ENDPOINT}/createPlane`, requestBody);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    return error.message;
  }
}

const deletePlaneById = async (id) => {
  try {
    const response = await axiosConfig.delete(`${PLANE_ENDPOINT}/deletePlane/${id}`);
    return response.data; 
  } catch (error) {
    if (error.response) {
      throw error.response.data; 
    } else {
      throw new Error('lỗi xóa người dùng');
    }
  }
};


const PlaneService = {
  getPlaneById, 
  updatePlaneById,
  getAllPlane, 
  createPlane,
  deletePlaneById,
};

export default PlaneService;
