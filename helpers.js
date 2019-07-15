export function requestAnimFrame(r) {
  return (
    window.requestAnimationFrame(r) ||
    window.webkitRequestAnimationFrame(r) ||
    window.mozRequestAnimationFrame(r)
  );
}

/* Based on markE's answer: */
/* https://stackoverflow.com/a/19772220 */

export function setFps(fps, render) {
  let fpsInterval, now, then, elapsed;

  // initialize the timer variables and start the animation
  function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    animate();
  }

  function animate() {
    // request another frame
    requestAnimFrame(animate);

    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
      render();
    }
  }
  startAnimating(fps);
}

export function random(max, min = 0) {
  return Math.random() * (max - min) + min;
}
