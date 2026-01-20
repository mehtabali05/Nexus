import { api } from './api';

const MessageService = {
  getChatHistory: async (partnerId: string) => {
    const response = await api.get(`/messages/${partnerId}`);
    return response.data;
  },
  
  sendNewMessage: async (receiverId: string, content: string) => {
    const response = await api.post('/messages', { receiverId, content });
    return response.data;
  }
};

export default MessageService;