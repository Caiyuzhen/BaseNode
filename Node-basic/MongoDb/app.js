/* 
	MongoDB 核心概念
		数据库 database
			是一个数据仓库, 可以创建很多【数据库】, 数据库内可以放很多【集合】

		集合 collection
			类似 JS 中的数组, 可以放很多【文档】

		文档 document
			数据库中的最小单元, 类似 JS 中的对象, 可以放很多【字段（或者叫属性）】


			use ABCDE

	⚡️ 相关命令
		创建数据库
			use ABCDE
				创建集合 (🔥需要有集合才会显示数据库！）
				db.createCollection('Users')

		显示所有数据库
			show dbs

		切换到指定的数据库
			use XXX (如果没有就是新建）

		显示当前所在的数据库
			db

		删除当前的数据库
			use XXX
			db .dropDatabase()
 */