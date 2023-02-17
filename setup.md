
define a WaveView interface:
- constructor with at least waveConfig
- update method that can be called from the outside

define WaveModel interface
- can be passed array of views
- will call update method on each view with coords

We could then create two WaveModels:
- continuously flowing waves
- wave being pulled up for page transition

WaveViews:
- SvgWaveView > has two svg waves
- WaveControlsView > has settings; more of a viewController?
- WaveComposer