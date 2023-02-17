import waveConfigs from './wave-config.js';
import { WavesGraph } from './WavesGraph.js';
import { SvgWave } from './SvgWaveView.js';
import { SvgControlPoints } from './SvgControlPointsView.js';
import { AnimatedWaveModel } from './AnimatedWaveModel.js';

let wave1Model;
let wave2Model;

const initAnimatedWaveModels = () => {
  const wave1Config = waveConfigs[0];
  const wave2Config = waveConfigs[1];

  wave1Model = new AnimatedWaveModel(wave1Config);
  wave2Model = new AnimatedWaveModel(wave2Config);

  // wave1Model.tick();
  // wave2Model.tick();

  return [wave1Model, wave2Model];
};

const initSvgWaves = () => {
  const wave1Path = document.getElementById(`wave-1`);
  const wave1AsClipPath = document.getElementById(`wave-1-as-clip-path`);
  const wave2Path = document.getElementById(`wave-2`);

  new SvgWave(wave1Path, wave1Model);
  new SvgWave(wave1AsClipPath, wave1Model);
  new SvgWave(wave2Path, wave2Model);
}

const initControlPointsViews = () => {
  const template = document.getElementById(`wave-controls-template`);
  const svg = document.getElementById(`waves-svg`);
  new SvgControlPoints(template, svg, wave1Model);
  new SvgControlPoints(template, svg, wave2Model);
}

const initConfigView = () => {}

const initBak = () => {
  initAnimatedWaveModels();
  initSvgWaves();
  initControlPointsViews();
  initConfigView();
};

const init = () => {
  const waveModels = initAnimatedWaveModels();
  const wavesGraph = new WavesGraph(waveModels);

  console.log('wavesGraph.models:', wavesGraph.waveModels);
  // const wavesGraph.start();
  // initSvgWaves();
  // initControlPointsViews();
  // initConfigView();
};

init();