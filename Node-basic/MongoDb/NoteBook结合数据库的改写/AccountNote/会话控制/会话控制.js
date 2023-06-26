/*
	Why?
		为了识别 http 请求方是谁

	How?
		Cookie
			1. 服务器通过 Set-Cookie 响应头设置 Cookie
			2. 浏览器通过 Cookie 请求头发送 Cookie
			3. 服务器通过 Cookie 请求头获取 Cookie
		Session

		token

*/ 