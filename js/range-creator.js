import { RangeInput } from './range.js';
import waveConfigs from './wave-config.js';

// add options for start or end point
const wavesWrapper = document.getElementById(`waves-frame`);
const maxWidth = wavesWrapper.clientWidth;
const maxHeight = wavesWrapper.clientHeight;
const waveSelector = document.getElementById(`wave-selector`);

const getPointSettingsOptions = (wave, point, startOrEnd, isControlPoint) => {
  let minX = 0;
  let minY = 0;
  let maxX = maxWidth;
  let maxY = maxHeight;
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

const addRanges = (box, wave, elmId, point, startOrEnd, isControlPoint) => {
  const settingsBox = box.querySelector(`[data-id="${elmId}"]`);
  const settingsOptions = getPointSettingsOptions(wave, point, startOrEnd, isControlPoint);
  settingsOptions.forEach(setting => {
    new RangeInput(settingsBox, setting);
  });  
}

const createWaveSettings = (wave, idx) => {
  const allSettingsBox = document.getElementById(`waves-configurator`);
  const waveSettingsBox = document.getElementById(`settings-template`).content.cloneNode(true);
  const div = document.createElement('div');
  div.setAttribute('id', `wave-${idx}`);// somehow setAttribute doesn't work on waveSettingsBox, so use extra div
  div.classList.add('wave-settings-box');

  addRanges(waveSettingsBox, wave, 'ranges-start', wave.start, 'start', false);
  addRanges(waveSettingsBox, wave, 'ranges-start-ctrl', wave.start.ctrl, 'start', true);
  addRanges(waveSettingsBox, wave, 'ranges-end', wave.end, 'end', false);
  addRanges(waveSettingsBox, wave, 'ranges-end-ctrl', wave.end.ctrl, 'end', true);

  div.appendChild(waveSettingsBox);
  allSettingsBox.appendChild(div);
}

const setWaveHandler = evt => {
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

const setAllWaveControlsVisibility = () => {
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

const setWaveControlsVisibility = (frame, isVisible) => {
  if (isVisible) {
    frame.style.setProperty('--ctrl-display', 'block');
    frame.style.overflow = 'visible';
  } else {
    frame.style.setProperty('--ctrl-display', 'none');
    frame.style.overflow = 'hidden';
  }
}

const initSettings = () => {
  waveConfigs.forEach((wave, idx) => {
    createWaveSettings(wave, idx);
    const option = document.createElement('option');
    option.value = idx;
    option.textContent = `Wave ${idx + 1}`;
    waveSelector.appendChild(option);
  });
  waveSelector.addEventListener('change', setWaveHandler);
  waveSelector.dispatchEvent(new Event('change'));
  
  const bezierRadios = document.querySelectorAll(`input[name="bezier-for"]`);
  bezierRadios.forEach(radio => {
    radio.addEventListener('change', setAllWaveControlsVisibility);
  })

  setAllWaveControlsVisibility();
};

initSettings();