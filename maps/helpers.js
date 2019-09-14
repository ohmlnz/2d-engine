import { colors, constants } from '../constants.js';
import { random } from '../helpers.js';

const randomColor = () => colors[Math.floor(random(colors.length - 1))];

export const randomLevel = () => {
  let properties = {};
  for (let i = 0, c = random(10); i < c; i++) {
    properties = {
      ...properties,
      [`block-${i}`]: {
        color: randomColor(),
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
  // Define default displacement
  if (!verticalDisplacement) {
    verticalDisplacement = (start[1] + end[1]) / 2;
  }

  const points = [start, end];
  let iteration = 1;

  while (iteration <= numOfIterations) {
    const points_copy = [...points];
    for (let i = 0; i < points_copy.length - 1; i++) {
      // Calculate midpoint based on following segment
      // [x_i+x_i+1 / 2, y_i+y_i+1 / 2]
      const midpoint = [
        (points_copy[i][0] + points_copy[i + 1][0]) / 2,
        (points_copy[i][1] + points_copy[i + 1][1]) / 2
      ];

      // Randomly displace positively or negatively (except for initial point)
      if (i === 0) {
        midpoint[1] += -verticalDisplacement;
      } else {
        midpoint[1] += [-verticalDisplacement, verticalDisplacement][
          Math.floor(Math.random() * (1 - 0 + 1)) + 0
        ];
      }
      // Insert new points and sort based on x value
      points.push(midpoint);
      points.sort((a, b) => a[0] - b[0]);
    }
    verticalDisplacement *= 2 ** -roughness;
    iteration++;
  }

  return points;
};

export const generateBackground = points => {
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.width = constants.width;
  canvas.height = constants.height;

  // Draw background
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    points.forEach(p => {
      ctx.beginPath();
      for (let i = 0; i < p.length; i++) {
        ctx.lineTo(p[i][0], p[i][1]);
      }
      ctx.fillStyle = randomColor();
      ctx.fill();
    });
  }

  // Return background image
  const dataUrl = canvas.toDataURL();
  let image = document.createElement('img');
  image.src = dataUrl;
  image.style.width = `${constants.width}px`;
  image.style.height = `${constants.height}px`;

  return image;
};

export const createSpriteSheetMapping = data => {
  const { frames, meta } = data;
  let spritesheet = {
    sheet: { image: meta.image, size: meta.size }
  };
  Object.keys(frames).forEach(e => {
    const current = meta.particles
      ? spritesheet[frames[e].type]
      : spritesheet[frames[e].type] && spritesheet[frames[e].type][frames[e].direction];
    const sprite = current ? [...current] : [];
    sprite.push(frames[e].frame);

    spritesheet = {
      ...spritesheet,
      ...(meta.particles
        ? { [frames[e].type]: sprite }
        : {
            [frames[e].type]: {
              ...spritesheet[frames[e].type],
              [frames[e].direction]: sprite
            }
          })
    };
  });
  return spritesheet;
};
