import { colors } from '../constants.js';
import { random } from '../helpers.js';

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

export const displacePoints = (
  start,
  end,
  roughness,
  verticalDisplacement = null,
  numOfIterations = 16
) => {
  if (!verticalDisplacement) {
    verticalDisplacement = (start[1] + end[1]) / 2;
  }

  const points = [start, end];
  let iteration = 1;

  while (iteration <= numOfIterations) {
    const points_copy = [...points];
    for (let i = 0; i < points_copy.length - 1; i++) {
      const midpoint = [
        (points_copy[i][0] + points_copy[i + 1][0]) / 2,
        (points_copy[i][1] + points_copy[i + 1][1]) / 2
      ];
      midpoint[1] += [-verticalDisplacement, verticalDisplacement][
        Math.floor(Math.random() * (1 - 0 + 1)) + 0
      ];
      points.push(midpoint);
      points.sort((a, b) => a[0] - b[0]);
    }
    verticalDisplacement *= 2 ** -roughness;
    iteration++;
  }

  return points;
};
