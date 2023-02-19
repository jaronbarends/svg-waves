/*
 * model for a single animated wave
 * tick
 * addObserver
 * _updateObservers
 * update
*/
export class AnimatedWaveModel {
  tickTimer = null;
  timeoutDuration = 50;
  runCb = document.getElementById(`run-cb`);

  constructor(waveConfig) {
    this.waveConfig = waveConfig;
    this.waveId = waveConfig.id;
    this.waveUid = waveConfig.uid;
    // this.path = path;
    this.start = waveConfig.start;
    this.end = waveConfig.end;
    // is there a difference between defining observers here or outside of constructor?
    this.observers = [];

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

  _wavesettingHandler(evt) {
    console.log('handler');
    const detail = evt.detail;
    if (detail.waveId === this.waveId) {
      const path = detail.path;
      let parentObj = this[path[0]];// start or end
      for (let i=1; i<path.length-1; i++) {
        parentObj = parentObj[path[i]];
      }
      const prop = path[path.length -1];
      parentObj[prop] = parseFloat(detail.value);
    }
  }

  _updateObservers(waveData) {
    this.observers.forEach(observer => {
      if (!observer.update) {
        console.warn(`observer ${observer} does not have required "update" method`);
        return;
      }
      observer.update(waveData);
    })
  }

  // may be called from outside
  tick() {
    clearTimeout(this.tickTimer);
    if (this.runCb.checked) {
      const tick = () => { this.tick() };// directly calling this.tick in timeout gives scoping issues
      this.tickTimer = setTimeout(tick, this.timeoutDuration);
    }
    this.updateWaveCoords(this.start);
    this.updateWaveCoords(this.end);
    this._updateControlPointCoords(this.start);
    this._updateControlPointCoords(this.end);

    const waveData = {
      start: this.start,
      end: this.end,
    };

    this._updateObservers(waveData);
  }

  // may be called from outside
  addObserver(observer) {
    this.observers.push(observer);
  }

  // may be called from outside
  update(data) {
    const path = data.path;
    let parentObj = this[path[0]];// start or end
    for (let i=1; i<path.length-1; i++) {
      parentObj = parentObj[path[i]];
    }
    const prop = path[path.length -1];
    parentObj[prop] = parseFloat(data.value);
  }
}
