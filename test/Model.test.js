import Model from '../src/Model';

describe('Model tests', () => {
  const model = new Model();

  it('sets the music on', () => {
    model.musicOn = true;
    expect(model.musicOn).toBe(true);
  });

  it('sets the music off', () => {
    model.musicOn = false;
    expect(model.musicOn).toBe(false);
  });

  it('sets the sound on', () => {
    model.soundOn = true;
    expect(model.soundOn).toBe(true);
  });

  it('sets the sound off', () => {
    model.soundOn = false;
    expect(model.soundOn).toBe(false);
  });

  it('sets the background music on', () => {
    model.bgMusicPlaying = true;
    expect(model.bgMusicPlaying).toBe(true);
  });

  it('sets the background music off', () => {
    model.bgMusicPlaying = false;
    expect(model.bgMusicPlaying).toBe(false);
  });
});