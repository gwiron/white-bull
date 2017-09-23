'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Module = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _dispatch = require('./dispatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//我们需要view与module分离
//我们需要view之间能通信
//我们需要view能触发module更新
//我们还喜欢有其他方式触发module更新，比如url变化
//module可能是持久化的，也可能需要多处实例化

/**
  * interFace Module
  * @use

    class A extends Module{
      constructor(namespace){
        super(namespace)
      }

      //...any function
    }

    //dispatch("namespace.anyFucntion");

  * @param {string} namespace //被绑定到props中所使用的名字
  *
  */

var Module = exports.Module = function (_events$EventEmitter) {
  _inherits(Module, _events$EventEmitter);

  function Module(namespace) {
    _classCallCheck(this, Module);

    var _this = _possibleConstructorReturn(this, (Module.__proto__ || Object.getPrototypeOf(Module)).call(this));

    _this.namespace = namespace;
    (0, _dispatch.addModule)(namespace, _this);
    _this.state = {};

    return _this;
  }

  _createClass(Module, [{
    key: 'setState',
    value: function setState(state) {
      Object.assign(this.state, state);
      this.emit("complete", this.state, this.namespace);
    }
  }]);

  return Module;
}(_events2.default.EventEmitter);