import { toPromise, isRemote } from 'pouchdb-utils';
import * as http from './adapters/http/index';
import * as local from './adapters/local/index';

var plugin = {};
plugin.createIndex = toPromise(function (requestDef, callback) {

  if (typeof requestDef !== 'object') {
    return callback(new Error('you must provide an index to create'));
  }

  var createIndex = isRemote(this) ?
    http.createIndex : local.createIndex;
  createIndex(this, requestDef, callback);
});

plugin.find = toPromise(function (requestDef, callback) {

  if (typeof callback === 'undefined') {
    callback = requestDef;
    requestDef = undefined;
  }

  if (typeof requestDef !== 'object') {
    return callback(new Error('you must provide search parameters to find()'));
  }

  var find = isRemote(this) ? http.find : local.find;
  find(this, requestDef, callback);
});

plugin.explain = toPromise(function (requestDef, callback) {

  if (typeof callback === 'undefined') {
    callback = requestDef;
    requestDef = undefined;
  }

  if (typeof requestDef !== 'object') {
    return callback(new Error('you must provide search parameters to explain()'));
  }

  var find = isRemote(this) ? http.explain : local.explain;
  find(this, requestDef, callback);
});

plugin.getIndexes = toPromise(function (callback) {

  var getIndexes = isRemote(this) ? http.getIndexes : local.getIndexes;
  getIndexes(this, callback);
});

plugin.deleteIndex = toPromise(function (indexDef, callback) {

  if (typeof indexDef !== 'object') {
    return callback(new Error('you must provide an index to delete'));
  }

  var deleteIndex = isRemote(this) ?
    http.deleteIndex : local.deleteIndex;
  deleteIndex(this, indexDef, callback);
});

export default plugin;
