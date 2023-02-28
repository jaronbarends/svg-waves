/*
 * SvgWave - draws a wave by assigning a d-property to an svg path
 * based on coordinates of start and endpoint
 * and their corresponding bezier control points
*/

export class SvgWave {
  constructor(path, model) {
    this.svg = path.closest('svg');
    this.svgHeight = this.getSvgHeight(this.svg);
    this.path = path;
    model.addObserver(this);
  }

  getSvgHeight(svg) {
    const viewBox = svg.getAttribute('viewBox');// eg '0 0 1200 800'
    const coords = viewBox.split(' ');
    return parseInt(coords[3], 10);
  }

  /**
  * updates the path
  * @param {Object} waveData - waveConfig object
  * @returns {undefined}
  */
  update(waveData) {
    const start = waveData.start;
    const end = waveData.end;

    // coords of wave start point
    const waveStartCoordsStr = `${start.x} ${start.y}`;
    const ctrlPointStartStr = `${start.ctrl.x} ${start.ctrl.y}`;
    const ctrlPointEndStr = `${end.ctrl.x} ${end.ctrl.y}`;
    const waveEndCoordsStr = `${end.x} ${end.y}`;
    const closingStr = `L ${end.x} ${this.svgHeight} L ${start.x} ${this.svgHeight} Z`
  
    const wavePath = `M ${waveStartCoordsStr} C ${ctrlPointStartStr}, ${ctrlPointEndStr}, ${waveEndCoordsStr} ${closingStr}`;
    this.path.setAttribute('d', wavePath);
  }
}
