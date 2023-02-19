/*
 * configurator for a single wave
 */
import { RangeInput } from './RangeInput.js';

export class WaveConfigurator {
  constructor(model, containerElm) {
    // add options for start or end point
    this.model = model;
    this.containerElm = containerElm;
    this.wavesWrapper = document.getElementById(`waves-frame`);
    this.maxWidth = this.wavesWrapper.clientWidth;
    this.maxHeight = this.wavesWrapper.clientHeight;
    this.waveSelector = document.getElementById(`wave-configurator-selector`);

    this.initSettings();
  }

  getPointSettingsOptions(wave, point, startOrEnd, isControlPoint) {
    let minX = 0;
    let minY = 0;
    let maxX = this.maxWidth;
    let maxY = this.maxHeight;
    if (isControlPoint) {
      minX = -200;
      minY = -200;
      maxX = 200;
      maxY = 200;
    }
    const options = [
      {
        path: ['center', 'x'],
        range: [minX, maxX],
        value: point.center.x,
        label: `point orbit center x`,
      },
      {
        path: ['center', 'y'],
        range: [minY, maxY],
        value: point.center.y,
        label: `point orbit center y`,
      },
      {
        path: ['r'],
        range: [0, 200],
        value: point.r,
        label: `point orbit radius`,
      },
      {
        path: ['angleIncrement'],
        range: [0, 20],
        value: point.angleIncrement,
        label: `rotation speed (deg/50ms)`,
      },
      {
        path: ['orbitXScale'],
        range: [0, 1],
        value: point.orbitXScale,
        step: 0.1,
        label: `orbit x-scale`,
      },
      {
        path: ['orbitYScale'],
        range: [0, 1],
        value: point.orbitYScale,
        step: 0.1,
        label: `orbit y-scale`,
      },
    ];
    // for every option add start or end to path, and waveId
    options.forEach(option => {
      option.waveId = wave.id;
      if (isControlPoint) {
        option.path.unshift('ctrl');
      }
      option.path.unshift(startOrEnd);
    })
    return options;
  }

  addRanges(box, wave, elmId, point, startOrEnd, isControlPoint) {
    const settingsBox = box.querySelector(`[data-id="${elmId}"]`);
    const settingsOptions = this.getPointSettingsOptions(wave, point, startOrEnd, isControlPoint);
    const handler = (evt) => this.wavesettingchangeHandler(evt);

    settingsOptions.forEach(setting => {
      new RangeInput(settingsBox, setting);
      settingsBox.addEventListener('wavesettingchange', handler )
    });  
  }

  createWaveSettings(wave, idx) {
    const waveSettingsBox = document.getElementById(`wave-configurator-template`).content.cloneNode(true);
    const div = document.createElement('div');
    div.setAttribute('data-wave-id', this.model.waveId);// somehow setAttribute doesn't work on waveSettingsBox, so use extra div
    div.classList.add('wave-settings-box');

    this.addRanges(waveSettingsBox, wave, 'ranges-start', wave.start, 'start', false);
    this.addRanges(waveSettingsBox, wave, 'ranges-start-ctrl', wave.start.ctrl, 'start', true);
    this.addRanges(waveSettingsBox, wave, 'ranges-end', wave.end, 'end', false);
    this.addRanges(waveSettingsBox, wave, 'ranges-end-ctrl', wave.end.ctrl, 'end', true);

    div.appendChild(waveSettingsBox);
    this.configuratorElm = div;
    this.containerElm.appendChild(div);
  }

  wavesettingchangeHandler(data) {
    this.model.update(data.detail);
  }

  initSettings() {
    const waveConfig = this.model.waveConfig;
    this.createWaveSettings(waveConfig);
  }
}