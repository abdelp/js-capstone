import Axios from 'axios';

const GAME_KEY = 'dyjLe79WSf6K1aGPw6TO';
const API_ADDRESS = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';

const saveScore = (name, score) => Axios.post(`${API_ADDRESS}/${GAME_KEY}/scores`, {
  user: name,
  score: parseInt(score, 10),
});

const getScores = () => Axios.get(`${API_ADDRESS}/${GAME_KEY}/scores`);

export { saveScore, getScores };