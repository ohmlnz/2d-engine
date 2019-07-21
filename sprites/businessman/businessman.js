// Data extracted as JSON-TP-Hash
// Adding type property to each sprite and
// changing the image associated to the metadata

import businessman from './businessman.png';
let image = new Image();
image.src = businessman;

export const spriteData = {
  frames: {
    sprite1: {
      frame: { x: 0, y: 0, w: 32, h: 32 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      type: 'walking'
    },
    sprite2: {
      frame: { x: 32, y: 0, w: 32, h: 32 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      type: 'idle'
    },
    sprite3: {
      frame: { x: 64, y: 0, w: 32, h: 32 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      type: 'walking'
    },
    sprite9: {
      frame: { x: 0, y: 64, w: 32, h: 32 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      type: 'jumping'
    },
    sprite10: {
      frame: { x: 32, y: 64, w: 32, h: 32 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      type: 'jumping'
    },
    sprite11: {
      frame: { x: 64, y: 64, w: 32, h: 32 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      type: 'landing'
    },
    sprite12: {
      frame: { x: 96, y: 64, w: 32, h: 32 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      type: 'landing'
    }
  },
  meta: {
    image: image,
    size: { w: 128, h: 128 },
    scale: 1
  }
};
