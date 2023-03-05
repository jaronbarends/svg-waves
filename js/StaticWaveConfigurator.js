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
    
    this.createViewController();
  }

  // model coordinates are in the svg's coordinate space;
  // the draggable points are in the waveFrame's coordinate space
  getXInWaveFrame(x) {
    return x + this.xCorrection;
  }
  
  updatePoint(point, modelProp) {
    const x = this.getXInWaveFrame(modelProp.x);
    const y = modelProp.y;

    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
  }

  createViewController() {
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
  }

}