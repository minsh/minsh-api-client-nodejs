# Minsh API client for Node.js

## Install
 
```shell
$ npm install minsh-api-client --save
```
or 
```shell
$ yarn add minsh-api-client
```

## Usage

```js
const Minsh = require('minsh-api-client');

/* create a new minsh object: first parameter is the `appName` and second one is the datacenter`, which can be either 'us' | 'eu' | 'asia' | 'seoul' */

var M = new Minsh('appName', 'us');

/* login, shout and logout */

(async function() {
  let err, bob, data;

  [err, bob] = await M.login({username: 'bob', password: 'spongebob'});
  if (err) { throw err; }

  [err, data] = await M.createShout({token: bob.token, shout: 'hello world!'});
  if (err) { throw err; }

  [err, data] = await M.logout({token: bob.token});
  if (err) { throw err; }
}());

```

`bob` is now an object containing the user details:

```js
{ id: '5b7e95c0612d5769f6604742',
  username: 'bob',
  profile_image: 'http://www.gravatar.com/avatar/137691fa40af540ea7f19d4a297fd4ce?d=https%3A%2F%2Fmedia-us.min.sh%2Fdefault_profile_230.png',
  online: true,
  last_activity: '2018-08-23T11:08:48.504Z',
  geo: [ 77.5833, 12.9833 ],
  location: 'Bengaluru Karnataka India',
  email: 'bob@minsh.net',
  pn_shout: true,
  pn_event: true,
  pn_sponsor: true,
  pn_like: true,
  pn_mention: true,
  mailing_dm: true,
  mailing_mention: true,
  mailing_event: true,
  mailing_important: true,
  blocked_users: [],
  email_verified: false,
  pending: true,
  shout_read_receipts: [],
  default_profile_image: true,
  token: '0242fe69-79e5-4109-82e2-ff9a8292210b'
 }
```
