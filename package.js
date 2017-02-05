Package.describe({
	name: 'simply:logins',
	version: '2.1.0',
	summary: 'simple login management',
	git: 'https://github.com/simplyGits/logins',
	documentation: 'README.md',
})

Npm.depends({
	platform: 'https://github.com/bestiejs/platform.js/archive/e645a591da5a0ec7992b7af9af38be71ae6f8874.tar.gz',
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
