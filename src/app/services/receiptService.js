import axiosConfig from './axiosConfig';
import { API_BASE_URL } from './config';
const RECEIPT_ENDPOINT = `${API_BASE_URL}/receipt`;

const getReceiptsByUserId = async (userId) => {
    try {
        const response = await axiosConfig.get(`${RECEIPT_ENDPOINT}/getReceiptsByUserId/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.status;
      } else {
        throw new Error('Network Error');
      }
    }
};
  
const ReceiptService = {
    getReceiptsByUserId
};

export default ReceiptService;