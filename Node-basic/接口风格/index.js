/* 
	Restful 风格 API (类似一种规范)
		What?
			表示一种特殊风格的接口
				1.url 路径表示资源, 路径中不能有动词(比如 create, delete, update), 都是名词
				2.操作资源要跟 HTTP 方法对应(比如 POSt、DELETE、PUT、GET 请求类型来代表 新增、删除、修改、查询)) 
				3.操作资源的结果跟 HTTP 状态码对应(比如 200、404、403、500)
			
			
	json-server
		What?
			一个 Restful 风格的接口的包
				npm i json-server

	How?
	需要以 json 所在的文件夹为工作目录, 执行如下命令
		json-server --watch db.json	
*/
