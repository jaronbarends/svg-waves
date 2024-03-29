import staticWaveConfigs from '../config/static-waves-config.js';
import { SvgWave } from './SvgWaveView.js';
import { AnimatableWaveModel } from './AnimatableWaveModel.js';
import { StaticWaveConfigurator } from './StaticWaveConfigurator.js';

let wave1Model;
let wave2Model;

const initAnimatableWaveModels = () => {
  const staticWave1Config = staticWaveConfigs[0];
  const staticWave2Config = staticWaveConfigs[1];

  wave1Model = new AnimatableWaveModel(staticWave1Config);
  wave2Model = new AnimatableWaveModel(staticWave2Config);
};

const initSvgWaves = () => {
  const wave1Path = document.getElementById(`wave-1`);
  const wave1AsClipPath = document.getElementById(`wave-1-as-clip-path`);
  const wave2Path = document.getElementById(`wave-2`);

  new SvgWave(wave1Path, wave1Model);
  new SvgWave(wave1AsClipPath, wave1Model);
  new SvgWave(wave2Path, wave2Model);
}


const init = () => {
  initAnimatableWaveModels();
  initSvgWaves();

  // update models for first render
  wave1Model.updateModel();
  wave2Model.updateModel();

  const wavesFrame = document.getElementById(`waves-frame`);
  const wavesSvg = document.getElementById(`waves-svg`);
  new StaticWaveConfigurator(wave1Model, wavesFrame, wavesSvg);
  // new StaticWaveConfigurator(wave2Model, wavesFrame, wavesSvg);
};

init();