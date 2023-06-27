/*
	Why?
		识别用户身份 (为了识别 http 请求方是谁)

	How?
		Cookie
			1. 服务器通过 Set-Cookie 响应头设置 Cookie
			2. 浏览器通过 Cookie 请求头发送 Cookie
			3. 服务器通过 Cookie 请求头获取 Cookie
		
		Session
			是【保存在服务器】的一段用户数据, 可以保存当前访问用户的相关信息(比如用户名、用户 id、权限、验证码、购物车等)
				流程:
					服务器会创建一个 session 对象, 然后将 sessionId 以 cookie 的形式发送到浏览器, 浏览器会保存下来, 下次浏览器将【这段 cookie】发送到服务器时, 服务器会通过这段 cookie 去查询 session 数组, 找到对应的 session, 从而获取用户信息

		token

*/ 