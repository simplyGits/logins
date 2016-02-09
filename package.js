Package.describe({
	name: 'simply:logins',
	version: '1.0.0',
	summary: 'simple login management',
	git: 'https://github.com/simplyGits/logins',
	documentation: 'README.md',
})

Npm.depends({
	platform: '1.3.1',
})

Package.onUse(function(api) {
	api.versionsFrom('1.2.1')
	api.use([
		'mongo',
		'ecmascript',
		'accounts-base',
	])
	api.use([
		'reactive-var',
		'tracker',
	], 'client')
	api.use([
		'check',
	], 'server')
	api.addFiles('client.js', 'client')
	api.addFiles('server.js', 'server')

	api.export('Logins', 'client')
})
