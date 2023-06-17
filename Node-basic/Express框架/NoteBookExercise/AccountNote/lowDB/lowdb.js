const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json') // 👈这里的 db.json 是一个文件, 用来存储数据
const db = low(adapter)



// 初始化数据
db.defaults({ arr: [], user: {} }).write() //.write() 表示写入数据



// 写入数据 (新增 & 覆盖)
db.get('arr').push({id: 2, title: 'Hello', des: 'welcome'}).write()  // push 表示在最后面加入
db.get('arr').unshift({id: 1, title: 'Node', des: 'Code'}).write()  // unshift 表示在最前面加入
db.set('user', { name: 'John', age: 25 }).write()  // set 表示覆盖原来的数据



// 获取数据 (获取全部、单条)
console.log(db.get('arr').value()) // 👈这里的 get('arr') 表示获 arr 的取数据

let data = db.get('arr').find({id: 1}).value()  // 👈获取 id 为 1 的数据
console.log(data)



// 删除数据
let res = db.get('arr').remove({ id: 3 }).write() // 👈这里的 remove({ id: 2 }) 表示删除 id 为 2 的数据
// 有返回值的, 返回被删除的数据
console.log(res) // 👈这里的 res 是一个数组, 里面存储的是被删除的数据



// 修改(替换某条）数据 (需要先获取数据)
db.get('arr').find({ id: 1 }).assign({ title: '更新数据为 ABC', des: '更新数据为 Wonderful' }).write() // 👈这里的 find({ id: 1 }) 表示查找 id 为 1 的数据, assign({ title: 'Node.js', des: 'Code' }) 表示替换为新的数据
