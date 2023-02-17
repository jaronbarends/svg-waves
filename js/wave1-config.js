const fw = document.getElementById(`waves-frame`).clientWidth;// frame width

const waveConfig = {
  // id: 'wave-1',
  start: {
    // starting point of curve orbits around this point
    // todo: rename to orbitCenter?
    center: {
      x: 100,
      y: 200,
    },
    r: 30,
    angle: 0,// starting angle
    angleIncrement: 0.7,
    orbitXScale: 0.5,
    orbitYScale: 1,

    ctrl: {
      // starting control point of curve orbits around this point
      center: {
        x: 100,// distance to curve center point
        y: -100,
      },
      r: 50,
      angle: 0,// starting angle
      angleIncrement: 0.7,
      orbitXScale: 2,
      orbitYScale: 1,
    },
  },
  end: {
    // starting point of curve orbits around this point
    center: {
      x: fw + 300,
      y: 500,
    },
    r: 30,
    angle: 180,// starting angle
    angleIncrement: 0.7,
    orbitXScale: 0.5,
    orbitYScale: 0.5,

    ctrl: {
      // ending control point of curve orbits around this point
      center: {
        x: -100,
        y: 0,
      },
      r: 70,
      angle: 0,// starting angle
      angleIncrement: 0.7,
      orbitXScale: 1,
      orbitYScale: 2,
    },
  }
};

export default waveConfig;