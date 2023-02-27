import waveConfigs from './wave-config.js';
import { SvgWave } from './SvgWaveView.js';
import { SvgControlPoints } from './SvgControlPointsView.js';
import { AnimatableWaveModel } from './AnimatableWaveModel.js';
import { WavesConfigurator } from './WavesConfigurator.js';

let wave1Model;
let wave2Model;

const initAnimatableWaveModels = () => {
  const wave1config = waveConfigs[0];
  const wave2config = waveConfigs[1];

  wave1Model = new AnimatableWaveModel(wave1config);
  wave2Model = new AnimatableWaveModel(wave2config);

  wave1Model.tick();
  wave2Model.tick();
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

const initWavesConfigurator = () => {
  const models = [wave1Model, wave2Model];
  new WavesConfigurator(models);
}

const init = () => {
  initAnimatableWaveModels();
  initSvgWaves();
  initControlPointsViews();
  initWavesConfigurator();
};

init();