const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
	fetch('http://localhost:9090/api/login', {
		method: 'GET', // 🚀请求方法, GET 请求不包含请求体！！
	})
	.then(res => {
		// console.log(res.text())
		return res.json() //res.text()、res.json()
	})
	.then(data => {
		console.log(data.message) //获取响应体数据
	})
	.catch(err => {
		console.log(err)
	})
})



const btn2 = document.getElementById('btn2')

btn2.addEventListener('click', () => {
	fetch('http://localhost:9090/api/table', {
		method: 'GET', // 🚀请求方法, GET 请求不包含请求体！！
	})
	.then(res => {
		// 处理 html 结构的数据
		return res.text() 
	})
	.then(data => {
		console.log(data) //【注意这里不一样！】获取响应体数据
		// 新建一个 div 标签
		const div = document.createElement('div')
		// 将响应体数据赋值给 div 标签
		div.innerHTML = data
		// 将 div 标签插入到 body 标签中
		document.body.appendChild(div)



		// 🌟 Table 单元格点击换色（🔥🔥要异步等数据获取完后才能绑定事件！！🔥🔥)
		// 获取所有【单元格】
		let tds = document.querySelectorAll('td')
		console.log(tds)

		// 遍历所有【单元格】, 为每个单元格添加点击事件
		tds.forEach(item => {
			item.onmouseenter = function() {
				this.style.background = '#a91fff'
			}
		})


	})
	.catch(err => {
		console.log(err)
	})
})



