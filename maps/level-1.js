import { colors } from '../constants.js';
import { random } from '../helpers.js';

export const levelOne = {
  'block-1': {
    color: 'red',
    dimensions: [200, 200, 50, 50]
  },
  'block-2': {
    color: 'blue',
    dimensions: [400, 200, 150, 50]
  },
  'block-3': {
    color: 'purple',
    dimensions: [900, 200, 50, 50]
  },
  'block-4': {
    color: 'purple',
    dimensions: [1200, 130, 250, 120]
  }
};

export const randomLevel = () => {
  let properties = {};
  for (let i = 0, c = random(10); i < c; i++) {
    properties = {
      ...properties,
      [`block-${i}`]: {
        color: colors[Math.floor(random(colors.length - 1))],
        dimensions: [random(1500, 100), 250, random(100, 50), random(-10, -50)]
      }
    };
  }
  return properties;
};
