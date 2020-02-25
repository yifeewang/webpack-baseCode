const str = require('./a');

console.log(str);

const handle = () => {
    return () => {
        return 1 + 1;
    }
};
handle();

const target = [1, 3, 5].includes(3);