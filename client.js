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

export function subscribe () {
	return Meteor.subscribe('logins')
}

export function all () {
	return logins.find().fetch()
}

export function current () {
	return logins.findOne(currentSessionId.get())
}

export function others () {
	return logins.find({
		_id: { $ne: currentSessionId.get() },
	}).fetch()
}

export function kill (sessionId, callback) {
	Meteor.call('logins_kill', sessionId, function (e, r) {
		callback && callback(e, r)
	})
}
