export class StaticWaveConfigurator {
  constructor(waveModel, wavesFrame, wavesSvg) {
    this.waveModel = waveModel;
    this.wavesFrame = wavesFrame;
    this.wavesSvg = wavesSvg;
    this.frameWidth = this.wavesFrame.clientWidth;
    this.frameHeight = this.wavesFrame.clientHeight;
    this.svgWidth = this.wavesSvg.clientWidth;
    this.svgHeight = this.wavesSvg.clientHeight;
    this.xCorrection = (this.frameWidth - this.svgWidth)/2;
    this.wavePoint1 = null;
    this.ctrlPoint1 = null;
    this.wavePoint2 = null;
    this.ctrlPoint2 = null;
    this.bezierLine1 = null;
    this.bezierLine2 = null;
    this.dragOrigin = { x: 0, y: 0 };
    this.dragTarget = null;
    this.mmh = null;
    this.muh = null;
    
    this.createViewController();
  }

  // model coordinates are in the svg's coordinate space;
  // the draggable points are in the waveFrame's coordinate space
  getXInWaveFrame(x) {
    return x + this.xCorrection;
  }
  
  // update draggable html point
  updatePoint(point, modelProp) {
    const x = this.getXInWaveFrame(modelProp.x);
    const y = modelProp.y;

    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
  }

  updateLine(line, point) {
    const lineStart = `${point.x} ${point.y}`;
    const lineEnd = `${point.x + point.ctrl.dx} ${point.y + point.ctrl.dy}`;

    line.setAttribute('d', `M ${lineStart} L ${lineEnd}`);
  }

  updateLines() {
    this.updateLine(this.bezierLine1, this.waveModel.start);
    this.updateLine(this.bezierLine2, this.waveModel.end);
    // const line1Start = `${this.waveModel.start.x} ${this.waveModel.start.y}`;
    // const line1End = `${this.waveModel.start.x + this.waveModel.start.ctrl.dx} ${this.waveModel.start.y + this.waveModel.start.ctrl.dy}`;

    // this.bezierLine1.setAttribute('d', `M ${line1Start} L ${line1End}`);
  }

  // add html elements for draggable points
  addDraggablePoints() {
    const pointsTemplate = document.getElementById(`control-points-template`);
    const clone = pointsTemplate.content.cloneNode(true);
    this.wavesFrame.appendChild(clone);

    this.wavePoint1 = this.wavesFrame.querySelector('[data-id="draggable-point-path-1"]');
    this.ctrlPoint1 = this.wavesFrame.querySelector('[data-id="draggable-point-ctrl-1"]');
    this.wavePoint2 = this.wavesFrame.querySelector('[data-id="draggable-point-path-2"]');
    this.ctrlPoint2 = this.wavesFrame.querySelector('[data-id="draggable-point-ctrl-2"]');

    this.updatePoint(this.wavePoint1, this.waveModel.start);
    this.updatePoint(this.ctrlPoint1, this.waveModel.start.ctrl);
    this.updatePoint(this.wavePoint2, this.waveModel.end);
    this.updatePoint(this.ctrlPoint2, this.waveModel.end.ctrl);

    this.initDragBehavior();
  }

  mouseMoveHandler(evt) {
    console.log('move');
    const elm = this.dragTarget;
    if (!elm) {
      return;
    }
    const dx = evt.clientX - this.dragOrigin.x;
    const dy = evt.clientY - this.dragOrigin.y;

    elm.style.top = `${elm.offsetTop + dy}px`;
    elm.style.left = `${elm.offsetLeft + dx}px`;

    this.dragOrigin.x = evt.clientX;
    this.dragOrigin.y = evt.clientY;
  }

  mouseUpHandler(evt) {
    this.dragTarget = null;
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  }

  mouseDownHandler(evt) {
    this.dragTarget = evt.currentTarget;
    this.dragOrigin = {
      x: evt.clientX,
      y: evt.clientY,
    };
    
    document.addEventListener('mousemove', evt => { this.mouseMoveHandler(evt); });
    // document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', evt => { this.mouseUpHandler(evt); });
    // document.addEventListener('mouseup', this.mouseUpHandler);
    console.log('this.dragOrigin:', this.dragOrigin);
  }

  // init dragging behavior for a single html element
  initElmDragBehavior(elm) {
    elm.addEventListener('mousedown', (evt) => { this.mouseDownHandler(evt); });
  }

  // init dragging behavior for all html elements
  initDragBehavior() {
    this.initElmDragBehavior(this.wavePoint1);
    this.initElmDragBehavior(this.ctrlPoint1);
  }

  // add bezier lines to svg
  addBezierLines() {
    const template = document.getElementById(`bezier-lines-template`);
    const group = template.getElementsByTagName('g')[0];
    const elm = group.cloneNode(true);
    this.bezierLine1 = elm.querySelector('[data-id="bezier-line-1"]');
    this.bezierLine2 = elm.querySelector('[data-id="bezier-line-2"]');
    this.wavesSvg.appendChild(elm);

    this.updateLines();
  }

  createViewController() {
    this.addDraggablePoints();
    this.addBezierLines();
  }

}