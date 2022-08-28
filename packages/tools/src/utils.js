import _ from 'lodash';

console.log(_.join(['Another', 'module', 'loaded!'], ' '));

const print = (color) => {
  return console.log('%c look, this is customer console', `color: ${color}; font-size: 20px;`);
}

export {
  print
}