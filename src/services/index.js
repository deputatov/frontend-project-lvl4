import axios from 'axios';
import io from 'socket.io-client';
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
    async deleteChannel(data) {
      const response = await axios.delete(routes.channelPath(data));
      return response;
    },
  },
  messages: {
    async createMessage(data) {
      const { params: { channelId } } = data;
      const response = await axios.post(routes.channelMessagesPath(channelId), data);
      return response;
    },
    async fetchMessages(data) {
      const { params: { channelId } } = data;
      const respose = await axios.get(routes.channelMessagesPath(channelId));
      return respose;
    },
  },
};
