import stylish from './stylish.js';
import plain from './plain.js';
import makeJson from './json.js';

const styling = (diff, style) => {
  switch (style.format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return makeJson(diff);
    default:
      return 'Wrong format';
  }
};

export default styling;
