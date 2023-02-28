// config for static wave

const fw = document.getElementById(`waves-frame`).clientWidth;// frame width

const staticWaveConfig = {
  id: 'wave-2',
  uid: 'blue wave',
  start: {
    x: 100,
    y: 450,

    ctrl: {
      dx: 400,
      dy: 100,
    },
  },
  end: {
    x: fw + 300,
    y: 200,

    ctrl: {
      dx: -300,
      dy: -100,
    },
  }
};

export default staticWaveConfig;