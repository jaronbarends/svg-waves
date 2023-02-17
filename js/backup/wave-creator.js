import waveConfigs from './wave-config.js';
import { Wave } from './Wave.js';

const initWaves = () => {
  const wavesWrapper = document.getElementById(`waves-frame`);
  const frameTemplate = document.getElementById(`wave-frame-template`);
  const svgTemplate = document.getElementById(`wave-template`);
  const group = svgTemplate.getElementsByTagName('g')[0];

  waveConfigs.forEach((waveConfig, idx) => {
    const frame = frameTemplate.content.cloneNode(true);
    // frame.setAttribute(`waves-svg-clipper-${idx}`);
    const container = frame.querySelector(`.waves-svg-container`);
    container.classList.add('bla');
    // somehow can't use setAttribute on frame directly, but this works
    container.parentNode.setAttribute('id', `waves-svg-clipper-${idx}`);
    const clonedGroup = group.cloneNode(true);
    const svg = createSvgElement('svg');
    svg.appendChild(clonedGroup);
    container.appendChild(svg);
    wavesWrapper.appendChild(frame);

    new Wave1(svg, waveConfig);
  });
}

const initWavinWaves = () => {

}

const createSvgElement = (elmName) => {
  return document.createElementNS('http://www.w3.org/2000/svg', elmName);
}

const init = () => {
  initWaves();
  initWavinWaves();
}

init();