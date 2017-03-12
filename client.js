'use strict'

const logins = new Mongo.Collection('logins')
const currentLoginId = new ReactiveVar()

Tracker.autorun(function () {
	Meteor.connection._userIdDeps.depend()
	Meteor.defer(function () {
		const token = localStorage.getItem('Meteor.loginToken')
		if (token != null) {
			Meteor.call(
				'logins_updateLastLogin',
				token,
				function (e, r) {
					currentLoginId.set(r)
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
	return logins.findOne(currentLoginId.get())
}

export function others () {
	return logins.find({
		_id: { $ne: currentLoginId.get() },
	}).fetch()
}

export function kill (loginId, callback) {
	Meteor.call('logins_kill', loginId, function (e, r) {
		callback && callback(e, r)
	})
}
