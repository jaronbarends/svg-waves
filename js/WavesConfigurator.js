/*
 * configurator for multiple waves
 */
import { WaveConfigurator } from './WaveConfigurator.js';

export class WavesConfigurator {
  constructor(waveModels) {
    this.configuratorsElm = document.getElementById(`wave-configurators`);
    this.configuratorSelector = document.getElementById(`wave-configurator-selector`);
    waveModels.forEach(waveModel => {

      new WaveConfigurator(waveModel, this.configuratorsElm);

      // setup meta controls
      const option = document.createElement('option');
      option.value = waveModel.waveId;
      option.textContent = waveModel.waveUid;
      this.configuratorSelector.appendChild(option);
    });
    
    this.configuratorSelector.addEventListener('change', evt => {this.setConfiguratorHandler(evt);});
    // kick off first time to set initial settings
    this.configuratorSelector.dispatchEvent(new Event('change'));

    // set showing / hiding control points
    // TODO: move to separate location, has nothing to do with configurator
    this.showControlsCb = document.getElementById(`controls-cb`);
    this.showControlsCb.addEventListener('change', () => {this.showControlsChangeHandler();})
    this.showControlsChangeHandler();
  }

  // show the selected wave-configurator
  setConfiguratorHandler(evt) {
    const configuratorElms = this.configuratorsElm.querySelectorAll('[data-wave-id]');
    const id = evt.currentTarget.value;
    configuratorElms.forEach(elm => {
      if (elm.getAttribute('data-wave-id') === id) {
        elm.classList.add('wave-settings-box--is-visible');
        elm.classList.remove('wave-settings-box--is-hidden');
      } else {
        elm.classList.add('wave-settings-box--is-hidden');
        elm.classList.remove('wave-settings-box--is-visible');
      }
    });
  }

  showControlsChangeHandler() {
    const showControls = this.showControlsCb.checked;
    const controlGroups = document.querySelectorAll(`.ctrl-group`);
    const wavesFrame = document.getElementById(`waves-frame`);
    const display = showControls ? 'block' : 'none';
    const overflow = showControls ? 'visible' : 'hidden';
    controlGroups.forEach(group => group.style.display = display);
    wavesFrame.style.overflow = overflow;
  }
}