//npm i lodash -S   //-S 表示生产环境
const _ = require('lodash')

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let arr2 = _.chunk(arr, 2) //把数组分为 2 个一段
console.log(arr2)
