import Cookies from 'js-cookie';
import { name } from 'faker';

const getName = () => {
  const currentName = Cookies.get('name');
  if (currentName) {
    return currentName;
  }
  const newName = name.findName();
  Cookies.set('name', newName);
  return newName;
};

export default getName;
