const btn = document.querySelector('button')
const content = document.querySelector('.content')


btn.addEventListener('click', ()=>{
	fetch('http://localhost:3030/singer/1.html', () =>{
		method: 'GET'
	})
	.then(res => res.json()) //在后端已经转成文本格式了 stringify()
	.then(data => {
		const singleName = data.singer_name
		const singerPic = data.singer_pic
		console.log(data)

		const singleNameDOM = document.createElement('h2')
		singleNameDOM.innerHTML = singleName
		const singlePicDOM = document.createElement('img')
		singlePicDOM.src = singerPic

		content.appendChild(singleNameDOM)
		content.appendChild(singlePicDOM)


	})
	.catch(err => {
		console.log(err)
	})
})

