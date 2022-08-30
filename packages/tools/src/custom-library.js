import _ from 'lodash';
import num from './num.json';

const numToWord = (num) => {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.num === num ? ref.word : accum;
    },
    ''
  );
}

const wordToNum = (word) => {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum;
    },
    -1
  );
}

export {
  numToWord,
  wordToNum,
}