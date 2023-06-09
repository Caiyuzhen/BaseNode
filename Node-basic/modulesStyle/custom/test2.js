const myModule = require('./index.js') //⚡️调用自己写的包


console.log(myModule([99,88,77,66,55]))


// 🔥打印 package.json 内的配置
console.log(process.env.npm_package_config_lala)


// 🔥在 package.json 内也可以访问内 package.json 的配置信息
// "build": "echo $npm_package_config_lala"