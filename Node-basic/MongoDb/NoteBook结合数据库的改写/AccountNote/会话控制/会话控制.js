/*
	Why?
		识别用户身份 (为了识别 http 请求方是谁)

	How?
		【Cookie】
			是【保存在浏览器】的一段用户数据
				1. 服务器通过 Set-Cookie 响应头设置 Cookie
				2. 浏览器通过 Cookie 请求头发送 Cookie
				3. 服务器通过 Cookie 请求头获取 Cookie
			
			相对不安全

			影响网络传输效率（因为每次请求都会携带 Cookie, 包括 session）

			限制 4kb

			Cookie 主要用于网页端
		


		【Session】
			是【保存在服务器】的一段用户数据, 可以保存当前访问用户的相关信息(比如用户名、用户 id、权限、验证码、购物车等)
				流程:
					服务器会创建一个 session 对象, 然后将 sessionId 以 cookie 的形式发送到浏览器, 浏览器会保存下来, 下次浏览器将【这段 cookie】发送到服务器时, 服务器会通过这段 cookie 去查询 session 数组, 找到对应的 session, 从而获取用户信息

			相对安全

			网络传输性能更好, 因为每次只通过 cookie 传输 sessionId, 而不是整个 session

			存储在服务器内, 没有限制

			Session 主要用于网页端

			后续前端（网页）会自动发送 cookie （自动把 cookie 放在请求报文中）



		【Token】
			是【服务端】返回给前端的一段加密字符, 让前端识别用户额身份
			
			Token 主要用于移动端 APP

			存储在客户端中, 服务端压力更小

			相对更安全, 数据进行了加密, 可以避免 CSRF（跨站请求伪造）

			扩展性更强, 服务之间可以进行共享, 增加服务节点更简单

			客户端需要手动把 Token 发送给服务端




*/ 