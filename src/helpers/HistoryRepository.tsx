import { AsyncStorage } from 'react-native';
import { SingleGuess } from '../types/index';
import { HISTORY_KEY } from '../constants/Storage';

const getHistory = async () => {
  const history = await AsyncStorage.getItem(HISTORY_KEY);
  return history;
};

const updateHistory = async (guesses: SingleGuess[], answer: string) => {
  const history = await getHistory();
  const historyEntity = {
    answer,
    history: guesses,
    timestamp: new Date(),
  };
  const newHistory = [...(history || []), historyEntity];
  AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
};

export { getHistory, updateHistory };
