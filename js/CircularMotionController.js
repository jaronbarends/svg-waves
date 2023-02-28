export class CircularMotionController {
  tickTimer = null;
  timeoutDuration = 50;
  runCb = document.getElementById(`run-cb`);

  constructor() {
    // we could also pass in waveModels as argument?
    this.waveModels = [];

    // TODO: remove this - should be part of higher level component that this component should observe
    this.runCb.addEventListener('change', () => {
      if (this.runCb.checked) {
        this.tick();
      }
    });
  }
  
  _toRadians(deg) {
    return 2 * Math.PI * deg / 360;
  }

  // update the x and y coordinate of the start or end point of the wave
  updateWaveCoords(point) {
    point.angle += point.angleIncrement;
    const rad = this._toRadians(point.angle);
    // looks better if orbits aren't fully round, so apply scaling
    point.x = point.center.x + point.orbitXScale * Math.cos(rad) * point.r;
    point.y = point.center.y + point.orbitYScale * Math.sin(rad) * point.r;
  }

  // update the x and y coordinate of the bezier control point of the wave's start or end point
  _updateControlPointCoords(startOrEnd) {
    const ctrl = startOrEnd.ctrl;
    ctrl.angle += ctrl.angleIncrement;
    const rad = this._toRadians(ctrl.angle);
    ctrl.x = startOrEnd.center.x + ctrl.center.x + ctrl.orbitXScale * Math.cos(rad) * ctrl.r;
    ctrl.y = startOrEnd.center.y + ctrl.center.y + ctrl.orbitYScale * Math.sin(rad) * ctrl.r;
  }

  _modelTick(waveModel) {
    // we're now updating the model directly
    // ? should we create a deep copy of start and end?
    // might be overkill to do every tick
    
    this.updateWaveCoords(waveModel.start);
    this.updateWaveCoords(waveModel.end);
    this._updateControlPointCoords(waveModel.start);
    this._updateControlPointCoords(waveModel.end);

    const waveData = {
      start: waveModel.start,
      end: waveModel.end,
    };

    waveModel.updateModel(waveData);
  }

  // may be called from outside
  tick() {
    clearTimeout(this.tickTimer);
    if (this.runCb.checked) {
      const tick = () => { this.tick() };// directly calling this.tick in timeout gives scoping issues
      this.tickTimer = setTimeout(tick, this.timeoutDuration);
    }

    this.waveModels.forEach(waveModel => this._modelTick(waveModel));
  }

  // may be called from outside
  addModel(waveModel) {
    this.waveModels.push(waveModel);
  }
}