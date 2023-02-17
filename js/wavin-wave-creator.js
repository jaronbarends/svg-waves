import waveConfigs from './wave-config.js';
import { SvgWave } from './SvgWaveView.js';
import { SvgControlPoints } from './SvgControlPointsView.js';
import { AnimatedWaveModel } from './AnimatedWaveModel.js';
import { WaveConfigurator } from './WaveConfigurator.js';

let wave1model;
let wave2model;

const initAnimatedWaveModels = () => {
  const wave1config = waveConfigs[0];
  const wave2config = waveConfigs[1];

  wave1model = new AnimatedWaveModel(wave1config);
  wave2model = new AnimatedWaveModel(wave2config);

  wave1model.tick();
  wave2model.tick();
};

const initSvgWaves = () => {
  const wave1path = document.getElementById(`wave-1`);
  const wave1asClipPath = document.getElementById(`wave-1-as-clip-path`);
  const wave2path = document.getElementById(`wave-2`);

  new SvgWave(wave1path, wave1model);
  new SvgWave(wave1asClipPath, wave1model);
  new SvgWave(wave2path, wave2model);
}

const initControlPointsViews = () => {
  const template = document.getElementById(`wave-controls-template`);
  const svg = document.getElementById(`waves-svg`);
  new SvgControlPoints(template, svg, wave1model);
  new SvgControlPoints(template, svg, wave2model);
}

const initWavesConfiguratorView = () => {
  const template = document.getElementById('settings-template');
  const configuratorElm = document.getElementById(`waves-configurator`);
  const wave1Configurator = new WaveConfigurator(wave1model, configuratorElm);
}

const init = () => {
  initAnimatedWaveModels();
  initSvgWaves();
  initControlPointsViews();
  initWavesConfiguratorView();
};

init();