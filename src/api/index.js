import axios from 'axios';
import routes from '../routes';

export default {
  channels: {
    async createChannel(data) {
      const response = await axios.post(routes.channelsPath(), data);
      return response;
    },
    async fetchChannels() {
      const response = await axios.get(routes.channelsPath());
      return response;
    },
    async updateChannel(data) {
      const { params: { id } } = data;
      const response = await axios.patch(routes.channelPath(id), data);
      return response;
    },
    async deleteChannel(data) {
      const { params: { id } } = data;
      const response = await axios.delete(routes.channelPath(id), data);
      return response;
    },
  },
  messages: {
    async createMessage(data) {
      const { params: { id } } = data;
      const response = await axios.post(routes.channelMessagesPath(id), data);
      return response;
    },
    async fetchMessages(data) {
      const { params: { id } } = data;
      const respose = await axios.get(routes.channelMessagesPath(id));
      return respose;
    },
  },
};
