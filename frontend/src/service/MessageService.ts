import type {
  GetMyConversationResponseBody,
  GetMyConversationsResponseBody,
  SendMessageRequestBody,
} from '../interface/message';
import { api } from './axiosInstance';

export const MessageService = {
  async getMessages(): Promise<GetMyConversationsResponseBody> {
    try {
      const response = await api.get<GetMyConversationsResponseBody>('/api/messages');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch messages', error);
      throw error;
    }
  },

  async getUserMessages(userId: string): Promise<GetMyConversationResponseBody> {
    try {
      const response = await api.get<GetMyConversationResponseBody>(`/api/messages/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user messages', error);
      throw error;
    }
  },

  async sendMessages(userId: string, body: SendMessageRequestBody) {
    try {
      const response = await api.post(`/api/messages/${userId}`, body);
      return response.data;
    } catch (error) {
      console.error('Failed to send messages', error);
      throw error;
    }
  },
};
