import * as ScoresProvider from '../src/Objects/scoresProvider';
jest.mock('../src/Objects/scoresProvider');

describe('Scores API', () => {
  ScoresProvider.saveScore.mockImplementation((name, score) => new Promise((resolve, reject) => {
    if(!name) {
      reject({ result: 'You need to provide a valid user for the score' });
    } else if (!score) {
      reject({ result: 'You need to provide a valid score for the leaderboard' });
    } else {
      resolve({ result: 'Leaderboard score created correctly.' });
    }
  }))

  ScoresProvider.getScores.mockResolvedValue({
    data: {
      result: [
        { name: 'abdelp', score: 100}
      ]
    }
  });

  it('should save the user score', () => {
    ScoresProvider.saveScore('abdelp', 100).then(response => expect(response)
      .toEqual({ result: 'Leaderboard score created correctly.' }));
  });

  it('should fail if no name is passed', () => {
    ScoresProvider.saveScore(null, 100).then(response => expect(response)
      .toEqual({ result: 'You need to provide a valid user for the score' }));
  });

  it('should fail if no score is passed', () => {
    ScoresProvider.saveScore(null, 100).then(response => expect(response)
      .toEqual({ result: 'You need to provide a valid score for the leaderboard' }));
  });

  it('should fetch users scores', () => {
    ScoresProvider.getScores().then(response => expect(response).toEqual({
      data: {
        result: [
          { name: 'abdelp', score: 100 }
        ],
      },
    }));
  });
});