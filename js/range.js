export class RangeInput {
  constructor(box, options) {
    // console.log('options:', options);
    this.options = options;
    this.waveId = options.waveId;

    const div = document.createElement('div');
    const minSpan = document.createElement('span');
    const maxSpan = document.createElement('span');
    const input = document.createElement('input');
    const output = document.createElement('output');
    const label = document.createElement('label');

    div.className = 'range-box';
    minSpan.className = 'value value--min';
    maxSpan.className = 'value value--max';
    minSpan.textContent = options.range[0];
    maxSpan.textContent = options.range[1];
    input.type = 'range';
    input.min = options.range[0];
    input.max = options.range[1];
    if (options.step) {
      input.step = options.step;
    }
    input.value = options.value;
    output.textContent = options.value;
    label.for = options.id;
    label.textContent = options.label;

    div.appendChild(minSpan);
    div.appendChild(input);
    div.appendChild(maxSpan);
    div.appendChild(output);
    div.appendChild(label);
    box.appendChild(div);
    this.output = output;

    input.addEventListener('change', (evt) => this.changeHandler(evt));
  }

  changeHandler(evt) {
    const value = evt.target.value;
    const detail = {
      waveId: this.waveId,
      path: this.options.path,
      value,
    };
    this.output.value = value;
    const settingsEvent = new CustomEvent('wavesetting', { detail });
    document.body.dispatchEvent(settingsEvent);
  }
}

