import stylish from './stylish.js';
import plain from './plain.js';
import makeJson from './json.js';

const styling = (diff, style) => {
  switch (style) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return makeJson(diff);
    default:
      throw new Error('Wrong format. Use: stylish, plain or json.');
  }
};

export default styling;
