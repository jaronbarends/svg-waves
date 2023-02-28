import staticWave1Config from './static-wave1-config.js';
import staticWave2Config from './static-wave2-config.js';

const setPointByDelta = (config) => {
  config.ctrl.x = config.x + config.ctrl.dx;
  config.ctrl.y = config.y + config.ctrl.dy;
}

setPointByDelta(staticWave1Config.start);
setPointByDelta(staticWave1Config.end);
setPointByDelta(staticWave2Config.start);
setPointByDelta(staticWave2Config.end);

const staticWaveConfigs = [staticWave1Config, staticWave2Config];

export default staticWaveConfigs;