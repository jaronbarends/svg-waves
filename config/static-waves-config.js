import staticWave1Config from './static-wave1-config.js';
import staticWave2Config from './static-wave2-config.js';

// set bezier control point coordinates using its d relative to wave-point
const setCtrlPointByDelta = (config) => {
  config.ctrl.x = config.x + config.ctrl.dx;
  config.ctrl.y = config.y + config.ctrl.dy;
}

setCtrlPointByDelta(staticWave1Config.start);
setCtrlPointByDelta(staticWave1Config.end);
setCtrlPointByDelta(staticWave2Config.start);
setCtrlPointByDelta(staticWave2Config.end);

const staticWaveConfigs = [staticWave1Config, staticWave2Config];

export default staticWaveConfigs;