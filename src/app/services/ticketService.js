import axiosConfig from "./axiosConfig";
import { API_BASE_URL } from "./config";
const TICKET_ENDPOINT = `${API_BASE_URL}/ticket`;

const getTicketById = async (idTickets) => {
  try {
    const response = await axiosConfig.get(`${TICKET_ENDPOINT}/getTicketsById`, {
        params: {idTickets},
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error("Network Error");
    }
  }
};

const getTicketByStatus = async (status) => {
  try {
    const response = await axiosConfig.get(
      `${TICKET_ENDPOINT}/getTicketsByStatus`,
      {
        params: {
          status,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error("Network Error");
    }
  }
};

const createTicket = async (payload) => {
  try {
    const response = await axiosConfig.post(
      `${TICKET_ENDPOINT}/createTicket`,
      payload
    );
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const acceptBookedTicketById = async (ticketId) => {
  try {
    const response = await axiosConfig.patch(
      `${TICKET_ENDPOINT}/acceptBookedTicketById/${ticketId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error("Network Error");
    }
  }
};

const declineBookedTicketById = async (ticketId) => {
  try {
    const response = await axiosConfig.patch(
      `${TICKET_ENDPOINT}/declineBookedTicketById/${ticketId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error("Network Error");
    }
  }
};

const requestCancelTicketById = async (ticketId) => {
  try {
    const response = await axiosConfig.patch(
      `${TICKET_ENDPOINT}/requestCancelTicketById/${ticketId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error("Network Error");
    }
  }
};

const acceptRequestCancelTicketById = async (ticketId) => {
  try {
    const response = await axiosConfig.patch(
      `${TICKET_ENDPOINT}/acceptRequestCancelTicketById/${ticketId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw new Error("Network Error");
    }
  }
};

const TicketService = {
  getTicketById,
  getTicketByStatus,
  createTicket,
  acceptBookedTicketById,
  declineBookedTicketById,
  requestCancelTicketById,
  acceptRequestCancelTicketById,
};

export default TicketService;
