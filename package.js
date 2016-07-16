Package.describe({
	name: 'simply:logins',
	version: '1.0.3',
	summary: 'simple login management',
	git: 'https://github.com/simplyGits/logins',
	documentation: 'README.md',
})

Npm.depends({
	platform: 'https://github.com/bestiejs/platform.js/archive/199c8c635182ad06e6322447193b10c123c8dfa5.tar.gz',
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
