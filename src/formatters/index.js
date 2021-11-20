import stylish from './stylish.js';
import plain from './plain.js';

const styling = (diff, style) => {
  switch (style.format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      return diff;
  }
};

export default styling;
