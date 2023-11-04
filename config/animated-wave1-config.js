// config for animated wave controlled by circular motion

const fw = document.getElementById(`waves-frame`).clientWidth;// frame width

const animatedWaveConfig = {
  id: 'wave-1',
  uid: 'green wave',
  start: {
    // starting point of curve orbits around this point
    // todo: rename to orbitCenter?
    center: {
      x: 160,
      y: 160,
    },
    r: 30,
    angle: 0,// starting angle
    angleIncrement: 3,
    orbitXScale: 1,
    orbitYScale: 1,

    ctrl: {
      // starting control point of curve orbits around this point
      center: {
        x: 100,// distance to curve center point
        y: -80,
      },
      r: 75,
      angle: 0,// starting angle
      angleIncrement: 4,
      orbitXScale: 1,
      orbitYScale: 1,
    },
  },
  end: {
    // starting point of curve orbits around this point
    center: {
      x: fw + 300,
      y: 400,
    },
    r: 30,
    angle: 180,// starting angle
    angleIncrement: 4,
    orbitXScale: 1,
    orbitYScale: 1,

    ctrl: {
      // ending control point of curve orbits around this point
      center: {
        x: -100,
        y: 0,
      },
      r: 70,
      angle: 0,// starting angle
      angleIncrement: 3,
      orbitXScale: 1,
      orbitYScale: 1,
    },
  }
};

export default animatedWaveConfig;