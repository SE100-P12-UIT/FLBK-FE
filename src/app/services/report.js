import axiosConfig from './axiosConfig';
import { API_BASE_URL } from './config';
const REPORT_ENDPOINT = `${API_BASE_URL}/admin/generateFlightReport`;

const generateFlightReport = async (startDate, endDate) => {
    try {
        const response = await axiosConfig.get(`${REPORT_ENDPOINT}`, {
            params: {
                startDate,
                endDate,
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

const ReportService = {
    generateFlightReport
};

export default ReportService;
