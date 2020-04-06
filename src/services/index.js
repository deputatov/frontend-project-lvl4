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
};
