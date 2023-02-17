export class WavesGraph {
  constructor(waveModels) {
    this.waveModels = waveModels;
  }

  addObservers(observers) {
    // Don't think this is a good idea: for mask wave we need the same model as for another wave
    observers.forEach(observer, idx => {
      (this.waveModels[idx]?.addObserver(observer));
    });
  }

  start() {
    this.waveModels.forEach(model => model.tick());
  }
}