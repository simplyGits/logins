simply:logins
---
simple login management

```
meteor add simply:logins
```

```JavaScript
import * as logins from 'meteor/simply:logins'
```

# API

The login object:
```JavaScript
{
	hashedToken: String, // The hashed token that Meteor uses for the session for this login
	creation: Date, // The date this login was created
	userId: String, // The id of the owner of this login
	lastLogin: {
		ip: String, // The IP the user last logged in with with this login
		date: Date, // The date the user last logged in on with this login

		// information from platform.js is also inserted here, this varies
		// between the devices that people use so it's not listed here.
		// Take a look at the platform.js documentation for more information.
	},
}
```

## Client

First subscribe to the `'logins'` subscription:

```JavaScript
Meteor.subscribe('logins')
```

`logins.all() -> Login[]`: Returns all the logins of the current user.

`logins.current() -> Login`: Returns the current login of the current user.

`logins.others() -> Logins[]`: Returns all the logins of the current user except the current one.

`logins.kill(loginId: string, callback: (e))`: Kills the login with the given id, callback will be called with an optional error.

## Server

`logins.logins Mongo.Collection<Login>`: The logins collection for all users.
