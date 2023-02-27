/*
 * model for a single animatable wave
 * addObserver
 * updateModel
*/
export class AnimatableWaveModel {

  constructor(waveConfig, isAnimated = false) {
    this.isAnimated = isAnimated;
    this.waveConfig = waveConfig;
    this.waveId = waveConfig.id;
    this.waveUid = waveConfig.uid;
    this.start = waveConfig.start;
    this.end = waveConfig.end;
    // is there a difference between defining observers here or outside of constructor?
    this.observers = [];
  }
  
  // _updateObservers(waveData) {
  _updateObservers() {
    this.observers.forEach(observer => {
      if (!observer.update) {
        console.warn(`observer ${observer} does not have required "update" method`);
        return;
      }
      const waveData = {
        start: this.start,
        end: this.end,
      };
      observer.update(waveData);
    })
  }

  // may be called from outside
  addObserver(observer) {
    this.observers.push(observer);
  }

  // meant to be called from external controller
  updateModel(data) {
    // we're now passing reference to the model directly to the controller,
    // and they're directly manipulating the model's data
    // should we create a copy directly when adding the model to the controller?
    // what happens then if another controller updates the model?
    // or create a copy before changing the data?
    // if we no longer change the model's data directly,
    // we need to update the props here:
    // this.start = data.start;
    // this.end = data.end;

    this._updateObservers(data);
  }
}
