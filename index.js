'use strict';

const axios = require('axios');

const apiVersion = 8;

class Minsh {
  constructor(appName, datacenter, verbose = false) {
    this.appName = appName;
    this.datacenter = datacenter;
    this.verbose = verbose;

    this.endpoint = 'https://api' + apiVersion;
    ['eu', 'us', 'seoul'].some(f => {
      if (this.datacenter === f) {
        this.endpoint += '-' + f;
        return true;
      }
    })
    this.endpoint += '.min.sh/' + this.appName + '/';
  }

  async r(method, query, params) {
    this.verbose && console.log(method.toUpperCase(), query, params);
    try {
      let res;
      if (method === 'delete') {
        res = await axios({method: 'delete', url: this.endpoint + query, data: params});
      } else {
        res = await axios[method](this.endpoint + query, params);
      }
      return [null, res.data];
    } catch(err) {
      return [err.response.status, err.response.data];
    }

  }

  async adminCreateAccount(params) { return this.r('post', 'admin/user', params); }
  async createAccount(params) { return this.r('post', 'users', params); }
  async createShout(params) { return this.r('post', 'shouts', params); }
  async login(params) { return this.r('put', 'users/login', params); }
  async logout(params) { return this.r('put', 'users/logout', params); }
  async deleteAccount(id, params) { return this.r('delete', 'users/' + id, params); }

}

module.exports = Minsh;