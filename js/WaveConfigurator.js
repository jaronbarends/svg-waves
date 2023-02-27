/*
 * configurator for a single wave
 */
import { RangeInput } from './RangeInput.js';

export class WaveConfigurator {
  constructor(waveModel, containerElm) {
    // add options for start or end point
    this.waveModel = waveModel;
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
    div.setAttribute('data-wave-id', this.waveModel.waveId);// somehow setAttribute doesn't work on waveSettingsBox, so use extra div
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
    // data.detail contains path to wave-property and new value
    // path looks like ['start', 'center', 'x']
    const path = data.detail.path; 
    let parentObj = this.waveModel[path[0]];// start or end
    for (let i=1; i<path.length-1; i++) {
      parentObj = parentObj[path[i]];
    }
    const prop = path[path.length -1];
    parentObj[prop] = parseFloat(data.detail.value);
    
    this.waveModel.updateModel(updatedModelData);

    // if we don't want to manipulate data on the model directly,
    // we can create clones like this:

    // create deep clones
    // const start = JSON.parse(JSON.stringify(this.waveModel.start));
    // const end = JSON.parse(JSON.stringify(this.waveModel.end));
    // const updatedModelData = {
    //   start,
    //   end,
    // }
    
    // // data.detail contains path to wave-property and new value
    // // path looks like ['start', 'center', 'x']
    // const path = data.detail.path; 
    // let parentObj = updatedModelData[path[0]];// start or end
    // for (let i=1; i<path.length-1; i++) {
    //   parentObj = parentObj[path[i]];
    // }
    // const prop = path[path.length -1];
    // parentObj[prop] = parseFloat(data.detail.value);
    
    // this.waveModel.updateModel(updatedModelData);
  }

  initSettings() {
    const waveConfig = this.waveModel.waveConfig;
    this.createWaveSettings(waveConfig);
  }
}