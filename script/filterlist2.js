'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SortedListController = function () {
  function SortedListController() {
    'ngInject';

    _classCallCheck(this, SortedListController);

    this.items = [];
    this.filterState = {};
    this.activate();
  }

  SortedListController.prototype.activate = function activate() {
    this.items = [{
      id: 1,
      param0: true,
      param1: false,
      param2: false,
      param3: true
    }, {
      id: 2,
      param0: true,
      param1: true,
      param2: false,
      param3: false
    }, {
      id: 3,
      param0: true,
      param1: false,
      param2: false,
      param3: true
    }, {
      id: 4,
      param0: true,
      param1: true,
      param2: false,
      param3: false
    }, {
      id: 5,
      param0: true,
      param1: false,
      param2: true,
      param3: false
    }, {
      id: 6,
      param0: true,
      param1: true,
      param2: true,
      param3: false
    }, {
      id: 7,
      param0: true,
      param1: false,
      param2: true,
      param3: true
    }, {
      id: 8,
      param0: true,
      param1: true,
      param2: true,
      param3: true
    }, {
      id: 9,
      param0: true,
      param1: false,
      param2: true,
      param3: false
    }, {
      id: 10,
      param0: true,
      param1: false,
      param2: true,
      param3: false
    }, {
      id: 11,
      param0: true,
      param1: false,
      param2: false,
      param3: true
    }, {
      id: 12,
      param0: true,
      param1: true,
      param2: true,
      param3: false
    }
    ];
    this.filterState = {
      param0: true,
      param1: true,
      param2: true,
      param3: true
    };
  };

  return SortedListController;
}();

function sortedListFilter() {
  return function (input, filterState) {
    console.log('input = ', input);
    var output = [];
    for (var _iterator = input, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      var pushed = false;
      if (filterState.param0 && item.param0 && !pushed) {
        pushed = true;
        output.push(item);
      } else if (filterState.param1 && item.param1 && !pushed) {
        pushed = true;
        output.push(item);        
      } else if (filterState.param2 && item.param2 && !pushed) {
        pushed = true;
        output.push(item);
      } else if (filterState.param3 && item.param3 && !pushed) {
        pushed = true;
        output.push(item);
      }
    }
    return output;
  };
}

angular.module('sortedList', []).controller('SortedListController', SortedListController).filter('sortedListFilter', sortedListFilter);