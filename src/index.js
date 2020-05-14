import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import app from './app';

app();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
