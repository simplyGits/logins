'use strict'

const logins = new Mongo.Collection('logins')
const platform = Npm.require('platform')

Meteor.users.find({
	'profile.firstName': { $ne: '' },
}, {
	fields: {
		_id: 1,
		'services.resume.loginTokens': 1,
	},
}).observe({
	changed(newDoc, oldDoc) {
		const oldTokens = oldDoc.services.resume.loginTokens
		const newTokens = newDoc.services.resume.loginTokens

		const addedLogins = _.difference(newTokens, oldTokens)
		addedLogins.forEach((token) => {
			logins.insert({
				hashedToken: token.hashedToken,
				creation: token.when,
				userId: newDoc._id,
			})
		})

		const removedLogins = _.difference(oldTokens, newTokens)
		removedLogins.forEach((token) => {
			logins.remove({
				hashedToken: token.hashedToken,
			})
		})
	},
})

Meteor.methods({
	'logins_updateLastLogin': function (token) {
		this.unblock()
		check(token, String)
		const hashed = Accounts._hashLoginToken(token)
		const login = logins.findOne({
			hashedToken: hashed,
		})
		if (login == null) {
			throw new Meteor.Error('not-found')
		}

		const userAgent = this.connection.httpHeaders['user-agent']
		logins.update(login._id, {
			$set: {
				lastLogin: {
					ip: this.connection.clientAddress,
					date: new Date(),
					...platform.parse(userAgent),
				},
			},
		})
		return login._id
	},

	'logins_kill': function (id) {
		check(id, String)
		if (this.userId == null) {
			throw new Meteor.Error('not-logged-in')
		}

		const login = logins.findOne(id)
		if (login == null) {
			throw new Meteor.Error('not-found')
		}

		Meteor.users.update(this.userId, {
			$pull: {
				'services.resume.loginTokens': {
					hashedToken: login.hashedToken,
				},
			},
		})
	},
})

Meteor.publish('logins', function () {
	if (!this.userId) {
		this.ready()
		return undefined
	}

	return logins.find({
		userId: this.userId,
	}, {
		fields: {
			hashedToken: 0,
		},
	})
})
