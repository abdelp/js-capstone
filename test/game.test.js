import GameScene from './../src/Scenes/GameScene';
// import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';
// import { describe } from 'yargs';

let game;

beforeEach(() => {
  game = new GameScene();
});

describe('test 1', () => {
  it('test1', () => {
    expect(1).toBe(1);
  });
});