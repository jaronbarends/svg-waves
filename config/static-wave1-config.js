// config for static wave

const fw = document.getElementById(`waves-frame`).clientWidth;// frame width

const staticWaveConfig = {
  id: 'wave-1',
  uid: 'green wave',
  start: {
    x: 100,
    y: 300,

    ctrl: {
      dx: 200,// distance to curve starting point
      dy: -250,
    },
  },
  end: {
    x: fw + 300,
    y: 500,

    ctrl: {
      dx: -300,
      dy: 100,
    },
  }
};

export default staticWaveConfig;