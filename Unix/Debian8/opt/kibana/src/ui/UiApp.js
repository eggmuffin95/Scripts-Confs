'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _ = require('lodash');

var _require = require('path');

var join = _require.join;

var autoload = require('./autoload');

var UiApp = (function () {
  function UiApp(uiExports, spec) {
    _classCallCheck(this, UiApp);

    this.uiExports = uiExports;
    this.spec = spec || {};

    this.id = this.spec.id;
    if (!this.id) {
      throw new Error('Every app must specify it\'s id');
    }

    this.main = this.spec.main;
    this.title = this.spec.title;
    this.description = this.spec.description;
    this.icon = this.spec.icon;
    this.hidden = this.spec.hidden;
    this.autoloadOverrides = this.spec.autoload;
    this.templateName = this.spec.templateName || 'uiApp';
    this.url = '' + (spec.urlBasePath || '') + (this.spec.url || '/app/' + this.id);

    // once this resolves, no reason to run it again
    this.getModules = _.once(this.getModules);

    // variables that are injected into the browser, must serialize to JSON
    this.getInjectedVars = this.spec.injectVars || _.noop;
  }

  _createClass(UiApp, [{
    key: 'getModules',
    value: function getModules() {
      return _.chain([this.autoloadOverrides || autoload.require, this.uiExports.find(_.get(this, 'spec.uses', []))]).flatten().uniq().unshift(this.main).value();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return _.pick(this, ['id', 'title', 'description', 'icon', 'main', 'url']);
    }
  }]);

  return UiApp;
})();

module.exports = UiApp;
