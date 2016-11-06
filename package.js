Package.describe({
	name: 'simply:logins',
	version: '2.0.0',
	summary: 'simple login management',
	git: 'https://github.com/simplyGits/logins',
	documentation: 'README.md',
})

Npm.depends({
	platform: 'https://github.com/bestiejs/platform.js/archive/3760d12934df6d13a5988268b393822ce84b67d7.tar.gz',
})

Package.onUse(function(api) {
	api.versionsFrom('1.3.2.4')
	api.use([
		'mongo',
		'ecmascript',
		'modules',
		'accounts-base',
	])
	api.use([
		'reactive-var',
		'tracker',
	], 'client')
	api.use([
		'check',
	], 'server')
	api.mainModule('client.js', 'client')
	api.mainModule('server.js', 'server')
})
