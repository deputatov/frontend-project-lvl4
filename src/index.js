import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import run from './init.jsx';

run();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
