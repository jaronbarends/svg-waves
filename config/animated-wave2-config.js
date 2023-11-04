// config for animated wave controlled by circular motion

const fw = document.getElementById(`waves-frame`).clientWidth;// frame width

const animatedWaveConfig = {
  id: 'wave-2',
  uid: 'blue wave',
  start: {
    // starting point of curve orbits around this point
    center: {
      x: 120,
      y: 400,
    },
    r:60,
    angle: 0,// starting angle
    angleIncrement: 3,
    orbitXScale: 1,
    orbitYScale: 1,

    ctrl: {
      // starting control point of curve orbits around this point
      center: {
        x: 100,// distance to curve center point
        y: 0,
      },
      r: 40,
      angle: 120,// starting angle
      angleIncrement: 2,
      orbitXScale: 1,
      orbitYScale: 2,
    },
  },
  end: {
    // starting point of curve orbits around this point
    center: {
      x: fw + 300,
      y: 100,
    },
    r: 60,
    angle: 0,// starting angle
    angleIncrement: 2,
    orbitXScale: 1,
    orbitYScale: 1,

    ctrl: {
      // ending control point of curve orbits around this point
      center: {
        x: -200,
        y: 0,
      },
      r: 90,
      angle: 300,// starting angle
      angleIncrement: 3,
      orbitXScale: 1,
      orbitYScale: 1,
    },
  }
};

export default animatedWaveConfig;