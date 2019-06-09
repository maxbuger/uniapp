(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "./node_modules/@dcloudio/uni-app-plus/dist/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-app-plus/dist/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var SYNC_API_RE = /subNVue|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      Promise.prototype.finally = function (callback) {
        var promise = this.constructor;
        return this.then(
        function (value) {return promise.resolve(callback()).then(function () {return value;});},
        function (reason) {return promise.resolve(callback()).then(function () {
            throw reason;
          });});

      };
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var protocols = {};
var todos = [];
var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("app-plus ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("app-plus \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var returnValue = wx[options.name || methodName](arg1, arg2);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

function wrapper$1(webview) {
  webview.$processed = true;
  if (!webview.__uniapp_mask_id) {
    return;
  }
  var maskColor = webview.__uniapp_mask;
  var maskWebview = plus.webview.getWebviewById(webview.__uniapp_mask_id);
  var oldShow = webview.show;
  var oldHide = webview.hide;
  var oldClose = webview.close;

  var showMask = function showMask() {
    maskWebview.setStyle({
      mask: maskColor });

  };
  var closeMask = function closeMask() {
    maskWebview.setStyle({
      mask: 'none' });

  };
  webview.show = function () {
    showMask();for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}
    return oldShow.apply(webview, args);
  };
  webview.hide = function () {
    closeMask();for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
    return oldHide.apply(webview, args);
  };
  webview.close = function () {
    closeMask();
    callbacks = [];for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
    return oldClose.apply(webview, args);
  };
  webview.postMessage = function (data) {
    plus.webview.postMessageToUniNView({
      type: 'UniAppSubNVue',
      data: data,
      options: {
        id: webview.id } },

    webview.id);
  };
  var callbacks = [];
  webview.onMessage = function (callback) {
    callbacks.push(callback);
  };
  webview.$consumeMessage = function (e) {
    callbacks.forEach(function (callback) {return callback(e);});
  };
}

var subNVue = {
  getSubNVueById: function getSubNVueById(id) {
    var webview = plus.webview.getWebviewById(id);
    if (webview && !webview.$processed) {
      wrapper$1(webview);
    }
    return webview;
  } };


function requireNativePlugin(pluginName) {
  /* eslint-disable no-undef */
  if (typeof weex !== 'undefined') {
    return weex.requireModule(pluginName);
  }
  /* eslint-disable no-undef */
  return __requireNativePlugin__(pluginName);
}

var api = /*#__PURE__*/Object.freeze({
  requireNativePlugin: requireNativePlugin,
  subNVue: subNVue });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {args[_key5 - 1] = arguments[_key5];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function initBehavior(options) {
  return Behavior(options);
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}
function triggerLink(mpInstance, vueOptions) {
  mpInstance.triggerEvent('__l', mpInstance.$vm || vueOptions, {
    bubbles: true,
    composed: true });

}

function handleLink(event) {
  if (event.detail.$mp) {// vm
    if (!event.detail.$parent) {
      event.detail.$parent = this.$vm;
      event.detail.$parent.$children.push(event.detail);

      event.detail.$root = this.$vm.$root;
    }
  } else {// vueOptions
    if (!event.detail.parent) {
      event.detail.parent = this.$vm;
    }
  }
}

function initPage$1(pageOptions) {
  return initComponent$1(pageOptions);
}

function initComponent$1(componentOptions) {
  componentOptions.methods.$getAppWebview = function () {
    return plus.webview.getWebviewById("".concat(this.__wxWebviewId__));
  };
  return Component(componentOptions);
}

function initMocks(vm, mocks$$1) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks$$1.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks(mpOptions, hooks) {
  hooks.forEach(function (hook) {
    mpOptions[hook] = function (args) {
      return this.$vm.__call_hook(hook, args);
    };
  });
}

function getData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"app-plus","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function getBehaviors(vueOptions) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = String;
          vueProps['value'] = null;
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: getProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: getProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function getProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$2(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function handleEvent(event) {var _this = this;
  event = wrapper$2(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && eventType === type) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handler = _this.$vm[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(_this.$vm, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

var hooks = [
'onHide',
'onError',
'onPageNotFound',
'onUniNViewMessage'];


function initVm(vm) {
  if (this.$vm) {// 百度竟然 onShow 在 onLaunch 之前？
    return;
  }

  this.$vm = vm;

  this.$vm.$mp = {
    app: this };

}

function createApp(vm) {

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    },
    created: function created() {// 处理 injections
      this.__init_injections(this);
      this.__init_provide(this);
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      initVm.call(this, vm);

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');

      this.$vm.__call_hook('onLaunch', args);
    },
    onShow: function onShow(args) {
      initVm.call(this, vm);

      this.$vm.__call_hook('onShow', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks); // 延迟执行，因为 App 的注册在 main.js 之前，可能导致生命周期内 Vue 原型上开发者注册的属性无法访问

  App(appOptions);

  return vm;
}

var hooks$1 = [
'onShow',
'onHide',
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap',
'onBackPress',
'onNavigationBarButtonTap',
'onNavigationBarSearchInputChanged',
'onNavigationBarSearchInputConfirmed',
'onNavigationBarSearchInputClicked'];


function initVm$1(VueComponent) {// 百度的 onLoad 触发在 attached 之前
  if (this.$vm) {
    return;
  }

  this.$vm = new VueComponent({
    mpType: 'page',
    mpInstance: this });


  this.$vm.__call_hook('created');
  this.$vm.$mount();
}

function createPage(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = _vue.default.extend(vueOptions);
  }
  var pageOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    lifetimes: { // 当页面作为组件时
      attached: function attached() {
        initVm$1.call(this, VueComponent);
      },
      ready: function ready() {
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    methods: { // 作为页面时
      onLoad: function onLoad(args) {
        initVm$1.call(this, VueComponent);
        this.$vm.$mp.query = args; // 又要兼容 mpvue
        this.$vm.__call_hook('onLoad', args); // 开发者可能会在 onLoad 时赋值，提前到 mount 之前
      },
      onUnload: function onUnload() {
        this.$vm.__call_hook('onUnload');
      },
      __e: handleEvent,
      __l: handleLink } };



  initHooks(pageOptions.methods, hooks$1);

  return initPage$1(pageOptions, vueOptions);
}

function initVm$2(VueComponent) {
  if (this.$vm) {
    return;
  }

  var properties = this.properties;

  var options = {
    mpType: 'component',
    mpInstance: this,
    propsData: properties };

  // 初始化 vue 实例
  this.$vm = new VueComponent(options);

  // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
  var vueSlots = properties.vueSlots;
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    this.$vm.$scopedSlots = this.$vm.$slots = $slots;
  }
  // 性能优先，mount 提前到 attached 中，保证组件首次渲染数据被合并
  // 导致与标准 Vue 的差异，data 和 computed 中不能使用$parent，provide等组件属性
  this.$vm.$mount();
}

function createComponent(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;

  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions; // TODO form-field props.name,props.value
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = _vue.default.extend(vueOptions);
  }

  var behaviors = getBehaviors(vueOptions);

  var properties = getProperties(vueOptions.props, false, vueOptions.__file);

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    behaviors: behaviors,
    properties: properties,
    lifetimes: {
      attached: function attached() {
        initVm$2.call(this, VueComponent);
      },
      ready: function ready() {
        initVm$2.call(this, VueComponent); // 目前发现部分情况小程序 attached 不触发
        triggerLink(this); // 处理 parent,children

        // 补充生命周期
        this.$vm.__call_hook('created');
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __e: handleEvent,
      __l: handleLink } };



  return initComponent$1(componentOptions, vueOptions);
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          !vm._getFormData && warn(//fixed by xxxxxx uni://form-field 时不告警
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"app-plus","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"app-plus","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"app-plus","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
    // 确保当前 vm 所有数据被同步
    var dataKeys = [].concat(
        Object.keys(vm._data || {}),
        Object.keys(vm._computedWatchers || {}));

    var ret = dataKeys.reduce(function(ret, key) {
        ret[key] = vm[key];
        return ret
    }, Object.create(null));
    //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
    Object.assign(ret, vm.$mp.data || {});
    if (
        Array.isArray(vm.$options.behaviors) &&
        vm.$options.behaviors.indexOf('uni://form-field') !== -1
    ) { //form-field
        ret['name'] = vm.name;
        ret['value'] = vm.value;
    }
    return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
    var this$1 = this;

    if (vnode === null) { //destroy
        return
    }
    if (this.mpType === 'page' || this.mpType === 'component') {
        var mpInstance = this.$scope;
        var data = cloneWithData(this);
        data.__webviewId__ = mpInstance.data.__webviewId__;
        var mpData = Object.create(null);
        Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
            mpData[key] = mpInstance.data[key];
        });
        var diffData = diff(data, mpData);
        if (Object.keys(diffData).length) {
            if (Object({"VUE_APP_PLATFORM":"app-plus","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
                console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
                    ']差量更新',
                    JSON.stringify(diffData));
            }
            this.__next_tick_pending = true;
            mpInstance.setData(diffData, function () {
                this$1.__next_tick_pending = false;
                flushCallbacks$1(this$1);
            });
        } else {
            flushCallbacks$1(this);
        }
    }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
    var parts = path.split('.');
    var key = parts[0];
    if (key.indexOf('__$n') === 0) { //number index
        key = parseInt(key.replace('__$n', ''));
    }
    if (parts.length === 1) {
        return obj[key]
    }
    return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

    var oldEmit = Vue.prototype.$emit;

    Vue.prototype.$emit = function(event) {
        if (this.$scope && event) {
            this.$scope['triggerEvent'](event, {
                __args__: toArray(arguments, 1)
            });
        }
        return oldEmit.apply(this, arguments)
    };
    
    Vue.prototype.$nextTick = function (fn) {
      return nextTick$1(this, fn)
    };

    MP_METHODS.forEach(function (method) {
        Vue.prototype[method] = function(args) {
            if (this.$scope) {
                return this.$scope[method](args)
            }
        };
    });

    Vue.prototype.__init_provide = initProvide;

    Vue.prototype.__init_injections = initInjections;

    Vue.prototype.__call_hook = function(hook, args) {
        var vm = this;
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget();
        var handlers = vm.$options[hook];
        var info = hook + " hook";
        var ret;
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit('hook:' + hook);
        }
        popTarget();
        return ret
    };

    Vue.prototype.__set_model = function(target, key, value, modifiers) {
        if (Array.isArray(modifiers)) {
            if (modifiers.indexOf('trim') !== -1) {
                value = value.trim();
            }
            if (modifiers.indexOf('number') !== -1) {
                value = this._n(value);
            }
        }
        target[key] = value;
    };

    Vue.prototype.__set_sync = function(target, key, value) {
        target[key] = value;
    };

    Vue.prototype.__get_orig = function(item) {
        if (isPlainObject(item)) {
            return item['$orig'] || item
        }
        return item
    };

    Vue.prototype.__get_value = function(dataPath, target) {
        return getTarget(target || this, dataPath)
    };


    Vue.prototype.__get_class = function(dynamicClass, staticClass) {
        return renderClass(staticClass, dynamicClass)
    };

    Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
        if (!dynamicStyle && !staticStyle) {
            return ''
        }
        var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
        var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
        return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
    };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\js_sdk\\chimee\\chimee-mobile-player.browser.js":
/*!********************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/js_sdk/chimee/chimee-mobile-player.browser.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
/** chimeeMobilePlayer
               * chimee-mobile-player v0.2.8
               * (c) 2017-2018 yandeqiang
               * Released under MIT
               */

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
})(void 0, function () {'use strict';

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function _defined(it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // 7.1.13 ToObject(argument)

  var _toObject = function _toObject(it) {
    return Object(_defined(it));
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function _has(it, key) {
    return hasOwnProperty.call(it, key);
  };

  var _global = createCommonjsModule(function (module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ?
    window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});
  var _shared = function _shared(key) {
    return store[key] || (store[key] = {});
  };

  var id = 0;
  var px = Math.random();
  var _uid = function _uid(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var shared = _shared('keys');

  var _sharedKey = function _sharedKey(key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


  var IE_PROTO = _sharedKey('IE_PROTO');
  var ObjectProto = Object.prototype;

  var _objectGpo = Object.getPrototypeOf || function (O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    }return O instanceof Object ? ObjectProto : null;
  };

  var _core = createCommonjsModule(function (module) {
    var core = module.exports = { version: '2.5.3' };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _aFunction = function _aFunction(it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

  var _ctx = function _ctx(fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:return function (a) {
          return fn.call(that, a);
        };
      case 2:return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:return function (a, b, c) {
          return fn.call(that, a, b, c);
        };}

    return function () /* ...args */{
      return fn.apply(that, arguments);
    };
  };

  var _isObject = function _isObject(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject = function _anObject(it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails = function _fails(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', { get: function get() {return 7;} }).a != 7;
  });

  var document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  var is = _isObject(document$1) && _isObject(document$1.createElement);
  var _domCreate = function _domCreate(it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', { get: function get() {return 7;} }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive = function _toPrimitive(it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;

  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) {/* empty */}
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp = {
    f: f };


  var _propertyDesc = function _propertyDesc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value };

  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var PROTOTYPE = 'prototype';

  var $export = function $export(type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var IS_WRAP = type & $export.W;
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE];
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
    var key, own, out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      if (own && key in exports) continue;
      // export native or passed
      out = own ? target[key] : source[key];
      // prevent global pollution for namespaces
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
      // bind timers to global for call from export context
      : IS_BIND && own ? _ctx(out, _global)
      // wrap global constructors for prevent change them in library
      : IS_WRAP && target[key] == out ? function (C) {
        var F = function F(a, b, c) {
          if (this instanceof C) {
            switch (arguments.length) {
              case 0:return new C();
              case 1:return new C(a);
              case 2:return new C(a, b);}
            return new C(a, b, c);
          }return C.apply(this, arguments);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
        // make static versions for prototype methods
      }(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
      // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
      if (IS_PROTO) {
        (exports.virtual || (exports.virtual = {}))[key] = out;
        // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
        if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
      }
    }
  };
  // type bitmap
  $export.F = 1; // forced
  $export.G = 2; // global
  $export.S = 4; // static
  $export.P = 8; // proto
  $export.B = 16; // bind
  $export.W = 32; // wrap
  $export.U = 64; // safe
  $export.R = 128; // real proto method for `library`
  var _export = $export;

  // most Object methods by ES6 should accept primitives



  var _objectSap = function _objectSap(KEY, exec) {
    var fn = (_core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    _export(_export.S + _export.F * _fails(function () {fn(1);}), 'Object', exp);
  };

  // 19.1.2.9 Object.getPrototypeOf(O)



  _objectSap('getPrototypeOf', function () {
    return function getPrototypeOf(it) {
      return _objectGpo(_toObject(it));
    };
  });

  var getPrototypeOf = _core.Object.getPrototypeOf;

  var getPrototypeOf$1 = createCommonjsModule(function (module) {
    module.exports = { "default": getPrototypeOf, __esModule: true };
  });

  var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$1);

  var classCallCheck = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;

    exports.default = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };
  });

  var _classCallCheck = unwrapExports(classCallCheck);

  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  _export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

  var $Object = _core.Object;
  var defineProperty = function defineProperty(it, key, desc) {
    return $Object.defineProperty(it, key, desc);
  };

  var defineProperty$1 = createCommonjsModule(function (module) {
    module.exports = { "default": defineProperty, __esModule: true };
  });

  var _Object$defineProperty = unwrapExports(defineProperty$1);

  var createClass = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    var _defineProperty2 = _interopRequireDefault(defineProperty$1);

    function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

    exports.default = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          (0, _defineProperty2.default)(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
  });

  var _createClass = unwrapExports(createClass);

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function _toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // true  -> String#at
  // false -> String#codePointAt
  var _stringAt = function _stringAt(TO_STRING) {
    return function (that, pos) {
      var s = String(_defined(that));
      var i = _toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ?
      TO_STRING ? s.charAt(i) : a :
      TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var _library = true;

  var _redefine = _hide;

  var _iterators = {};

  var toString = {}.toString;

  var _cof = function _cof(it) {
    return toString.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject = function _toIobject(it) {
    return _iobject(_defined(it));
  };

  // 7.1.15 ToLength

  var min = Math.min;
  var _toLength = function _toLength(it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;
  var _toAbsoluteIndex = function _toAbsoluteIndex(index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes



  var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {if (IS_INCLUDES || index in O) {
          if (O[index] === el) return IS_INCLUDES || index || 0;
        }}return !IS_INCLUDES && -1;
    };
  };

  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO$1 = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function _objectKeysInternal(object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) {if (key != IE_PROTO$1) _has(O, key) && result.push(key);}
    // Don't enum bug & hidden keys
    while (names.length > i) {if (_has(O, key = names[i++])) {
        ~arrayIndexOf(result, key) || result.push(key);
      }}
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys =
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.
  split(',');

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);
    var keys = _objectKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) {_objectDp.f(O, P = keys[i++], Properties[P]);}
    return O;
  };

  var document$2 = _global.document;
  var _html = document$2 && document$2.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



  var IE_PROTO$2 = _sharedKey('IE_PROTO');
  var Empty = function Empty() {/* empty */};
  var PROTOTYPE$1 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var _createDict = function createDict() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate('iframe');
    var i = _enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    _createDict = iframeDocument.F;
    while (i--) {delete _createDict[PROTOTYPE$1][_enumBugKeys[i]];}
    return _createDict();
  };

  var _objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE$1] = _anObject(O);
      result = new Empty();
      Empty[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$2] = O;
    } else result = _createDict();
    return Properties === undefined ? result : _objectDps(result, Properties);
  };

  var _wks = createCommonjsModule(function (module) {
    var store = _shared('wks');

    var Symbol = _global.Symbol;
    var USE_SYMBOL = typeof Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
    };

    $exports.store = store;
  });

  var def = _objectDp.f;

  var TAG = _wks('toStringTag');

  var _setToStringTag = function _setToStringTag(it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
  };

  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype, _wks('iterator'), function () {return this;});

  var _iterCreate = function _iterCreate(Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
    _setToStringTag(Constructor, NAME + ' Iterator');
  };

  var ITERATOR = _wks('iterator');
  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function returnThis() {return this;};

  var _iterDefine = function _iterDefine(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);
    var getMethod = function getMethod(kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS:return function keys() {return new Constructor(this, kind);};
        case VALUES:return function values() {return new Constructor(this, kind);};}
      return function entries() {return new Constructor(this, kind);};
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = !BUGGY && $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (!_library && !_has(IteratorPrototype, ITERATOR)) _hide(IteratorPrototype, ITERATOR, returnThis);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() {return $native.call(this);};
    }
    // Define iterator
    if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      _hide(proto, ITERATOR, $default);
    }
    // Plug for library
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries };

      if (FORCED) for (key in methods) {
        if (!(key in proto)) _redefine(proto, key, methods[key]);
      } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  var $at = _stringAt(true);

  // 21.1.3.27 String.prototype[@@iterator]()
  _iterDefine(String, 'String', function (iterated) {
    this._t = String(iterated); // target
    this._i = 0; // next index
    // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return { value: undefined, done: true };
    point = $at(O, index);
    this._i += point.length;
    return { value: point, done: false };
  });

  var _iterStep = function _iterStep(done, value) {
    return { value: value, done: !!done };
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject(iterated); // target
    this._i = 0; // next index
    this._k = kind; // kind
    // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep(1);
    }
    if (kind == 'keys') return _iterStep(0, index);
    if (kind == 'values') return _iterStep(0, O[index]);
    return _iterStep(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators.Arguments = _iterators.Array;

  var TO_STRING_TAG = _wks('toStringTag');

  var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

  for (var i = 0; i < DOMIterables.length; i++) {
    var NAME = DOMIterables[i];
    var Collection = _global[NAME];
    var proto = Collection && Collection.prototype;
    if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
    _iterators[NAME] = _iterators.Array;
  }

  var f$1 = _wks;

  var _wksExt = {
    f: f$1 };


  var iterator = _wksExt.f('iterator');

  var iterator$1 = createCommonjsModule(function (module) {
    module.exports = { "default": iterator, __esModule: true };
  });

  unwrapExports(iterator$1);

  var _meta = createCommonjsModule(function (module) {
    var META = _uid('meta');


    var setDesc = _objectDp.f;
    var id = 0;
    var isExtensible = Object.isExtensible || function () {
      return true;
    };
    var FREEZE = !_fails(function () {
      return isExtensible(Object.preventExtensions({}));
    });
    var setMeta = function setMeta(it) {
      setDesc(it, META, { value: {
          i: 'O' + ++id, // object ID
          w: {} // weak collections IDs
        } });
    };
    var fastKey = function fastKey(it, create) {
      // return primitive with prefix
      if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
      if (!_has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F';
        // not necessary to add metadata
        if (!create) return 'E';
        // add missing metadata
        setMeta(it);
        // return object ID
      }return it[META].i;
    };
    var getWeak = function getWeak(it, create) {
      if (!_has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMeta(it);
        // return hash weak collections IDs
      }return it[META].w;
    };
    // add metadata on freeze-family methods calling
    var onFreeze = function onFreeze(it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
      return it;
    };
    var meta = module.exports = {
      KEY: META,
      NEED: false,
      fastKey: fastKey,
      getWeak: getWeak,
      onFreeze: onFreeze };

  });
  var _meta_1 = _meta.KEY;
  var _meta_2 = _meta.NEED;
  var _meta_3 = _meta.fastKey;
  var _meta_4 = _meta.getWeak;
  var _meta_5 = _meta.onFreeze;

  var defineProperty$2 = _objectDp.f;
  var _wksDefine = function _wksDefine(name) {
    var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$2($Symbol, name, { value: _wksExt.f(name) });
  };

  var f$2 = Object.getOwnPropertySymbols;

  var _objectGops = {
    f: f$2 };


  var f$3 = {}.propertyIsEnumerable;

  var _objectPie = {
    f: f$3 };


  // all enumerable object keys, includes symbols



  var _enumKeys = function _enumKeys(it) {
    var result = _objectKeys(it);
    var getSymbols = _objectGops.f;
    if (getSymbols) {
      var symbols = getSymbols(it);
      var isEnum = _objectPie.f;
      var i = 0;
      var key;
      while (symbols.length > i) {if (isEnum.call(it, key = symbols[i++])) result.push(key);}
    }return result;
  };

  // 7.2.2 IsArray(argument)

  var _isArray = Array.isArray || function isArray(arg) {
    return _cof(arg) == 'Array';
  };

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

  var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return _objectKeysInternal(O, hiddenKeys);
  };

  var _objectGopn = {
    f: f$4 };


  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

  var gOPN = _objectGopn.f;
  var toString$1 = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ?
  Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function getWindowNames(it) {
    try {
      return gOPN(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  var f$5 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
  };

  var _objectGopnExt = {
    f: f$5 };


  var gOPD = Object.getOwnPropertyDescriptor;

  var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
    O = _toIobject(O);
    P = _toPrimitive(P, true);
    if (_ie8DomDefine) try {
      return gOPD(O, P);
    } catch (e) {/* empty */}
    if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
  };

  var _objectGopd = {
    f: f$6 };


  // ECMAScript 6 symbols shim





  var META = _meta.KEY;



















  var gOPD$1 = _objectGopd.f;
  var dP$1 = _objectDp.f;
  var gOPN$1 = _objectGopnExt.f;
  var $Symbol = _global.Symbol;
  var $JSON = _global.JSON;
  var _stringify = $JSON && $JSON.stringify;
  var PROTOTYPE$2 = 'prototype';
  var HIDDEN = _wks('_hidden');
  var TO_PRIMITIVE = _wks('toPrimitive');
  var isEnum = {}.propertyIsEnumerable;
  var SymbolRegistry = _shared('symbol-registry');
  var AllSymbols = _shared('symbols');
  var OPSymbols = _shared('op-symbols');
  var ObjectProto$1 = Object[PROTOTYPE$2];
  var USE_NATIVE = typeof $Symbol == 'function';
  var QObject = _global.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDesc = _descriptors && _fails(function () {
    return _objectCreate(dP$1({}, 'a', {
      get: function get() {return dP$1(this, 'a', { value: 7 }).a;} })).
    a != 7;
  }) ? function (it, key, D) {
    var protoDesc = gOPD$1(ObjectProto$1, key);
    if (protoDesc) delete ObjectProto$1[key];
    dP$1(it, key, D);
    if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
  } : dP$1;

  var wrap = function wrap(tag) {
    var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
    sym._k = tag;
    return sym;
  };

  var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return it instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
    _anObject(it);
    key = _toPrimitive(key, true);
    _anObject(D);
    if (_has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
      }return setSymbolDesc(it, key, D);
    }return dP$1(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P) {
    _anObject(it);
    var keys = _enumKeys(P = _toIobject(P));
    var i = 0;
    var l = keys.length;
    var key;
    while (l > i) {$defineProperty(it, key = keys[i++], P[key]);}
    return it;
  };
  var $create = function create(it, P) {
    return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key = _toPrimitive(key, true));
    if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
    return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = _toIobject(it);
    key = _toPrimitive(key, true);
    if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
    var D = gOPD$1(it, key);
    if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN$1(_toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    }return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto$1;
    var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
    }return result;
  };

  // 19.4.1.1 Symbol([description])
  if (!USE_NATIVE) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
      var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
      var $set = function $set(value) {
        if (this === ObjectProto$1) $set.call(OPSymbols, value);
        if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, _propertyDesc(1, value));
      };
      if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
      return wrap(tag);
    };
    _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
      return this._k;
    });

    _objectGopd.f = $getOwnPropertyDescriptor;
    _objectDp.f = $defineProperty;
    _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
    _objectPie.f = $propertyIsEnumerable;
    _objectGops.f = $getOwnPropertySymbols;

    if (_descriptors && !_library) {
      _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    _wksExt.f = function (name) {
      return wrap(_wks(name));
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

  for (var es6Symbols =
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.
  split(','), j = 0; es6Symbols.length > j;) {_wks(es6Symbols[j++]);}

  for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) {_wksDefine(wellKnownSymbols[k++]);}

  _export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    'for': function _for(key) {
      return _has(SymbolRegistry, key += '') ?
      SymbolRegistry[key] :
      SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
      for (var key in SymbolRegistry) {if (SymbolRegistry[key] === sym) return key;}
    },
    useSetter: function useSetter() {setter = true;},
    useSimple: function useSimple() {setter = false;} });


  _export(_export.S + _export.F * !USE_NATIVE, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols });


  // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
    var S = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    // WebKit converts symbol values to JSON as null
    // V8 throws on boxed symbols
    return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
  })), 'JSON', {
    stringify: function stringify(it) {
      var args = [it];
      var i = 1;
      var replacer, $replacer;
      while (arguments.length > i) {args.push(arguments[i++]);}
      $replacer = replacer = args[1];
      if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!_isArray(replacer)) replacer = function replacer(key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return _stringify.apply($JSON, args);
    } });


  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
  $Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  _setToStringTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  _setToStringTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  _setToStringTag(_global.JSON, 'JSON', true);

  _wksDefine('asyncIterator');

  _wksDefine('observable');

  var symbol = _core.Symbol;

  var symbol$1 = createCommonjsModule(function (module) {
    module.exports = { "default": symbol, __esModule: true };
  });

  unwrapExports(symbol$1);

  var _typeof_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    var _iterator2 = _interopRequireDefault(iterator$1);



    var _symbol2 = _interopRequireDefault(symbol$1);

    var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj;};

    function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

    exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof(obj);
    } : function (obj) {
      return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
    };
  });

  var _typeof = unwrapExports(_typeof_1);

  var possibleConstructorReturn = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    var _typeof3 = _interopRequireDefault(_typeof_1);

    function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

    exports.default = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
    };
  });

  var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */


  var check = function check(O, proto) {
    _anObject(O);
    if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  var _setProto = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {buggy = true;}
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;else
        set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check };


  // 19.1.3.19 Object.setPrototypeOf(O, proto)

  _export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

  var setPrototypeOf = _core.Object.setPrototypeOf;

  var setPrototypeOf$1 = createCommonjsModule(function (module) {
    module.exports = { "default": setPrototypeOf, __esModule: true };
  });

  unwrapExports(setPrototypeOf$1);

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  _export(_export.S, 'Object', { create: _objectCreate });

  var $Object$1 = _core.Object;
  var create = function create(P, D) {
    return $Object$1.create(P, D);
  };

  var create$1 = createCommonjsModule(function (module) {
    module.exports = { "default": create, __esModule: true };
  });

  var _Object$create = unwrapExports(create$1);

  var inherits = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf$1);



    var _create2 = _interopRequireDefault(create$1);



    var _typeof3 = _interopRequireDefault(_typeof_1);

    function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

    exports.default = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
      }

      subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true } });


      if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
    };
  });

  var _inherits = unwrapExports(inherits);

  // 19.1.2.14 Object.keys(O)



  _objectSap('keys', function () {
    return function keys(it) {
      return _objectKeys(_toObject(it));
    };
  });

  var keys = _core.Object.keys;

  var keys$1 = createCommonjsModule(function (module) {
    module.exports = { "default": keys, __esModule: true };
  });

  var _Object$keys = unwrapExports(keys$1);

  // 20.1.2.3 Number.isInteger(number)

  var floor$1 = Math.floor;
  var _isInteger = function isInteger(it) {
    return !_isObject(it) && isFinite(it) && floor$1(it) === it;
  };

  // 20.1.2.3 Number.isInteger(number)


  _export(_export.S, 'Number', { isInteger: _isInteger });

  var isInteger = _core.Number.isInteger;

  var isInteger$1 = createCommonjsModule(function (module) {
    module.exports = { "default": isInteger, __esModule: true };
  });

  var _Number$isInteger = unwrapExports(isInteger$1);

  var _stringWs = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
  "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

  var space = '[' + _stringWs + ']';
  var non = "\u200B\x85";
  var ltrim = RegExp('^' + space + space + '*');
  var rtrim = RegExp(space + space + '*$');

  var exporter = function exporter(KEY, exec, ALIAS) {
    var exp = {};
    var FORCE = _fails(function () {
      return !!_stringWs[KEY]() || non[KEY]() != non;
    });
    var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
    if (ALIAS) exp[ALIAS] = fn;
    _export(_export.P + _export.F * FORCE, 'String', exp);
  };

  // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim
  var trim = exporter.trim = function (string, TYPE) {
    string = String(_defined(string));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };

  var _stringTrim = exporter;

  var $parseFloat = _global.parseFloat;
  var $trim = _stringTrim.trim;

  var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
    var string = $trim(String(str), 3);
    var result = $parseFloat(string);
    return result === 0 && string.charAt(0) == '-' ? -0 : result;
  } : $parseFloat;

  // 20.1.2.12 Number.parseFloat(string)
  _export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', { parseFloat: _parseFloat });

  var _parseFloat$1 = parseFloat;

  var _parseFloat$2 = createCommonjsModule(function (module) {
    module.exports = { "default": _parseFloat$1, __esModule: true };
  });

  var _Number$parseFloat = unwrapExports(_parseFloat$2);

  /**
                                                          * to check whether the object is defined or not
                                                          */
  function defined(obj) {
    return typeof obj !== 'undefined';
  }
  /**
     * is void element or not ? Means it will return true when val is undefined or null
     */
  function isVoid(obj) {
    return obj === undefined || obj === null;
  }
  /**
     * to check whether a variable is array
     */
  function isArray(arr) {
    return Array.isArray(arr);
  }

  /**
     * is it a function or not
     */
  function isFunction(obj) {
    return typeof obj === 'function';
  }

  /**
     * is it an object or not
     */
  function isObject(obj) {
    // incase of arrow function and array
    return Object(obj) === obj && String(obj) === '[object Object]' && !isFunction(obj) && !isArray(obj);
  }
  /**
     * to tell you if it's a real number
     */
  function isNumber(obj) {
    return typeof obj === 'number';
  }
  /**
     * to tell you if the val can be transfer into number
     */
  function isNumeric(obj) {
    return !isArray(obj) && obj - _Number$parseFloat(obj) + 1 >= 0;
  }
  /**
     * is it an interget or not
     */
  function isInteger$2(num) {
    return _Number$isInteger(num);
  }

  /**
     * return true when the value is "", {}, [], 0, null, undefined, false.
     */
  function isEmpty(obj) {
    if (isArray(obj)) {
      return obj.length === 0;
    } else if (isObject(obj)) {
      return _Object$keys(obj).length === 0;
    } else {
      return !obj;
    }
  }
  /**
     * is it an event or not
     */
  function isEvent(obj) {
    return obj instanceof Event || (obj && obj.originalEvent) instanceof Event;
  }
  /**
     * is it a string
     */
  function isString(str) {
    return typeof str === 'string' || str instanceof String;
  }
  /**
     * is Boolean or not
     */
  function isBoolean(bool) {
    return typeof bool === 'boolean';
  }
  /**
     * is a promise or not
     */
  function isPromise(obj) {
    return !!obj && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  }
  /**
     * is Primitive type or not, whick means it will return true when data is number/string/boolean/undefined/null
     */
  function isPrimitive(val) {
    return isVoid(val) || isBoolean(val) || isString(val) || isNumber(val);
  }
  /**
     * to test if a HTML node
     */
  function isNode(obj) {
    return !!((typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? obj instanceof Node : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string');
  }
  /**
     * to test if a HTML element
     */
  function isElement(obj) {
    return !!((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string');
  }
  /**
     * check if node B is node A's posterrity or not
     */
  function isPosterityNode(parent, child) {
    if (!isNode(parent) || !isNode(child)) {
      return false;
    }
    while (child.parentNode) {
      child = child.parentNode;
      if (child === parent) {
        return true;
      }
    }
    return false;
  }
  /**
     * check if the string is an HTMLString
     */
  function isHTMLString(str) {
    return /<[^>]+?>/.test(str);

  }
  /**
     * check if is an error
     */
  function isError(val) {
    return val instanceof Error;
  }

  function formatter(tag, msg) {
    if (!isString(tag)) throw new TypeError('Log\'s method only acccept string as argument, but not ' + tag + ' in ' + (typeof tag === 'undefined' ? 'undefined' : _typeof(tag)));
    if (!isString(msg)) return '[' + Log.GLOBAL_TAG + '] > ' + tag;
    tag = Log.FORCE_GLOBAL_TAG ? Log.GLOBAL_TAG : tag || Log.GLOBAL_TAG;
    return '[' + tag + '] > ' + msg;
  }
  /**
     * Log Object
     */

  var Log = function () {
    function Log() {
      _classCallCheck(this, Log);
    }

    _createClass(Log, null, [{
      key: 'error',

      /**
                     * equal to console.error, output `[${tag}] > {$msg}`
                     * @param {string} tag optional, the header of log 
                     * @param {string} msg the message
                     */

      /**
                         * @member {boolean}
                         */

      /**
                             * @member {boolean}
                             */

      /**
                                 * @member {boolean}
                                 */
      value: function error(tag, msg) {
        if (!Log.ENABLE_ERROR) {
          return;
        }

        (console.error || console.warn || console.log).call(console, formatter(tag, msg));
      }
      /**
         * equal to console.info, output `[${tag}] > {$msg}`
         * @param {string} tag optional, the header of log 
         * @param {string} msg the message
         */

      /**
             * @member {boolean}
             */

      /**
                 * @member {boolean}
                 */

      /**
                     * @member {boolean}
                     */

      /**
                         * @member {string}
                         */ },

    {
      key: 'info',
      value: function info(tag, msg) {
        if (!Log.ENABLE_INFO) {
          return;
        }
        (console.info || console.log).call(console, formatter(tag, msg));
      }
      /**
         * equal to console.warn, output `[${tag}] > {$msg}`
         * @param {string} tag optional, the header of log 
         * @param {string} msg the message
         */ },

    {
      key: 'warn',
      value: function warn(tag, msg) {
        if (!Log.ENABLE_WARN) {
          return;
        }
        (console.warn || console.log).call(console, formatter(tag, msg));
      }
      /**
         * equal to console.debug, output `[${tag}] > {$msg}`
         * @param {string} tag optional, the header of log 
         * @param {string} msg the message
         */ },

    {
      key: 'debug',
      value: function debug(tag, msg) {
        if (!Log.ENABLE_DEBUG) {
          return;
        }
        (console.debug || console.log).call(console, formatter(tag, msg));
      }
      /**
         * equal to console.verbose, output `[${tag}] > {$msg}`
         * @param {string} tag optional, the header of log 
         * @param {string} msg the message
         */ },

    {
      key: 'verbose',
      value: function verbose(tag, msg) {
        if (!Log.ENABLE_VERBOSE) {
          return;
        }
        console.log(formatter(tag, msg), " at js_sdk\\chimee\\chimee-mobile-player.browser.js:1547");
      } }]);


    return Log;
  }();

  Log.GLOBAL_TAG = 'chimee';
  Log.FORCE_GLOBAL_TAG = false;
  Log.ENABLE_ERROR = true;
  Log.ENABLE_INFO = true;
  Log.ENABLE_WARN = true;
  Log.ENABLE_DEBUG = true;
  Log.ENABLE_VERBOSE = true;

  var uaParser = createCommonjsModule(function (module, exports) {
    /**
                                                                   * UAParser.js v0.7.17
                                                                   * Lightweight JavaScript-based User-Agent string parser
                                                                   * https://github.com/faisalman/ua-parser-js
                                                                   *
                                                                   * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
                                                                   * Dual licensed under GPLv2 & MIT
                                                                   */

    (function (window, undefined) {

      //////////////
      // Constants
      /////////////


      var LIBVERSION = '0.7.17',
      EMPTY = '',
      UNKNOWN = '?',
      FUNC_TYPE = 'function',
      UNDEF_TYPE = 'undefined',
      OBJ_TYPE = 'object',
      STR_TYPE = 'string',
      MAJOR = 'major', // deprecated
      MODEL = 'model',
      NAME = 'name',
      TYPE = 'type',
      VENDOR = 'vendor',
      VERSION = 'version',
      ARCHITECTURE = 'architecture',
      CONSOLE = 'console',
      MOBILE = 'mobile',
      TABLET = 'tablet',
      SMARTTV = 'smarttv',
      WEARABLE = 'wearable',
      EMBEDDED = 'embedded';


      ///////////
      // Helper
      //////////


      var util = {
        extend: function extend(regexes, extensions) {
          var margedRegexes = {};
          for (var i in regexes) {
            if (extensions[i] && extensions[i].length % 2 === 0) {
              margedRegexes[i] = extensions[i].concat(regexes[i]);
            } else {
              margedRegexes[i] = regexes[i];
            }
          }
          return margedRegexes;
        },
        has: function has(str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize: function lowerize(str) {
          return str.toLowerCase();
        },
        major: function major(version) {
          return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, '').split(".")[0] : undefined;
        },
        trim: function trim(str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        } };



      ///////////////
      // Map helper
      //////////////


      var mapper = {

        rgx: function rgx(ua, arrays) {

          //var result = {},
          var i = 0,j,k,p,q,matches,match; //, args = arguments;

          /*// construct object barebones
          for (p = 0; p < args[1].length; p++) {
              q = args[1][p];
              result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
          }*/

          // loop through all regexes maps
          while (i < arrays.length && !matches) {

            var regex = arrays[i], // even sequence (0,2,4,..)
            props = arrays[i + 1]; // odd sequence (1,3,5,..)
            j = k = 0;

            // try matching uastring with regexes
            while (j < regex.length && !matches) {

              matches = regex[j++].exec(ua);

              if (!!matches) {
                for (p = 0; p < props.length; p++) {
                  match = matches[++k];
                  q = props[p];
                  // check if given property is actually array
                  if (typeof q === OBJ_TYPE && q.length > 0) {
                    if (q.length == 2) {
                      if (typeof q[1] == FUNC_TYPE) {
                        // assign modified match
                        this[q[0]] = q[1].call(this, match);
                      } else {
                        // assign given value, ignore regex match
                        this[q[0]] = q[1];
                      }
                    } else if (q.length == 3) {
                      // check whether function or regex
                      if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                        // call function (usually string mapper)
                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                      } else {
                        // sanitize match using given regex
                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                      }
                    } else if (q.length == 4) {
                      this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                    }
                  } else {
                    this[q] = match ? match : undefined;
                  }
                }
              }
            }
            i += 2;
          }
          // console.log(this);
          //return this;
        },

        str: function str(_str, map) {

          for (var i in map) {
            // check if array
            if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
              for (var j = 0; j < map[i].length; j++) {
                if (util.has(map[i][j], _str)) {
                  return i === UNKNOWN ? undefined : i;
                }
              }
            } else if (util.has(map[i], _str)) {
              return i === UNKNOWN ? undefined : i;
            }
          }
          return _str;
        } };



      ///////////////
      // String map
      //////////////


      var maps = {

        browser: {
          oldsafari: {
            version: {
              '1.0': '/8',
              '1.2': '/1',
              '1.3': '/3',
              '2.0': '/412',
              '2.0.2': '/416',
              '2.0.3': '/417',
              '2.0.4': '/419',
              '?': '/' } } },




        device: {
          amazon: {
            model: {
              'Fire Phone': ['SD', 'KF'] } },


          sprint: {
            model: {
              'Evo Shift 4G': '7373KT' },

            vendor: {
              'HTC': 'APA',
              'Sprint': 'Sprint' } } },




        os: {
          windows: {
            version: {
              'ME': '4.90',
              'NT 3.11': 'NT3.51',
              'NT 4.0': 'NT4.0',
              '2000': 'NT 5.0',
              'XP': ['NT 5.1', 'NT 5.2'],
              'Vista': 'NT 6.0',
              '7': 'NT 6.1',
              '8': 'NT 6.2',
              '8.1': 'NT 6.3',
              '10': ['NT 6.4', 'NT 10.0'],
              'RT': 'ARM' } } } };






      //////////////
      // Regex map
      /////////////


      var regexes = {

        browser: [[

        // Presto based
        /(opera\smini)\/([\w\.-]+)/i, // Opera Mini
        /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, // Opera Mobi/Tablet
        /(opera).+version\/([\w\.]+)/i, // Opera > 9.80
        /(opera)[\/\s]+([\w\.]+)/i // Opera < 9.80
        ], [NAME, VERSION], [

        /(opios)[\/\s]+([\w\.]+)/i // Opera mini on iphone >= 8.0
        ], [[NAME, 'Opera Mini'], VERSION], [

        /\s(opr)\/([\w\.]+)/i // Opera Webkit
        ], [[NAME, 'Opera'], VERSION], [

        // Mixed
        /(kindle)\/([\w\.]+)/i, // Kindle
        /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
        // Lunascape/Maxthon/Netfront/Jasmine/Blazer

        // Trident based
        /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
        // Avant/IEMobile/SlimBrowser/Baidu
        /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer

        // Webkit/KHTML based
        /(rekonq)\/([\w\.]+)*/i, // Rekonq
        /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser)\/([\w\.-]+)/i
        // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
        ], [NAME, VERSION], [

        /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i // IE11
        ], [[NAME, 'IE'], VERSION], [

        /(edge)\/((\d+)?[\w\.]+)/i // Microsoft Edge
        ], [NAME, VERSION], [

        /(yabrowser)\/([\w\.]+)/i // Yandex
        ], [[NAME, 'Yandex'], VERSION], [

        /(puffin)\/([\w\.]+)/i // Puffin
        ], [[NAME, 'Puffin'], VERSION], [

        /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i
        // UCBrowser
        ], [[NAME, 'UCBrowser'], VERSION], [

        /(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
        ], [[NAME, /_/g, ' '], VERSION], [

        /(micromessenger)\/([\w\.]+)/i // WeChat
        ], [[NAME, 'WeChat'], VERSION], [

        /(QQ)\/([\d\.]+)/i // QQ, aka ShouQ
        ], [NAME, VERSION], [

        /m?(qqbrowser)[\/\s]?([\w\.]+)/i // QQBrowser
        ], [NAME, VERSION], [

        /xiaomi\/miuibrowser\/([\w\.]+)/i // MIUI Browser
        ], [VERSION, [NAME, 'MIUI Browser']], [

        /;fbav\/([\w\.]+);/i // Facebook App for iOS & Android
        ], [VERSION, [NAME, 'Facebook']], [

        /headlesschrome(?:\/([\w\.]+)|\s)/i // Chrome Headless
        ], [VERSION, [NAME, 'Chrome Headless']], [

        /\swv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
        ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

        /((?:oculus|samsung)browser)\/([\w\.]+)/i],
        [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [// Oculus / Samsung Browser

        /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i // Android Browser
        ], [VERSION, [NAME, 'Android Browser']], [

        /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
        // Chrome/OmniWeb/Arora/Tizen/Nokia
        ], [NAME, VERSION], [

        /(dolfin)\/([\w\.]+)/i // Dolphin
        ], [[NAME, 'Dolphin'], VERSION], [

        /((?:android.+)crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
        ], [[NAME, 'Chrome'], VERSION], [

        /(coast)\/([\w\.]+)/i // Opera Coast
        ], [[NAME, 'Opera Coast'], VERSION], [

        /fxios\/([\w\.-]+)/i // Firefox for iOS
        ], [VERSION, [NAME, 'Firefox']], [

        /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
        ], [VERSION, [NAME, 'Mobile Safari']], [

        /version\/([\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
        ], [VERSION, NAME], [

        /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Google Search Appliance on iOS
        ], [[NAME, 'GSA'], VERSION], [

        /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
        ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

        /(konqueror)\/([\w\.]+)/i, // Konqueror
        /(webkit|khtml)\/([\w\.]+)/i],
        [NAME, VERSION], [

        // Gecko based
        /(navigator|netscape)\/([\w\.-]+)/i // Netscape
        ], [[NAME, 'Netscape'], VERSION], [
        /(swiftfox)/i, // Swiftfox
        /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
        // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
        /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
        // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
        /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla

        // Other
        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
        // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
        /(links)\s\(([\w\.]+)/i, // Links
        /(gobrowser)\/?([\w\.]+)*/i, // GoBrowser
        /(ice\s?browser)\/v?([\w\._]+)/i, // ICE Browser
        /(mosaic)[\/\s]([\w\.]+)/i // Mosaic
        ], [NAME, VERSION]

        /* /////////////////////
                           // Media players BEGIN
                           ////////////////////////
                             , [
                             /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
                           /(coremedia) v((\d+)[\w\._]+)/i
                           ], [NAME, VERSION], [
                             /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
                           ], [NAME, VERSION], [
                             /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
                           ], [NAME, VERSION], [
                             /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
                                                                                               // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
                                                                                               // NSPlayer/PSP-InternetRadioPlayer/Videos
                           /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
                           /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
                           /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
                           ], [NAME, VERSION], [
                           /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
                           ], [NAME, VERSION], [
                             /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
                           ], [[NAME, 'Flip Player'], VERSION], [
                             /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
                                                                                               // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
                           ], [NAME], [
                             /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
                                                                                               // Gstreamer
                           ], [NAME, VERSION], [
                             /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
                           /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
                                                                                               // Java/urllib/requests/wget/cURL
                           /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
                           ], [NAME, VERSION], [
                             /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
                           ], [[NAME, /_/g, ' '], VERSION], [
                             /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
                                                                                               // MPlayer SVN
                           ], [NAME, VERSION], [
                             /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
                           ], [NAME, VERSION], [
                             /(mplayer)/i,                                                       // MPlayer (no other info)
                           /(yourmuze)/i,                                                      // YourMuze
                           /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
                           ], [NAME], [
                             /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
                           ], [NAME, VERSION], [
                             /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
                           ], [NAME, VERSION], [
                             /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
                           ], [NAME, VERSION], [
                             /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
                           /(winamp)\s((\d+)[\w\.-]+)/i,
                           /(winamp)mpeg\/((\d+)[\w\.-]+)/i
                           ], [NAME, VERSION], [
                             /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                                               // inlight radio
                           ], [NAME], [
                             /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
                                                                                               // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                                               // SoundTap/Totem/Stagefright/Streamium
                           ], [NAME, VERSION], [
                             /(smp)((\d+)[\d\.]+)/i                                              // SMP
                           ], [NAME, VERSION], [
                             /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
                           /(vlc)\/((\d+)[\w\.-]+)/i,
                           /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
                           /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
                           /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
                           ], [NAME, VERSION], [
                             /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
                           /(windows-media-player)\/((\d+)[\w\.-]+)/i
                           ], [[NAME, /-/g, ' '], VERSION], [
                             /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
                                                                                               // Windows Media Server
                           ], [VERSION, [NAME, 'Windows']], [
                             /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
                           ], [NAME, VERSION], [
                             /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
                           /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
                           ], [[NAME, 'rad.io'], VERSION]
                             //////////////////////
                           // Media players END
                           ////////////////////*/],





























        cpu: [[

        /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i // AMD64
        ], [[ARCHITECTURE, 'amd64']], [

        /(ia32(?=;))/i // IA32 (quicktime)
        ], [[ARCHITECTURE, util.lowerize]], [

        /((?:i[346]|x)86)[;\)]/i // IA32
        ], [[ARCHITECTURE, 'ia32']], [

        // PocketPC mistakenly identified as PowerPC
        /windows\s(ce|mobile);\sppc;/i],
        [[ARCHITECTURE, 'arm']], [

        /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i // PowerPC
        ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

        /(sun4\w)[;\)]/i // SPARC
        ], [[ARCHITECTURE, 'sparc']], [

        /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
        // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
        ], [[ARCHITECTURE, util.lowerize]]],


        device: [[

        /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i // iPad/PlayBook
        ], [MODEL, VENDOR, [TYPE, TABLET]], [

        /applecoremedia\/[\w\.]+ \((ipad)/ // iPad
        ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

        /(apple\s{0,1}tv)/i // Apple TV
        ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [

        /(archos)\s(gamepad2?)/i, // Archos
        /(hp).+(touchpad)/i, // HP TouchPad
        /(hp).+(tablet)/i, // HP Tablet
        /(kindle)\/([\w\.]+)/i, // Kindle
        /\s(nook)[\w\s]+build\/(\w+)/i, // Nook
        /(dell)\s(strea[kpr\s\d]*[\dko])/i // Dell Streak
        ], [VENDOR, MODEL, [TYPE, TABLET]], [

        /(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i // Kindle Fire HD
        ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
        /(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i // Fire Phone
        ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [

        /\((ip[honed|\s\w*]+);.+(apple)/i // iPod/iPhone
        ], [MODEL, VENDOR, [TYPE, MOBILE]], [
        /\((ip[honed|\s\w*]+);/i // iPod/iPhone
        ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

        /(blackberry)[\s-]?(\w+)/i, // BlackBerry
        /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
        // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
        /(hp)\s([\w\s]+\w)/i, // HP iPAQ
        /(asus)-?(\w+)/i // Asus
        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
        /\(bb10;\s(\w+)/i // BlackBerry 10
        ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
        // Asus Tablets
        /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],
        [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

        /(sony)\s(tablet\s[ps])\sbuild\//i, // Sony
        /(sony)?(?:sgp.+)\sbuild\//i],
        [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
        /android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i],
        [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

        /\s(ouya)\s/i, // Ouya
        /(nintendo)\s([wids3u]+)/i // Nintendo
        ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

        /android.+;\s(shield)\sbuild/i // Nvidia
        ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

        /(playstation\s[34portablevi]+)/i // Playstation
        ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

        /(sprint\s(\w+))/i // Sprint Phones
        ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

        /(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i // Lenovo tablets
        ], [VENDOR, MODEL, [TYPE, TABLET]], [

        /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, // HTC
        /(zte)-(\w+)*/i, // ZTE
        /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
        // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
        ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

        /(nexus\s9)/i // HTC Nexus 9
        ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

        /d\/huawei([\w\s-]+)[;\)]/i,
        /(nexus\s6p)/i // Huawei
        ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

        /(microsoft);\s(lumia[\s\w]+)/i // Microsoft Lumia
        ], [VENDOR, MODEL, [TYPE, MOBILE]], [

        /[\s\(;](xbox(?:\sone)?)[\s\);]/i // Microsoft Xbox
        ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
        /(kin\.[onetw]{3})/i // Microsoft Kin
        ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

        // Motorola
        /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,
        /mot[\s-]?(\w+)*/i,
        /(XT\d{3,4}) build\//i,
        /(nexus\s6)/i],
        [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
        /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
        [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

        /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i // HbbTV devices
        ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

        /hbbtv.+maple;(\d+)/i],
        [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

        /\(dtv[\);].+(aquos)/i // Sharp
        ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

        /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
        /((SM-T\w+))/i],
        [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [// Samsung
        /smart-tv.+(samsung)/i],
        [VENDOR, [TYPE, SMARTTV], MODEL], [
        /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
        /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
        /sec-((sgh\w+))/i],
        [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

        /sie-(\w+)*/i // Siemens
        ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

        /(maemo|nokia).*(n900|lumia\s\d+)/i, // Nokia
        /(nokia)[\s_-]?([\w-]+)*/i],
        [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

        /android\s3\.[\s\w;-]{10}(a\d{3})/i // Acer
        ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

        /android.+([vl]k\-?\d{3})\s+build/i // LG Tablet
        ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
        /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i // LG Tablet
        ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
        /(lg) netcast\.tv/i // LG SmartTV
        ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
        /(nexus\s[45])/i, // LG
        /lg[e;\s\/-]+(\w+)*/i,
        /android.+lg(\-?[\d\w]+)\s+build/i],
        [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

        /android.+(ideatab[a-z0-9\-\s]+)/i // Lenovo
        ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

        /linux;.+((jolla));/i // Jolla
        ], [VENDOR, MODEL, [TYPE, MOBILE]], [

        /((pebble))app\/[\d\.]+\s/i // Pebble
        ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

        /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i // OPPO
        ], [VENDOR, MODEL, [TYPE, MOBILE]], [

        /crkey/i // Google Chromecast
        ], [[MODEL, 'Chromecast'], [VENDOR, 'Google']], [

        /android.+;\s(glass)\s\d/i // Google Glass
        ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

        /android.+;\s(pixel c)\s/i // Google Pixel C
        ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

        /android.+;\s(pixel xl|pixel)\s/i // Google Pixel
        ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

        /android.+(\w+)\s+build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
        /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, // Xiaomi Hongmi
        /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i, // Xiaomi Mi
        /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+)?)\s+build/i // Redmi Phones
        ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
        /android.+(mi[\s\-_]*(?:pad)?(?:[\s_]*[\w\s]+)?)\s+build/i // Mi Pad tablets
        ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
        /android.+;\s(m[1-5]\snote)\sbuild/i // Meizu Tablet
        ], [MODEL, [VENDOR, 'Meizu'], [TYPE, TABLET]], [

        /android.+a000(1)\s+build/i // OnePlus
        ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

        /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i // RCA Tablets
        ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

        /android.+[;\/]\s*(Venue[\d\s]*)\s+build/i // Dell Venue Tablets
        ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

        /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i // Verizon Tablet
        ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

        /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i // Barnes & Noble Tablet
        ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

        /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i // Barnes & Noble Tablet
        ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

        /android.+[;\/]\s*(zte)?.+(k\d{2})\s+build/i // ZTE K Series Tablet
        ], [[VENDOR, 'ZTE'], MODEL, [TYPE, TABLET]], [

        /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i // Swiss GEN Mobile
        ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

        /android.+[;\/]\s*(zur\d{3})\s+build/i // Swiss ZUR Tablet
        ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

        /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i // Zeki Tablets
        ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

        /(android).+[;\/]\s+([YR]\d{2}x?.*)\s+build/i,
        /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(.+)\s+build/i // Dragon Touch Tablet
        ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

        /android.+[;\/]\s*(NS-?.+)\s+build/i // Insignia Tablets
        ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

        /android.+[;\/]\s*((NX|Next)-?.+)\s+build/i // NextBook Tablets
        ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

        /android.+[;\/]\s*(Xtreme\_?)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
        [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [// Voice Xtreme Phones

        /android.+[;\/]\s*(LVTEL\-?)?(V1[12])\s+build/i // LvTel Phones
        ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

        /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i // Envizen Tablets
        ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

        /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(.*\b)\s+build/i // Le Pan Tablets
        ], [VENDOR, MODEL, [TYPE, TABLET]], [

        /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i // MachSpeed Tablets
        ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

        /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i // Trinity Tablets
        ], [VENDOR, MODEL, [TYPE, TABLET]], [

        /android.+[;\/]\s*TU_(1491)\s+build/i // Rotor Tablets
        ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

        /android.+(KS(.+))\s+build/i // Amazon Kindle Tablets
        ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

        /android.+(Gigaset)[\s\-]+(Q.+)\s+build/i // Gigaset Tablets
        ], [VENDOR, MODEL, [TYPE, TABLET]], [

        /\s(tablet|tab)[;\/]/i, // Unidentifiable Tablet
        /\s(mobile)(?:[;\/]|\ssafari)/i // Unidentifiable Mobile
        ], [[TYPE, util.lowerize], VENDOR, MODEL], [

        /(android.+)[;\/].+build/i // Generic Android Device
        ], [MODEL, [VENDOR, 'Generic']]


        /*//////////////////////////
                                            // TODO: move to string map
                                            ////////////////////////////
                                              /(C6603)/i                                                          // Sony Xperia Z C6603
                                            ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
                                            /(C6903)/i                                                          // Sony Xperia Z 1
                                            ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
                                              /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
                                            ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
                                            /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
                                            ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
                                            /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
                                            ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
                                            /(SM-G313HZ)/i                                                      // Samsung Galaxy V
                                            ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
                                            /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
                                            ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
                                            /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
                                            ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
                                            /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
                                            ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
                                              /(T3C)/i                                                            // Advan Vandroid T3C
                                            ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
                                            /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
                                            ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
                                            /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
                                            ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [
                                              /(V972M)/i                                                          // ZTE V972M
                                            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
                                              /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
                                            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
                                            /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
                                            ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
                                            /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
                                            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
                                            /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
                                            ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
                                              /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
                                            ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [
                                              /////////////
                                            // END TODO
                                            ///////////*/],










        engine: [[

        /windows.+\sedge\/([\w\.]+)/i // EdgeHTML
        ], [VERSION, [NAME, 'EdgeHTML']], [

        /(presto)\/([\w\.]+)/i, // Presto
        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
        /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, // KHTML/Tasman/Links
        /(icab)[\/\s]([23]\.[\d\.]+)/i // iCab
        ], [NAME, VERSION], [

        /rv\:([\w\.]+).*(gecko)/i // Gecko
        ], [VERSION, NAME]],


        os: [[

        // Windows based
        /microsoft\s(windows)\s(vista|xp)/i // Windows (iTunes)
        ], [NAME, VERSION], [
        /(windows)\snt\s6\.2;\s(arm)/i, // Windows RT
        /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i, // Windows Phone
        /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
        [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
        /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
        [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

        // Mobile/Embedded OS
        /\((bb)(10);/i // BlackBerry 10
        ], [[NAME, 'BlackBerry'], VERSION], [
        /(blackberry)\w*\/?([\w\.]+)*/i, // Blackberry
        /(tizen)[\/\s]([\w\.]+)/i, // Tizen
        /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
        // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
        /linux;.+(sailfish);/i // Sailfish OS
        ], [NAME, VERSION], [
        /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i // Symbian
        ], [[NAME, 'Symbian'], VERSION], [
        /\((series40);/i // Series 40
        ], [NAME], [
        /mozilla.+\(mobile;.+gecko.+firefox/i // Firefox OS
        ], [[NAME, 'Firefox OS'], VERSION], [

        // Console
        /(nintendo|playstation)\s([wids34portablevu]+)/i, // Nintendo/Playstation

        // GNU/Linux based
        /(mint)[\/\s\(]?(\w+)*/i, // Mint
        /(mageia|vectorlinux)[;\s]/i, // Mageia/VectorLinux
        /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i,
        // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
        // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
        /(hurd|linux)\s?([\w\.]+)*/i, // Hurd/Linux
        /(gnu)\s?([\w\.]+)*/i // GNU
        ], [NAME, VERSION], [

        /(cros)\s[\w]+\s([\w\.]+\w)/i // Chromium OS
        ], [[NAME, 'Chromium OS'], VERSION], [

        // Solaris
        /(sunos)\s?([\w\.]+\d)*/i // Solaris
        ], [[NAME, 'Solaris'], VERSION], [

        // BSD based
        /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
        ], [NAME, VERSION], [

        /(haiku)\s(\w+)/i // Haiku
        ], [NAME, VERSION], [

        /cfnetwork\/.+darwin/i,
        /ip[honead]+(?:.*os\s([\w]+)\slike\smac|;\sopera)/i // iOS
        ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

        /(mac\sos\sx)\s?([\w\s\.]+\w)*/i,
        /(macintosh|mac(?=_powerpc)\s)/i // Mac OS
        ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

        // Other
        /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, // Solaris
        /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, // AIX
        /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
        // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
        /(unix)\s?([\w\.]+)*/i // UNIX
        ], [NAME, VERSION]] };




      /////////////////
      // Constructor
      ////////////////
      /*
      var Browser = function (name, version) {
          this[NAME] = name;
          this[VERSION] = version;
      };
      var CPU = function (arch) {
          this[ARCHITECTURE] = arch;
      };
      var Device = function (vendor, model, type) {
          this[VENDOR] = vendor;
          this[MODEL] = model;
          this[TYPE] = type;
      };
      var Engine = Browser;
      var OS = Browser;
      */
      var UAParser = function UAParser(uastring, extensions) {

        if (typeof uastring === 'object') {
          extensions = uastring;
          uastring = undefined;
        }

        if (!(this instanceof UAParser)) {
          return new UAParser(uastring, extensions).getResult();
        }

        var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
        //var browser = new Browser();
        //var cpu = new CPU();
        //var device = new Device();
        //var engine = new Engine();
        //var os = new OS();

        this.getBrowser = function () {
          var browser = { name: undefined, version: undefined };
          mapper.rgx.call(browser, ua, rgxmap.browser);
          browser.major = util.major(browser.version); // deprecated
          return browser;
        };
        this.getCPU = function () {
          var cpu = { architecture: undefined };
          mapper.rgx.call(cpu, ua, rgxmap.cpu);
          return cpu;
        };
        this.getDevice = function () {
          var device = { vendor: undefined, model: undefined, type: undefined };
          mapper.rgx.call(device, ua, rgxmap.device);
          return device;
        };
        this.getEngine = function () {
          var engine = { name: undefined, version: undefined };
          mapper.rgx.call(engine, ua, rgxmap.engine);
          return engine;
        };
        this.getOS = function () {
          var os = { name: undefined, version: undefined };
          mapper.rgx.call(os, ua, rgxmap.os);
          return os;
        };
        this.getResult = function () {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU() };

        };
        this.getUA = function () {
          return ua;
        };
        this.setUA = function (uastring) {
          ua = uastring;
          //browser = new Browser();
          //cpu = new CPU();
          //device = new Device();
          //engine = new Engine();
          //os = new OS();
          return this;
        };
        return this;
      };

      UAParser.VERSION = LIBVERSION;
      UAParser.BROWSER = {
        NAME: NAME,
        MAJOR: MAJOR, // deprecated
        VERSION: VERSION };

      UAParser.CPU = {
        ARCHITECTURE: ARCHITECTURE };

      UAParser.DEVICE = {
        MODEL: MODEL,
        VENDOR: VENDOR,
        TYPE: TYPE,
        CONSOLE: CONSOLE,
        MOBILE: MOBILE,
        SMARTTV: SMARTTV,
        TABLET: TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED };

      UAParser.ENGINE = {
        NAME: NAME,
        VERSION: VERSION };

      UAParser.OS = {
        NAME: NAME,
        VERSION: VERSION };

      //UAParser.Utils = util;

      ///////////
      // Export
      //////////


      // check js environment
      if ('object' !== UNDEF_TYPE) {
        // nodejs env
        if ('object' !== UNDEF_TYPE && module.exports) {
          exports = module.exports = UAParser;
        }
        // TODO: test!!!!!!!!
        /*
        if (require && require.main === module && process) {
            // cli
            var jsonize = function (arr) {
                var res = [];
                for (var i in arr) {
                    res.push(new UAParser(arr[i]).getResult());
                }
                process.stdout.write(JSON.stringify(res, null, 2) + '\n');
            };
            if (process.stdin.isTTY) {
                // via args
                jsonize(process.argv.slice(2));
            } else {
                // via pipe
                var str = '';
                process.stdin.on('readable', function() {
                    var read = process.stdin.read();
                    if (read !== null) {
                        str += read;
                    }
                });
                process.stdin.on('end', function () {
                    jsonize(str.replace(/\n$/, '').split('\n'));
                });
            }
        }
        */
        exports.UAParser = UAParser;
      } else {
        // requirejs env (optional)
        if (typeof undefined === FUNC_TYPE && undefined.amd) {
          undefined(function () {
            return UAParser;
          });
        } else if (window) {
          // browser env
          window.UAParser = UAParser;
        }
      }

      // jQuery/Zepto specific (optional)
      // Note:
      //   In AMD env the global scope should be kept clean, but jQuery is an exception.
      //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
      //   and we should catch that.
      var $ = window && (window.jQuery || window.Zepto);
      if (typeof $ !== UNDEF_TYPE) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
          return parser.getUA();
        };
        $.ua.set = function (uastring) {
          parser.setUA(uastring);
          var result = parser.getResult();
          for (var prop in result) {
            $.ua[prop] = result[prop];
          }
        };
      }

    })(typeof window === 'object' ? window : commonjsGlobal);
  });
  var uaParser_1 = uaParser.UAParser;

  // call something on iterator step with safe closing on error

  var _iterCall = function _iterCall(iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
      // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) _anObject(ret.call(iterator));
      throw e;
    }
  };

  // check on default Array iterator

  var ITERATOR$1 = _wks('iterator');
  var ArrayProto = Array.prototype;

  var _isArrayIter = function _isArrayIter(it) {
    return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
  };

  var _createProperty = function _createProperty(object, index, value) {
    if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));else
    object[index] = value;
  };

  // getting tag from 19.1.3.6 Object.prototype.toString()

  var TAG$1 = _wks('toStringTag');
  // ES3 wrong here
  var ARG = _cof(function () {return arguments;}()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function tryGet(it, key) {
    try {
      return it[key];
    } catch (e) {/* empty */}
  };

  var _classof = function _classof(it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var ITERATOR$2 = _wks('iterator');

  var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$2] ||
    it['@@iterator'] ||
    _iterators[_classof(it)];
  };

  var ITERATOR$3 = _wks('iterator');
  var SAFE_CLOSING = false;

  try {
    var riter = [7][ITERATOR$3]();
    riter['return'] = function () {SAFE_CLOSING = true;};
  } catch (e) {/* empty */}

  var _iterDetect = function _iterDetect(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7];
      var iter = arr[ITERATOR$3]();
      iter.next = function () {return { done: safe = true };};
      arr[ITERATOR$3] = function () {return iter;};
      exec(arr);
    } catch (e) {/* empty */}
    return safe;
  };

  _export(_export.S + _export.F * !_iterDetect(function (iter) {}), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = _toObject(arrayLike);
      var C = typeof this == 'function' ? this : Array;
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iterFn = core_getIteratorMethod(O);
      var length, result, step, iterator;
      if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
      // if object isn't iterable or it's array with default iterator - use simple case
      if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
        }
      } else {
        length = _toLength(O.length);
        for (result = new C(length); length > index; index++) {
          _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }
      result.length = index;
      return result;
    } });


  var from = _core.Array.from;

  var from$1 = createCommonjsModule(function (module) {
    module.exports = { "default": from, __esModule: true };
  });

  var _Array$from = unwrapExports(from$1);

  var toConsumableArray = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    var _from2 = _interopRequireDefault(from$1);

    function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

    exports.default = function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      } else {
        return (0, _from2.default)(arr);
      }
    };
  });

  var _toConsumableArray = unwrapExports(toConsumableArray);

  /**
                                                              * the handler to generate an deep traversal handler
                                                              * @param  {Function} fn the function you wanna run when you reach in the deep property
                                                              * @return {Function}    the handler
                                                              */
  function genTraversalHandler(fn) {
    var setter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (target, key, value) {
      target[key] = value;
    };

    // use recursive to move what in source to the target
    // if you do not provide a target, we will create a new target
    function recursiveFn(source, target, key) {
      if (isArray(source) || isObject(source)) {
        target = isPrimitive(target) ? isObject(source) ? {} : [] : target;
        for (var _key in source) {
          // $FlowFixMe: support computed key here
          setter(target, _key, recursiveFn(source[_key], target[_key], _key));
          // target[key] = recursiveFn(source[key], target[key], key);
        }
        return target;
      }
      return fn(source, target, key);
    }
    return recursiveFn;
  }
  var _deepAssign = genTraversalHandler(function (val) {
    return val;
  });
  /**
       * deeply clone an object
       * @param  {Array|Object} source if you pass in other type, it will throw an error
       * @return {clone-target}        the new Object
       */
  function deepClone(source) {
    if (isPrimitive(source)) {
      throw new TypeError('deepClone only accept non primitive type');
    }
    return _deepAssign(source);
  }
  /**
     * merge multiple objects
     * @param  {...Object} args [description]
     * @return {merge-object}         [description]
     */
  function deepAssign() {
    for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (args.length < 2) {
      throw new Error('deepAssign accept two and more argument');
    }
    for (var i = args.length - 1; i > -1; i--) {
      if (isPrimitive(args[i])) {
        throw new TypeError('deepAssign only accept non primitive type');
      }
    }
    var target = args.shift();
    args.forEach(function (source) {
      return _deepAssign(source, target);
    });
    return target;
  }

  /**
     * camelize any string, e.g hello world -> helloWorld
     * @param  {string} str only accept string!
     * @return {string}     camelize string
     */
  function camelize(str, isBig) {
    return str.replace(/(^|[^a-zA-Z]+)([a-zA-Z])/g, function (match, spilt, initials, index) {
      return !isBig && index === 0 ? initials.toLowerCase() : initials.toUpperCase();
    });
  }
  /**
     * hypenate any string e.g hello world -> hello-world
     * @param  {string} str only accept string
     * @return {string}
     */
  function hypenate(str) {
    return camelize(str).replace(/([A-Z])/g, function (match) {
      return '-' + match.toLowerCase();
    });
  }

  /**
     * bind the function with some context. we have some fallback strategy here
     * @param {function} fn the function which we need to bind the context on
     * @param {any} context the context object
     */
  function bind(fn, context) {
    if (fn.bind) {
      return fn.bind(context);
    } else if (fn.apply) {
      return function __autobind__() {
        for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return fn.apply(context, args);
      };
    } else {
      return function __autobind__() {
        for (var _len3 = arguments.length, args = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return fn.call.apply(fn, [context].concat(_toConsumableArray(args)));
      };
    }
  }

  /**
     * get an deep property
     */
  function getDeepProperty(obj, keys) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$throwError = _ref.throwError,
    throwError = _ref$throwError === undefined ? false : _ref$throwError,
    backup = _ref.backup;

    if (isString(keys)) {
      keys = keys.split('.');
    }
    if (!isArray(keys)) {
      throw new TypeError('keys of getDeepProperty must be string or Array<string>');
    }
    var read = [];
    var target = obj;
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i];
      if (isVoid(target)) {
        if (throwError) {
          throw new Error('obj' + (read.length > 0 ? '.' + read.join('.') : ' itself') + ' is ' + target);
        } else {
          return backup;
        }
      }
      target = target[key];
      read.push(key);
    }
    return target;
  }

  var _anInstance = function _anInstance(it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
      throw TypeError(name + ': incorrect invocation!');
    }return it;
  };

  var _forOf = createCommonjsModule(function (module) {
    var BREAK = {};
    var RETURN = {};
    var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
      var iterFn = ITERATOR ? function () {return iterable;} : core_getIteratorMethod(iterable);
      var f = _ctx(fn, that, entries ? 2 : 1);
      var index = 0;
      var length, step, iterator, result;
      if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
      // fast case for arrays with default iterator
      if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
        result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
        if (result === BREAK || result === RETURN) return result;
      } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
        result = _iterCall(iterator, f, step.value, entries);
        if (result === BREAK || result === RETURN) return result;
      }
    };
    exports.BREAK = BREAK;
    exports.RETURN = RETURN;
  });

  // 7.3.20 SpeciesConstructor(O, defaultConstructor)


  var SPECIES = _wks('species');
  var _speciesConstructor = function _speciesConstructor(O, D) {
    var C = _anObject(O).constructor;
    var S;
    return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
  };

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  var _invoke = function _invoke(fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0:return un ? fn() :
        fn.call(that);
      case 1:return un ? fn(args[0]) :
        fn.call(that, args[0]);
      case 2:return un ? fn(args[0], args[1]) :
        fn.call(that, args[0], args[1]);
      case 3:return un ? fn(args[0], args[1], args[2]) :
        fn.call(that, args[0], args[1], args[2]);
      case 4:return un ? fn(args[0], args[1], args[2], args[3]) :
        fn.call(that, args[0], args[1], args[2], args[3]);}
    return fn.apply(that, args);
  };

  var process = _global.process;
  var setTask = _global.setImmediate;
  var clearTask = _global.clearImmediate;
  var MessageChannel = _global.MessageChannel;
  var Dispatch = _global.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;
  var run = function run() {
    var id = +this;
    // eslint-disable-next-line no-prototype-builtins
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };
  var listener = function listener(event) {
    run.call(event.data);
  };
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!setTask || !clearTask) {
    setTask = function setImmediate(fn) {
      var args = [];
      var i = 1;
      while (arguments.length > i) {args.push(arguments[i++]);}
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        _invoke(typeof fn == 'function' ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (_cof(process) == 'process') {
      defer = function defer(id) {
        process.nextTick(_ctx(run, id, 1));
      };
      // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function defer(id) {
        Dispatch.now(_ctx(run, id, 1));
      };
      // Browsers with MessageChannel, includes WebWorkers
    } else if (MessageChannel) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = _ctx(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
      defer = function defer(id) {
        _global.postMessage(id + '', '*');
      };
      _global.addEventListener('message', listener, false);
      // IE8-
    } else if (ONREADYSTATECHANGE in _domCreate('script')) {
      defer = function defer(id) {
        _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
          _html.removeChild(this);
          run.call(id);
        };
      };
      // Rest old browsers
    } else {
      defer = function defer(id) {
        setTimeout(_ctx(run, id, 1), 0);
      };
    }
  }
  var _task = {
    set: setTask,
    clear: clearTask };


  var macrotask = _task.set;
  var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
  var process$1 = _global.process;
  var Promise = _global.Promise;
  var isNode$1 = _cof(process$1) == 'process';

  var _microtask = function _microtask() {
    var head, last, notify;

    var flush = function flush() {
      var parent, fn;
      if (isNode$1 && (parent = process$1.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (e) {
          if (head) notify();else
          last = undefined;
          throw e;
        }
      }last = undefined;
      if (parent) parent.enter();
    };

    // Node.js
    if (isNode$1) {
      notify = function notify() {
        process$1.nextTick(flush);
      };
      // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
    } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
      var toggle = true;
      var node = document.createTextNode('');
      new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
      notify = function notify() {
        node.data = toggle = !toggle;
      };
      // environments with maybe non-completely correct, but existent Promise
    } else if (Promise && Promise.resolve) {
      var promise = Promise.resolve();
      notify = function notify() {
        promise.then(flush);
      };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
    } else {
      notify = function notify() {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(_global, flush);
      };
    }

    return function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      }last = task;
    };
  };

  // 25.4.1.5 NewPromiseCapability(C)


  function PromiseCapability(C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = _aFunction(resolve);
    this.reject = _aFunction(reject);
  }

  var f$7 = function f$7(C) {
    return new PromiseCapability(C);
  };

  var _newPromiseCapability = {
    f: f$7 };


  var _perform = function _perform(exec) {
    try {
      return { e: false, v: exec() };
    } catch (e) {
      return { e: true, v: e };
    }
  };

  var _promiseResolve = function _promiseResolve(C, x) {
    _anObject(C);
    if (_isObject(x) && x.constructor === C) return x;
    var promiseCapability = _newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var _redefineAll = function _redefineAll(target, src, safe) {
    for (var key in src) {
      if (safe && target[key]) target[key] = src[key];else
      _hide(target, key, src[key]);
    }return target;
  };

  var SPECIES$1 = _wks('species');

  var _setSpecies = function _setSpecies(KEY) {
    var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
    if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
      configurable: true,
      get: function get() {return this;} });

  };

  var task = _task.set;
  var microtask = _microtask();



  var PROMISE = 'Promise';
  var TypeError$1 = _global.TypeError;
  var process$2 = _global.process;
  var $Promise = _global[PROMISE];
  var isNode$2 = _classof(process$2) == 'process';
  var empty = function empty() {/* empty */};
  var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
  var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

  var USE_NATIVE$1 = !!function () {
    try {
      // correct subclassing with @@species support
      var promise = $Promise.resolve(1);
      var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
        exec(empty, empty);
      };
      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return (isNode$2 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
    } catch (e) {/* empty */}
  }();

  // helpers
  var isThenable = function isThenable(it) {
    var then;
    return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
  };
  var notify = function notify(promise, isReject) {
    if (promise._n) return;
    promise._n = true;
    var chain = promise._c;
    microtask(function () {
      var value = promise._v;
      var ok = promise._s == 1;
      var i = 0;
      var run = function run(reaction) {
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then;
        try {
          if (handler) {
            if (!ok) {
              if (promise._h == 2) onHandleUnhandled(promise);
              promise._h = 1;
            }
            if (handler === true) result = value;else
            {
              if (domain) domain.enter();
              result = handler(value);
              if (domain) domain.exit();
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (e) {
          reject(e);
        }
      };
      while (chain.length > i) {run(chain[i++]);} // variable length - can't use forEach
      promise._c = [];
      promise._n = false;
      if (isReject && !promise._h) onUnhandled(promise);
    });
  };
  var onUnhandled = function onUnhandled(promise) {
    task.call(_global, function () {
      var value = promise._v;
      var unhandled = isUnhandled(promise);
      var result, handler, console;
      if (unhandled) {
        result = _perform(function () {
          if (isNode$2) {
            process$2.emit('unhandledRejection', value, promise);
          } else if (handler = _global.onunhandledrejection) {
            handler({ promise: promise, reason: value });
          } else if ((console = _global.console) && console.error) {
            console.error('Unhandled promise rejection', value, " at js_sdk\\chimee\\chimee-mobile-player.browser.js:3266");
          }
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        promise._h = isNode$2 || isUnhandled(promise) ? 2 : 1;
      }promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };
  var isUnhandled = function isUnhandled(promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };
  var onHandleUnhandled = function onHandleUnhandled(promise) {
    task.call(_global, function () {
      var handler;
      if (isNode$2) {
        process$2.emit('rejectionHandled', promise);
      } else if (handler = _global.onrejectionhandled) {
        handler({ promise: promise, reason: promise._v });
      }
    });
  };
  var $reject = function $reject(value) {
    var promise = this;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    promise._v = value;
    promise._s = 2;
    if (!promise._a) promise._a = promise._c.slice();
    notify(promise, true);
  };
  var $resolve = function $resolve(value) {
    var promise = this;
    var then;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");
      if (then = isThenable(value)) {
        microtask(function () {
          var wrapper = { _w: promise, _d: false }; // wrap
          try {
            then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
          } catch (e) {
            $reject.call(wrapper, e);
          }
        });
      } else {
        promise._v = value;
        promise._s = 1;
        notify(promise, false);
      }
    } catch (e) {
      $reject.call({ _w: promise, _d: false }, e); // wrap
    }
  };

  // constructor polyfill
  if (!USE_NATIVE$1) {
    // 25.4.3.1 Promise(executor)
    $Promise = function Promise(executor) {
      _anInstance(this, $Promise, PROMISE, '_h');
      _aFunction(executor);
      Internal.call(this);
      try {
        executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
      } catch (err) {
        $reject.call(this, err);
      }
    };
    // eslint-disable-next-line no-unused-vars
    Internal = function Promise(executor) {
      this._c = []; // <- awaiting reactions
      this._a = undefined; // <- checked in isUnhandled reactions
      this._s = 0; // <- state
      this._d = false; // <- done
      this._v = undefined; // <- value
      this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
      this._n = false; // <- notify
    };
    Internal.prototype = _redefineAll($Promise.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = isNode$2 ? process$2.domain : undefined;
        this._c.push(reaction);
        if (this._a) this._a.push(reaction);
        if (this._s) notify(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function _catch(onRejected) {
        return this.then(undefined, onRejected);
      } });

    OwnPromiseCapability = function OwnPromiseCapability() {
      var promise = new Internal();
      this.promise = promise;
      this.resolve = _ctx($resolve, promise, 1);
      this.reject = _ctx($reject, promise, 1);
    };
    _newPromiseCapability.f = newPromiseCapability = function newPromiseCapability(C) {
      return C === $Promise || C === Wrapper ?
      new OwnPromiseCapability(C) :
      newGenericPromiseCapability(C);
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise });
  _setToStringTag($Promise, PROMISE);
  _setSpecies(PROMISE);
  Wrapper = _core[PROMISE];

  // statics
  _export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      var $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    } });

  _export(_export.S + _export.F * (_library || !USE_NATIVE$1), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
    } });

  _export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
    $Promise.all(iter)['catch'](empty);
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = _perform(function () {
        var values = [];
        var index = 0;
        var remaining = 1;
        _forOf(iterable, false, function (promise) {
          var $index = index++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          C.resolve(promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[$index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.e) reject(result.v);
      return capability.promise;
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = _perform(function () {
        _forOf(iterable, false, function (promise) {
          C.resolve(promise).then(capability.resolve, reject);
        });
      });
      if (result.e) reject(result.v);
      return capability.promise;
    } });


  _export(_export.P + _export.R, 'Promise', { 'finally': function _finally(onFinally) {
      var C = _speciesConstructor(this, _core.Promise || _global.Promise);
      var isFunction = typeof onFinally == 'function';
      return this.then(
      isFunction ? function (x) {
        return _promiseResolve(C, onFinally()).then(function () {return x;});
      } : onFinally,
      isFunction ? function (e) {
        return _promiseResolve(C, onFinally()).then(function () {throw e;});
      } : onFinally);

    } });

  // https://github.com/tc39/proposal-promise-try




  _export(_export.S, 'Promise', { 'try': function _try(callbackfn) {
      var promiseCapability = _newPromiseCapability.f(this);
      var result = _perform(callbackfn);
      (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
      return promiseCapability.promise;
    } });

  var promise = _core.Promise;

  var promise$1 = createCommonjsModule(function (module) {
    module.exports = { "default": promise, __esModule: true };
  });

  var _Promise = unwrapExports(promise$1);

  // **********************  judgement   ************************
  /**
   * check if the code running in browser environment (not include worker env)
   * @returns {Boolean}
   */
  var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

  // **********************  对象操作  ************************
  /**
   * 转变一个类数组对象为数组
   */
  function makeArray(obj) {
    return _Array$from(obj);
  }

  /**
     * sort Object attributes by function
     * and transfer them into array
     * @param  {Object} obj Object form from numric
     * @param  {Function} fn sort function
     * @return {Array} the sorted attirbutes array
     */
  function transObjectAttrIntoArray(obj) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (a, b) {
      return +a - +b;
    };

    return _Object$keys(obj).sort(fn).reduce(function (order, key) {
      return order.concat(obj[key]);
    }, []);
  }
  /**
     * run a queue one by one.If include function reject or return false it will stop
     * @param  {Array} queue the queue which we want to run one by one
     * @return {Promise}    tell us whether a queue run finished
     */
  function runRejectableQueue(queue) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return new _Promise(function (resolve, reject) {
      var step = function step(index) {
        if (index >= queue.length) {
          resolve();
          return;
        }
        var result = isFunction(queue[index]) ? queue[index].apply(queue, _toConsumableArray(args)) : queue[index];
        if (result === false) return reject('stop');
        return _Promise.resolve(result).then(function () {
          return step(index + 1);
        }).catch(function (err) {
          return reject(err || 'stop');
        });
      };
      step(0);
    });
  }
  /**
     * run a queue one by one.If include function return false it will stop
     * @param  {Array} queue the queue which we want to run one by one
     * @return {boolean} tell the user if the queue run finished
     */
  function runStoppableQueue(queue) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var step = function step(index) {
      if (index >= queue.length) {
        return true;
      }
      var result = isFunction(queue[index]) ? queue[index].apply(queue, _toConsumableArray(args)) : queue[index];
      if (result === false) return false;
      return step(++index);
    };
    return step(0);
  }

  // requestAnimationFrame
  var raf = inBrowser && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame) || function (cb) {
    return setTimeout(cb, 17);
  };

  // cancelAnimationFrame
  var caf = inBrowser && (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame) || function (id) {
    clearTimeout(id);
  };

  // 根据要求的位数，将9格式化为 09\009\0009...
  function strRepeat(num, bit) {
    var pBit = bit;
    num = '' + (num || '');
    var numLen = num.length;
    bit = (bit || numLen) - numLen;
    var paddingStr = bit > 0 ? num.repeat ? '0'.repeat(bit) : new Array(bit + 1).join('0') : '';
    return (paddingStr + num).slice(0, pBit);
  }

  // video 时间格式化
  function formatTime(time) {
    var hh = Math.floor(time / 3600);
    time = Math.floor(time % 3600);
    var mm = strRepeat(Math.floor(time / 60), 2);
    time = Math.floor(time % 60);
    var ss = strRepeat(time, 2);
    return hh >= 1 ? hh + ':' + mm + ':' + ss : mm + ':' + ss;
  }

  // 19.1.2.1 Object.assign(target, source, ...)





  var $assign = Object.assign;

  // should work with symbols and should have deterministic property order (V8 bug)
  var _objectAssign = !$assign || _fails(function () {
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var S = Symbol();
    var K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) {B[k] = k;});
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) {// eslint-disable-line no-unused-vars
    var T = _toObject(target);
    var aLen = arguments.length;
    var index = 1;
    var getSymbols = _objectGops.f;
    var isEnum = _objectPie.f;
    while (aLen > index) {
      var S = _iobject(arguments[index++]);
      var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {if (isEnum.call(S, key = keys[j++])) T[key] = S[key];}
    }return T;
  } : $assign;

  // 19.1.3.1 Object.assign(target, source)


  _export(_export.S + _export.F, 'Object', { assign: _objectAssign });

  var assign = _core.Object.assign;

  var assign$1 = createCommonjsModule(function (module) {
    module.exports = { "default": assign, __esModule: true };
  });

  var _Object$assign = unwrapExports(assign$1);

  /**
                                                * @module event
                                                * @author huzunjie
                                                * @description 自定义事件基础类
                                                */

  /* 缓存事件监听方法及包装，内部数据格式：
                                                    * targetIndex_<type:'click|mouseup|done'>: [ [
                                                    *   function(){ ... handler ... },
                                                    *   function(){ ... handlerWrap ... handler.apply(target, arguments) ... },
                                                    *   isOnce
                                                    * ]]
                                                    */
  var _evtListenerCache = _Object$create(null);
  _evtListenerCache.count = 0;

  /**
                                * 得到某对象的某事件类型对应的监听队列数组
                                * @param  {Object}  target 发生事件的对象
                                * @param {String} type 事件类型(这里的时间类型不只是名称，还是缓存标识，可以通过添加后缀来区分)
                                * @return {Array}
                                */
  function getEvtTypeCache(target, type) {

    var evtId = target.__evt_id;
    if (!evtId) {

      /* 设置__evt_id不可枚举 */
      Object.defineProperty(target, '__evt_id', {
        writable: true,
        enumerable: false,
        configurable: true });


      /* 空对象初始化绑定索引 */
      evtId = target.__evt_id = ++_evtListenerCache.count;
    }

    var typeCacheKey = evtId + '_' + type;
    var evtTypeCache = _evtListenerCache[typeCacheKey];
    if (!evtTypeCache) {
      evtTypeCache = _evtListenerCache[typeCacheKey] = [];
    }

    return evtTypeCache;
  }

  /**
     * 触发事件监听方法
     * @param  {Object}  target 发生事件的对象
     * @param {String} type 事件类型
     * @param {Object} eventObj 触发事件时要传回的event对象
     * @return {undefined}
     */
  function emitEventCache(target, type, eventObj) {
    var evt = _Object$create(null);
    evt.type = type;
    evt.target = target;
    if (eventObj) {
      _Object$assign(evt, isObject(eventObj) ? eventObj : { data: eventObj });
    }
    getEvtTypeCache(target, type).forEach(function (item) {
      (item[1] || item[0]).apply(target, [evt]);
    });
  }

  /**
     * 添加事件监听到缓存
     * @param  {Object}  target 发生事件的对象
     * @param {String} type 事件类型
     * @param {Function} handler 监听函数
     * @param {Boolean} isOnce 是否单次执行
     * @param {Function} handlerWrap
     * @return {undefined}
     */
  function addEventCache(target, type, handler) {
    var isOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var handlerWrap = arguments[4];

    if (isFunction(isOnce) && !handlerWrap) {
      handlerWrap = isOnce;
      isOnce = undefined;
    }
    var handlers = [handler, undefined, isOnce];
    if (isOnce && !handlerWrap) {
      handlerWrap = function handlerWrap() {
        removeEventCache(target, type, handler, isOnce);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        handler.apply(target, args);
      };
    }
    if (handlerWrap) {
      handlers[1] = handlerWrap;
    }
    getEvtTypeCache(target, type).push(handlers);
  }

  /**
     * 移除事件监听
     * @param  {Object}  target 发生事件的对象
     * @param {String} type 事件类型
     * @param {Function} handler 监听函数
     * @return {undefined}
     */
  function removeEventCache(target, type, handler) {
    var isOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var typeCache = getEvtTypeCache(target, type);

    if (handler || isOnce) {
      /* 有指定 handler 则清除对应监听 */
      var handlerId = -1;
      var handlerWrap = void 0;
      typeCache.find(function (item, i) {
        if ((!handler || item[0] === handler) && (!isOnce || item[2])) {
          handlerId = i;
          handlerWrap = item[1];
          return true;
        }
      });
      if (handlerId !== -1) {
        typeCache.splice(handlerId, 1);
      }
      return handlerWrap;
    } else {
      /* 未指定 handler 则清除type对应的所有监听 */
      typeCache.length = 0;
    }
  }

  /**
     * @class CustEvent
     * @description
     * Event 自定义事件类
     * 1. 可以使用不传参得到的实例作为eventBus使用
     * 2. 可以通过指定target，用多个实例操作同一target对象的事件管理
     * 3. 当设定target时，可以通过设置assign为true，来给target实现"on\once\off\emit"方法
     * @param  {Object}  target 发生事件的对象（空则默认为event实例）
     * @param  {Boolean}  assign 是否将"on\once\off\emit"方法实现到target对象上
     * @return {event}
     */
  var CustEvent = function () {
    function CustEvent(target, assign) {
      var _this = this;

      _classCallCheck(this, CustEvent);

      /* 设置__target不可枚举 */
      Object.defineProperty(this, '__target', {
        writable: true,
        enumerable: false,
        configurable: true });

      this.__target = this;

      if (target) {

        if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
          throw new Error('CusEvent target are not object');
        }
        this.__target = target;

        /* 为target实现on\once\off\emit */
        if (assign) {
          ['on', 'once', 'off', 'emit'].forEach(function (mth) {
            target[mth] = _this[mth];
          });
        }
      }
    }

    /**
       * 添加事件监听
       * @param {String} type 事件类型
       * @param {Function} handler 监听函数
       * @param {Boolean} isOnce 单次监听类型
       * @return {event}
       */


    _createClass(CustEvent, [{
      key: 'on',
      value: function on(type, handler) {
        var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        addEventCache(this.__target, type, handler, isOnce);
        return this;
      }

      /**
         * 添加事件监听,并且只执行一次
         * @param {String} type 事件类型
         * @param {Function} handler 监听函数
         * @return {event}
         */ },

    {
      key: 'once',
      value: function once(type, handler) {
        return this.on(type, handler, true);
      }

      /**
         * 移除事件监听
         * @param {String} type 事件类型
         * @param {Function} handler 监听函数(不指定handler则清除type对应的所有事件监听)
         * @param {Boolean} isOnce 单次监听类型
         * @return {event}
         */ },

    {
      key: 'off',
      value: function off(type, handler) {
        var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        removeEventCache(this.__target, type, handler, isOnce);
        return this;
      }

      /**
         * 触发事件监听函数
         * @param {String} type 事件类型
         * @return {event}
         */ },

    {
      key: 'emit',
      value: function emit(type, data) {
        emitEventCache(this.__target, type, { data: data });
        return this;
      } }]);


    return CustEvent;
  }();

  /**
        * @module dom
        * @author huzunjie
        * @description 一些常用的DOM判断及操作方法，可以使用dom.$('*')包装DOM，实现类jQuery的链式操作；当然这里的静态方法也可以直接使用。
        */

  var _divEl = inBrowser ? document.createElement('div') : {};
  var _textAttrName = 'innerText';
  'textContent' in _divEl && (_textAttrName = 'textContent');
  var _arrPrototype = Array.prototype;

  /**
                                        * 读取HTML元素属性值
                                        * @param {HTMLElement} el 目标元素
                                        * @param {String} attrName 目标属性名称
                                        * @return {String}
                                        */
  function getAttr(el, attrName) {
    return el.getAttribute(attrName);
  }

  /**
     * 设置HTML元素属性值
     * @param {HTMLElement} el 目标元素
     * @param {String} attrName 目标属性名称
     * @param {String} attrVal 目标属性值
     */
  function setAttr(el, attrName, attrVal) {
    if (attrVal === undefined) {
      el.removeAttribute(attrName);
    } else {
      el.setAttribute(attrName, attrVal);
    }
  }

  /**
     * 为HTML元素添加className
     * @param {HTMLElement} el 目标元素
     * @param {String} cls 要添加的className（多个以空格分割）
     */
  function addClassName(el, cls) {
    if (!cls || !(cls = cls.trim())) {
      return;
    }
    var clsArr = cls.split(/\s+/);
    if (el.classList) {
      clsArr.forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      var curCls = ' ' + (el.className || '') + ' ';
      clsArr.forEach(function (c) {
        curCls.indexOf(' ' + c + ' ') === -1 && (curCls += ' ' + c);
      });
      el.className = curCls.trim();
    }
  }

  /**
     * 为HTML元素移除className
     * @param {HTMLElement} el 目标元素
     * @param {String} cls 要移除的className（多个以空格分割）
     */
  function removeClassName(el, cls) {
    if (!cls || !(cls = cls.trim())) {
      return;
    }

    var clsArr = cls.split(/\s+/);
    if (el.classList) {
      clsArr.forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      var curCls = ' ' + el.className + ' ';
      clsArr.forEach(function (c) {
        var tar = ' ' + c + ' ';
        while (curCls.indexOf(tar) !== -1) {
          curCls = curCls.replace(tar, ' ');
        }
      });
      el.className = curCls.trim();
    }
  }

  /**
     * 检查HTML元素是否已设置className
     * @param {HTMLElement} el 目标元素
     * @param {String} className 要检查的className
     * @return {Boolean}
     */
  function hasClassName(el, className) {
    return new RegExp('(?:^|\\s)' + className + '(?=\\s|$)').test(el.className);
  }

  /**
     * addEventListener 是否已支持 passive
     * @return {Boolean}
     */
  var supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      } });

    if (inBrowser) window.addEventListener('test', null, opts);
  } catch (e) {
    console.error(e, " at js_sdk\\chimee\\chimee-mobile-player.browser.js:3981");
  }

  /**
     * 为HTML元素移除事件监听
     * @param {HTMLElement} el 目标元素
     * @param {String} type 事件名称
     * @param {Function} handler 处理函数
     * @param {Boolean} once 是否只监听一次
     * @param {Boolean} capture 是否在捕获阶段的监听
     */
  function removeEvent(el, type, handler) {
    var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
      capture = { passive: true };
    }
    if (once) {
      /* 尝试从缓存中读取包装后的方法 */
      var handlerWrap = removeEventCache(el, type + '_once', handler);
      if (handlerWrap) {
        handler = handlerWrap;
      }
    }
    el.removeEventListener(type, handler, capture);
  }

  /**
     * 为HTML元素添加事件监听
     * @param {HTMLElement} el 目标元素
     * @param {String} type 事件名称
     * @param {Function} handler 处理函数
     * @param {Boolean} once 是否只监听一次
     * @param {Boolean|Object} capture 是否在捕获阶段监听，这里也可以传入 { passive: true } 表示被动模式
     */
  function addEvent(el, type, handler) {
    var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
      capture = { passive: true };
    }
    if (once) {
      var oldHandler = handler;
      handler = function () {
        return function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          oldHandler.apply(this, args);
          removeEvent(el, type, handler, once, capture);
        };
      }();
      /* 将包装后的方法记录到缓存中 */
      addEventCache(el, type + '_once', oldHandler, handler);
    }

    el.addEventListener(type, handler, capture);
  }

  /**
     * 为HTML元素添加事件代理
     * @param {HTMLElement} el 目标元素
     * @param {String} selector 要被代理的元素
     * @param {String} type 事件名称
     * @param {Function} handler 处理函数
     * @param {Boolean} capture 是否在捕获阶段监听
     */
  function addDelegate(el, selector, type, handler) {
    var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
      capture = { passive: true };
    }
    var handlerWrap = function handlerWrap(e) {
      var targetElsArr = findParents(e.target || e.srcElement, el, true);
      var targetElArr = query(selector, el, true);
      var retEl = void 0;
      if (targetElArr.find) {
        retEl = targetElArr.find(function (seEl) {
          return targetElsArr.find(function (tgEl) {
            return seEl === tgEl;
          });
        });
      } else {
        // Fixed IE11 Array.find not defined bug
        targetElArr.forEach(function (seEl) {
          return !retEl && targetElsArr.forEach(function (tgEl) {
            if (!retEl && seEl === tgEl) {
              retEl = tgEl;
            }
          });
        });
      }
      retEl && handler.apply(retEl, arguments);
    };
    /* 将包装后的方法记录到缓存中 */
    addEventCache(el, type + '_delegate_' + selector, handler, handlerWrap);
    el.addEventListener(type, handlerWrap, capture);
  }

  /**
     * 为HTML元素移除事件代理
     * @param {HTMLElement} el 目标元素
     * @param {String} selector 要被代理的元素
     * @param {String} type 事件名称
     * @param {Function} handler 处理函数
     * @param {Boolean} capture 是否在捕获阶段监听
     */
  function removeDelegate(el, selector, type, handler) {
    var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
      capture = { passive: true };
    }
    /* 尝试从缓存中读取包装后的方法 */
    var handlerWrap = removeEventCache(el, type + '_delegate_' + selector, handler);
    handlerWrap && el.removeEventListener(type, handlerWrap, capture);
  }

  /**
     * 读取HTML元素样式值
     * @param {HTMLElement} el 目标元素
     * @param {String} key 样式key
     * @return {String}
     */
  function getStyle(el, key) {
    return (el.currentStyle || document.defaultView.getComputedStyle(el, null))[key] || el.style[key];
  }

  /**
     * 设置HTML元素样式值
     * @param {HTMLElement} el 目标元素
     * @param {String} key 样式key
     * @param {String} val 样式值
     */
  function setStyle(el, key, val) {
    if (isObject(key)) {
      for (var k in key) {
        setStyle(el, k, key[k]);
      }
    } else {
      el.style[key] = val;
    }
  }

  /**
     * 根据选择器查询目标元素
     * @param {String} selector 选择器,用于 querySelectorAll
     * @param {HTMLElement} container 父容器
     * @param {Boolean} toArray 强制输出为数组
     * @return {NodeList|Array}
     */
  function query(selector) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var toArray = arguments[2];

    var retNodeList = container.querySelectorAll(selector);
    return toArray ? _Array$from(retNodeList) : retNodeList;
  }

  /**
     * 从DOM树中移除el
     * @param {HTMLElement} el 目标元素
     */
  function removeEl(el) {
    el.parentNode.removeChild(el);
  }

  /**
     * 查找元素的父节点们
     * @param {HTMLElement} el 目标元素
     * @param {HTMLElement} endEl 最大父容器（不指定则找到html）
     * @param {Boolean} haveEl 包含当前元素
     * @param {Boolean} haveEndEl 包含设定的最大父容器
     */
  function findParents(el) {
    var endEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var haveEl = arguments[2];
    var haveEndEl = arguments[3];

    var retEls = [];
    if (haveEl) {
      retEls.push(el);
    }
    while (el && el.parentNode !== endEl) {
      el = el.parentNode;
      el && retEls.push(el);
    }
    if (haveEndEl) {
      retEls.push(endEl);
    }
    return retEls;
  }

  /**
     * @class NodeWrap
     * @description
     * NodeWrap DOM包装器，用以实现基本的链式操作
     * new dom.NodeWrap('*') 相当于 dom.$('*')
     * 这里面用于DOM操作的属性方法都是基于上面静态方法实现，有需要可以随时修改补充
     * @param {String} selector 选择器(兼容 String||HTMLString||NodeList||NodeArray||HTMLElement)
     * @param {HTMLElement} container 父容器（默认为document）
     */

  var NodeWrap = function () {
    function NodeWrap(selector) {
      var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

      _classCallCheck(this, NodeWrap);

      var _this = this;
      _this.selector = selector;

      /* String||NodeList||HTMLElement 识别处理 */
      var elsArr = void 0;
      if (selector && selector.constructor === NodeList) {
        /* 支持直接传入NodeList来构建包装器 */
        elsArr = makeArray(selector);
      } else if (isArray(selector)) {
        /* 支持直接传入Node数组来构建包装器 */
        elsArr = selector;
      } else if (isString(selector)) {
        if (selector.indexOf('<') === 0) {
          /* 支持直接传入HTML字符串来新建DOM并构建包装器 */
          _divEl.innerHTML = selector;
          elsArr = query('*', _divEl, true);
        } else {
          /* 支持直接传入字符串选择器来查找DOM并构建包装器 */
          elsArr = query(selector, container, true);
        }
      } else {
        /* 其他任意对象直接构建包装器 */
        elsArr = [selector];
      }
      _Object$assign(_this, elsArr);

      /* NodeWrap本意可以 extends Array省略构造方法中下面这部分代码，但目前编译不支持 */
      _this.length = elsArr.length;
    }

    /**
       * 循环遍历DOM集合
       * @param {Function} fn 遍历函数 fn(item, i)
       * @return {Object}
       */


    _createClass(NodeWrap, [{
      key: 'each',
      value: function each() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        _arrPrototype.forEach.apply(this, args);
        return this;
      }

      /**
         * 添加元素到DOM集合
         * @param {HTMLElement} el 要加入的元素
         * @return {this}
         */ },

    {
      key: 'push',
      value: function push() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        _arrPrototype.push.apply(this, args);
        return this;
      }

      /**
         * 截取DOM集合片段，并得到新的包装器splice
         * @param {Nubmer} start
         * @param {Nubmer} count
         * @return {NodeWrap} 新的DOM集合包装器
         */ },

    {
      key: 'splice',
      value: function splice() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return $(_arrPrototype.splice.apply(this, args));
      }

      /**
         * 查找子元素
         * @param {String} selector 选择器
         * @return {NodeWrap} 新的DOM集合包装器
         */ },

    {
      key: 'find',
      value: function find(selector) {
        var childs = [];
        this.each(function (el) {
          childs = childs.concat(query(selector, el, true));
        });
        var childsWrap = $(childs);
        childsWrap.parent = this;
        childsWrap.selector = selector;
        return childsWrap;
      }

      /**
         * 添加子元素
         * @param {HTMLElement} childEls 要添加的HTML元素
         * @return {this}
         */ },

    {
      key: 'append',
      value: function append(childEls) {
        var childsWrap = $(childEls);
        var firstEl = this[0];
        childsWrap.each(function (newEl) {
          return firstEl.appendChild(newEl);
        });
        return this;
      }

      /**
         * 将元素集合添加到指定容器
         * @param {HTMLElement} parentEl 要添加到父容器
         * @return {this}
         */ },

    {
      key: 'appendTo',
      value: function appendTo(parentEl) {
        $(parentEl).append(this);
        return this;
      }

      /**
         * DOM集合text内容读写操作
         * @param {String} val 文本内容（如果有设置该参数则执行写操作，否则执行读操作）
         * @return {this}
         */ },

    {
      key: 'text',
      value: function text(val) {
        if (arguments.length === 0) {
          return this[0][_textAttrName];
        }
        return this.each(function (el) {
          el[_textAttrName] = val;
        });
      }

      /**
         * DOM集合HTML内容读写操作
         * @param {String} html html内容（如果有设置该参数则执行写操作，否则执行读操作）
         * @return {this}
         */ },

    {
      key: 'html',
      value: function html(_html) {
        if (arguments.length === 0) {
          return this[0].innerHTML;
        }
        return this.each(function (el) {
          el.innerHTML = _html;
        });
      }

      /**
         * DOM集合属性读写操作
         * @param {String} name 属性名称
         * @param {String} val 属性值（如果有设置该参数则执行写操作，否则执行读操作）
         * @return {this}
         */ },

    {
      key: 'attr',
      value: function attr(name, val) {
        if (arguments.length === 1) {
          return getAttr(this[0], name);
        }
        return this.each(function (el) {
          return setAttr(el, name, val);
        });
      }

      /**
         * DOM集合dataset读写操作
         * @param {String} key 键名
         * @param {Any} val 键值（如果有设置该参数则执行写操作，否则执行读操作）
         * @return {this}
         */ },

    {
      key: 'data',
      value: function data(key, val) {
        if (arguments.length === 0) {
          return this[0].dataset || {};
        }
        if (arguments.length === 1) {
          return (this[0].dataset || {})[key];
        }
        return this.each(function (el) {
          (el.dataset || (el.dataset = {}))[key] = val;
        });
      }

      /**
         * DOM集合样式读写操作
         * @param {String} key 样式key
         * @param {String} val 样式值（如果有设置该参数则执行写操作，否则执行读操作）
         * @return {this}
         */ },

    {
      key: 'css',
      value: function css(key, val) {
        if (arguments.length === 1 && !isObject(key)) {
          return getStyle(this[0], key);
        }
        return this.each(function (el) {
          return setStyle(el, key, val);
        });
      }

      /**
         * 为DOM集合增加className
         * @param {String} cls 要增加的className
         * @return {this}
         */ },

    {
      key: 'addClass',
      value: function addClass(cls) {
        return this.each(function (el) {
          return addClassName(el, cls);
        });
      }

      /**
         * 移除当前DOM集合的className
         * @param {String} cls 要移除的className
         * @return {this}
         */ },

    {
      key: 'removeClass',
      value: function removeClass(cls) {
        return this.each(function (el) {
          return removeClassName(el, cls);
        });
      }

      /**
         * 检查索引0的DOM是否有className
         * @param {String} cls 要检查的className
         * @return {this}
         */ },

    {
      key: 'hasClass',
      value: function hasClass(cls) {
        return hasClassName(this[0], cls);
      }

      /**
         * 为DOM集合添加事件监听
         * @param {String} type 事件名称
         * @param {Function} handler 处理函数
         * @param {Boolean} once 是否只监听一次
         * @param {Boolean} capture 是否在捕获阶段监听
         * @return {this}
         */ },

    {
      key: 'on',
      value: function on(type, handler) {
        var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        return this.each(function (el) {
          return addEvent(el, type, handler, once, capture);
        });
      }

      /**
         * 为DOM集合解除事件监听
         * @param {String} type 事件名称
         * @param {Function} handler 处理函数
         * @param {Boolean} once 是否只监听一次
         * @param {Boolean} capture 是否在捕获阶段监听
         * @return {this}
         */ },

    {
      key: 'off',
      value: function off(type, handler) {
        var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        return this.each(function (el) {
          return removeEvent(el, type, handler, once, capture);
        });
      }

      /**
         * 为DOM集合绑定事件代理
         * @param {String} selector 目标子元素选择器
         * @param {String} type 事件名称
         * @param {Function} handler 处理函数
         * @param {Boolean} capture 是否在捕获阶段监听
         * @return {this}
         */ },

    {
      key: 'delegate',
      value: function delegate(selector, type, handler) {
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        return this.each(function (el) {
          return addDelegate(el, selector, type, handler, capture);
        });
      }

      /**
         * 为DOM集合解绑事件代理
         * @param {String} selector 目标子元素选择器
         * @param {String} type 事件名称
         * @param {Function} handler 处理函数
         * @param {Boolean} capture 是否在捕获阶段监听
         * @return {this}
         */ },

    {
      key: 'undelegate',
      value: function undelegate(selector, type, handler) {
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        return this.each(function (el) {
          return removeDelegate(el, selector, type, handler, capture);
        });
      }

      /**
         * 从DOM树中移除
         * @return {this}
         */ },

    {
      key: 'remove',
      value: function remove() {
        return this.each(function (el) {
          return removeEl(el);
        });
      } }]);


    return NodeWrap;
  }();

  function $(selector, container) {
    return selector.constructor === NodeWrap ? selector : new NodeWrap(selector, container);
  }

  // 20.1.2.4 Number.isNaN(number)


  _export(_export.S, 'Number', {
    isNaN: function isNaN(number) {
      // eslint-disable-next-line no-self-compare
      return number != number;
    } });


  var isNan = _core.Number.isNaN;

  var isNan$1 = createCommonjsModule(function (module) {
    module.exports = { "default": isNan, __esModule: true };
  });

  var _Number$isNaN = unwrapExports(isNan$1);

  // all object keys, includes non-enumerable and symbols



  var Reflect = _global.Reflect;
  var _ownKeys = Reflect && Reflect.ownKeys || function ownKeys(it) {
    var keys = _objectGopn.f(_anObject(it));
    var getSymbols = _objectGops.f;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };

  // https://github.com/tc39/proposal-object-getownpropertydescriptors






  _export(_export.S, 'Object', {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = _toIobject(object);
      var getDesc = _objectGopd.f;
      var keys = _ownKeys(O);
      var result = {};
      var i = 0;
      var key, desc;
      while (keys.length > i) {
        desc = getDesc(O, key = keys[i++]);
        if (desc !== undefined) _createProperty(result, key, desc);
      }
      return result;
    } });


  var getOwnPropertyDescriptors = _core.Object.getOwnPropertyDescriptors;

  var getOwnPropertyDescriptors$1 = createCommonjsModule(function (module) {
    module.exports = { "default": getOwnPropertyDescriptors, __esModule: true };
  });

  var _Object$getOwnPropertyDescriptors = unwrapExports(getOwnPropertyDescriptors$1);

  var getOwnPropertySymbols = _core.Object.getOwnPropertySymbols;

  var getOwnPropertySymbols$1 = createCommonjsModule(function (module) {
    module.exports = { "default": getOwnPropertySymbols, __esModule: true };
  });

  var _Object$getOwnPropertySymbols = unwrapExports(getOwnPropertySymbols$1);

  // 19.1.2.7 Object.getOwnPropertyNames(O)
  _objectSap('getOwnPropertyNames', function () {
    return _objectGopnExt.f;
  });

  var $Object$2 = _core.Object;
  var getOwnPropertyNames = function getOwnPropertyNames(it) {
    return $Object$2.getOwnPropertyNames(it);
  };

  var getOwnPropertyNames$1 = createCommonjsModule(function (module) {
    module.exports = { "default": getOwnPropertyNames, __esModule: true };
  });

  var _Object$getOwnPropertyNames = unwrapExports(getOwnPropertyNames$1);

  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

  var $getOwnPropertyDescriptor$1 = _objectGopd.f;

  _objectSap('getOwnPropertyDescriptor', function () {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor$1(_toIobject(it), key);
    };
  });

  var $Object$3 = _core.Object;
  var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    return $Object$3.getOwnPropertyDescriptor(it, key);
  };

  var getOwnPropertyDescriptor$1 = createCommonjsModule(function (module) {
    module.exports = { "default": getOwnPropertyDescriptor, __esModule: true };
  });

  var _Object$getOwnPropertyDescriptor = unwrapExports(getOwnPropertyDescriptor$1);

  /**
                                                                                     * bind the function with some context. we have some fallback strategy here
                                                                                     * @param {function} fn the function which we need to bind the context on
                                                                                     * @param {any} context the context object
                                                                                     */
  function bind$1(fn, context) {
    if (fn.bind) {
      return fn.bind(context);
    } else if (fn.apply) {
      return function __autobind__() {
        for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return fn.apply(context, args);
      };
    } else {
      return function __autobind__() {
        for (var _len3 = arguments.length, args = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return fn.call.apply(fn, [context].concat(_toConsumableArray(args)));
      };
    }
  }

  /**
     * get an deep property
     */
  function getDeepProperty$1(obj, keys) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$throwError = _ref.throwError,
    throwError = _ref$throwError === undefined ? false : _ref$throwError,
    backup = _ref.backup;

    if (isString(keys)) {
      keys = keys.split('.');
    }
    if (!isArray(keys)) {
      throw new TypeError('keys of getDeepProperty must be string or Array<string>');
    }
    var read = [];
    var target = obj;
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i];
      if (isVoid(target)) {
        if (throwError) {
          throw new Error('obj' + (read.length > 0 ? '.' + read.join('.') : ' itself') + ' is ' + target);
        } else {
          return backup;
        }
      }
      target = target[key];
      read.push(key);
    }
    return target;
  }

  var ITERATOR$4 = _wks('iterator');

  var core_isIterable = _core.isIterable = function (it) {
    var O = Object(it);
    return O[ITERATOR$4] !== undefined ||
    '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || _iterators.hasOwnProperty(_classof(O));
  };

  var isIterable = core_isIterable;

  var isIterable$1 = createCommonjsModule(function (module) {
    module.exports = { "default": isIterable, __esModule: true };
  });

  unwrapExports(isIterable$1);

  var core_getIterator = _core.getIterator = function (it) {
    var iterFn = core_getIteratorMethod(it);
    if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
    return _anObject(iterFn.call(it));
  };

  var getIterator = core_getIterator;

  var getIterator$1 = createCommonjsModule(function (module) {
    module.exports = { "default": getIterator, __esModule: true };
  });

  var _getIterator = unwrapExports(getIterator$1);

  var slicedToArray = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    var _isIterable3 = _interopRequireDefault(isIterable$1);



    var _getIterator3 = _interopRequireDefault(getIterator$1);

    function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

    exports.default = function () {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function (arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if ((0, _isIterable3.default)(Object(arr))) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();
  });

  var _slicedToArray = unwrapExports(slicedToArray);

  var SPECIES$2 = _wks('species');

  var _arraySpeciesConstructor = function _arraySpeciesConstructor(original) {
    var C;
    if (_isArray(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
      if (_isObject(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    }return C === undefined ? Array : C;
  };

  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)


  var _arraySpeciesCreate = function _arraySpeciesCreate(original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  };

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex





  var _arrayMethods = function _arrayMethods(TYPE, $create) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    var create = $create || _arraySpeciesCreate;
    return function ($this, callbackfn, that) {
      var O = _toObject($this);
      var self = _iobject(O);
      var f = _ctx(callbackfn, that, 3);
      var length = _toLength(self.length);
      var index = 0;
      var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var val, res;
      for (; length > index; index++) {if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);
          if (TYPE) {
            if (IS_MAP) result[index] = res; // map
            else if (res) switch (TYPE) {
                case 3:return true; // some
                case 5:return val; // find
                case 6:return index; // findIndex
                case 2:result.push(val); // filter
              } else if (IS_EVERY) return false; // every
          }
        }}
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  var _validateCollection = function _validateCollection(it, TYPE) {
    if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
    return it;
  };

  var getWeak = _meta.getWeak;







  var arrayFind = _arrayMethods(5);
  var arrayFindIndex = _arrayMethods(6);
  var id$1 = 0;

  // fallback for uncaught frozen keys
  var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
    return that._l || (that._l = new UncaughtFrozenStore());
  };
  var UncaughtFrozenStore = function UncaughtFrozenStore() {
    this.a = [];
  };
  var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
    return arrayFind(store.a, function (it) {
      return it[0] === key;
    });
  };
  UncaughtFrozenStore.prototype = {
    get: function get(key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function has(key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function set(key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;else
      this.a.push([key, value]);
    },
    'delete': function _delete(key) {
      var index = arrayFindIndex(this.a, function (it) {
        return it[0] === key;
      });
      if (~index) this.a.splice(index, 1);
      return !!~index;
    } };


  var _collectionWeak = {
    getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        _anInstance(that, C, NAME, '_i');
        that._t = NAME; // collection type
        that._i = id$1++; // collection id
        that._l = undefined; // leak store for uncaught frozen objects
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
      });
      _redefineAll(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        'delete': function _delete(key) {
          if (!_isObject(key)) return false;
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
          return data && _has(data, this._i) && delete data[this._i];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has(key) {
          if (!_isObject(key)) return false;
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
          return data && _has(data, this._i);
        } });

      return C;
    },
    def: function def(that, key, value) {
      var data = getWeak(_anObject(key), true);
      if (data === true) uncaughtFrozenStore(that).set(key, value);else
      data[that._i] = value;
      return that;
    },
    ufstore: uncaughtFrozenStore };


  var dP$2 = _objectDp.f;
  var each = _arrayMethods(0);


  var _collection = function _collection(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = _global[NAME];
    var C = Base;
    var ADDER = IS_MAP ? 'set' : 'add';
    var proto = C && C.prototype;
    var O = {};
    if (!_descriptors || typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
      new C().entries().next();
    }))) {
      // create collection constructor
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      _redefineAll(C.prototype, methods);
      _meta.NEED = true;
    } else {
      C = wrapper(function (target, iterable) {
        _anInstance(target, C, NAME, '_c');
        target._c = new Base();
        if (iterable != undefined) _forOf(iterable, IS_MAP, target[ADDER], target);
      });
      each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
        var IS_ADDER = KEY == 'add' || KEY == 'set';
        if (KEY in proto && !(IS_WEAK && KEY == 'clear')) _hide(C.prototype, KEY, function (a, b) {
          _anInstance(this, C, KEY);
          if (!IS_ADDER && IS_WEAK && !_isObject(a)) return KEY == 'get' ? undefined : false;
          var result = this._c[KEY](a === 0 ? 0 : a, b);
          return IS_ADDER ? this : result;
        });
      });
      IS_WEAK || dP$2(C.prototype, 'size', {
        get: function get() {
          return this._c.size;
        } });

    }

    _setToStringTag(C, NAME);

    O[NAME] = C;
    _export(_export.G + _export.W + _export.F, O);

    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

    return C;
  };

  var es6_weakMap = createCommonjsModule(function (module) {
    var each = _arrayMethods(0);







    var WEAK_MAP = 'WeakMap';
    var getWeak = _meta.getWeak;
    var isExtensible = Object.isExtensible;
    var uncaughtFrozenStore = _collectionWeak.ufstore;
    var tmp = {};
    var InternalMap;

    var wrapper = function wrapper(get) {
      return function WeakMap() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    };

    var methods = {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        if (_isObject(key)) {
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
          return data ? data[this._i] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
      } };


    // 23.3 WeakMap Objects
    var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

    // IE11 WeakMap frozen keys fix
    if (_fails(function () {return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7;})) {
      InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
      _objectAssign(InternalMap.prototype, methods);
      _meta.NEED = true;
      each(['delete', 'has', 'get', 'set'], function (key) {
        var proto = $WeakMap.prototype;
        var method = proto[key];
        _redefine(proto, key, function (a, b) {
          // store frozen objects on internal weakmap shim
          if (_isObject(a) && !isExtensible(a)) {
            if (!this._f) this._f = new InternalMap();
            var result = this._f[key](a, b);
            return key == 'set' ? this : result;
            // store all the rest on native weakmap
          }return method.call(this, a, b);
        });
      });
    }
  });

  // https://tc39.github.io/proposal-setmap-offrom/


  var _setCollectionOf = function _setCollectionOf(COLLECTION) {
    _export(_export.S, COLLECTION, { of: function of() {
        var length = arguments.length;
        var A = new Array(length);
        while (length--) {A[length] = arguments[length];}
        return new this(A);
      } });
  };

  // https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
  _setCollectionOf('WeakMap');

  // https://tc39.github.io/proposal-setmap-offrom/





  var _setCollectionFrom = function _setCollectionFrom(COLLECTION) {
    _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
        var mapFn = arguments[1];
        var mapping, A, n, cb;
        _aFunction(this);
        mapping = mapFn !== undefined;
        if (mapping) _aFunction(mapFn);
        if (source == undefined) return new this();
        A = [];
        if (mapping) {
          n = 0;
          cb = _ctx(mapFn, arguments[2], 2);
          _forOf(source, false, function (nextItem) {
            A.push(cb(nextItem, n++));
          });
        } else {
          _forOf(source, false, A.push, A);
        }
        return new this(A);
      } });
  };

  // https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
  _setCollectionFrom('WeakMap');

  var weakMap = _core.WeakMap;

  var weakMap$1 = createCommonjsModule(function (module) {
    module.exports = { "default": weakMap, __esModule: true };
  });

  var _WeakMap = unwrapExports(weakMap$1);

  var defineProperty$3 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    var _defineProperty2 = _interopRequireDefault(defineProperty$1);

    function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

    exports.default = function (obj, key, value) {
      if (key in obj) {
        (0, _defineProperty2.default)(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true });

      } else {
        obj[key] = value;
      }

      return obj;
    };
  });

  var _defineProperty = unwrapExports(defineProperty$3);

  // 19.1.2.15 Object.preventExtensions(O)

  var meta = _meta.onFreeze;

  _objectSap('preventExtensions', function ($preventExtensions) {
    return function preventExtensions(it) {
      return $preventExtensions && _isObject(it) ? $preventExtensions(meta(it)) : it;
    };
  });

  var preventExtensions = _core.Object.preventExtensions;

  var preventExtensions$1 = createCommonjsModule(function (module) {
    module.exports = { "default": preventExtensions, __esModule: true };
  });

  unwrapExports(preventExtensions$1);

  var getOwnPropertyDescriptor$2 = _Object$getOwnPropertyDescriptor;
  // **********************  对象操作  ************************
  /**
   * sort Object attributes by function
   * and transfer them into array
   * @param  {Object} obj Object form from numric
   * @param  {Function} fn sort function
   * @return {Array} the sorted attirbutes array
   */


  /**
       * to check if an descriptor
       * @param {anything} desc
       */
  function isDescriptor(desc) {
    if (!desc || !desc.hasOwnProperty) {
      return false;
    }

    var keys = ['value', 'initializer', 'get', 'set'];

    for (var i = 0, l = keys.length; i < l; i++) {
      if (desc.hasOwnProperty(keys[i])) {
        return true;
      }
    }
    return false;
  }
  /**
     * to check if the descirptor is an accessor descriptor
     * @param {descriptor} desc it should be a descriptor better
     */
  function isAccessorDescriptor(desc) {
    return !!desc && (isFunction(desc.get) || isFunction(desc.set)) && isBoolean(desc.configurable) && isBoolean(desc.enumerable) && desc.writable === undefined;
  }
  /**
     * to check if the descirptor is an data descriptor
     * @param {descriptor} desc it should be a descriptor better
     */
  function isDataDescriptor(desc) {
    return !!desc && desc.hasOwnProperty('value') && isBoolean(desc.configurable) && isBoolean(desc.enumerable) && isBoolean(desc.writable);
  }
  /**
     * to check if the descirptor is an initiallizer descriptor
     * @param {descriptor} desc it should be a descriptor better
     */
  function isInitializerDescriptor(desc) {
    return !!desc && isFunction(desc.initializer) && isBoolean(desc.configurable) && isBoolean(desc.enumerable) && isBoolean(desc.writable);
  }
  /**
     * set one value on the object
     * @param {string} key
     */
  function createDefaultSetter(key) {
    return function set(newValue) {
      _Object$defineProperty(this, key, {
        configurable: true,
        writable: true,
        // IS enumerable when reassigned by the outside word
        enumerable: true,
        value: newValue });

      return newValue;
    };
  }

  /**
     * Compress many function into one function, but this function only accept one arguments;
     * @param {Array<Function>} fns the array of function we need to compress into one function
     * @param {string} errmsg When we check that there is something is not function, we will throw an error, you can set your own error message
     */
  function compressOneArgFnArray(fns) {
    var errmsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'You must pass me an array of function';

    if (!isArray(fns) || fns.length < 1) {
      throw new TypeError(errmsg);
    }
    if (fns.length === 1) {
      if (!isFunction(fns[0])) {
        throw new TypeError(errmsg);
      }
      return fns[0];
    }
    return fns.reduce(function (prev, curr) {
      if (!isFunction(curr) || !isFunction(prev)) throw new TypeError(errmsg);
      return function (value) {
        return bind$1(curr, this)(bind$1(prev, this)(value));
      };
    });
  }

  function getOwnKeysFn() {
    var getOwnPropertyNames = _Object$getOwnPropertyNames,
    getOwnPropertySymbols = _Object$getOwnPropertySymbols;

    return isFunction(getOwnPropertySymbols) ? function (obj) {
      // $FlowFixMe: do not support symwbol yet
      return _Array$from(getOwnPropertyNames(obj).concat(getOwnPropertySymbols(obj)));
    } : getOwnPropertyNames;
  }

  var getOwnKeys = getOwnKeysFn();

  function getOwnPropertyDescriptorsFn() {
    // $FlowFixMe: In some environment, Object.getOwnPropertyDescriptors has been implemented;
    return isFunction(_Object$getOwnPropertyDescriptors) ? _Object$getOwnPropertyDescriptors : function (obj) {
      return getOwnKeys(obj).reduce(function (descs, key) {
        descs[key] = getOwnPropertyDescriptor$2(obj, key);
        return descs;
      }, {});
    };
  }

  var getOwnPropertyDescriptors$2 = getOwnPropertyDescriptorsFn();

  function compressMultipleDecorators() {
    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    if (!fns.length) throw new TypeError('You must pass in decorators in compressMultipleDecorators');
    fns.forEach(function (fn) {
      if (!isFunction(fn)) throw new TypeError('Decorators must be a function, but not "' + fn + '" in ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
    });
    if (fns.length === 1) return fns[0];
    return function (obj, prop, descirptor) {
      // $FlowFixMe: the reduce will return a descriptor
      return fns.reduce(function (descirptor, fn) {
        return fn(obj, prop, descirptor);
      }, descirptor);
    };
  }

  function accessor() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    get = _ref.get,
    set = _ref.set;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref2$preGet = _ref2.preGet,
    preGet = _ref2$preGet === undefined ? false : _ref2$preGet,
    _ref2$preSet = _ref2.preSet,
    preSet = _ref2$preSet === undefined ? true : _ref2$preSet;

    if (!isFunction(get) && !isFunction(set) && !(isArray(get) && get.length > 0) && !(isArray(set) && set.length > 0)) throw new TypeError("@accessor need a getter or setter. If you don't need to add setter/getter. You should remove @accessor");
    var errmsg = '@accessor only accept function or array of function as getter/setter';
    get = isArray(get) ? compressOneArgFnArray(get, errmsg) : get;
    set = isArray(set) ? compressOneArgFnArray(set, errmsg) : set;
    return function (obj, prop, descriptor) {
      var _ref3 = descriptor || {},
      _ref3$configurable = _ref3.configurable,
      configurable = _ref3$configurable === undefined ? true : _ref3$configurable,
      _ref3$enumerable = _ref3.enumerable,
      enumerable = _ref3$enumerable === undefined ? true : _ref3$enumerable;

      var hasGet = isFunction(get);
      var hasSet = isFunction(set);
      var handleGet = function handleGet(value) {
        // $FlowFixMe: it's really function here
        return hasGet ? bind$1(get, this)(value) : value;
      };
      var handleSet = function handleSet(value) {
        // $FlowFixMe: it's really function here
        return hasSet ? bind$1(set, this)(value) : value;
      };
      if (isAccessorDescriptor(descriptor)) {
        var originGet = descriptor.get,
        originSet = descriptor.set;

        var hasOriginGet = isFunction(originGet);
        var hasOriginSet = isFunction(originSet);
        var getter = hasOriginGet || hasGet ? function () {
          var _this = this;

          var boundGetter = bind$1(handleGet, this);
          var originBoundGetter = function originBoundGetter() {
            return hasOriginGet
            // $FlowFixMe: we have do a check here
            ? bind$1(originGet, _this)() : undefined;
          };
          var order = preGet ? [boundGetter, originBoundGetter] : [originBoundGetter, boundGetter];
          // $FlowFixMe: it's all function here
          return order.reduce(function (value, fn) {
            return fn(value);
          }, undefined);
        } : undefined;
        var setter = hasOriginSet || hasSet ? function (val) {
          var _this2 = this;

          var boundSetter = bind$1(handleSet, this);
          var originBoundSetter = function originBoundSetter(value) {
            return hasOriginSet
            // $FlowFixMe: flow act like a retarded child on optional property
            ? bind$1(originSet, _this2)(value) : value;
          };
          var order = preSet ? [boundSetter, originBoundSetter] : [originBoundSetter, boundSetter];
          return order.reduce(function (value, fn) {
            return fn(value);
          }, val);
        } : undefined;
        return {
          get: getter,
          set: setter,
          configurable: configurable,
          enumerable: enumerable };

      } else if (isInitializerDescriptor(descriptor)) {
        // $FlowFixMe: disjoint union is horrible, descriptor is initializerDescriptor now
        var initializer = descriptor.initializer;

        var value = void 0;
        var inited = false;
        return {
          get: function get() {
            var boundFn = bind$1(handleGet, this);
            if (inited) return boundFn(value);
            value = bind$1(initializer, this)();
            inited = true;
            return boundFn(value);
          },
          set: function set(val) {
            var boundFn = bind$1(handleSet, this);
            value = preSet ? boundFn(val) : val;
            inited = true;
            if (!preSet) {
              boundFn(value);
            }
            return value;
          },

          configurable: configurable,
          enumerable: enumerable };

      } else {
        // $FlowFixMe: disjoint union is horrible, descriptor is DataDescriptor now
        var _ref4 = descriptor || {},
        _value = _ref4.value;

        return {
          get: function get() {
            return bind$1(handleGet, this)(_value);
          },
          set: function set(val) {
            var boundFn = bind$1(handleSet, this);
            _value = preSet ? boundFn(val) : val;
            if (!preSet) {
              boundFn(_value);
            }
            return _value;
          },

          configurable: configurable,
          enumerable: enumerable };

      }
    };
  }

  function before() {
    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    if (fns.length === 0) throw new Error("@before accept at least one parameter. If you don't need to preprocess before your function, do not add @before decorators");
    if (fns.length > 2 && isDescriptor(fns[2])) {
      throw new Error('You may use @before straightly, @before return decorators, you should call it before you set it as decorator.');
    }
    for (var i = fns.length - 1; i > -1; i--) {
      if (!isFunction(fns[i])) throw new TypeError('@before only accept function parameter');
    }
    return function (obj, prop, descriptor) {
      var _ref = descriptor || {},
      fn = _ref.value,
      configurable = _ref.configurable,
      enumerable = _ref.enumerable,
      writable = _ref.writable;

      if (!isFunction(fn)) throw new TypeError('@before can only be used on function, please check the property "' + prop + '" is a method or not.');
      var handler = function handler() {
        var _this = this;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var paras = fns.reduce(function (paras, fn) {
          var result = bind$1(fn, _this).apply(undefined, _toConsumableArray(paras));
          return result === undefined ? paras : isArray(result) ? result
          // $FlowFixMe: what the hell, it can be anything
          : [result];
        }, args);
        return bind$1(fn, this).apply(undefined, _toConsumableArray(paras));
      };
      return {
        value: handler,
        configurable: configurable,
        enumerable: enumerable,
        writable: writable };

    };
  }

  function after() {
    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    if (fns.length === 0) throw new Error("@after accept at least one parameter. If you don't need to preprocess after your function, do not add @after decorators");
    if (fns.length > 2 && isDescriptor(fns[2])) {
      throw new Error('You may have used @after straightly. @after return decorators. You should call it before you use it as decorators');
    }
    var fn = compressOneArgFnArray(fns, '@after only accept function parameter');
    return function (obj, prop, descriptor) {
      var _ref = descriptor || {},
      value = _ref.value,
      configurable = _ref.configurable,
      enumerable = _ref.enumerable,
      writable = _ref.writable;

      if (!isFunction(value)) throw new TypeError('@after can only be used on function, please checkout your property "' + prop + '" is a method or not.');
      var handler = function handler() {
        var ret = bind$1(value, this).apply(undefined, arguments);
        return bind$1(fn, this)(ret);
      };
      return {
        value: handler,
        configurable: configurable,
        enumerable: enumerable,
        writable: writable };

    };
  }

  function initialize() {
    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    if (fns.length === 0) throw new Error("@initialize accept at least one parameter. If you don't need to initialize your value, do not add @initialize.");
    if (fns.length > 2 && isDescriptor(fns[2])) {
      throw new Error('You may use @initialize straightly, @initialize return decorators, you need to call it');
    }
    var fn = compressOneArgFnArray(fns, '@initialize only accept function parameter');
    return function (obj, prop, descriptor) {
      if (descriptor === undefined) {
        return {
          value: bind$1(fn, obj)(),
          configurable: true,
          writable: true,
          enumerable: true };

      }
      if (isAccessorDescriptor(descriptor)) {
        var hasBeenReset = false;
        var originSet = descriptor.set;

        return accessor({
          get: function get(value) {
            if (hasBeenReset) return value;
            return bind$1(fn, this)(value);
          },

          set: originSet ? function (value) {
            hasBeenReset = true;
            return value;
          } : undefined })(
        obj, prop, descriptor);
      }
      /**
         * when we set decorator on propery
         * we will get a descriptor with initializer
         * as they will be attach on the instance later
         * so, we need to substitute the initializer function
         */
      if (isInitializerDescriptor(descriptor)) {
        // $FlowFixMe: useless disjoint union
        var initializer = descriptor.initializer;

        var handler = function handler() {
          return bind$1(fn, this)(bind$1(initializer, this)());
        };
        return {
          initializer: handler,
          configurable: descriptor.configurable,
          // $FlowFixMe: useless disjoint union
          writable: descriptor.writable,
          enumerable: descriptor.enumerable };

      }
      // $FlowFixMe: useless disjoint union
      var value = bind$1(fn, this)(descriptor.value);
      return {
        value: value,
        // $FlowFixMe: useless disjoint union
        writable: descriptor.writable,
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable };

    };
  }

  var getOwnPropertyDescriptor$1$1 = _Object$getOwnPropertyDescriptor;
  var defineProperty$4 = _Object$defineProperty;

  function setAlias(root, prop, _ref, obj, key, _ref2) {
    var configurable = _ref.configurable,
    enumerable = _ref.enumerable;
    var force = _ref2.force,
    omit = _ref2.omit;

    var originDesc = getOwnPropertyDescriptor$1$1(obj, key);
    if (originDesc !== undefined) {
      if (omit) return;
      // TODO: we should add an github link here
      if (!force) throw new Error('"' + prop + '" is an existing property, if you want to override it, please set "force" true in @alias option.');
      if (!originDesc.configurable) {
        throw new Error('property "' + prop + '" is unconfigurable.');
      }
    }
    defineProperty$4(obj, key, {
      get: function get() {
        return root[prop];
      },
      set: function set(value) {
        root[prop] = value;
        return prop;
      },

      configurable: configurable,
      enumerable: enumerable });

  }
  function alias(other, key, option) {
    // set argument into right position
    if (arguments.length === 2) {
      if (isString(other)) {
        // $FlowFixMe: i will check this later
        option = key;
        key = other;
        other = undefined;
      }
    } else if (arguments.length === 1) {
      // $FlowFixMe: i will check this later
      key = other;
      other = undefined;
    }
    // argument validate
    if (!isString(key)) throw new TypeError('@alias need a string as a key to find the porperty to set alias on');
    var illegalObjErrorMsg = 'If you want to use @alias to set alias on other instance, you must pass in a legal instance';
    if (other !== undefined && isPrimitive(other)) throw new TypeError(illegalObjErrorMsg);

    var _ref3 = isObject(option) ? option : { force: false, omit: false },
    force = _ref3.force,
    omit = _ref3.omit;

    return function (obj, prop, descriptor) {
      descriptor = descriptor || {
        value: undefined,
        configurable: true,
        writable: true,
        enumerable: true };

      function getTargetAndName(other, obj, key) {
        var target = isPrimitive(other) ? obj : other;
        var keys = key.split('.');

        var _keys$slice = keys.slice(-1),
        _keys$slice2 = _slicedToArray(_keys$slice, 1),
        name = _keys$slice2[0];

        target = getDeepProperty$1(target, keys.slice(0, -1), { throwError: true });
        if (isPrimitive(target)) {
          throw new TypeError(illegalObjErrorMsg);
        }
        return {
          target: target,
          name: name };

      }
      if (isInitializerDescriptor(descriptor)) {
        return initialize(function (value) {
          var _getTargetAndName = getTargetAndName(other, this, key),
          target = _getTargetAndName.target,
          name = _getTargetAndName.name;

          setAlias(this, prop, descriptor, target, name, { force: force, omit: omit });
          return value;
        })(obj, prop, descriptor);
      }
      if (isAccessorDescriptor(descriptor)) {
        var inited = void 0;
        var handler = function handler(value) {
          if (inited) return value;

          var _getTargetAndName2 = getTargetAndName(other, this, key),
          target = _getTargetAndName2.target,
          name = _getTargetAndName2.name;

          setAlias(this, prop, descriptor, target, name, { force: force, omit: omit });
          inited = true;
          return value;
        };
        return accessor({ get: handler, set: handler })(obj, prop, descriptor);
      }

      var _getTargetAndName3 = getTargetAndName(other, obj, key),
      target = _getTargetAndName3.target,
      name = _getTargetAndName3.name;

      setAlias(obj, prop, descriptor, target, name, { force: force, omit: omit });
      return descriptor;
    };
  }

  var defineProperty$1$1 = _Object$defineProperty;

  function classify(decorator) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    requirement = _ref.requirement,
    _ref$customArgs = _ref.customArgs,
    customArgs = _ref$customArgs === undefined ? false : _ref$customArgs;

    return function () {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$exclude = _ref2.exclude,
      exclude = _ref2$exclude === undefined ? [] : _ref2$exclude,
      _ref2$include = _ref2.include,
      include = _ref2$include === undefined ? [] : _ref2$include,
      _ref2$construct = _ref2.construct,
      construct = _ref2$construct === undefined ? false : _ref2$construct,
      _ref2$self = _ref2.self,
      self = _ref2$self === undefined ? false : _ref2$self;

      if (!isArray(exclude)) throw new TypeError('options.exclude must be an array');
      if (!isArray(include)) throw new TypeError('options.include must be an array');
      return function (Klass) {
        var isClass = isFunction(Klass);
        if (!self && !isClass) throw new TypeError('@' + decorator.name + 'Class can only be used on class');
        if (self && isPrimitive(Klass)) throw new TypeError('@' + decorator.name + 'Class must be used on non-primitive type value in \'self\' mode');
        var prototype = self ? Klass : Klass.prototype;
        if (isVoid(prototype)) throw new Error('The prototype of the ' + Klass.name + ' is empty, please check it');
        var descs = getOwnPropertyDescriptors$2(prototype);
        getOwnKeys(prototype).concat(include).forEach(function (key) {
          var desc = descs[key];
          if (key === 'constructor' && !construct || self && isClass && ['name', 'length', 'prototype'].indexOf(key) > -1 || exclude.indexOf(key) > -1 || isFunction(requirement) && requirement(prototype, key, desc, { self: self }) === false) return;
          defineProperty$1$1(prototype, key, (customArgs ? decorator.apply(undefined, _toConsumableArray(args)) : decorator)(prototype, key, desc));
        });
      };
    };
  }

  var autobindClass = classify(autobind, {
    requirement: function requirement(obj, prop, desc) {
      // $FlowFixMe: it's data descriptor now
      return isDataDescriptor(desc) && isFunction(desc.value);
    } });


  var mapStore = void 0;
  // save bound function for super
  function getBoundSuper(obj, fn) {
    if (typeof _WeakMap === 'undefined') {
      throw new Error('Using @autobind on ' + fn.name + '() requires WeakMap support due to its use of super.' + fn.name + '()');
    }

    if (!mapStore) {
      mapStore = new _WeakMap();
    }

    if (mapStore.has(obj) === false) {
      mapStore.set(obj, new _WeakMap());
    }

    var superStore = mapStore.get(obj);
    // $FlowFixMe: already insure superStore is not undefined
    if (superStore.has(fn) === false) {
      // $FlowFixMe: already insure superStore is not undefined
      superStore.set(fn, bind$1(fn, obj));
    }
    // $FlowFixMe: already insure superStore is not undefined
    return superStore.get(fn);
  }
  /**
     * auto bind the function on the class, just support function
     * @param {Object} obj Target Object
     * @param {string} prop prop strong
     * @param {Object} descriptor
     */
  function autobind(obj, prop, descriptor) {
    if (arguments.length === 1) return autobindClass()(obj);

    var _ref = descriptor || {},
    fn = _ref.value,
    configurable = _ref.configurable;

    if (!isFunction(fn)) {
      throw new TypeError('@autobind can only be used on functions, not "' + fn + '" in ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) + ' on property "' + prop + '"');
    }
    var constructor = obj.constructor;

    return {
      configurable: configurable,
      enumerable: false,
      get: function get() {
        var _this = this;

        var boundFn = function boundFn() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return fn.call.apply(fn, [_this].concat(_toConsumableArray(args)));
        };
        // Someone accesses the property directly on the prototype on which it is
        // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
        if (this === obj) {
          return fn;
        }
        // Someone accesses the property directly on a prototype,
        // but it was found up the chain, not defined directly on it
        // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
        if (this.constructor !== constructor && _Object$getPrototypeOf(this).constructor === constructor) {
          return fn;
        }

        // Autobound method calling super.sameMethod() which is also autobound and so on.
        if (this.constructor !== constructor && prop in this.constructor.prototype) {
          return getBoundSuper(this, fn);
        }
        _Object$defineProperty(this, prop, {
          configurable: true,
          writable: true,
          // NOT enumerable when it's a bound method
          enumerable: false,
          value: boundFn });


        return boundFn;
      },

      set: createDefaultSetter(prop) };

  }

  var defineProperty$2$1 = _Object$defineProperty;
  /**
                                                    * make one attr only can be read, but could not be rewrited/ deleted
                                                    * @param {Object} obj
                                                    * @param {string} prop
                                                    * @param {Object} descriptor
                                                    * @return {descriptor}
                                                    */

  function frozen(obj, prop, descriptor) {
    if (descriptor === undefined) {
      return {
        value: undefined,
        writable: false,
        enumerable: false,
        configurable: false };

    }
    descriptor.enumerable = false;
    descriptor.configurable = false;
    if (isAccessorDescriptor(descriptor)) {
      var _get = descriptor.get;

      descriptor.set = undefined;
      if (!isFunction(_get)) {
        return;
      }
      return {
        get: function get() {
          var value = bind$1(_get, this)();
          defineProperty$2$1(this, prop, {
            value: value,
            writable: false,
            configurable: false,
            enumerable: false });

          return value;
        },

        set: undefined,
        configurable: false,
        enumerable: false };

    }
    // $FlowFixMe: comeon, can disjoint union be reliable?
    descriptor.writable = false;
    return descriptor;
  }

  var getOwnPropertyDescriptor$2$1 = _Object$getOwnPropertyDescriptor;
  var defineProperty$3$1 = _Object$defineProperty;

  function waituntil(key) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    other = _ref.other;

    if (!isFunction(key) && !isPromise(key) && !isString(key)) throw new TypeError('@waitUntil only accept Function, Promise or String');
    return function (obj, prop, descriptor) {
      var _ref2 = descriptor || {},
      _value = _ref2.value,
      configurable = _ref2.configurable;

      if (!isFunction(_value)) throw new TypeError('@waituntil can only be used on function, but not ' + _value + ' on property "' + prop + '"');
      var binded = false;
      var waitingQueue = [];
      var canIRun = isPromise(key) ? function () {
        return key;
      } : isFunction(key) ? key : function () {
        // $FlowFixMe: We have use isPromise to exclude
        var keys = key.split('.');
        var prop = keys.slice(-1);
        var originTarget = isPrimitive(other) ? this : other;
        if (!binded) {
          var target = getDeepProperty$1(originTarget, keys.slice(0, -1));
          if (isVoid(target)) return target;
          var _descriptor = getOwnPropertyDescriptor$2$1(target, prop);
          /**
                                                                         * create a setter hook here
                                                                         * when it get ture, it will run all function in waiting queue immediately
                                                                         */
          var set = function set(value) {
            if (value === true) {
              while (waitingQueue.length > 0) {
                waitingQueue[0]();
                waitingQueue.shift();
              }
            }
            return value;
          };
          var desc = isDescriptor(_descriptor) ? accessor({ set: set })(target, prop, _descriptor) : accessor({ set: set })(target, prop, {
            value: undefined,
            configurable: true,
            enumerable: true,
            writable: true });

          defineProperty$3$1(target, prop, desc);
          binded = true;
        }
        return getDeepProperty$1(originTarget, keys);
      };
      return {
        value: function value() {
          var _this = this;

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var boundFn = bind$1(_value, this);
          var runnable = bind$1(canIRun, this).apply(undefined, args);
          if (isPromise(runnable)) {
            return _Promise.resolve(runnable).then(function () {
              return bind$1(_value, _this).apply(undefined, args);
            });
          } else if (runnable === true) {
            return bind$1(_value, this).apply(undefined, args);
          } else {
            return new _Promise(function (resolve) {
              var cb = function cb() {
                boundFn.apply(undefined, args);
                resolve();
              };
              waitingQueue.push(cb);
            });
          }
        },

        // function should not be enmuerable
        enumerable: false,
        configurable: configurable,
        // as we have delay this function
        // it's not a good idea to change it
        writable: false };

    };
  }

  function nonenumerable(obj, prop, descriptor) {
    if (descriptor === undefined) {
      return {
        value: undefined,
        enumerable: false,
        configurable: true,
        writable: true };

    }
    descriptor.enumerable = false;
    return descriptor;
  }

  var defineProperty$6 = _Object$defineProperty;
  var getOwnPropertyDescriptor$3 = _Object$getOwnPropertyDescriptor;


  function applyDecorators(Class, props) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$self = _ref.self,
    self = _ref$self === undefined ? false : _ref$self,
    _ref$omit = _ref.omit,
    omit = _ref$omit === undefined ? false : _ref$omit;

    var isPropsFunction = isFunction(props);
    if (isPropsFunction || isArray(props)) {
      // apply decorators on class
      if (!isFunction(Class)) throw new TypeError('If you want to decorator class, you must pass it a legal class');
      // $FlowFixMe: Terrible union, it's function now
      if (isPropsFunction) props(Class);else {
        // $FlowFixMe: Terrible union, it's array now
        for (var i = 0, len = props.length; i < len; i++) {
          // $FlowFixMe: Terrible union, it's array now
          var fn = props[i];
          if (!isFunction(fn)) throw new TypeError('If you want to decorate an class, you must pass it function or array of function');
          fn(Class);
        }
      }
      return Class;
    }
    if (!self && !isFunction(Class)) throw new TypeError('applyDecorators only accept class as first arguments. If you want to modify instance, you should set options.self true.');
    if (self && isPrimitive(Class)) throw new TypeError("We can't apply docorators on a primitive value, even in self mode");
    if (!isObject(props)) throw new TypeError('applyDecorators only accept object as second arguments');
    var prototype = self ? Class : Class.prototype;
    if (isVoid(prototype)) throw new Error('The class muse have a prototype, please take a check');
    for (var key in props) {
      var value = props[key];
      var decorators = isArray(value) ? value : [value];
      var handler = void 0;
      try {
        handler = compressMultipleDecorators.apply(undefined, _toConsumableArray(decorators));
      } catch (err) {
        throw new Error('The decorators set on props must be Function or Array of Function');
      }
      var descriptor = getOwnPropertyDescriptor$3(prototype, key);
      if (descriptor && !descriptor.configurable) {
        if (!omit) throw new Error(key + ' of ' + prototype + ' is unconfigurable');
        continue;
      }
      defineProperty$6(prototype, key, handler(prototype, key, descriptor));
    }
    return Class;
  }

  var arrayChangeMethod = ['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse'];

  function deepProxy(value, hook, _ref) {
    var _operateProps;

    var diff = _ref.diff,
    operationPrefix = _ref.operationPrefix;

    var mapStore = {};
    var arrayChanging = false;
    var proxyValue = new Proxy(value, {
      get: function get(target, property, receiver) {
        var value = target[property];
        if (isArray(target) && arrayChangeMethod.indexOf(property) > -1) {
          return function () {
            arrayChanging = true;
            bind$1(value, receiver).apply(undefined, arguments);
            arrayChanging = false;
            hook();
          };
        }
        if (mapStore[property] === true) return value;
        if (isObject(value) || isArray(value)) {
          var _proxyValue = mapStore[property] || deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix });
          mapStore[property] = _proxyValue;
          return _proxyValue;
        }
        mapStore[property] = true;
        return value;
      },
      set: function set(target, property, value) {
        var oldVal = target[property];
        var newVal = isObject(value) || isArray(value) ? deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix }) : value;
        target[property] = newVal;
        mapStore[property] = true;
        if (arrayChanging || diff && oldVal === newVal) return true;
        hook();
        return true;
      },
      deleteProperty: function deleteProperty(target, property) {
        delete target[property];
        delete mapStore[property];
        if (arrayChanging) return true;
        hook();
        return true;
      } });

    var operateProps = (_operateProps = {}, _defineProperty(_operateProps, operationPrefix + 'set', [initialize(function (method) {
      return function (property, val) {
        // $FlowFixMe: we have check the computed value
        proxyValue[property] = val;
      };
    }), nonenumerable]), _defineProperty(_operateProps, operationPrefix + 'del', [initialize(function (method) {
      return function (property) {
        // $FlowFixMe: we have check the computed value
        delete proxyValue[property];
      };
    }), nonenumerable]), _operateProps);
    applyDecorators(proxyValue, operateProps, { self: true });
    return proxyValue;
  }

  function deepObserve(value, hook, _ref2) {
    var _this = this,
    _operateProps2;

    var operationPrefix = _ref2.operationPrefix,
    diff = _ref2.diff;

    var mapStore = {};
    var arrayChanging = false;
    function getPropertyDecorators(keys) {
      var oldVal = void 0;
      return keys.reduce(function (props, key) {
        props[key] = [accessor({
          set: function set(value) {
            oldVal = this[key];
            return value;
          } }),
        accessor({
          get: function get(val) {
            if (mapStore[key]) return val;
            if (isObject(val) || isArray(val)) {
              deepObserve(val, hook, { operationPrefix: operationPrefix, diff: diff });
            }
            mapStore[key] = true;
            return val;
          },
          set: function set(val) {
            if (isObject(val) || isArray(val)) deepObserve(val, hook, { operationPrefix: operationPrefix, diff: diff });
            mapStore[key] = true;
            if (!arrayChanging && (!diff || oldVal !== val)) hook();
            return val;
          } },
        { preSet: false })];
        return props;
      }, {});
    }
    var props = getPropertyDecorators(getOwnKeys(value));
    applyDecorators(value, props, { self: true, omit: true });
    if (isArray(value)) {
      var methodProps = arrayChangeMethod.reduce(function (props, key) {
        props[key] = [initialize(function (method) {
          method = isFunction(method) ? method
          // $FlowFixMe: we have check the key
          : Array.prototype[key];
          return function () {
            var originLength = value.length;
            arrayChanging = true;
            bind$1(method, value).apply(undefined, arguments);
            arrayChanging = false;
            if (originLength < value.length) {
              var keys = new Array(value.length - originLength).fill(1).map(function (value, index) {
                return (index + originLength).toString();
              });
              var _props = getPropertyDecorators(keys);
              applyDecorators(value, _props, { self: true, omit: true });
            }
            hook();
          };
        }), nonenumerable];
        return props;
      }, {});
      applyDecorators(value, methodProps, { self: true });
    }
    var operateProps = (_operateProps2 = {}, _defineProperty(_operateProps2, operationPrefix + 'set', [initialize(function (method) {
      return function (property, val) {
        var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        disable = _ref3.disable,
        isNewVal = _ref3.isNewVal;

        isNewVal = isNewVal || getOwnKeys(value).indexOf(property) === -1;
        if (isFunction(method)) {
          bind$1(method, _this)(property, val, { disable: true, isNewVal: isNewVal });
        }
        if (isNewVal) {
          var _props2 = getPropertyDecorators([property]);
          applyDecorators(value, _props2, { self: true, omit: true });
        }
        if (!disable) {
          value[property] = val;
        }
      };
    }), nonenumerable]), _defineProperty(_operateProps2, operationPrefix + 'del', [initialize(function (method) {
      return function (property) {
        if (isFunction(method)) {
          bind$1(method, _this)(property);
        } else {
          delete value[property];
        }
        hook();
      };
    }), nonenumerable]), _operateProps2);
    applyDecorators(value, operateProps, { self: true });
    return value;
  }

  function watch() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var option = isObject(args[args.length - 1]) ? args[args.length - 1] : {};
    // $FlowFixMe: we have check if it's an object
    var deep = option.deep,
    omit = option.omit,
    other = option.other,
    _option$operationPref = option.operationPrefix,
    operationPrefix = _option$operationPref === undefined ? '__' : _option$operationPref,
    _option$diff = option.diff,
    diff = _option$diff === undefined ? true : _option$diff;
    // $FlowFixMe: we have check if it's an object

    var proxy = option.proxy;

    if (typeof Proxy !== 'function') {
      proxy = false;
    }
    if (!args.length) throw new TypeError('You must pass a function or a string to find the hanlder function.');
    if (other !== undefined && isPrimitive(other)) throw new TypeError('If you want us to trigger function on the other instance, you must pass in a legal instance');
    if (!isString(operationPrefix)) throw new TypeError('operationPrefix must be an string');
    return function (obj, prop, descriptor) {
      var fns = args.reduce(function (fns, keyOrFn, index) {
        if (!isString(keyOrFn) && !isFunction(keyOrFn)) {
          if (!index || index !== args.length - 1) throw new TypeError('You can only pass function or string as handler');
          return fns;
        }
        fns.push(isString(keyOrFn) ? function (newVal, oldVal) {
          var target = other || obj;
          // $FlowFixMe: we have ensure it must be a string
          var fn = getDeepProperty$1(target, keyOrFn);
          if (!isFunction(fn)) {
            if (!omit) throw new Error('You pass in a function for us to trigger, please ensure the property to be a function or set omit flag true');
            return;
          }
          return bind$1(fn, this)(newVal, oldVal);
        } : keyOrFn);
        return fns;
      }, []);
      var handler = function handler(newVal, oldVal) {
        var _this2 = this;

        fns.forEach(function (fn) {
          return bind$1(fn, _this2)(newVal, oldVal);
        });
      };
      var inited = false;
      var oldVal = void 0;
      var newVal = void 0;
      var proxyValue = void 0;
      return compressMultipleDecorators(accessor({
        set: function set(value) {
          var _this3 = this;

          oldVal = this[prop];
          proxyValue = undefined;
          var hook = function hook() {
            return bind$1(handler, _this3)(newVal, oldVal);
          };
          return deep && (isObject(value) || isArray(value)) ? proxy ? deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix }) : deepObserve(value, hook, { operationPrefix: operationPrefix, diff: diff }) : value;
        },
        get: function get(value) {
          var _this4 = this;

          if (proxyValue) return proxyValue;
          if (!inited) {
            inited = true;
            var hook = function hook() {
              return bind$1(handler, _this4)(newVal, oldVal);
            };
            if (deep && (isObject(value) || isArray(value))) {
              if (proxy) {
                proxyValue = deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix });
                oldVal = proxyValue;
                newVal = proxyValue;
                return proxyValue;
              }
              deepObserve(value, hook, { operationPrefix: operationPrefix, diff: diff });
            }
            oldVal = value;
            newVal = value;
          }
          return value;
        } },
      { preSet: true }), accessor({
        set: function set(value) {
          newVal = value;
          if (!diff || oldVal !== value) bind$1(handler, this)(newVal, oldVal);
          oldVal = value;
          return value;
        } },
      { preSet: false }))(obj, prop, descriptor);
    };
  }

  function runnable(key) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    other = _ref.other,
    backup = _ref.backup;

    if (!isFunction(key) && !isString(key)) throw new TypeError('@runnable only accept Function or String');
    return function (obj, prop, descriptor) {
      var _ref2 = descriptor || {},
      _value = _ref2.value,
      configurable = _ref2.configurable;

      if (!isFunction(_value)) throw new TypeError('@runnable can only be used on method, but not ' + _value + ' on property "' + prop + '".');
      var canIRun = isFunction(key) ? key : function () {
        var keys = key.split('.');
        var originTarget = isPrimitive(other) ? this : other;
        return getDeepProperty$1(originTarget, keys);
      };
      backup = isFunction(backup) ? backup : function () {};
      return {
        value: function value() {
          if (bind$1(canIRun, this).apply(undefined, arguments) === true) {
            return bind$1(_value, this).apply(undefined, arguments);
          } else {
            // $FlowFixMe: I have reassign it when it's not a function
            return bind$1(backup, this).apply(undefined, arguments);
          }
        },

        // function should not be enmuerable
        enumerable: false,
        configurable: configurable,
        // as we have delay this function
        // it's not a good idea to change it
        writable: false };

    };
  }

  function nonconfigurable(obj, prop, descriptor) {
    if (descriptor === undefined) {
      return {
        value: undefined,
        enumerable: true,
        configurable: true,
        writable: true };

    }
    descriptor.configurable = true;
    return descriptor;
  }

  function string() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var defaultValue = isString(args[0]) ? args.shift() : '';
    args.unshift(function (value) {
      return isString(value) ? value : defaultValue;
    });
    return initialize.apply(undefined, args);
  }

  function boolean() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var defaultValue = isBoolean(args[0]) ? args.shift() : false;
    args.unshift(function (value) {
      return isBoolean(value) ? value : defaultValue;
    });
    return initialize.apply(undefined, args);
  }

  function string$1() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var defaultValue = isString(args[0]) ? args.shift() : '';
    args.unshift(function (value) {
      return isString(value) ? value : defaultValue;
    });
    return accessor({ set: args, get: args });
  }

  function boolean$1() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var defaultValue = isBoolean(args[0]) ? args.shift() : false;
    args.unshift(function (value) {
      return isBoolean(value) ? value : defaultValue;
    });
    return accessor({ set: args, get: args });
  }

  function number$1() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var defaultValue = isNumber(args[0]) ? args.shift() : 0;
    args.unshift(function (value) {
      return isNumber(value) ? value : defaultValue;
    });
    return accessor({ set: args, get: args });
  }

  var before$1 = classify(before, {
    requirement: function requirement(obj, prop, desc) {
      // $FlowFixMe: it's data descriptor now
      return isDataDescriptor(desc) && isFunction(desc.value);
    },

    customArgs: true });


  var after$1 = classify(after, {
    requirement: function requirement(obj, prop, desc) {
      // $FlowFixMe: it's data descriptor now
      return isDataDescriptor(desc) && isFunction(desc.value);
    },

    customArgs: true });


  var runnable$1 = classify(runnable, {
    requirement: function requirement(obj, prop, desc) {
      // $FlowFixMe: it's data descriptor now
      return isDataDescriptor(desc) && isFunction(desc.value);
    },

    customArgs: true });


  var waituntil$1 = classify(waituntil, {
    requirement: function requirement(obj, prop, desc) {
      // $FlowFixMe: it's data descriptor now
      return isDataDescriptor(desc) && isFunction(desc.value);
    },

    customArgs: true });


  var $JSON$1 = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
  var stringify = function stringify(it) {// eslint-disable-line no-unused-vars
    return $JSON$1.stringify.apply($JSON$1, arguments);
  };

  var stringify$1 = createCommonjsModule(function (module) {
    module.exports = { "default": stringify, __esModule: true };
  });

  unwrapExports(stringify$1);

  var get = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf$1);



    var _getOwnPropertyDescriptor2 = _interopRequireDefault(getOwnPropertyDescriptor$1);

    function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

    exports.default = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

      if (desc === undefined) {
        var parent = (0, _getPrototypeOf2.default)(object);

        if (parent === null) {
          return undefined;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
    };
  });

  var _get = unwrapExports(get);

  var VENDOR_PREFIXES = ['', 'o', 'ms', 'moz', 'webkit', 'webkitCurrent'];

  var SYNONYMS = [['', ''], // empty
  ['exit', 'cancel'], // firefox & old webkits expect cancelFullScreen instead of exitFullscreen
  ['screen', 'Screen']];

  var DESKTOP_FULLSCREEN_STYLE = {
    position: 'fixed',
    zIndex: '2147483647',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    width: '100%',
    height: '100%' };


  var FULLSCREEN_CHANGE = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];

  var FULLSCREEN_ERROR = ['fullscreenerror', 'webkitfullscreenerror', 'mozfullscreenerror', 'MSFullscreenError'];

  var supportDocument = typeof document !== 'undefined';

  function setStyle$1(el, key, val) {
    if (isObject(key)) {
      for (var k in key) {
        setStyle$1(el, k, key[k]);
      }
    } else {
      // $FlowFixMe: we found it
      el.style[key] = val;
    }
  }

  function native(target, name) {
    var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (isObject(name)) {
      option = name;
    }
    if (isString(target)) {
      name = target;
    }
    var _option = option,
    _option$keyOnly = _option.keyOnly,
    keyOnly = _option$keyOnly === undefined ? false : _option$keyOnly;
    /* istanbul ignore if */

    if (!supportDocument) {
      return keyOnly ? '' : undefined;
    }
    if (!isElement(target)) {
      target = document;
    }
    if (!isString(name)) throw new Error('You must pass in a string as name, but not ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)) + '.');
    for (var i = 0; i < SYNONYMS.length; i++) {
      name = name.replace(SYNONYMS[i][0], SYNONYMS[i][1]);
      for (var j = 0; j < VENDOR_PREFIXES.length; j++) {
        var prefixed = j === 0 ? name : VENDOR_PREFIXES[j] + name.charAt(0).toUpperCase() + name.substr(1);
        // $FlowFixMe: we support document computed property here
        if (target[prefixed] !== undefined) return keyOnly ? prefixed : target[prefixed];
      }
    }
    return keyOnly ? '' : undefined;
  }

  function dispatchEvent(element, name) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$bubbles = _ref.bubbles,
    bubbles = _ref$bubbles === undefined ? true : _ref$bubbles,
    _ref$cancelable = _ref.cancelable,
    cancelable = _ref$cancelable === undefined ? true : _ref$cancelable;

    var event = void 0;
    /* istanbul ignore else  */
    if (isFunction(Event)) {
      event = new Event(name, {
        bubbles: bubbles,
        cancelable: cancelable });

    } else if (supportDocument && document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent(name, true, true);
    } else if (supportDocument && document.createEventObject) {
      // $FlowFixMe: IE < 9
      event = document.createEventObject();
      event.eventType = name;
      event.eventName = name;
    }
    /* istanbul ignore next  */
    if (!isObject(event) && !isEvent(event)) throw new Error("We can't create an object on this browser, please report to author");
    /* istanbul ignore else  */
    if (element.dispatchEvent) {
      element.dispatchEvent(event);
      // $FlowFixMe: IE < 9
    } else if (element.fireEvent) {
      // $FlowFixMe: IE < 9
      element.fireEvent('on' + event.eventType, event); // can trigger only real event (e.g. 'click')
      // $FlowFixMe: support computed key
    } else if (element[name]) {
      // $FlowFixMe: support computed key
      element[name]();
      // $FlowFixMe: support computed key
    } else if (element['on' + name]) {
      // $FlowFixMe: support computed key
      element['on' + name]();
    }
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }
  var fullscreenEnabled = native('fullscreenEnabled');
  var useStyleFirst = false;

  var ESFullScreen = (_dec = autobindClass(), _dec2 = alias('requestFullscreen'), _dec3 = alias('exitFullscreen'), _dec4 = alias('addEventListener'), _dec5 = alias('removeEventListener'), _dec(_class = (_class2 = function () {
    function ESFullScreen() {
      _classCallCheck(this, ESFullScreen);

      this._fullscreenElement = null;
      this.isNativelySupport = defined(native('fullscreenElement')) && (!defined(fullscreenEnabled) || fullscreenEnabled === true);
      this._openKey = supportDocument ? native(document.body || document.documentElement, 'requestFullscreen', { keyOnly: true }) : '';
      this._exitKey = native('exitFullscreen', { keyOnly: true });
      this._useStyleFirst = false;
      this.hasUsedStyle = false;
    }

    _createClass(ESFullScreen, [{
      key: 'open',
      value: function open(element) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$force = _ref.force,
        force = _ref$force === undefined ? false : _ref$force;
        var originElement = this.fullscreenElement;
        if (originElement && originElement !== element) {
          if (!force) {
            dispatchEvent(document, 'fullscreenerror');
            return false;
          }
          this.exit();
        }

        if (!this.useStyleFirst) {
          if (this.isNativelySupport) {
            // $FlowFixMe: support computed key on HTMLElment here
            isFunction(element[this._openKey]) && element[this._openKey]();
            return true;
          }

          // add wekitEnterFullscreen support as required in https://github.com/toxic-johann/es-fullscreen/issues/4
          /* istanbul ignore if  */
          if (element instanceof HTMLVideoElement && element.webkitSupportsFullscreen &&
          // $FlowFixMe: support webkitEnterFullscreen on some werid safari
          isFunction(element.webkitEnterFullscreen)) {
            element.webkitEnterFullscreen();
            this._fullscreenElement = element;
            return true;
          }
        }

        this._savedStyles = _Object$keys(DESKTOP_FULLSCREEN_STYLE).reduce(function (styles, key) {
          // $FlowFixMe: support string here
          styles[key] = element.style[key];
          return styles;
        }, {});
        setStyle$1(element, DESKTOP_FULLSCREEN_STYLE);

        /* istanbul ignore else  */
        if (document.body) {
          this._bodyOverflow = document.body.style.overflow;
          document.body.style.overflow = 'hidden';
        }
        /* istanbul ignore else  */
        if (document.documentElement) {
          this._htmlOverflow = document.documentElement.style.overflow;
          document.documentElement.style.overflow = 'hidden';
        }
        this._fullscreenElement = element;
        this.hasUsedStyle = true;
        dispatchEvent(element, 'fullscreenchange');
        return true;
      } },
    {
      key: 'exit',
      value: function exit() {
        if (!this.isFullscreen) return false;
        if (this.isNativelySupport && !this.useStyleFirst && !this.hasUsedStyle) {
          // $FlowFixMe: support document computed key here
          document[this._exitKey]();
          return true;
        }
        // $FlowFixMe: element is an Elment here
        var element = this._fullscreenElement;
        setStyle$1(element, this._savedStyles);
        /* istanbul ignore else  */
        if (document.body) document.body.style.overflow = this._bodyOverflow;
        /* istanbul ignore else  */
        if (document.documentElement) document.documentElement.style.overflow = this._htmlOverflow;

        this._fullscreenElement = null;
        this._savedStyles = {};
        dispatchEvent(element, 'fullscreenchange');
        return true;
      } },
    {
      key: 'on',
      value: function on(name, fn) {
        var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

        this._handleEvent(element, 'addEventListener', name, fn);
      } },
    {
      key: 'off',
      value: function off(name, fn) {
        var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

        this._handleEvent(element, 'removeEventListener', name, fn);
      } },
    {
      key: '_handleEvent',
      value: function _handleEvent(element, behavior, name, fn) {
        var names = name === 'fullscreenchange' ? FULLSCREEN_CHANGE : name === 'fullscreenerror' ? FULLSCREEN_ERROR : [name];
        names.forEach(function (name) {
          // $FlowFixMe: support computed attribute here
          element[behavior](name, fn);
        });
      } },
    {
      key: 'useStyleFirst',
      get: function get() {
        return useStyleFirst;
      },
      set: function set(value) {
        value = !!value;
        if (value === useStyleFirst) return value;
        useStyleFirst = value;
        dispatchEvent(document, 'esfullscreenmethodchange');
        return value;
      } },
    {
      key: 'fullscreenElement',
      get: function get() {
        var element = ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'].reduce(function (element, key) {
          // $FlowFixMe: support computed element on document
          return element || document[key];
        }, null);
        return element || this._fullscreenElement;
      } },
    {
      key: 'isFullscreen',
      get: function get() {
        return isElement(this.fullscreenElement);
      } }]);


    return ESFullScreen;
  }(), _applyDecoratedDescriptor(_class2.prototype, 'open', [_dec2], _Object$getOwnPropertyDescriptor(_class2.prototype, 'open'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'exit', [_dec3], _Object$getOwnPropertyDescriptor(_class2.prototype, 'exit'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'on', [_dec4], _Object$getOwnPropertyDescriptor(_class2.prototype, 'on'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'off', [_dec5], _Object$getOwnPropertyDescriptor(_class2.prototype, 'off'), _class2.prototype), _class2)) || _class);

  var index = new ESFullScreen();

  var dP$3 = _objectDp.f;









  var fastKey = _meta.fastKey;

  var SIZE = _descriptors ? '_s' : 'size';

  var getEntry = function getEntry(that, key) {
    // fast case
    var index = fastKey(key);
    var entry;
    if (index !== 'F') return that._i[index];
    // frozen object case
    for (entry = that._f; entry; entry = entry.n) {
      if (entry.k == key) return entry;
    }
  };

  var _collectionStrong = {
    getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        _anInstance(that, C, NAME, '_i');
        that._t = NAME; // collection type
        that._i = _objectCreate(null); // index
        that._f = undefined; // first entry
        that._l = undefined; // last entry
        that[SIZE] = 0; // size
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
      });
      _redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
            entry.r = true;
            if (entry.p) entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that._f = that._l = undefined;
          that[SIZE] = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function _delete(key) {
          var that = _validateCollection(this, NAME);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.n;
            var prev = entry.p;
            delete that._i[entry.i];
            entry.r = true;
            if (prev) prev.n = next;
            if (next) next.p = prev;
            if (that._f == entry) that._f = next;
            if (that._l == entry) that._l = prev;
            that[SIZE]--;
          }return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /* , that = undefined */) {
          _validateCollection(this, NAME);
          var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;
          while (entry = entry ? entry.n : this._f) {
            f(entry.v, entry.k, this);
            // revert to the last existing entry
            while (entry && entry.r) {entry = entry.p;}
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(_validateCollection(this, NAME), key);
        } });

      if (_descriptors) dP$3(C.prototype, 'size', {
        get: function get() {
          return _validateCollection(this, NAME)[SIZE];
        } });

      return C;
    },
    def: function def(that, key, value) {
      var entry = getEntry(that, key);
      var prev, index;
      // change existing entry
      if (entry) {
        entry.v = value;
        // create new entry
      } else {
        that._l = entry = {
          i: index = fastKey(key, true), // <- index
          k: key, // <- key
          v: value, // <- value
          p: prev = that._l, // <- previous entry
          n: undefined, // <- next entry
          r: false // <- removed
        };
        if (!that._f) that._f = entry;
        if (prev) prev.n = entry;
        that[SIZE]++;
        // add to index
        if (index !== 'F') that._i[index] = entry;
      }return that;
    },
    getEntry: getEntry,
    setStrong: function setStrong(C, NAME, IS_MAP) {
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      _iterDefine(C, NAME, function (iterated, kind) {
        this._t = _validateCollection(iterated, NAME); // target
        this._k = kind; // kind
        this._l = undefined; // previous
      }, function () {
        var that = this;
        var kind = that._k;
        var entry = that._l;
        // revert to the last existing entry
        while (entry && entry.r) {entry = entry.p;}
        // get next entry
        if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
          // or finish the iteration
          that._t = undefined;
          return _iterStep(1);
        }
        // return step by kind
        if (kind == 'keys') return _iterStep(0, entry.k);
        if (kind == 'values') return _iterStep(0, entry.v);
        return _iterStep(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // add [@@species], 23.1.2.2, 23.2.2.2
      _setSpecies(NAME);
    } };


  var MAP = 'Map';

  // 23.1 Map Objects
  var es6_map = _collection(MAP, function (get) {
    return function Map() {return get(this, arguments.length > 0 ? arguments[0] : undefined);};
  }, {
    // 23.1.3.6 Map.prototype.get(key)
    get: function get(key) {
      var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function set(key, value) {
      return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
    } },
  _collectionStrong, true);

  var _arrayFromIterable = function _arrayFromIterable(iter, ITERATOR) {
    var result = [];
    _forOf(iter, false, result.push, result, ITERATOR);
    return result;
  };

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON


  var _collectionToJson = function _collectionToJson(NAME) {
    return function toJSON() {
      if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
      return _arrayFromIterable(this);
    };
  };

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON


  _export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

  // https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
  _setCollectionOf('Map');

  // https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
  _setCollectionFrom('Map');

  var map = _core.Map;

  var map$1 = createCommonjsModule(function (module) {
    module.exports = { "default": map, __esModule: true };
  });

  var _Map = unwrapExports(map$1);

  var isEnum$1 = _objectPie.f;
  var _objectToArray = function _objectToArray(isEntries) {
    return function (it) {
      var O = _toIobject(it);
      var keys = _objectKeys(O);
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;
      while (length > i) {if (isEnum$1.call(O, key = keys[i++])) {
          result.push(isEntries ? [key, O[key]] : O[key]);
        }}return result;
    };
  };

  // https://github.com/tc39/proposal-object-values-entries

  var $entries = _objectToArray(true);

  _export(_export.S, 'Object', {
    entries: function entries(it) {
      return $entries(it);
    } });


  var entries = _core.Object.entries;

  var entries$1 = createCommonjsModule(function (module) {
    module.exports = { "default": entries, __esModule: true };
  });

  var _Object$entries = unwrapExports(entries$1);

  var _global$1 = createCommonjsModule(function (module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ?
    window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _core$1 = createCommonjsModule(function (module) {
    var core = module.exports = { version: '2.5.3' };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1$1 = _core$1.version;

  var _isObject$1 = function _isObject$1(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject$1 = function _anObject$1(it) {
    if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails$1 = function _fails$1(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors$1 = !_fails$1(function () {
    return Object.defineProperty({}, 'a', { get: function get() {return 7;} }).a != 7;
  });

  var document$3 = _global$1.document;
  // typeof document.createElement is 'object' in old IE
  var is$1 = _isObject$1(document$3) && _isObject$1(document$3.createElement);
  var _domCreate$1 = function _domCreate$1(it) {
    return is$1 ? document$3.createElement(it) : {};
  };

  var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
    return Object.defineProperty(_domCreate$1('div'), 'a', { get: function get() {return 7;} }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive$1 = function _toPrimitive$1(it, S) {
    if (!_isObject$1(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP$4 = Object.defineProperty;

  var f$8 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject$1(O);
    P = _toPrimitive$1(P, true);
    _anObject$1(Attributes);
    if (_ie8DomDefine$1) try {
      return dP$4(O, P, Attributes);
    } catch (e) {/* empty */}
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp$1 = {
    f: f$8 };


  var _propertyDesc$1 = function _propertyDesc$1(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value };

  };

  var _hide$1 = _descriptors$1 ? function (object, key, value) {
    return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty$1 = {}.hasOwnProperty;
  var _has$1 = function _has$1(it, key) {
    return hasOwnProperty$1.call(it, key);
  };

  var id$2 = 0;
  var px$1 = Math.random();
  var _uid$1 = function _uid$1(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$2 + px$1).toString(36));
  };

  var _redefine$1 = createCommonjsModule(function (module) {
    var SRC = _uid$1('src');
    var TO_STRING = 'toString';
    var $toString = Function[TO_STRING];
    var TPL = ('' + $toString).split(TO_STRING);

    _core$1.inspectSource = function (it) {
      return $toString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) _has$1(val, 'name') || _hide$1(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) _has$1(val, SRC) || _hide$1(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
      if (O === _global$1) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        _hide$1(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        _hide$1(O, key, val);
      }
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || $toString.call(this);
    });
  });

  var _aFunction$1 = function _aFunction$1(it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

  var _ctx$1 = function _ctx$1(fn, that, length) {
    _aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:return function (a) {
          return fn.call(that, a);
        };
      case 2:return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:return function (a, b, c) {
          return fn.call(that, a, b, c);
        };}

    return function () /* ...args */{
      return fn.apply(that, arguments);
    };
  };

  var PROTOTYPE$3 = 'prototype';

  var $export$1 = function $export$1(type, name, source) {
    var IS_FORCED = type & $export$1.F;
    var IS_GLOBAL = type & $export$1.G;
    var IS_STATIC = type & $export$1.S;
    var IS_PROTO = type & $export$1.P;
    var IS_BIND = type & $export$1.B;
    var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] || (_global$1[name] = {}) : (_global$1[name] || {})[PROTOTYPE$3];
    var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
    var expProto = exports[PROTOTYPE$3] || (exports[PROTOTYPE$3] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp = IS_BIND && own ? _ctx$1(out, _global$1) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
      // extend global
      if (target) _redefine$1(target, key, out, type & $export$1.U);
      // export
      if (exports[key] != out) _hide$1(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  _global$1.core = _core$1;
  // type bitmap
  $export$1.F = 1; // forced
  $export$1.G = 2; // global
  $export$1.S = 4; // static
  $export$1.P = 8; // proto
  $export$1.B = 16; // bind
  $export$1.W = 32; // wrap
  $export$1.U = 64; // safe
  $export$1.R = 128; // real proto method for `library`
  var _export$1 = $export$1;

  // https://github.com/tc39/proposal-global


  _export$1(_export$1.G, { global: _global$1 });

  var global$1 = _core$1.global;

  var tempCurrentTime = 0;

  var NativeVideoKernel = function (_CustEvent) {
    _inherits(NativeVideoKernel, _CustEvent);

    _createClass(NativeVideoKernel, null, [{
      key: 'isSupport',

      /* istanbul ignore next  */
      value: function isSupport() {
        return true;
      } }]);


    function NativeVideoKernel(videoElement, config, customConfig) {
      _classCallCheck(this, NativeVideoKernel);

      var _this = _possibleConstructorReturn(this, (NativeVideoKernel.__proto__ || _Object$getPrototypeOf(NativeVideoKernel)).call(this));

      if (!isElement(videoElement)) throw new Error('You must pass in an legal video element but not ' + (typeof videoElement === 'undefined' ? 'undefined' : _typeof(videoElement)));
      _this.video = videoElement;
      _this.config = config;
      _this.customConfig = customConfig;
      return _this;
    }

    _createClass(NativeVideoKernel, [{
      key: 'load',
      value: function load(src) {
        this.video.setAttribute('src', src);
        this.video.src = src;
      } },
    {
      key: 'startLoad',
      value: function startLoad(src) {
        /* istanbul ignore next */
        var currentTime = this.video.currentTime || tempCurrentTime;
        this.load(src);
        this.seek(currentTime);
      }

      // https://developer.mozilla.org/de/docs/Web/HTML/Using_HTML5_audio_and_video#Stopping_the_download_of_media
    },
    {
      key: 'stopLoad',
      value: function stopLoad() {
        tempCurrentTime = this.video.currentTime;
        this.video.src = '';
        this.video.removeAttribute('src');
      } },
    {
      key: 'destroy',
      value: function destroy() {
        /* istanbul ignore next  */
        if (isElement(this.video)) this.stopLoad();
      } },
    {
      key: 'play',
      value: function play() {
        return this.video.play();
      } },
    {
      key: 'pause',
      value: function pause() {
        return this.video.pause();
      } },
    {
      key: 'refresh',
      value: function refresh() {
        this.video.src = this.config.src;
      } },
    {
      key: 'attachMedia',
      value: function attachMedia() {} },
    {
      key: 'seek',
      value: function seek(seconds) {
        this.video.currentTime = seconds;
      } }]);


    return NativeVideoKernel;
  }(CustEvent);

  var LOG_TAG = 'chimee';
  var boxSuffixMap = {
    flv: '.flv',
    hls: '.m3u8',
    native: '.mp4' };


  // return the config box
  // or choose the right one according to the src
  function getLegalBox(_ref) {
    var src = _ref.src,
    box = _ref.box;

    if (isString(box) && box) return box;
    src = src.toLowerCase();
    for (var key in boxSuffixMap) {
      var suffix = boxSuffixMap[key];
      if (src.indexOf(suffix) > -1) return key;
    }
    return 'native';
  }

  var ChimeeKernel = function () {
    /**
                                  * kernelWrapper
                                  * @param {any} wrap videoElement
                                  * @param {any} option
                                  * @class kernel
                                  */
    function ChimeeKernel(videoElement, config) {
      _classCallCheck(this, ChimeeKernel);

      if (!isElement(videoElement)) throw new Error('You must pass in an video element to the chimee-kernel');
      this.config = config;
      this.videoElement = videoElement;
      this.initVideoKernel();
    }

    _createClass(ChimeeKernel, [{
      key: 'destroy',
      value: function destroy() {
        this.videoKernel.destroy();
      } },
    {
      key: 'initVideoKernel',
      value: function initVideoKernel() {
        var config = this.config;
        var box = getLegalBox(config);
        this.box = box;
        var VideoKernel = this.chooseVideoKernel(this.box, config.preset);

        if (!isFunction(VideoKernel)) throw new Error('We can\'t find video kernel for ' + box + '. Please check your config and make sure it\'s installed or provided');

        var customConfig = config.presetConfig[this.box];

        // TODO: nowaday, kernels all get config from one config
        // it's not a good way, because custom config may override kernel config
        // so we may remove this code when we check all the chimee-kernel-* setting
        if (customConfig) deepAssign(config, customConfig);

        this.videoKernel = new VideoKernel(this.videoElement, config, customConfig);
      }

      // choose the right video kernel according to the box setting
    },
    {
      key: 'chooseVideoKernel',
      value: function chooseVideoKernel(box, preset) {
        switch (box) {
          case 'native':
            // $FlowFixMe: it's the same as videoKernel
            return NativeVideoKernel;
          case 'mp4':
            return this.getMp4Kernel(preset.mp4);
          case 'flv':
          case 'hls':
            return preset[box];
          default:
            throw new Error('We currently do not support box ' + box + ', please contact us through https://github.com/Chimeejs/chimee/issues.');}

      }

      // fetch the legal mp4 kernel
      // if it's not exist or not support
      // we will fall back to the native video kernel
    },
    {
      key: 'getMp4Kernel',
      value: function getMp4Kernel(Mp4Kernel) {
        var hasLegalMp4Kernel = Mp4Kernel && isFunction(Mp4Kernel.isSupport);
        // $FlowFixMe: we have make sure it's an kernel now
        var supportMp4Kernel = hasLegalMp4Kernel && Mp4Kernel.isSupport();
        // $FlowFixMe: we have make sure it's an kernel now
        if (supportMp4Kernel) return Mp4Kernel;
        if (hasLegalMp4Kernel) Log.warn(LOG_TAG, 'mp4 decode is not support in this browser, we will switch to the native video kernel');
        this.box = 'native';
        // $FlowFixMe: it's the same as videoKernel
        return NativeVideoKernel;
      } },
    {
      key: 'attachMedia',
      value: function attachMedia() {
        this.videoKernel.attachMedia();
      } },
    {
      key: 'load',
      value: function load() {
        var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.src;

        this.config.src = src;
        this.videoKernel.load(src);
      } },
    {
      key: 'startLoad',
      value: function startLoad() {
        /* istanbul ignore if */
        if (!isFunction(this.videoKernel.startLoad)) throw new Error('This video kernel do not support startLoad, please contact us on https://github.com/Chimeejs/chimee/issues');
        this.videoKernel.startLoad(this.config.src);
      } },
    {
      key: 'stopLoad',
      value: function stopLoad() {
        /* istanbul ignore else */
        if (isFunction(this.videoKernel.stopLoad)) this.videoKernel.stopLoad();
      } },
    {
      key: 'play',
      value: function play() {
        this.videoKernel.play();
      } },
    {
      key: 'pause',
      value: function pause() {
        this.videoKernel.pause();
      } },
    {
      key: 'seek',
      value: function seek(seconds) {
        if (!isNumber(seconds)) {
          Log.error(LOG_TAG, 'When you try to seek, you must offer us a number, but not ' + (typeof seconds === 'undefined' ? 'undefined' : _typeof(seconds)));
          return;
        }
        this.videoKernel.seek(seconds);
      } },
    {
      key: 'refresh',
      value: function refresh() {
        this.videoKernel.refresh();
      } },
    {
      key: 'on',
      value: function on(key, fn) {
        this.videoKernel.on(key, fn);
      } },
    {
      key: 'off',
      value: function off(key, fn) {
        this.videoKernel.off(key, fn);
      } },
    {
      key: 'currentTime',
      get: function get$$1() {
        return this.videoElement.currentTime || 0;
      } }]);


    return ChimeeKernel;
  }();

  var videoEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'encrypted', 'ended', 'error', 'interruptbegin', 'interruptend', 'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
  var videoReadOnlyProperties = ['buffered', 'currentSrc', 'duration', 'error', 'ended', 'networkState', 'paused', 'readyState', 'seekable', 'sinkId', 'controlsList', 'tabIndex', 'dataset', 'offsetHeight', 'offsetLeft', 'offsetParent', 'offsetTop', 'offsetWidth'];
  var domEvents = ['beforeinput', 'blur', 'click', 'compositionend', 'compositionstart', 'compositionupdate', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll', 'select', 'wheel', 'mousewheel', 'contextmenu', 'touchstart', 'touchmove', 'touchend', 'fullscreen'];
  var esFullscreenEvents = ['fullscreenchange'];
  var passiveEvents = ['wheel', 'mousewheel', 'touchstart', 'touchmove'];
  var selfProcessorEvents = ['silentLoad', 'fullscreen'];
  var mustListenVideoDomEvents = ['mouseenter', 'mouseleave'];
  var kernelMethods = ['play', 'pause', 'seek', 'startLoad', 'stopLoad'];
  var dispatcherMethods = ['load'];
  var kernelEvents = ['mediaInfo', 'heartbeat', 'error'];
  var domMethods = ['focus', 'fullscreen', 'requestFullscreen', 'exitFullscreen'];
  var videoMethods = ['canPlayType', 'captureStream', 'setSinkId'];

  /**
                                                                     * checker for on, off, once function
                                                                     * @param {string} key
                                                                     * @param {Function} fn
                                                                     */
  function eventBinderCheck(key, fn) {
    if (!isString(key)) throw new TypeError('key parameter must be String');
    if (!isFunction(fn)) throw new TypeError('fn parameter must be Function');
  }
  /**
     * checker for attr or css function
     */
  function attrAndStyleCheck() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length > 2) {
      return ['set'].concat(args);
    }
    if (args.length === 2) {
      if (['video', 'container', 'wrapper', 'videoElement'].indexOf(args[0]) > -1) {
        return ['get'].concat(args);
      }
      return ['set', 'container'].concat(args);
    }
    return ['get', 'container'].concat(args);
  }

  var _dec$1, _dec2$1, _class$1, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;

    _Object$defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 });

  }

  function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function stringOrVoid(value) {
    return isString(value) ? value : undefined;
  }

  function accessorVideoProperty(property) {
    return accessor({
      get: function get$$1(value) {
        return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement[property] : value;
      },
      set: function set(value) {
        if (!this.dispatcher.videoConfigReady) return value;
        this.dom.videoElement[property] = value;
        return value;
      } });

  }

  function accessorVideoAttribute(attribute) {
    var _ref = isObject(attribute) ? attribute : {
      set: attribute,
      get: attribute,
      isBoolean: false },

    _set = _ref.set,
    _get$$1 = _ref.get,
    isBoolean$$1 = _ref.isBoolean;

    return accessor({
      get: function get$$1(value) {
        return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement[_get$$1] : value;
      },
      set: function set(value) {
        if (!this.dispatcher.videoConfigReady) return value;
        var val = isBoolean$$1 ? value ? '' : undefined
        /* istanbul ignore next */ :
        value === null ? undefined : value;
        this.dom.setAttr('video', _set, val);
        return value;
      } },
    {
      preSet: false });

  }

  function accessorCustomAttribute(attribute, isBoolean$$1) {
    return accessor({
      get: function get$$1(value) {
        var attrValue = this.dom.getAttr('video', attribute);
        return this.dispatcher.videoConfigReady && this.inited ? isBoolean$$1 ? !!attrValue : attrValue : value;
      },
      set: function set(value) {
        if (!this.dispatcher.videoConfigReady) return value;
        var val = isBoolean$$1 ? value || undefined : value === null ? undefined : value;
        this.dom.setAttr('video', attribute, val);
        return value;
      } });

  }

  function accessorWidthAndHeight(property) {
    return accessor({
      get: function get$$1(value) {
        if (!this.dispatcher.videoConfigReady || !this.inited) return value;
        var attr = this.dom.getAttr('video', property);
        var prop = this.dom.videoElement[property];
        if (isNumeric(attr) && isNumber(prop)) return prop;
        return attr || undefined;
      },
      set: function set(value) {
        if (!this.dispatcher.videoConfigReady) return value;
        var val = void 0;
        if (value === undefined || isNumber(value)) {
          val = value;
        } else if (isString(value) && !_Number$isNaN(parseFloat(value))) {
          val = value;
        }
        this.dom.setAttr('video', property, val);
        return val;
      } });

  }

  var accessorMap = {
    src: [string$1(), accessor({
      set: function set(val) {
        // must check val !== this.src here
        // as we will set config.src in the video
        // the may cause dead lock
        if (this.dispatcher.readySync && this.autoload && val !== this.src) this.needToLoadSrc = true;
        return val;
      } }),
    accessor({
      set: function set(val) {
        if (this.needToLoadSrc) {
          // unlock it at first, to avoid deadlock
          this.needToLoadSrc = false;
          this.dispatcher.binder.emit({
            name: 'load',
            target: 'plugin',
            id: 'dispatcher' },
          val);
        }
        return val;
      } },
    { preSet: false })],
    autoload: boolean$1(),
    autoplay: [boolean$1(), accessorVideoProperty('autoplay')],
    controls: [boolean$1(), accessorVideoProperty('controls')],
    width: [accessorWidthAndHeight('width')],
    height: [accessorWidthAndHeight('height')],
    crossOrigin: [accessor({ set: stringOrVoid }), accessorVideoAttribute({ set: 'crossorigin', get: 'crossOrigin' })],
    loop: [boolean$1(), accessorVideoProperty('loop')],
    defaultMuted: [boolean$1(), accessorVideoAttribute({ get: 'defaultMuted', set: 'muted', isBoolean: true })],
    muted: [boolean$1(), accessorVideoProperty('muted')],
    preload: [accessor({
      set: function set(value) {
        var options = ['none', 'auto', 'metadata', ''];
        return options.indexOf(value) > -1 ? value : 'none';
      } },
    {
      preSet: true }),
    accessorVideoAttribute('preload')],
    poster: [
    // 因为如果在 video 上随便加一个字符串，他会将其拼接到地址上，所以这里要避免
    // 单元测试无法检测
    string$1(), accessor({
      get: function get$$1(value) {
        return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement.poster : value;
      },
      set: function set(value) {
        if (!this.dispatcher.videoConfigReady) return value;
        if (value.length) this.dom.setAttr('video', 'poster', value);
        return value;
      } })],

    playsInline: [accessor({
      get: function get$$1(value) {
        var playsInline = this.dom.videoElement.playsInline;
        return this.dispatcher.videoConfigReady && this.inited ? playsInline === undefined ? value : playsInline : value;
      },
      set: function set(value) {
        if (!this.dispatcher.videoConfigReady) return value;
        this.dom.videoElement.playsInline = value;
        var val = value ? '' : undefined;
        this.dom.setAttr('video', 'playsinline', val);
        this.dom.setAttr('video', 'webkit-playsinline', val);
        this.dom.setAttr('video', 'x5-playsinline', val);
        return value;
      } }),
    boolean$1()],
    x5VideoPlayerFullscreen: [accessor({
      set: function set(value) {
        return !!value;
      },
      get: function get$$1(value) {
        return !!value;
      } }),
    accessorCustomAttribute('x5-video-player-fullscreen', true)],
    x5VideoOrientation: [accessor({ set: stringOrVoid }), accessorCustomAttribute('x5-video-orientation')],
    x5VideoPlayerType: [accessor({
      set: function set(value) {
        if (!this.dispatcher.videoConfigReady) return value;
        var val = value === 'h5' ? 'h5' : undefined;
        this.dom.setAttr('video', 'x5-video-player-type', val);
        return value;
      },
      get: function get$$1(value) {
        return this.dispatcher.videoConfigReady && value || (this.dom.getAttr('video', 'x5-video-player-type') ? 'h5' : undefined);
      } })],

    xWebkitAirplay: [accessor({
      set: function set(value) {
        return !!value;
      },
      get: function get$$1(value) {
        return !!value;
      } }),
    accessorCustomAttribute('x-webkit-airplay', true)],
    playbackRate: [number$1(1), accessorVideoProperty('playbackRate')],
    defaultPlaybackRate: [accessorVideoProperty('defaultPlaybackRate'), number$1(1)],
    disableRemotePlayback: [boolean$1(), accessorVideoProperty('disableRemotePlayback')],
    volume: [number$1(1), accessorVideoProperty('volume')] };


  var VideoConfig = (_dec$1 = boolean(), _dec2$1 = string(function (str) {
    return str.toLocaleLowerCase();
  }), _class$1 = function () {

    // 转为供 kernel 使用的内部参数
    function VideoConfig(dispatcher, config) {
      _classCallCheck(this, VideoConfig);

      _initDefineProp(this, 'needToLoadSrc', _descriptor, this);

      _initDefineProp(this, 'changeWatchable', _descriptor2, this);

      _initDefineProp(this, 'inited', _descriptor3, this);

      this.src = '';

      _initDefineProp(this, 'isLive', _descriptor4, this);

      _initDefineProp(this, 'box', _descriptor5, this);

      this.preset = {};
      this.presetConfig = {};
      this.autoload = true;
      this.autoplay = false;
      this.controls = false;
      this.width = '100%';
      this.height = '100%';
      this.crossOrigin = undefined;
      this.loop = false;
      this.defaultMuted = false;
      this.muted = false;
      this.preload = 'auto';
      this.poster = undefined;
      this.playsInline = false;
      this.x5VideoPlayerFullscreen = false;
      this.x5VideoOrientation = undefined;
      this.x5VideoPlayerType = undefined;
      this.xWebkitAirplay = false;
      this.playbackRate = 1;
      this.defaultPlaybackRate = 1;
      this.disableRemotePlayback = false;
      this.volume = 1;

      _initDefineProp(this, '_kernelProperty', _descriptor6, this);

      _initDefineProp(this, '_realDomAttr', _descriptor7, this);

      applyDecorators(this, accessorMap, { self: true });
      Object.defineProperty(this, 'dispatcher', {
        value: dispatcher,
        enumerable: false,
        writable: false,
        configurable: false });

      Object.defineProperty(this, 'dom', {
        value: dispatcher.dom,
        enumerable: false,
        writable: false,
        configurable: false });

      deepAssign(this, config);
    }

    // 此处 box 只能置空，因为 kernel 会自动根据你的安装 kernel 和相关地址作智能判断。
    // 曾经 bug 详见 https://github.com/Chimeejs/chimee-kernel/issues/1

    // kernels 不在 videoConfig 上设置默认值，防止判断出错


    _createClass(VideoConfig, [{
      key: 'init',
      value: function init() {
        var _this = this;

        this._realDomAttr.forEach(function (key) {
          // $FlowFixMe: we have check the computed here
          _this[key] = _this[key];
        });
        this.inited = true;
      } }]);


    return VideoConfig;
  }(), _descriptor = _applyDecoratedDescriptor$1(_class$1.prototype, 'needToLoadSrc', [nonenumerable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    } }),
  _descriptor2 = _applyDecoratedDescriptor$1(_class$1.prototype, 'changeWatchable', [nonenumerable], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    } }),
  _descriptor3 = _applyDecoratedDescriptor$1(_class$1.prototype, 'inited', [nonenumerable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    } }),
  _descriptor4 = _applyDecoratedDescriptor$1(_class$1.prototype, 'isLive', [_dec$1, nonconfigurable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    } }),
  _descriptor5 = _applyDecoratedDescriptor$1(_class$1.prototype, 'box', [_dec2$1, nonconfigurable], {
    enumerable: true,
    initializer: function initializer() {
      return '';
    } }),
  _descriptor6 = _applyDecoratedDescriptor$1(_class$1.prototype, '_kernelProperty', [frozen], {
    enumerable: true,
    initializer: function initializer() {
      return ['isLive', 'box', 'preset', 'kernels', 'presetConfig'];
    } }),
  _descriptor7 = _applyDecoratedDescriptor$1(_class$1.prototype, '_realDomAttr', [frozen], {
    enumerable: true,
    initializer: function initializer() {
      return ['src', 'controls', 'width', 'height', 'crossOrigin', 'loop', 'muted', 'preload', 'poster', 'autoplay', 'playsInline', 'x5VideoPlayerFullscreen', 'x5VideoOrientation', 'xWebkitAirplay', 'playbackRate', 'defaultPlaybackRate', 'autoload', 'disableRemotePlayback', 'defaultMuted', 'volume', 'x5VideoPlayerType'];
    } }),
  _class$1);

  var _dec$1$1, _dec2$1$1, _dec3$1, _dec4$1, _dec5$1, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class$1$1, _class2$1;

  function _applyDecoratedDescriptor$1$1(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }
  var VideoWrapper = (_dec$1$1 = autobindClass(), _dec2$1$1 = alias('silentLoad'), _dec3$1 = alias('fullScreen'), _dec4$1 = alias('$fullScreen'), _dec5$1 = alias('fullscreen'), _dec6 = alias('emit'), _dec7 = alias('emitSync'), _dec8 = alias('on'), _dec9 = alias('addEventListener'), _dec10 = before(eventBinderCheck), _dec11 = alias('off'), _dec12 = alias('removeEventListener'), _dec13 = before(eventBinderCheck), _dec14 = alias('once'), _dec15 = before(eventBinderCheck), _dec16 = alias('css'), _dec17 = before(attrAndStyleCheck), _dec18 = alias('attr'), _dec19 = before(attrAndStyleCheck), _dec$1$1(_class$1$1 = (_class2$1 = function () {
    function VideoWrapper() {
      _classCallCheck(this, VideoWrapper);

      this.__events = {};
      this.__unwatchHandlers = [];
    }

    _createClass(VideoWrapper, [{
      key: '__wrapAsVideo',
      value: function __wrapAsVideo(videoConfig) {
        var _this = this;

        // bind video read only properties on instance, so that you can get info like buffered
        videoReadOnlyProperties.forEach(function (key) {
          _Object$defineProperty(_this, key, {
            get: function get$$1() {
              return this.__dispatcher.dom.videoElement[key];
            },

            set: undefined,
            configurable: false,
            enumerable: false });

        });
        // bind videoMethods like canplaytype on instance
        videoMethods.forEach(function (key) {
          _Object$defineProperty(_this, key, {
            get: function get$$1() {
              var video = this.__dispatcher.dom.videoElement;
              return bind(video[key], video);
            },

            set: undefined,
            configurable: false,
            enumerable: false });

        });
        // bind video config properties on instance, so that you can just set src by this
        var props = videoConfig._realDomAttr.concat(videoConfig._kernelProperty).reduce(function (props, key) {
          props[key] = [accessor({
            get: function get$$1() {
              // $FlowFixMe: support computed key here
              return videoConfig[key];
            },
            set: function set(value) {
              // $FlowFixMe: support computed key here
              videoConfig[key] = value;
              return value;
            } }),
          nonenumerable];
          return props;
        }, {});
        applyDecorators(this, props, { self: true });
        kernelMethods.forEach(function (key) {
          _Object$defineProperty(_this, key, {
            value: function value() {
              var _this2 = this;

              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              return new _Promise(function (resolve) {
                var _dispatcher$binder;

                var id = _this2.__id;
                _this2.__dispatcher.binder.once({
                  id: id,
                  name: '_' + key,
                  fn: resolve });

                (_dispatcher$binder = _this2.__dispatcher.binder)[/^(seek)$/.test(key) ? 'emitSync' : 'emit'].apply(_dispatcher$binder, [{
                  target: 'video',
                  name: key,
                  id: id }].
                concat(_toConsumableArray(args)));
              });
            },

            configurable: true,
            enumerable: false,
            writable: true });

        });
        domMethods.forEach(function (key) {
          if (key === 'fullscreen') return;
          _Object$defineProperty(_this, key, {
            value: function value() {
              var _dispatcher$dom;

              return (_dispatcher$dom = this.__dispatcher.dom)[key].apply(_dispatcher$dom, arguments);
            },

            configurable: true,
            enumerable: false,
            writable: true });

        });
      } },
    {
      key: '$watch',
      value: function $watch(key, handler) {
        var _this3 = this;

        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        deep = _ref.deep,
        _ref$diff = _ref.diff,
        diff = _ref$diff === undefined ? true : _ref$diff,
        other = _ref.other,
        _ref$proxy = _ref.proxy,
        proxy = _ref$proxy === undefined ? false : _ref$proxy;

        if (!isString(key) && !isArray(key)) throw new TypeError('$watch only accept string and Array<string> as key to find the target to spy on, but not ' + key + ', whose type is ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));
        var watching = true;
        var watcher = function watcher() {
          if (watching && (!(this instanceof VideoConfig) || this.dispatcher.changeWatchable)) bind(handler, this).apply(undefined, arguments);
        };
        var unwatcher = function unwatcher() {
          watching = false;
          var index$$1 = _this3.__unwatchHandlers.indexOf(unwatcher);
          if (index$$1 > -1) _this3.__unwatchHandlers.splice(index$$1, 1);
        };
        var keys = isString(key) ? key.split('.') : key;
        var property = keys.pop();
        var videoConfig = this.__dispatcher.videoConfig;
        var target = keys.length === 0 && !other && videoConfig._realDomAttr.indexOf(property) > -1 ? videoConfig : ['isFullscreen', 'fullscreenElement'].indexOf(property) > -1 ? this.__dispatcher.dom : getDeepProperty(other || this, keys, { throwError: true });
        applyDecorators(target, _defineProperty({}, property, watch(watcher, { deep: deep, diff: diff, proxy: proxy })), { self: true });
        this.__unwatchHandlers.push(unwatcher);
        return unwatcher;
      } },
    {
      key: '$set',
      value: function $set(obj, property, value) {
        if (!isObject(obj) && !isArray(obj)) throw new TypeError('$set only support Array or Object, but not ' + obj + ', whose type is ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
        // $FlowFixMe: we have custom this function
        if (!isFunction(obj.__set)) {
          // $FlowFixMe: we support computed string on array here
          obj[property] = value;
          return;
        }
        obj.__set(property, value);
      } },
    {
      key: '$del',
      value: function $del(obj, property) {
        if (!isObject(obj) && !isArray(obj)) throw new TypeError('$del only support Array or Object, but not ' + obj + ', whose type is ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
        // $FlowFixMe: we have custom this function
        if (!isFunction(obj.__del)) {
          // $FlowFixMe: we support computed string on array here
          delete obj[property];
          return;
        }
        obj.__del(property);
      } },
    {
      key: 'load',
      value: function load() {
        var _this4 = this;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return new _Promise(function (resolve) {
          var _dispatcher$binder2;

          _this4.__dispatcher.binder.once({
            id: _this4.__id,
            name: '_load',
            target: 'plugin',
            fn: resolve });

          (_dispatcher$binder2 = _this4.__dispatcher.binder).emit.apply(_dispatcher$binder2, [{
            name: 'load',
            target: 'plugin',
            id: _this4.__id }].
          concat(args));
        });
      } },
    {
      key: '$silentLoad',
      value: function $silentLoad() {
        var _this5 = this;

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return this.__dispatcher.binder.emit({
          name: 'silentLoad',
          target: 'video',
          id: this.__id }).
        then(function () {
          var _dispatcher;

          return (_dispatcher = _this5.__dispatcher).silentLoad.apply(_dispatcher, args);
        }).then(function (result) {
          _this5.__dispatcher.binder.trigger({
            name: 'silentLoad',
            target: 'video',
            id: _this5.__id },
          result);
        });
      }

      /**
         * call fullscreen api on some specific element
         * @param {boolean} flag true means fullscreen and means exit fullscreen
         * @param {string} element the element you want to fullscreen, default it's container, you can choose from video | container | wrapper
         */ },

    {
      key: '$fullscreen',
      value: function $fullscreen() {
        var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'container';

        if (!this.__dispatcher.binder.emitSync({
          name: 'fullscreen',
          id: this.__id,
          target: 'video-dom' },
        flag, element)) return false;
        var result = this.__dispatcher.dom.fullscreen(flag, element);
        this.__dispatcher.binder.triggerSync({
          name: 'fullscreen',
          id: this.__id,
          target: 'video-dom' },
        flag, element);
        return result;
      }

      /**
         * emit an event
         * @param  {string}    key event's name
         * @param  {...args} args
         */ },

    {
      key: '$emit',
      value: function $emit(key) {
        var _dispatcher$binder3;

        var target = void 0;
        if (isObject(key) && isString(key.name) && isString(key.target)) {
          target = key.target;
          key = key.name;
        }
        if (!isString(key)) throw new TypeError('emit key parameter must be String');

        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        return (_dispatcher$binder3 = this.__dispatcher.binder).emit.apply(_dispatcher$binder3, [{
          name: key,
          id: this.__id,
          target: target }].
        concat(_toConsumableArray(args)));
      }

      /**
         * emit a sync event
         * @param  {string}    key event's name
         * @param  {...args} args
         */ },

    {
      key: '$emitSync',
      value: function $emitSync(key) {
        var _dispatcher$binder4;

        var target = void 0;
        if (isObject(key) && isString(key.name) && isString(key.target)) {
          target = key.target;
          key = key.name;
        }
        if (!isString(key)) throw new TypeError('emitSync key parameter must be String');

        for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }

        return (_dispatcher$binder4 = this.__dispatcher.binder).emitSync.apply(_dispatcher$binder4, [{
          name: key,
          id: this.__id,
          target: target }].
        concat(_toConsumableArray(args)));
      }

      /**
         * bind event handler through this function
         * @param  {string} key event's name
         * @param  {Function} fn event's handler
         */ },

    {
      key: '$on',
      value: function $on(key, fn) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var eventInfo = _Object$assign({}, options, {
          name: key,
          id: this.__id,
          fn: fn });

        this.__dispatcher.binder.on(eventInfo);
        // set on __events as mark so that i can destroy it when i destroy
        this.__addEvents(key, fn);
      }
      /**
         * remove event handler through this function
         * @param  {string} key event's name
         * @param  {Function} fn event's handler
         */ },

    {
      key: '$off',
      value: function $off(key, fn) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var eventInfo = _Object$assign({}, options, {
          name: key,
          id: this.__id,
          fn: fn });

        this.__dispatcher.binder.off(eventInfo);
        this.__removeEvents(key, fn);
      }
      /**
         * bind one time event handler
         * @param {string} key event's name
         * @param {Function} fn event's handler
         */ },

    {
      key: '$once',
      value: function $once(key, fn) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var self = this;
        var boundFn = function boundFn() {
          bind(fn, this).apply(undefined, arguments);
          self.__removeEvents(key, boundFn);
        };
        self.__addEvents(key, boundFn);
        var eventInfo = _Object$assign({}, options, {
          name: key,
          id: this.__id,
          fn: boundFn });

        this.__dispatcher.binder.once(eventInfo);
      }

      /**
         * set style
         * @param {string} element optional, default to be video, you can choose from video | container | wrapper
         * @param {string} attribute the atrribue name
         * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
         */ },

    {
      key: '$css',
      value: function $css(method) {
        var _dispatcher$dom2;

        for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        return (_dispatcher$dom2 = this.__dispatcher.dom)[method + 'Style'].apply(_dispatcher$dom2, args);
      }

      /**
         * set attr
         * @param {string} element optional, default to be video, you can choose from video | container | wrapper
         * @param {string} attribute the atrribue nameß
         * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
         */ },

    {
      key: '$attr',
      value: function $attr(method) {
        var _dispatcher$dom3;

        for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          args[_key7 - 1] = arguments[_key7];
        }

        if (method === 'set' && /video/.test(args[0])) {
          if (!this.__dispatcher.videoConfigReady) {
            return args[2];
          }
          if (this.__dispatcher.videoConfig._realDomAttr.indexOf(args[1]) > -1) {
            var key = args[1],
            val = args[2];

            this.__dispatcher.videoConfig[key] = val;
            return val;
          }
        }
        return (_dispatcher$dom3 = this.__dispatcher.dom)[method + 'Attr'].apply(_dispatcher$dom3, args);
      } },
    {
      key: '__addEvents',
      value: function __addEvents(key, fn) {
        this.__events[key] = this.__events[key] || [];
        this.__events[key].push(fn);
      } },
    {
      key: '__removeEvents',
      value: function __removeEvents(key, fn) {
        if (isEmpty(this.__events[key])) return;
        var index$$1 = this.__events[key].indexOf(fn);
        if (index$$1 < 0) return;
        this.__events[key].splice(index$$1, 1);
        if (isEmpty(this.__events[key])) delete this.__events[key];
      } },
    {
      key: '__destroy',
      value: function __destroy() {
        var _this6 = this;

        this.__unwatchHandlers.forEach(function (unwatcher) {
          return unwatcher();
        });
        _Object$keys(this.__events).forEach(function (key) {
          if (!isArray(_this6.__events[key])) return;
          _this6.__events[key].forEach(function (fn) {
            return _this6.$off(key, fn);
          });
        });
        delete this.__events;
      } },
    {
      key: 'currentTime',
      get: function get$$1() {
        return this.__dispatcher.kernel.currentTime;
      },
      set: function set(second) {
        this.__dispatcher.binder.emitSync({
          name: 'seek',
          target: 'video',
          id: this.__id },
        second);
      } },
    {
      key: '$plugins',
      get: function get$$1() {
        return this.__dispatcher.plugins;
      } },
    {
      key: '$pluginOrder',
      get: function get$$1() {
        return this.__dispatcher.order;
      } },
    {
      key: '$wrapper',
      get: function get$$1() {
        return this.__dispatcher.dom.wrapper;
      } },
    {
      key: '$container',
      get: function get$$1() {
        return this.__dispatcher.dom.container;
      } },
    {
      key: '$video',
      get: function get$$1() {
        return this.__dispatcher.dom.videoElement;
      } },
    {
      key: 'isFullscreen',
      get: function get$$1() {
        return this.__dispatcher.dom.isFullscreen;
      } },
    {
      key: 'fullscreenElement',
      get: function get$$1() {
        return this.__dispatcher.dom.fullscreenElement;
      } },
    {
      key: 'container',
      get: function get$$1() {
        return this.__dispatcher.containerConfig;
      },
      set: function set(config) {
        if (!isObject(config)) {
          throw new Error('The config of container must be Object, but not ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)) + '.');
        }
        deepAssign(this.__dispatcher.containerConfig, config);
        return this.__dispatcher.container;
      } },
    {
      key: 'videoRequireGuardedAttributes',
      get: function get$$1() {
        return this.__dispatcher.dom.videoRequireGuardedAttributes;
      } }]);


    return VideoWrapper;
  }(), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$silentLoad', [_dec2$1$1], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$silentLoad'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$fullscreen', [_dec3$1, _dec4$1, _dec5$1], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$fullscreen'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$emit', [_dec6], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$emit'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$emitSync', [_dec7], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$emitSync'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$on', [_dec8, _dec9, _dec10], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$on'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$off', [_dec11, _dec12, _dec13], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$off'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$once', [_dec14, _dec15], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$once'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$css', [_dec16, _dec17], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$css'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$attr', [_dec18, _dec19], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$attr'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$plugins', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$plugins'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$pluginOrder', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$pluginOrder'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$wrapper', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$wrapper'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$container', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$container'), _class2$1.prototype), _applyDecoratedDescriptor$1$1(_class2$1.prototype, '$video', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2$1.prototype, '$video'), _class2$1.prototype), _class2$1)) || _class$1$1);

  var _dec$2, _class$2;

  /**
                         * <pre>
                         * Plugin is the class for plugin developer.
                         * When we use a plugin, we will generate an instance of plugin.
                         * Developer can do most of things base on this plugin
                         * </pre>
                         */
  var Plugin = (_dec$2 = autobindClass(), _dec$2(_class$2 = function (_VideoWrapper) {
    _inherits(Plugin, _VideoWrapper);

    /**
                                       * <pre>
                                       * to create a plugin, we need three parameter
                                       * 1. the config of a plugin
                                       * 2. the dispatcher
                                       * 3. this option for plugin to read
                                       * this is the plugin base class, which you can get on Chimee
                                       * You can just extends it and then install
                                       * But in that way you must remember to pass the arguments to super()
                                       * </pre>
                                       * @param  {string}  PluginConfig.id        camelize from plugin's name or class name.
                                       * @param  {string}  PluginConfig.name      plugin's name or class name
                                       * @param  {Number}  PluginConfig.level     the level of z-index
                                       * @param  {Boolean} PluginConfig.operable  to tell if the plugin can be operable, if not, we will add pointer-events: none on it.
                                       * @param  {Function}  PluginConfig.create  the create function which we will called when plugin is used. sth like constructor in object style.
                                       * @param  {Function}  PluginConfig.destroy   function to be called when we destroy a plugin
                                       * @param  {Object}  PluginConfig.events    You can set some events handler in this object, we will bind it once you use the plugin.
                                       * @param  {Object}  PluginConfig.data      dataset we will bind on data in object style
                                       * @param  {Object<{get: Function, set: Function}}  PluginConfig.computed  dataset we will handle by getter and setter
                                       * @param  {Object<Function>}  PluginConfig.methods   some function we will bind on plugin
                                       * @param  {string|HTMLElment}  PluginConfig.el  can be string or HTMLElement, we will use this to create the dom for plugin
                                       * @param  {boolean} PluginConfig.penetrate boolean to let us do we need to forward the dom events for this plugin.
                                       * @param  {Dispatcher}  dispatcher referrence of dispatcher
                                       * @param  {Object}  option  PluginOption that will pass to the plugin
                                       * @return {Plugin}  plugin instance
                                       */
    function Plugin() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      id = _ref.id,
      name = _ref.name,
      _ref$level = _ref.level,
      level = _ref$level === undefined ? 0 : _ref$level,
      _ref$operable = _ref.operable,
      operable = _ref$operable === undefined ? true : _ref$operable,
      beforeCreate = _ref.beforeCreate,
      create = _ref.create,
      init = _ref.init,
      inited = _ref.inited,
      destroy = _ref.destroy,
      _ref$events = _ref.events,
      events = _ref$events === undefined ? {} : _ref$events,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? {} : _ref$data,
      _ref$computed = _ref.computed,
      computed = _ref$computed === undefined ? {} : _ref$computed,
      _ref$methods = _ref.methods,
      methods = _ref$methods === undefined ? {} : _ref$methods,
      el = _ref.el,
      _ref$penetrate = _ref.penetrate,
      penetrate = _ref$penetrate === undefined ? false : _ref$penetrate,
      _ref$inner = _ref.inner,
      inner = _ref$inner === undefined ? true : _ref$inner,
      autoFocus = _ref.autoFocus,
      className = _ref.className;

      var dispatcher = arguments[1];
      var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { name: name };

      _classCallCheck(this, Plugin);

      var _this = _possibleConstructorReturn(this, (Plugin.__proto__ || _Object$getPrototypeOf(Plugin)).call(this));

      _this.destroyed = false;
      _this.VERSION = '0.10.5';
      _this.__operable = true;
      _this.__level = 0;

      if (isEmpty(dispatcher)) {
        throw new TypeError('lack of dispatcher');
      }
      if (!isString(id)) {
        throw new TypeError('id of PluginConfig must be string');
      }
      _this.__id = id;
      _this.__dispatcher = dispatcher;
      _this.$videoConfig = _this.__dispatcher.videoConfig;
      _this.__wrapAsVideo(_this.$videoConfig);
      _this.beforeCreate = _this.beforeCreate || beforeCreate;
      try {
        isFunction(_this.beforeCreate) && _this.beforeCreate({
          events: events,
          data: data,
          computed: computed,
          methods: methods },
        option);
      } catch (error) {
        _this.$throwError(error);
      }
      // bind plugin methods into instance
      if (!isEmpty(methods) && isObject(methods)) {
        _Object$keys(methods).forEach(function (key) {
          var fn = methods[key];
          if (!isFunction(fn)) throw new TypeError('plugins methods must be Function');
          _Object$defineProperty(_this, key, {
            value: bind(fn, _this),
            writable: true,
            enumerable: false,
            configurable: true });

        });
      }
      // hook plugin events on bus
      if (!isEmpty(events) && isObject(events)) {
        _Object$keys(events).forEach(function (key) {
          if (!isFunction(events[key])) throw new TypeError('plugins events hook must bind with Function');
          _this.$on(key, events[key]);
        });
      }
      // bind data into plugin instance
      if (!isEmpty(data) && isObject(data)) {
        deepAssign(_this, data);
      }
      // set the computed member by getter and setter
      if (!isEmpty(computed) && isObject(computed)) {
        var props = _Object$keys(computed).reduce(function (props, key) {
          var val = computed[key];
          if (isFunction(val)) {
            props[key] = accessor({ get: val });
            return props;
          }
          if (isObject(val) && (isFunction(val.get) || isFunction(val.set))) {
            props[key] = accessor(val);
            return props;
          }
          return props;
        }, {});
        applyDecorators(_this, props, { self: true });
      }
      /**
         * the create Function of plugin
         * @type {Function}
         */
      _this.create = _this.create || create;
      /**
                                              * this init Function of plugin
                                              * which will be called when we start to create the video player
                                              * the plugin can handle some config here
                                              * @type {Function}
                                              */
      _this.init = _this.init || init;
      /**
                                        * this inited Function of plugin
                                        * which will be called when we have created the video player
                                        * @type {Function}
                                        */
      _this.inited = _this.inited || inited;
      /**
                                              * the destroy Function of plugin
                                              * @type {Function}
                                              */
      _this.destroy = _this.destroy || destroy;
      /**
                                                 * the dom node of whole plugin
                                                 * @type {HTMLElement}
                                                 */
      _this.$dom = _this.__dispatcher.dom.insertPlugin(_this.__id, el, { penetrate: penetrate, inner: inner, className: className });
      _this.$autoFocus = isBoolean(autoFocus) ? autoFocus : inner;
      // now we can frozen inner, autoFocus and penetrate
      _this.$inner = inner;
      _this.$penetrate = penetrate;
      applyDecorators(_this, {
        $inner: frozen,
        $penetrate: frozen },
      { self: true });
      /**
                        * to tell us if the plugin can be operable, can be dynamic change
                        * @type {boolean}
                        */
      _this.$operable = isBoolean(option.operable) ? option.operable : operable;
      _this.__level = isInteger$2(option.level) ? option.level : level;
      /**
                                                                         * pluginOption, so it's easy for plugin developer to check the config
                                                                         * @type {Object}
                                                                         */
      _this.$config = option;
      try {
        isFunction(_this.create) && _this.create();
      } catch (error) {
        _this.$throwError(error);
      }
      return _this;
    }
    /**
       * call for init lifecycle hook, which mainly handle the original config of video and kernel.
       * @param {VideoConfig} videoConfig the original config of the videoElement or Kernel
       */


    _createClass(Plugin, [{
      key: '__init',
      value: function __init(videoConfig) {
        try {
          isFunction(this.init) && this.init(videoConfig);
        } catch (error) {
          this.$throwError(error);
        }
      }
      /**
         * call for inited lifecycle hook, which just to tell the plugin we have inited.
         */ },

    {
      key: '__inited',
      value: function __inited() {
        var _this2 = this;

        var result = void 0;
        try {
          result = isFunction(this.inited) && this.inited();
        } catch (error) {
          this.$throwError(error);
        }
        this.readySync = !isPromise(result);
        this.ready = this.readySync ? _Promise.resolve(this)
        // $FlowFixMe: it's promise now
        : result.then(function () {
          _this2.readySync = true;
          return _this2;
        }).catch(function (error) {
          if (isError(error)) return _this2.$throwError(error);
          return _Promise.reject(error);
        });
        return this.readySync ? this : this.ready;
      }

      /**
         * set the plugin to be the top of all plugins
         */ },

    {
      key: '$bumpToTop',
      value: function $bumpToTop() {
        var topLevel = this.__dispatcher._getTopLevel(this.$inner);
        this.$level = topLevel + 1;
      } },
    {
      key: '$throwError',
      value: function $throwError(error) {
        this.__dispatcher.throwError(error);
      }
      /**
         * officail destroy function for plugin
         * we will call user destory function in this method
         */ },

    {
      key: '$destroy',
      value: function $destroy() {
        if (this.destroyed) return;
        isFunction(this.destroy) && this.destroy();
        _get(Plugin.prototype.__proto__ || _Object$getPrototypeOf(Plugin.prototype), '__destroy', this).call(this);
        this.__dispatcher.dom.removePlugin(this.__id);
        delete this.__dispatcher;
        delete this.$dom;
        this.destroyed = true;
      }
      /**
         * to tell us if the plugin can be operable, can be dynamic change
         * @type {boolean}
         */ },

    {
      key: '$operable',
      set: function set(val) {
        if (!isBoolean(val)) return;
        this.$dom.style.pointerEvents = val ? 'auto' : 'none';
        this.__operable = val;
      },
      get: function get$$1() {
        return this.__operable;
      }
      /**
         * the z-index level, higher when you set higher
         * @type {boolean}
         */ },

    {
      key: '$level',
      set: function set(val) {
        if (!isInteger$2(val)) return;
        this.__level = val;
        this.__dispatcher._sortZIndex();
      },
      get: function get$$1() {
        return this.__level;
      } },
    {
      key: '$autoFocus',
      get: function get$$1() {
        return this.__autoFocus;
      },
      set: function set(val) {
        this.__autoFocus = val;
        this.__dispatcher.dom._autoFocusToVideo(this.$dom, !val);
      } }]);


    return Plugin;
  }(VideoWrapper)) || _class$2);

  var _dec$3, _dec2$2, _dec3$1$1, _dec4$1$1, _dec5$1$1, _dec6$1, _class$3;

  function _applyDecoratedDescriptor$2(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }
  function targetCheck(target) {
    if (target === 'video') target = 'videoElement';
    if (!isElement(this[target])) throw new TypeError('Your target "' + target + '" is not a legal HTMLElement');

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return [target].concat(args);
  }
  function attrOperationCheck(target, attr, val) {
    if (!isString(attr)) throw new TypeError('to handle dom\'s attribute or style, your attr parameter must be string, but not ' + attr + ' in ' + (typeof attr === 'undefined' ? 'undefined' : _typeof(attr)));
    if (!isString(target)) throw new TypeError('to handle dom\'s attribute or style, your target parameter must be string, , but not ' + target + ' in ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)));
    return [target, attr, val];
  }
  /**
     * <pre>
     * Dom work for Dispatcher.
     * It take charge of dom management of Dispatcher.
     * </pre>
     */
  var Dom = (_dec$3 = waituntil('__dispatcher.videoConfigReady'), _dec2$2 = before(attrOperationCheck, targetCheck), _dec3$1$1 = before(attrOperationCheck, targetCheck), _dec4$1$1 = before(attrOperationCheck, targetCheck), _dec5$1$1 = before(attrOperationCheck, targetCheck), _dec6$1 = before(targetCheck), _class$3 = function () {
    _createClass(Dom, [{
      key: 'mouseInVideo',

      /**
                            * to mark is the mouse in the video area
                            */

      /**
                                * all plugin's dom element set
                                */
      get: function get$$1() {
        return this.__mouseInVideo;
      }
      /**
         * the html to restore when we are destroyed
         */,

      set: function set(val) {
        this.__mouseInVideo = !!val;
      }
      /**
         * collection of video extension nodes
         * some nodes can be regarded as part of video (such as penetrate element)
         * so we store them here
         */ },

    {
      key: 'videoExtendedNodes',
      get: function get$$1() {
        return this.__videoExtendedNodes;
      } }]);


    function Dom(config, dispatcher) {
      _classCallCheck(this, Dom);

      this.plugins = {};
      this.originHTML = '';
      this.__mouseInVideo = false;
      this.destroyed = false;
      this.__videoExtendedNodes = [];
      this.isFullscreen = false;
      this.fullscreenElement = undefined;

      var _ref = config || {},
      wrapper = _ref.wrapper;

      this.__dispatcher = dispatcher;
      if (!isElement(wrapper) && !isString(wrapper)) throw new TypeError('Wrapper can only be string or HTMLElement, but not ' + (typeof wrapper === 'undefined' ? 'undefined' : _typeof(wrapper)));
      var $wrapper = $(wrapper);
      // TODO: we have to decalre length for wrapper
      // $FlowFixMe: we have to decalre length here
      if ($wrapper.length === 0) {
        throw new TypeError('Can not get dom node accroding wrapper. Please check your wrapper');
      }
      /**
         * the referrence of the dom wrapper of whole Chimee
         */
      // $FlowFixMe: support computed key on nodewrap
      this.wrapper = $wrapper[0];
      this.originHTML = this.wrapper.innerHTML;
      // if we find video element inside wrapper
      // we use it
      // or we create a video element by ourself.
      // $FlowFixMe: support computed key on nodewrap
      var videoElement = $wrapper.find('video')[0];
      if (!videoElement) {
        videoElement = document.createElement('video');
      }
      /**
         * referrence of video's dom element
         */
      this.installVideo(videoElement);
      this._fullscreenMonitor();
      index.on('fullscreenchange', this._fullscreenMonitor);
      // As some video attributes will missed when we switch kernel
      // we set a guarder for it
      // and we must make sure style be guarded
      var videoRequiredGuardedAttributes = isArray(config.videoRequiredGuardedAttributes) ? config.videoRequiredGuardedAttributes : [];
      if (videoRequiredGuardedAttributes.indexOf('style') < 0) {
        videoRequiredGuardedAttributes.unshift('style');
      }
      this.videoRequireGuardedAttributes = videoRequiredGuardedAttributes;
    }

    _createClass(Dom, [{
      key: 'installVideo',
      value: function installVideo(videoElement) {
        this.__videoExtendedNodes.push(videoElement);
        setAttr(videoElement, 'tabindex', -1);
        this._autoFocusToVideo(videoElement);
        if (!isElement(this.container)) {
          // create container
          if (videoElement.parentElement && isElement(videoElement.parentElement) && videoElement.parentElement !== this.wrapper) {
            this.container = videoElement.parentElement;
          } else {
            this.container = document.createElement('container');
            $(this.container).append(videoElement);
          }
        } else {
          var container = this.container;
          if (container.childNodes.length === 0) {
            container.appendChild(videoElement);
          } else {
            container.insertBefore(videoElement, container.childNodes[0]);
          }
        }
        // check container.position
        if (this.container.parentElement !== this.wrapper) {
          $(this.wrapper).append(this.container);
        }
        this.videoElement = videoElement;
        return videoElement;
      } },
    {
      key: 'removeVideo',
      value: function removeVideo() {
        var videoElement = this.videoElement;
        this._autoFocusToVideo(this.videoElement, false);
        // when we destroy the chimee
        // binder is destroyed before dom
        // so we need to make a check here
        this.__dispatcher.binder && this.__dispatcher.binder.bindEventOnVideo(videoElement, true);
        $(videoElement).remove();
        delete this.videoElement;
        return videoElement;
      }

      /**
         * each plugin has its own dom node, this function will create one or them.
         * we support multiple kind of el
         * 1. Element, we will append this dom node on wrapper straight
         * 2. HTMLString, we will create dom based on this HTMLString and append it on wrapper
         * 3. string, we will transfer this string into hypen string, then we create a custom elment called by this and bind it on wrapper
         * 4. nothing, we will create a div and bind it on the wrapper
         */ },

    {
      key: 'insertPlugin',
      value: function insertPlugin(id, el) {
        var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (!isString(id)) throw new TypeError('insertPlugin id parameter must be string');
        if (isElement(this.plugins[id])) {
          this.removePlugin(id);
        }
        if (isString(el)) {
          if (isHTMLString(el)) {
            var outer = document.createElement('div');
            outer.innerHTML = el;
            el = outer.children[0];
          } else {
            el = document.createElement(hypenate(el));
          }
        } else if (isObject(el)) {
          // $FlowFixMe: we have check el's type here and make sure it's an object
          option = el;
        }
        var _option = option,
        inner = _option.inner,
        penetrate = _option.penetrate;
        var _option2 = option,
        className = _option2.className;

        var node = el && isElement(el) ? el : document.createElement('div');
        if (isArray(className)) {
          className = className.join(' ');
        }
        if (isString(className)) {
          addClassName(node, className);
        }
        this.plugins[id] = node;
        var outerElement = inner ? this.container : this.wrapper;
        var originElement = inner ? this.videoElement : this.container;
        // auto forward the event if this plugin can be penetrate
        if (penetrate) {
          this.__dispatcher.binder.bindEventOnPenetrateNode(node);
          this.__videoExtendedNodes.push(node);
        }
        if (outerElement.lastChild === originElement) {
          outerElement.appendChild(node);
          return node;
        }
        outerElement.insertBefore(node, originElement.nextSibling);
        return node;
      }

      /**
         * remove plugin's dom
         */ },

    {
      key: 'removePlugin',
      value: function removePlugin(id) {
        if (!isString(id)) return;
        var dom = this.plugins[id];
        if (isElement(dom)) {
          dom.parentNode && dom.parentNode.removeChild(dom);
          this._autoFocusToVideo(dom, true);
        }

        var _ref2 = Dispatcher.getPluginConfig(id) || {},
        _ref2$penetrate = _ref2.penetrate,
        penetrate = _ref2$penetrate === undefined ? false : _ref2$penetrate;

        if (penetrate) this.__dispatcher.binder.bindEventOnPenetrateNode(dom, true);
        delete this.plugins[id];
      }

      /**
         * Set zIndex for a plugins list
         */ },

    {
      key: 'setPluginsZIndex',
      value: function setPluginsZIndex(plugins) {
        var _this = this;

        // $FlowFixMe: there are videoElment and container here
        plugins.forEach(function (key, index$$1) {
          return setStyle(key.match(/^(videoElement|container)$/) ? _this[key] : _this.plugins[key], 'z-index', ++index$$1);
        });
      }

      /**
         * set attribute on our dom
         * @param {string} attr attribute's name
         * @param {anything} val attribute's value
         * @param {string} target the HTMLElemnt string name, only support video/wrapper/container now
         */ },

    {
      key: 'setAttr',
      value: function setAttr$$1(target, attr, val) {
        // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
        setAttr(this[target], attr, val);
      } },
    {
      key: 'getAttr',
      value: function getAttr$$1(target, attr) {
        // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
        return getAttr(this[target], attr);
      } },
    {
      key: 'setStyle',
      value: function setStyle$$1(target, attr, val) {
        // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
        setStyle(this[target], attr, val);
      } },
    {
      key: 'getStyle',
      value: function getStyle$$1(target, attr) {
        // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
        return getStyle(this[target], attr);
      } },
    {
      key: 'requestFullscreen',
      value: function requestFullscreen(target) {
        // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
        return index.open(this[target]);
      } },
    {
      key: 'exitFullscreen',
      value: function exitFullscreen() {
        return index.exit();
      } },
    {
      key: 'fullscreen',
      value: function fullscreen() {
        var request = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'container';

        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        return request ? this.requestFullscreen.apply(this, [target].concat(_toConsumableArray(args))) : this.exitFullscreen.apply(this, _toConsumableArray(args));
      } },
    {
      key: 'focus',
      value: function focus() {
        this.videoElement.focus();
      } },
    {
      key: 'isNodeInsideVideo',
      value: function isNodeInsideVideo(node) {
        return this.__videoExtendedNodes.indexOf(node) > -1 || this.__videoExtendedNodes.reduce(function (flag, video) {
          if (flag) return flag;
          return isPosterityNode(video, node);
        }, false);
      } },
    {
      key: 'migrateVideoRequiredGuardedAttributes',
      value: function migrateVideoRequiredGuardedAttributes(video) {
        var _this2 = this;

        var guardedAttributesAndValue = this.videoRequireGuardedAttributes.map(function (attr) {
          return [attr, getAttr(_this2.videoElement, attr)];
        });
        guardedAttributesAndValue.forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
          attr = _ref4[0],
          value = _ref4[1];

          return setAttr(video, attr, value);
        });
      }

      /**
         * function called when we distory
         */ },

    {
      key: 'destroy',
      value: function destroy() {
        this.removeVideo();
        index.off('fullscreenchange', this._fullscreenMonitor);
        this.wrapper.innerHTML = this.originHTML;
        delete this.wrapper;
        delete this.plugins;
        this.destroyed = true;
      } },
    {
      key: '_autoFocusToVideo',
      value: function _autoFocusToVideo(element) {
        var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        /* istanbule ignore next */
        if (!isElement(element)) return;
        (remove ? removeEvent : addEvent)(element, 'mouseup', this._focusToVideo, false, true);
        (remove ? removeEvent : addEvent)(element, 'touchend', this._focusToVideo, false, true);
      } },
    {
      key: '_focusToVideo',
      value: function _focusToVideo() {
        var x = window.scrollX;
        var y = window.scrollY;
        isFunction(this.videoElement.focus) && this.videoElement.focus();
        window.scrollTo(x, y);
      } },
    {
      key: '_fullscreenMonitor',
      value: function _fullscreenMonitor(evt) {
        var element = index.fullscreenElement;
        var original = this.isFullscreen;
        if (!element || !isPosterityNode(this.wrapper, element) && element !== this.wrapper) {
          this.isFullscreen = false;
          this.fullscreenElement = undefined;
        } else {
          this.isFullscreen = true;
          this.fullscreenElement = this.wrapper === element ? 'wrapper' : this.container === element ? 'container' : this.videoElement === element ? 'video' : element;
        }
        if (isEvent(evt) && original !== this.isFullscreen) {
          this.__dispatcher.binder.triggerSync({
            name: 'fullscreenchange',
            target: 'esFullscreen',
            id: 'dispatcher' },
          evt);
        }
      } }]);


    return Dom;
  }(), _applyDecoratedDescriptor$2(_class$3.prototype, 'setAttr', [_dec$3, _dec2$2], _Object$getOwnPropertyDescriptor(_class$3.prototype, 'setAttr'), _class$3.prototype), _applyDecoratedDescriptor$2(_class$3.prototype, 'getAttr', [_dec3$1$1], _Object$getOwnPropertyDescriptor(_class$3.prototype, 'getAttr'), _class$3.prototype), _applyDecoratedDescriptor$2(_class$3.prototype, 'setStyle', [_dec4$1$1], _Object$getOwnPropertyDescriptor(_class$3.prototype, 'setStyle'), _class$3.prototype), _applyDecoratedDescriptor$2(_class$3.prototype, 'getStyle', [_dec5$1$1], _Object$getOwnPropertyDescriptor(_class$3.prototype, 'getStyle'), _class$3.prototype), _applyDecoratedDescriptor$2(_class$3.prototype, 'requestFullscreen', [_dec6$1], _Object$getOwnPropertyDescriptor(_class$3.prototype, 'requestFullscreen'), _class$3.prototype), _applyDecoratedDescriptor$2(_class$3.prototype, '_focusToVideo', [autobind], _Object$getOwnPropertyDescriptor(_class$3.prototype, '_focusToVideo'), _class$3.prototype), _applyDecoratedDescriptor$2(_class$3.prototype, '_fullscreenMonitor', [autobind], _Object$getOwnPropertyDescriptor(_class$3.prototype, '_fullscreenMonitor'), _class$3.prototype), _class$3);

  var defaultContainerConfig = {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'block' };


  // base css controller for container and wrapper

  var Vessel = function Vessel(dispatcher, target, config) {
    var _this = this;

    _classCallCheck(this, Vessel);

    this.__dispatcher = dispatcher;
    this.__target = target;
    ['width', 'height', 'position', 'display'].forEach(function (key) {
      _Object$defineProperty(_this, key, {
        get: function get$$1() {
          return this.__dispatcher.dom.getStyle(this.__target, key);
        },
        set: function set(value) {
          if (isNumber(value)) {
            value = value + 'px';
          }
          if (!isString(value)) {
            throw new Error('The value of ' + key + ' in ' + this.__target + 'Config must be string, but not ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + '.');
          }
          this.__dispatcher.dom.setStyle(this.__target, key, value);
          // return value;
        },

        configurable: true,
        enumerable: true });

    });
    deepAssign(this, config);
  };

  var _dec$4, _dec2$3, _dec3$2, _dec4$2, _class$4;

  function _applyDecoratedDescriptor$3(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }
  var secondaryReg = /^(before|after|_)/;
  function secondaryChecker(key) {
    if (key.match(secondaryReg)) {
      return false;
    }
    return true;
  }
  /**
     * <pre>
     * event Bus class. Bus take charge of commuication between plugins and user.
     * Some of the event may trigger the kernel to do some task.
     * An event will run in four lifecycle
     * before -> processor -> main -> after -> side effect(_)
     * -------------------- emit period ----------------
     * before: once an event emit, it will run through plugins in bubble to know is it possible to run.
     * processor: if sth need to be done on kernel. It will tell kernel. If kernel will trigger event later, it will break down here. Else will run into trigger period
     * -------------------- trigger period -----------------
     * main: this procedure will trigger the main event in bubble, which means it can be stop in one plugin.
     * after: once event run through all events. It will trigger after event. This event will be trigger in broadcast way.
     * side effect(_): This events will always trigger once we bump into trigger period. So that you can know if the events been blocked. But it's not advice to listen on this effect.
     * </pre>
     */
  var Bus = (_dec$4 = runnable(secondaryChecker), _dec2$3 = runnable(secondaryChecker, {
    backup: function backup() {
      return false;
    } }),
  _dec3$2 = runnable(secondaryChecker), _dec4$2 = runnable(secondaryChecker, {
    backup: function backup() {
      return false;
    } }),
  _class$4 = function () {
    /**
                           * @param {Dispatcheer} dispatcher bus rely on dispatcher, so you mush pass dispatcher at first when you generate Bus.
                           * @return {Bus}
                           */

    /**
                               * the handler set of all events
                               * @type {Object}
                               * @member events
                               */
    function Bus(dispatcher, kind) {
      _classCallCheck(this, Bus);

      this.events = {};
      this.onceMap = {};

      /**
                          * the referrence to dispatcher
                          * @type {Dispatcher}
                          */
      this.__dispatcher = dispatcher;
      this.__kind = kind;
    }
    /**
       * [Can only be called in dispatcher]bind event on bus.
       */


    _createClass(Bus, [{
      key: 'on',
      value: function on(id, eventName, fn, stage) {
        this._addEvent([eventName, stage, id], fn);
      }
      /**
         * [Can only be called in dispatcher]remove event off bus. Only suggest one by one.
         */ },

    {
      key: 'off',
      value: function off(id, eventName, fn, stage) {
        var keys = [eventName, stage, id];
        var deleted = this._removeEvent(keys, fn);
        if (deleted) return;
        var handler = this._getHandlerFromOnceMap(keys, fn);
        if (isFunction(handler)) {
          this._removeEvent(keys, handler) && this._removeFromOnceMap(keys, fn, handler);
        }
      }
      /**
         * [Can only be called in dispatcher]bind event on bus and remove it once event is triggered.
         */ },

    {
      key: 'once',
      value: function once(id, eventName, fn, stage) {
        var bus = this;
        var keys = [eventName, stage, id];
        var handler = function handler() {
          // keep the this so that it can run
          bind(fn, this).apply(undefined, arguments);
          bus._removeEvent(keys, handler);
          bus._removeFromOnceMap(keys, fn, handler);
        };
        this._addEvent(keys, handler);
        this._addToOnceMap(keys, fn, handler);
      }
      /**
         * [Can only be called in dispatcher]emit an event, which will run before -> processor period.
         * It may stop in before period.
         * @param  {string}    key event's name
         * @param  {anything} args other argument will be passed into handler
         * @return {Promise}  this promise maybe useful if the event would not trigger kernel event. In that will you can know if it runs successful. But you can know if the event been stopped by the promise.
         */ },

    {
      key: 'emit',
      value: function emit(key) {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var event = this.events[key];
        if (isEmpty(event)) {
          if (selfProcessorEvents.indexOf(key) > -1) return _Promise.resolve();
          // $FlowFixMe: conditional return here
          return this._eventProcessor.apply(this, [key, { sync: false }].concat(_toConsumableArray(args)));
        }
        var beforeQueue = this._getEventQueue(event.before, this.__dispatcher.order);
        return runRejectableQueue.apply(undefined, [beforeQueue].concat(_toConsumableArray(args))).then(function () {
          if (selfProcessorEvents.indexOf(key) > -1) return;
          return _this._eventProcessor.apply(_this, [key, { sync: false }].concat(_toConsumableArray(args)));
        }).catch(function (error) {
          if (isError(error)) _this.__dispatcher.throwError(error);
          return _Promise.reject(error);
        });
      }
      /**
         * [Can only be called in dispatcher]emit an event, which will run before -> processor period synchronize.
         * It may stop in before period.
         * @param  {string}    key event's name
         * @param  {anything} args other argument will be passed into handler
         * @return {Promise}  this promise maybe useful if the event would not trigger kernel event. In that will you can know if it runs successful. But you can know if the event been stopped by the promise.
         */ },

    {
      key: 'emitSync',
      value: function emitSync(key) {
        var event = this.events[key];

        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        if (isEmpty(event)) {
          if (selfProcessorEvents.indexOf(key) > -1) return true;
          // $FlowFixMe: conditional return here
          return this._eventProcessor.apply(this, [key, { sync: true }].concat(_toConsumableArray(args)));
        }
        var beforeQueue = this._getEventQueue(event.before, this.__dispatcher.order);
        return runStoppableQueue.apply(undefined, [beforeQueue].concat(_toConsumableArray(args))) && (selfProcessorEvents.indexOf(key) > -1 ||
        // $FlowFixMe: conditional return here
        this._eventProcessor.apply(this, [key, { sync: true }].concat(_toConsumableArray(args))));
      }
      /**
         * [Can only be called in dispatcher]trigger an event, which will run main -> after -> side effect period
         * @param  {string}    key event's name
         * @param  {anything} args
         * @return {Promise|undefined}    you can know if event trigger finished~ However, if it's unlegal
         */ },

    {
      key: 'trigger',
      value: function trigger(key) {
        var _this2 = this;

        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        var event = this.events[key];
        if (isEmpty(event)) {
          return _Promise.resolve(true);
        }
        var mainQueue = this._getEventQueue(event.main, this.__dispatcher.order);
        return runRejectableQueue.apply(undefined, [mainQueue].concat(_toConsumableArray(args))).then(function () {
          var afterQueue = _this2._getEventQueue(event.after, _this2.__dispatcher.order);
          return runRejectableQueue.apply(undefined, [afterQueue].concat(_toConsumableArray(args)));
        }).then(function () {
          return _this2._runSideEffectEvent.apply(_this2, [key, _this2.__dispatcher.order].concat(_toConsumableArray(args)));
        }).catch(function (error) {
          if (isError(error)) _this2.__dispatcher.throwError(error);
          return _this2._runSideEffectEvent.apply(_this2, [key, _this2.__dispatcher.order].concat(_toConsumableArray(args)));
        });
      }
      /**
         * [Can only be called in dispatcher]trigger an event, which will run main -> after -> side effect period in synchronize
         * @param  {string}    key event's name
         * @param  {anything} args
         * @return {boolean}    you can know if event trigger finished~ However, if it's unlegal
         */ },

    {
      key: 'triggerSync',
      value: function triggerSync(key) {
        var event = this.events[key];
        if (isEmpty(event)) {
          return true;
        }
        var mainQueue = this._getEventQueue(event.main, this.__dispatcher.order);
        var afterQueue = this._getEventQueue(event.after, this.__dispatcher.order);

        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        var result = runStoppableQueue.apply(undefined, [mainQueue].concat(_toConsumableArray(args))) && runStoppableQueue.apply(undefined, [afterQueue].concat(_toConsumableArray(args)));
        this._runSideEffectEvent.apply(this, [key, this.__dispatcher.order].concat(_toConsumableArray(args)));
        return result;
      }
      /**
         * destroy hook which will be called when object destroy
         */ },

    {
      key: 'destroy',
      value: function destroy() {
        delete this.events;
        delete this.__dispatcher;
      }
      /**
         * add event into bus
         * @private
         * @param {Array} keys keys map pointing to position to put event handler
         * @param {function} fn handler to put
         */ },

    {
      key: '_addEvent',
      value: function _addEvent(keys, fn) {
        keys = deepClone(keys);
        var id = keys.pop();
        var target = keys.reduce(function (target, key) {
          target[key] = target[key] || {};
          return target[key];
        }, this.events);
        // events will store like {play: {main: {plugin: []}}}
        target[id] = target[id] || [];
        target[id].push(fn);
      }
      /**
         * remove event from bus
         * @private
         * @param {Array} keys keys map pointing to position to get event handler
         * @param {function} fn handler to put
         */ },

    {
      key: '_removeEvent',
      value: function _removeEvent(keys, fn) {
        keys = deepClone(keys);
        var id = keys.pop();
        var target = this.events;
        var backtrackList = [];
        for (var i = 0, len = keys.length; i < len; i++) {
          var son = target[keys[i]];
          // if we can't find the event binder, just return
          if (isEmpty(son)) return;
          backtrackList.push([target, keys[i]]);
          target = son;
        }
        var queue = target[id] || [];
        var index$$1 = queue.indexOf(fn);
        var hasFn = index$$1 > -1;
        // if we found handler remove it
        if (hasFn) {
          queue.splice(index$$1, 1);
        }
        // if this plugin has no event binding, we remove this event session, which make us perform faster in emit & trigger period.
        if (queue.length < 1) {
          delete target[id];
          // backtrack to remove the redudant object
          for (var _i = backtrackList.length - 1; _i > -1; _i--) {
            var _backtrackList$_i = _slicedToArray(backtrackList[_i], 2),
            parent = _backtrackList$_i[0],
            key = _backtrackList$_i[1];

            if (!isEmpty(parent[key])) break;
            delete parent[key];
          }
        }
        return hasFn;
      } },
    {
      key: '_addToOnceMap',
      value: function _addToOnceMap(keys, fn, handler) {
        var key = keys.join('-');
        var map = this.onceMap[key] = this.onceMap[key] || new _Map();
        if (!map.has(fn)) map.set(fn, []);
        var handlers = map.get(fn);
        // $FlowFixMe: flow do not understand map yet
        handlers.push(handler);
      } },
    {
      key: '_removeFromOnceMap',
      value: function _removeFromOnceMap(keys, fn, handler) {
        var key = keys.join('-');
        var map = this.onceMap[key];
        // do not need to check now
        // if(isVoid(map) || !map.has(fn)) return;
        var handlers = map.get(fn);
        var index$$1 = handlers.indexOf(handler);
        handlers.splice(index$$1, 1);
        if (isEmpty(handlers)) map.delete(fn);
      } },
    {
      key: '_getHandlerFromOnceMap',
      value: function _getHandlerFromOnceMap(keys, fn) {
        var key = keys.join('-');
        var map = this.onceMap[key];
        if (isVoid(map) || !map.has(fn)) return;
        var handlers = map.get(fn);
        return handlers[0];
      }
      /**
         * get event stage by evnet key name
         * @private
         * @param  {key} key event's name
         * @return {stage}  event stage
         */ },

    {
      key: '_getEventStage',
      value: function _getEventStage(key) {
        var secondaryCheck = key.match(secondaryReg);
        // $FlowFixMe: make sure it's event stage here
        var stage = secondaryCheck && secondaryCheck[0] || 'main';
        if (secondaryCheck) {
          key = camelize(key.replace(secondaryReg, ''));
        }
        return { stage: stage, key: key };
      }
      /**
         * get event handlers queue to run
         * @private
         * @param  {Object} handlerSet the object include all handler
         * @param  {Array} Array form of plugin id
         * @return {Array<Function>} event handler in queue to run
         */ },

    {
      key: '_getEventQueue',
      value: function _getEventQueue(handlerSet, order) {
        var _this3 = this;

        order = isArray(order) ? order.concat(['_vm']) : ['_vm'];
        return isEmpty(handlerSet) ? [] : order.reduce(function (queue, id) {
          if (isEmpty(handlerSet[id]) || !isArray(handlerSet[id]) ||
          // in case plugins is missed
          // _vm indicate the user. This is the function for user
          !_this3.__dispatcher.plugins[id] && id !== '_vm') {
            return queue;
          }
          return queue.concat(handlerSet[id].map(function (fn) {
            // bind context for plugin instance
            return bind(fn, _this3.__dispatcher.plugins[id] || _this3.__dispatcher.vm);
          }));
        }, []);
      }
      /**
         * event processor period. If event needs call kernel function.
         * I will called here.
         * If kernel will reponse. I will stop here.
         * Else I will trigger next period.
         * @param  {string}    key event's name
         * @param  {boolean}  options.sync we will take triggerSync if true, otherwise we will run trigger. default is false
         * @param  {anything} args
         * @return {Promise|undefined}
         */ },

    {
      key: '_eventProcessor',
      value: function _eventProcessor(key, _ref) {
        var sync = _ref.sync;

        var isKernelMethod = kernelMethods.indexOf(key) > -1;
        var isDomMethod = domMethods.indexOf(key) > -1;
        var isDispatcherMethod = dispatcherMethods.indexOf(key) > -1;

        for (var _len5 = arguments.length, args = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
          args[_key5 - 2] = arguments[_key5];
        }

        if (isKernelMethod || isDomMethod || isDispatcherMethod) {
          if (isDispatcherMethod) {
            var _dispatcher;

            (_dispatcher = this.__dispatcher)[key].apply(_dispatcher, _toConsumableArray(args));
          } else {
            var _dispatcher2;

            (_dispatcher2 = this.__dispatcher[isKernelMethod ? 'kernel' : 'dom'])[key].apply(_dispatcher2, _toConsumableArray(args));
          }
          if (videoEvents.indexOf(key) > -1 || domEvents.indexOf(key) > -1) return true;
        }
        // $FlowFixMe: flow do not support computed sytax on classs, but it's ok here
        return this[sync ? 'triggerSync' : 'trigger'].apply(this, [key].concat(_toConsumableArray(args)));
      }
      /**
         * run side effect period
         * @param  {string}    key event's name
         * @param  {args} args
         */ },

    {
      key: '_runSideEffectEvent',
      value: function _runSideEffectEvent(key, order) {
        for (var _len6 = arguments.length, args = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
          args[_key6 - 2] = arguments[_key6];
        }

        var event = this.events[key];
        if (isEmpty(event)) {
          return false;
        }
        var queue = this._getEventQueue(event._, order);
        queue.forEach(function (run) {
          return run.apply(undefined, _toConsumableArray(args));
        });
        return true;
      } }]);


    return Bus;
  }(), _applyDecoratedDescriptor$3(_class$4.prototype, 'emit', [_dec$4], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'emit'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, 'emitSync', [_dec2$3], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'emitSync'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, 'trigger', [_dec3$2], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'trigger'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, 'triggerSync', [_dec4$2], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'triggerSync'), _class$4.prototype), _class$4);

  var _dec$5, _dec2$4, _dec3$3, _dec4$3, _dec5$2, _dec6$2, _dec7$1, _dec8$1, _dec9$1, _dec10$1, _dec11$1, _class$5;

  function _applyDecoratedDescriptor$4(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var secondaryReg$1 = /^(before|after|_)/;

  /**
                                             * In logic before 0.10.0, we use 'c_' and 'w_' to mark event of container and wrapper
                                             * we need to keep that logic work until next major version.
                                             * @param {string} name 事件名字
                                             */
  function getEventTargetByOldLogic(oldName) {
    var targetKeyReg = new RegExp('^(c|w)_');
    var matches = oldName.match(targetKeyReg);
    if (matches) {
      var _name = oldName.replace(targetKeyReg, '');
      var _target = oldName.indexOf('c') === 0 ? 'container' : 'wrapper';
      return { name: _name, target: _target };
    } else if (oldName === 'error') {
      return { name: 'error', target: 'kernel' };
    }
    return false;
  }

  function getEventStage(name) {
    var matches = name.match(secondaryReg$1);
    // $FlowFixMe: We make sure it's event stage here
    var stage = matches && matches[0] || 'main';
    if (matches) {
      name = camelize(name.replace(secondaryReg$1, ''));
    }
    return { name: name, stage: stage };
  }

  function getEventTargetByEventName(name) {
    if (videoEvents.indexOf(name) > -1) return 'video';
    if (kernelEvents.indexOf(name) > -1) return 'kernel';
    if (domEvents.indexOf(name) > -1) return 'video-dom';
    if (esFullscreenEvents.indexOf(name) > -1) return 'esFullscreen';
    return 'plugin';
  }

  function getEventInfo(_ref) {
    var name = _ref.name,
    target = _ref.target,
    stage = _ref.stage;

    var oldInfo = getEventTargetByOldLogic(name);
    if (oldInfo) {
      name = oldInfo.name;
      target = oldInfo.target;
    }

    var _getEventStage = getEventStage(name),
    newStage = _getEventStage.stage,
    newName = _getEventStage.name;

    name = newName;

    if (!target) {
      target = getEventTargetByEventName(name);
    }

    return {
      name: name,
      stage: stage || newStage,
      target: target };

  }

  function prettifyEventParameter(info) {
    var id = info.id,
    fn = info.fn;

    var _getEventInfo = getEventInfo(info),
    name = _getEventInfo.name,
    target = _getEventInfo.target,
    stage = _getEventInfo.stage;

    if (!isFunction(fn)) {
      throw new Error('You must provide a function to handle with event ' + name + ', but not ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
    }
    return {
      id: id,
      fn: fn,
      name: name,
      target: target,
      stage: stage };

  }

  function isEventEmitalbe(_ref2) {
    var id = _ref2.id,
    name = _ref2.name;

    if (!name || !isString(name) || secondaryReg$1.test(name)) {
      Log.error('You must provide a legal event name, which is string and could not started with before/after/_');
      return false;
    }
    if (!id || !isString(id)) {
      Log.error('You must provide the id of emitter');
      return false;
    }
    return true;
  }

  function checkEventEmitParameter(info) {
    // $FlowFixMe: the info match requirement here
    info.target = getEventInfo(info).target;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return [info].concat(_toConsumableArray(args));
  }

  var Binder = (_dec$5 = before(prettifyEventParameter), _dec2$4 = before(prettifyEventParameter), _dec3$3 = before(prettifyEventParameter), _dec4$3 = runnable(isEventEmitalbe), _dec5$2 = before(checkEventEmitParameter), _dec6$2 = runnable(isEventEmitalbe, {
    backup: function backup() {
      return false;
    } }),
  _dec7$1 = before(checkEventEmitParameter), _dec8$1 = runnable(isEventEmitalbe), _dec9$1 = before(checkEventEmitParameter), _dec10$1 = runnable(isEventEmitalbe, {
    backup: function backup() {
      return false;
    } }),
  _dec11$1 = before(checkEventEmitParameter), _class$5 = function () {
    function Binder(dispatcher) {
      _classCallCheck(this, Binder);

      this.__dispatcher = dispatcher;
      this.kinds = ['kernel', 'container', 'wrapper', 'video', 'video-dom', 'plugin', 'esFullscreen'];
      this.buses = {};
      this.bindedEventNames = {};
      this.bindedEventInfo = {};
      this.pendingEventsInfo = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(this.kinds), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var kind = _step.value;

          this.bindedEventNames[kind] = [];
          this.bindedEventInfo[kind] = [];
          this.pendingEventsInfo[kind] = [];
          this.buses[kind] = new Bus(dispatcher, kind);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    _createClass(Binder, [{
      key: 'on',
      value: function on(_ref3) {
        var target = _ref3.target,
        id = _ref3.id,
        name = _ref3.name,
        fn = _ref3.fn,
        stage = _ref3.stage;

        this._addEventListenerOnTarget({
          name: name,
          target: target,
          id: id });

        return this.buses[target].on(id, name, fn, stage);
      } },
    {
      key: 'off',
      value: function off(_ref4) {
        var target = _ref4.target,
        id = _ref4.id,
        name = _ref4.name,
        fn = _ref4.fn,
        stage = _ref4.stage;

        var ret = this.buses[target].off(id, name, fn, stage);
        this._removeEventListenerOnTargetWhenIsUseless({ name: name, target: target });
        return ret;
      } },
    {
      key: 'once',
      value: function once(_ref5) {
        var target = _ref5.target,
        id = _ref5.id,
        name = _ref5.name,
        fn = _ref5.fn,
        stage = _ref5.stage;

        return this.buses[target].once(id, name, fn, stage);
      } },
    {
      key: 'emit',
      value: function emit(_ref6) {
        var _buses$target;

        var target = _ref6.target,
        name = _ref6.name;

        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return (_buses$target = this.buses[target]).emit.apply(_buses$target, [name].concat(_toConsumableArray(args)));
      } },
    {
      key: 'emitSync',
      value: function emitSync(_ref7) {
        var _buses$target2;

        var target = _ref7.target,
        name = _ref7.name;

        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return (_buses$target2 = this.buses[target]).emitSync.apply(_buses$target2, [name].concat(_toConsumableArray(args)));
      } },
    {
      key: 'trigger',
      value: function trigger(_ref8) {
        var _buses$target3;

        var target = _ref8.target,
        name = _ref8.name;

        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        return (_buses$target3 = this.buses[target]).trigger.apply(_buses$target3, [name].concat(_toConsumableArray(args)));
      } },
    {
      key: 'triggerSync',
      value: function triggerSync(_ref9) {
        var _buses$target4;

        var target = _ref9.target,
        name = _ref9.name;

        for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }

        return (_buses$target4 = this.buses[target]).triggerSync.apply(_buses$target4, [name].concat(_toConsumableArray(args)));
      }

      // when we create a penetrate plugin, we need to rebind video events on it
    },
    {
      key: 'bindEventOnPenetrateNode',
      value: function bindEventOnPenetrateNode(node) {
        var _this = this;

        var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        this.bindedEventInfo['video-dom'].forEach(function (_ref10) {
          var _ref11 = _slicedToArray(_ref10, 2),
          name = _ref11[0],
          fn = _ref11[1];

          remove ? removeEvent(node, name, fn) : _this._addEventOnDom(node, name, fn);
        });
      }

      // when we switch kernel, we will create a new video.
      // we need to transfer the event from the oldvideo to it.
    },
    {
      key: 'bindEventOnVideo',
      value: function bindEventOnVideo(node) {
        var _this2 = this;

        var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        this.bindedEventInfo['video-dom'].concat(this.bindedEventInfo.video).forEach(function (_ref12) {
          var _ref13 = _slicedToArray(_ref12, 2),
          name = _ref13[0],
          fn = _ref13[1];

          remove ? removeEvent(node, name, fn) : _this2._addEventOnDom(node, name, fn);
        });
      }

      // As penetrate plugin is considered to be part of video
      // we need to transfer event for it
      // so we need some specail event handler
    },
    {
      key: 'listenOnMouseMoveEvent',
      value: function listenOnMouseMoveEvent(node) {
        var _this3 = this;

        var dom = this.__dispatcher.dom;
        var target = 'video-dom';
        var id = '_vm';
        mustListenVideoDomEvents.forEach(function (name) {
          var fn = function fn() {
            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
              args[_key6] = arguments[_key6];
            }

            var _args$ = args[0],
            toElement = _args$.toElement,
            currentTarget = _args$.currentTarget,
            relatedTarget = _args$.relatedTarget,
            type = _args$.type;

            var to = toElement || relatedTarget;
            // As we support penetrate plugin, the video dom event may be differnet.
            if (dom.mouseInVideo && type === 'mouseleave' && !dom.isNodeInsideVideo(to)) {
              dom.mouseInVideo = false;
              return _this3.triggerSync.apply(_this3, [{
                target: target,
                name: name,
                id: id }].
              concat(args));
            }
            if (!dom.mouseInVideo && type === 'mouseenter' && dom.isNodeInsideVideo(currentTarget)) {
              dom.mouseInVideo = true;
              return _this3.triggerSync.apply(_this3, [{
                target: target,
                name: name,
                id: id }].
              concat(args));
            }
          };
          _this3._addEventOnDom(node, name, fn);
          // this function is only used once now
          // so we do not cover this branch
          // but we still keep this judegement
          /* istanbul ignore else  */
          if (_this3.bindedEventNames[target].indexOf(name) < 0) {
            _this3.bindedEventNames[target].push(name);
            // $FlowFixMe: fn must be function now
            _this3.bindedEventInfo[target].push([name, fn]);
          }
        });
      }

      // When we switch kernel, we need to rebind the events
    },
    {
      key: 'migrateKernelEvent',
      value: function migrateKernelEvent(oldKernel, newKernel) {
        var bindedEventInfoList = this.bindedEventInfo.kernel;
        bindedEventInfoList.forEach(function (_ref14) {
          var _ref15 = _slicedToArray(_ref14, 2),
          name = _ref15[0],
          fn = _ref15[1];

          oldKernel.off(name, fn);
          newKernel.on(name, fn);
        });
      }

      // when we destroy, we remove all binder
    },
    {
      key: 'destroy',
      value: function destroy() {
        var _this4 = this;

        this.kinds.forEach(function (target) {
          if (target === 'kernel') {
            _this4.bindedEventInfo.kernel.forEach(function (_ref16) {
              var _ref17 = _slicedToArray(_ref16, 2),
              name = _ref17[0],
              fn = _ref17[1];

              _this4.__dispatcher.kernel.off(name, fn);
            });
          } else {
            var targetDom = _this4._getTargetDom(target);
            _this4.bindedEventInfo[target].forEach(function (_ref18) {
              var _ref19 = _slicedToArray(_ref18, 2),
              name = _ref19[0],
              fn = _ref19[1];

              removeEvent(targetDom, name, fn);

              if (target === 'video-dom') {
                _this4.__dispatcher.dom.videoExtendedNodes.forEach(function (node) {
                  return removeEvent(node, name, fn);
                });
              }
            });
          }
          _this4.bindedEventInfo.kernel = [];
          _this4.bindedEventNames.kernel = [];
        });
      } },
    {
      key: '_addEventOnDom',
      value: function _addEventOnDom(element, key, fn) {
        if (passiveEvents.indexOf(key) > -1) {
          return addEvent(element, key, fn, false, { passive: true });
        }
        addEvent(element, key, fn);
      }

      // Some event needs us to transfer it from the real target
      // such as dom event
    },
    {
      key: '_addEventListenerOnTarget',
      value: function _addEventListenerOnTarget(_ref20) {
        var _this5 = this;

        var name = _ref20.name,
        target = _ref20.target,
        id = _ref20.id;

        if (!this._isEventNeedToBeHandled(target, name)) return;
        var fn = void 0;
        // if this event has been binded, return;
        if (this.bindedEventNames[target].indexOf(name) > -1) return;
        var targetDom = this._getTargetDom(target);
        // choose the correspond method to bind
        if (target === 'kernel') {
          if (!this.__dispatcher.kernel) {
            this.addPendingEvent(target, name, id);
            return;
          }
          fn = function fn() {
            for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
              args[_key7] = arguments[_key7];
            }

            return _this5.triggerSync.apply(_this5, [{ target: target, name: name, id: 'kernel' }].concat(args));
          };
          this.__dispatcher.kernel.on(name, fn);
        } else if (target === 'container' || target === 'wrapper') {
          fn = function fn() {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
              args[_key8] = arguments[_key8];
            }

            return _this5.triggerSync.apply(_this5, [{ target: target, name: name, id: target }].concat(args));
          };
          this._addEventOnDom(targetDom, name, fn);
        } else if (target === 'video') {
          fn = function fn() {
            for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
              args[_key9] = arguments[_key9];
            }

            return _this5.trigger.apply(_this5, [{ target: target, name: name, id: target }].concat(args));
          };
          this._addEventOnDom(targetDom, name, fn);
        } else if (target === 'video-dom') {
          fn = function fn() {
            for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
              args[_key10] = arguments[_key10];
            }

            return _this5.triggerSync.apply(_this5, [{ target: target, name: name, id: target }].concat(args));
          };
          this.__dispatcher.dom.videoExtendedNodes.forEach(function (node) {
            return _this5._addEventOnDom(node, name, fn);
          });
          this._addEventOnDom(targetDom, name, fn);
        }
        this.bindedEventNames[target].push(name);
        // $FlowFixMe: fn must be function now
        this.bindedEventInfo[target].push([name, fn]);
      }

      // when we off one event, we can remove the useless binder
      // actually we should remove on once event too
      // but it seems ugliy
      // TODO: add this function on once event too
    },
    {
      key: '_removeEventListenerOnTargetWhenIsUseless',
      value: function _removeEventListenerOnTargetWhenIsUseless(_ref21) {
        var name = _ref21.name,
        target = _ref21.target;

        if (!this._isEventNeedToBeHandled(target, name)) return;
        var eventNamesList = this.bindedEventNames[target];
        var nameIndex = eventNamesList.indexOf(name);
        // if we have not bind this event before, we omit it
        if (nameIndex < 0) return;
        // if the buses still have another function on bind, we do not need to remove the binder
        if (!isEmpty(this.buses[target].events[name])) return;

        // we fetch the binded function from bindedEventInfo
        var bindedEventInfoList = this.bindedEventInfo[target];
        var fn = void 0;
        var index$$1 = void 0;
        for (index$$1 = 0; index$$1 < bindedEventInfoList.length; index$$1++) {
          if (bindedEventInfoList[index$$1][0] === name) {
            fn = bindedEventInfoList[index$$1][1];
            break;
          }
        }
        if (!isFunction(fn)) return;

        if (target === 'kernel') {
          this.__dispatcher.kernel.off(name, fn);
        } else {
          var targetDom = this._getTargetDom(target);

          removeEvent(targetDom, name, fn);

          // When we remove something on video dom, we also need to remove event on penetrate plugin
          if (target === 'video-dom') {
            this.__dispatcher.dom.videoExtendedNodes.forEach(function (node) {
              // $FlowFixMe: fn is function now
              removeEvent(node, name, fn);
            });
          }
        }

        bindedEventInfoList.splice(index$$1, 1);
        eventNamesList.splice(nameIndex, 1);
      } },
    {
      key: '_getTargetDom',
      value: function _getTargetDom(target) {
        var targetDom = void 0;
        switch (target) {
          case 'container':
          case 'wrapper':
            // $FlowFixMe: fix dom index bug
            targetDom = this.__dispatcher.dom[target];
            break;
          default:
            targetDom = this.__dispatcher.dom.videoElement;
            break;}

        return targetDom;
      } },
    {
      key: '_isEventNeedToBeHandled',
      value: function _isEventNeedToBeHandled(target, name) {
        // the plugin target do not need us to transfer
        // we have listened on esFullscreen in dom
        // we have listened mustListenVideoDomEvents
        // so the events above do not need to rebind
        return target !== 'plugin' && target !== 'esFullscreen' && (mustListenVideoDomEvents.indexOf(name) < 0 || target !== 'video');
      } },
    {
      key: 'addPendingEvent',
      value: function addPendingEvent(target, name, id) {
        this.pendingEventsInfo[target].push([name, id]);
      } },
    {
      key: 'applyPendingEvents',
      value: function applyPendingEvents(target) {
        var pendingEvents = this.pendingEventsInfo[target];
        var pendingEventsCopy = pendingEvents.splice(0, pendingEvents.length);
        while (pendingEventsCopy.length) {
          var _pendingEventsCopy$po = pendingEventsCopy.pop(),
          _pendingEventsCopy$po2 = _slicedToArray(_pendingEventsCopy$po, 2),
          _name2 = _pendingEventsCopy$po2[0],
          id = _pendingEventsCopy$po2[1];

          this._addEventListenerOnTarget({ name: _name2, target: target, id: id });
        }
      } }]);


    return Binder;
  }(), _applyDecoratedDescriptor$4(_class$5.prototype, 'on', [_dec$5], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'on'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'off', [_dec2$4], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'off'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'once', [_dec3$3], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'once'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'emit', [_dec4$3, _dec5$2], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'emit'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'emitSync', [_dec6$2, _dec7$1], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'emitSync'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'trigger', [_dec8$1, _dec9$1], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'trigger'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'triggerSync', [_dec10$1, _dec11$1], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'triggerSync'), _class$5.prototype), _class$5);

  var _dec$6, _dec2$5, _dec3$4, _dec4$4, _dec5$3, _class$6;

  function _applyDecoratedDescriptor$5(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }
  var pluginConfigSet = {};
  var kernelsSet = {};
  function convertNameIntoId(name) {
    if (!isString(name)) throw new Error('Plugin\'s name must be a string, but not "' + name + '" in ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
    return camelize(name);
  }
  function checkPluginConfig(config) {
    if (isFunction(config)) {
      if (!(config.prototype instanceof Plugin)) {
        throw new TypeError('Your are trying to install plugin ' + config.name + ', but it\'s not extends from Chimee.plugin.');
      }
      return;
    }
    if (!isObject(config) || isEmpty(config)) throw new TypeError('plugin\'s config must be an Object, but not "' + config + '" in ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
    var name = config.name;

    if (!isString(name) || name.length < 1) throw new TypeError('plugin must have a legal namea, but not "' + name + '" in ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
  }
  /**
     * <pre>
     * Dispatcher is the hub of plugins, user, and video kernel.
     * It take charge of plugins install, use and remove
     * It also offer a bridge to let user handle video kernel.
     * </pre>
     */
  var Dispatcher = (_dec$6 = before(convertNameIntoId), _dec2$5 = before(checkPluginConfig), _dec3$4 = before(convertNameIntoId), _dec4$4 = before(convertNameIntoId), _dec5$3 = before(convertNameIntoId), _class$6 = function () {
    /**
                                                                                                                                                                                                                                     * @param  {UserConfig} config UserConfig for whole Chimee player
                                                                                                                                                                                                                                     * @param  {Chimee} vm referrence of outer class
                                                                                                                                                                                                                                     * @return {Dispatcher}
                                                                                                                                                                                                                                     */

    /**
                                                                                                                                                                                                                                         * the synchronous ready flag
                                                                                                                                                                                                                                         * @type {boolean}
                                                                                                                                                                                                                                         * @member readySync
                                                                                                                                                                                                                                         */

    /**
                                                                                                                                                                                                                                             * all plugins instance set
                                                                                                                                                                                                                                             * @type {Object}
                                                                                                                                                                                                                                             * @member plugins
                                                                                                                                                                                                                                             */
    function Dispatcher(config, vm) {
      var _this = this;

      _classCallCheck(this, Dispatcher);

      this.plugins = {};
      this.order = [];
      this.readySync = false;
      this.zIndexMap = {
        inner: [],
        outer: [] };

      this.changeWatchable = true;
      this.kernelEventHandlerList = [];

      if (!isObject(config)) throw new TypeError('UserConfig must be an Object, but not "' + config + '" in ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
      /**
                                                                                                                                                                                   * dom Manager
                                                                                                                                                                                   * @type {Dom}
                                                                                                                                                                                   */
      this.dom = new Dom(config, this);
      /**
                                         * Chimee's referrence
                                         * @type {[type]}
                                         */
      this.vm = vm;
      /**
                     * tell user have Chimee installed finished
                     * @type {Promises}
                     */
      this.videoConfigReady = false;
      // create the videoconfig
      this.videoConfig = new VideoConfig(this, config);
      // support both plugin and plugins here as people often cofuse both
      // $FlowFixMe: we support plugins here, which should be illegal
      if (isArray(config.plugins) && !isArray(config.plugin)) {
        config.plugin = config.plugins;
        delete config.plugins;
      }
      this.binder = new Binder(this);
      this.binder.listenOnMouseMoveEvent(this.dom.videoElement);
      // use the plugin user want to use
      this._initUserPlugin(config.plugin);
      // add default config for container
      var containerConfig = deepAssign({}, defaultContainerConfig, config.container || {});
      // trigger the init life hook of plugin
      this.order.forEach(function (key) {
        return _this.plugins[key].__init(_this.videoConfig, containerConfig);
      });
      this.videoConfigReady = true;
      this.videoConfig.init();
      this.containerConfig = new Vessel(this, 'container', containerConfig);
      /**
                                                                              * video kernel
                                                                              * @type {Kernel}
                                                                              */
      this.kernel = this._createKernel(this.dom.videoElement, this.videoConfig);
      this.binder.applyPendingEvents('kernel');
      if (config.noDefaultContextMenu) {
        var noDefaultContextMenu = config.noDefaultContextMenu;

        var target = noDefaultContextMenu === 'container' || noDefaultContextMenu === 'wrapper' ? noDefaultContextMenu : 'video-dom';
        this.binder.on({
          target: target,
          id: '_vm',
          name: 'contextmenu',
          fn: function fn(evt) {
            return evt.preventDefault();
          },
          stage: 'main' });

      }
      // trigger auto load event
      var asyncInitedTasks = [];
      this.order.forEach(function (key) {
        var ready = _this.plugins[key].__inited();
        if (isPromise(ready)) {
          asyncInitedTasks.push(ready);
        }
      });
      this.readySync = asyncInitedTasks.length === 0;
      // tell them we have inited the whold player
      this.ready = this.readySync ? _Promise.resolve() : _Promise.all(asyncInitedTasks).then(function () {
        _this.readySync = true;
        _this.onReady();
      });
      if (this.readySync) this.onReady();
    }
    // to save the kernel event handler, so that we can remove it when we destroy the kernel

    /**
     * the z-index map of the dom, it contain some important infomation
     * @type {Object}
     * @member zIndexMap
     */

    /**
         * plugin's order
         * @type {Array<string>}
         * @member order
         */


    _createClass(Dispatcher, [{
      key: 'onReady',
      value: function onReady() {
        this.binder.trigger({
          target: 'plugin',
          name: 'ready',
          id: 'dispatcher' });

        this._autoloadVideoSrcAtFirst();
      }

      /**
         * use a plugin, which means we will new a plugin instance and include int this Chimee instance
         * @param  {Object|string} option you can just set a plugin name or plugin config
         * @return {Promise}
         */ },

    {
      key: 'use',
      value: function use(option) {
        if (isString(option)) option = { name: option, alias: undefined };
        if (!isObject(option) || isObject(option) && !isString(option.name)) {
          throw new TypeError('pluginConfig do not match requirement');
        }
        if (!isString(option.alias)) option.alias = undefined;
        var _option = option,
        name = _option.name,
        alias$$1 = _option.alias;

        option.name = alias$$1 || name;
        delete option.alias;
        var key = camelize(name);
        var id = camelize(alias$$1 || name);
        var pluginOption = option;
        var pluginConfig = Dispatcher.getPluginConfig(key);
        if (isEmpty(pluginConfig)) throw new TypeError('You have not installed plugin ' + key);
        if (isObject(pluginConfig)) {
          pluginConfig.id = id;
        }
        var plugin = isFunction(pluginConfig) ? new pluginConfig({ id: id }, this, pluginOption) // eslint-disable-line 
        : new Plugin(pluginConfig, this, pluginOption);
        this.plugins[id] = plugin;
        _Object$defineProperty(this.vm, id, {
          value: plugin,
          configurable: true,
          enumerable: false,
          writable: false });

        this.order.push(id);
        this._sortZIndex();
        if (this.videoConfigReady) plugin.__inited();
        return plugin.ready;
      }

      /**
         * unuse an plugin, we will destroy the plugin instance and exlude it
         * @param  {string} name plugin's name
         */ },

    {
      key: 'unuse',
      value: function unuse(id) {
        var plugin = this.plugins[id];
        if (!isObject(plugin) || !isFunction(plugin.$destroy)) {
          delete this.plugins[id];
          return;
        }
        plugin.$destroy();
        var orderIndex = this.order.indexOf(id);
        if (orderIndex > -1) {
          this.order.splice(orderIndex, 1);
        }
        delete this.plugins[id];
        delete this.vm[id];
      } },
    {
      key: 'throwError',
      value: function throwError(error) {
        this.vm.__throwError(error);
      } },
    {
      key: 'silentLoad',
      value: function silentLoad(src) {
        var _this2 = this;

        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _option$duration = option.duration,
        duration = _option$duration === undefined ? 3 : _option$duration,
        _option$bias = option.bias,
        bias = _option$bias === undefined ? 0 : _option$bias,
        _option$repeatTimes = option.repeatTimes,
        repeatTimes = _option$repeatTimes === undefined ? 0 : _option$repeatTimes,
        _option$increment = option.increment,
        increment = _option$increment === undefined ? 0 : _option$increment,
        _option$isLive = option.isLive,
        isLive = _option$isLive === undefined ? this.videoConfig.isLive : _option$isLive,
        _option$box = option.box,
        box = _option$box === undefined ? this.videoConfig.box : _option$box,
        _option$kernels = option.kernels,
        kernels = _option$kernels === undefined ? this.videoConfig.kernels : _option$kernels,
        _option$preset = option.preset,
        preset = _option$preset === undefined ? this.videoConfig.preset : _option$preset;
        // all live stream seem as immediate mode
        // it's impossible to seek on live stream

        var immediate = option.immediate || isLive;
        // form the base config for kernel
        // it should be the same as the config now
        var config = { isLive: isLive, box: box, src: src, kernels: kernels, preset: preset };
        // build tasks accroding repeat times
        var tasks = new Array(repeatTimes + 1).fill(1).map(function (value, index$$1) {
          return function () {
            return new _Promise(function (resolve, reject) {
              // if abort, give up and reject
              if (option.abort) reject({ error: true, message: 'user abort the mission' });
              var video = document.createElement('video');
              var idealTime = _this2.kernel.currentTime + duration + increment * index$$1;
              video.muted = true;
              var newVideoReady = false;
              var kernel = void 0;
              var _videoError = void 0;
              var videoCanplay = void 0;
              var videoLoadedmetadata = void 0;
              // bind time update on old video
              // when we bump into the switch point and ready
              // we switch
              var oldVideoTimeupdate = function oldVideoTimeupdate() {
                var currentTime = _this2.kernel.currentTime;
                if (bias <= 0 && currentTime >= idealTime || bias > 0 && (Math.abs(idealTime - currentTime) <= bias && newVideoReady || currentTime - idealTime > bias)) {
                  removeEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
                  removeEvent(video, 'error', _videoError, true);
                  if (!newVideoReady) {
                    removeEvent(video, 'canplay', videoCanplay, true);
                    removeEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
                    kernel.destroy();
                    return resolve();
                  }
                  return reject({
                    error: false,
                    video: video,
                    kernel: kernel });

                }
              };
              videoCanplay = function videoCanplay() {
                newVideoReady = true;
                // you can set it immediately run by yourself
                if (immediate) {
                  removeEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
                  removeEvent(video, 'error', _videoError, true);
                  return reject({
                    error: false,
                    video: video,
                    kernel: kernel });

                }
              };
              videoLoadedmetadata = function videoLoadedmetadata() {
                if (!isLive) {
                  kernel.seek(immediate ? _this2.kernel.currentTime : idealTime);
                }
              };
              _videoError = function videoError(evt) {
                removeEvent(video, 'canplay', videoCanplay, true);
                removeEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
                removeEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
                kernel.off('error', _videoError);
                var error = void 0;
                if (!isEmpty(evt.data) && evt.data.errmsg) {
                  var errmsg = evt.data.errmsg;

                  Log.error("chimee's silentload bump into a kernel error", errmsg);
                  error = new Error(errmsg);
                } else {
                  error = !isEmpty(video.error) ? new Error(video.error.message) : new Error('unknow video error');
                  Log.error("chimee's silentload", error.message);
                }
                kernel.destroy();
                _this2._silentLoadTempKernel = undefined;
                return index$$1 === repeatTimes ? reject(error) : resolve(error);
              };
              addEvent(video, 'canplay', videoCanplay, true);
              addEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
              addEvent(video, 'error', _videoError, true);
              kernel = _this2._createKernel(video, config);
              _this2._silentLoadTempKernel = kernel;
              kernel.on('error', _videoError);
              addEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
              kernel.load();
            });
          };
        });
        return runRejectableQueue(tasks).then(function () {
          var message = 'The silentLoad for ' + src + ' timed out. Please set a longer duration or check your network';
          return _Promise.reject(new Error(message));
        }).catch(function (data) {
          if (isError(data)) {
            return _Promise.reject(data);
          }
          if (data.error) {
            return _Promise.reject(new Error(data.message));
          }
          var video = data.video,
          kernel = data.kernel;

          if (option.abort) {
            kernel.destroy();
            return _Promise.reject(new Error('user abort the mission'));
          }
          var paused = _this2.dom.videoElement.paused;
          if (paused) {
            _this2.switchKernel({ video: video, kernel: kernel, config: config });
            return _Promise.resolve();
          }
          return new _Promise(function (resolve) {
            addEvent(video, 'play', function () {
              _this2.switchKernel({ video: video, kernel: kernel, config: config });
              resolve();
            }, true);
            video.play();
          });
        });
      } },
    {
      key: 'load',
      value: function load(srcOrOption) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var src = isString(srcOrOption) ? srcOrOption : isObject(srcOrOption) && isString(srcOrOption.src) ? srcOrOption.src
        // give a chance for user to clear the src
        : '';
        if (isObject(srcOrOption)) {
          delete srcOrOption.src;
          option = srcOrOption;
        }
        var oldBox = this.kernel.box;
        var videoConfig = this.videoConfig;
        var _option2 = option,
        _option2$isLive = _option2.isLive,
        isLive = _option2$isLive === undefined ? videoConfig.isLive : _option2$isLive,
        _option2$box = _option2.box,
        box = _option2$box === undefined ? getLegalBox({ src: src, box: videoConfig.box }) : _option2$box,
        _option2$preset = _option2.preset,
        preset = _option2$preset === undefined ? videoConfig.preset : _option2$preset,
        _option2$kernels = _option2.kernels,
        kernels = _option2$kernels === undefined ? videoConfig.kernels : _option2$kernels;

        if (box !== 'native' || box !== oldBox || !isEmpty(option)) {
          var video = document.createElement('video');
          var config = { isLive: isLive, box: box, preset: preset, src: src, kernels: kernels };
          var kernel = this._createKernel(video, config);
          this.switchKernel({ video: video, kernel: kernel, config: config, notifyChange: true });
        }
        var originAutoLoad = this.videoConfig.autoload;
        this._changeUnwatchable(this.videoConfig, 'autoload', false);
        this.videoConfig.src = src || this.videoConfig.src;
        this.kernel.load(this.videoConfig.src);
        this._changeUnwatchable(this.videoConfig, 'autoload', originAutoLoad);
      } },
    {
      key: 'switchKernel',
      value: function switchKernel(_ref) {
        var _this3 = this;

        var video = _ref.video,
        kernel = _ref.kernel,
        config = _ref.config,
        notifyChange = _ref.notifyChange;

        var oldKernel = this.kernel;
        var originVideoConfig = deepClone(this.videoConfig);
        this.dom.migrateVideoRequiredGuardedAttributes(video);
        this.dom.removeVideo();
        this.dom.installVideo(video);
        // as we will reset the currentVideoConfig on the new video
        // it will trigger the watch function as they maybe differnet
        // because video config will return the real situation
        // so we need to stop them
        this.videoConfig.changeWatchable = false;
        this.videoConfig.autoload = false;
        this.videoConfig.src = config.src;
        this.videoConfig._realDomAttr.forEach(function (key) {
          // $FlowFixMe: support computed key here
          if (key !== 'src') _this3.videoConfig[key] = originVideoConfig[key];
        });
        this.videoConfig.changeWatchable = true;
        this.binder.migrateKernelEvent(oldKernel, kernel);
        this.kernel = kernel;
        this._silentLoadTempKernel = undefined;
        var isLive = config.isLive,
        box = config.box,
        preset = config.preset,
        kernels = config.kernels;

        _Object$assign(this.videoConfig, { isLive: isLive, box: box, preset: preset, kernels: kernels });
        oldKernel.destroy();
        // delay video event binding
        // so that people can't feel the default value change
        // unless it's caused by autoload
        if (notifyChange) {
          this.binder && this.binder.bindEventOnVideo && this.binder.bindEventOnVideo(video);
        } else {
          setTimeout(function () {
            _this3.binder && _this3.binder.bindEventOnVideo && _this3.binder.bindEventOnVideo(video);
          });
        }
      }

      /**
         * destroy function called when dispatcher destroyed
         */ },

    {
      key: 'destroy',
      value: function destroy() {
        for (var _key in this.plugins) {
          this.unuse(_key);
        }
        this.binder.destroy();
        delete this.binder;
        this.dom.destroy();
        delete this.dom;
        this.kernel.destroy();
        delete this.kernel;
        delete this.vm;
        delete this.plugins;
        delete this.order;
      }

      /**
         * use a set of plugin
         * @param  {Array<UserPluginConfig>}  configs  a set of plugin config
         * @return {Array<Promise>}   a set of Promise indicate the plugin install stage
         */ },

    {
      key: '_initUserPlugin',
      value: function _initUserPlugin() {
        var _this4 = this;

        var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (!isArray(configs)) {
          configs = [];
        }
        return configs.map(function (config) {
          return _this4.use(config);
        });
      }

      /**
         * sort zIndex of plugins to make plugin display in order
         */ },

    {
      key: '_sortZIndex',
      value: function _sortZIndex() {
        var _this5 = this;

        var _order$reduce = this.order.reduce(function (levelSet, key) {
          var plugin = _this5.plugins[key];
          if (isEmpty(plugin)) return levelSet;
          var set = levelSet[plugin.$inner ? 'inner' : 'outer'];
          var level = plugin.$level;
          set[level] = set[level] || [];
          set[level].push(key);
          return levelSet;
        }, { inner: {}, outer: {} }),
        inner = _order$reduce.inner,
        outer = _order$reduce.outer;

        inner[0] = inner[0] || [];
        inner[0].unshift('videoElement');
        outer[0] = outer[0] || [];
        outer[0].unshift('container');
        var innerOrderArr = transObjectAttrIntoArray(inner);
        var outerOrderArr = transObjectAttrIntoArray(outer);
        this.dom.setPluginsZIndex(innerOrderArr);
        this.dom.setPluginsZIndex(outerOrderArr);
        this.zIndexMap.inner = innerOrderArr;
        this.zIndexMap.outer = outerOrderArr;
      }

      /**
         * get the top element's level
         * @param {boolean} inner get the inner array or the outer array
         */ },

    {
      key: '_getTopLevel',
      value: function _getTopLevel(inner) {
        var arr = this.zIndexMap[inner ? 'inner' : 'outer'];
        var plugin = this.plugins[arr[arr.length - 1]];
        return isEmpty(plugin) ? 0 : plugin.$level;
      } },
    {
      key: '_autoloadVideoSrcAtFirst',
      value: function _autoloadVideoSrcAtFirst() {
        if (this.videoConfig.autoload) {
          if ( true && !this.videoConfig.src) {
            Log.warn('You have not set the src, so you better set autoload to be false. Accroding to https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md#src.');
            return;
          }
          this.binder.emit({
            name: 'load',
            target: 'plugin',
            id: 'dispatcher' },
          { src: this.videoConfig.src });
        }
      } },
    {
      key: '_changeUnwatchable',
      value: function _changeUnwatchable(object, property, value) {
        this.changeWatchable = false;
        object[property] = value;
        this.changeWatchable = true;
      } },
    {
      key: '_createKernel',
      value: function _createKernel(video, config) {
        var kernels = config.kernels,
        preset = config.preset;
        var presetConfig = {};
        var newPreset = {};
        if (isArray(kernels)) {
          // SKC means SingleKernelConfig
          newPreset = kernels.reduce(function (kernels, keyOrSKC) {
            // if it is a string key, it means the kernel has been pre installed.
            if (isString(keyOrSKC)) {
              var kernelFn = kernelsSet[keyOrSKC];
              if (!isFunction(kernelFn)) {
                Log.warn('You have not installed kernel for ' + keyOrSKC + '.');
                return kernels;
              }
              kernels[keyOrSKC] = kernelFn;
              return kernels;
            }
            // if it is a SingleKernelConfig, it means user may pass in some config here
            // so we need to extract the handler
            // get the name of the handler
            // and collect the config for the handler
            if (isObject(keyOrSKC)) {
              var name = keyOrSKC.name,
              handler = keyOrSKC.handler;
              // if the handler is a pure string, it means the kernel has been pre installed

              if (isString(handler)) {
                var _kernelFn = kernelsSet[handler];
                if (!isFunction(_kernelFn)) {
                  Log.warn('You have not installed kernel for ' + handler + '.');
                  return kernels;
                }
                kernels[handler] = _kernelFn;
                presetConfig[handler] = keyOrSKC;
                return kernels;
              }
              // if the handler is a function, it means that the user pass in the kernel directly
              // if the provide name, we use it as kernel name
              // if they do not provide name, we just use the function's name
              if (isFunction(handler)) {
                var kernelName = name || handler.name;
                kernels[kernelName] = handler;
                presetConfig[kernelName] = keyOrSKC;
                return kernels;
              }
              Log.warn('When you pass in an SingleKernelConfig in Array, you must clarify it\'s handler, we only support handler in string or function but not ' + (typeof handler === 'undefined' ? 'undefined' : _typeof(handler)));
              return kernels;
            }
            Log.warn('If you pass in kernels as array, you must pass in kernels in string or function, but not ' + (typeof keyOrSKC === 'undefined' ? 'undefined' : _typeof(keyOrSKC)));
            return kernels;
          }, {});
        }

        if (isObject(kernels)) {
          // SKC means SingleKernelConfig
          _Object$keys(kernels).forEach(function (key) {
            var fnOrSKC = kernels[key];
            // if it's a function, means we need to do nothing
            if (isFunction(fnOrSKC)) {
              newPreset[key] = fnOrSKC;
              return;
            }
            if (isObject(fnOrSKC)) {
              var handler = fnOrSKC.handler;
              // if handler is an string, it means user has pre install it

              if (isString(handler)) {
                var kernelFn = kernelsSet[handler];
                if (!isFunction(kernelFn)) {
                  Log.warn('You have not installed kernel for ' + handler + '.');
                  return;
                }
                newPreset[key] = kernelFn;
                presetConfig[key] = fnOrSKC;
                return;
              }
              if (isFunction(handler)) {
                newPreset[key] = handler;
                presetConfig[key] = fnOrSKC;
                return;
              }
              Log.warn('When you pass in an SingleKernelConfig in Object, you must clarify it\'s handler, we only support handler in string or function but not ' + (typeof handler === 'undefined' ? 'undefined' : _typeof(handler)));
              return;
            }
            Log.warn('If you pass in kernels as object, you must pass in kernels in string or function, but not ' + (typeof fnOrSKC === 'undefined' ? 'undefined' : _typeof(fnOrSKC)));
            return kernels;
          });
        }
        config.preset = _Object$assign(newPreset, preset);
        config.presetConfig = presetConfig;
        var kernel = new ChimeeKernel(video, config);
        return kernel;
      }
      /**
         * static method to install plugin
         * we will store the plugin config
         * @type {string} plugin's id
         */ }],

    [{
      key: 'install',
      value: function install(config) {
        var name = config.name;

        var id = camelize(name);
        if (!isEmpty(pluginConfigSet[id])) {
        }
        var pluginConfig = isFunction(config) ? config : deepAssign({ id: id }, config);
        pluginConfigSet[id] = pluginConfig;
        return id;
      } },
    {
      key: 'hasInstalled',
      value: function hasInstalled(id) {
        return !isEmpty(pluginConfigSet[id]);
      } },
    {
      key: 'uninstall',
      value: function uninstall(id) {
        delete pluginConfigSet[id];
      }
      /**
         * get Plugin config based on plugin's id
         * @type {[type]}
         */ },

    {
      key: 'getPluginConfig',
      value: function getPluginConfig(id) {
        return pluginConfigSet[id];
      } },
    {
      key: 'installKernel',
      value: function installKernel(key, value) {
        var tasks = isObject(key) ? _Object$entries(key) : [[key, value]];
        tasks.forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

          if (!isFunction(value)) throw new Error('The kernel you install on ' + key + ' must be a Function, but not ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
          if (isFunction(kernelsSet[key])) Log.warn('You have alrady install a kernel on ' + key + ', and now we will replace it');
          kernelsSet[key] = value;
        });
      }

      // only use for debug in internal
    },
    {
      key: 'uninstallKernel',
      value: function uninstallKernel(key) {
        delete kernelsSet[key];
      } },
    {
      key: 'hasInstalledKernel',
      value: function hasInstalledKernel(key) {
        return isFunction(kernelsSet[key]);
      } }]);


    return Dispatcher;
  }(), _applyDecoratedDescriptor$5(_class$6.prototype, 'unuse', [_dec$6], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'unuse'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'throwError', [autobind], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'throwError'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6, 'install', [_dec2$5], _Object$getOwnPropertyDescriptor(_class$6, 'install'), _class$6), _applyDecoratedDescriptor$5(_class$6, 'hasInstalled', [_dec3$4], _Object$getOwnPropertyDescriptor(_class$6, 'hasInstalled'), _class$6), _applyDecoratedDescriptor$5(_class$6, 'uninstall', [_dec4$4], _Object$getOwnPropertyDescriptor(_class$6, 'uninstall'), _class$6), _applyDecoratedDescriptor$5(_class$6, 'getPluginConfig', [_dec5$3], _Object$getOwnPropertyDescriptor(_class$6, 'getPluginConfig'), _class$6), _class$6);

  var _class$7, _descriptor$1;

  function _initDefineProp$1(target, property, descriptor, context) {
    if (!descriptor) return;

    _Object$defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 });

  }

  function _applyDecoratedDescriptor$6(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }
  var GlobalConfig = (_class$7 = function () {
    _createClass(GlobalConfig, [{
      key: 'silent',
      get: function get$$1() {
        return this._silent;
      },
      set: function set(val) {
        var _this = this;

        val = !!val;
        this._silent = val;
        _Object$keys(this.log).forEach(function (key) {
          _this.log[key] = !val;
        });
      } },
    {
      key: 'useStyleFullscreen',
      get: function get$$1() {
        return index.useStyleFirst;
      },
      set: function set(val) {
        index.useStyleFirst = !!val;
      } }]);


    function GlobalConfig() {
      _classCallCheck(this, GlobalConfig);

      this.log = {
        error: true,
        info: true,
        warn: true,
        debug: true,
        verbose: true };


      _initDefineProp$1(this, '_silent', _descriptor$1, this);

      this.errorHandler = undefined;

      var props = _Object$keys(this.log).reduce(function (props, key) {
        props[key] = accessor({
          get: function get$$1() {
            // $FlowFixMe: we have check the keys
            return Log['ENABLE_' + key.toUpperCase()];
          },
          set: function set(val) {
            // $FlowFixMe: we have check the keys
            Log['ENABLE_' + key.toUpperCase()] = val;
            if (val === true) this.silent = false;
            return val;
          } });

        return props;
      }, {});
      applyDecorators(this.log, props, { self: true });
    }

    return GlobalConfig;
  }(), _descriptor$1 = _applyDecoratedDescriptor$6(_class$7.prototype, '_silent', [nonenumerable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    } }),
  _class$7);

  var _dec$7, _class$8, _class2$1$1, _descriptor$2, _descriptor2$1, _descriptor3$1, _init, _init2, _init3, _init4, _init5, _init6, _init7, _init8, _init9, _class3, _temp;

  function _initDefineProp$2(target, property, descriptor, context) {
    if (!descriptor) return;

    _Object$defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 });

  }

  function _applyDecoratedDescriptor$7(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var Chimee = (_dec$7 = autobindClass(), _dec$7(_class$8 = (_class2$1$1 = (_temp = _class3 = function (_VideoWrapper) {
    _inherits(Chimee, _VideoWrapper);

    _createClass(Chimee, null, [{
      key: 'registerEvents',


      // In some situation, we may have custom events
      // For example, we may have a custom kernel event
      // We can register the event through this method
      value: function registerEvents() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref.name,
        target = _ref.target;

        if (!name || !isString(name)) throw new Error('The event name must be a string, but not ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
        if (!target || !isString(target)) throw new Error('The event target must be a string, but not ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)));
        if (target === 'kernel') {
          kernelEvents.push(name);
        }
      } }]);


    function Chimee(config) {
      _classCallCheck(this, Chimee);

      /* istanbul ignore if */
      var _this = _possibleConstructorReturn(this, (Chimee.__proto__ || _Object$getPrototypeOf(Chimee)).call(this));

      _this.destroyed = false;

      _initDefineProp$2(_this, '__id', _descriptor$2, _this);

      _initDefineProp$2(_this, 'version', _descriptor2$1, _this);

      _initDefineProp$2(_this, 'config', _descriptor3$1, _this);
      if (isString(config) || isElement(config)) {
        config = {
          wrapper: config,
          controls: true };

      } else if (isObject(config)) {
        if (!config.wrapper) throw new Error('You must pass in an legal object');
      } else {
        throw new Error('You must pass in an Object containing wrapper or string or element to new a Chimee');
      }
      // $FlowFixMe: we have check wrapper here
      _this.__dispatcher = new Dispatcher(config, _this);
      _this.ready = _this.__dispatcher.ready;
      _this.readySync = _this.__dispatcher.readySync;
      _this.__wrapAsVideo(_this.__dispatcher.videoConfig);
      return _this;
    }

    _createClass(Chimee, [{
      key: 'destroy',
      value: function destroy() {
        if (this.destroyed) return;
        _get(Chimee.prototype.__proto__ || _Object$getPrototypeOf(Chimee.prototype), '__destroy', this).call(this);
        this.__dispatcher.destroy();
        // $FlowFixMe: normal obejct define
        Object.defineProperty(this, '__dispatcher', {
          get: function get$$1() {
            throw new Error('This instance has been destroyed.');
          },

          enumerable: true,
          configurable: true });

        this.destroyed = true;
      } },
    {
      key: 'use',
      value: function use(option) {
        return this.__dispatcher.use(option);
      } },
    {
      key: 'unuse',
      value: function unuse(name) {
        return this.__dispatcher.unuse(name);
      } },
    {
      key: '__throwError',
      value: function __throwError(error) {
        if (isString(error)) error = new Error(error);
        var errorHandler = this.config.errorHandler || Chimee.config.errorHandler;
        if (isFunction(errorHandler)) return errorHandler(error);
        if (Chimee.config.silent) return;
        /* istanbul ignore else */
        if (isError(error)) throw error;else console.error(error, " at js_sdk\\chimee\\chimee-mobile-player.browser.js:11208");
      } }]);


    return Chimee;
  }(VideoWrapper), _class3.plugin = Plugin, _class3.config = new GlobalConfig(), _class3.install = Dispatcher.install, _class3.uninstall = Dispatcher.uninstall, _class3.hasInstalled = Dispatcher.hasInstalled, _class3.installKernel = Dispatcher.installKernel, _class3.uninstallKernel = Dispatcher.uninstallKernel, _class3.hasInstalledKernel = Dispatcher.hasInstalledKernel, _class3.getPluginConfig = Dispatcher.getPluginConfig, _temp), _descriptor$2 = _applyDecoratedDescriptor$7(_class2$1$1.prototype, '__id', [frozen], {
    enumerable: true,
    initializer: function initializer() {
      return '_vm';
    } }),
  _descriptor2$1 = _applyDecoratedDescriptor$7(_class2$1$1.prototype, 'version', [frozen], {
    enumerable: true,
    initializer: function initializer() {
      return '0.10.5';
    } }),
  _descriptor3$1 = _applyDecoratedDescriptor$7(_class2$1$1.prototype, 'config', [frozen], {
    enumerable: true,
    initializer: function initializer() {
      return {
        errorHandler: undefined };

    } }),
  _applyDecoratedDescriptor$7(_class2$1$1, 'plugin', [frozen], (_init = _Object$getOwnPropertyDescriptor(_class2$1$1, 'plugin'), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    } }),
  _class2$1$1), _applyDecoratedDescriptor$7(_class2$1$1, 'config', [frozen], (_init2 = _Object$getOwnPropertyDescriptor(_class2$1$1, 'config'), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init2;
    } }),
  _class2$1$1), _applyDecoratedDescriptor$7(_class2$1$1, 'install', [frozen], (_init3 = _Object$getOwnPropertyDescriptor(_class2$1$1, 'install'), _init3 = _init3 ? _init3.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init3;
    } }),
  _class2$1$1), _applyDecoratedDescriptor$7(_class2$1$1, 'uninstall', [frozen], (_init4 = _Object$getOwnPropertyDescriptor(_class2$1$1, 'uninstall'), _init4 = _init4 ? _init4.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init4;
    } }),
  _class2$1$1), _applyDecoratedDescriptor$7(_class2$1$1, 'hasInstalled', [frozen], (_init5 = _Object$getOwnPropertyDescriptor(_class2$1$1, 'hasInstalled'), _init5 = _init5 ? _init5.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init5;
    } }),
  _class2$1$1), _applyDecoratedDescriptor$7(_class2$1$1, 'installKernel', [frozen], (_init6 = _Object$getOwnPropertyDescriptor(_class2$1$1, 'installKernel'), _init6 = _init6 ? _init6.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init6;
    } }),
  _class2$1$1), _applyDecoratedDescriptor$7(_class2$1$1, 'uninstallKernel', [frozen], (_init7 = _Object$getOwnPropertyDescriptor(_class2$1$1, 'uninstallKernel'), _init7 = _init7 ? _init7.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init7;
    } }),
  _class2$1$1), _applyDecoratedDescriptor$7(_class2$1$1, 'hasInstalledKernel', [frozen], (_init8 = _Object$getOwnPropertyDescriptor(_class2$1$1, 'hasInstalledKernel'), _init8 = _init8 ? _init8.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init8;
    } }),
  _class2$1$1), _applyDecoratedDescriptor$7(_class2$1$1, 'getPluginConfig', [frozen], (_init9 = _Object$getOwnPropertyDescriptor(_class2$1$1, 'getPluginConfig'), _init9 = _init9 ? _init9.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init9;
    } }),
  _class2$1$1), _class2$1$1)) || _class$8);

  function unwrapExports$1(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule$1(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var classCallCheck$1 = createCommonjsModule$1(function (module, exports) {
    exports.__esModule = true;

    exports.default = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };
  });

  var _classCallCheck$1 = unwrapExports$1(classCallCheck$1);

  var _global$2 = createCommonjsModule$1(function (module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ?
    window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _core$2 = createCommonjsModule$1(function (module) {
    var core = module.exports = { version: '2.5.1' };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });

  var _core_1$2 = _core$2.version;

  var _aFunction$2 = function _aFunction$2(it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

  var _ctx$2 = function _ctx$2(fn, that, length) {
    _aFunction$2(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:return function (a) {
          return fn.call(that, a);
        };
      case 2:return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:return function (a, b, c) {
          return fn.call(that, a, b, c);
        };}

    return function () /* ...args */{
      return fn.apply(that, arguments);
    };
  };

  var _isObject$2 = function _isObject$2(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject$2 = function _anObject$2(it) {
    if (!_isObject$2(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails$2 = function _fails$2(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors$2 = !_fails$2(function () {
    return Object.defineProperty({}, 'a', { get: function get() {return 7;} }).a != 7;
  });

  var document$4 = _global$2.document;
  // typeof document.createElement is 'object' in old IE
  var is$2 = _isObject$2(document$4) && _isObject$2(document$4.createElement);
  var _domCreate$2 = function _domCreate$2(it) {
    return is$2 ? document$4.createElement(it) : {};
  };

  var _ie8DomDefine$2 = !_descriptors$2 && !_fails$2(function () {
    return Object.defineProperty(_domCreate$2('div'), 'a', { get: function get() {return 7;} }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive$2 = function _toPrimitive$2(it, S) {
    if (!_isObject$2(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject$2(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject$2(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject$2(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP$5 = Object.defineProperty;

  var f$9 = _descriptors$2 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject$2(O);
    P = _toPrimitive$2(P, true);
    _anObject$2(Attributes);
    if (_ie8DomDefine$2) try {
      return dP$5(O, P, Attributes);
    } catch (e) {/* empty */}
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp$2 = {
    f: f$9 };


  var _propertyDesc$2 = function _propertyDesc$2(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value };

  };

  var _hide$2 = _descriptors$2 ? function (object, key, value) {
    return _objectDp$2.f(object, key, _propertyDesc$2(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var PROTOTYPE$4 = 'prototype';

  var $export$2 = function $export$2(type, name, source) {
    var IS_FORCED = type & $export$2.F;
    var IS_GLOBAL = type & $export$2.G;
    var IS_STATIC = type & $export$2.S;
    var IS_PROTO = type & $export$2.P;
    var IS_BIND = type & $export$2.B;
    var IS_WRAP = type & $export$2.W;
    var exports = IS_GLOBAL ? _core$2 : _core$2[name] || (_core$2[name] = {});
    var expProto = exports[PROTOTYPE$4];
    var target = IS_GLOBAL ? _global$2 : IS_STATIC ? _global$2[name] : (_global$2[name] || {})[PROTOTYPE$4];
    var key, own, out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      if (own && key in exports) continue;
      // export native or passed
      out = own ? target[key] : source[key];
      // prevent global pollution for namespaces
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
      // bind timers to global for call from export context
      : IS_BIND && own ? _ctx$2(out, _global$2)
      // wrap global constructors for prevent change them in library
      : IS_WRAP && target[key] == out ? function (C) {
        var F = function F(a, b, c) {
          if (this instanceof C) {
            switch (arguments.length) {
              case 0:return new C();
              case 1:return new C(a);
              case 2:return new C(a, b);}
            return new C(a, b, c);
          }return C.apply(this, arguments);
        };
        F[PROTOTYPE$4] = C[PROTOTYPE$4];
        return F;
        // make static versions for prototype methods
      }(out) : IS_PROTO && typeof out == 'function' ? _ctx$2(Function.call, out) : out;
      // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
      if (IS_PROTO) {
        (exports.virtual || (exports.virtual = {}))[key] = out;
        // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
        if (type & $export$2.R && expProto && !expProto[key]) _hide$2(expProto, key, out);
      }
    }
  };
  // type bitmap
  $export$2.F = 1; // forced
  $export$2.G = 2; // global
  $export$2.S = 4; // static
  $export$2.P = 8; // proto
  $export$2.B = 16; // bind
  $export$2.W = 32; // wrap
  $export$2.U = 64; // safe
  $export$2.R = 128; // real proto method for `library`
  var _export$2 = $export$2;

  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  _export$2(_export$2.S + _export$2.F * !_descriptors$2, 'Object', { defineProperty: _objectDp$2.f });

  var $Object$4 = _core$2.Object;
  var defineProperty$2$2 = function defineProperty(it, key, desc) {
    return $Object$4.defineProperty(it, key, desc);
  };

  var defineProperty$7 = createCommonjsModule$1(function (module) {
    module.exports = { "default": defineProperty$2$2, __esModule: true };
  });

  unwrapExports$1(defineProperty$7);

  var createClass$1 = createCommonjsModule$1(function (module, exports) {
    exports.__esModule = true;



    var _defineProperty2 = _interopRequireDefault(defineProperty$7);

    function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

    exports.default = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          (0, _defineProperty2.default)(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
  });

  var _createClass$1 = unwrapExports$1(createClass$1);

  function getDistance(x, y, x1, y1) {

    return Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
  }

  function getSpeed(s, t) {
    return s / t;
  }

  function isArray$1(arr) {
    return Array.isArray(arr);
  }

  /**
     * 手势判断组件
     * 目前判断的手势
     * 单点操作
     * tap
     * swipe
     * pan
     */

  var Gesture = function () {
    function Gesture() {
      _classCallCheck$1(this, Gesture);

      // this.events = events;
      // ['tap', 'swipe', 'panstart', 'panmove', 'panend', 'press'].forEach(item => {
      //   this[item] = events[item].bind(host);
      // })

      // 手势该有的几个状态
      // swipe tapping pressing

      this.startTime = 0;
      this.endTime = 0;
      this.event = {};
      this.status = '';
    }

    _createClass$1(Gesture, [{
      key: 'touchstart',
      value: function touchstart(evt) {
        // 当前 touch 点
        this.startTouch = evt.changedTouches[0];

        // 开始时间
        this.startTime = Date.now();

        this.status = 'tapping';
      } },
    {
      key: 'touchmove',
      value: function touchmove(evt) {

        var touch = evt.changedTouches[0];

        var distance = getDistance(this.startTouch.clientX, this.startTouch.clientY, touch.clientX, touch.clientY);

        if (this.status === 'tapping' && distance > 10) {
          this.status = 'panning';
          this.fire('panstart', evt);
        } else if (this.status === 'panning') {
          this.fire('panmove', evt);
        }
      } },
    {
      key: 'touchend',
      value: function touchend(evt) {

        this.endTouch = evt.changedTouches[0];

        var time = Date.now();
        var distance = getDistance(this.startTouch.clientX, this.startTouch.clientY, this.endTouch.clientX, this.endTouch.clientY);
        var interval = time - this.startTime;

        // 时间 <= 250ms 距离小于 10 px 则认为是 tap
        if (interval <= 250 && distance < 10) {
          this.fire('tap', evt);
          time - this.endTime < 300 && this.fire('doubletap', evt);
        }

        // 时间 > 250ms 距离小于 10 px 则认为是 press
        interval > 250 && distance < 10 && this.fire('press', evt);

        var speed = getSpeed(distance, interval);

        // 距离大于 10 px , 速度大于 0.3 则认为是 swipe
        speed > 0.3 && distance >= 10 && this.fire('swipe', evt);

        // 处于 panning 则触发 panend 事件
        this.status === 'panning' && this.fire('panend', evt);

        this.endTime = Date.now();
      } },
    {
      key: 'touchcancel',
      value: function touchcancel(evt) {} },
    {
      key: 'on',
      value: function on(type, func) {
        if (isArray$1(this.event[type])) {
          this.event[type].push(func);
        } else {
          this.event[type] = [func];
        }
      } },
    {
      key: 'fire',
      value: function fire(type, evt) {
        if (!isArray$1(this.event[type])) return;
        this.event[type].forEach(function (item) {
          item(evt);
        });
      } }]);


    return Gesture;
  }();

  var baseMobileEvent = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
  var supportGesture = ['tap', 'swipe', 'panstart', 'panmove', 'panend', 'press', 'doubletap'];
  function gestureFactory() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$name = _ref.name,
    name = _ref$name === undefined ? 'chimeeGesture' : _ref$name,
    el = _ref.el,
    _ref$level = _ref.level,
    level = _ref$level === undefined ? 0 : _ref$level,
    _ref$inner = _ref.inner,
    inner = _ref$inner === undefined ? true : _ref$inner,
    autoFocus = _ref.autoFocus,
    className = _ref.className,
    _beforeCreate = _ref.beforeCreate,
    _create = _ref.create,
    init = _ref.init,
    inited = _ref.inited,
    _destroy = _ref.destroy,
    data = _ref.data,
    computed = _ref.computed,
    _ref$events = _ref.events,
    events = _ref$events === undefined ? {} : _ref$events,
    _ref$methods = _ref.methods,
    methods = _ref$methods === undefined ? {} : _ref$methods,
    _ref$penetrate = _ref.penetrate,
    penetrate = _ref$penetrate === undefined ? false : _ref$penetrate,
    _ref$operable = _ref.operable,
    operable = _ref$operable === undefined ? true : _ref$operable;

    return {
      name: name,
      el: el,
      level: level,
      inner: inner,
      autoFocus: autoFocus,
      className: className,
      data: data,
      computed: computed,
      beforeCreate: function beforeCreate(config) {
        var _this = this;

        this.gesture = new Gesture();
        this.c_gesture = new Gesture();
        this.w_gesture = new Gesture();
        this.d_gesture = new Gesture();
        baseMobileEvent.forEach(function (item) {
          config.events[item] = function (evt) {
            _this.gesture[item](evt);
          };
          config.events['c_' + item] = function (evt) {
            _this.c_gesture[item](evt);
          };
          config.events['w_' + item] = function (evt) {
            _this.w_gesture[item](evt);
          };
        });

        supportGesture.forEach(function (item) {
          _this.gesture.on(item, function (evt) {
            var func = config.events[item];
            func && func.call(_this, evt);
          });
          _this.c_gesture.on(item, function (evt) {
            var func = config.events['c_' + item];
            func && func.call(_this, evt);
          });
          _this.w_gesture.on(item, function (evt) {
            var func = config.events['w_' + item];
            func && func.call(_this, evt);
          });
          _this.d_gesture.on(item, function (evt) {
            var func = config.events['d_' + item];
            func && func.call(_this, evt);
          });
        });

        _beforeCreate && _beforeCreate.call(this);
      },
      create: function create() {
        var _this2 = this;

        this._i = this._i || 0;
        this._i++;
        baseMobileEvent.forEach(function (item) {
          var key = '__' + item;
          _this2[key] = function (evt) {
            _this2.d_gesture[item](evt);
          };
          addEvent(_this2.$dom, item, _this2[key]);
        });

        _create && _create.call(this);
      },

      init: init,
      inited: inited,
      destroy: function destroy() {
        var _this3 = this;

        baseMobileEvent.forEach(function (item) {
          var key = '__' + item;
          removeEvent(_this3.$dom, item, _this3[key]);
        });

        _destroy && _destroy.call(this);
      },

      methods: methods,
      penetrate: penetrate,
      operable: operable,
      events: events };

  }

  /**
     * 为HTML元素添加事件代理
     * @param {HTMLElement} host 目标对象
     * @param {String} selector 要被代理的元素
     * @param {String} type 事件名称
     * @param {Function} handler 处理函数
     * @param {Boolean} capture 是否在捕获阶段监听
     */
  function addDelegate$1(host, selector, type, handler) {

    var el = host.$dom;
    var handlerWrap = function handlerWrap(e) {
      var targetElsArr = findParents(e.target || e.srcElement, el, true);
      var targetElArr = query(selector, el, true);
      var retEl = void 0;
      if (targetElArr.find) {
        retEl = targetElArr.find(function (seEl) {
          return targetElsArr.find(function (tgEl) {
            return seEl === tgEl;
          });
        });
      } else {
        // Fixed IE11 Array.find not defined bug
        targetElArr.forEach(function (seEl) {
          return !retEl && targetElsArr.forEach(function (tgEl) {
            if (!retEl && seEl === tgEl) {
              retEl = tgEl;
            }
          });
        });
      }
      retEl && handler.apply(retEl, arguments);
    };
    /* 将包装后的方法记录到缓存中 */
    addEventCache(el, type + '_delegate_' + selector, handler, handlerWrap);
    host.events[type] = isArray(host.events[type]) ? host.events[type] : [];
    host.events[type].push(handlerWrap);
  }

  /**
     * 为HTML元素移除事件代理
     * @param {HTMLElement} host 目标对象
     * @param {String} selector 要被代理的元素
     * @param {String} type 事件名称
     * @param {Function} handler 处理函数
     * @param {Boolean} capture 是否在捕获阶段监听
     */
  function removeDelegate$1(host, selector, type, handler) {

    var el = host.$dom;
    /* 尝试从缓存中读取包装后的方法 */
    var handlerWrap = removeEventCache(el, type + '_delegate_' + selector, handler);
    if (handlerWrap) {
      var index = host.events[type].indexOf(handlerWrap);
      host.events[type].splice(index, 1);
    }
  }

  function fireEvent(host, type, evt) {
    isArray(host.events[type]) && host.events[type].forEach(function (item) {
      item(evt);
    });
  }

  var Base = function () {
    function Base(parent) {
      _classCallCheck(this, Base);

      this.parent = parent;
    }

    _createClass(Base, [{
      key: 'create',
      value: function create() {
        this.createEl();
        this.addAllEvent();
      } },
    {
      key: 'destroy',
      value: function destroy() {
        this.removeAllEvent();
      } },
    {
      key: 'createEl',
      value: function createEl() {
        this.$dom = document.createElement(this.option.tag);
        this.$dom.innerHTML = this.option.html;
        this.parent.$wrap.appendChild(this.$dom);
      } },
    {
      key: 'addAllEvent',
      value: function addAllEvent() {
        var _this = this;

        this.option.defaultEvent && _Object$keys(this.option.defaultEvent).forEach(function (item) {
          var key = _this.option.defaultEvent[item];
          _this[key] = bind(_this[key], _this);
          addDelegate$1(_this.parent, _this.option.tag, item, _this[key], false, false);
        });
        this.option.event && _Object$keys(this.option.event).forEach(function (item) {
          var key = '__' + item;
          _this[key] = bind(_this.option.event[item], _this);
          addDelegate$1(_this.parent, _this.option.tag, item, _this[key], false, false);
        });
      } },
    {
      key: 'removeAllEvent',
      value: function removeAllEvent() {
        var _this2 = this;

        this.option.defaultEvent && _Object$keys(this.option.defaultEvent).forEach(function (item) {
          var key = _this2.option.defaultEvent[item];
          _this2[key] = bind(_this2[key], _this2);
          removeDelegate$1(_this2.parent, _this2.option.tag, item, _this2[key], false, false);
        });
        this.option.event && _Object$keys(this.option.event).forEach(function (item) {
          var key = '__' + item;
          _this2[key] = bind(_this2.option.event[item], _this2);
          removeDelegate$1(_this2.parent, _this2.option.tag, item, _this2[key], false, false);
        });
      } }]);


    return Base;
  }();

  /**
        * 自定义组件配置
        */

  var Component = function (_Base) {
    _inherits(Component, _Base);

    function Component(parent, option) {
      _classCallCheck(this, Component);

      var _this = _possibleConstructorReturn(this, (Component.__proto__ || _Object$getPrototypeOf(Component)).call(this, parent));

      _this.option = option;
      _this.init();
      return _this;
    }

    _createClass(Component, [{
      key: 'init',
      value: function init() {
        _get(Component.prototype.__proto__ || _Object$getPrototypeOf(Component.prototype), 'create', this).call(this);
        addClassName(this.$dom, 'chimee-flex-component');
      } }]);


    return Component;
  }(Base);

  /**
            * play 配置
            */

  var defaultOption = {
    tag: 'chimee-control-state',
    html: '\n    <chimee-control-state-play></chimee-control-state-play>\n    <chimee-control-state-pause></chimee-control-state-pause>\n  ',
    animate: {
      icon: '\n      <svg viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n        <g fill="#ffffff" stroke="#ffffff">\n          <path class="left"></path>\n          <path class="right"></path>\n        </g>\n      </svg>\n    ',
      path: {
        play: {
          left: 'M0.921875,0.265625L0.921875,197.074852L95.7890625,149L96.2929688,49Z',
          right: 'M90.3142151,45.9315226L90.3142151,151.774115L201.600944,99.9938782L201.600944,98.0237571Z' },

        pause: {
          left: 'M0.921875,1.265625L0.921875,198.074852L79.3611677,198.074852L79.3611677,0.258923126Z',
          right: 'M126.921875,1.265625L126.921875,198.074852L205.361168,198.074852L205.361168,0.258923126Z' } } },



    defaultEvent: {
      tap: 'tap' } };



  var Play = function (_Base) {
    _inherits(Play, _Base);

    function Play(parent, option) {
      _classCallCheck(this, Play);

      var _this = _possibleConstructorReturn(this, (Play.__proto__ || _Object$getPrototypeOf(Play)).call(this, parent));

      _this.option = deepAssign(defaultOption, isObject(option) ? option : {});
      _this.animate = false;
      _this.init();
      return _this;
    }

    _createClass(Play, [{
      key: 'init',
      value: function init() {
        // 创建 html ／ 绑定事件
        _get(Play.prototype.__proto__ || _Object$getPrototypeOf(Play.prototype), 'create', this).call(this);
        this.$dom = $(this.$dom);
        this.$dom.addClass('chimee-flex-component');

        // 判断是否是默认或者用户提供 icon
        if (this.option.icon && this.option.icon.play && this.option.icon.pause) {
          this.$play = this.$dom.find('chimee-control-state-play');
          this.$pause = this.$dom.find('chimee-control-state-pause');
          this.$play.html(this.option.icon.play);
          this.$pause.html(this.option.icon.pause);
        } else if (!this.option.bitmap) {
          this.animate = true;
          this.option.animate.path = this.option.path ? this.option.path : this.option.animate.path;
          this.$dom.html(this.option.animate.icon);
          this.$left = this.$dom.find('.left');
          this.$right = this.$dom.find('.right');
        }
        this.changeState('pause');
      } },
    {
      key: 'changeState',
      value: function changeState(state) {
        var nextState = state === 'play' ? 'pause' : 'play';
        this.state = state;
        addClassName(this.parent.$dom, nextState);
        removeClassName(this.parent.$dom, state);
        this.animate && this.setPath(nextState);
      } },
    {
      key: 'setPath',
      value: function setPath(state) {
        var path = this.option.animate.path;
        if (state === 'play') {
          this.$left.attr('d', path.play.left);
          this.$right.attr('d', path.play.right);
        } else {
          this.$left.attr('d', path.pause.left);
          this.$right.attr('d', path.pause.right);
        }
      } },
    {
      key: 'tap',
      value: function tap(e) {
        var nextState = this.state === 'play' ? 'pause' : 'play';
        this.changeState(nextState);
        this.parent.$emit(nextState);
      } }]);


    return Play;
  }(Base);

  var _class$9;

  function _applyDecoratedDescriptor$8(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  /**
     * Screen 配置
     */

  var defaultOption$1 = {
    tag: 'chimee-screen',
    html: '\n    <chimee-screen-full>\n      <svg viewBox="0 0 67 66" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n          <!-- Generator: Sketch 43.1 (39012) - http://www.bohemiancoding.com/sketch -->\n          <desc>Created with Sketch.</desc>\n          <defs></defs>\n          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n              <g id="screen-small" transform="translate(33.756308, 32.621867) rotate(45.000000) translate(-33.756308, -32.621867) translate(18.756308, -10.378133)" fill="#FFFFFF">\n                  <polygon id="Path" transform="translate(14.967695, 66.389245) rotate(180.000000) translate(-14.967695, -66.389245) " points="11.5190786 46.9431778 11.7210093 70.7913773 0.565180527 70.7913773 15.4674455 85.8353125 29.3702096 70.7913773 18.5573247 70.7702156 18.5573247 46.9431778"></polygon>\n                  <polygon id="Path" points="11.5190786 0.274130278 11.7210093 24.1223298 0.565180527 24.1223298 15.4674455 39.1662649 29.3702096 24.1223298 18.5573247 24.1011681 18.5573247 0.274130278"></polygon>\n              </g>\n          </g>\n      </svg>\n    </chimee-screen-full>\n    <chimee-screen-small>\n      <svg viewBox="0 0 61 62" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n        <!-- Generator: Sketch 43.1 (39012) - http://www.bohemiancoding.com/sketch -->\n        <desc>Created with Sketch.</desc>\n        <defs></defs>\n        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n            <g id="Group" transform="translate(30.756308, 30.621867) rotate(45.000000) translate(-30.756308, -30.621867) translate(15.756308, -12.378133)" fill="#FFFFFF">\n                <polygon id="Path" points="11.5190786 46.9431778 11.7210093 70.7913773 0.565180527 70.7913773 15.4674455 85.8353125 29.3702096 70.7913773 18.5573247 70.7702156 18.5573247 46.9431778"></polygon>\n                <polygon id="Path" transform="translate(14.967695, 19.720198) rotate(180.000000) translate(-14.967695, -19.720198) " points="11.5190786 0.274130278 11.7210093 24.1223298 0.565180527 24.1223298 15.4674455 39.1662649 29.3702096 24.1223298 18.5573247 24.1011681 18.5573247 0.274130278"></polygon>\n            </g>\n        </g>\n      </svg>\n    </chimee-screen-small>\n  ',
    defaultEvent: {
      tap: 'tap' } };



  var Screen = (_class$9 = function (_Base) {
    _inherits(Screen, _Base);

    function Screen(parent, option) {
      _classCallCheck(this, Screen);

      var _this = _possibleConstructorReturn(this, (Screen.__proto__ || _Object$getPrototypeOf(Screen)).call(this, parent));

      _this.state = 'small';
      _this.option = deepAssign(defaultOption$1, isObject(option) ? option : {});
      _this.init();
      return _this;
    }

    _createClass(Screen, [{
      key: 'init',
      value: function init() {
        _get(Screen.prototype.__proto__ || _Object$getPrototypeOf(Screen.prototype), 'create', this).call(this);
        this.$dom = $(this.$dom);
        this.changeState(this.state);
        // addClassName(this.$dom, 'flex-item');
        this.$dom.addClass('chimee-flex-component');

        this.$full = this.$dom.find('chimee-screen-full');
        this.$small = this.$dom.find('chimee-screen-small');
        // 判断是否是默认或者用户提供 icon
        if (this.option.icon && this.option.icon.full && this.option.icon.small) {
          // if((!this.option.icon.play && this.option.icon.puase) || (this.option.icon.play && !this.option.icon.puase)) {
          //   console.warn(`Please provide a play and pause icon！If you can't, we will use default icon!`);
          // }
          this.$full.html(this.option.icon.full);
          this.$small.html(this.option.icon.small);
        } else if (this.option.bitmap) {
          this.$full.html('');
          this.$small.html('');
        }
      } },
    {
      key: 'changeState',
      value: function changeState(state) {
        var removeState = state === 'small' ? 'full' : 'small';
        addClassName(this.parent.$dom, state);
        removeClassName(this.parent.$dom, removeState);
      } },
    {
      key: 'tap',
      value: function tap() {
        var full = false;
        if (this.state === 'small') {
          this.state = 'full';
          full = true;
        } else {
          this.state = 'small';
          full = false;
        }
        this.changeState(this.state);
        this.parent.$fullscreen(full, 'container');
        if (full) {
          this.watch_screen = this.parent.$watch('isFullscreen', this.screenChange);
        } else {
          this.watch_screen();
        }
      } },
    {
      key: 'screenChange',
      value: function screenChange() {
        if (!this.parent.fullscreenElement) return;
        this.state = 'small';
        this.changeState('small');
        this.parent.$fullscreen(false, 'container');
      } }]);


    return Screen;
  }(Base), _applyDecoratedDescriptor$8(_class$9.prototype, 'screenChange', [autobind], _Object$getOwnPropertyDescriptor(_class$9.prototype, 'screenChange'), _class$9.prototype), _class$9);

  var _class$10;

  function _applyDecoratedDescriptor$9(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var defaultOption$2 = {
    tag: 'chimee-progressbar',
    html: '\n    <chimee-progressbar-bg class="chimee-progressbar-line"></chimee-progressbar-bg>\n    <chimee-progressbar-buffer class="chimee-progressbar-line"></chimee-progressbar-buffer>\n    <chimee-progressbar-all class="chimee-progressbar-line">\n      <chimee-progressbar-ball></chimee-progressbar-ball>\n    </chimee-progressbar-all>\n  ' };


  var ProgressBar = (_class$10 = function (_Base) {
    _inherits(ProgressBar, _Base);

    function ProgressBar(parent, option) {
      _classCallCheck(this, ProgressBar);

      var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || _Object$getPrototypeOf(ProgressBar)).call(this, parent));

      _this.option = deepAssign(defaultOption$2, isObject(option) ? option : {});
      _this.visiable = option !== false;
      _this.init();
      return _this;
    }

    _createClass(ProgressBar, [{
      key: 'init',
      value: function init() {
        _get(ProgressBar.prototype.__proto__ || _Object$getPrototypeOf(ProgressBar.prototype), 'create', this).call(this);
        this.$dom = $(this.$dom);
        this.$buffer = this.$dom.find('chimee-progressbar-buffer');
        this.$all = this.$dom.find('chimee-progressbar-all');
        this.$ball = this.$dom.find('chimee-progressbar-ball');
        this.$dom.addClass('chimee-flex-component');

        // css 配置
        !this.visiable && this.$dom.css('visibility', 'hidden');
        this.addEvent();
      } },
    {
      key: 'destroy',
      value: function destroy() {
        this.removeEvent();
        // 解绑全屏监听事件
        this.watch_screen && this.watch_screen();
        _get(ProgressBar.prototype.__proto__ || _Object$getPrototypeOf(ProgressBar.prototype), 'destroy', this).call(this);
      } },
    {
      key: 'addEvent',
      value: function addEvent$$1() {
        addDelegate$1(this.parent, 'chimee-progressbar', 'tap', this.tap);
        addDelegate$1(this.parent, 'chimee-progressbar', 'panstart', this.mousedown);
      } },
    {
      key: 'removeEvent',
      value: function removeEvent$$1() {
        removeDelegate$1(this.parent, 'chimee-progressbar', 'tap', this.tap);
        removeDelegate$1(this.parent, 'chimee-progressbar', 'panstart', this.mousedown);
      }

      /**
         * 缓存进度条更新 progress 事件
         */ },

    {
      key: 'progress',
      value: function progress() {
        var buffer = 0;
        try {
          buffer = this.parent.buffered.end(0);
        } catch (e) {}
        var bufferWidth = buffer / this.parent.duration * 100 + '%';
        this.$buffer.css('width', bufferWidth);
      }

      /**
         * requestAnimationFrame 来更新进度条, timeupdate 事件
         */ },

    {
      key: 'update',
      value: function update() {
        var time = this._currentTime !== undefined ? this._currentTime : this.parent.currentTime;
        var timePer = time ? time / this.parent.duration : 0;
        this.$all.css('width', timePer * 100 + '%');
      } },
    {
      key: 'tap',
      value: function tap(e) {
        var _$dom$0$getBoundingCl = this.$dom[0].getBoundingClientRect(),
        left = _$dom$0$getBoundingCl.left,
        width = _$dom$0$getBoundingCl.width;

        console.log(left, e.clientX, " at js_sdk\\chimee\\chimee-mobile-player.browser.js:12259");
        this._currentTime = (e.clientX - left) / width * this.parent.duration;
        this.update();
        this.parent.currentTime = this._currentTime;
        this._currentTime = undefined;
      } },
    {
      key: 'mousedown',
      value: function mousedown(e) {
        var _$dom$0$getBoundingCl2 = this.$dom[0].getBoundingClientRect(),
        left = _$dom$0$getBoundingCl2.left,
        width = _$dom$0$getBoundingCl2.width;

        this._currentTime = (e.clientX - left) / width * this.parent.duration;
        this.startX = e.clientX;
        this.startTime = this._currentTime;
        addDelegate$1(this.parent, this.option.tag, 'panmove', this.draging);
        addDelegate$1(this.parent, this.option.tag, 'panend', this.dragEnd);
      }

      /**
         * 开始拖拽
         * @param {EventObject} e 鼠标事件
         */ },

    {
      key: 'draging',
      value: function draging(e) {
        this.endX = e.clientX;

        var _$dom$0$getBoundingCl3 = this.$dom[0].getBoundingClientRect(),
        width = _$dom$0$getBoundingCl3.width;

        var dragTime = (this.endX - this.startX) / width * this.parent.duration;
        var dragAfterTime = +(this.startTime + dragTime).toFixed(2);
        this._currentTime = dragAfterTime < 0 ? 0 : dragAfterTime > this.parent.duration ? this.parent.duration : dragAfterTime;
        this.update();
      }

      /**
         * 结束拖拽
         */ },

    {
      key: 'dragEnd',
      value: function dragEnd() {
        this.startX = 0;
        this.startTime = 0;
        this.parent.currentTime = this._currentTime;
        this._currentTime = undefined;
        removeDelegate$1(this.parent, this.option.tag, 'panmove', this.draging);
        removeDelegate$1(this.parent, this.option.tag, 'panend', this.dragEnd);
      }
      /**
         * progress 不可点击
         * @param {*} value 
         */ },

    {
      key: 'changePointerEvent',
      value: function changePointerEvent(value) {
        this.$dom.css('pointerEvents', value);
      } }]);


    return ProgressBar;
  }(Base), _applyDecoratedDescriptor$9(_class$10.prototype, 'tap', [autobind], _Object$getOwnPropertyDescriptor(_class$10.prototype, 'tap'), _class$10.prototype), _applyDecoratedDescriptor$9(_class$10.prototype, 'mousedown', [autobind], _Object$getOwnPropertyDescriptor(_class$10.prototype, 'mousedown'), _class$10.prototype), _applyDecoratedDescriptor$9(_class$10.prototype, 'draging', [autobind], _Object$getOwnPropertyDescriptor(_class$10.prototype, 'draging'), _class$10.prototype), _applyDecoratedDescriptor$9(_class$10.prototype, 'dragEnd', [autobind], _Object$getOwnPropertyDescriptor(_class$10.prototype, 'dragEnd'), _class$10.prototype), _class$10);

  /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * currentTime 配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    */

  var defaultOption$3 = {
    tag: 'chimee-current-time',
    html: '\n    00:00\n  ' };


  var CurrentTime = function (_Base) {
    _inherits(CurrentTime, _Base);

    function CurrentTime(parent, option) {
      _classCallCheck(this, CurrentTime);

      var _this = _possibleConstructorReturn(this, (CurrentTime.__proto__ || _Object$getPrototypeOf(CurrentTime)).call(this, parent));

      _this.option = deepAssign(defaultOption$3, isObject(option) ? option : {});
      _this.init();
      return _this;
    }

    _createClass(CurrentTime, [{
      key: 'init',
      value: function init() {
        _get(CurrentTime.prototype.__proto__ || _Object$getPrototypeOf(CurrentTime.prototype), 'create', this).call(this);
        this.$dom = $(this.$dom);
        this.$dom.addClass('chimee-flex-component');
      } },
    {
      key: 'updateCurrent',
      value: function updateCurrent() {
        this.$dom.text(formatTime(this.parent.currentTime));
      } }]);


    return CurrentTime;
  }(Base);

  /**
            * totalTime 配置
            */

  var defaultOption$4 = {
    tag: 'chimee-total-time',
    html: '\n    00:00\n  ' };


  var TotalTime = function (_Base) {
    _inherits(TotalTime, _Base);

    function TotalTime(parent, option) {
      _classCallCheck(this, TotalTime);

      var _this = _possibleConstructorReturn(this, (TotalTime.__proto__ || _Object$getPrototypeOf(TotalTime)).call(this, parent));

      _this.option = deepAssign(defaultOption$4, isObject(option) ? option : {});
      _this.init();
      return _this;
    }

    _createClass(TotalTime, [{
      key: 'init',
      value: function init() {
        _get(TotalTime.prototype.__proto__ || _Object$getPrototypeOf(TotalTime.prototype), 'create', this).call(this);
        this.$dom = $(this.$dom);
        this.$dom.addClass('chimee-flex-component');
      } },
    {
      key: 'updateTotal',
      value: function updateTotal() {
        this.$dom.text(formatTime(this.parent.duration));
      } }]);


    return TotalTime;
  }(Base);

  function hundleChildren(plugin) {
    var childConfig = {};
    if (!plugin.$config.children) {
      childConfig = plugin.isLive ? {
        play: true, // 底部播放暂停按钮
        currentTime: false, // 播放时间
        progressBar: false, // 播放进度控制条
        totalTime: false, // 总时间
        screen: true // 全屏控制
      } : {
        play: true, // 底部播放暂停按钮
        currentTime: true, // 播放时间
        progressBar: true, // 播放进度控制条
        totalTime: true, // 总时间
        screen: true // 全屏控制
      };
    } else {
      childConfig = plugin.$config.children;
    }
    return childConfig;
  }

  /**
     * 1. 将所有的 ui component 输出到 html 结构中
     * 2. 为这些 component 绑定响应的事件
     * @param {*} dom 所有 ui 节点的子容器
     * @param {*} config 关于 ui 的一些列设置
     * @return {Array} 所有子节点
     */

  function createChild(plugin) {
    var childConfig = plugin.config.children = hundleChildren(plugin);
    var children = {};
    _Object$keys(childConfig).forEach(function (item) {
      switch (item) {
        case 'play':
          if (childConfig.play) {
            children.play = new Play(plugin, childConfig.play);
          }
          break;
        case 'currentTime':
          if (childConfig.currentTime) {
            children.currentTime = new CurrentTime(plugin, childConfig.currentTime);
          }
          break;
        case 'progressBar':
          children.progressBar = new ProgressBar(plugin, childConfig.progressBar);
          break;
        case 'totalTime':
          if (childConfig.totalTime) {
            children.totalTime = new TotalTime(plugin, childConfig.totalTime);
          }
          break;
        case 'screen':
          if (childConfig.screen) {
            children.screen = new Screen(plugin, childConfig.screen);
          }
          break;
        default:
          children[item] = new Component(plugin, childConfig[item]);
          break;}

    });

    return children;
  }

  var majorColorStyle = '\n  .chimee-flex-component svg *{\n    fill: majorColor;\n    stroke: majorColor;\n  }\n  chimee-progressbar-all{\n    background: majorColor;\n  }\n  chimee-volume.chimee-flex-component chimee-volume-bar-all{\n    background: majorColor;    \n  }\n  chimee-clarity-list li:hover,\n  chimee-clarity-list li.active {\n    color: majorColor;\n  }\n';

  var hoverColorStyle = '\n  .chimee-flex-component svg:hover *{\n    fill: hoverColor;\n    stroke: hoverColor;\n  }\n';

  /**
                                                                                                                           * 插件默认配置
                                                                                                                           */

  var defaultConfig = {
    hideBarTime: 2000 };


  var barStatus = {
    timer: null,
    show: true };


  var mobiControlbar = gestureFactory({
    name: 'chimeeMobiControlbar',
    el: 'chimee-control',
    data: {
      children: {},
      show: false },

    level: 99,
    operable: true,
    penetrate: false,
    create: function create() {
      this.environment = new uaParser().getResult();
    },
    init: function init(videoConfig) {
      if (videoConfig.controls) {
        this.show = true;
        videoConfig.controls = false;
      }
      var _this = this;
      applyDecorators(videoConfig, {
        controls: accessor({
          get: function get() {
            return _this.show;
          },
          set: function set(value) {
            _this.show = Boolean(value);
            _this._display();
            return false;
          } },
        { preSet: true }) },
      { self: true });
      this.config = isObject(this.$config) ? deepAssign(defaultConfig, this.$config) : defaultConfig;
      this.$dom.innerHTML = '<chimee-control-wrap></chimee-control-wrap>';
      this.$wrap = this.$dom.querySelector('chimee-control-wrap');

      this.events = {};
      this.children = createChild(this);
      this._setStyle();

      // 增加 window / document 的全局监听
      this._addGlobalEvent();

      // 监听全屏事件

      this.watch_fullscreen = this.$watch('isFullscreen', this._mousemove);
    },
    destroy: function destroy() {
      window.clearTimeout(barStatus.timer);
      barStatus.show = false;
      this._removeGlobalEvent();
      this.watch_fullscreen && this.watch_fullscreen();
    },
    inited: function inited() {
      for (var i in this.children) {
        this.children[i].inited && this.children[i].inited();
      }
    },

    events: {
      play: function play() {
        this.children.play && this.children.play.changeState('play');
        this._hideItself();
      },
      pause: function pause() {
        this.children.play && this.children.play.changeState('pause');
        this._showItself();
      },
      canplay: function canplay() {
        this.children.progressBar.changePointerEvent('auto');
      },
      load: function load() {
        // update src 充值进度条/时间/播放状态
        // load 的时候不会触发 pause(), 手动将控制条显示出来
        this._showItself();
        this._progressUpdate();
        this.children.play && this.children.play.changeState('pause');
        this.children.progressBar.changePointerEvent('none');
        this._progressUpdate();
      },
      durationchange: function durationchange() {
        this.children.totalTime && this.children.totalTime.updateTotal();
      },
      timeupdate: function timeupdate() {
        this._progressUpdate();
      },
      progress: function progress() {
        this.children.progressBar && this.children.progressBar.progress();
      },
      volumechange: function volumechange() {
        this.children.volume && this.children.volume.update();
      },
      tap: function tap(evt) {
        this._mousemove();
      },
      d_tap: function d_tap(evt) {
        !this.paused && this._mousemove();
        fireEvent(this, 'tap', evt.changedTouches[0]);
      },
      d_panstart: function d_panstart(evt) {
        !this.paused && this._mousemove();
        fireEvent(this, 'panstart', evt.changedTouches[0]);
      },
      d_panmove: function d_panmove(evt) {
        !this.paused && this._mousemove();
        fireEvent(this, 'panmove', evt.changedTouches[0]);
      },
      d_panend: function d_panend(evt) {
        !this.paused && this._mousemove();
        fireEvent(this, 'panend', evt.changedTouches[0]);
      } },

    methods: {
      _progressUpdate: function _progressUpdate() {
        this.children.progressBar && this.children.progressBar.update();
        this.children.currentTime && this.children.currentTime.updateCurrent();
      },
      _hideItself: function _hideItself() {
        var _this2 = this;

        window.clearTimeout(barStatus.timer);
        barStatus.timer = setTimeout(function () {
          var bottom = -_this2.$wrap.offsetHeight;
          setStyle(_this2.$wrap, {
            bottom: bottom + 'px' });

          setStyle(_this2.$dom, {
            visibility: 'hidden' });

          barStatus.show = false;
          _this2.$emit('barHide');
        }, this.config.hideBarTime);
      },
      _showItself: function _showItself() {
        window.clearTimeout(barStatus.timer);
        setStyle(this.$wrap, {
          bottom: '0' });

        setStyle(this.$dom, {
          visibility: 'visible' });

        !barStatus.show && this.$emit('barShow');
        barStatus.show = true;
      },
      _display: function _display() {
        var display = this.show ? 'block' : 'none';
        setStyle(this.$dom, {
          display: display });

      },
      _mousemove: function _mousemove(e) {
        if (this.paused) return;
        this._showItself();
        this._hideItself();
      },
      _setStyle: function _setStyle() {
        var css = '';
        css += this.config.majorColor ? majorColorStyle.replace(/majorColor/g, this.config.majorColor) : '';
        css += this.config.hoverColor ? hoverColorStyle.replace(/hoverColor/g, this.config.hoverColor) : '';
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = css;
        document.head.appendChild(style);
      },
      _weixinJSBridgeReady: function _weixinJSBridgeReady() {
        // console.log(this.environment.os === 'iOS', window.WeixinJSBridge)
        window.WeixinJSBridge && this.environment.os.name === 'iOS' && this.load();
      },

      // 增加一些全局事件监听
      _addGlobalEvent: function _addGlobalEvent() {
        addEvent(window, 'orientationchange', this._mousemove);
        addEvent(document, 'WeixinJSBridgeReady', this._weixinJSBridgeReady);
      },

      // 去除一些全局事件监听
      _removeGlobalEvent: function _removeGlobalEvent() {
        removeEvent(window, 'orientationchange', this._mousemove);
        removeEvent(document, 'WeixinJSBridgeReady', this._weixinJSBridgeReady);
      } } });



  var playStr = "\n<svg width=\"92px\" height=\"92px\" viewBox=\"0 0 92 92\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch -->\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <circle id=\"Oval\" fill-opacity=\"0.5\" fill=\"#000000\" cx=\"46\" cy=\"46\" r=\"46\"></circle>\n        <polygon id=\"Triangle\" fill=\"#FFFFFF\" transform=\"translate(51.000000, 46.500000) rotate(90.000000) translate(-51.000000, -46.500000) \" points=\"51 26 76 67 26 67\"></polygon>\n    </g>\n</svg>";

  var loadingStr = "<svg width='120px' height='120px' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-1s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.9166666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.75s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.25s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='47' y='40' width='6' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.08333333333333333s' repeatCount='indefinite'/></rect></svg>";

  var defaultConfig$1 = {
    errorTips: '加载失败，请刷新重试',
    icon: {
      loading: loadingStr,
      play: playStr },

    expectTime: 3e4 // 超过最长加载时间则报错
  };

  var chimeeState = gestureFactory({
    name: 'chimeeState',
    el: '\n    <chimee-state class="play">\n      <chimee-state-loading></chimee-state-loading>\n      <chimee-state-play></chimee-state-play>\n      <chimee-state-error></chimee-state-error>\n    </chimee-state>\n  ',
    init: function init() {
      this.config = isObject(this.$config) ? deepAssign(defaultConfig$1, this.$config) : defaultConfig$1;
      this._addInnerHtml();
    },
    inited: function inited() {
      // 存在 src 并且 设置了 prelaod || autoplay 的情况下， 显示 loading
      this.src && (this.preload === 'auto' || this.preload === 'metadata' || this.preload === '' || this.autoplay === true) && this.showState('loading', true);
    },

    penetrate: true,
    operable: true,
    destroy: function destroy() {
      this.clearTimeout();
    },

    events: {
      load: function load() {
        console.log('load', " at js_sdk\\chimee\\chimee-mobile-player.browser.js:12704");
        this.showState('play', true);
      },
      pause: function pause() {
        console.log('pause', " at js_sdk\\chimee\\chimee-mobile-player.browser.js:12708");
        this.showState('play', true);
      },
      play: function play() {
        this.showState('play', false);
      },

      // loadedmetadata () {
      // this.playing();
      // console.log('loadedmetadata')
      // this.showState('play', true);
      // },
      playing: function playing() {
        this.playing();
      },

      // loadstart () {
      //   this.waiting();
      // },
      waiting: function waiting() {
        this.waiting();
      },

      // 卡顿(FLV|HLS加载异常待内部特供事件)
      // stalled () {
      //   this.showLoading();
      // },
      timeupdate: function timeupdate() {
        this.clearTimeout();
      },
      panstart: function panstart(evt) {
        this.emit('state-panstart', evt);
      },
      panmove: function panmove(evt) {
        this.emit('state-panmove', evt);
      },
      panend: function panend(evt) {
        this.emit('state-panend', evt);
      },
      tap: function tap(evt) {
        this.emit('state-tap', evt);
      },
      d_tap: function d_tap(evt) {
        var playElem = this.$dom.querySelector('chimee-state-play');
        if (playElem.contains(evt.target)) {
          this.play();
        }
      } },

    methods: {
      playing: function playing() {
        this.clearTimeout();
        this.showState('loading', false);
        this.showState('error', false);
      },
      waiting: function waiting() {
        var _this = this;

        this.clearTimeout();
        // 加载超过30秒则超时显示异常
        this._timeout = setTimeout(function () {
          return _this.showState('error', true);
        }, this.config.expectTime);
        !this.paused && this.showState('loading', true);
      },
      clearTimeout: function (_clearTimeout) {
        function clearTimeout() {
          return _clearTimeout.apply(this, arguments);
        }

        clearTimeout.toString = function () {
          return _clearTimeout.toString();
        };

        return clearTimeout;
      }(function () {
        if (this._timeout) {
          clearTimeout(this._timeout);
          this._timeout = null;
        }
      }),
      showState: function showState(state, show) {
        console.log(state, show, " at js_sdk\\chimee\\chimee-mobile-player.browser.js:12790");
        show && this.emit('state-change', state);
        this.$dom.className = show ? state : '';
      },
      _addInnerHtml: function _addInnerHtml() {
        var dom = $(this.$dom);
        dom.find('chimee-state-loading').html(this.config.icon.loading);
        dom.find('chimee-state-play').html(this.config.icon.play);
        dom.find('chimee-state-error').html(this.config.errorTips);
      } } });



  function uiIsAvailable(defaultDisableUA, ua) {
    return defaultDisableUA.every(function (item) {
      return !ua.match(item);
    });
  }

  function reduceArray(arr1, arr2) {
    if (!isArray(arr2)) return arr1;
    var result = [];
    arr1.forEach(function (item) {
      if (arr2.indexOf(item) === -1) result.push(item);
    });
    return result;
  }

  var DEFAULT_DISABLE_UA = [];
  var innerPlugins = [mobiControlbar.name, chimeeState.name];

  Chimee.install(mobiControlbar);
  Chimee.install(chimeeState);

  function handlePlugins(config) {
    config.plugin = config.plugin || config.plugins;
    if (!isArray(config.plugin)) config.plugin = [];
    var configPluginNames = config.plugin.map(function (item) {
      return isObject(item) ? item.name : item;
    });
    innerPlugins.forEach(function (name) {
      if (configPluginNames.indexOf(name) > -1) return;
      config.plugin.push(name);
    });
    config.plugin = reduceArray(config.plugin, config.removeInnerPlugins);
  }

  var ChimeeMobilePlayer = function (_Chimee) {
    _inherits(ChimeeMobilePlayer, _Chimee);

    function ChimeeMobilePlayer(config) {
      _classCallCheck(this, ChimeeMobilePlayer);

      if (!isObject(config)) throw new TypeError('You must pass an Object as config when you new ChimeePlayer');
      var defaultDisableUA = config.disableUA === undefined ? DEFAULT_DISABLE_UA : config.disableUA;
      var isUIAvailable = uiIsAvailable(defaultDisableUA, window.navigator.userAgent);

      // 添加UI插件
      if (isUIAvailable) handlePlugins(config);

      config.box = config.box === undefined ? 'native' : config.box;

      var _this = _possibleConstructorReturn(this, (ChimeeMobilePlayer.__proto__ || _Object$getPrototypeOf(ChimeeMobilePlayer)).call(this, config));

      _this.hlsWarn(_this.box);
      _this.ready.then(function () {
        _this.$watch('box', function (box) {
          return _this.hlsWarn(box);
        });
      });
      return _this;
    }

    _createClass(ChimeeMobilePlayer, [{
      key: 'hlsWarn',
      value: function hlsWarn(box) {
        if (box === 'hls') {
          Log.warn('chimee-mobile-player', 'Mobile support m3u8, you do not need to use hls box. See more https://github.com/Chimeejs/chimee-mobile-player/blob/master/README.md#%E4%B8%BA%E4%BB%80%E4%B9%88%E7%A7%BB%E5%8A%A8%E7%AB%AF%E4%B8%8D%E8%83%BD%E6%92%AD%E6%94%BE-m3u8-%E7%9B%B4%E6%92%AD%E6%B5%81');
        }
      } }]);


    return ChimeeMobilePlayer;
  }(Chimee);
  // 暴露手势工厂方法


  ChimeeMobilePlayer.gestureFactory = gestureFactory;

  return ChimeeMobilePlayer;

});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\js_sdk\\chimee\\index.min.js":
/*!*************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/js_sdk/chimee/index.min.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
!function (e, t) { true ? module.exports = t() : undefined;}("undefined" != typeof self ? self : void 0, function () {return function (e) {function t(i) {if (n[i]) return n[i].exports;var r = n[i] = { i: i, l: !1, exports: {} };return e[i].call(r.exports, r, r.exports, t), r.l = !0, r.exports;}var n = {};return t.m = e, t.c = n, t.d = function (e, n, i) {t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: i });}, t.n = function (e) {var n = e && e.__esModule ? function () {return e.default;} : function () {return e;};return t.d(n, "a", n), n;}, t.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, t.p = "", t(t.s = 77);}([function (e, t) {var n = e.exports = { version: "2.5.6" };"number" == typeof __e && (__e = n);}, function (e, t) {var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = n);}, function (e, t, n) {var i = n(1),r = n(0),o = n(17),a = n(9),s = n(11),u = function u(e, t, n) {var c,f,l,d = e & u.F,h = e & u.G,v = e & u.S,p = e & u.P,m = e & u.B,y = e & u.W,g = h ? r : r[t] || (r[t] = {}),b = g.prototype,_ = h ? i : v ? i[t] : (i[t] || {}).prototype;h && (n = t);for (c in n) {(f = !d && _ && void 0 !== _[c]) && s(g, c) || (l = f ? _[c] : n[c], g[c] = h && "function" != typeof _[c] ? n[c] : m && f ? o(l, i) : y && _[c] == l ? function (e) {var t = function t(_t, n, i) {if (this instanceof e) {switch (arguments.length) {case 0:return new e();case 1:return new e(_t);case 2:return new e(_t, n);}return new e(_t, n, i);}return e.apply(this, arguments);};return t.prototype = e.prototype, t;}(l) : p && "function" == typeof l ? o(Function.call, l) : l, p && ((g.virtual || (g.virtual = {}))[c] = l, e & u.R && b && !b[c] && a(b, c, l)));}};u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, e.exports = u;}, function (e, t, n) {var i = n(36)("wks"),r = n(24),o = n(1).Symbol,a = "function" == typeof o;(e.exports = function (e) {return i[e] || (i[e] = a && o[e] || (a ? o : r)("Symbol." + e));}).store = i;}, function (e, t, n) {"use strict";function i(e, t) {var n = e.__evt_id;n || (Object.defineProperty(e, "__evt_id", { writable: !0, enumerable: !1, configurable: !0 }), n = e.__evt_id = ++g.count);var i = n + "_" + t,r = g[i];return r || (r = g[i] = []), r;}function r(e, t, n) {var r = m()(null);r.type = t, r.target = e, n && v()(r, Object(y.r)(n) ? n : { data: n }), i(e, t).forEach(function (t) {(t[1] || t[0]).apply(e, [r]);});}function o(e, t, n) {var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],o = arguments[4];Object(y.l)(r) && !o && (o = r, r = void 0);var s = [n, void 0, r];r && !o && (o = function o() {a(e, t, n, r);for (var i = arguments.length, o = Array(i), s = 0; s < i; s++) {o[s] = arguments[s];}n.apply(e, o);}), o && (s[1] = o), i(e, t).push(s);}function a(e, t, n) {var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],o = i(e, t);if (n || r) {var a = -1,s = void 0;return o.find(function (e, t) {if ((!n || e[0] === n) && (!r || e[2])) return a = t, s = e[1], !0;}), -1 !== a && o.splice(a, 1), s;}o.length = 0;}Object.defineProperty(t, "__esModule", { value: !0 }), n.d(t, "emitEventCache", function () {return r;}), n.d(t, "addEventCache", function () {return o;}), n.d(t, "removeEventCache", function () {return a;}), n.d(t, "CustEvent", function () {return b;});var s = n(28),u = n.n(s),c = n(41),f = n.n(c),l = n(42),d = n.n(l),h = n(56),v = n.n(h),p = n(107),m = n.n(p),y = n(13),g = m()(null);g.count = 0;var b = function () {function e(t, n) {var i = this;if (f()(this, e), Object.defineProperty(this, "__target", { writable: !0, enumerable: !1, configurable: !0 }), this.__target = this, t) {if ("object" !== (void 0 === t ? "undefined" : u()(t))) throw new Error("CusEvent target are not object");this.__target = t, n && ["on", "once", "off", "emit"].forEach(function (e) {t[e] = i[e];});}}return d()(e, [{ key: "on", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];return o(this.__target, e, t, n), this;} }, { key: "once", value: function value(e, t) {return this.on(e, t, !0);} }, { key: "off", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];return a(this.__target, e, t, n), this;} }, { key: "emit", value: function value(e, t) {return r(this.__target, e, { data: t }), this;} }]), e;}();}, function (e, t, n) {var i = n(6),r = n(48),o = n(32),a = Object.defineProperty;t.f = n(8) ? Object.defineProperty : function (e, t, n) {if (i(e), t = o(t, !0), i(n), r) try {return a(e, t, n);} catch (e) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (e[t] = n.value), e;};}, function (e, t, n) {var i = n(7);e.exports = function (e) {if (!i(e)) throw TypeError(e + " is not an object!");return e;};}, function (e, t) {e.exports = function (e) {return "object" == typeof e ? null !== e : "function" == typeof e;};}, function (e, t, n) {e.exports = !n(10)(function () {return 7 != Object.defineProperty({}, "a", { get: function get() {return 7;} }).a;});}, function (e, t, n) {var i = n(5),r = n(18);e.exports = n(8) ? function (e, t, n) {return i.f(e, t, r(1, n));} : function (e, t, n) {return e[t] = n, e;};}, function (e, t) {e.exports = function (e) {try {return !!e();} catch (e) {return !0;}};}, function (e, t) {var n = {}.hasOwnProperty;e.exports = function (e, t) {return n.call(e, t);};}, function (e, t, n) {var i = n(51),r = n(22);e.exports = function (e) {return i(r(e));};}, function (e, t, n) {"use strict";function i(e) {return void 0 !== e;}function r(e) {return void 0 === e || null === e;}function o(e) {return Array.isArray(e);}function a(e) {return "function" == typeof e;}function s(e) {return Object(e) === e && "[object Object]" === String(e) && !a(e) && !o(e);}function u(e) {return "number" == typeof e;}function c(e) {return !o(e) && e - I()(e) + 1 >= 0;}function f(e) {return B()(e);}function l(e) {return o(e) ? 0 === e.length : s(e) ? 0 === D()(e).length : !e;}function d(e) {return e instanceof Event || (e && e.originalEvent) instanceof Event;}function h(e) {return e instanceof Blob;}function v(e) {return h(e) && m(e.name);}function p(e) {return "[object Date]" === Object.prototype.toString.call(e);}function m(e) {return "string" == typeof e || e instanceof String;}function y(e) {return "boolean" == typeof e;}function g(e) {return !!e && ("object" === (void 0 === e ? "undefined" : R()(e)) || "function" == typeof e) && "function" == typeof e.then;}function b(e) {return r(e) || y(e) || m(e) || u(e);}function _(e) {return m(e) && !!e.match(/^((https?|ftp|rtsp|mms):\/\/)(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}|localhost)(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/i);}function w(e) {return !!("object" === ("undefined" == typeof Node ? "undefined" : R()(Node)) ? e instanceof Node : e && "object" === (void 0 === e ? "undefined" : R()(e)) && "number" == typeof e.nodeType && "string" == typeof e.nodeName);}function k(e) {return !!("object" === ("undefined" == typeof HTMLElement ? "undefined" : R()(HTMLElement)) ? e instanceof HTMLElement : e && "object" === (void 0 === e ? "undefined" : R()(e)) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName);}function S(e, t) {return !(!w(e) || !w(t)) && t.parentNode === e;}function E(e, t) {if (!w(e) || !w(t)) return !1;for (; t.parentNode;) {if ((t = t.parentNode) === e) return !0;}return !1;}function x(e) {return /<[^>]+?>/.test(e);}function T(e) {return e instanceof Error;}function O(e) {return e instanceof RegExp;}n.d(t, "a", function () {return i;}), n.d(t, "y", function () {return r;}), n.d(t, "b", function () {return o;}), n.d(t, "l", function () {return a;}), n.d(t, "r", function () {return s;}), n.d(t, "p", function () {return u;}), n.d(t, "q", function () {return c;}), n.d(t, "n", function () {return f;}), n.d(t, "h", function () {return l;}), n.d(t, "j", function () {return d;}), n.d(t, "c", function () {return h;}), n.d(t, "k", function () {return v;}), n.d(t, "f", function () {return p;}), n.d(t, "w", function () {return m;}), n.d(t, "d", function () {return y;}), n.d(t, "u", function () {return g;}), n.d(t, "t", function () {return b;}), n.d(t, "x", function () {return _;}), n.d(t, "o", function () {return w;}), n.d(t, "g", function () {return k;}), n.d(t, "e", function () {return S;}), n.d(t, "s", function () {return E;}), n.d(t, "m", function () {return x;}), n.d(t, "i", function () {return T;}), n.d(t, "v", function () {return O;});var A = n(28),R = n.n(A),M = n(57),D = n.n(M),C = n(113),B = n.n(C),L = n(117),I = n.n(L);}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t.ERRORNO = { NET_ERROR: 100, CODEC_ERROR: 101, CANNOT_SEEK: 102, ENDOFSTREAM_ERROR: 103, MEDIASOURCE_ERROR: 104, SOURCEBUFFER_ERROR: 105, SBABORT_ERROR: 106, APPENDBUFFER_ERROR: 107 };}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t.PLAYER_EVENTS = { LOADER_OPEN: "loader-open", LOADER_CHUNK_ARRIVAL: "loader-chunk-arrival", MEDIA_DEMUX_FLV: "media-demux-flv", MEDIA_SEGMENT_INIT: "media-segment-init", MEDIA_INFO: "media-info", MEDIA_SEGMENT: "media-segment", PLAYING: "playing", CANPLAY: "canplay", TIMEUPDATE: "timeupdate" };}, function (e, t) {e.exports = !0;}, function (e, t, n) {var i = n(23);e.exports = function (e, t, n) {if (i(e), void 0 === t) return e;switch (n) {case 1:return function (n) {return e.call(t, n);};case 2:return function (n, i) {return e.call(t, n, i);};case 3:return function (n, i, r) {return e.call(t, n, i, r);};}return function () {return e.apply(t, arguments);};};}, function (e, t) {e.exports = function (e, t) {return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };};}, function (e, t) {e.exports = {};}, function (e, t, n) {var i = n(50),r = n(37);e.exports = Object.keys || function (e) {return i(e, r);};}, function (e, t) {var n = {}.toString;e.exports = function (e) {return n.call(e).slice(8, -1);};}, function (e, t) {e.exports = function (e) {if (void 0 == e) throw TypeError("Can't call method on  " + e);return e;};}, function (e, t) {e.exports = function (e) {if ("function" != typeof e) throw TypeError(e + " is not a function!");return e;};}, function (e, t) {var n = 0,i = Math.random();e.exports = function (e) {return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + i).toString(36));};}, function (e, t, n) {var i = n(5).f,r = n(11),o = n(3)("toStringTag");e.exports = function (e, t, n) {e && !r(e = n ? e : e.prototype, o) && i(e, o, { configurable: !0, value: t });};}, function (e, t, n) {var i = n(22);e.exports = function (e) {return Object(i(e));};}, function (e, t) {t.f = {}.propertyIsEnumerable;}, function (e, t, n) {"use strict";function i(e) {return e && e.__esModule ? e : { default: e };}t.__esModule = !0;var r = n(80),o = i(r),a = n(91),s = i(a),u = "function" == typeof s.default && "symbol" == typeof o.default ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof s.default && e.constructor === s.default && e !== s.default.prototype ? "symbol" : typeof e;};t.default = "function" == typeof s.default && "symbol" === u(o.default) ? function (e) {return void 0 === e ? "undefined" : u(e);} : function (e) {return e && "function" == typeof s.default && e.constructor === s.default && e !== s.default.prototype ? "symbol" : void 0 === e ? "undefined" : u(e);};}, function (e, t, n) {"use strict";var i = n(82)(!0);n(47)(String, "String", function (e) {this._t = String(e), this._i = 0;}, function () {var e,t = this._t,n = this._i;return n >= t.length ? { value: void 0, done: !0 } : (e = i(t, n), this._i += e.length, { value: e, done: !1 });});}, function (e, t) {var n = Math.ceil,i = Math.floor;e.exports = function (e) {return isNaN(e = +e) ? 0 : (e > 0 ? i : n)(e);};}, function (e, t, n) {var i = n(7),r = n(1).document,o = i(r) && i(r.createElement);e.exports = function (e) {return o ? r.createElement(e) : {};};}, function (e, t, n) {var i = n(7);e.exports = function (e, t) {if (!i(e)) return e;var n, r;if (t && "function" == typeof (n = e.toString) && !i(r = n.call(e))) return r;if ("function" == typeof (n = e.valueOf) && !i(r = n.call(e))) return r;if (!t && "function" == typeof (n = e.toString) && !i(r = n.call(e))) return r;throw TypeError("Can't convert object to primitive value");};}, function (e, t, n) {var i = n(6),r = n(84),o = n(37),a = n(35)("IE_PROTO"),s = function s() {},_u = function u() {var e,t = n(31)("iframe"),i = o.length;for (t.style.display = "none", n(52).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object<\/script>"), e.close(), _u = e.F; i--;) {delete _u.prototype[o[i]];}return _u();};e.exports = Object.create || function (e, t) {var n;return null !== e ? (s.prototype = i(e), n = new s(), s.prototype = null, n[a] = e) : n = _u(), void 0 === t ? n : r(n, t);};}, function (e, t, n) {var i = n(30),r = Math.min;e.exports = function (e) {return e > 0 ? r(i(e), 9007199254740991) : 0;};}, function (e, t, n) {var i = n(36)("keys"),r = n(24);e.exports = function (e) {return i[e] || (i[e] = r(e));};}, function (e, t, n) {var i = n(0),r = n(1),o = r["__core-js_shared__"] || (r["__core-js_shared__"] = {});(e.exports = function (e, t) {return o[e] || (o[e] = void 0 !== t ? t : {});})("versions", []).push({ version: i.version, mode: n(16) ? "pure" : "global", copyright: "© 2018 Denis Pushkarev (zloirock.ru)" });}, function (e, t) {e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");}, function (e, t, n) {t.f = n(3);}, function (e, t, n) {var i = n(1),r = n(0),o = n(16),a = n(38),s = n(5).f;e.exports = function (e) {var t = r.Symbol || (r.Symbol = o ? {} : i.Symbol || {});"_" == e.charAt(0) || e in t || s(t, e, { value: a.f(e) });};}, function (e, t) {t.f = Object.getOwnPropertySymbols;}, function (e, t, n) {"use strict";t.__esModule = !0, t.default = function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");};}, function (e, t, n) {"use strict";t.__esModule = !0;var i = n(101),r = function (e) {return e && e.__esModule ? e : { default: e };}(i);t.default = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), (0, r.default)(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}();}, function (e, t, n) {"use strict";function i(e, t) {if (!Object(f.w)(e)) throw new TypeError("Log's method only acccept string as argument, but not " + e + " in " + (void 0 === e ? "undefined" : c()(e)));return Object(f.w)(t) ? "[" + (e = l.FORCE_GLOBAL_TAG ? l.GLOBAL_TAG : e || l.GLOBAL_TAG) + "] > " + t : "[" + l.GLOBAL_TAG + "] > " + e;}Object.defineProperty(t, "__esModule", { value: !0 });var r = n(41),o = n.n(r),a = n(42),s = n.n(a),u = n(28),c = n.n(u),f = n(13),l = function () {function e() {o()(this, e);}return s()(e, null, [{ key: "error", value: function value(t, n) {e.ENABLE_ERROR && (console.error || console.warn || console.log).call(console, i(t, n));} }, { key: "info", value: function value(t, n) {e.ENABLE_INFO && (console.info || console.log).call(console, i(t, n));} }, { key: "warn", value: function value(t, n) {e.ENABLE_WARN && (console.warn || console.log).call(console, i(t, n));} }, { key: "debug", value: function value(t, n) {e.ENABLE_DEBUG && (console.debug || console.log).call(console, i(t, n));} }, { key: "verbose", value: function value(t, n) {e.ENABLE_VERBOSE && console.log(i(t, n), " at js_sdk\\chimee\\index.min.js:1");} }]), e;}();l.GLOBAL_TAG = "chimee", l.FORCE_GLOBAL_TAG = !1, l.ENABLE_ERROR = !0, l.ENABLE_INFO = !0, l.ENABLE_WARN = !0, l.ENABLE_DEBUG = !0, l.ENABLE_VERBOSE = !0, t.default = l;}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var r = function e(t) {i(this, e), this.type = t;};t.default = r;}, function (e, t, n) {e.exports = { default: n(144), __esModule: !0 };}, function (e, t, n) {"use strict";function i(e) {var t, n;this.promise = new e(function (e, i) {if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");t = e, n = i;}), this.resolve = r(t), this.reject = r(n);}var r = n(23);e.exports.f = function (e) {return new i(e);};}, function (e, t, n) {"use strict";var i = n(16),r = n(2),o = n(49),a = n(9),s = n(19),u = n(83),c = n(25),f = n(87),l = n(3)("iterator"),d = !([].keys && "next" in [].keys()),h = function h() {return this;};e.exports = function (e, t, n, v, p, m, y) {u(n, t, v);var g,b,_,w = function w(e) {if (!d && e in x) return x[e];switch (e) {case "keys":case "values":return function () {return new n(this, e);};}return function () {return new n(this, e);};},k = t + " Iterator",S = "values" == p,E = !1,x = e.prototype,T = x[l] || x["@@iterator"] || p && x[p],O = T || w(p),A = p ? S ? w("entries") : O : void 0,R = "Array" == t ? x.entries || T : T;if (R && (_ = f(R.call(new e()))) !== Object.prototype && _.next && (c(_, k, !0), i || "function" == typeof _[l] || a(_, l, h)), S && T && "values" !== T.name && (E = !0, O = function O() {return T.call(this);}), i && !y || !d && !E && x[l] || a(x, l, O), s[t] = O, s[k] = h, p) if (g = { values: S ? O : w("values"), keys: m ? O : w("keys"), entries: A }, y) for (b in g) {b in x || o(x, b, g[b]);} else r(r.P + r.F * (d || E), t, g);return g;};}, function (e, t, n) {e.exports = !n(8) && !n(10)(function () {return 7 != Object.defineProperty(n(31)("div"), "a", { get: function get() {return 7;} }).a;});}, function (e, t, n) {e.exports = n(9);}, function (e, t, n) {var i = n(11),r = n(12),o = n(85)(!1),a = n(35)("IE_PROTO");e.exports = function (e, t) {var n,s = r(e),u = 0,c = [];for (n in s) {n != a && i(s, n) && c.push(n);}for (; t.length > u;) {i(s, n = t[u++]) && (~o(c, n) || c.push(n));}return c;};}, function (e, t, n) {var i = n(21);e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {return "String" == i(e) ? e.split("") : Object(e);};}, function (e, t, n) {var i = n(1).document;e.exports = i && i.documentElement;}, function (e, t, n) {n(88);for (var i = n(1), r = n(9), o = n(19), a = n(3)("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), u = 0; u < s.length; u++) {var c = s[u],f = i[c],l = f && f.prototype;l && !l[a] && r(l, a, c), o[c] = o.Array;}}, function (e, t, n) {var i = n(50),r = n(37).concat("length", "prototype");t.f = Object.getOwnPropertyNames || function (e) {return i(e, r);};}, function (e, t) {}, function (e, t, n) {e.exports = { default: n(104), __esModule: !0 };}, function (e, t, n) {e.exports = { default: n(110), __esModule: !0 };}, function (e, t) {e.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";}, function (e, t, n) {"use strict";function i(e) {return e && e.__esModule ? e : { default: e };}function r(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function o(e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}function a(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}Object.defineProperty(t, "__esModule", { value: !0 });var s = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),u = n(123),c = i(u),f = n(125),l = i(f),d = n(126),h = i(d),v = n(127),p = i(v),m = n(4),y = n(15),g = function (e) {function t(e) {r(this, t);var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return n.loader = null, n.config = {}, n.config = e || {}, n.bufferSize = 3145728, n.cacheBuffer = new ArrayBuffer(n.bufferSize), n.cacheRemain = 0, n.stashByteStart = 0, n.enableStash = !0, n.stashSize = n.config.stashSize || 393216, n.resumeFrom = 0, n.currentRange = {}, n.totalReceive = 0, n.seekPonit = void 0, n.timer = null, n.heartBeatInterval = null, n.preTotalReceive = 0, n.seekLock = !1, n.webSocketURLReg = /wss?:\/\/(.+?)/, n.selectLoader(), n.bindEvent(), n;}return a(t, e), s(t, [{ key: "selectLoader", value: function value() {var e = this.config,t = this.config.src;this.webSocketURLReg.test(t) ? this.loader = new h.default(t, e, this.queryHandle) : c.default.isSupport() ? this.loader = new c.default(t, e, this.queryHandle) : p.default.isSupport() ? this.loader = new p.default(t, e, this.queryHandle) : l.default.isSupport() && (this.loader = new l.default(t, e, this.queryHandle)), this.loader.arrivalDataCallback = this.onLoaderChunkArrival.bind(this);} }, { key: "bindEvent", value: function value() {var e = this;this.loader.on("end", function () {var t = e.cacheBuffer.slice(0, e.cacheRemain);e.arrivalDataCallback(t, e.stashByteStart), e.emit("end");}), ["error", "performance"].forEach(function (t) {e.loader.on(t, function (n) {e.emit(t, n.data);});});} }, { key: "unbindEvent", value: function value() {this.loader.off("end"), this.loader.off("error"), this.loader.off("performance");} }, { key: "onLoaderChunkArrival", value: function value(e, t, n) {if (void 0 === this.startReceiveTime && (this.startReceiveTime = Date.now()), (!this.seekLock || void 0 !== n) && (void 0 !== n && (this.seekPonit = n, this.seekLock = !1), this.arrivalDataCallback)) if (this.emit("player-event", { type: y.PLAYER_EVENTS.LOADER_CHUNK_ARRIVAL, byteLength: e.byteLength, ts: Date.now() }), this.totalReceive += e.byteLength, 0 === this.cacheRemain && 0 === this.stashByteStart && (this.stashByteStart = t), this.cacheRemain + e.byteLength <= this.stashSize) {var i = new Uint8Array(this.cacheBuffer, 0, this.stashSize);i.set(new Uint8Array(e), this.cacheRemain), this.cacheRemain += e.byteLength;} else {this.startReceiveTime && (this.emit("performance", { type: "first-flv-package-duration", value: Date.now() - this.startReceiveTime }), this.startReceiveTime = void 0);var r = new Uint8Array(this.cacheBuffer, 0, this.bufferSize);if (this.cacheRemain > 0) {var o = this.cacheBuffer.slice(0, this.cacheRemain),a = 0,s = Date.now();if (void 0 !== this.seekPonit ? (a = this.arrivalDataCallback(o, this.stashByteStart, this.seekPonit), this.seekPonit = void 0) : a = this.arrivalDataCallback(o, this.stashByteStart), this.emit("performance", { type: "first-flv-to-mp4", value: Date.now() - s }), a < o.byteLength) {if (a > 0) {var u = new Uint8Array(o, a);r.set(u, 0), this.cacheRemain = u.byteLength, this.stashByteStart += a;}} else this.cacheRemain = 0, this.stashByteStart += a;this.cacheRemain + e.byteLength > this.bufferSize && (this.expandBuffer(this.cacheRemain + e.byteLength), r = new Uint8Array(this.cacheBuffer, 0, this.bufferSize)), r.set(new Uint8Array(e), this.cacheRemain), this.cacheRemain += e.byteLength;} else {var c = 0,f = Date.now();if (void 0 !== this.seekPonit ? (c = this.arrivalDataCallback(e, t, this.seekPonit), this.seekPonit = void 0) : c = this.arrivalDataCallback(e, t), this.emit("performance", { type: "first-flv-to-mp4", value: Date.now() - f }), c < e.byteLength) {var l = e.byteLength - c;l > this.bufferSize && (this.expandBuffer(l), r = new Uint8Array(this.cacheBuffer, 0, this.bufferSize)), r.set(new Uint8Array(e, c), 0), this.cacheRemain += l, this.stashByteStart = t + c;}}}} }, { key: "initCacheBuffer", value: function value() {this.cacheRemain = 0, this.totalReceive = 0, this.cacheBuffer = new ArrayBuffer(this.bufferSize);} }, { key: "expandBuffer", value: function value(e) {var t = this.bufferSize;t < e && (t = e), this.cacheBuffer = new ArrayBuffer(t), this.bufferSize = t;} }, { key: "pause", value: function value() {this.loader.pause();} }, { key: "open", value: function value(e, t) {this.emit("player-event", { type: y.PLAYER_EVENTS.LOADER_OPEN, ts: Date.now() }), this.loader.open({ from: e || 0, to: -1 }, t), this.heartbeat();} }, { key: "heartbeat", value: function value() {var e = this;clearInterval(this.heartBeatInterval), this.heartBeatInterval = setInterval(function () {e.emit("heartbeat", { speed: e.totalReceive - e.preTotalReceive, totalReceive: e.totalReceive }), e.preTotalReceive = e.totalReceive;}, 1e3);} }, { key: "resume", value: function value() {this.paused = !1;var e = this.totalReceive;this.open(e);} }, { key: "seek", value: function value(e, t, n) {this.seekLock = !0, this.totalReceive = e, this.preTotalReceive = e, this.initCacheBuffer(), this.cacheRemain = 0, this.stashByteStart = 0, this.open(e, n);} }, { key: "destroy", value: function value() {this.pause(), this.initCacheBuffer(), window.clearInterval(this.heartBeatInterval), this.heartBeatInterval = null, this.unbindEvent();} }]), t;}(m.CustEvent);t.default = g;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function (e) {var t = {},n = void 0;return n = -1 !== e.to ? "bytes=" + e.from.toString() + "-" + e.to.toString() : "bytes=" + e.from.toString() + "-", t.Range = n, { headers: t };};}, function (e, t, n) {"use strict";function i(e) {return e && e.__esModule ? e : { default: e };}function r(e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}function o(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}function a(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var s = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),u = n(129),c = i(u),f = n(62),l = i(f),d = n(64),h = i(d),v = n(135),p = i(v),m = n(4),y = n(44),g = (i(y), function () {function e(t) {a(this, e), h.default.init(), this._config = t, this.onInitSegment = null, this.onMediaSegment = null, this.onMediaInfo = null, this.seekCallBack = null, this._onCdnDropFrame = null, this.loadmetadata = !1, this.ftyp_moov = null, this._tagdemux = new l.default(), this._flvparse = new c.default(), this.ftyp_moov_v = null, this.ftyp_moov_a = null, this.metaSuccRun = !1, this.metas = [], this.parseChunk = null, this.hasVideo = !1, this.hasAudio = !1, this._error = null, this._pendingResolveSeekPoint = -1, this._tempBaseTime = 0, this.setflvBase = this.setflvBasefrist, this._tagdemux._onTrackMetadata = this.Metadata.bind(this), this._tagdemux._onMediaInfo = this.metaSucc.bind(this), this._tagdemux._onDataAvailable = this.onDataAvailable.bind(this), this._tagdemux._onError = this.error.bind(this), this._tagdemux._onCdnDropFrame = this.onCdnDropFrame.bind(this), this.m4mof = new p.default(this._config), this.m4mof.onMediaSegment = this.onMdiaSegment.bind(this);}return s(e, [{ key: "seek", value: function value(e) {this._flvparse.dispose(), this.setflvBase = this.setflvBasefrist, void 0 != e && 0 != e || (e = 0, this._pendingResolveSeekPoint = -1), this._tempBaseTime != e && (this._tempBaseTime = e, this._tagdemux._timestampBase = e, this.m4mof.seek(e), this.m4mof.insertDiscontinuity(), this._pendingResolveSeekPoint = e);} }, { key: "setflvBasefrist", value: function value(e, t) {var n = 0;try {n = this._flvparse.setFlv(new Uint8Array(e));} catch (e) {this.error(e);}if (0 == this._flvparse.arrTag.length) return n;if (this._flvparse.arrTag.length > 0) {this._tagdemux.hasAudio = this.hasAudio = this._flvparse._hasAudio, this._tagdemux.hasVideo = this.hasVideo = this._flvparse._hasVideo, 0 != this._tempBaseTime && this._tempBaseTime == this._flvparse.arrTag[0].getTime() && (this._tagdemux._timestampBase = 0);try {this._tagdemux.moofTag(this._flvparse.arrTag);} catch (e) {this.error(e);}this.setflvBase = this.setflvBaseUsually;}return n;} }, { key: "setflvBaseUsually", value: function value(e, t) {var n = 0;try {n = this._flvparse.setFlv(new Uint8Array(e));} catch (e) {this.error(e);}if (this._flvparse.arrTag.length > 0) try {this._tagdemux.moofTag(this._flvparse.arrTag);} catch (e) {this.error(e);}return n;} }, { key: "onMdiaSegment", value: function value(e, t) {if (this.onMediaSegment && this.onMediaSegment(e, new Uint8Array(t.data)), -1 != this._pendingResolveSeekPoint && "video" == e) {var n = this._pendingResolveSeekPoint;this._pendingResolveSeekPoint = -1, this.seekCallBack && this.seekCallBack(n);}} }, { key: "Metadata", value: function value(e, t) {switch (e) {case "video":if (this.metas.push(["video", t]), this.m4mof._videoMeta = t, this.hasVideo && !this.hasAudio) return void this.metaSucc();break;case "audio":if (this.metas.push(["audio", t]), this.m4mof._audioMeta = t, !this.hasVideo && this.hasAudio) return void this.metaSucc();}this.hasVideo && this.hasAudio && this.m4mof._videoMeta && this.m4mof._audioMeta && this.metaSucc();} }, { key: "metaSucc", value: function value(e) {var t = this;if (this.onMediaInfo && e && this.onMediaInfo(e || this._tagdemux._mediaInfo, { hasAudio: this.hasAudio, hasVideo: this.hasVideo }), 0 == this.metas.length) return void (this.metaSuccRun = !0);e || (this.metas.length > 1 ? this.metas.map(function (e) {"video" == e[0] ? t.ftyp_moov_v = h.default.generateInitSegment([e[1]]) : t.ftyp_moov_a = h.default.generateInitSegment([e[1]]);}) : this.ftyp_moov = h.default.generateInitSegment([this.metas[0][1]]), this.onInitSegment && 0 == this.loadmetadata && (this.ftyp_moov ? this.onInitSegment(this.ftyp_moov) : this.onInitSegment(this.ftyp_moov_v, this.ftyp_moov_a), this.loadmetadata = !0));} }, { key: "onDataAvailable", value: function value(e, t) {try {this.m4mof.remux(e, t);} catch (e) {this.error(e);}} }, { key: "onCdnDropFrame", value: function value(e) {this._onCdnDropFrame && this._onCdnDropFrame(e);} }, { key: "setflv", value: function value(e, t) {return this.setflvBase(e, t);} }, { key: "setflvloc", value: function value(e) {c.default.setFlv(new Uint8Array(e));if (c.default.arrTag.length > 0) return c.default.arrTag;} }, { key: "error", value: function value(e) {this._error && this._error(e);} }]), e;}()),b = function (e) {function t(e) {a(this, t);var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return n.f2m = new g(e), n.f2m._error = n.error.bind(n), n._onInitSegment = null, n._onMediaSegment = null, n._onMediaInfo = null, n._seekCallBack = null, n;}return o(t, e), s(t, [{ key: "error", value: function value(e) {this.emit("error", e.type);} }, { key: "seek", value: function value(e) {this.f2m.seek(e);} }, { key: "setflv", value: function value(e) {return this.f2m.setflv(e, 0);} }, { key: "setflvloc", value: function value(e) {return this.f2m.setflvloc(e);} }, { key: "onInitSegment", set: function set(e) {this._onInitSegment = e, this.f2m.onInitSegment = e;} }, { key: "onMediaSegment", set: function set(e) {this._onMediaSegment = e, this.f2m.onMediaSegment = e;} }, { key: "onMediaInfo", set: function set(e) {this._onMediaInfo = e, this.f2m.onMediaInfo = e;} }, { key: "seekCallBack", set: function set(e) {this._seekCallBack = e, this.f2m.seekCallBack = e;} }, { key: "onCdnDropFrame", set: function set(e) {console.log("set fun", " at js_sdk\\chimee\\index.min.js:1"), this.f2m._onCdnDropFrame = e;} }]), t;}(m.CustEvent);t.default = b;}, function (e, t, n) {"use strict";function i(e) {return e && e.__esModule ? e : { default: e };}function r(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;},a = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),s = n(131),u = i(s),c = n(134),f = i(c),l = n(63),d = i(l),h = n(44),v = i(h),p = function () {function e() {r(this, e), this.TAG = this.constructor.name, this._config = {}, this._onError = null, this._onMediaInfo = null, this._onTrackMetadata = null, this._onDataAvailable = null, this._onCdnDropFrame = null, this._dataOffset = 0, this._firstParse = !0, this._dispatch = !1, this._hasAudio = !1, this._hasVideo = !1, this._audioInitialMetadataDispatched = !1, this._videoInitialMetadataDispatched = !1, this._mediaInfo = new f.default(), this._mediaInfo.hasAudio = this._hasAudio, this._mediaInfo.hasVideo = this._hasVideo, this._metadata = null, this._audioMetadata = null, this._videoMetadata = null, this._naluLengthSize = 4, this._timestampBase = 0, this._timescale = 1e3, this._duration = 0, this._durationOverrided = !1, this._referenceFrameRate = { fixed: !0, fps: 23.976, fps_num: 23976, fps_den: 1e3 }, this._videoTrack = { type: "video", id: 1, sequenceNumber: 0, addcoefficient: 2, samples: [], length: 0 }, this._audioTrack = { type: "audio", id: 2, sequenceNumber: 0, addcoefficient: 2, samples: [], length: 0 }, this._littleEndian = function () {var e = new ArrayBuffer(2);return new DataView(e).setInt16(0, 256, !0), 256 === new Int16Array(e)[0];}(), this._timeInfo = { aacFirstDts: 0, aacCurrentDtsOffset: 0, aacCurrentFixedLen: 0, aacFixedRecord: [], avcSampleDuration: 40, avcLastDts: 0, avcLastPts: 0 };}return a(e, [{ key: "onMediaInfo", value: function value(e) {this._onMediaInfo = e;} }, { key: "parseFirstTimeStamp", value: function value(e) {this._mediaInfo.beginTimeStamp || (this._mediaInfo.beginTimeStamp = e.getTime(), this._mediaInfo.audioCodec && this._mediaInfo.videoCodec && this._onMediaInfo(this._mediaInfo));} }, { key: "parseMetadata", value: function value(e) {var t = u.default.parseMetadata(e);this._mediaInfo.metadata && (this._mediaInfo.metadata = t.onMetaData, this._onMediaInfo(this._mediaInfo)), this._parseScriptData(t);} }, { key: "_parseScriptData", value: function value(e) {var t = e;if (t.hasOwnProperty("onMetaData")) {this._metadata, this._metadata = t;var n = this._metadata.onMetaData;if ("boolean" == typeof n.hasAudio && (this._hasAudio = n.hasAudio, this._mediaInfo.hasAudio = this._hasAudio), "boolean" == typeof n.hasVideo && (this._hasVideo = n.hasVideo, this._mediaInfo.hasVideo = this._hasVideo), "number" == typeof n.audiodatarate && (this._mediaInfo.audioDataRate = n.audiodatarate), "number" == typeof n.videodatarate && (this._mediaInfo.videoDataRate = n.videodatarate), "number" == typeof n.width && (this._mediaInfo.width = n.width), "number" == typeof n.height && (this._mediaInfo.height = n.height), "number" == typeof n.duration) {if (!this._durationOverrided) {var i = Math.floor(n.duration * this._timescale);this._duration = i, this._mediaInfo.duration = i;}} else this._mediaInfo.duration = 0;if ("number" == typeof n.framerate) {var r = Math.floor(1e3 * n.framerate);if (r > 0) {var a = r / 1e3;this._referenceFrameRate.fixed = !0, this._referenceFrameRate.fps = a, this._referenceFrameRate.fps_num = r, this._referenceFrameRate.fps_den = 1e3, this._mediaInfo.fps = a, this._timeInfo.avcSampleDuration = Math.ceil(1e3 / this._mediaInfo.fps) || 40;}}if ("object" === o(n.keyframes)) {this._mediaInfo.hasKeyframesIndex = !0;var s = n.keyframes;s.times = n.times, s.filepositions = n.filepositions, this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(s), n.keyframes = null;} else this._mediaInfo.hasKeyframesIndex = !1;return this._dispatch = !1, this._mediaInfo.metadata = n, console.log(this.TAG, "Parsed onMetaData", " at js_sdk\\chimee\\index.min.js:1"), this._mediaInfo;}} }, { key: "_parseKeyframesIndex", value: function value(e) {for (var t = [], n = [], i = 1; i < e.times.length; i++) {var r = this._timestampBase + Math.floor(1e3 * e.times[i]);t.push(r), n.push(e.filepositions[i]);}return { times: t, filepositions: n };} }, { key: "moofTag", value: function value(e) {for (var t = 0; t < e.length; t++) {this._dispatch = !0, this.parseChunks(e[t]);}this._isInitialMetadataDispatched() && this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack);} }, { key: "parseChunks", value: function value(e) {switch (e.tagType) {case 8:this._parseAudioData(e.body.buffer, 0, e.body.length, e.getTime()), this.parseFirstTimeStamp(e);break;case 9:this._parseVideoData(e.body.buffer, 0, e.body.length, e.getTime(), 0), this.parseFirstTimeStamp(e);break;case 18:this.parseMetadata(e.body);}} }, { key: "_parseVideoData", value: function value(e, t, n, i, r) {if (i == this._timestampBase && 0 != this._timestampBase) throw new v.default(i, this._timestampBase, "夭寿啦这个视频不是从0开始");if (n <= 1) return void console.log(this.TAG, "Flv: Invalid video packet, missing VideoData payload!", " at js_sdk\\chimee\\index.min.js:1");var o = new Uint8Array(e, t, n)[0],a = (240 & o) >>> 4,s = 15 & o;if (7 !== s) return void (this._onError && this._onError("Flv: Unsupported codec in video frame: " + s));this._parseAVCVideoPacket(e, t + 1, n - 1, i, r, a);} }, { key: "_parseAVCVideoPacket", value: function value(e, t, n, i, r, o) {if (n < 4) return void console.log(this.TAG, "Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime", " at js_sdk\\chimee\\index.min.js:1");var a = this._littleEndian,s = new DataView(e, t, n),u = s.getUint8(0),c = 16777215 & s.getUint32(0, !a);if (0 === u) this._parseAVCDecoderConfigurationRecord(e, t + 4, n - 4);else if (1 === u) this._parseAVCVideoData(e, t + 4, n - 4, i, r, o, c);else if (2 !== u) return void this._onError("Flv: Invalid video packet type " + u);} }, { key: "_parseAVCDecoderConfigurationRecord", value: function value(e, t, n) {if (n < 7) return void console.log(this.TAG, "Flv: Invalid AVCDecoderConfigurationRecord, lack of data!", " at js_sdk\\chimee\\index.min.js:1");var i = this._videoMetadata,r = this._videoTrack,o = this._littleEndian,a = new DataView(e, t, n);i ? void 0 !== i.avcc && console.log(this.TAG, "Found another AVCDecoderConfigurationRecord!", " at js_sdk\\chimee\\index.min.js:1") : (i = this._videoMetadata = {}, i.type = "video", i.id = r.id, i.timescale = this._timescale, i.duration = this._duration);var s = a.getUint8(0),u = a.getUint8(1);a.getUint8(2), a.getUint8(3);if (1 !== s || 0 === u) return void this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord");if (this._naluLengthSize = 1 + (3 & a.getUint8(4)), 3 !== this._naluLengthSize && 4 !== this._naluLengthSize) return void this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: " + (this._naluLengthSize - 1));var c = 31 & a.getUint8(5);if (0 === c || c > 1) return void this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Invalid H264 SPS count: " + c);for (var f = 6, l = 0; l < c; l++) {var h = a.getUint16(f, !o);if (f += 2, 0 !== h) {var v = new Uint8Array(e, t + f, h);f += h;var p = d.default.parseSPS(v);i.codecWidth = p.codec_size.width, i.codecHeight = p.codec_size.height, i.presentWidth = p.present_size.width, i.presentHeight = p.present_size.height, i.config = p, i.profile = p.profile_string, i.level = p.level_string, i.bitDepth = p.bit_depth, i.chromaFormat = p.chroma_format, i.sarRatio = p.sar_ratio, i.frameRate = p.frame_rate, !1 !== p.frame_rate.fixed && 0 !== p.frame_rate.fps_num && 0 !== p.frame_rate.fps_den || (i.frameRate = this._referenceFrameRate);var m = i.frameRate.fps_den,y = i.frameRate.fps_num;i.refSampleDuration = Math.floor(i.timescale * (m / y));for (var g = v.subarray(1, 4), b = "avc1.", _ = 0; _ < 3; _++) {var w = g[_].toString(16);w.length < 2 && (w = "0" + w), b += w;}i.codec = b;var k = this._mediaInfo;k.width = i.codecWidth, k.height = i.codecHeight, k.fps = i.frameRate.fps, k.profile = i.profile, k.level = i.level, k.chromaFormat = p.chroma_format_string, k.sarNum = i.sarRatio.width, k.sarDen = i.sarRatio.height, k.videoCodec = b, k.meta = i, k.hasAudio ? null != k.audioCodec && (k.mimeType = 'video/x-flv; codecs="' + k.videoCodec + "," + k.audioCodec + '"') : k.mimeType = 'video/x-flv; codecs="' + k.videoCodec + '"', k.isComplete() && this._onMediaInfo(k);}}var S = a.getUint8(f);if (0 === S || S > 1) return void this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Invalid H264 PPS count: " + S);f++;for (var E = 0; E < S; E++) {var x = a.getUint16(f, !o);f += 2, 0 !== x && (f += x);}i.avcc = new Uint8Array(n), i.avcc.set(new Uint8Array(e, t, n), 0), console.log(this.TAG, "Parsed AVCDecoderConfigurationRecord", " at js_sdk\\chimee\\index.min.js:1"), this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._videoInitialMetadataDispatched = !0, this._dispatch = !1, this._onTrackMetadata("video", i);} }, { key: "timestampBase", value: function value(e) {this._timestampBase = e;} }, { key: "_parseAVCVideoData", value: function value(e, t, n, i, r, o, a) {for (var s = this._littleEndian, u = new DataView(e, t, n), c = [], f = 0, l = 0, d = this._naluLengthSize, h = this._timestampBase + i, v = 1 === o, p = h, m = 0; m < this._timeInfo.aacFixedRecord.length; m++) {if (h > this._timeInfo.aacFixedRecord[m].ed) {this._timeInfo.aacFixedRecord.splice(0, m);break;}}if (this._timeInfo.avcLastDts && p - this._timeInfo.avcLastDts > this._timeInfo.avcSampleDuration) {for (var y = !1, g = 0; g < this._timeInfo.aacFixedRecord.length; g++) {if (p >= this._timeInfo.aacFixedRecord[g].st && p <= this._timeInfo.aacFixedRecord[g].ed) {p -= this._timeInfo.aacFixedRecord[g].fix, y = !0, this._timeInfo.aacFixedRecord[g].ed == Number.POSITIVE_INFINITY && p - this._timeInfo.avcLastDts > this._timeInfo.avcSampleDuration && (y = !1);break;}}y || (p = this._timeInfo.avcLastDts + this._timeInfo.avcSampleDuration), p <= this._timeInfo.avcLastDts && (p = this._timeInfo.avcLastDts + 1);}for (var b = p + a; l < n;) {if (l + 4 >= n) {console.log(this.TAG, "Malformed Nalu near timestamp " + h + ", offset = " + l + ", dataSize = " + n, " at js_sdk\\chimee\\index.min.js:1");break;}var _ = u.getUint32(l, !s);if (3 === d && (_ >>>= 8), _ > n - d) return void console.log(this.TAG, "Malformed Nalus near timestamp " + h + ", NaluSize > DataSize!", " at js_sdk\\chimee\\index.min.js:1");var w = 31 & u.getUint8(l + d);5 === w && (v = !0);var k = new Uint8Array(e, t + l, d + _),S = { type: w, data: k };c.push(S), f += k.byteLength, l += d + _;}if (c.length) {var E = this._videoTrack,x = { units: c, length: f, isKeyframe: v, dts: p, cts: a, pts: b };v && (x.fileposition = r), E.samples.push(x), E.length += f;}this._timeInfo.avcLastDts = p;} }, { key: "_parseAudioData", value: function value(e, t, n, i) {if (i == this._timestampBase && 0 != this._timestampBase && console.log(i, this._timestampBase, "夭寿啦这个视频不是从0开始", " at js_sdk\\chimee\\index.min.js:1"), n <= 1) return void console.log(this.TAG, "Flv: Invalid audio packet, missing SoundData payload!", " at js_sdk\\chimee\\index.min.js:1");var r = this._audioMetadata,o = this._audioTrack;if (!r || !r.codec) {r = this._audioMetadata = {}, r.type = "audio", r.id = o.id, r.timescale = this._timescale, r.duration = this._duration;var a = (this._littleEndian, new DataView(e, t, n)),s = a.getUint8(0),u = s >>> 4;if (10 !== u) return void this._onError(DemuxErrors.CODEC_UNSUPPORTED, "Flv: Unsupported audio codec idx: " + u);var c = 0,f = (12 & s) >>> 2,l = [5500, 11025, 22050, 44100, 48e3];if (!(f < l.length)) return void this._onError(DemuxErrors.FORMAT_ERROR, "Flv: Invalid audio sample rate idx: " + f);c = l[f];var d = 1 & s;r.audioSampleRate = c, r.channelCount = 0 === d ? 1 : 2, r.refSampleDuration = Math.floor(1024 / r.audioSampleRate * r.timescale), r.codec = "mp4a.40.5";}var h = this._parseAACAudioData(e, t + 1, n - 1);if (void 0 != h) {if (0 === h.packetType) {r.config && console.log(this.TAG, "Found another AudioSpecificConfig!", " at js_sdk\\chimee\\index.min.js:1");var v = h.data;r.audioSampleRate = v.samplingRate, r.channelCount = v.channelCount, r.codec = v.codec, r.config = v.config, r.refSampleDuration = Math.floor(1024 / r.audioSampleRate * r.timescale), console.log(this.TAG, "Parsed AudioSpecificConfig", " at js_sdk\\chimee\\index.min.js:1"), this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._audioInitialMetadataDispatched = !0, this._dispatch = !1;var p = this._mediaInfo;return p.audioCodec = "mp4a.40." + v.originalAudioObjectType, p.audioSampleRate = r.audioSampleRate, p.audioChannelCount = r.channelCount, p.hasVideo ? null != p.videoCodec && (p.mimeType = 'video/x-flv; codecs="' + p.videoCodec + "," + p.audioCodec + '"') : p.mimeType = 'video/x-flv; codecs="' + p.audioCodec + '"', this._onTrackMetadata("audio", r), void (p.isComplete() && this._onMediaInfo(p));}if (1 === h.packetType) {var m = this._timestampBase + i;this._timeInfo.aacFirstDts || (this._timeInfo.aacFirstDts = m);var y = m - Math.floor(this._timeInfo.aacFirstDts + this._timeInfo.aacCurrentDtsOffset) - this._timeInfo.aacCurrentFixedLen;y > 1 && (this._timeInfo.aacCurrentFixedLen += y, this._timeInfo.aacFixedRecord.length && (this._timeInfo.aacFixedRecord[this._timeInfo.aacFixedRecord.length - 1].ed = m), this._timeInfo.aacFixedRecord.push({ st: m, fix: this._timeInfo.aacCurrentFixedLen, ed: Number.POSITIVE_INFINITY }), this._onCdnDropFrame && this._onCdnDropFrame(y));var g = 1024e3 / r.audioSampleRate,b = Math.floor(this._timeInfo.aacFirstDts + this._timeInfo.aacCurrentDtsOffset),_ = { unit: h.data, dts: b, pts: b, length: g };this._timeInfo.aacCurrentDtsOffset += g, o.samples.push(_), o.length += h.data.length;} else console.log(this.TAG, "Flv: Unsupported AAC data type " + h.packetType, " at js_sdk\\chimee\\index.min.js:1");}} }, { key: "_parseAACAudioData", value: function value(e, t, n) {if (n <= 1) return void console.log(this.TAG, "Flv: Invalid AAC packet, missing AACPacketType or/and Data!", " at js_sdk\\chimee\\index.min.js:1");var i = {},r = new Uint8Array(e, t, n);return i.packetType = r[0], 0 === r[0] ? i.data = this._parseAACAudioSpecificConfig(e, t + 1, n - 1) : i.data = r.subarray(1), i;} }, { key: "_parseAACAudioSpecificConfig", value: function value(e, t, n) {var i = new Uint8Array(e, t, n),r = null,o = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350],a = 0,s = 0,u = 0,c = null;if (a = s = i[0] >>> 3, (u = (7 & i[0]) << 1 | i[1] >>> 7) < 0 || u >= o.length) return void this._onError(DemuxErrors.FORMAT_ERROR, "Flv: AAC invalid sampling frequency index!");var f = o[u],l = (120 & i[1]) >>> 3;if (l < 0 || l >= 8) return void this._onError(DemuxErrors.FORMAT_ERROR, "Flv: AAC invalid channel configuration");5 === a && (c = (7 & i[1]) << 1 | i[2] >>> 7, i[2]);var d = self.navigator.userAgent.toLowerCase();return -1 !== d.indexOf("firefox") ? u >= 6 ? (a = 5, r = new Array(4), c = u - 3) : (a = 2, r = new Array(2), c = u) : -1 !== d.indexOf("android") ? (a = 2, r = new Array(2), c = u) : (a = 5, c = u, r = new Array(4), u >= 6 ? c = u - 3 : 1 === l && (a = 2, r = new Array(2), c = u)), r[0] = a << 3, r[0] |= (15 & u) >>> 1, r[1] = (15 & u) << 7, r[1] |= (15 & l) << 3, 5 === a && (r[1] |= (15 & c) >>> 1, r[2] = (1 & c) << 7, r[2] |= 8, r[3] = 0), { config: r, samplingRate: f, channelCount: l, codec: "mp4a.40." + a, originalAudioObjectType: s };} }, { key: "_isInitialMetadataDispatched", value: function value() {return this._hasAudio && this._hasVideo ? this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched : this._hasAudio && !this._hasVideo ? this._audioInitialMetadataDispatched : !this._hasAudio && this._hasVideo ? this._videoInitialMetadataDispatched : void 0;} }, { key: "hasAudio", set: function set(e) {this._mediaInfo.hasAudio = this._hasAudio = e;} }, { key: "hasVideo", set: function set(e) {this._mediaInfo.hasVideo = this._hasVideo = e;} }, { key: "onCdnDropFrame", set: function set(e) {this._onCdnDropFrame = e;} }]), e;}();t.default = p;}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),o = n(133),a = function (e) {return e && e.__esModule ? e : { default: e };}(o),s = function () {function e() {i(this, e);}return r(e, null, [{ key: "_ebsp2rbsp", value: function value(e) {for (var t = e, n = t.byteLength, i = new Uint8Array(n), r = 0, o = 0; o < n; o++) {o >= 2 && 3 === t[o] && 0 === t[o - 1] && 0 === t[o - 2] || (i[r] = t[o], r++);}return new Uint8Array(i.buffer, 0, r);} }, { key: "parseSPS", value: function value(t) {var n = e._ebsp2rbsp(t),i = new a.default(n);i.readByte();var r = i.readByte();i.readByte();var o = i.readByte();i.readUEG();var s = e.getProfileString(r),u = e.getLevelString(o),c = 1,f = 420,l = [0, 420, 422, 444],d = 8;if ((100 === r || 110 === r || 122 === r || 244 === r || 44 === r || 83 === r || 86 === r || 118 === r || 128 === r || 138 === r || 144 === r) && (c = i.readUEG(), 3 === c && i.readBits(1), c <= 3 && (f = l[c]), d = i.readUEG() + 8, i.readUEG(), i.readBits(1), i.readBool())) for (var h = 3 !== c ? 8 : 12, v = 0; v < h; v++) {i.readBool() && (v < 6 ? e._skipScalingList(i, 16) : e._skipScalingList(i, 64));}i.readUEG();var p = i.readUEG();if (0 === p) i.readUEG();else if (1 === p) {i.readBits(1), i.readSEG(), i.readSEG();for (var m = i.readUEG(), y = 0; y < m; y++) {i.readSEG();}}i.readUEG(), i.readBits(1);var g = i.readUEG(),b = i.readUEG(),_ = i.readBits(1);0 === _ && i.readBits(1), i.readBits(1);var w = 0,k = 0,S = 0,E = 0;i.readBool() && (w = i.readUEG(), k = i.readUEG(), S = i.readUEG(), E = i.readUEG());var x = 1,T = 1,O = 0,A = !0,R = 0,M = 0;if (i.readBool()) {if (i.readBool()) {var D = i.readByte(),C = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2],B = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];D > 0 && D < 16 ? (x = C[D - 1], T = B[D - 1]) : 255 === D && (x = i.readByte() << 8 | i.readByte(), T = i.readByte() << 8 | i.readByte());}if (i.readBool() && i.readBool(), i.readBool() && (i.readBits(4), i.readBool() && i.readBits(24)), i.readBool() && (i.readUEG(), i.readUEG()), i.readBool()) {var L = i.readBits(32),I = i.readBits(32);A = i.readBool(), R = I, M = 2 * L, O = R / M;}}var P = 1;1 === x && 1 === T || (P = x / T);var j = 0,N = 0;if (0 === c) j = 1, N = 2 - _;else {var U = 3 === c ? 1 : 2,F = 1 === c ? 2 : 1;j = U, N = F * (2 - _);}var V = 16 * (g + 1),z = 16 * (b + 1) * (2 - _);V -= (w + k) * j, z -= (S + E) * N;var G = Math.ceil(V * P);return i.destroy(), i = null, { profile_string: s, level_string: u, bit_depth: d, chroma_format: f, chroma_format_string: e.getChromaFormatString(f), frame_rate: { fixed: A, fps: O, fps_den: M, fps_num: R }, sar_ratio: { width: x, height: T }, codec_size: { width: V, height: z }, present_size: { width: G, height: z } };} }, { key: "_skipScalingList", value: function value(e, t) {for (var n = 8, i = 8, r = 0, o = 0; o < t; o++) {0 !== i && (r = e.readSEG(), i = (n + r + 256) % 256), n = 0 === i ? n : i;}} }, { key: "getProfileString", value: function value(e) {switch (e) {case 66:return "Baseline";case 77:return "Main";case 88:return "Extended";case 100:return "High";case 110:return "High10";case 122:return "High422";case 244:return "High444";default:return "Unknown";}} }, { key: "getLevelString", value: function value(e) {return (e / 10).toFixed(1);} }, { key: "getChromaFormatString", value: function value(e) {switch (e) {case 420:return "4:2:0";case 422:return "4:2:2";case 444:return "4:4:4";default:return "Unknown";}} }]), e;}();t.default = s;}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),o = function () {function e() {i(this, e);}return r(e, null, [{ key: "init", value: function value() {e.types = { avc1: [], avcC: [], btrt: [], dinf: [], dref: [], esds: [], ftyp: [], hdlr: [], mdat: [], mdhd: [], mdia: [], mfhd: [], minf: [], moof: [], moov: [], mp4a: [], mvex: [], mvhd: [], sdtp: [], stbl: [], stco: [], stsc: [], stsd: [], stsz: [], stts: [], tfdt: [], tfhd: [], traf: [], trak: [], trun: [], trex: [], tkhd: [], vmhd: [], smhd: [] };for (var t in e.types) {e.types.hasOwnProperty(t) && (e.types[t] = [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)]);}var n = e.constants = {};n.FTYP = new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]), n.STSD_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]), n.STTS = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), n.STSC = n.STCO = n.STTS, n.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), n.HDLR_VIDEO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]), n.HDLR_AUDIO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]), n.DREF = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]), n.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), n.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);} }, { key: "box", value: function value(e) {for (var t = 8, n = null, i = Array.prototype.slice.call(arguments, 1), r = i.length, o = 0; o < r; o++) {t += i[o].byteLength;}n = new Uint8Array(t), n[0] = t >>> 24 & 255, n[1] = t >>> 16 & 255, n[2] = t >>> 8 & 255, n[3] = 255 & t, n.set(e, 4);for (var a = 8, s = 0; s < r; s++) {n.set(i[s], a), a += i[s].byteLength;}return n;} }, { key: "generateInitSegment", value: function value(t) {t.constructor != Array && (t = [t]);var n = e.box(e.types.ftyp, e.constants.FTYP),i = e.moov(t),r = new Uint8Array(n.byteLength + i.byteLength);return r.set(n, 0), r.set(i, n.byteLength), r;} }, { key: "moov", value: function value(t) {var n = e.mvhd(t[0].timescale, t[0].duration),i = e.trak(t[0]),r = void 0;t.length > 1 && (r = e.trak(t[1]));var o = e.mvex(t);return t.length > 1 ? e.box(e.types.moov, n, i, r, o) : e.box(e.types.moov, n, i, o);} }, { key: "mvhd", value: function value(t, n) {return e.box(e.types.mvhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]));} }, { key: "trak", value: function value(t) {return e.box(e.types.trak, e.tkhd(t), e.mdia(t));} }, { key: "tkhd", value: function value(t) {var n = t.id,i = t.duration,r = t.presentWidth,o = t.presentHeight;return e.box(e.types.tkhd, new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, r >>> 8 & 255, 255 & r, 0, 0, o >>> 8 & 255, 255 & o, 0, 0]));} }, { key: "mdia", value: function value(t) {return e.box(e.types.mdia, e.mdhd(t), e.hdlr(t), e.minf(t));} }, { key: "mdhd", value: function value(t) {var n = t.timescale,i = t.duration;return e.box(e.types.mdhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 85, 196, 0, 0]));} }, { key: "hdlr", value: function value(t) {var n = null;return n = "audio" === t.type ? e.constants.HDLR_AUDIO : e.constants.HDLR_VIDEO, e.box(e.types.hdlr, n);} }, { key: "minf", value: function value(t) {var n = null;return n = "audio" === t.type ? e.box(e.types.smhd, e.constants.SMHD) : e.box(e.types.vmhd, e.constants.VMHD), e.box(e.types.minf, n, e.dinf(), e.stbl(t));} }, { key: "dinf", value: function value() {return e.box(e.types.dinf, e.box(e.types.dref, e.constants.DREF));} }, { key: "stbl", value: function value(t) {return e.box(e.types.stbl, e.stsd(t), e.box(e.types.stts, e.constants.STTS), e.box(e.types.stsc, e.constants.STSC), e.box(e.types.stsz, e.constants.STSZ), e.box(e.types.stco, e.constants.STCO));} }, { key: "stsd", value: function value(t) {return "audio" === t.type ? e.box(e.types.stsd, e.constants.STSD_PREFIX, e.mp4a(t)) : e.box(e.types.stsd, e.constants.STSD_PREFIX, e.avc1(t));} }, { key: "mp4a", value: function value(t) {var n = t.channelCount,i = t.audioSampleRate,r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, n, 0, 16, 0, 0, 0, 0, i >>> 8 & 255, 255 & i, 0, 0]);return e.box(e.types.mp4a, r, e.esds(t));} }, { key: "esds", value: function value(t) {var n = t.config,i = n.length,r = new Uint8Array([0, 0, 0, 0, 3, 23 + i, 0, 1, 0, 4, 15 + i, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([i]).concat(n).concat([6, 1, 2]));return e.box(e.types.esds, r);} }, { key: "avc1", value: function value(t) {var n = t.avcc,i = t.codecWidth,r = t.codecHeight,o = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 8 & 255, 255 & i, r >>> 8 & 255, 255 & r, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 4, 103, 49, 49, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);return e.box(e.types.avc1, o, e.box(e.types.avcC, n));} }, { key: "mvex", value: function value(t) {return t.length > 1 ? e.box(e.types.mvex, e.trex(t[0]), e.trex(t[1])) : e.box(e.types.mvex, e.trex(t[0]));} }, { key: "trex", value: function value(t) {var n = t.id,i = new Uint8Array([0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);return e.box(e.types.trex, i);} }, { key: "moof", value: function value(t, n) {return e.box(e.types.moof, e.mfhd(t.sequenceNumber), e.traf(t, n));} }, { key: "mfhd", value: function value(t) {var n = new Uint8Array([0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t]);return e.box(e.types.mfhd, n);} }, { key: "traf", value: function value(t, n) {var i = t.id,r = e.box(e.types.tfhd, new Uint8Array([0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i])),o = e.box(e.types.tfdt, new Uint8Array([0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n])),a = e.sdtp(t),s = e.trun(t, a.byteLength + 16 + 16 + 8 + 16 + 8 + 8);return e.box(e.types.traf, r, o, s, a);} }, { key: "sdtp", value: function value(t) {for (var n = t.samples || [], i = n.length, r = new Uint8Array(4 + i), o = 0; o < i; o++) {var a = n[o].flags;r[o + 4] = a.isLeading << 6 | a.dependsOn << 4 | a.isDependedOn << 2 | a.hasRedundancy;}return e.box(e.types.sdtp, r);} }, { key: "trun", value: function value(t, n) {var i = t.samples || [],r = i.length,o = 12 + 16 * r,a = new Uint8Array(o);n += 8 + o, a.set([0, 0, 15, 1, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n], 0);for (var s = 0; s < r; s++) {var u = i[s].duration,c = i[s].size,f = i[s].flags,l = i[s].cts;a.set([u >>> 24 & 255, u >>> 16 & 255, u >>> 8 & 255, 255 & u, c >>> 24 & 255, c >>> 16 & 255, c >>> 8 & 255, 255 & c, f.isLeading << 2 | f.dependsOn, f.isDependedOn << 6 | f.hasRedundancy << 4 | f.isNonSync, 0, 0, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l], 12 + 16 * s);}return e.box(e.types.trun, a);} }, { key: "mdat", value: function value(t) {return e.box(e.types.mdat, t);} }]), e;}();t.default = o;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var i = n(43),r = n(141),o = n.n(r);n.d(t, "Log", function () {return i.default;}), n.d(t, "UAParser", function () {return o.a;});var a = n(143);n.d(t, "genTraversalHandler", function () {return a.f;}), n.d(t, "deepClone", function () {return a.e;}), n.d(t, "deepAssign", function () {return a.d;}), n.d(t, "camelize", function () {return a.c;}), n.d(t, "hypenate", function () {return a.h;}), n.d(t, "bind", function () {return a.b;}), n.d(t, "uuid", function () {return a.j;}), n.d(t, "S4", function () {return a.a;}), n.d(t, "rand", function () {return a.i;}), n.d(t, "getDeepProperty", function () {return a.g;});var s = n(13);n.d(t, "defined", function () {return s.a;}), n.d(t, "isVoid", function () {return s.y;}), n.d(t, "isArray", function () {return s.b;}), n.d(t, "isFunction", function () {return s.l;}), n.d(t, "isObject", function () {return s.r;}), n.d(t, "isNumber", function () {return s.p;}), n.d(t, "isNumeric", function () {return s.q;}), n.d(t, "isInteger", function () {return s.n;}), n.d(t, "isEmpty", function () {return s.h;}), n.d(t, "isEvent", function () {return s.j;}), n.d(t, "isBlob", function () {return s.c;}), n.d(t, "isFile", function () {return s.k;}), n.d(t, "isDate", function () {return s.f;}), n.d(t, "isString", function () {return s.w;}), n.d(t, "isBoolean", function () {return s.d;}), n.d(t, "isPromise", function () {return s.u;}), n.d(t, "isPrimitive", function () {return s.t;}), n.d(t, "isUrl", function () {return s.x;}), n.d(t, "isNode", function () {return s.o;}), n.d(t, "isElement", function () {return s.g;}), n.d(t, "isChildNode", function () {return s.e;}), n.d(t, "isPosterityNode", function () {return s.s;}), n.d(t, "isHTMLString", function () {return s.m;}), n.d(t, "isError", function () {return s.i;}), n.d(t, "isRegExp", function () {return s.v;});var u = n(72);n.d(t, "inBrowser", function () {return u.h;}), n.d(t, "makeArray", function () {return u.i;}), n.d(t, "transObjectAttrIntoArray", function () {return u.p;}), n.d(t, "runRejectableQueue", function () {return u.k;}), n.d(t, "runStoppableQueue", function () {return u.l;}), n.d(t, "decodeUTF8", function () {return u.d;}), n.d(t, "debounce", function () {return u.c;}), n.d(t, "throttle", function () {return u.o;}), n.d(t, "raf", function () {return u.j;}), n.d(t, "caf", function () {return u.b;}), n.d(t, "strRepeat", function () {return u.n;}), n.d(t, "formatTime", function () {return u.f;}), n.d(t, "appendCSS", function () {return u.a;}), n.d(t, "formatDate", function () {return u.e;}), n.d(t, "getLocalStorage", function () {return u.g;}), n.d(t, "setLocalStorage", function () {return u.m;});var c = n(4);n.d(t, "emitEventCache", function () {return c.emitEventCache;}), n.d(t, "addEventCache", function () {return c.addEventCache;}), n.d(t, "removeEventCache", function () {return c.removeEventCache;}), n.d(t, "CustEvent", function () {return c.CustEvent;});var f = n(159);n.d(t, "getAttr", function () {return f.g;}), n.d(t, "setAttr", function () {return f.o;}), n.d(t, "addClassName", function () {return f.c;}), n.d(t, "removeClassName", function () {return f.k;}), n.d(t, "hasClassName", function () {return f.i;}), n.d(t, "supportsPassive", function () {return f.q;}), n.d(t, "removeEvent", function () {return f.n;}), n.d(t, "addEvent", function () {return f.e;}), n.d(t, "addDelegate", function () {return f.d;}), n.d(t, "removeDelegate", function () {return f.l;}), n.d(t, "getStyle", function () {return f.h;}), n.d(t, "setStyle", function () {return f.p;}), n.d(t, "query", function () {return f.j;}), n.d(t, "removeEl", function () {return f.m;}), n.d(t, "findParents", function () {return f.f;}), n.d(t, "NodeWrap", function () {return f.b;}), n.d(t, "$", function () {return f.a;});}, function (e, t, n) {"use strict";t.__esModule = !0;var i = n(45),r = function (e) {return e && e.__esModule ? e : { default: e };}(i);t.default = function (e) {if (Array.isArray(e)) {for (var t = 0, n = Array(e.length); t < e.length; t++) {n[t] = e[t];}return n;}return (0, r.default)(e);};}, function (e, t, n) {var i = n(6);e.exports = function (e, t, n, r) {try {return r ? t(i(n)[0], n[1]) : t(n);} catch (t) {var o = e.return;throw void 0 !== o && i(o.call(e)), t;}};}, function (e, t, n) {var i = n(19),r = n(3)("iterator"),o = Array.prototype;e.exports = function (e) {return void 0 !== e && (i.Array === e || o[r] === e);};}, function (e, t, n) {var i = n(70),r = n(3)("iterator"),o = n(19);e.exports = n(0).getIteratorMethod = function (e) {if (void 0 != e) return e[r] || e["@@iterator"] || o[i(e)];};}, function (e, t, n) {var i = n(21),r = n(3)("toStringTag"),o = "Arguments" == i(function () {return arguments;}()),a = function a(e, t) {try {return e[t];} catch (e) {}};e.exports = function (e) {var t, n, s;return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = a(t = Object(e), r)) ? n : o ? i(t) : "Object" == (s = i(t)) && "function" == typeof t.callee ? "Arguments" : s;};}, function (e, t, n) {var i = n(3)("iterator"),r = !1;try {var o = [7][i]();o.return = function () {r = !0;}, Array.from(o, function () {throw 2;});} catch (e) {}e.exports = function (e, t) {if (!t && !r) return !1;var n = !1;try {var o = [7],a = o[i]();a.next = function () {return { done: n = !0 };}, o[i] = function () {return a;}, e(o);} catch (e) {}return n;};}, function (e, t, n) {"use strict";function i(e) {return E()(e);}function r(e) {var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function (e, t) {return +e - +t;};return k()(e).sort(t).reduce(function (t, n) {return t.concat(e[n]);}, []);}function o(e) {for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) {n[i - 1] = arguments[i];}return new _.a(function (t, i) {!function r(o) {if (o >= e.length) return void t();var a = Object(x.l)(e[o]) ? e[o].apply(e, g()(n)) : e[o];return !1 === a ? i("stop") : _.a.resolve(a).then(function () {return r(o + 1);}).catch(function (e) {return i(e || "stop");});}(0);});}function a(e) {for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) {n[i - 1] = arguments[i];}return function t(i) {return i >= e.length || !1 !== (Object(x.l)(e[i]) ? e[i].apply(e, g()(n)) : e[i]) && t(++i);}(0);}function s(e, t, n) {var i = e;if (t + n < i.length) {for (; n--;) {if (128 != (192 & i[++t])) return !1;}return !0;}return !1;}function u(e) {for (var t = [], n = e, i = 0, r = e.length; i < r;) {if (n[i] < 128) t.push(String.fromCharCode(n[i])), ++i;else {if (n[i] < 192) ;else if (n[i] < 224) {if (s(n, i, 1)) {var o = (31 & n[i]) << 6 | 63 & n[i + 1];if (o >= 128) {t.push(String.fromCharCode(65535 & o)), i += 2;continue;}}} else if (n[i] < 240) {if (s(n, i, 2)) {var a = (15 & n[i]) << 12 | (63 & n[i + 1]) << 6 | 63 & n[i + 2];if (a >= 2048 && 55296 != (63488 & a)) {t.push(String.fromCharCode(65535 & a)), i += 3;continue;}}} else if (n[i] < 248 && s(n, i, 3)) {var u = (7 & n[i]) << 18 | (63 & n[i + 1]) << 12 | (63 & n[i + 2]) << 6 | 63 & n[i + 3];if (u > 65536 && u < 1114112) {u -= 65536, t.push(String.fromCharCode(u >>> 10 | 55296)), t.push(String.fromCharCode(1023 & u | 56320)), i += 4;continue;}}t.push(String.fromCharCode(65533)), ++i;}}return t.join("");}function c(e, t, n) {var i = void 0,r = void 0,o = void 0,a = void 0,s = void 0,u = function u() {var c = new Date() - a;c < t && c >= 0 ? i = setTimeout(u, t - c) : (i = null, n || (s = e.apply(o, r), i || (o = r = null)));};return function () {o = this, r = arguments, a = new Date();var c = n && !i;return i || (i = setTimeout(u, t)), c && (s = e.apply(o, r), o = r = null), s;};}function f(e, t, n, i) {var r = void 0,o = void 0,a = void 0,s = null,u = 0;n || (n = {});var c = function c() {u = !1 === n.leading ? 0 : new Date() - 0, s = null, a = e.apply(r, o), s || (r = o = null);};return t = t || 0, function () {var f = new Date();u || !1 !== n.leading || (u = f);var l = t - (f - u);return r = i || this, o = arguments, l <= 0 || l > t ? (s && (clearTimeout(s), s = null), u = f, a = e.apply(r, o), s || (r = o = null)) : s || !1 === n.trailing || (s = setTimeout(c, l)), a;};}function l(e, t) {var n = t;e = "" + (e || "");var i = e.length;return t = (t || i) - i, ((t > 0 ? e.repeat ? "0".repeat(t) : new Array(t + 1).join("0") : "") + e).slice(0, n);}function d(e) {var t = Math.floor(e / 3600);e = Math.floor(e % 3600);var n = l(Math.floor(e / 60), 2);e = Math.floor(e % 60);var i = l(e, 2);return t >= 1 ? t + ":" + n + ":" + i : n + ":" + i;}function h(e) {var t = document,n = t.querySelector("style");if (!n) {n = t.createElement("style");var i = t.querySelector("head");i && i.appendChild(n);}return n.appendChild(t.createTextNode(e)), n;}function v() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date(),t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd hh:mm:ss.i",n = e.getFullYear().toString(),i = { M: e.getMonth() + 1, d: e.getDate(), h: e.getHours(), m: e.getMinutes(), s: e.getSeconds(), i: e.getMilliseconds() };t = t.replace(/(y+)/gi, function (e, t) {return n.substr(4 - Math.min(4, t.length));});for (var r in i) {!function (e) {t = t.replace(new RegExp("(" + e + "+)", "g"), function (t, n) {return (i[e] < 10 && n.length > 1 ? "0" : "") + i[e];});}(r);}return t;}function p(e) {try {return window.localStorage.getItem(e);} catch (n) {try {var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));return Object(x.b)(t) ? unescape(t[2]) : "";} catch (e) {return "";}}}function m(e, t) {try {window.localStorage.setItem(e, t);} catch (i) {var n = new Date();n.setTime(n.getTime() + 2592e7);try {document.cookie = e + "=" + escape(t) + ";expires=" + n.toUTCString() + ";path=/;";} catch (e) {console.error(e, " at js_sdk\\chimee\\index.min.js:1");}}}n.d(t, "h", function () {return T;}), n.d(t, "i", function () {return i;}), n.d(t, "p", function () {return r;}), n.d(t, "k", function () {return o;}), n.d(t, "l", function () {return a;}), n.d(t, "d", function () {return u;}), n.d(t, "c", function () {return c;}), n.d(t, "o", function () {return f;}), n.d(t, "j", function () {return O;}), n.d(t, "b", function () {return A;}), n.d(t, "n", function () {return l;}), n.d(t, "f", function () {return d;}), n.d(t, "a", function () {return h;}), n.d(t, "e", function () {return v;}), n.d(t, "g", function () {return p;}), n.d(t, "m", function () {return m;});var y = n(66),g = n.n(y),b = n(147),_ = n.n(b),w = n(57),k = n.n(w),S = n(45),E = n.n(S),x = n(13),T = "undefined" != typeof window && "[object Object]" !== Object.prototype.toString.call(window),O = T && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame) || function (e) {return setTimeout(e, 17);},A = T && (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame) || function (e) {clearTimeout(e);};}, function (e, t, n) {var i = n(6),r = n(23),o = n(3)("species");e.exports = function (e, t) {var n,a = i(e).constructor;return void 0 === a || void 0 == (n = i(a)[o]) ? t : r(n);};}, function (e, t, n) {var i,r,o,a = n(17),s = n(152),u = n(52),c = n(31),f = n(1),l = f.process,d = f.setImmediate,h = f.clearImmediate,v = f.MessageChannel,p = f.Dispatch,m = 0,y = {},g = function g() {var e = +this;if (y.hasOwnProperty(e)) {var t = y[e];delete y[e], t();}},b = function b(e) {g.call(e.data);};d && h || (d = function d(e) {for (var t = [], n = 1; arguments.length > n;) {t.push(arguments[n++]);}return y[++m] = function () {s("function" == typeof e ? e : Function(e), t);}, i(m), m;}, h = function h(e) {delete y[e];}, "process" == n(21)(l) ? i = function i(e) {l.nextTick(a(g, e, 1));} : p && p.now ? i = function i(e) {p.now(a(g, e, 1));} : v ? (r = new v(), o = r.port2, r.port1.onmessage = b, i = a(o.postMessage, o, 1)) : f.addEventListener && "function" == typeof postMessage && !f.importScripts ? (i = function i(e) {f.postMessage(e + "", "*");}, f.addEventListener("message", b, !1)) : i = "onreadystatechange" in c("script") ? function (e) {u.appendChild(c("script")).onreadystatechange = function () {u.removeChild(this), g.call(e);};} : function (e) {setTimeout(a(g, e, 1), 0);}), e.exports = { set: d, clear: h };}, function (e, t) {e.exports = function (e) {try {return { e: !1, v: e() };} catch (e) {return { e: !0, v: e };}};}, function (e, t, n) {var i = n(6),r = n(7),o = n(46);e.exports = function (e, t) {if (i(e), r(t) && t.constructor === e) return t;var n = o.f(e);return (0, n.resolve)(t), n.promise;};}, function (e, t, n) {e.exports = n(78);}, function (e, t, n) {"use strict";function i(e) {return e && e.__esModule ? e : { default: e };}function r(e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}function o(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}function a(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var s = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),u = n(79),c = i(u),f = n(122),l = i(f),d = n(140),h = i(d),v = n(65),p = n(160),m = i(p),y = n(15),g = function () {function e(t) {a(this, e), this._resetForNewSession(t), this._resetForNewInterval();}return s(e, [{ key: "_resetForNewSession", value: function value(e) {this.currentPlaybackSpeed = 1, this.lastDownloadedBytes = 0, this.playUrl = e, this.domain = new URL(e).hostname, this.playStartTimestampMillis = new Date().getTime(), this.lastVideoBuffered = { start: -1e9, end: -1e9 };} }, { key: "_resetForNewInterval", value: function value() {this.currentPlaybackSpeedTimestamp = new Date().getTime(), this.playbackSpeedStat = { "0.75x": 0, "1.25x": 0, "1.5x": 0 }, this.statTimestampMillis = new Date().getTime(), this.bufferingCount = 0, this.bufferingDurationMillis = 0, this.bufferingStartTimestampMillis = this.bufferingStartTimestampMillis ? new Date().getTime() : null, this.downloadedBytes = 0, this.audioBufferedMillis = 0, this.videoBufferedMillis = 0, this.demuxedDurationSec = 0, this.excessiveDataDroppedSec = 0, this.blockCountWithBuffer = 0, this.bufferDuringBlockSum = 0;} }, { key: "videoBufferedUpdated", value: function value(e) {if (0 !== e.length) {var t = e.start(e.length - 1),n = e.end(e.length - 1);t > this.lastVideoBuffered.end + .001 ? (this.demuxedDurationSec += n - t, this.lastVideoBuffered = { start: t, end: n }) : (this.demuxedDurationSec += Math.max(0, n - this.lastVideoBuffered.end), this.lastVideoBuffered.end = n);}} }, { key: "playbackSpeedChanged", value: function value(e) {var t = new Date().getTime(),n = t - this.currentPlaybackSpeedTimestamp,i = Math.abs(e - .75) < .001 ? "0.75x" : Math.abs(e - 1.25) < .001 ? "1.25x" : Math.abs(e - 1.5) < .001 ? "1.5x" : null;i && (this.playbackSpeedStat[i] += n, this.currentPlaybackSpeedTimestamp = new Date().getTime());} }, { key: "bufferingStarted", value: function value(e) {++this.bufferingCount, this.bufferingStartTimestampMillis = new Date().getTime(), e > .3 && (this.bufferDuringBlockSum += e, this.blockCountWithBuffer++);} }, { key: "bufferingEnded", value: function value() {var e = new Date().getTime();null != this.bufferingStartTimestampMillis && (this.bufferingDurationMillis += e - this.bufferingStartTimestampMillis), this.bufferingStartTimestampMillis = null;} }, { key: "updateDownloadedBytes", value: function value(e) {var t = e - this.lastDownloadedBytes;this.downloadedBytes += t, this.lastDownloadedBytes = e;} }, { key: "setAudioBufferedSec", value: function value(e) {this.audioBufferedMillis = Math.round(1e3 * e);} }, { key: "setVideoBufferedSec", value: function value(e) {this.videoBufferedMillis = Math.round(1e3 * e);} }, { key: "excessiveDataDropped", value: function value(e) {this.excessiveDataDroppedSec += e;} }, { key: "buildAndStartNewInterval", value: function value() {var e = new Date().getTime(),t = null == this.bufferingStartTimestampMillis ? 0 : e - this.bufferingStartTimestampMillis,n = (this.bufferingStartTimestampMillis, { play_url: this.playUrl, domain: this.domain, play_start_time: this.playStartTimestampMillis, tick_start: this.statTimestampMillis, tick_duration: e - this.statTimestampMillis, block_count: this.bufferingCount, buffer_time: this.bufferingDurationMillis + t, kbytes_received: this.downloadedBytes >> 10, played_video_duration: e - this.statTimestampMillis - (this.bufferingDurationMillis + t), demuxed_video_duration: Math.round(1e3 * this.demuxedDurationSec), dropped_packet_duration: Math.round(1e3 * this.excessiveDataDroppedSec), a_buf_len: this.audioBufferedMillis, v_buf_len: this.videoBufferedMillis, speed_chg_metric: this.playbackSpeedStat, block_count_with_buffer: this.blockCountWithBuffer, buffer_during_block: this.blockCountWithBuffer > 0 ? Math.round(this.bufferDuringBlockSum / this.blockCountWithBuffer * 1e3) : 0 });return this._resetForNewInterval(), n;} }]), e;}(),b = function (e) {function t(e, n) {a(this, t);var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return i.tag = "flv-player", i.video = e, i.box = "flv", i.timer = null, i.seekTimer = null, i.checkBufferTimer = null, i.realtimeBeaconTimer = null, i.config = (0, v.deepAssign)({}, h.default, n), i.requestSetTime = !1, i.throttle = null, i.bindEvents(), i.attachMedia(), i.initLogger(), console.log("kernel", t.version, " at js_sdk\\chimee\\index.min.js:1"), i;}return o(t, e), s(t, null, [{ key: "isSupport", value: function value() {var e = new v.UAParser(),t = e.getBrowser();return !("Safari" === t.name && parseInt(t.major) < 10) && !(!window.MediaSource || !window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.640020,mp4a.40.2"'));} }, { key: "version", get: function get() {return "1.4.10";} }]), s(t, [{ key: "initLogger", value: function value() {var e = this;this.logger = new m.default(), this.logger.on("performance", function (t) {e.emit("performance", t.data);});} }, { key: "internalPropertyHandle", value: function value() {if (Object.getOwnPropertyDescriptor) {var e = this,t = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "currentTime");Object.defineProperty(this.video, "currentTime", { get: function get() {return t.get.call(e.video);}, set: function set(n) {if (e.currentTimeLock) return t.set.call(e.video, n);throw new Error("can not set currentTime by youself");} });}} }, { key: "bindEvents", value: function value() {this.video && (this._onVideoCanplay = this._onVideoCanplay.bind(this), this._onVideoWaiting = this._onVideoWaiting.bind(this), this._onVideoPlaying = this._onVideoPlaying.bind(this), this._onVideoTimeupdate = this._onVideoTimeupdate.bind(this), this.video.addEventListener("canplay", this._onVideoCanplay), this.video.addEventListener("waiting", this._onVideoWaiting), this.video.addEventListener("playing", this._onVideoPlaying), this.video.addEventListener("timeupdate", this._onVideoTimeupdate), this._lastBufferd = null, this.checkBufferTimer = setInterval(this._checkBuffer.bind(this), 200));} }, { key: "unbindMediaSourceEvent", value: function value(e) {e.off("error"), e.off("bufferFull"), e.off("updateend"), e.off("player-event");} }, { key: "attachMedia", value: function value() {var e = this;this.mediaSource = new c.default(this.video, this.config), this.mediaSource.on("error", function (t) {e.emit("error", t.data), e.transmuxer && e.transmuxer.pause();}), this.mediaSource.on("bufferFull", function () {e.pauseTransmuxer();}), this.mediaSource.on("updateend", function () {e.onmseUpdateEnd();}), this.mediaSource.on("player-event", function (t) {e.logger.record(t.data);});} }, { key: "load", value: function value(e) {e && (this.config.src = e), this.realtimeBeaconBuilder = new g(this.config.src), this.realtimeBeaconTimer = setInterval(this._sendRealtimeBeacon.bind(this), 1e4), this.transmuxer = new l.default(this.mediaSource, this.config, this.globalEvent), this.transmuxerEvent(this.transmuxer), this.transmuxer.loadSource();} }, { key: "unbindTransmuxerEvent", value: function value(e) {e.off("mediaSegment"), e.off("mediaSegmentInit"), e.off("error"), e.off("end"), e.off("heartbeat"), e.off("performance"), e.off("mediaInfo"), e.off("player-event");} }, { key: "transmuxerEvent", value: function value(e) {var t = this,n = this.mediaSource;e.on("mediaSegment", function (e) {n.emit("mediaSegment", e.data);}), e.on("mediaSegmentInit", function (e) {n.emit("mediaSegmentInit", e.data);}), e.on("error", function (i) {t.emit("error", i.data), e.pause(), n.pause();}), e.on("end", function (e) {n.endOfStream();}), e.on("heartbeat", function (e) {t.emit("heartbeat", e.data), t.realtimeBeaconBuilder.updateDownloadedBytes(e.data.totalReceive);}), e.on("performance", function (e) {var n = e.data,i = n.type,r = n.value;return "first-flv-to-mp4" === i ? (t.firstFlvToMp4 = t.firstFlvToMp4 || 0, void (t.firstFlvToMp4 += r)) : "receive-first-package-duration" === i ? (t.receiveFirstPAckageDuration = t.receiveFirstPAckageDuration || 0, void (t.receiveFirstPAckageDuration += r)) : void ("first-flv-package-duration" === i && (t.firstFlvPackageDuration = t.firstFlvPackageDuration || 0, t.firstFlvPackageDuration += r));}), e.on("mediaInfo", function (e) {t.mediaInfo ? t.emit("mediaInfo", e.data) : (t.mediaInfo = e, t.emit("mediaInfo", e.data), n.init(e.data), t.video.src = URL.createObjectURL(n.mediaSource), t.video.addEventListener("seeking", t._throttle.call(t)));}), e.on("player-event", function (e) {t.logger.record(e.data);});} }, { key: "_throttle", value: function value() {return this.throttle = (0, v.throttle)(this._seek.bind(this), 200, { leading: !1 }), this.throttle;} }, { key: "isTimeinBuffered", value: function value(e) {for (var t = this.video.buffered, n = 0; n < t.length; n++) {var i = t.start(n),r = t.end(n);if (e >= i && e < r) return !0;}return !1;} }, { key: "_getBufferEnd", value: function value(e, t) {for (var n = 0; n < e.length; n++) {var i = e.start(n),r = e.end(n);if (i <= t && t < r) return r;}} }, { key: "getCurrentBufferEnd", value: function value() {return this._getBufferEnd(this.video.buffered, this.video.currentTime);} }, { key: "_seek", value: function value(e) {var t = this;this.currentTimeLock = !0;var n = (0, v.isNumber)(e) && !isNaN(e) ? e : this.video.currentTime;if (this.requestSetTime) return this.requestSetTime = !1, void (this.currentTimeLock = !1);if (this.isTimeinBuffered(n)) {if (this.config.alwaysSeekKeyframe) {var i = this.transmuxer.getNearestKeyframe(Math.floor(1e3 * n));i && (this.requestSetTime = !0, this.video.currentTime = i.keyframetime / 1e3);}} else {v.Log.verbose(this.tag, "do seek"), this.transmuxer.pause();var r = this.transmuxer.getNearestKeyframe(Math.floor(1e3 * n));n = r.keyframetime / 1e3, this.seekTimer = setTimeout(function () {t.mediaSource.seek(n), t.transmuxer.seek(r);}, 100), this.requestSetTime = !0, this.video.currentTime = n, window.clearInterval(this.timer), this.timer = null;}return this.currentTimeLock = !1, n;} }, { key: "onmseUpdateEnd", value: function value() {if (this.mediaSource.sourceBuffer.video && this.realtimeBeaconBuilder.videoBufferedUpdated(this.mediaSource.sourceBuffer.video.buffered), !this.config.isLive) {this.getCurrentBufferEnd() >= this.video.currentTime + this.config.lazyLoadMaxDuration && null === this.timer && (v.Log.verbose(this.tag, "Maximum buffering duration exceeded, suspend transmuxing task"), this.pauseTransmuxer());}} }, { key: "heartbeat", value: function value() {for (var e = this.video.currentTime, t = this.video.buffered, n = !1, i = 0; i < t.length; i++) {var r = t.start(i),o = t.end(i);if (e >= r && e < o) {e >= o - this.config.lazyLoadRecoverDuration && (n = !0);break;}}n && (window.clearInterval(this.timer), this.timer = null, v.Log.verbose(this.tag, "Continue loading from paused position"), this.transmuxer.resume(), this.mediaSource.resume());} }, { key: "_checkBuffer", value: function value() {var e = this;if (this.config.isLive) {var t = this.getCurrentBufferEnd();if (void 0 === t) {var n = this.video.buffered,i = n.length;if (!(i > 0 && n.start(i - 1) > this.video.currentTime + .001)) return;v.Log.verbose("currentTime being in no-data GaP detected. Jumping to " + n.start(i - 1)), this.video.currentTime = n.start(i - 1), t = n.end(i - 1);}var r = t - this.video.currentTime;if (null != this._lastBufferd) {var o = function o(t) {v.Log.verbose("Change playback rate from " + e.video.playbackRate + " to " + t + ", buffered:" + r), e.video.playbackRate = t, e.realtimeBeaconBuilder.playbackSpeedChanged(t);};this.video.playbackRate < .999 ? r > 4.999 && o(1) : this.video.playbackRate > 1.001 && r < 5.001 && o(1);}this._lastBufferd = r;}} }, { key: "_sendRealtimeBeacon", value: function value() {if (this.mediaSource.sourceBuffer.audio) {var e = this._getBufferEnd(this.mediaSource.sourceBuffer.audio.buffered, this.video.currentTime);this.realtimeBeaconBuilder.setAudioBufferedSec(e - this.video.currentTime);}if (this.mediaSource.sourceBuffer.video) {var t = this._getBufferEnd(this.mediaSource.sourceBuffer.video.buffered, this.video.currentTime);this.realtimeBeaconBuilder.setVideoBufferedSec(t - this.video.currentTime);}var n = this.realtimeBeaconBuilder.buildAndStartNewInterval();this.emit("realtimeBeacon", n);} }, { key: "_onVideoCanplay", value: function value() {this.logger.record({ type: y.PLAYER_EVENTS.CANPLAY, ts: Date.now() }), this.config.isLive && this.video.play(), this.config.lockInternalProperty && this.internalPropertyHandle();} }, { key: "_onVideoWaiting", value: function value() {if (this.video && !this.video.seeking) {var e = 0,t = this.video.buffered;t.length > 0 && (e = this.video.buffered.end(t.length - 1) - this.video.currentTime), this.realtimeBeaconBuilder.bufferingStarted(e);}} }, { key: "_onVideoPlaying", value: function value() {for (var e = 0, t = this.video.buffered, n = 0; n < t.length; n++) {if (t.start(n) - .1 <= this.video.currentTime && t.end(n) >= this.video.currentTime) {e = t.end(n) - this.video.currentTime;break;}}this.logger.record({ type: y.PLAYER_EVENTS.PLAYING, buffered: e, ts: Date.now() }), this.realtimeBeaconBuilder.bufferingEnded();} }, { key: "_onVideoTimeupdate", value: function value() {console.log("time update", " at js_sdk\\chimee\\index.min.js:1"), this.video.removeEventListener("timeupdate", this._onVideoTimeupdate), this.logger.record({ type: y.PLAYER_EVENTS.TIMEUPDATE, ts: Date.now() });} }, { key: "pauseTransmuxer", value: function value() {this.transmuxer.pause(), this.mediaSource.pause(), this.timer || (this.timer = setInterval(this.heartbeat.bind(this), 1e3));} }, { key: "resume", value: function value() {this._seek(0);} }, { key: "destroy", value: function value() {window.clearInterval(this.timer), window.clearInterval(this.seekTimer), window.clearInterval(this.checkBufferTimer), this.realtimeBeaconTimer && (window.clearInterval(this.realtimeBeaconTimer), this._sendRealtimeBeacon(), this.realtimeBeaconTimer = null), this.video.removeEventListener("canplay", this._onVideoCanplay), this.video.removeEventListener("seeking", this.throttle), this.video.removeEventListener("waiting", this._onVideoWaiting), this.video.removeEventListener("playing", this._onVideoPlaying), this.video.removeEventListener("timeupdate", this._onVideoTimeupdate), this.video && (URL.revokeObjectURL(this.video.src), this.video.src = "", this.video.removeAttribute("src"), this.transmuxer && (this.unbindTransmuxerEvent(this.transmuxer), this.transmuxer.pause(), this.transmuxer.destroy(), this.transmuxer = null), this.mediaSource && (this.unbindMediaSourceEvent(this.mediaSource), this.mediaSource.destroy(), this.mediaSource = null)), this.logger.off("performance"), this.logger = null;} }, { key: "seek", value: function value(e) {return this._seek(e);} }, { key: "play", value: function value() {return this.video.play();} }, { key: "pause", value: function value() {return this.video.pause();} }, { key: "refresh", value: function value() {this.transmuxer && this.mediaSource ? this._seek(0) : v.Log.verbose(this.tag, "transmuxer & mediaSource not ready");} }, { key: "stopLoad", value: function value() {this.transmuxer && this.transmuxer.pause(), this.mediaSource && this.mediaSource.pause(), this.realtimeBeaconTimer && (window.clearInterval(this.realtimeBeaconTimer), this._sendRealtimeBeacon(), this.realtimeBeaconTimer = null);} }]), t;}(v.CustEvent);t.default = b;}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function r(e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}function o(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}Object.defineProperty(t, "__esModule", { value: !0 });var a = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),s = n(4),u = n(43),c = function (e) {return e && e.__esModule ? e : { default: e };}(u),f = n(14),l = n(15),d = function (e) {function t(e, n) {i(this, t);var o = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return o.video = e, o.config = n, o.tag = "mse-controller", o.e = { onSourceOpen: o.onSourceOpen.bind(o), onSourceEnded: o.onSourceEnded.bind(o), onSourceClose: o.onSourceClose.bind(o), onSourceBufferError: o.onSourceBufferError.bind(o) }, o.hasVideo = !0, o.hasAudio = !0, o.removeRangesList = { video: [], audio: [] }, o.removeBucketing = !1, o.timer = { video: null, audio: null }, o.queue = { video: [], audio: [] }, o.sourceBuffer = { video: null, audio: null }, o.mimeCodec = { video: null, audio: null }, o.sourceBufferEvent(), o.complete = !1, o;}return o(t, e), a(t, [{ key: "init", value: function value(e) {if (this.emit("player-event", { type: l.PLAYER_EVENTS.MEDIA_INFO, ts: Date.now() }), this.mediaSource) return c.default.Error(this.tag, "MediaSource has been attached to an HTMLMediaElement!"), void this.emit("error", { errno: f.ERRORNO.MEDIASOURCE_ERROR, errmsg: "MediaSource has been attached to an HTMLMediaElement!" });e.hasAudio ? this.mimeCodec.audio = 'audio/mp4; codecs="' + e.audioCodec + '"' : this.hasAudio = !1, e.hasVideo ? this.mimeCodec.video = 'video/mp4; codecs="' + e.videoCodec + '"' : this.hasVideo = !1;var t = this.mediaSource = new window.MediaSource();t.addEventListener("sourceopen", this.e.onSourceOpen), t.addEventListener("sourceended", this.e.onSourceEnded), t.addEventListener("sourceclose", this.e.onSourceClose);} }, { key: "onSourceOpen", value: function value() {c.default.verbose(this.tag, "MediaSource onSourceOpen"), this.mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen), this.hasAudio && this.addSourceBuffer("audio"), this.hasVideo && this.addSourceBuffer("video"), this.hasQueueList() && this.doUpdate(), this.emit("source_open");} }, { key: "addSourceBuffer", value: function value(e) {var t = this;this.sourceBuffer[e] = this.mediaSource.addSourceBuffer(this.mimeCodec[e]), c.default.verbose(this.tag, "add sourcebuffer " + e);var n = this.sourceBuffer[e];n.addEventListener("error", this.e.onSourceBufferError), n.addEventListener("abort", function () {return c.default.verbose(t.tag, "sourceBuffer: abort");}), n.addEventListener("updateend", function () {t.sourceBuffer && (t.hasRemoveList() ? (t.removeRangesList.video.length && t.cleanRangesList("video"), t.removeRangesList.audio.length && t.cleanRangesList("audio")) : t.hasQueueList() ? t.doUpdate() : t.complete && !t.sourceBuffer[e].updating && t.endOfStream(), t.emit("updateend"));});} }, { key: "hasRemoveList", value: function value() {return this.removeRangesList.video.length || this.removeRangesList.audio.length;} }, { key: "hasQueueList", value: function value() {return this.queue.video.length || this.queue.audio.length;} }, { key: "doUpdate", value: function value() {for (var e in this.queue) {if (this.queue[e].length > 0 && !this.sourceBuffer[e].updating) {var t = this.queue[e].shift();this.appendBuffer(t, e);}}} }, { key: "sourceBufferEvent", value: function value() {var e = this;this.on("mediaSegment", function (t) {var n = t.data,i = n.type;e.emit("player-event", { type: l.PLAYER_EVENTS.MEDIA_SEGMENT, byteLength: n.data.byteLength, ts: Date.now() }), e.needCleanupSourceBuffer(i) && e.doCleanupSourceBuffer(i), e.queue[i].push(n.data), e.sourceBuffer[i] && !e.hasRemoveList() && e.doUpdate();}), this.on("mediaSegmentInit", function (t) {e.emit("player-event", { type: l.PLAYER_EVENTS.MEDIA_SEGMENT_INIT, ts: Date.now() });var n = t.data,i = n.type;e.queue[i].push(n.data);});} }, { key: "needCleanupSourceBuffer", value: function value(e) {var t = this.video.currentTime,n = this.video.buffered;return n.length >= 1 && t - n.start(0) >= this.config.autoCleanupMaxBackwardDuration;} }, { key: "doCleanupSourceBuffer", value: function value(e) {for (var t = this.video.currentTime, n = this.sourceBuffer[e], i = n.buffered, r = !1, o = 0; o < i.length; o++) {var a = i.start(o),s = i.end(o);if (a <= t && t < s + 3 && t - a >= this.config.autoCleanupMaxBackwardDuration) {r = !0;var u = t - this.config.autoCleanupMinBackwardDuration;this.removeRangesList[e].push({ start: a, end: u });}}r && !this.sourceBuffer[e].updating && this.cleanRangesList(e);} }, { key: "cleanRangesList", value: function value(e) {if (!this.sourceBuffer[e].updating) for (var t = this.sourceBuffer[e]; this.removeRangesList[e].length && !t.updating;) {var n = this.removeRangesList[e].shift();t.remove(n.start, n.end);}} }, { key: "appendBuffer", value: function value(e, t) {if (this.sourceBuffer[t]) try {this.sourceBuffer[t].appendBuffer(e.buffer);} catch (r) {var n = this.video.currentTime - 3;if (console.log("removeEnd", n, " at js_sdk\\chimee\\index.min.js:1"), n > 0) for (var i in this.sourceBuffer) {this.sourceBuffer[i].remove(0, n);}this.queue[t].unshift(e), setTimeout(this.doUpdate.bind(this), 100), console.error(r, " at js_sdk\\chimee\\index.min.js:1");}} }, { key: "onSourceEnded", value: function value() {c.default.verbose(this.tag, "MediaSource onSourceEnded");} }, { key: "onSourceClose", value: function value() {c.default.verbose(this.tag, "MediaSource onSourceClose"), this.mediaSource && null !== this.e && (this.mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen), this.mediaSource.removeEventListener("sourceended", this.e.onSourceEnded), this.mediaSource.removeEventListener("sourceclose", this.e.onSourceClose));} }, { key: "onSourceBufferError", value: function value(e) {this.emit("error", { errnono: f.ERRORNO.SOURCEBUFFER_ERROR, errmsg: e.message }), c.default.error(this.tag, "SourceBuffer Error: " + e);} }, { key: "seek", value: function value() {for (var e in this.sourceBuffer) {var t = this.sourceBuffer[e];if (t) {if ("open" === this.mediaSource.readyState) try {t.abort();} catch (e) {this.emit("error", { errno: f.ERRORNO.SBABORT_ERROR, errmsg: e }), c.default.error(this.tag, e.message);}this.queue[e] = [];for (var n = 0; n < t.buffered.length; n++) {var i = t.buffered.start(n),r = t.buffered.end(n);this.removeRangesList[e].push({ start: i, end: r });}t.updating || this.cleanRangesList(e);}}} }, { key: "resume", value: function value() {this.doUpdate();} }, { key: "pause", value: function value() {} }, { key: "endOfStream", value: function value() {if (this.mediaSource) {var e = this.mediaSource;this.complete = !0;var t = this.sourceBuffer;if (t.video && t.video.updating || t.audio && t.audio.updating) return;if ("open" === e.readyState) try {e.endOfStream(), this.complete = !1;} catch (e) {c.default.verbose(this.tag, e), this.emit("error", { errno: f.ERRORNO.ENDOFSTREAM_ERROR, errmsg: e });}}} }, { key: "destroy", value: function value() {if (this.mediaSource) {var e = this.mediaSource;this.queue = { video: [], audio: [] }, this.sourceBuffer = { video: null, audio: null }, this.mimeCodec = { video: null, audio: null };var t = this.sourceBuffer;this.complete = !1, this.endOfStream(), t && ("closed" !== e.readyState && (e.removeSourceBuffer(t), t.removeEventListener("error", this.e.onSourceBufferError), t.removeEventListener("updateend", this.e.onSourceBufferUpdateEnd)), this.sourceBuffer = null), e.removeEventListener("sourceopen", this.e.onSourceOpen), e.removeEventListener("sourceended", this.e.onSourceEnded), e.removeEventListener("sourceclose", this.e.onSourceClose), this.mediaSource = null;}this.off("mediaSegmentInit"), this.off("mediaSegment");} }]), t;}(s.CustEvent);t.default = d;}, function (e, t, n) {e.exports = { default: n(81), __esModule: !0 };}, function (e, t, n) {n(29), n(53), e.exports = n(38).f("iterator");}, function (e, t, n) {var i = n(30),r = n(22);e.exports = function (e) {return function (t, n) {var o,a,s = String(r(t)),u = i(n),c = s.length;return u < 0 || u >= c ? e ? "" : void 0 : (o = s.charCodeAt(u), o < 55296 || o > 56319 || u + 1 === c || (a = s.charCodeAt(u + 1)) < 56320 || a > 57343 ? e ? s.charAt(u) : o : e ? s.slice(u, u + 2) : a - 56320 + (o - 55296 << 10) + 65536);};};}, function (e, t, n) {"use strict";var i = n(33),r = n(18),o = n(25),a = {};n(9)(a, n(3)("iterator"), function () {return this;}), e.exports = function (e, t, n) {e.prototype = i(a, { next: r(1, n) }), o(e, t + " Iterator");};}, function (e, t, n) {var i = n(5),r = n(6),o = n(20);e.exports = n(8) ? Object.defineProperties : function (e, t) {r(e);for (var n, a = o(t), s = a.length, u = 0; s > u;) {i.f(e, n = a[u++], t[n]);}return e;};}, function (e, t, n) {var i = n(12),r = n(34),o = n(86);e.exports = function (e) {return function (t, n, a) {var s,u = i(t),c = r(u.length),f = o(a, c);if (e && n != n) {for (; c > f;) {if ((s = u[f++]) != s) return !0;}} else for (; c > f; f++) {if ((e || f in u) && u[f] === n) return e || f || 0;}return !e && -1;};};}, function (e, t, n) {var i = n(30),r = Math.max,o = Math.min;e.exports = function (e, t) {return e = i(e), e < 0 ? r(e + t, 0) : o(e, t);};}, function (e, t, n) {var i = n(11),r = n(26),o = n(35)("IE_PROTO"),a = Object.prototype;e.exports = Object.getPrototypeOf || function (e) {return e = r(e), i(e, o) ? e[o] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null;};}, function (e, t, n) {"use strict";var i = n(89),r = n(90),o = n(19),a = n(12);e.exports = n(47)(Array, "Array", function (e, t) {this._t = a(e), this._i = 0, this._k = t;}, function () {var e = this._t,t = this._k,n = this._i++;return !e || n >= e.length ? (this._t = void 0, r(1)) : "keys" == t ? r(0, n) : "values" == t ? r(0, e[n]) : r(0, [n, e[n]]);}, "values"), o.Arguments = o.Array, i("keys"), i("values"), i("entries");}, function (e, t) {e.exports = function () {};}, function (e, t) {e.exports = function (e, t) {return { value: t, done: !!e };};}, function (e, t, n) {e.exports = { default: n(92), __esModule: !0 };}, function (e, t, n) {n(93), n(55), n(99), n(100), e.exports = n(0).Symbol;}, function (e, t, n) {"use strict";var i = n(1),r = n(11),o = n(8),a = n(2),s = n(49),u = n(94).KEY,c = n(10),f = n(36),l = n(25),d = n(24),h = n(3),v = n(38),p = n(39),m = n(95),y = n(96),g = n(6),b = n(7),_ = n(12),w = n(32),k = n(18),S = n(33),E = n(97),x = n(98),T = n(5),O = n(20),A = x.f,R = T.f,M = E.f,_D = i.Symbol,C = i.JSON,B = C && C.stringify,L = h("_hidden"),I = h("toPrimitive"),P = {}.propertyIsEnumerable,j = f("symbol-registry"),N = f("symbols"),U = f("op-symbols"),F = Object.prototype,V = "function" == typeof _D,z = i.QObject,G = !z || !z.prototype || !z.prototype.findChild,q = o && c(function () {return 7 != S(R({}, "a", { get: function get() {return R(this, "a", { value: 7 }).a;} })).a;}) ? function (e, t, n) {var i = A(F, t);i && delete F[t], R(e, t, n), i && e !== F && R(F, t, i);} : R,W = function W(e) {var t = N[e] = S(_D.prototype);return t._k = e, t;},H = V && "symbol" == typeof _D.iterator ? function (e) {return "symbol" == typeof e;} : function (e) {return e instanceof _D;},K = function K(e, t, n) {return e === F && K(U, t, n), g(e), t = w(t, !0), g(n), r(N, t) ? (n.enumerable ? (r(e, L) && e[L][t] && (e[L][t] = !1), n = S(n, { enumerable: k(0, !1) })) : (r(e, L) || R(e, L, k(1, {})), e[L][t] = !0), q(e, t, n)) : R(e, t, n);},Y = function Y(e, t) {g(e);for (var n, i = m(t = _(t)), r = 0, o = i.length; o > r;) {K(e, n = i[r++], t[n]);}return e;},X = function X(e, t) {return void 0 === t ? S(e) : Y(S(e), t);},$ = function $(e) {var t = P.call(this, e = w(e, !0));return !(this === F && r(N, e) && !r(U, e)) && (!(t || !r(this, e) || !r(N, e) || r(this, L) && this[L][e]) || t);},J = function J(e, t) {if (e = _(e), t = w(t, !0), e !== F || !r(N, t) || r(U, t)) {var n = A(e, t);return !n || !r(N, t) || r(e, L) && e[L][t] || (n.enumerable = !0), n;}},Z = function Z(e) {for (var t, n = M(_(e)), i = [], o = 0; n.length > o;) {r(N, t = n[o++]) || t == L || t == u || i.push(t);}return i;},Q = function Q(e) {for (var t, n = e === F, i = M(n ? U : _(e)), o = [], a = 0; i.length > a;) {!r(N, t = i[a++]) || n && !r(F, t) || o.push(N[t]);}return o;};V || (_D = function D() {if (this instanceof _D) throw TypeError("Symbol is not a constructor!");var e = d(arguments.length > 0 ? arguments[0] : void 0),t = function t(n) {this === F && t.call(U, n), r(this, L) && r(this[L], e) && (this[L][e] = !1), q(this, e, k(1, n));};return o && G && q(F, e, { configurable: !0, set: t }), W(e);}, s(_D.prototype, "toString", function () {return this._k;}), x.f = J, T.f = K, n(54).f = E.f = Z, n(27).f = $, n(40).f = Q, o && !n(16) && s(F, "propertyIsEnumerable", $, !0), v.f = function (e) {return W(h(e));}), a(a.G + a.W + a.F * !V, { Symbol: _D });for (var ee = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), te = 0; ee.length > te;) {h(ee[te++]);}for (var ne = O(h.store), ie = 0; ne.length > ie;) {p(ne[ie++]);}a(a.S + a.F * !V, "Symbol", { for: function _for(e) {return r(j, e += "") ? j[e] : j[e] = _D(e);}, keyFor: function keyFor(e) {if (!H(e)) throw TypeError(e + " is not a symbol!");for (var t in j) {if (j[t] === e) return t;}}, useSetter: function useSetter() {G = !0;}, useSimple: function useSimple() {G = !1;} }), a(a.S + a.F * !V, "Object", { create: X, defineProperty: K, defineProperties: Y, getOwnPropertyDescriptor: J, getOwnPropertyNames: Z, getOwnPropertySymbols: Q }), C && a(a.S + a.F * (!V || c(function () {var e = _D();return "[null]" != B([e]) || "{}" != B({ a: e }) || "{}" != B(Object(e));})), "JSON", { stringify: function stringify(e) {for (var t, n, i = [e], r = 1; arguments.length > r;) {i.push(arguments[r++]);}if (n = t = i[1], (b(t) || void 0 !== e) && !H(e)) return y(t) || (t = function t(e, _t2) {if ("function" == typeof n && (_t2 = n.call(this, e, _t2)), !H(_t2)) return _t2;}), i[1] = t, B.apply(C, i);} }), _D.prototype[I] || n(9)(_D.prototype, I, _D.prototype.valueOf), l(_D, "Symbol"), l(Math, "Math", !0), l(i.JSON, "JSON", !0);}, function (e, t, n) {var i = n(24)("meta"),r = n(7),o = n(11),a = n(5).f,s = 0,u = Object.isExtensible || function () {return !0;},c = !n(10)(function () {return u(Object.preventExtensions({}));}),f = function f(e) {a(e, i, { value: { i: "O" + ++s, w: {} } });},l = function l(e, t) {if (!r(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;if (!o(e, i)) {if (!u(e)) return "F";if (!t) return "E";f(e);}return e[i].i;},d = function d(e, t) {if (!o(e, i)) {if (!u(e)) return !0;if (!t) return !1;f(e);}return e[i].w;},h = function h(e) {return c && v.NEED && u(e) && !o(e, i) && f(e), e;},v = e.exports = { KEY: i, NEED: !1, fastKey: l, getWeak: d, onFreeze: h };}, function (e, t, n) {var i = n(20),r = n(40),o = n(27);e.exports = function (e) {var t = i(e),n = r.f;if (n) for (var a, s = n(e), u = o.f, c = 0; s.length > c;) {u.call(e, a = s[c++]) && t.push(a);}return t;};}, function (e, t, n) {var i = n(21);e.exports = Array.isArray || function (e) {return "Array" == i(e);};}, function (e, t, n) {var i = n(12),r = n(54).f,o = {}.toString,a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],s = function s(e) {try {return r(e);} catch (e) {return a.slice();}};e.exports.f = function (e) {return a && "[object Window]" == o.call(e) ? s(e) : r(i(e));};}, function (e, t, n) {var i = n(27),r = n(18),o = n(12),a = n(32),s = n(11),u = n(48),c = Object.getOwnPropertyDescriptor;t.f = n(8) ? c : function (e, t) {if (e = o(e), t = a(t, !0), u) try {return c(e, t);} catch (e) {}if (s(e, t)) return r(!i.f.call(e, t), e[t]);};}, function (e, t, n) {n(39)("asyncIterator");}, function (e, t, n) {n(39)("observable");}, function (e, t, n) {e.exports = { default: n(102), __esModule: !0 };}, function (e, t, n) {n(103);var i = n(0).Object;e.exports = function (e, t, n) {return i.defineProperty(e, t, n);};}, function (e, t, n) {var i = n(2);i(i.S + i.F * !n(8), "Object", { defineProperty: n(5).f });}, function (e, t, n) {n(105), e.exports = n(0).Object.assign;}, function (e, t, n) {var i = n(2);i(i.S + i.F, "Object", { assign: n(106) });}, function (e, t, n) {"use strict";var i = n(20),r = n(40),o = n(27),a = n(26),s = n(51),u = Object.assign;e.exports = !u || n(10)(function () {var e = {},t = {},n = Symbol(),i = "abcdefghijklmnopqrst";return e[n] = 7, i.split("").forEach(function (e) {t[e] = e;}), 7 != u({}, e)[n] || Object.keys(u({}, t)).join("") != i;}) ? function (e, t) {for (var n = a(e), u = arguments.length, c = 1, f = r.f, l = o.f; u > c;) {for (var d, h = s(arguments[c++]), v = f ? i(h).concat(f(h)) : i(h), p = v.length, m = 0; p > m;) {l.call(h, d = v[m++]) && (n[d] = h[d]);}}return n;} : u;}, function (e, t, n) {e.exports = { default: n(108), __esModule: !0 };}, function (e, t, n) {n(109);var i = n(0).Object;e.exports = function (e, t) {return i.create(e, t);};}, function (e, t, n) {var i = n(2);i(i.S, "Object", { create: n(33) });}, function (e, t, n) {n(111), e.exports = n(0).Object.keys;}, function (e, t, n) {var i = n(26),r = n(20);n(112)("keys", function () {return function (e) {return r(i(e));};});}, function (e, t, n) {var i = n(2),r = n(0),o = n(10);e.exports = function (e, t) {var n = (r.Object || {})[e] || Object[e],a = {};a[e] = t(n), i(i.S + i.F * o(function () {n(1);}), "Object", a);};}, function (e, t, n) {e.exports = { default: n(114), __esModule: !0 };}, function (e, t, n) {n(115), e.exports = n(0).Number.isInteger;}, function (e, t, n) {var i = n(2);i(i.S, "Number", { isInteger: n(116) });}, function (e, t, n) {var i = n(7),r = Math.floor;e.exports = function (e) {return !i(e) && isFinite(e) && r(e) === e;};}, function (e, t, n) {e.exports = { default: n(118), __esModule: !0 };}, function (e, t, n) {n(119), e.exports = n(0).Number.parseFloat;}, function (e, t, n) {var i = n(2),r = n(120);i(i.S + i.F * (Number.parseFloat != r), "Number", { parseFloat: r });}, function (e, t, n) {var i = n(1).parseFloat,r = n(121).trim;e.exports = 1 / i(n(58) + "-0") != -1 / 0 ? function (e) {var t = r(String(e), 3),n = i(t);return 0 === n && "-" == t.charAt(0) ? -0 : n;} : i;}, function (e, t, n) {var i = n(2),r = n(22),o = n(10),a = n(58),s = "[" + a + "]",u = "​",c = RegExp("^" + s + s + "*"),f = RegExp(s + s + "*$"),l = function l(e, t, n) {var r = {},s = o(function () {return !!a[e]() || u[e]() != u;}),c = r[e] = s ? t(d) : a[e];n && (r[n] = c), i(i.P + i.F * s, "String", r);},d = l.trim = function (e, t) {return e = String(r(e)), 1 & t && (e = e.replace(c, "")), 2 & t && (e = e.replace(f, "")), e;};e.exports = l;}, function (e, t, n) {"use strict";function i(e) {return e && e.__esModule ? e : { default: e };}function r(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function o(e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}function a(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}Object.defineProperty(t, "__esModule", { value: !0 });var s = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),u = n(59),c = i(u),f = n(4),l = n(128),d = i(l),h = n(61),v = i(h),p = n(14),m = n(15),y = function (e) {function t(e, n, i) {r(this, t);var a = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return a.config = n || {}, a.tag = "transmuxer", a.loader = null, a.CPU = null, a.keyframePoint = !1, a.w = null, a.config.webWorker && (a.onWorkMessage = a.onWorkMessage.bind(a), a.w = (0, d.default)(139), a.w.addEventListener("message", a.onWorkMessage), a.w.postMessage(JSON.parse(JSON.stringify({ cmd: "init", data: n })))), a.lock = 0, a;}return a(t, e), s(t, [{ key: "onWorkMessage", value: function value(e) {this.parseCallback.call(this, e.data);} }, { key: "loadSource", value: function value() {this.config.webWorker ? this.w.postMessage({ cmd: "loadSource" }) : (this.loader = new c.default(this.config), this.loader.arrivalDataCallback = this.arrivalDataCallback.bind(this), this.loaderBindEvent(this.loader), this.loader.open());} }, { key: "loaderBindEvent", value: function value(e) {var t = this;e.on("end", function () {t.emit("end");}), e.on("error", function (e) {t.emit("error", e.data);}), e.on("heartbeat", function (e) {t.emit("heartbeat", e.data);}), this.loader.on("player-event", function (e) {t.emit("player-event", e.data);});} }, { key: "loaderUnbindEvent", value: function value(e) {e.off("end"), e.off("error"), e.off("heartbeat"), e.off("player-event");} }, { key: "arrivalDataCallback", value: function value(e, t, n) {var i = this;return this.CPU || (this.CPU = new v.default(this.config), this.CPU.onInitSegment = this.onRemuxerInitSegmentArrival.bind(this), this.CPU.onMediaSegment = this.onRemuxerMediaSegmentArrival.bind(this), this.CPU.onMediaInfo = this.onMediaInfo.bind(this), this.CPU.onCdnDropFrame = this.onCdnDropFrame.bind(this), this.CPU.on("error", function (e) {i.emit("error", { errno: p.ERRORNO.CODEC_ERROR, errmsg: e.data });})), void 0 !== n && this.CPU.seek(n), this.emit("player-event", { type: m.PLAYER_EVENTS.MEDIA_DEMUX_FLV, byteLength: e.byteLength, ts: Date.now() }), this.CPU.setflv(e);} }, { key: "parseCallback", value: function value(e) {switch (e.cmd) {case "mediaSegmentInit":this.emit("mediaSegmentInit", e.source);break;case "mediaSegment":this.emit("mediaSegment", e.source);break;case "mediainfo":this.mediaInfo = e.source, this.emit("mediaInfo", e.source);break;case "end":this.emit("end");break;case "error":this.emit("error", e.source);break;case "player-event":this.emit("player-event", e.source);break;case "heartbeat":this.emit("heartbeat", e.source);break;case "cdnDropFrame":this.emit("cdnDropFrame", { dropAudio: e.source });}} }, { key: "onMediaInfo", value: function value(e) {this.mediaInfo = e, this.emit("mediaInfo", e);} }, { key: "onCdnDropFrame", value: function value(e) {this.emit("cdnDropFrame", { dropAudio: e });} }, { key: "onRemuxerInitSegmentArrival", value: function value(e, t) {this.emit("mediaSegmentInit", { type: "video", data: e }), t && this.emit("mediaSegmentInit", { type: "audio", data: t });} }, { key: "onRemuxerMediaSegmentArrival", value: function value(e, t) {this.emit("mediaSegment", { type: e, data: t });} }, { key: "getMediaInfo", value: function value() {return this.mediaInfo;} }, { key: "pause", value: function value() {this.config.webWorker ? this.w.postMessage({ cmd: "pause" }) : this.loader.pause();} }, { key: "resume", value: function value() {this.config.webWorker ? this.w.postMessage({ cmd: "resume" }) : this.loader.resume();} }, { key: "isSeekable", value: function value() {return this.mediaInfo.hasKeyframesIndex;} }, { key: "seek", value: function value(e) {if (!this.isSeekable()) return this.emit("error", { errno: p.ERRORNO.CANNOT_SEEK, errmsg: "这个flv视频不支持seek" }), !1;this.config.webWorker ? this.w.postMessage({ cmd: "seek", keyframe: e }) : this.loader.seek(e.keyframePoint, !1, e.keyframetime);} }, { key: "destroy", value: function value() {this.config.webWorker ? (this.w.postMessage({ cmd: "destroy" }), this.w.removeEventListener("message", this.onWorkMessage), this.w.terminate()) : (this.loader && (this.loaderUnbindEvent(this.loader), this.loader.destroy(), this.loader = null), this.CPU && (this.CPU.off("error"), this.CPU = null));} }, { key: "getNearestKeyframe", value: function value(e) {if (this.mediaInfo && this.mediaInfo.keyframesIndex) {var t = this.mediaInfo.keyframesIndex.times,n = this.mediaInfo.keyframesIndex.filepositions;return function e(i, r) {var o = i.length,a = Math.floor(o / 2);if (1 === o) {var s = t.indexOf(i[0]);return { keyframetime: i[0], keyframePoint: n[s] };}if (i[a] > r) return e(i.slice(0, a), r);if (i[a] < r) return e(i.slice(a), r);var u = t.indexOf(i[0]);return { keyframetime: i[0], keyframePoint: n[u] };}(t, e);}return 0;} }]), t;}(f.CustEvent);t.default = y;}, function (e, t, n) {"use strict";function i(e) {return e && e.__esModule ? e : { default: e };}function r(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function o(e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}function a(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}Object.defineProperty(t, "__esModule", { value: !0 });var s = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),u = n(124),c = i(u),f = n(4),l = n(43),d = i(l),h = n(14),v = function (e) {function t(e, n) {r(this, t);var i = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return i.tag = "fetch", i.fetching = !1, i.config = n, i.range = { from: 0, to: 524288 }, i.src = e, i.totalRange = null, i.block = 524288, i.reader = null, i.requestAbort = !1, i.arrivalDataCallback = null, i.bytesStart = 0, i.heartbeat = null, i;}return a(t, e), s(t, null, [{ key: "isSupport", value: function value() {return !(!self.fetch || !self.ReadableStream);} }]), s(t, [{ key: "open", value: function value(e, t) {var n = this;this.requestAbort = !1;var i = new Headers(),r = e || { from: 0, to: -1 };if (!this.config.isLive) {this.range.from = r.from, this.range.to = r.to;var o = (0, c.default)(r, this.config);if ("string" == typeof o) this.src = this.config.src + o;else for (var a in o) {i.append(a, o[a]);}}t && (this.bytesStart = 0), this.bytesStart = e.from;var s = { method: "GET", headers: i, mode: "cors", cache: "default", referrerPolicy: "no-referrer-when-downgrade" },u = Date.now();fetch(this.src, s).then(function (e) {if (n.emit("performance", { type: "receive-first-package-duration", value: Date.now() - u }), e.ok) {var i = e.body.getReader();return n.pump(i, t);}}).catch(function (e) {n.emit("error", { errno: h.ERRORNO.NET_ERROR, errmsg: e.toString() });});} }, { key: "pause", value: function value() {this.requestAbort = !0;} }, { key: "pump", value: function value(e, t) {var n = this;return e.read().then(function (i) {if (i.done) n.emit("end"), d.default.verbose(n.tag, "load end");else {if (!0 === n.requestAbort) return n.requestAbort = !1, e.cancel();var r = i.value.buffer;n.arrivalDataCallback && (n.arrivalDataCallback(r, n.bytesStart, t), n.bytesStart += r.byteLength), setTimeout(function () {n.pump(e);}, 0);}}).catch(function (e) {n.emit("error", { errno: h.ERRORNO.NET_ERROR, errmsg: e.message });});} }]), t;}(f.CustEvent);t.default = v;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function (e, t) {if ("range" === t.seekType) {var n = {},i = void 0;return i = -1 !== e.to ? "bytes=" + e.from.toString() + "-" + e.to.toString() : "bytes=" + e.from.toString() + "-", n.Range = i, n;}return -1 !== e.to ? "?start=" + e.from.toString() + "&end=" + e.to.toString() : "?start=" + e.from.toString();};}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function r(e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}function o(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}Object.defineProperty(t, "__esModule", { value: !0 });var a = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),s = n(60),u = function (e) {return e && e.__esModule ? e : { default: e };}(s),c = n(4),f = n(14),l = function (e) {function t(e, n) {i(this, t);var o = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return o.tag = "RangeLoader", o.xhr = null, o.src = e, o.totalLength = null, o.chunkSizeKB = 524288, o.range = {}, o.bytesStart = 0, o.needSeek = !1, o.keyframePoint = null, o;}return o(t, e), a(t, null, [{ key: "isSupport", value: function value() {try {var e = new XMLHttpRequest();return e.open("GET", "https://example.com", !0), e.responseType = "arraybuffer", "arraybuffer" === e.responseType;} catch (e) {return !1;}} }]), a(t, [{ key: "open", value: function value(e, t) {var n = this.xhr = new XMLHttpRequest();n.open("GET", this.src, !0), n.responseType = "arraybuffer", n.onreadystatechange = this.onReadyStateChange.bind(this), n.onprogress = this.onProgress.bind(this), n.onload = this.onLoad.bind(this), n.onerror = this.onXhrError.bind(this);var i = e || { from: 0, to: -1 };this.range.from = i.from, -1 === i.to && (i.to = i.from + this.chunkSizeKB), t && (this.bytesStart = e.from, this.needSeek = !0, this.keyframePoint = t), this.range.to = i.to;var r = (0, u.default)(i).headers;for (var o in r) {n.setRequestHeader(o, r[o]);}n.send();} }, { key: "pause", value: function value() {this.abort();} }, { key: "abort", value: function value() {this.xhr && (this.xhr.onreadystatechange = null, this.xhr.onprogress = null, this.xhr.onload = null, this.xhr.onerror = null, this.xhr.abort(), this.xhr = null);} }, { key: "destroy", value: function value() {this.xhr && (this.abort(), this.xhr.onreadystatechange = null, this.xhr.onprogress = null, this.xhr.onload = null, this.xhr.onerror = null, this.xhr = null), this.totalLength = null, this.bytesStart = null, this.range = {};} }, { key: "onReadyStateChange", value: function value(e) {var t = this.xhr;if (2 === t.readyState && t.status < 200 && t.status > 299) {var n = { from: this.range.from, to: this.range.to, url: this.src, msg: "http Error: http code " + t.status };this.emit("error", { errno: f.ERRORNO.NET_ERROR, errmsg: n });}} }, { key: "onProgress", value: function value(e) {this.totalLength || (this.totalLength = e.total, this.abort(), this.open());} }, { key: "onLoad", value: function value(e) {if (this.totalLength && this.arrivalDataCallback) {var t = e.target.response;this.needSeek ? (this.needSeek = !1, this.arrivalDataCallback(t, this.bytesStart, this.keyframePoint)) : this.arrivalDataCallback(t, this.bytesStart), this.bytesStart += t.byteLength, this.open({ from: this.bytesStart, to: -1 });}} }, { key: "onXhrError", value: function value(e) {var t = { from: this.range.from, to: this.range.to, url: this.src, msg: e.constructor.name + " " + e.type };this.emit("error", { errno: f.ERRORNO.NET_ERROR, errmsg: t });} }]), t;}(c.CustEvent);t.default = l;}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function r(e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}function o(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}Object.defineProperty(t, "__esModule", { value: !0 });var a = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),s = n(4),u = n(14),c = function (e) {function t(e, n) {i(this, t);var o = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return o.tag = "WebSocket", o.src = e, o._ws = null, o._requestAbort = !1, o._receivedLength = 0, o;}return o(t, e), a(t, null, [{ key: "isSupported", value: function value() {try {return void 0 !== window.WebSocket;} catch (e) {return !1;}} }]), a(t, [{ key: "open", value: function value(e, t) {try {var n = this._ws = new self.WebSocket(this.src);n.binaryType = "arraybuffer", n.onopen = this.onWebSocketOpen.bind(this), n.onclose = this.onWebSocketClose.bind(this), n.onmessage = this.onWebSocketMessage.bind(this), n.onerror = this.onWebSocketError.bind(this);} catch (e) {var i = { code: e.code, msg: e.message };this.emit("error", { errno: u.ERRORNO.NET_ERROR, errmsg: i });}} }, { key: "pause", value: function value() {var e = this._ws;!e || 0 !== e.readyState && 1 !== e.readyState || (this._requestAbort = !0, e.close()), this._ws = null;} }, { key: "onWebSocketClose", value: function value(e) {if (!0 === this._requestAbort) return void (this._requestAbort = !1);this.emit("end");} }, { key: "onWebSocketOpen", value: function value() {} }, { key: "onWebSocketMessage", value: function value(e) {var t = this;if (e.data instanceof ArrayBuffer) this.dispatchArrayBuffer(e.data);else if (e.data instanceof Blob) {var n = new FileReader();n.onload = function () {t.dispatchArrayBuffer(n.result);}, n.readAsArrayBuffer(e.data);} else {var i = { code: -1, msg: "Unsupported WebSocket message type: " + e.data.constructor.name };this.emit("error", { errno: u.ERRORNO.NET_ERROR, errmsg: i });}} }, { key: "dispatchArrayBuffer", value: function value(e) {var t = e,n = this.receivedLength;this.receivedLength += t.byteLength, this.arrivalDataCallback && this.arrivalDataCallback(t, n);} }, { key: "onWebSocketError", value: function value(e) {var t = { code: e.code, msg: e.message };this.emit("error", { errno: u.ERRORNO.NET_ERROR, errmsg: t });} }]), t;}(s.CustEvent);t.default = c;}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function r(e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}function o(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}Object.defineProperty(t, "__esModule", { value: !0 });var a = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),s = n(60),u = function (e) {return e && e.__esModule ? e : { default: e };}(s),c = n(4),f = n(14),l = function (e) {function t(e, n) {i(this, t);var o = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return o.tag = "mozChunkLoader", o.xhr = null, o.src = e, o.config = n, o.totalLength = null, o.chunkSizeKB = 393216, o.range = {}, o.bytesStart = 0, o.keyframePoint = null, o;}return o(t, e), a(t, null, [{ key: "isSupport", value: function value() {try {var e = new XMLHttpRequest();return e.open("GET", "https://example.com", !0), e.responseType = "moz-chunked-arraybuffer", "moz-chunked-arraybuffer" === e.responseType;} catch (e) {return !1;}} }]), a(t, [{ key: "open", value: function value(e, t) {var n = this.xhr = new XMLHttpRequest();if (n.open("GET", this.src, !0), n.responseType = "moz-chunked-arraybuffer", n.onreadystatechange = this.onReadyStateChange.bind(this), n.onprogress = this.onProgress.bind(this), n.onload = this.onLoadEnd.bind(this), n.onerror = this.onXhrError.bind(this), !this.config.isLive) {var i = e || { from: 0, to: -1 };this.range.from = i.from, this.range.to = i.to, t && (this.needSeek = !0, this.keyframePoint = t);var r = (0, u.default)(i).headers;for (var o in r) {n.setRequestHeader(o, r[o]);}}n.send();} }, { key: "pause", value: function value() {this.abort();} }, { key: "abort", value: function value() {this.xhr && (this.xhr.onreadystatechange = null, this.xhr.onprogress = null, this.xhr.onload = null, this.xhr.onerror = null, this.xhr.abort(), this.xhr = null);} }, { key: "destroy", value: function value() {this.xhr && (this.abort(), this.xhr.onreadystatechange = null, this.xhr.onprogress = null, this.xhr.onload = null, this.xhr.onerror = null, this.xhr = null), this.totalLength = null, this.bytesStart = null, this.range = {};} }, { key: "onReadyStateChange", value: function value(e) {var t = this.xhr;if (2 === t.readyState && t.status < 200 && t.status > 299) {var n = { from: this.range.from, to: this.range.to, url: this.src, msg: "http Error: http code " + t.status };this.emit("error", { errno: f.ERRORNO.NET_ERROR, errmsg: n });}} }, { key: "onProgress", value: function value(e) {this.totalLength || (this.totalLength = e.total, null !== e.total && 0 !== e.total && (this.totalLength = e.total));var t = e.target.response;this.needSeek ? (this.needSeek = !1, this.arrivalDataCallback(t, this.bytesStart, this.keyframePoint)) : this.arrivalDataCallback(t, this.bytesStart), this.bytesStart += t.byteLength;} }, { key: "onLoadEnd", value: function value(e) {this.emit(this.tag, "video load end");} }, { key: "onXhrError", value: function value(e) {var t = { from: this.range.from, to: this.range.to, url: this.src, msg: e.constructor.name + " " + e.type };this.emit("error", { errno: f.ERRORNO.NET_ERROR, errmsg: t });} }]), t;}(c.CustEvent);t.default = l;}, function (e, t, n) {function i(e) {function t(i) {if (n[i]) return n[i].exports;var r = n[i] = { i: i, l: !1, exports: {} };return e[i].call(r.exports, r, r.exports, t), r.l = !0, r.exports;}var n = {};t.m = e, t.c = n, t.i = function (e) {return e;}, t.d = function (e, n, i) {t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: i });}, t.r = function (e) {Object.defineProperty(e, "__esModule", { value: !0 });}, t.n = function (e) {var n = e && e.__esModule ? function () {return e.default;} : function () {return e;};return t.d(n, "a", n), n;}, t.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, t.p = "/", t.oe = function (e) {throw console.error(e, " at js_sdk\\chimee\\index.min.js:1"), e;};var i = t(t.s = ENTRY_MODULE);return i.default || i;}function r(e) {return (e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");}function o(e, t, i) {var o = {};o[i] = [];var a = t.toString(),s = a.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);if (!s) return o;for (var f, l = s[1], d = new RegExp("(\\\\n|\\W)" + r(l) + c, "g"); f = d.exec(a);) {"dll-reference" !== f[3] && o[i].push(f[3]);}for (d = new RegExp("\\(" + r(l) + '\\("(dll-reference\\s(' + u + '))"\\)\\)' + c, "g"); f = d.exec(a);) {e[f[2]] || (o[i].push(f[1]), e[f[2]] = n(f[1]).m), o[f[2]] = o[f[2]] || [], o[f[2]].push(f[4]);}return o;}function a(e) {return Object.keys(e).reduce(function (t, n) {return t || e[n].length > 0;}, !1);}function s(e, t) {for (var n = { main: [t] }, i = { main: [] }, r = { main: {} }; a(n);) {for (var s = Object.keys(n), u = 0; u < s.length; u++) {var c = s[u],f = n[c],l = f.pop();if (r[c] = r[c] || {}, !r[c][l] && e[c][l]) {r[c][l] = !0, i[c] = i[c] || [], i[c].push(l);for (var d = o(e, e[c][l], c), h = Object.keys(d), v = 0; v < h.length; v++) {n[h[v]] = n[h[v]] || [], n[h[v]] = n[h[v]].concat(d[h[v]]);}}}}return i;}var u = "[\\.|\\-|\\+|\\w|/|@]+",c = "\\((/\\*.*?\\*/)?s?.*?(" + u + ").*?\\)";e.exports = function (e, t) {t = t || {};var r = { main: n.m },o = t.all ? { main: Object.keys(r) } : s(r, e),a = "";Object.keys(o).filter(function (e) {return "main" !== e;}).forEach(function (e) {for (var t = 0; o[e][t];) {t++;}o[e].push(t), r[e][t] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", a = a + "var " + e + " = (" + i.toString().replace("ENTRY_MODULE", JSON.stringify(t)) + ")({" + o[e].map(function (t) {return JSON.stringify(t) + ": " + r[e][t].toString();}).join(",") + "});\n";}), a = a + "new ((" + i.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + o.main.map(function (e) {return JSON.stringify(e) + ": " + r.main[e].toString();}).join(",") + "}))(self);";var u = new window.Blob([a], { type: "text/javascript" });if (t.bare) return u;var c = window.URL || window.webkitURL || window.mozURL || window.msURL,f = c.createObjectURL(u),l = new window.Worker(f);return l.objectURL = f, l;};}, function (e, t, n) {"use strict";function i(e) {return e && e.__esModule ? e : { default: e };}function r(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),a = n(130),s = i(a),u = n(62),c = i(u),f = n(44),l = i(f),d = function () {function e() {r(this, e), this.tempUint8 = new Uint8Array(), this.arrTag = [], this.index = 0, this.tempArr = [], this.stop = !1, this.offset = 0, this.frist = !0, this._hasAudio = !1, this._hasVideo = !1, this._dispose = !1, this.busy = !1, this.busyArr = [];}return o(e, [{ key: "setFlv", value: function value(e) {return this.busy = !0, this._dispose = !1, this.stop = !1, this.arrTag = [], this.index = 0, this.tempUint8 = e, this.tempUint8.length > 13 && 70 == this.tempUint8[0] && 76 == this.tempUint8[1] && 86 == this.tempUint8[2] ? (this.probe(this.tempUint8.buffer), this.read(9), this.read(4), this.parse(), this.frist = !1, this.busy = !1, this.offset) : this.frist ? this.offset : (this.parse(), this.offset);} }, { key: "probe", value: function value(e) {var t = new Uint8Array(e),n = { match: !1 };if (70 !== t[0] || 76 !== t[1] || 86 !== t[2] || 1 !== t[3]) return n;var i = (4 & t[4]) >>> 2 != 0,r = 0 != (1 & t[4]);return i || r ? (this._hasAudio = c.default._hasAudio = i, this._hasVideo = c.default._hasVideo = r, { match: !0, hasAudioTrack: i, hasVideoTrack: r }) : n;} }, { key: "dispose", value: function value() {} }, { key: "parse", value: function value() {for (; this.index < this.tempUint8.length && !this.stop;) {this.offset = this.index;var e = new s.default();if (this.tempUint8.length - this.index >= 11) {if (e.tagType = this.read(1)[0], e.dataSize = this.read(3), e.Timestamp = this.read(4), e.StreamID = this.read(3), 18 != e.tagType && 8 != e.tagType && 9 != e.tagType) throw new l.default("wrong tagType" + e.tagType);this.tempUint8.length - this.index >= this.getBodySum(e.dataSize) + 4 ? (e.body = this.read(this.getBodySum(e.dataSize)), 9 == e.tagType && this._hasVideo && this.arrTag.push(e), 8 == e.tagType && this._hasAudio && this.arrTag.push(e), 18 == e.tagType && this.arrTag.push(e), e.size = this.read(4), this.offset = this.index) : this.stop = !0;} else this.stop = !0;}return this.offset;} }, { key: "read", value: function value(e) {var t = this.tempUint8.slice(this.index, this.index + e);return this.index += e, t;} }, { key: "getBodySum", value: function value(e) {var t = "";return t += 1 == e[0].toString(16).length ? "0" + e[0].toString(16) : e[0].toString(16), t += 1 == e[1].toString(16).length ? "0" + e[1].toString(16) : e[1].toString(16), t += 1 == e[2].toString(16).length ? "0" + e[2].toString(16) : e[2].toString(16), parseInt(t, 16);} }]), e;}();t.default = d;}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),o = function () {function e() {i(this, e), this.tagType = -1, this.dataSize = -1, this.Timestamp = -1, this.StreamID = -1, this.body = -1, this.time = -1, this.arr = [], this.size = -1;}return r(e, [{ key: "getTime", value: function value() {this.arr = [];for (var e = 0; e < this.Timestamp.length; e++) {this.arr.push(1 == this.Timestamp[e].toString(16).length ? "0" + this.Timestamp[e].toString(16) : this.Timestamp[e].toString(16));}this.arr.pop();var t = this.arr.join("");return this.time = parseInt(t, 16), parseInt(t, 16);} }]), e;}();t.default = o;}, function (e, t, n) {"use strict";function i(e) {return e && e.__esModule ? e : { default: e };}function r(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),a = n(132),s = i(a),u = n(63),c = (i(u), null),f = function () {function e() {r(this, e);}return o(e, null, [{ key: "parseObject", value: function value(t, n, i) {var r = e.parseString(t, n, i),o = e.parseScript(t, n + r.size),a = o.objectEnd;return { data: { name: r.data, value: o.data }, size: o.size, objectEnd: a };} }, { key: "parseVariable", value: function value(t, n, i) {return e.parseObject(t, n, i);} }, { key: "parseLongString", value: function value(e, t, n) {var i = new DataView(e, t),r = i.getUint32(0, !c),o = void 0;return o = r > 0 ? (0, s.default)(new Uint8Array(e, t + 4, r)) : "", { data: o, size: 4 + r };} }, { key: "parseDate", value: function value(e, t, n) {var i = new DataView(e, t),r = i.getFloat64(0, !c);return r += 60 * i.getInt16(8, !c) * 1e3, { data: new Date(r), size: 10 };} }, { key: "parseString", value: function value(e, t, n) {var i = new DataView(e, t),r = i.getUint16(0, !c),o = void 0;return o = r > 0 ? (0, s.default)(new Uint8Array(e, t + 2, r)) : "", { data: o, size: 2 + r };} }, { key: "parseMetadata", value: function value(t) {c = function () {var e = new ArrayBuffer(2);return new DataView(e).setInt16(0, 256, !0), 256 === new Int16Array(e)[0];}();var n = e.parseScript(t, 0),i = e.parseScript(t, n.size, t.length - n.size),r = {};return r[n.data] = i.data, r;} }, { key: "parseScript", value: function value(t, n, i) {var r = n,o = new Uint8Array(t),a = o.buffer,s = new DataView(a, 0, i),u = null,f = s.getUint8(r);switch (r += 1, f) {case 0:u = s.getFloat64(r, !c), r += 8;break;case 1:u = !!s.getUint8(r), r += 1;break;case 2:var l = e.parseString(a, r);u = l.data, r += l.size;break;case 3:u = {};var d = 0;for (9 == (16777215 & s.getUint32(i - 4, !c)) && (d = 3); r < i - 4;) {var h = e.parseObject(a, r, i - n - d);if (h.objectEnd) break;u[h.data.name] = h.data.value, r = h.size;}if (r <= i - 3) {9 === (16777215 & v.getUint32(r - 1, !c)) && (r += 3);}break;case 8:u = {}, r += 4;for (9 == (16777215 & s.getUint32(i - 4, !c)) && 3; r < i - 8;) {var p = e.parseVariable(a, r);if (p.objectEnd) break;u[p.data.name] = p.data.value, r = p.size;}if (r <= i - 3) {9 === (16777215 & s.getUint32(r - 1, !c)) && (r += 3);}break;case 9:u = void 0, r = 1, !0;break;case 10:u = [];var m = s.getUint32(r, !c);r += 4;for (var y = 0; y < m; y++) {var g = e.parseScript(a, r);u.push(g.data), r = g.size;}break;case 11:var b = e.parseDate(a, r + 1, i - 1);u = b.data, r += b.size;break;case 12:var _ = e.parseString(a, r + 1, i - 1);u = _.data, r += _.size;break;default:r = i, console.log("AMF", "Unsupported AMF value type " + f, " at js_sdk\\chimee\\index.min.js:1");}return { data: u, size: r };} }]), e;}();t.default = f;}, function (e, t, n) {"use strict";function i(e) {for (var t = [], n = e, i = 0, o = e.length; i < o;) {if (n[i] < 128) t.push(String.fromCharCode(n[i])), ++i;else {if (n[i] < 192) ;else if (n[i] < 224) {if (r(n, i, 1)) {var a = (31 & n[i]) << 6 | 63 & n[i + 1];if (a >= 128) {t.push(String.fromCharCode(65535 & a)), i += 2;continue;}}} else if (n[i] < 240) {if (r(n, i, 2)) {var s = (15 & n[i]) << 12 | (63 & n[i + 1]) << 6 | 63 & n[i + 2];if (s >= 2048 && 55296 != (63488 & s)) {t.push(String.fromCharCode(65535 & s)), i += 3;continue;}}} else if (n[i] < 248 && r(n, i, 3)) {var u = (7 & n[i]) << 18 | (63 & n[i + 1]) << 12 | (63 & n[i + 2]) << 6 | 63 & n[i + 3];if (u > 65536 && u < 1114112) {u -= 65536, t.push(String.fromCharCode(u >>> 10 | 55296)), t.push(String.fromCharCode(1023 & u | 56320)), i += 4;continue;}}t.push(String.fromCharCode(65533)), ++i;}}return t.join("");}function r(e, t, n) {var i = e;if (t + n < i.length) {for (; n--;) {if (128 != (192 & i[++t])) return !1;}return !0;}return !1;}Object.defineProperty(t, "__esModule", { value: !0 }), t.default = i;}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),o = function () {function e(t) {i(this, e), this.TAG = this.constructor.name, this._buffer = t, this._buffer_index = 0, this._total_bytes = t.byteLength, this._total_bits = 8 * t.byteLength, this._current_word = 0, this._current_word_bits_left = 0;}return r(e, [{ key: "destroy", value: function value() {this._buffer = null;} }, { key: "_fillCurrentWord", value: function value() {var e = this._total_bytes - this._buffer_index;if (e <= 0) throw new IllegalStateException("ExpGolomb: _fillCurrentWord() but no bytes available");var t = Math.min(4, e),n = new Uint8Array(4);n.set(this._buffer.subarray(this._buffer_index, this._buffer_index + t)), this._current_word = new DataView(n.buffer).getUint32(0, !1), this._buffer_index += t, this._current_word_bits_left = 8 * t;} }, { key: "readBits", value: function value(e) {if (e > 32) throw new InvalidArgumentException("ExpGolomb: readBits() bits exceeded max 32bits!");if (e <= this._current_word_bits_left) {var t = this._current_word >>> 32 - e;return this._current_word <<= e, this._current_word_bits_left -= e, t;}var n = this._current_word_bits_left ? this._current_word : 0;n >>>= 32 - this._current_word_bits_left;var i = e - this._current_word_bits_left;this._fillCurrentWord();var r = Math.min(i, this._current_word_bits_left),o = this._current_word >>> 32 - r;return this._current_word <<= r, this._current_word_bits_left -= r, n = n << r | o;} }, { key: "readBool", value: function value() {return 1 === this.readBits(1);} }, { key: "readByte", value: function value() {return this.readBits(8);} }, { key: "_skipLeadingZero", value: function value() {var e = void 0;for (e = 0; e < this._current_word_bits_left; e++) {if (0 != (this._current_word & 2147483648 >>> e)) return this._current_word <<= e, this._current_word_bits_left -= e, e;}return this._fillCurrentWord(), e + this._skipLeadingZero();} }, { key: "readUEG", value: function value() {var e = this._skipLeadingZero();return this.readBits(e + 1) - 1;} }, { key: "readSEG", value: function value() {var e = this.readUEG();return 1 & e ? e + 1 >>> 1 : -1 * (e >>> 1);} }]), e;}();t.default = o;}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),o = function () {function e() {i(this, e), this.mimeType = null, this.duration = null, this.hasAudio = null, this.hasVideo = null, this.audioCodec = null, this.videoCodec = null, this.audioDataRate = null, this.videoDataRate = null, this.audioSampleRate = null, this.audioChannelCount = null, this.width = null, this.height = null, this.fps = null, this.profile = null, this.level = null, this.chromaFormat = null, this.sarNum = null, this.sarDen = null, this.metadata = null, this.segments = null, this.segmentCount = null, this.hasKeyframesIndex = null, this.keyframesIndex = null;}return r(e, [{ key: "isComplete", value: function value() {var e = !1 === this.hasAudio || !0 === this.hasAudio && null != this.audioCodec && null != this.audioSampleRate && null != this.audioChannelCount,t = !1 === this.hasVideo || !0 === this.hasVideo && null != this.videoCodec && null != this.width && null != this.height && null != this.fps && null != this.profile && null != this.level && null != this.chromaFormat && null != this.sarNum && null != this.sarDen;return null != this.mimeType && null != this.duration && null != this.metadata && null != this.hasKeyframesIndex && e && t;} }, { key: "isSeekable", value: function value() {return !0 === this.hasKeyframesIndex;} }]), e;}();t.default = o;}, function (e, t, n) {"use strict";function i(e) {return e && e.__esModule ? e : { default: e };}function r(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),a = n(136),s = i(a),u = n(137),c = i(u),f = n(64),l = i(f),d = n(138),h = function () {function e(t) {r(this, e), this.TAG = "MP4Remuxer", this._isLive = !0 === t.isLive, this._dtsBase = -1, this._dtsBaseInited = !1, this._audioDtsBase = 1 / 0, this._videoDtsBase = 1 / 0, this._audioNextDts = void 0, this._videoNextDts = void 0, this._audioMeta = null, this._videoMeta = null, this._audioSegmentInfoList = new d.MediaSegmentInfoList("audio"), this._videoSegmentInfoList = new d.MediaSegmentInfoList("video"), this._onInitSegment = null, this._onMediaSegment = null, this._forceFirstIDR = !(!c.default.chrome || !(c.default.version.major < 50 || 50 === c.default.version.major && c.default.version.build < 2661)), this._fillSilentAfterSeek = c.default.msedge || c.default.msie, this._mp3UseMpegAudio = !c.default.firefox;}return o(e, [{ key: "destroy", value: function value() {this._dtsBase = -1, this._dtsBaseInited = !1, this._audioMeta = null, this._videoMeta = null, this._audioSegmentInfoList.clear(), this._audioSegmentInfoList = null, this._videoSegmentInfoList.clear(), this._videoSegmentInfoList = null, this._onInitSegment = null, this._onMediaSegment = null;} }, { key: "bindDataSource", value: function value(e) {return e.onDataAvailable = this.remux.bind(this), e.onTrackMetadata = this._onTrackMetadataReceived.bind(this), this;} }, { key: "insertDiscontinuity", value: function value() {this._audioNextDts = this._videoNextDts = void 0;} }, { key: "seek", value: function value(e) {this._videoSegmentInfoList.clear(), this._audioSegmentInfoList.clear();} }, { key: "remux", value: function value(e, t) {if (!this._onMediaSegment) throw new IllegalStateException("MP4Remuxer: onMediaSegment callback must be specificed!");this._dtsBaseInited || this._calculateDtsBase(e, t), this._remuxVideo(t), this._remuxAudio(e);} }, { key: "_onTrackMetadataReceived", value: function value(e, t) {var n = null,i = "mp4",r = t.codec;if ("audio" === e) this._audioMeta = t, "mp3" === t.codec && this._mp3UseMpegAudio ? (i = "mpeg", r = "", n = new Uint8Array()) : n = l.default.generateInitSegment(t);else {if ("video" !== e) return;this._videoMeta = t, n = l.default.generateInitSegment(t);}if (!this._onInitSegment) throw new IllegalStateException("MP4Remuxer: onInitSegment callback must be specified!");this._onInitSegment(e, { type: e, data: n.buffer, codec: r, container: e + "/" + i, mediaDuration: t.duration });} }, { key: "_calculateDtsBase", value: function value(e, t) {this._dtsBaseInited || (e.samples && e.samples.length && (this._audioDtsBase = e.samples[0].dts), t.samples && t.samples.length && (this._videoDtsBase = t.samples[0].dts), this._dtsBase = Math.min(this._audioDtsBase, this._videoDtsBase), this._dtsBaseInited = !0);} }, { key: "_remuxAudio", value: function value(e) {if (null != this._audioMeta) {var t = e,n = t.samples,i = void 0,r = -1,o = -1,a = this._audioMeta.refSampleDuration,u = "mp3" === this._audioMeta.codec && this._mp3UseMpegAudio,c = this._dtsBaseInited && void 0 === this._audioNextDts,f = !1;if (n && !(n.length <= 1)) {var h = 0,v = null,p = 0;u ? (h = 0, p = t.length) : (h = 8, p = 8 + t.length);var m = n[0].dts - this._dtsBase;if (this._audioNextDts) i = m - this._audioNextDts;else if (this._audioSegmentInfoList.isEmpty()) i = 0, this._fillSilentAfterSeek && !this._videoSegmentInfoList.isEmpty() && "mp3" !== this._audioMeta.originalCodec && (f = !0);else {var y = this._audioSegmentInfoList.getLastSampleBefore(m);if (null != y) {var g = m - (y.originalDts + y.duration);g <= 3 && (g = 0);var b = y.dts + y.duration + g;i = m - b;} else i = 0;}if (f) {var _ = m - i,w = this._videoSegmentInfoList.getLastSegmentBefore(m);if (null != w && w.beginDts < _) {var k = s.default.getSilentFrame(this._audioMeta.originalCodec, this._audioMeta.channelCount);if (k) {var S = w.beginDts,E = _ - w.beginDts;Log.v(this.TAG, "InsertPrefixSilentAudio: dts: " + S + ", duration: " + E), n.unshift({ unit: k, dts: S, pts: S }), p += k.byteLength;}} else f = !1;}var x = [];i = 0;for (var T = 0; T + 1 < n.length; T++) {var O = n[T],A = (O.unit, O.dts - this._dtsBase),R = A - i;-1 === r && (r = R);var M = 0;if (T !== n.length - 1) {M = n[T + 1].dts - this._dtsBase - i - R;} else M = x.length >= 1 ? x[x.length - 1].duration : Math.floor(a);x.push({ dts: R, pts: R, cts: 0, unit: O.unit, size: O.unit.byteLength, duration: M, originalDts: A, flags: { isLeading: 0, dependsOn: 1, isDependedOn: 0, hasRedundancy: 0 } });}if (u) v = new Uint8Array(p);else {for (var D = 8, C = 0; C < x.length; ++C) {D += x[C].size;}v = new Uint8Array(D), v[0] = D >>> 24 & 255, v[1] = D >>> 16 & 255, v[2] = D >>> 8 & 255, v[3] = 255 & D, v.set(l.default.types.mdat, 4);}for (var B = 0; B < x.length; B++) {var L = x[B].unit;v.set(L, h), h += L.byteLength;}var I = x[x.length - 1];o = I.dts + I.duration, this._audioNextDts = o;var P = new d.MediaSegmentInfo();P.beginDts = r, P.endDts = o, P.beginPts = r, P.endPts = o, P.originalBeginDts = x[0].originalDts, P.originalEndDts = I.originalDts + I.duration, P.firstSample = new d.SampleInfo(x[0].dts, x[0].pts, x[0].duration, x[0].originalDts, !1), P.lastSample = new d.SampleInfo(I.dts, I.pts, I.duration, I.originalDts, !1), this._isLive || this._audioSegmentInfoList.append(P), t.samples = x, t.sequenceNumber++;var j = null;j = u ? new Uint8Array() : l.default.moof(t, r), t.samples = [n[n.length - 1]], t.length = 0;var N = { type: "audio", data: this._mergeBoxes(j, v).buffer, sampleCount: x.length, info: P };u && c && (N.timestampOffset = r), this._onMediaSegment("audio", N);}}} }, { key: "_remuxVideo", value: function value(e) {if (null != this._videoMeta) {var t = e,n = t.samples,i = void 0,r = -1,o = -1,a = -1,s = -1;if (n && !(n.length <= 1)) {var u = n[0].dts - this._dtsBase;if (this._videoNextDts) i = Math.max(u - this._videoNextDts, 0);else if (this._videoSegmentInfoList.isEmpty()) i = 0;else {var c = this._videoSegmentInfoList.getLastSampleBefore(u);if (null != c) {var f = u - (c.originalDts + c.duration);f <= 3 && (f = 0);var h = c.dts + c.duration + f;i = u - h;} else i = 0;}var v = new d.MediaSegmentInfo(),p = [],m = i;i = 0;for (var y = 0; y + 1 < n.length; y++) {var g = n[y],b = g.dts - this._dtsBase - (0 == y ? m : 0),_ = g.isKeyframe,w = b - i,k = g.cts,S = w + k;-1 === r && (r = w, a = S);var E = 0;if (y !== n.length - 1) {E = n[y + 1].dts - this._dtsBase - i - w;} else E = p.length >= 1 ? p[p.length - 1].duration : Math.floor(this._videoMeta.refSampleDuration);if (_) {var x = new d.SampleInfo(w, S, E, g.dts, !0);x.fileposition = g.fileposition, v.appendSyncPoint(x);}p.push({ dts: w, pts: S, cts: k, units: g.units, size: g.length, isKeyframe: _, duration: E, originalDts: b, flags: { isLeading: 0, dependsOn: _ ? 2 : 1, isDependedOn: _ ? 1 : 0, hasRedundancy: 0, isNonSync: _ ? 0 : 1 } });}for (var T = 8, O = 8, A = 0; A < p.length; ++A) {O += p[A].size;}var R = new Uint8Array(O);R[0] = O >>> 24 & 255, R[1] = O >>> 16 & 255, R[2] = O >>> 8 & 255, R[3] = 255 & O, R.set(l.default.types.mdat, 4);for (var M = 0; M < p.length; M++) {for (var D = p[M].units; D.length;) {var C = D.shift(),B = C.data;R.set(B, T), T += B.byteLength;}}var L = p[p.length - 1];if (o = L.dts + L.duration, s = L.pts + L.duration, this._videoNextDts = o, v.beginDts = r, v.endDts = o, v.beginPts = a, v.endPts = s, v.originalBeginDts = p[0].originalDts, v.originalEndDts = L.originalDts + L.duration, v.firstSample = new d.SampleInfo(p[0].dts, p[0].pts, p[0].duration, p[0].originalDts, p[0].isKeyframe), v.lastSample = new d.SampleInfo(L.dts, L.pts, L.duration, L.originalDts, L.isKeyframe), this._isLive || this._videoSegmentInfoList.append(v), t.samples = p, t.sequenceNumber++, this._forceFirstIDR) {var I = p[0].flags;I.dependsOn = 2, I.isNonSync = 0;}var P = l.default.moof(t, r);t.samples = [n[n.length - 1]], t.length = 0, this._onMediaSegment("video", { type: "video", data: this._mergeBoxes(P, R).buffer, sampleCount: p.length, info: v });}}} }, { key: "_mergeBoxes", value: function value(e, t) {var n = new Uint8Array(e.byteLength + t.byteLength);return n.set(e, 0), n.set(t, e.byteLength), n;} }, { key: "onInitSegment", get: function get() {return this._onInitSegment;}, set: function set(e) {this._onInitSegment = e;} }, { key: "onMediaSegment", get: function get() {return this._onMediaSegment;}, set: function set(e) {this._onMediaSegment = e;} }]), e;}();t.default = h;}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),o = function () {function e() {i(this, e);}return r(e, null, [{ key: "getSilentFrame", value: function value(e) {return 1 === e ? new Uint8Array([0, 200, 0, 128, 35, 128]) : 2 === e ? new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]) : 3 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]) : 4 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]) : 5 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]) : 6 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]) : null;} }]), e;}();t.default = o;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var i = {};!function () {var e = self.navigator.userAgent.toLowerCase(),t = /(edge)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(iemobile)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],n = /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(android)/.exec(e) || /(windows)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || [],r = { browser: t[5] || t[3] || t[1] || "", version: t[2] || t[4] || "0", majorVersion: t[4] || t[2] || "0", platform: n[0] || "" },o = {};if (r.browser) {o[r.browser] = !0;var a = r.majorVersion.split(".");o.version = { major: parseInt(r.majorVersion, 10), string: r.version }, a.length > 1 && (o.version.minor = parseInt(a[1], 10)), a.length > 2 && (o.version.build = parseInt(a[2], 10));}r.platform && (o[r.platform] = !0), (o.chrome || o.opr || o.safari) && (o.webkit = !0), (o.rv || o.iemobile) && (o.rv && delete o.rv, r.browser = "msie", o.msie = !0), o.edge && (delete o.edge, r.browser = "msedge", o.msedge = !0), o.opr && (r.browser = "opera", o.opera = !0), o.safari && o.android && (r.browser = "android", o.android = !0), o.name = r.browser, o.platform = r.platform;for (var s in i) {i.hasOwnProperty(s) && delete i[s];}i = o;}(), t.default = i;}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}();t.SampleInfo = function e(t, n, r, o, a) {i(this, e), this.dts = t, this.pts = n, this.duration = r, this.originalDts = o, this.isSyncPoint = a, this.fileposition = null;}, t.MediaSegmentInfo = function () {function e() {i(this, e), this.beginDts = 0, this.endDts = 0, this.beginPts = 0, this.endPts = 0, this.originalBeginDts = 0, this.originalEndDts = 0, this.syncPoints = [], this.firstSample = null, this.lastSample = null;}return r(e, [{ key: "appendSyncPoint", value: function value(e) {e.isSyncPoint = !0, this.syncPoints.push(e);} }]), e;}(), t.IDRSampleList = function () {function e() {i(this, e), this._list = [];}return r(e, [{ key: "clear", value: function value() {this._list = [];} }, { key: "appendArray", value: function value(e) {var t = this._list;0 !== e.length && (t.length > 0 && e[0].originalDts < t[t.length - 1].originalDts && this.clear(), Array.prototype.push.apply(t, e));} }, { key: "getLastSyncPointBeforeDts", value: function value(e) {if (0 == this._list.length) return null;var t = this._list,n = 0,i = t.length - 1,r = 0,o = 0,a = i;for (e < t[0].dts && (n = 0, o = a + 1); o <= a;) {if ((r = o + Math.floor((a - o) / 2)) === i || e >= t[r].dts && e < t[r + 1].dts) {n = r;break;}t[r].dts < e ? o = r + 1 : a = r - 1;}return this._list[n];} }]), e;}(), t.MediaSegmentInfoList = function () {function e(t) {i(this, e), this._type = t, this._list = [], this._lastAppendLocation = -1;}return r(e, [{ key: "isEmpty", value: function value() {return 0 === this._list.length;} }, { key: "clear", value: function value() {this._list = [], this._lastAppendLocation = -1;} }, { key: "_searchNearestSegmentBefore", value: function value(e) {var t = this._list;if (0 === t.length) return -2;var n = t.length - 1,i = 0,r = 0,o = n,a = 0;if (e < t[0].originalBeginDts) return a = -1;for (; r <= o;) {if ((i = r + Math.floor((o - r) / 2)) === n || e > t[i].lastSample.originalDts && e < t[i + 1].originalBeginDts) {a = i;break;}t[i].originalBeginDts < e ? r = i + 1 : o = i - 1;}return a;} }, { key: "_searchNearestSegmentAfter", value: function value(e) {return this._searchNearestSegmentBefore(e) + 1;} }, { key: "append", value: function value(e) {var t = this._list,n = e,i = this._lastAppendLocation,r = 0;-1 !== i && i < t.length && n.originalBeginDts >= t[i].lastSample.originalDts && (i === t.length - 1 || i < t.length - 1 && n.originalBeginDts < t[i + 1].originalBeginDts) ? r = i + 1 : t.length > 0 && (r = this._searchNearestSegmentBefore(n.originalBeginDts) + 1), this._lastAppendLocation = r, this._list.splice(r, 0, n);} }, { key: "getLastSegmentBefore", value: function value(e) {var t = this._searchNearestSegmentBefore(e);return t >= 0 ? this._list[t] : null;} }, { key: "getLastSampleBefore", value: function value(e) {var t = this.getLastSegmentBefore(e);return null != t ? t.lastSample : null;} }, { key: "getLastSyncPointBefore", value: function value(e) {for (var t = this._searchNearestSegmentBefore(e), n = this._list[t].syncPoints; 0 === n.length && t > 0;) {t--, n = this._list[t].syncPoints;}return n.length > 0 ? n[n.length - 1] : null;} }, { key: "type", get: function get() {return this._type;} }, { key: "length", get: function get() {return this._list.length;} }]), e;}();}, function (e, t, n) {"use strict";function i(e) {return e && e.__esModule ? e : { default: e };}Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function (e) {function t() {p = new o.default(y), p.onInitSegment = n, p.onMediaSegment = i, p.onError = r, p.onMediaInfo = a, p.onCdnDropFrame = c, p.on("error", function (e) {self.postMessage({ cmd: "error", source: e.data });});}function n(e, t) {self.postMessage({ cmd: "mediaSegmentInit", source: { type: "video", data: e } }), t && self.postMessage({ cmd: "mediaSegmentInit", source: { type: "audio", data: t } });}function i(e, t) {self.postMessage({ cmd: "mediaSegment", source: { type: e, data: t } });}function r(e) {self.postMessage({ cmd: "error", source: e });}function a(e) {self.postMessage({ cmd: "mediainfo", source: e });}function c(e) {self.postMessage({ cmd: "cdnDropFrame", source: e });}function f(e) {m.seek(e.keyframePoint, !1, e.keyframetime);}function l() {m && (m.destroy(), v(m), m = null), p && (p.off("error"), p = null);}function d(e, n, i) {return p || t(), i && p.seek(i), self.postMessage({ cmd: "player-event", source: { type: u.PLAYER_EVENTS.MEDIA_DEMUX_FLV, ts: Date.now() } }), p.setflv(e);}function h() {m && (m.on("end", function () {self.postMessage({ cmd: "end" });}), m.on("error", function (e) {self.postMessage({ cmd: "error", source: e.data });}), m.on("heartbeat", function (e) {self.postMessage({ cmd: "heartbeat", source: e.data });}), m.on("player-event", function (e) {self.postMessage({ cmd: "player-event", source: e.data });}));}function v(e) {e && (e.off("end"), e.off("error"), e.off("heartbeat"), e.off("player-event"));}var p = null,m = null,y = {};e.addEventListener("message", function (e) {switch (e.data.cmd) {case "init":y = e.data.data;break;case "loadSource":m = new s.default(y), h(), m.arrivalDataCallback = d, m.open();break;case "pause":m.pause();break;case "seek":f(e.data.keyframe);break;case "resume":m.resume();break;case "destroy":l();}});};var r = n(61),o = i(r),a = n(59),s = i(a),u = n(15);}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.default = { isLive: !1, box: "flv", seekInKeyframe: !0, alwaysSeekKeyframe: !0, lazyLoadMaxDuration: 120, lazyLoadRecoverDuration: 30, lockInternalProperty: !1, debug: !0, webWorker: !1, autoCleanupSourceBuffer: !0, autoCleanupMaxBackwardDuration: 10, autoCleanupMinBackwardDuration: 10, stashSize: 393216, seekType: "range" };}, function (e, t, n) {var i;!function (r, o) {"use strict";var a = "model",s = "name",u = "type",c = "vendor",f = "version",l = "mobile",d = "tablet",h = { extend: function extend(e, t) {var n = {};for (var i in e) {t[i] && t[i].length % 2 == 0 ? n[i] = t[i].concat(e[i]) : n[i] = e[i];}return n;}, has: function has(e, t) {return "string" == typeof e && -1 !== t.toLowerCase().indexOf(e.toLowerCase());}, lowerize: function lowerize(e) {return e.toLowerCase();}, major: function major(e) {return "string" == typeof e ? e.replace(/[^\d\.]/g, "").split(".")[0] : void 0;}, trim: function trim(e) {return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");} },v = { rgx: function rgx(e, t) {for (var n, i, r, o, a, s, u = 0; u < t.length && !a;) {var c = t[u],f = t[u + 1];for (n = i = 0; n < c.length && !a;) {if (a = c[n++].exec(e)) for (r = 0; r < f.length; r++) {s = a[++i], o = f[r], "object" == typeof o && o.length > 0 ? 2 == o.length ? "function" == typeof o[1] ? this[o[0]] = o[1].call(this, s) : this[o[0]] = o[1] : 3 == o.length ? "function" != typeof o[1] || o[1].exec && o[1].test ? this[o[0]] = s ? s.replace(o[1], o[2]) : void 0 : this[o[0]] = s ? o[1].call(this, s, o[2]) : void 0 : 4 == o.length && (this[o[0]] = s ? o[3].call(this, s.replace(o[1], o[2])) : void 0) : this[o] = s || void 0;}}u += 2;}}, str: function str(e, t) {for (var n in t) {if ("object" == typeof t[n] && t[n].length > 0) {for (var i = 0; i < t[n].length; i++) {if (h.has(t[n][i], e)) return "?" === n ? void 0 : n;}} else if (h.has(t[n], e)) return "?" === n ? void 0 : n;}return e;} },p = { browser: { oldsafari: { version: { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" } } }, device: { amazon: { model: { "Fire Phone": ["SD", "KF"] } }, sprint: { model: { "Evo Shift 4G": "7373KT" }, vendor: { HTC: "APA", Sprint: "Sprint" } } }, os: { windows: { version: { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2000: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" } } } },m = { browser: [[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], [s, f], [/(opios)[\/\s]+([\w\.]+)/i], [[s, "Opera Mini"], f], [/\s(opr)\/([\w\.]+)/i], [[s, "Opera"], f], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]*)/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i], [s, f], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i], [[s, "IE"], f], [/(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i], [[s, "Edge"], f], [/(yabrowser)\/([\w\.]+)/i], [[s, "Yandex"], f], [/(puffin)\/([\w\.]+)/i], [[s, "Puffin"], f], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i], [[s, "UCBrowser"], f], [/(comodo_dragon)\/([\w\.]+)/i], [[s, /_/g, " "], f], [/(micromessenger)\/([\w\.]+)/i], [[s, "WeChat"], f], [/(qqbrowserlite)\/([\w\.]+)/i], [s, f], [/(QQ)\/([\d\.]+)/i], [s, f], [/m?(qqbrowser)[\/\s]?([\w\.]+)/i], [s, f], [/(BIDUBrowser)[\/\s]?([\w\.]+)/i], [s, f], [/(2345Explorer)[\/\s]?([\w\.]+)/i], [s, f], [/(MetaSr)[\/\s]?([\w\.]+)/i], [s], [/(LBBROWSER)/i], [s], [/xiaomi\/miuibrowser\/([\w\.]+)/i], [f, [s, "MIUI Browser"]], [/;fbav\/([\w\.]+);/i], [f, [s, "Facebook"]], [/headlesschrome(?:\/([\w\.]+)|\s)/i], [f, [s, "Chrome Headless"]], [/\swv\).+(chrome)\/([\w\.]+)/i], [[s, /(.+)/, "$1 WebView"], f], [/((?:oculus|samsung)browser)\/([\w\.]+)/i], [[s, /(.+(?:g|us))(.+)/, "$1 $2"], f], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i], [f, [s, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i], [s, f], [/(dolfin)\/([\w\.]+)/i], [[s, "Dolphin"], f], [/((?:android.+)crmo|crios)\/([\w\.]+)/i], [[s, "Chrome"], f], [/(coast)\/([\w\.]+)/i], [[s, "Opera Coast"], f], [/fxios\/([\w\.-]+)/i], [f, [s, "Firefox"]], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i], [f, [s, "Mobile Safari"]], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i], [f, s], [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [[s, "GSA"], f], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [s, [f, v.str, p.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i], [s, f], [/(navigator|netscape)\/([\w\.-]+)/i], [[s, "Netscape"], f], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [s, f]], cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [["architecture", "amd64"]], [/(ia32(?=;))/i], [["architecture", h.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [["architecture", "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [["architecture", "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [["architecture", /ower/, "", h.lowerize]], [/(sun4\w)[;\)]/i], [["architecture", "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [["architecture", h.lowerize]]], device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [a, c, [u, d]], [/applecoremedia\/[\w\.]+ \((ipad)/], [a, [c, "Apple"], [u, d]], [/(apple\s{0,1}tv)/i], [[a, "Apple TV"], [c, "Apple"]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [c, a, [u, d]], [/(kf[A-z]+)\sbuild\/.+silk\//i], [a, [c, "Amazon"], [u, d]], [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i], [[a, v.str, p.device.amazon.model], [c, "Amazon"], [u, l]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [a, c, [u, l]], [/\((ip[honed|\s\w*]+);/i], [a, [c, "Apple"], [u, l]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [c, a, [u, l]], [/\(bb10;\s(\w+)/i], [a, [c, "BlackBerry"], [u, l]], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i], [a, [c, "Asus"], [u, d]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [[c, "Sony"], [a, "Xperia Tablet"], [u, d]], [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i], [a, [c, "Sony"], [u, l]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], [c, a, [u, "console"]], [/android.+;\s(shield)\sbuild/i], [a, [c, "Nvidia"], [u, "console"]], [/(playstation\s[34portablevi]+)/i], [a, [c, "Sony"], [u, "console"]], [/(sprint\s(\w+))/i], [[c, v.str, p.device.sprint.vendor], [a, v.str, p.device.sprint.model], [u, l]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], [c, a, [u, d]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i], [c, [a, /_/g, " "], [u, l]], [/(nexus\s9)/i], [a, [c, "HTC"], [u, d]], [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i], [a, [c, "Huawei"], [u, l]], [/(microsoft);\s(lumia[\s\w]+)/i], [c, a, [u, l]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], [a, [c, "Microsoft"], [u, "console"]], [/(kin\.[onetw]{3})/i], [[a, /\./g, " "], [c, "Microsoft"], [u, l]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i], [a, [c, "Motorola"], [u, l]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [a, [c, "Motorola"], [u, d]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i], [[c, h.trim], [a, h.trim], [u, "smarttv"]], [/hbbtv.+maple;(\d+)/i], [[a, /^/, "SmartTV"], [c, "Samsung"], [u, "smarttv"]], [/\(dtv[\);].+(aquos)/i], [a, [c, "Sharp"], [u, "smarttv"]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[c, "Samsung"], a, [u, d]], [/smart-tv.+(samsung)/i], [c, [u, "smarttv"], a], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i], [[c, "Samsung"], a, [u, l]], [/sie-(\w*)/i], [a, [c, "Siemens"], [u, l]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i], [[c, "Nokia"], a, [u, l]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i], [a, [c, "Acer"], [u, d]], [/android.+([vl]k\-?\d{3})\s+build/i], [a, [c, "LG"], [u, d]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [[c, "LG"], a, [u, d]], [/(lg) netcast\.tv/i], [c, a, [u, "smarttv"]], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i], [a, [c, "LG"], [u, l]], [/android.+(ideatab[a-z0-9\-\s]+)/i], [a, [c, "Lenovo"], [u, d]], [/linux;.+((jolla));/i], [c, a, [u, l]], [/((pebble))app\/[\d\.]+\s/i], [c, a, [u, "wearable"]], [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i], [c, a, [u, l]], [/crkey/i], [[a, "Chromecast"], [c, "Google"]], [/android.+;\s(glass)\s\d/i], [a, [c, "Google"], [u, "wearable"]], [/android.+;\s(pixel c)\s/i], [a, [c, "Google"], [u, d]], [/android.+;\s(pixel xl|pixel)\s/i], [a, [c, "Google"], [u, l]], [/android.+;\s(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i], [[a, /_/g, " "], [c, "Xiaomi"], [u, l]], [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i], [[a, /_/g, " "], [c, "Xiaomi"], [u, d]], [/android.+;\s(m[1-5]\snote)\sbuild/i], [a, [c, "Meizu"], [u, d]], [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i], [a, [c, "OnePlus"], [u, l]], [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i], [a, [c, "RCA"], [u, d]], [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i], [a, [c, "Dell"], [u, d]], [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i], [a, [c, "Verizon"], [u, d]], [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i], [[c, "Barnes & Noble"], a, [u, d]], [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i], [a, [c, "NuVision"], [u, d]], [/android.+;\s(k88)\sbuild/i], [a, [c, "ZTE"], [u, d]], [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i], [a, [c, "Swiss"], [u, l]], [/android.+[;\/]\s*(zur\d{3})\s+build/i], [a, [c, "Swiss"], [u, d]], [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i], [a, [c, "Zeki"], [u, d]], [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i], [[c, "Dragon Touch"], a, [u, d]], [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i], [a, [c, "Insignia"], [u, d]], [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i], [a, [c, "NextBook"], [u, d]], [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i], [[c, "Voice"], a, [u, l]], [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i], [[c, "LvTel"], a, [u, l]], [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i], [a, [c, "Envizen"], [u, d]], [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i], [c, a, [u, d]], [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i], [a, [c, "MachSpeed"], [u, d]], [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i], [c, a, [u, d]], [/android.+[;\/]\s*TU_(1491)\s+build/i], [a, [c, "Rotor"], [u, d]], [/android.+(KS(.+))\s+build/i], [a, [c, "Amazon"], [u, d]], [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i], [c, a, [u, d]], [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i], [[u, h.lowerize], c, a], [/(android[\w\.\s\-]{0,9});.+build/i], [a, [c, "Generic"]]], engine: [[/windows.+\sedge\/([\w\.]+)/i], [f, [s, "EdgeHTML"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [s, f], [/rv\:([\w\.]{1,9}).+(gecko)/i], [f, s]], os: [[/microsoft\s(windows)\s(vista|xp)/i], [s, f], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [s, [f, v.str, p.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[s, "Windows"], [f, v.str, p.os.windows.version]], [/\((bb)(10);/i], [[s, "BlackBerry"], f], [/(blackberry)\w*\/?([\w\.]*)/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i, /linux;.+(sailfish);/i], [s, f], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i], [[s, "Symbian"], f], [/\((series40);/i], [s], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[s, "Firefox OS"], f], [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i], [s, f], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[s, "Chromium OS"], f], [/(sunos)\s?([\w\.\d]*)/i], [[s, "Solaris"], f], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i], [s, f], [/(haiku)\s(\w+)/i], [s, f], [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i], [[f, /_/g, "."], [s, "iOS"]], [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i], [[s, "Mac OS"], [f, /_/g, "."]], [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]*)/i], [s, f]] },y = function y(e, t) {if ("object" == typeof e && (t = e, e = void 0), !(this instanceof y)) return new y(e, t).getResult();var n = e || (r && r.navigator && r.navigator.userAgent ? r.navigator.userAgent : ""),i = t ? h.extend(m, t) : m;return this.getBrowser = function () {var e = { name: void 0, version: void 0 };return v.rgx.call(e, n, i.browser), e.major = h.major(e.version), e;}, this.getCPU = function () {var e = { architecture: void 0 };return v.rgx.call(e, n, i.cpu), e;}, this.getDevice = function () {var e = { vendor: void 0, model: void 0, type: void 0 };return v.rgx.call(e, n, i.device), e;}, this.getEngine = function () {var e = { name: void 0, version: void 0 };return v.rgx.call(e, n, i.engine), e;}, this.getOS = function () {var e = { name: void 0, version: void 0 };return v.rgx.call(e, n, i.os), e;}, this.getResult = function () {return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };}, this.getUA = function () {return n;}, this.setUA = function (e) {return n = e, this;}, this;};y.VERSION = "0.7.18", y.BROWSER = { NAME: s, MAJOR: "major", VERSION: f }, y.CPU = { ARCHITECTURE: "architecture" }, y.DEVICE = { MODEL: a, VENDOR: c, TYPE: u, CONSOLE: "console", MOBILE: l, SMARTTV: "smarttv", TABLET: d, WEARABLE: "wearable", EMBEDDED: "embedded" }, y.ENGINE = { NAME: s, VERSION: f }, y.OS = { NAME: s, VERSION: f }, void 0 !== t ? (void 0 !== e && e.exports && (t = e.exports = y), t.UAParser = y) : n(142) ? void 0 !== (i = function () {return y;}.call(t, n, t, e)) && (e.exports = i) : r && (r.UAParser = y);var g = r && (r.jQuery || r.Zepto);if (void 0 !== g) {var b = new y();g.ua = b.getResult(), g.ua.get = function () {return b.getUA();}, g.ua.set = function (e) {b.setUA(e);var t = b.getResult();for (var n in t) {g.ua[n] = t[n];}};}}("object" == typeof window ? window : this);}, function (e, t) {(function (t) {e.exports = t;}).call(t, {});}, function (e, t, n) {"use strict";function i(e) {function t(i, r, o) {if (Object(p.b)(i) || Object(p.r)(i)) {r = Object(p.t)(r) ? Object(p.r)(i) ? {} : [] : r;for (var a in i) {n(r, a, t(i[a], r[a], a));}return r;}return e(i, r, o);}var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function (e, t, n) {e[t] = n;};return t;}function r(e) {if (Object(p.t)(e)) throw new TypeError("deepClone only accept non primitive type");return m(e);}function o() {for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) {t[n] = arguments[n];}if (t.length < 2) throw new Error("deepAssign accept two and more argument");for (var i = t.length - 1; i > -1; i--) {if (Object(p.t)(t[i])) throw new TypeError("deepAssign only accept non primitive type");}var r = t.shift();return t.forEach(function (e) {return m(e, r);}), r;}function a(e, t) {return e.replace(/(^|[^a-zA-Z]+)([a-zA-Z])/g, function (e, n, i, r) {return t || 0 !== r ? i.toUpperCase() : i.toLowerCase();});}function s(e) {return a(e).replace(/([A-Z])/g, function (e) {return "-" + e.toLowerCase();});}function u(e, t) {return e.bind ? e.bind(t) : e.apply ? function () {for (var n = arguments.length, i = Array(n), r = 0; r < n; r++) {i[r] = arguments[r];}return e.apply(t, i);} : function () {for (var n = arguments.length, i = Array(n), r = 0; r < n; r++) {i[r] = arguments[r];}return e.call.apply(e, [t].concat(v()(i)));};}function c() {return f() + f() + "-" + f() + "-" + f() + "-" + f() + "-" + f() + f() + f();}function f() {return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);}function l(e) {for (var t = ""; t.length < e;) {t += f();}return t.slice(0, e);}function d(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},i = n.throwError,r = void 0 !== i && i,o = n.backup;if (Object(p.w)(t) && (t = t.split(".")), !Object(p.b)(t)) throw new TypeError("keys of getDeepProperty must be string or Array<string>");for (var a = [], s = e, u = 0, c = t.length; u < c; u++) {var f = t[u];if (Object(p.y)(s)) {if (r) throw new Error("obj" + (a.length > 0 ? "." + a.join(".") : " itself") + " is " + s);return o;}s = s[f], a.push(f);}return s;}n.d(t, "f", function () {return i;}), n.d(t, "e", function () {return r;}), n.d(t, "d", function () {return o;}), n.d(t, "c", function () {return a;}), n.d(t, "h", function () {return s;}), n.d(t, "b", function () {return u;}), n.d(t, "j", function () {return c;}), n.d(t, "a", function () {return f;}), n.d(t, "i", function () {return l;}), n.d(t, "g", function () {return d;});var h = n(66),v = n.n(h),p = n(13),m = i(function (e) {return e;});}, function (e, t, n) {n(29), n(145), e.exports = n(0).Array.from;}, function (e, t, n) {"use strict";var i = n(17),r = n(2),o = n(26),a = n(67),s = n(68),u = n(34),c = n(146),f = n(69);r(r.S + r.F * !n(71)(function (e) {Array.from(e);}), "Array", { from: function from(e) {var t,n,r,l,d = o(e),h = "function" == typeof this ? this : Array,v = arguments.length,p = v > 1 ? arguments[1] : void 0,m = void 0 !== p,y = 0,g = f(d);if (m && (p = i(p, v > 2 ? arguments[2] : void 0, 2)), void 0 == g || h == Array && s(g)) for (t = u(d.length), n = new h(t); t > y; y++) {c(n, y, m ? p(d[y], y) : d[y]);} else for (l = g.call(d), n = new h(); !(r = l.next()).done; y++) {c(n, y, m ? a(l, p, [r.value, y], !0) : r.value);}return n.length = y, n;} });}, function (e, t, n) {"use strict";var i = n(5),r = n(18);e.exports = function (e, t, n) {t in e ? i.f(e, t, r(0, n)) : e[t] = n;};}, function (e, t, n) {e.exports = { default: n(148), __esModule: !0 };}, function (e, t, n) {n(55), n(29), n(53), n(149), n(157), n(158), e.exports = n(0).Promise;}, function (e, t, n) {"use strict";var i,r,o,a,s = n(16),u = n(1),c = n(17),f = n(70),l = n(2),d = n(7),h = n(23),v = n(150),p = n(151),m = n(73),y = n(74).set,g = n(153)(),b = n(46),_ = n(75),w = n(154),k = n(76),S = u.TypeError,E = u.process,x = E && E.versions,T = x && x.v8 || "",_O = u.Promise,A = "process" == f(E),R = function R() {},M = r = b.f,D = !!function () {try {var e = _O.resolve(1),t = (e.constructor = {})[n(3)("species")] = function (e) {e(R, R);};return (A || "function" == typeof PromiseRejectionEvent) && e.then(R) instanceof t && 0 !== T.indexOf("6.6") && -1 === w.indexOf("Chrome/66");} catch (e) {}}(),C = function C(e) {var t;return !(!d(e) || "function" != typeof (t = e.then)) && t;},B = function B(e, t) {if (!e._n) {e._n = !0;var n = e._c;g(function () {for (var i = e._v, r = 1 == e._s, o = 0; n.length > o;) {!function (t) {var n,o,a,s = r ? t.ok : t.fail,u = t.resolve,c = t.reject,f = t.domain;try {s ? (r || (2 == e._h && P(e), e._h = 1), !0 === s ? n = i : (f && f.enter(), n = s(i), f && (f.exit(), a = !0)), n === t.promise ? c(S("Promise-chain cycle")) : (o = C(n)) ? o.call(n, u, c) : u(n)) : c(i);} catch (e) {f && !a && f.exit(), c(e);}}(n[o++]);}e._c = [], e._n = !1, t && !e._h && L(e);});}},L = function L(e) {y.call(u, function () {var t,n,i,r = e._v,o = I(e);if (o && (t = _(function () {A ? E.emit("unhandledRejection", r, e) : (n = u.onunhandledrejection) ? n({ promise: e, reason: r }) : (i = u.console) && i.error && i.error("Unhandled promise rejection", r);}), e._h = A || I(e) ? 2 : 1), e._a = void 0, o && t.e) throw t.v;});},I = function I(e) {return 1 !== e._h && 0 === (e._a || e._c).length;},P = function P(e) {y.call(u, function () {var t;A ? E.emit("rejectionHandled", e) : (t = u.onrejectionhandled) && t({ promise: e, reason: e._v });});},j = function j(e) {var t = this;t._d || (t._d = !0, t = t._w || t, t._v = e, t._s = 2, t._a || (t._a = t._c.slice()), B(t, !0));},N = function N(e) {var t,n = this;if (!n._d) {n._d = !0, n = n._w || n;try {if (n === e) throw S("Promise can't be resolved itself");(t = C(e)) ? g(function () {var i = { _w: n, _d: !1 };try {t.call(e, c(N, i, 1), c(j, i, 1));} catch (e) {j.call(i, e);}}) : (n._v = e, n._s = 1, B(n, !1));} catch (e) {j.call({ _w: n, _d: !1 }, e);}}};D || (_O = function O(e) {v(this, _O, "Promise", "_h"), h(e), i.call(this);try {e(c(N, this, 1), c(j, this, 1));} catch (e) {j.call(this, e);}}, i = function i(e) {this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;}, i.prototype = n(155)(_O.prototype, { then: function then(e, t) {var n = M(m(this, _O));return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = A ? E.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && B(this, !1), n.promise;}, catch: function _catch(e) {return this.then(void 0, e);} }), o = function o() {var e = new i();this.promise = e, this.resolve = c(N, e, 1), this.reject = c(j, e, 1);}, b.f = M = function M(e) {return e === _O || e === a ? new o(e) : r(e);}), l(l.G + l.W + l.F * !D, { Promise: _O }), n(25)(_O, "Promise"), n(156)("Promise"), a = n(0).Promise, l(l.S + l.F * !D, "Promise", { reject: function reject(e) {var t = M(this);return (0, t.reject)(e), t.promise;} }), l(l.S + l.F * (s || !D), "Promise", { resolve: function resolve(e) {return k(s && this === a ? _O : this, e);} }), l(l.S + l.F * !(D && n(71)(function (e) {_O.all(e).catch(R);})), "Promise", { all: function all(e) {var t = this,n = M(t),i = n.resolve,r = n.reject,o = _(function () {var n = [],o = 0,a = 1;p(e, !1, function (e) {var s = o++,u = !1;n.push(void 0), a++, t.resolve(e).then(function (e) {u || (u = !0, n[s] = e, --a || i(n));}, r);}), --a || i(n);});return o.e && r(o.v), n.promise;}, race: function race(e) {var t = this,n = M(t),i = n.reject,r = _(function () {p(e, !1, function (e) {t.resolve(e).then(n.resolve, i);});});return r.e && i(r.v), n.promise;} });}, function (e, t) {e.exports = function (e, t, n, i) {if (!(e instanceof t) || void 0 !== i && i in e) throw TypeError(n + ": incorrect invocation!");return e;};}, function (e, t, n) {var i = n(17),r = n(67),o = n(68),a = n(6),s = n(34),u = n(69),c = {},f = {},t = e.exports = function (e, t, n, l, d) {var h,v,p,m,y = d ? function () {return e;} : u(e),g = i(n, l, t ? 2 : 1),b = 0;if ("function" != typeof y) throw TypeError(e + " is not iterable!");if (o(y)) {for (h = s(e.length); h > b; b++) {if ((m = t ? g(a(v = e[b])[0], v[1]) : g(e[b])) === c || m === f) return m;}} else for (p = y.call(e); !(v = p.next()).done;) {if ((m = r(p, g, v.value, t)) === c || m === f) return m;}};t.BREAK = c, t.RETURN = f;}, function (e, t) {e.exports = function (e, t, n) {var i = void 0 === n;switch (t.length) {case 0:return i ? e() : e.call(n);case 1:return i ? e(t[0]) : e.call(n, t[0]);case 2:return i ? e(t[0], t[1]) : e.call(n, t[0], t[1]);case 3:return i ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);case 4:return i ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);}return e.apply(n, t);};}, function (e, t, n) {var i = n(1),r = n(74).set,o = i.MutationObserver || i.WebKitMutationObserver,a = i.process,s = i.Promise,u = "process" == n(21)(a);e.exports = function () {var e,t,n,c = function c() {var i, r;for (u && (i = a.domain) && i.exit(); e;) {r = e.fn, e = e.next;try {r();} catch (i) {throw e ? n() : t = void 0, i;}}t = void 0, i && i.enter();};if (u) n = function n() {a.nextTick(c);};else if (!o || i.navigator && i.navigator.standalone) {if (s && s.resolve) {var f = s.resolve(void 0);n = function n() {f.then(c);};} else n = function n() {r.call(i, c);};} else {var l = !0,d = document.createTextNode("");new o(c).observe(d, { characterData: !0 }), n = function n() {d.data = l = !l;};}return function (i) {var r = { fn: i, next: void 0 };t && (t.next = r), e || (e = r, n()), t = r;};};}, function (e, t, n) {var i = n(1),r = i.navigator;e.exports = r && r.userAgent || "";}, function (e, t, n) {var i = n(9);e.exports = function (e, t, n) {for (var r in t) {n && e[r] ? e[r] = t[r] : i(e, r, t[r]);}return e;};}, function (e, t, n) {"use strict";var i = n(1),r = n(0),o = n(5),a = n(8),s = n(3)("species");e.exports = function (e) {var t = "function" == typeof r[e] ? r[e] : i[e];a && t && !t[s] && o.f(t, s, { configurable: !0, get: function get() {return this;} });};}, function (e, t, n) {"use strict";var i = n(2),r = n(0),o = n(1),a = n(73),s = n(76);i(i.P + i.R, "Promise", { finally: function _finally(e) {var t = a(this, r.Promise || o.Promise),n = "function" == typeof e;return this.then(n ? function (n) {return s(t, e()).then(function () {return n;});} : e, n ? function (n) {return s(t, e()).then(function () {throw n;});} : e);} });}, function (e, t, n) {"use strict";var i = n(2),r = n(46),o = n(75);i(i.S, "Promise", { try: function _try(e) {var t = r.f(this),n = o(e);return (n.e ? t.reject : t.resolve)(n.v), t.promise;} });}, function (e, t, n) {"use strict";function i(e, t) {return e.getAttribute(t);}function r(e, t, n) {void 0 === n ? e.removeAttribute(t) : e.setAttribute(t, n);}function o(e, t) {if (t && (t = t.trim())) {var n = t.split(/\s+/);if (e.classList) n.forEach(function (t) {return e.classList.add(t);});else {var i = " " + (e.className || "") + " ";n.forEach(function (e) {-1 === i.indexOf(" " + e + " ") && (i += " " + e);}), e.className = i.trim();}}}function a(e, t) {if (t && (t = t.trim())) {var n = t.split(/\s+/);if (e.classList) n.forEach(function (t) {return e.classList.remove(t);});else {var i = " " + e.className + " ";n.forEach(function (e) {for (var t = " " + e + " "; -1 !== i.indexOf(t);) {i = i.replace(t, " ");}}), e.className = i.trim();}}}function s(e, t) {return new RegExp("(?:^|\\s)" + t + "(?=\\s|$)").test(e.className);}function u(e, t, n) {var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];if (void 0 !== r && !Object(T.d)(r) && C && (r = { passive: !0 }), i) {var o = Object(O.removeEventCache)(e, t + "_once", n);o && (n = o);}e.removeEventListener(t, n, r);}function c(e, t, n) {var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];if (void 0 !== r && !Object(T.d)(r) && C && (r = { passive: !0 }), i) {var o = n;n = function () {return function () {for (var a = arguments.length, s = Array(a), c = 0; c < a; c++) {s[c] = arguments[c];}o.apply(this, s), u(e, t, n, i, r);};}(), Object(O.addEventCache)(e, t + "_once", o, n);}e.addEventListener(t, n, r);}function f(e, t, n, i) {var r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];void 0 !== r && !Object(T.d)(r) && C && (r = { passive: !0 });var o = function o(n) {var r = m(n.target || n.srcElement, e, !0),o = v(t, e, !0),a = void 0;o.find ? a = o.find(function (e) {return r.find(function (t) {return e === t;});}) : o.forEach(function (e) {return !a && r.forEach(function (t) {a || e !== t || (a = t);});}), a && i.apply(a, arguments);};Object(O.addEventCache)(e, n + "_delegate_" + t, i, o), e.addEventListener(n, o, r);}function l(e, t, n, i) {var r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];void 0 !== r && !Object(T.d)(r) && C && (r = { passive: !0 });var o = Object(O.removeEventCache)(e, n + "_delegate_" + t, i);o && e.removeEventListener(n, o, r);}function d(e, t) {return (e.currentStyle || document.defaultView.getComputedStyle(e, null))[t] || e.style[t];}function h(e, t, n) {if (Object(T.r)(t)) for (var i in t) {h(e, i, t[i]);} else e.style[t] = n;}function v(e) {var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document,n = arguments[2],i = t.querySelectorAll(e);return n ? x()(i) : i;}function p(e) {e.parentNode.removeChild(e);}function m(e) {var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,n = arguments[2],i = arguments[3],r = [];for (n && r.push(e); e && e.parentNode !== t;) {(e = e.parentNode) && r.push(e);}return i && r.push(t), r;}function y(e, t) {return e.constructor === L ? e : new L(e, t);}n.d(t, "g", function () {return i;}), n.d(t, "o", function () {return r;}), n.d(t, "c", function () {return o;}), n.d(t, "k", function () {return a;}), n.d(t, "i", function () {return s;}), n.d(t, "q", function () {return C;}), n.d(t, "n", function () {return u;}), n.d(t, "e", function () {return c;}), n.d(t, "d", function () {return f;}), n.d(t, "l", function () {return l;}), n.d(t, "h", function () {return d;}), n.d(t, "p", function () {return h;}), n.d(t, "j", function () {return v;}), n.d(t, "m", function () {return p;}), n.d(t, "f", function () {return m;}), n.d(t, "b", function () {return L;}), n.d(t, "a", function () {return y;});var g = n(56),b = n.n(g),_ = n(41),w = n.n(_),k = n(42),S = n.n(k),E = n(45),x = n.n(E),T = n(13),O = n(4),A = n(72),R = A.h ? document.createElement("div") : {},M = "innerText";"textContent" in R && (M = "textContent");var D = Array.prototype,C = !1;try {var B = Object.defineProperty({}, "passive", { get: function get() {C = !0;} });A.h && window.addEventListener("test", null, B);} catch (e) {console.error(e, " at js_sdk\\chimee\\index.min.js:1");}var L = function () {function e(t) {var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;w()(this, e);var i = this;i.selector = t;var r = void 0;t && t.constructor === NodeList ? r = Object(A.i)(t) : Object(T.b)(t) ? r = t : Object(T.w)(t) ? 0 === t.indexOf("<") ? (R.innerHTML = t, r = v("*", R, !0)) : r = v(t, n, !0) : r = [t], b()(i, r), i.length = r.length;}return S()(e, [{ key: "each", value: function value() {for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) {t[n] = arguments[n];}return D.forEach.apply(this, t), this;} }, { key: "push", value: function value() {for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) {t[n] = arguments[n];}return D.push.apply(this, t), this;} }, { key: "splice", value: function value() {for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) {t[n] = arguments[n];}return y(D.splice.apply(this, t));} }, { key: "find", value: function value(e) {var t = [];this.each(function (n) {t = t.concat(v(e, n, !0));});var n = y(t);return n.parent = this, n.selector = e, n;} }, { key: "append", value: function value(e) {var t = y(e),n = this[0];return t.each(function (e) {return n.appendChild(e);}), this;} }, { key: "appendTo", value: function value(e) {return y(e).append(this), this;} }, { key: "text", value: function value(e) {return 0 === arguments.length ? this[0][M] : this.each(function (t) {t[M] = e;});} }, { key: "html", value: function value(e) {return 0 === arguments.length ? this[0].innerHTML : this.each(function (t) {t.innerHTML = e;});} }, { key: "attr", value: function value(e, t) {return 1 === arguments.length ? i(this[0], e) : this.each(function (n) {return r(n, e, t);});} }, { key: "data", value: function value(e, t) {return 0 === arguments.length ? this[0].dataset || {} : 1 === arguments.length ? (this[0].dataset || {})[e] : this.each(function (n) {(n.dataset || (n.dataset = {}))[e] = t;});} }, { key: "css", value: function value(e, t) {return 1 !== arguments.length || Object(T.r)(e) ? this.each(function (n) {return h(n, e, t);}) : d(this[0], e);} }, { key: "addClass", value: function value(e) {return this.each(function (t) {return o(t, e);});} }, { key: "removeClass", value: function value(e) {return this.each(function (t) {return a(t, e);});} }, { key: "hasClass", value: function value(e) {return s(this[0], e);} }, { key: "on", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];return this.each(function (r) {return c(r, e, t, n, i);});} }, { key: "off", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];return this.each(function (r) {return u(r, e, t, n, i);});} }, { key: "delegate", value: function value(e, t, n) {var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];return this.each(function (r) {return f(r, e, t, n, i);});} }, { key: "undelegate", value: function value(e, t, n) {var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];return this.each(function (r) {return l(r, e, t, n, i);});} }, { key: "remove", value: function value() {return this.each(function (e) {return p(e);});} }]), e;}();}, function (e, t, n) {"use strict";function i(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function r(e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}function o(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}Object.defineProperty(t, "__esModule", { value: !0 });var a = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);}}return function (t, n, i) {return n && e(t.prototype, n), i && e(t, i), t;};}(),s = n(65),u = n(15),c = function (e) {function t() {i(this, t);var e = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return e.reset(), e;}return o(t, e), a(t, [{ key: "reset", value: function value() {this.loaderOpenTs = 0, this.receiveFirstPackageTs = 0, this.firstDemuxFlvTs = 0, this.firstSegmentTs = 0, this.firstPlay = 0;} }, { key: "record", value: function value(e) {e.ts = e.ts || Date.now(), this.firstPlay || this.processFirstPlayData(e);} }, { key: "processFirstPlayData", value: function value(e) {switch (e.type) {case u.PLAYER_EVENTS.LOADER_CHUNK_ARRIVAL:this.receiveFirstPackageTs || (this.receiveFirstPackageTs = e.ts, this.emit("performance", { type: "receive-first-package-duration", value: this.receiveFirstPackageTs - this.loaderOpenTs }));break;case u.PLAYER_EVENTS.MEDIA_DEMUX_FLV:this.firstDemuxFlvTs || (this.firstDemuxFlvTs = e.ts, this.emit("performance", { type: "first-flv-package-duration", value: this.firstDemuxFlvTs - this.receiveFirstPackageTs }));break;case u.PLAYER_EVENTS.MEDIA_SEGMENT:this.firstSegmentTs || (this.firstSegmentTs = e.ts, this.emit("performance", { type: "first-flv-to-mp4", value: this.firstSegmentTs - this.firstDemuxFlvTs }));break;case u.PLAYER_EVENTS.LOADER_OPEN:this.loaderOpenTs || (this.loaderOpenTs = e.ts, this.emit("performance", { type: "first_loader_open_timestamp", value: this.loaderOpenTs }));break;case u.PLAYER_EVENTS.PLAYING:case u.PLAYER_EVENTS.CANPLAY:case u.PLAYER_EVENTS.TIMEUPDATE:this.firstPlay || (this.firstPlay = e.ts, this.emit("performance", { type: "first_video_frame_duration", value: this.firstPlay - this.firstSegmentTs }));}} }]), t;}(s.CustEvent);t.default = c;}]).default;});

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\js_sdk\\graceChecker.js":
/*!*********************************************************!*\
  !*** F:/HBuilderProjects/uniapp/js_sdk/graceChecker.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 /**
              数据验证（表单验证）
              来自 grace.hcoder.net 
              作者 hcoder 深海
              
              版权声明 : 
              GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
              侵权必究，请遵守版权约定！
              */
module.exports = {
  error: '',
  check: function check(data, rule) {
    for (var i = 0; i < rule.length; i++) {
      if (!rule[i].checkType) {return true;}
      if (!rule[i].name) {return true;}
      if (!rule[i].errorMsg) {return true;}
      if (!data[rule[i].name]) {this.error = rule[i].errorMsg;return false;}
      switch (rule[i].checkType) {
        case 'string':
          var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'int':
          var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
          break;
        case 'between':
          if (!this.isNumber(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenD':
          var reg = /^-?[1-9][0-9]?$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenF':
          var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'same':
          if (data[rule[i].name] != rule[i].checkRule) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'notsame':
          if (data[rule[i].name] == rule[i].checkRule) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'email':
          var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'phoneno':
          var reg = /^1[0-9]{10,10}$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'zipcode':
          var reg = /^[0-9]{6}$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'reg':
          var reg = new RegExp(rule[i].checkRule);
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'in':
          if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
            this.error = rule[i].errorMsg;return false;
          }
          break;
        case 'notnull':
          if (data[rule[i].name] == null || data[rule[i].name].length < 1) {this.error = rule[i].errorMsg;return false;}
          break;}

    }
    return true;
  },
  isNumber: function isNumber(checkVal) {
    checkVal = Number(checkVal);
    if (checkVal == NaN) {return false;}
    return true;
  } };

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\js_sdk\\index.js":
/*!**************************************************!*\
  !*** F:/HBuilderProjects/uniapp/js_sdk/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.obj2style = obj2style; /**
                                                                                                           * 为样式动态赋值
                                                                                                           * @param {*} style
                                                                                                           */
function obj2style(style) {
  var str = [];
  Object.keys(style).forEach(function (key) {
    str.push("".concat(key, ":").concat(style[key], ";"));
  });
  return str.join(';');
}

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js":
/*!******************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "F:\\HBuilderProjects\\uniapp\\App.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.config.productionTip = false;

_vue.default.prototype.$serverUrl = 'http://47.104.128.121:8542';

_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createApp"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Fabout%2Fabout\"}":
/*!***************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Fabout%2Fabout"} ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _about = _interopRequireDefault(__webpack_require__(/*! ./pages/about/about.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\about\\about.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_about.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2FcloudPlay%2FcloudPlay\"}":
/*!***********************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2FcloudPlay%2FcloudPlay"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _cloudPlay = _interopRequireDefault(__webpack_require__(/*! ./pages/cloudPlay/cloudPlay.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\cloudPlay\\cloudPlay.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_cloudPlay.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2FcloudSearch%2FcloudSearch\"}":
/*!***************************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2FcloudSearch%2FcloudSearch"} ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _cloudSearch = _interopRequireDefault(__webpack_require__(/*! ./pages/cloudSearch/cloudSearch.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\cloudSearch\\cloudSearch.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_cloudSearch.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Fdetail%2Fdetail\"}":
/*!*****************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Fdetail%2Fdetail"} ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./pages/detail/detail.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\detail\\detail.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Fentertainment%2Fentertainment\"}":
/*!*******************************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Fentertainment%2Fentertainment"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _entertainment = _interopRequireDefault(__webpack_require__(/*! ./pages/entertainment/entertainment.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\entertainment\\entertainment.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_entertainment.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Findex%2Findex\"}":
/*!***************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Findex%2Findex"} ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/index/index.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\index\\index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Findex%2Findex_detail\"}":
/*!**********************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Findex%2Findex_detail"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index_detail = _interopRequireDefault(__webpack_require__(/*! ./pages/index/index_detail.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\index\\index_detail.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Findex%2Fplayer\"}":
/*!****************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Findex%2Fplayer"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _player = _interopRequireDefault(__webpack_require__(/*! ./pages/index/player.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\index\\player.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_player.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Flist%2Flist\"}":
/*!*************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Flist%2Flist"} ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _list = _interopRequireDefault(__webpack_require__(/*! ./pages/list/list.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\list\\list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Flogin%2Flogin\"}":
/*!***************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Flogin%2Flogin"} ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/login/login.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\login\\login.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Fmy%2Fcustomer\"}":
/*!***************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Fmy%2Fcustomer"} ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _customer = _interopRequireDefault(__webpack_require__(/*! ./pages/my/customer.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\my\\customer.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_customer.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Fmy%2Finvite\"}":
/*!*************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Fmy%2Finvite"} ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _invite = _interopRequireDefault(__webpack_require__(/*! ./pages/my/invite.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\my\\invite.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_invite.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Fmy%2Fmy\"}":
/*!*********************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Fmy%2Fmy"} ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _my = _interopRequireDefault(__webpack_require__(/*! ./pages/my/my.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\my\\my.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_my.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Fmy%2Frecharge\"}":
/*!***************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Fmy%2Frecharge"} ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _recharge = _interopRequireDefault(__webpack_require__(/*! ./pages/my/recharge.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\my\\recharge.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_recharge.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\main.js?{\"page\":\"pages%2Fregister%2Fregister\"}":
/*!*********************************************************************************!*\
  !*** F:/HBuilderProjects/uniapp/main.js?{"page":"pages%2Fregister%2Fregister"} ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "F:\\HBuilderProjects\\uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _register = _interopRequireDefault(__webpack_require__(/*! ./pages/register/register.vue */ "F:\\HBuilderProjects\\uniapp\\pages\\register\\register.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_register.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "F:\\HBuilderProjects\\uniapp\\pages.json":
/*!*********************************************!*\
  !*** F:/HBuilderProjects/uniapp/pages.json ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ })

}]);