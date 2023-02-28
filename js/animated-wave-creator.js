import animatedWaveConfigs from '../config/animated-waves-config.js';
import { SvgWave } from './SvgWaveView.js';
import { SvgControlPoints } from './SvgControlPointsView.js';
import { AnimatableWaveModel } from './AnimatableWaveModel.js';
import { WavesConfigurator } from './WavesConfigurator.js';
import { CircularMotionController } from './CircularMotionController.js';

let wave1Model;
let wave2Model;

const initAnimatableWaveModels = () => {
  const animatedWave1Config = animatedWaveConfigs[0];
  const animatedWave2Config = animatedWaveConfigs[1];

  wave1Model = new AnimatableWaveModel(animatedWave1Config);
  wave2Model = new AnimatableWaveModel(animatedWave2Config);
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

  const circularMotionController = new CircularMotionController();
  circularMotionController.addModel(wave1Model);
  circularMotionController.addModel(wave2Model);
  circularMotionController.tick();
};

init();