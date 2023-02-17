const svgBox = document.getElementById(`svg-box`);
// const curve = document.getElementById(`curve`);
const runCb = document.getElementById(`run-cb`);
const showCtrlCb = document.getElementById(`show-ctrl-cb`);

const start = {
  // curve coordinates
  x: 100,
  y: 200,
  ctrl: {
    // coordinates of controlpoint
    x: 200,
    y: 200,
    angle: 0,
    center: {
      dx: 100,
      dy: -100,
    },
    r: 50,
  },
}

const end = {
  // curve coordinates
  x: 500,
  y: 200,
  ctrl: {
    // coordinates of controlpoint
    x: 400,
    y: 200,
    angle: 0,
    center: {
      dx: -100,
      dy: 50,
    },
    r: 30,
  },
}

let tickTimer;
const timeoutDuration = 50;

let ctrlDisplay = 0;

let isRunning = runCb.checked;

const updateSvg = () => {
  const ctrl1Str = `${start.ctrl.x} ${start.ctrl.y}`;
  const ctrl2Str = `${end.ctrl.x} ${end.ctrl.y}`;
  const curveStartStr = `${start.x} ${start.y}`;
  const curveEndStr = `${end.x} ${end.y}`;
  const closingStr = `L ${end.x} 400 L ${start.x} 400 Z`

  // NOTE: path strings need "extra" set of quotes
  let startCtrlPath = `'M ${curveStartStr} L ${ctrl1Str}'`;
  let endCtrlPath = `'M ${curveEndStr} L ${ctrl2Str}'`;
  let curvePath = `'M ${curveStartStr} C ${ctrl1Str}, ${ctrl2Str}, ${curveEndStr} ${closingStr}'`;

  const props = {
    '--ctrl-1-path': startCtrlPath,
    '--ctrl-2-path': endCtrlPath,
    '--ctrl-1-x': start.ctrl.x,
    '--ctrl-1-y': start.ctrl.y,
    '--ctrl-2-x': end.ctrl.x,
    '--ctrl-2-y': end.ctrl.y,
    '--curve-path': curvePath,
    '--ctrl-display': ctrlDisplay,
  }

  for (let prop in props) {
    const value = props[prop];
    svgBox.style.setProperty(prop, value);
  }
  
}

const setCtrlDisplay = () => {
  ctrlDisplay = showCtrlCb.checked ? 'block' : 'none';
}

const toRadians = deg => 2 * Math.PI * deg / 360;

const updateControlPoint = startOrEnd => {
  const ctrl = startOrEnd.ctrl;
  ctrl.angle += 5;
  const rad = toRadians(ctrl.angle);
  ctrl.x = startOrEnd.x + ctrl.center.dx + Math.cos(rad) * ctrl.r;
  ctrl.y = startOrEnd.y + ctrl.center.dy + Math.sin(rad) * ctrl.r;
}

const tick = () => {
  clearTimeout(tickTimer);
  if (isRunning) {
    tickTimer = setTimeout(tick, timeoutDuration);
  }
  updateControlPoint(start);
  updateControlPoint(end);

  updateSvg();
}

const init = () => {
  runCb.addEventListener('change', () => {
    isRunning = runCb.checked;
    if (isRunning) {
      tick();
    }
  });
  showCtrlCb.addEventListener('change', setCtrlDisplay);
  setCtrlDisplay();

  tick();
}

init();