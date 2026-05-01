import axios from 'axios';
import type { GetMyConversationResponseBody, SendMessageRequestBody } from '../interface/message';
import { API_URL } from './constant';

export const MessageService = {

  async getMessages() {
    try {
      const response = await axios.get(
        `${API_URL}/messages`,
        {
          //headers
        },
      );
      return response.data;

    } catch (error) {
      console.error("Failed to fetch messages", error);
      throw error
    }
  },

  async getUserMessages(userId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/messages/${userId}`,
        {
          //headers
        },
      );
      return response.data;

    } catch (error) {
      console.error("Failed to fetch user messages", error);
      throw error
    }
  },

  async sendMessages(userId: string) {
    try {
      const response = await axios.post(
        `${API_URL}/messages/${userId}`,
        {
          //headers
        },
      );
      return response.data;

    } catch (error) {
      console.error("Failed to send messages", error);
      throw error
    }
  },



}
