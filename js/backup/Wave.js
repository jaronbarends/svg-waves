export class Wave {
  tickTimer = null;
  timeoutDuration = 50;
  runCb = document.getElementById(`run-cb`);

  constructor(elm, waveConfig) {
    this.waveId = waveConfig.id;
    this.elm = elm;
    this.start = waveConfig.start;
    this.end = waveConfig.end;

    this.curve = elm.querySelector('[data-id="curve"]');
    this.curveCenterLine1 = elm.querySelector('[data-id="path-point-1-radius"]');
    // this.curveCenterPoint1 = elm.querySelector('[data-id="curve-center-point-1"]');
    this.curveCenterLine2 = elm.querySelector('[data-id="path-point-2-radius"]');

    this.ctrlLine1 = elm.querySelector('[data-id="bezier-line-1"]');
    this.ctrlPoint1 = elm.querySelector('[data-id="bezier-point-1"]');
    this.ctrlLine2 = elm.querySelector('[data-id="bezier-line-2"]');
    this.ctrlPoint2 = elm.querySelector('[data-id="bezier-point-2"]');
    this.ctrlCenterLine1 = elm.querySelector('[data-id="bezier-point-1-radius"]');
    this.ctrlCenterLine2 = elm.querySelector('[data-id="bezier-point-2-radius"]');

    this.runCb.addEventListener('change', () => {
      if (this.runCb.checked) {
        this.tick();
      }
    });

    const handler = (evt) => this.wavesettingHandler(evt);
    document.body.addEventListener('wavesetting', handler);
    
    this.tick();
  }



  // createSvgElement(elmName) {
  //   return document.createElementNS('http://www.w3.org/2000/svg', elmName);
  // }

  // setSvgAttribute(elm, attrName, attrValue) {
  //   elm.setAttributeNS(null, attrName, attrValue);
  // }

  setPath(elm, path) {
    elm.setAttribute('d', path);
  }

  setCenter(elm, x, y) {
    elm.setAttribute('cx', x);
    elm.setAttribute('cy', y);
  }
  
  updateSvg() {
    const start = this.start;// so we don't have to repeat "this"
    const end = this.end;

    // coordinates of curve start point
    const curveStartStr = `${start.x} ${start.y}`;
    // coordinates of curve start center point
    const curveStartCenterStr = `${start.center.x} ${start.center.y}`;
    const curveEndCenterStr = `${end.center.x} ${end.center.y}`;
    
    const ctrlPointStartStr = `${start.ctrl.x} ${start.ctrl.y}`;
    const ctrlPointEndStr = `${end.ctrl.x} ${end.ctrl.y}`;
    const ctrl1CenterStr = `${start.center.x + start.ctrl.center.x} ${start.center.y + start.ctrl.center.y}`;
    const ctrl2CenterStr = `${end.center.x + end.ctrl.center.x} ${end.center.y + end.ctrl.center.y}`;

    const curveEndStr = `${end.x} ${end.y}`;
    const closingStr = `L ${end.x} 400 L ${start.x} 400 Z`
  
    const curvePath = `M ${curveStartStr} C ${ctrlPointStartStr}, ${ctrlPointEndStr}, ${curveEndStr} ${closingStr}`;
    const curveStartCenterLinePath = `M ${curveStartCenterStr} L ${curveStartStr}`;
    const curveEndCenterLinePath = `M ${curveEndCenterStr} L ${curveEndStr}`;


    const startCtrlPath = `M ${curveStartStr} L ${ctrlPointStartStr}`;
    const startCtrlCenterPath = `M ${ctrl1CenterStr} L ${ctrlPointStartStr}`;

    const endCtrlPath = `M ${curveEndStr} L ${ctrlPointEndStr}`;
    const endCtrlCenterPath = `M ${ctrl2CenterStr} L ${ctrlPointEndStr}`;

    this.setPath(this.curve, curvePath);
    // console.log(this.waveId, curvePath);
    this.setPath(this.curveCenterLine1, curveStartCenterLinePath);
    this.setPath(this.curveCenterLine2, curveEndCenterLinePath);
    this.setPath(this.ctrlLine1, startCtrlPath);
    this.setPath(this.ctrlCenterLine1, startCtrlCenterPath);
    this.setPath(this.ctrlLine2, endCtrlPath);
    this.setPath(this.ctrlCenterLine2, endCtrlCenterPath);
    this.setCenter(this.ctrlPoint1, start.ctrl.x, start.ctrl.y);
    this.setCenter(this.ctrlPoint2, end.ctrl.x, end.ctrl.y);
  }
  
  toRadians(deg) {
    return 2 * Math.PI * deg / 360;
  }

  updateCurvePoint(point) {
    point.angle += point.angleIncrement;
    const rad = this.toRadians(point.angle);
    // looks better if orbits aren't fully round, so apply scaling
    point.x = point.center.x + point.orbitXScale * Math.cos(rad) * point.r;
    point.y = point.center.y + point.orbitYScale * Math.sin(rad) * point.r;
  }

  updateControlPoint(startOrEnd) {
    const ctrl = startOrEnd.ctrl;
    ctrl.angle += ctrl.angleIncrement;
    const rad = this.toRadians(ctrl.angle);
    ctrl.x = startOrEnd.center.x + ctrl.center.x + ctrl.orbitXScale * Math.cos(rad) * ctrl.r;
    ctrl.y = startOrEnd.center.y + ctrl.center.y + ctrl.orbitYScale * Math.sin(rad) * ctrl.r;
  }

  wavesettingHandler(evt) {
    const detail = evt.detail;
    if (detail.waveId === this.waveId) {
      // console.log(detail);
      const path = detail.path;
      let parentObj = this[path[0]];// start or end
      for (let i=1; i<path.length-1; i++) {
        parentObj = parentObj[path[i]];
      }
      const prop = path[path.length -1];
      parentObj[prop] = parseFloat(detail.value);
      // console.log('parentObj:', parentObj);
    }
  }

  tick() {
    clearTimeout(this.tickTimer);
    if (this.runCb.checked) {
      const tick = () => { this.tick() };// directly calling this.tick in timeout gives scoping issues
      this.tickTimer = setTimeout(tick, this.timeoutDuration);
    }
    this.updateCurvePoint(this.start);
    this.updateCurvePoint(this.end);
    this.updateControlPoint(this.start);
    this.updateControlPoint(this.end);

    this.updateSvg();
  }

}
