import GameScene from '../src/Scenes/GameScene';

jest.mock('./../src/Scenes/GameScene');

beforeAll(() => {
  GameScene.mockImplementation(() => ({
    getWarriorData: () => ({
      name: 'AbdelP',
      hp: 100,
      medicalKits: 2,
      points: 0,
      foodsCollected: 0,
    }),
  }));
});

describe('Game Scene tests', () => {
  it('returns de warrior data', () => {
    const game = new GameScene();
    expect(game.getWarriorData()).toEqual({
      foodsCollected: 0, hp: 100, medicalKits: 2, name: 'AbdelP', points: 0,
    });
  });
});