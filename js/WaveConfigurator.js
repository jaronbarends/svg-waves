/*
 * configurator for a single wave
 */
import { RangeInput } from './range.js';
import waveConfigs from './wave-config.js';

export class WaveConfigurator {
  constructor(model, containerElm) {
    // add options for start or end point
    this.model = model;
    this.containerElm = containerElm;
    this.wavesWrapper = document.getElementById(`waves-frame`);
    this.maxWidth = this.wavesWrapper.clientWidth;
    this.maxHeight = this.wavesWrapper.clientHeight;
    this.waveSelector = document.getElementById(`wave-selector`);

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
    const waveSettingsBox = document.getElementById(`settings-template`).content.cloneNode(true);
    const div = document.createElement('div');
    div.setAttribute('id', `wave-${idx}`);// somehow setAttribute doesn't work on waveSettingsBox, so use extra div
    div.classList.add('wave-settings-box');

    this.addRanges(waveSettingsBox, wave, 'ranges-start', wave.start, 'start', false);
    this.addRanges(waveSettingsBox, wave, 'ranges-start-ctrl', wave.start.ctrl, 'start', true);
    this.addRanges(waveSettingsBox, wave, 'ranges-end', wave.end, 'end', false);
    this.addRanges(waveSettingsBox, wave, 'ranges-end-ctrl', wave.end.ctrl, 'end', true);

    div.appendChild(waveSettingsBox);
    this.containerElm.appendChild(div);
  }

  setWaveHandler(evt) {
    const settingsBoxes = document.querySelectorAll(`.wave-settings-box`);
    const id = evt.currentTarget.value;
    
    settingsBoxes.forEach(box => {
      if (box.getAttribute('id') === `wave-${id}`) {
        box.classList.add('wave-settings-box--is-visible');
        box.classList.remove('wave-settings-box--is-hidden');
      } else {
        box.classList.add('wave-settings-box--is-hidden');
        box.classList.remove('wave-settings-box--is-visible');
      }
    });
    setAllWaveControlsVisibility();
  }

  setAllWaveControlsVisibility() {
    const waveFrames = document.querySelectorAll('.waves-svg-clipper');
    const id = waveSelector.value;
    const bezierSetting = document.querySelector('input[name="bezier-for"]:checked').value;
    console.log('bezierSetting:', bezierSetting);
    waveFrames.forEach(frame => {
      if (bezierSetting === 'active') {
        const isActiveFrame = frame.getAttribute('id') === `waves-svg-clipper-${id}`;
        setWaveControlsVisibility(frame, isActiveFrame);
      } else if (bezierSetting === 'all') {
        setWaveControlsVisibility(frame, true);
      } else {
        setWaveControlsVisibility(frame, false);
      }
    });
  }

  setWaveControlsVisibility(frame, isVisible) {
    if (isVisible) {
      frame.style.setProperty('--ctrl-display', 'block');
      frame.style.overflow = 'visible';
    } else {
      frame.style.setProperty('--ctrl-display', 'none');
      frame.style.overflow = 'hidden';
    }
  }

  wavesettingchangeHandler(data) {
    this.model.update(data.detail);
    // console.log('change: ', data);
  }

  initSettings() {
    const waveConfig = this.model.waveConfig;
    this.createWaveSettings(waveConfig);
    // const option = document.createElement('option');
    // option.value = idx;
    // option.textContent = `Wave ${idx + 1}`;
    // waveSelector.appendChild(option);
  };

  // initSettings() {
  //   waveConfigs.forEach((wave, idx) => {
  //     createWaveSettings(wave, idx);
  //     const option = document.createElement('option');
  //     option.value = idx;
  //     option.textContent = `Wave ${idx + 1}`;
  //     waveSelector.appendChild(option);
  //   });
  //   waveSelector.addEventListener('change', setWaveHandler);
  //   waveSelector.dispatchEvent(new Event('change'));
    
  //   const bezierRadios = document.querySelectorAll(`input[name="bezier-for"]`);
  //   bezierRadios.forEach(radio => {
  //     radio.addEventListener('change', setAllWaveControlsVisibility);
  //   })

  //   setAllWaveControlsVisibility();
  // };


}