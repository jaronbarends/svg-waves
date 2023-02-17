export class SvgControlPoints {
  constructor(template, svg, model) {
    const group = template.getElementsByTagName('g')[0];
    const elm = group.cloneNode(true);
    svg.appendChild(elm);
    
    // wave starting point
    this.pathPoint1 = elm.querySelector('[data-id="path-point-1"]');
    this.pathPoint1Radius = elm.querySelector('[data-id="path-point-1-radius"]');
    this.pathPoint1Orbit = elm.querySelector('[data-id="path-point-1-orbit"]');
    this.pathPoint1OrbitCenter = elm.querySelector('[data-id="path-point-1-orbit-center"]');
    this.bezierLine1 = elm.querySelector('[data-id="bezier-line-1"]');
    this.bezierPoint1 = elm.querySelector('[data-id="bezier-point-1"]');
    this.bezierPoint1Radius = elm.querySelector('[data-id="bezier-point-1-radius"]');
    this.bezierPoint1Orbit = elm.querySelector('[data-id="bezier-point-1-orbit"]');
    this.bezierPoint1OrbitCenter = elm.querySelector('[data-id="bezier-point-1-orbit-center"]');

    // wave end point
    this.pathPoint2 = elm.querySelector('[data-id="path-point-2"]');
    this.pathPoint2Radius = elm.querySelector('[data-id="path-point-2-radius"]');
    this.pathPoint2Orbit = elm.querySelector('[data-id="path-point-2-orbit"]');
    this.pathPoint2OrbitCenter = elm.querySelector('[data-id="path-point-2-orbit-center"]');
    this.bezierLine2 = elm.querySelector('[data-id="bezier-line-2"]');
    this.bezierPoint2 = elm.querySelector('[data-id="bezier-point-2"]');
    this.bezierPoint2Radius = elm.querySelector('[data-id="bezier-point-2-radius"]');
    this.bezierPoint2Orbit = elm.querySelector('[data-id="bezier-point-2-orbit"]');
    this.bezierPoint2OrbitCenter = elm.querySelector('[data-id="bezier-point-2-orbit-center"]');

    model.addObserver(this);
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

  setOrbit(ellipseElm, x, y, point) {
    const rx = point.r * point.orbitXScale;
    const ry = point.r * point.orbitYScale;
    ellipseElm.setAttribute('cx', x);
    ellipseElm.setAttribute('cy', y);
    ellipseElm.setAttribute('rx', rx);
    ellipseElm.setAttribute('ry', ry);
  }

  /**
  * updates the elements for control point
  * @param {Object} waveData - waveConfig object
  * @returns {undefined}
  */
  
  update(waveData) {
    const start = waveData.start;
    const end = waveData.end;

    // coordinates of wave start point
    const pathPoint1Str = `${start.x} ${start.y}`;
    const pathPoint1OrbitCenterStr = `${start.center.x} ${start.center.y}`;
    const bezierPoint1Str = `${start.ctrl.x} ${start.ctrl.y}`;
    const bezierPoint1OrbitCenterX = start.center.x + start.ctrl.center.x;
    const bezierPoint1OrbitCenterY = start.center.y + start.ctrl.center.y;
    const bezierPoint1OrbitCenterStr = `${bezierPoint1OrbitCenterX} ${bezierPoint1OrbitCenterY}`;
    // now create actual path-strings that can be used as path's d property
    const pathPoint1RadiusPath = `M ${pathPoint1OrbitCenterStr} L ${pathPoint1Str}`;
    const bezierLine1Path = `M ${pathPoint1Str} L ${bezierPoint1Str}`;
    const bezierPoint1RadiusPath = `M ${bezierPoint1OrbitCenterStr} L ${bezierPoint1Str}`;

    // coordinates of wave end point
    const pathPoint2Str = `${end.x} ${end.y}`;
    const pathPoint2OrbitCenterStr = `${end.center.x} ${end.center.y}`;
    const bezierPoint2Str = `${end.ctrl.x} ${end.ctrl.y}`;
    const bezierPoint2OrbitCenterX = end.center.x + end.ctrl.center.x;
    const bezierPoint2OrbitCenterY = end.center.y + end.ctrl.center.y;
    const bezierPoint2OrbitCenterStr = `${bezierPoint2OrbitCenterX} ${bezierPoint2OrbitCenterY}`;

    // now create actual path-strings that can be used as path's d property
    const pathPoint2RadiusPath = `M ${pathPoint2OrbitCenterStr} L ${pathPoint2Str}`;
    const bezierPoint2Path = `M ${pathPoint2Str} L ${bezierPoint2Str}`;
    const bezierPoint2OrbitCenterPath = `M ${bezierPoint2OrbitCenterStr} L ${bezierPoint2Str}`;

    this.setPath(this.pathPoint1Radius, pathPoint1RadiusPath);
    this.setPath(this.bezierLine1, bezierLine1Path);
    this.setPath(this.bezierPoint1Radius, bezierPoint1RadiusPath);
    this.setCenter(this.pathPoint1, start.x, start.y);
    this.setCenter(this.bezierPoint1, start.ctrl.x, start.ctrl.y);
    this.setCenter(this.bezierPoint1OrbitCenter, bezierPoint1OrbitCenterX, bezierPoint1OrbitCenterY);
    this.setCenter(this.pathPoint1OrbitCenter, start.center.x, start.center.y);

    this.setPath(this.pathPoint2Radius, pathPoint2RadiusPath);
    this.setPath(this.bezierLine2, bezierPoint2Path);
    this.setPath(this.bezierPoint2Radius, bezierPoint2OrbitCenterPath);
    this.setCenter(this.pathPoint2, end.x, end.y);
    this.setCenter(this.bezierPoint2, end.ctrl.x, end.ctrl.y);
    this.setCenter(this.bezierPoint2OrbitCenter, bezierPoint2OrbitCenterX, bezierPoint2OrbitCenterY);
    this.setCenter(this.pathPoint2OrbitCenter, end.center.x, end.center.y);

    this.setOrbit(this.pathPoint1Orbit, start.center.x, start.center.y, start);
    this.setOrbit(this.bezierPoint1Orbit, bezierPoint1OrbitCenterX, bezierPoint1OrbitCenterY, start.ctrl);
    this.setOrbit(this.pathPoint2Orbit, end.center.x, end.center.y, end);
    this.setOrbit(this.bezierPoint2Orbit, bezierPoint2OrbitCenterX, bezierPoint2OrbitCenterY, end.ctrl);
  }
}
