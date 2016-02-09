'use strict'

const logins = new Mongo.Collection('logins')
const currentSessionId = new ReactiveVar()

Tracker.autorun(function () {
	Meteor.connection._userIdDeps.depend()
	Meteor.defer(function () {
		const token = localStorage.getItem('Meteor.loginToken')
		if (token != null) {
			Meteor.call(
				'logins_updateLastLogin',
				token,
				function (e, r) {
					currentSessionId.set(r)
				}
			)
		}
	})
})

Tracker.autorun(function () {
	if (Meteor.userId() != null) {
		Meteor.subscribe('logins')
	}
})

Logins = {
	all() {
		return logins.find().fetch()
	},
	current() {
		return logins.findOne(currentSessionId.get())
	},
	others() {
		return logins.find({
			_id: { $ne: currentSessionId.get() },
		}).fetch()
	},
	kill(sessionId, callback) {
		Meteor.call('logins_kill', sessionId, function (e, r) {
			callback && callback(e, r)
		})
	},
}
