const str = require('./a')
console.log(str);

const handle = () => {
    return () => {
        return 1 + 1
    }
}

const target = [1,3,5].includes(3)

const promise = Promise.resolve()