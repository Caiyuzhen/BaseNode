const btn1 = document.querySelector('#btn-1')



btn1.addEventListener('click', () => {

	// 获取 temp.css
	fetch('http://localhost:7070/temp.css')
		.then(response => response.text()) // 使用.text()方法将响应转换为文本格式
		.then(data => {

			// 在这里处理获取到的CSS内容
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