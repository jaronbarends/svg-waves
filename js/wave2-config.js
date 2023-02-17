const fw = document.getElementById(`waves-frame`).clientWidth;// frame width

const waveConfig = {
  // id: 'wave-2',
  start: {
    // starting point of curve orbits around this point
    center: {
      x: 120,
      y: 450,
    },
    r: 30,
    angle: 0,// starting angle
    angleIncrement: 0.85,
    orbitXScale: 0.85,
    orbitYScale: 1,

    ctrl: {
      // starting control point of curve orbits around this point
      center: {
        x: 100,// distance to curve center point
        y: 0,
      },
      r: 70,
      angle: 120,// starting angle
      angleIncrement: 0.85,
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
    r: 30,
    angle: 0,// starting angle
    angleIncrement: 0.85,
    orbitXScale: 0.2,
    orbitYScale: 0.2,

    ctrl: {
      // ending control point of curve orbits around this point
      center: {
        x: -200,
        y: 0,
      },
      r: 50,
      angle: 300,// starting angle
      angleIncrement: 0.85,
      orbitXScale: 1,
      orbitYScale: 2,
    },
  }
};

export default waveConfig;