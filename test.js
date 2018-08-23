'use strict';

const Minsh = require('./index');

const config = {
  appName: process.env.appName,
  datacenter: 'asia',
  verbose: false,
  admin: {
    username: process.env.adminUsername,
    password: process.env.adminPassword
  },
  bob: {
    username: 'bob',
    email: 'bob@minsh.net',
    password: 'spongebob'
  }
};

var M = new Minsh(config.appName, 'asia', config.verbose);

(async function() {
  let err, admin, bob, data;

  [err, admin] = await M.login({'username_or_email': config.admin.username, password: config.admin.password});
  if (err) { throw err + ' ' + admin; }

  [err, bob] = await M.adminCreateAccount({token: admin.token, ...config.bob});
  if (err) { throw err + ' ' + admin; }

  /* login with bob */
  [err, bob] = await M.login({'username_or_email': config.bob.username, password: config.bob.password});
  if (err) { throw err + ' ' + admin; }

  /* post shout */
  [err, data] = await M.createShout({token: bob.token, shout: 'hello world!'});
  if (err) { throw err + ' ' + admin; }

  console.log(data);

  /* logout bob */
  [err, data] = await M.logout({token: bob.token});
  if (err) { throw err + ' ' + admin; }

  /* delete bob */
  [err, data] = await M.deleteAccount(bob.id, {token: admin.token});
  if (err) { throw err + ' ' + admin; }

  /* admin logout */
  [err, data] = await M.logout({token: admin.token});
  if (err) { throw err + ' ' + data; }

}());