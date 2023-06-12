const btn1 = document.querySelector('#btn-1')



btn1.addEventListener('click', () => {
	// GET 请求的参数主要放在 URL 内, POST 主要放在请求体内 （GET 主要用于获取数据[大小限制 2k], POST 主要用于提交数据）


	// post 请求
	// fetch('http://localhost:7070/temp.html', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	}
	// })

	
	// 获取 temp.css
	fetch('http://localhost:7070/temp.css')
		.then(response => response.text()) // 使用.text()方法将响应转换为文本格式
		.then(data => {

			// 在这里处理获取到的CSS内容
			// const link = document.querySelector('#link-temp')
			//给 link 添加 css 样式表
			// link.setAttribute('href', data)
			console.log(data)
		})
		.catch(error => {
			console.error(error)
		})



	// 获取 temp.js
	fetch('http://localhost:7070/temp.js')
		.then(response => response.text()) // 使用.text()方法将响应转换为文本格式
		.then(data => {

			// 在这里处理获取到的JavaScript内容
			console.log(data);
		})
		.catch(error => {
		console.error(error);
		})



	// 获取 temp.html
	fetch('http://localhost:7070/temp.html')
		.then(response => response.text()) // 使用.text()方法将响应转换为文本格式
		.then(data => {

			// 在这里处理获取到的HTML内容
			console.log(data)
			// 渲染到页面中
			document.querySelector('#content').innerHTML = data
		})
		.catch(error => {
			console.error(error)
		})


	// // 获取 staticImg.jpg (作为二进制数据)
	// fetch('http://localhost:7070/staticImg.jpg')
	// 	.then(response => response.blob()) // 使用.blob()方法将响应转换为二进制数据
	// 	.then(data => {

	// 		// 在这里处理获取到的图片数据
	// 		// 可以将其插入到DOM中作为<img>标签的src，或者使用其他方式显示图片
	// 		console.log(data)
	// 	})
	// 	.catch(error => {
	// 		console.error(error);
	// 	})
})