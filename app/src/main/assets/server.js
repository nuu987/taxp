"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/node-cron/src/task.js
var require_task = __commonJS({
  "node_modules/node-cron/src/task.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var Task = class extends EventEmitter {
      constructor(execution) {
        super();
        if (typeof execution !== "function") {
          throw "execution must be a function";
        }
        this._execution = execution;
      }
      execute(now) {
        let exec;
        try {
          exec = this._execution(now);
        } catch (error) {
          return this.emit("task-failed", error);
        }
        if (exec instanceof Promise) {
          return exec.then(() => this.emit("task-finished")).catch((error) => this.emit("task-failed", error));
        } else {
          this.emit("task-finished");
          return exec;
        }
      }
    };
    module2.exports = Task;
  }
});

// node_modules/node-cron/src/convert-expression/month-names-conversion.js
var require_month_names_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/month-names-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
      ];
      const shortMonths = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec"
      ];
      function convertMonthName(expression, items) {
        for (let i = 0; i < items.length; i++) {
          expression = expression.replace(new RegExp(items[i], "gi"), parseInt(i, 10) + 1);
        }
        return expression;
      }
      function interprete(monthExpression) {
        monthExpression = convertMonthName(monthExpression, months);
        monthExpression = convertMonthName(monthExpression, shortMonths);
        return monthExpression;
      }
      return interprete;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/week-day-names-conversion.js
var require_week_day_names_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/week-day-names-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      const weekDays = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];
      const shortWeekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      function convertWeekDayName(expression, items) {
        for (let i = 0; i < items.length; i++) {
          expression = expression.replace(new RegExp(items[i], "gi"), parseInt(i, 10));
        }
        return expression;
      }
      function convertWeekDays(expression) {
        expression = expression.replace("7", "0");
        expression = convertWeekDayName(expression, weekDays);
        return convertWeekDayName(expression, shortWeekDays);
      }
      return convertWeekDays;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/asterisk-to-range-conversion.js
var require_asterisk_to_range_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/asterisk-to-range-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      function convertAsterisk(expression, replecement) {
        if (expression.indexOf("*") !== -1) {
          return expression.replace("*", replecement);
        }
        return expression;
      }
      function convertAsterisksToRanges(expressions) {
        expressions[0] = convertAsterisk(expressions[0], "0-59");
        expressions[1] = convertAsterisk(expressions[1], "0-59");
        expressions[2] = convertAsterisk(expressions[2], "0-23");
        expressions[3] = convertAsterisk(expressions[3], "1-31");
        expressions[4] = convertAsterisk(expressions[4], "1-12");
        expressions[5] = convertAsterisk(expressions[5], "0-6");
        return expressions;
      }
      return convertAsterisksToRanges;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/range-conversion.js
var require_range_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/range-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      function replaceWithRange(expression, text, init, end) {
        const numbers = [];
        let last = parseInt(end);
        let first = parseInt(init);
        if (first > last) {
          last = parseInt(init);
          first = parseInt(end);
        }
        for (let i = first; i <= last; i++) {
          numbers.push(i);
        }
        return expression.replace(new RegExp(text, "i"), numbers.join());
      }
      function convertRange(expression) {
        const rangeRegEx = /(\d+)-(\d+)/;
        let match2 = rangeRegEx.exec(expression);
        while (match2 !== null && match2.length > 0) {
          expression = replaceWithRange(expression, match2[0], match2[1], match2[2]);
          match2 = rangeRegEx.exec(expression);
        }
        return expression;
      }
      function convertAllRanges(expressions) {
        for (let i = 0; i < expressions.length; i++) {
          expressions[i] = convertRange(expressions[i]);
        }
        return expressions;
      }
      return convertAllRanges;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/step-values-conversion.js
var require_step_values_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/step-values-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      function convertSteps(expressions) {
        var stepValuePattern = /^(.+)\/(\w+)$/;
        for (var i = 0; i < expressions.length; i++) {
          var match2 = stepValuePattern.exec(expressions[i]);
          var isStepValue = match2 !== null && match2.length > 0;
          if (isStepValue) {
            var baseDivider = match2[2];
            if (isNaN(baseDivider)) {
              throw baseDivider + " is not a valid step value";
            }
            var values = match2[1].split(",");
            var stepValues = [];
            var divider = parseInt(baseDivider, 10);
            for (var j = 0; j <= values.length; j++) {
              var value = parseInt(values[j], 10);
              if (value % divider === 0) {
                stepValues.push(value);
              }
            }
            expressions[i] = stepValues.join(",");
          }
        }
        return expressions;
      }
      return convertSteps;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/index.js
var require_convert_expression = __commonJS({
  "node_modules/node-cron/src/convert-expression/index.js"(exports2, module2) {
    "use strict";
    var monthNamesConversion = require_month_names_conversion();
    var weekDayNamesConversion = require_week_day_names_conversion();
    var convertAsterisksToRanges = require_asterisk_to_range_conversion();
    var convertRanges = require_range_conversion();
    var convertSteps = require_step_values_conversion();
    module2.exports = /* @__PURE__ */ (() => {
      function appendSeccondExpression(expressions) {
        if (expressions.length === 5) {
          return ["0"].concat(expressions);
        }
        return expressions;
      }
      function removeSpaces(str) {
        return str.replace(/\s{2,}/g, " ").trim();
      }
      function normalizeIntegers(expressions) {
        for (let i = 0; i < expressions.length; i++) {
          const numbers = expressions[i].split(",");
          for (let j = 0; j < numbers.length; j++) {
            numbers[j] = parseInt(numbers[j]);
          }
          expressions[i] = numbers;
        }
        return expressions;
      }
      function interprete(expression) {
        let expressions = removeSpaces(expression).split(" ");
        expressions = appendSeccondExpression(expressions);
        expressions[4] = monthNamesConversion(expressions[4]);
        expressions[5] = weekDayNamesConversion(expressions[5]);
        expressions = convertAsterisksToRanges(expressions);
        expressions = convertRanges(expressions);
        expressions = convertSteps(expressions);
        expressions = normalizeIntegers(expressions);
        return expressions.join(" ");
      }
      return interprete;
    })();
  }
});

// node_modules/node-cron/src/pattern-validation.js
var require_pattern_validation = __commonJS({
  "node_modules/node-cron/src/pattern-validation.js"(exports2, module2) {
    "use strict";
    var convertExpression = require_convert_expression();
    var validationRegex = /^(?:\d+|\*|\*\/\d+)$/;
    function isValidExpression(expression, min, max) {
      const options = expression.split(",");
      for (const option of options) {
        const optionAsInt = parseInt(option, 10);
        if (!Number.isNaN(optionAsInt) && (optionAsInt < min || optionAsInt > max) || !validationRegex.test(option))
          return false;
      }
      return true;
    }
    function isInvalidSecond(expression) {
      return !isValidExpression(expression, 0, 59);
    }
    function isInvalidMinute(expression) {
      return !isValidExpression(expression, 0, 59);
    }
    function isInvalidHour(expression) {
      return !isValidExpression(expression, 0, 23);
    }
    function isInvalidDayOfMonth(expression) {
      return !isValidExpression(expression, 1, 31);
    }
    function isInvalidMonth(expression) {
      return !isValidExpression(expression, 1, 12);
    }
    function isInvalidWeekDay(expression) {
      return !isValidExpression(expression, 0, 7);
    }
    function validateFields(patterns, executablePatterns) {
      if (isInvalidSecond(executablePatterns[0]))
        throw new Error(`${patterns[0]} is a invalid expression for second`);
      if (isInvalidMinute(executablePatterns[1]))
        throw new Error(`${patterns[1]} is a invalid expression for minute`);
      if (isInvalidHour(executablePatterns[2]))
        throw new Error(`${patterns[2]} is a invalid expression for hour`);
      if (isInvalidDayOfMonth(executablePatterns[3]))
        throw new Error(
          `${patterns[3]} is a invalid expression for day of month`
        );
      if (isInvalidMonth(executablePatterns[4]))
        throw new Error(`${patterns[4]} is a invalid expression for month`);
      if (isInvalidWeekDay(executablePatterns[5]))
        throw new Error(`${patterns[5]} is a invalid expression for week day`);
    }
    function validate2(pattern) {
      if (typeof pattern !== "string")
        throw new TypeError("pattern must be a string!");
      const patterns = pattern.split(" ");
      const executablePatterns = convertExpression(pattern).split(" ");
      if (patterns.length === 5) patterns.unshift("0");
      validateFields(patterns, executablePatterns);
    }
    module2.exports = validate2;
  }
});

// node_modules/node-cron/src/time-matcher.js
var require_time_matcher = __commonJS({
  "node_modules/node-cron/src/time-matcher.js"(exports2, module2) {
    var validatePattern = require_pattern_validation();
    var convertExpression = require_convert_expression();
    function matchPattern(pattern, value) {
      if (pattern.indexOf(",") !== -1) {
        const patterns = pattern.split(",");
        return patterns.indexOf(value.toString()) !== -1;
      }
      return pattern === value.toString();
    }
    var TimeMatcher = class {
      constructor(pattern, timezone) {
        validatePattern(pattern);
        this.pattern = convertExpression(pattern);
        this.timezone = timezone;
        this.expressions = this.pattern.split(" ");
        this.dtf = this.timezone ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hourCycle: "h23",
          fractionalSecondDigits: 3,
          timeZone: this.timezone
        }) : null;
      }
      match(date) {
        date = this.apply(date);
        const runOnSecond = matchPattern(this.expressions[0], date.getSeconds());
        const runOnMinute = matchPattern(this.expressions[1], date.getMinutes());
        const runOnHour = matchPattern(this.expressions[2], date.getHours());
        const runOnDay = matchPattern(this.expressions[3], date.getDate());
        const runOnMonth = matchPattern(this.expressions[4], date.getMonth() + 1);
        const runOnWeekDay = matchPattern(this.expressions[5], date.getDay());
        return runOnSecond && runOnMinute && runOnHour && runOnDay && runOnMonth && runOnWeekDay;
      }
      apply(date) {
        if (this.dtf) {
          return new Date(this.dtf.format(date));
        }
        return date;
      }
    };
    module2.exports = TimeMatcher;
  }
});

// node_modules/node-cron/src/scheduler.js
var require_scheduler = __commonJS({
  "node_modules/node-cron/src/scheduler.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var TimeMatcher = require_time_matcher();
    var Scheduler = class extends EventEmitter {
      constructor(pattern, timezone, autorecover) {
        super();
        this.timeMatcher = new TimeMatcher(pattern, timezone);
        this.autorecover = autorecover;
      }
      start() {
        this.stop();
        let lastCheck = process.hrtime();
        let lastExecution = this.timeMatcher.apply(/* @__PURE__ */ new Date());
        const matchTime = () => {
          const delay = 1e3;
          const elapsedTime = process.hrtime(lastCheck);
          const elapsedMs = (elapsedTime[0] * 1e9 + elapsedTime[1]) / 1e6;
          const missedExecutions = Math.floor(elapsedMs / 1e3);
          for (let i = missedExecutions; i >= 0; i--) {
            const date = new Date((/* @__PURE__ */ new Date()).getTime() - i * 1e3);
            let date_tmp = this.timeMatcher.apply(date);
            if (lastExecution.getTime() < date_tmp.getTime() && (i === 0 || this.autorecover) && this.timeMatcher.match(date)) {
              this.emit("scheduled-time-matched", date_tmp);
              date_tmp.setMilliseconds(0);
              lastExecution = date_tmp;
            }
          }
          lastCheck = process.hrtime();
          this.timeout = setTimeout(matchTime, delay);
        };
        matchTime();
      }
      stop() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = null;
      }
    };
    module2.exports = Scheduler;
  }
});

// node_modules/uuid/dist/esm-node/rng.js
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto2.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
var import_crypto2, rnds8Pool, poolPtr;
var init_rng = __esm({
  "node_modules/uuid/dist/esm-node/rng.js"() {
    import_crypto2 = __toESM(require("crypto"));
    rnds8Pool = new Uint8Array(256);
    poolPtr = rnds8Pool.length;
  }
});

// node_modules/uuid/dist/esm-node/regex.js
var regex_default;
var init_regex = __esm({
  "node_modules/uuid/dist/esm-node/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }
});

// node_modules/uuid/dist/esm-node/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esm({
  "node_modules/uuid/dist/esm-node/validate.js"() {
    init_regex();
    validate_default = validate;
  }
});

// node_modules/uuid/dist/esm-node/stringify.js
function stringify(arr, offset = 0) {
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var byteToHex, stringify_default;
var init_stringify = __esm({
  "node_modules/uuid/dist/esm-node/stringify.js"() {
    init_validate();
    byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    stringify_default = stringify;
  }
});

// node_modules/uuid/dist/esm-node/v1.js
function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  const tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify_default(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esm({
  "node_modules/uuid/dist/esm-node/v1.js"() {
    init_rng();
    init_stringify();
    _lastMSecs = 0;
    _lastNSecs = 0;
    v1_default = v1;
  }
});

// node_modules/uuid/dist/esm-node/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default;
var init_parse = __esm({
  "node_modules/uuid/dist/esm-node/parse.js"() {
    init_validate();
    parse_default = parse;
  }
});

// node_modules/uuid/dist/esm-node/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
function v35_default(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return stringify_default(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL2;
  return generateUUID;
}
var DNS, URL2;
var init_v35 = __esm({
  "node_modules/uuid/dist/esm-node/v35.js"() {
    init_stringify();
    init_parse();
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  }
});

// node_modules/uuid/dist/esm-node/md5.js
function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto3.default.createHash("md5").update(bytes).digest();
}
var import_crypto3, md5_default;
var init_md5 = __esm({
  "node_modules/uuid/dist/esm-node/md5.js"() {
    import_crypto3 = __toESM(require("crypto"));
    md5_default = md5;
  }
});

// node_modules/uuid/dist/esm-node/v3.js
var v3, v3_default;
var init_v3 = __esm({
  "node_modules/uuid/dist/esm-node/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35_default("v3", 48, md5_default);
    v3_default = v3;
  }
});

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default;
var init_v4 = __esm({
  "node_modules/uuid/dist/esm-node/v4.js"() {
    init_rng();
    init_stringify();
    v4_default = v4;
  }
});

// node_modules/uuid/dist/esm-node/sha1.js
function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto4.default.createHash("sha1").update(bytes).digest();
}
var import_crypto4, sha1_default;
var init_sha1 = __esm({
  "node_modules/uuid/dist/esm-node/sha1.js"() {
    import_crypto4 = __toESM(require("crypto"));
    sha1_default = sha1;
  }
});

// node_modules/uuid/dist/esm-node/v5.js
var v5, v5_default;
var init_v5 = __esm({
  "node_modules/uuid/dist/esm-node/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35_default("v5", 80, sha1_default);
    v5_default = v5;
  }
});

// node_modules/uuid/dist/esm-node/nil.js
var nil_default;
var init_nil = __esm({
  "node_modules/uuid/dist/esm-node/nil.js"() {
    nil_default = "00000000-0000-0000-0000-000000000000";
  }
});

// node_modules/uuid/dist/esm-node/version.js
function version(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
var version_default;
var init_version = __esm({
  "node_modules/uuid/dist/esm-node/version.js"() {
    init_validate();
    version_default = version;
  }
});

// node_modules/uuid/dist/esm-node/index.js
var esm_node_exports = {};
__export(esm_node_exports, {
  NIL: () => nil_default,
  parse: () => parse_default,
  stringify: () => stringify_default,
  v1: () => v1_default,
  v3: () => v3_default,
  v4: () => v4_default,
  v5: () => v5_default,
  validate: () => validate_default,
  version: () => version_default
});
var init_esm_node = __esm({
  "node_modules/uuid/dist/esm-node/index.js"() {
    init_v1();
    init_v3();
    init_v4();
    init_v5();
    init_nil();
    init_version();
    init_validate();
    init_stringify();
    init_parse();
  }
});

// node_modules/node-cron/src/scheduled-task.js
var require_scheduled_task = __commonJS({
  "node_modules/node-cron/src/scheduled-task.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var Task = require_task();
    var Scheduler = require_scheduler();
    var uuid = (init_esm_node(), __toCommonJS(esm_node_exports));
    var ScheduledTask = class extends EventEmitter {
      constructor(cronExpression, func, options) {
        super();
        if (!options) {
          options = {
            scheduled: true,
            recoverMissedExecutions: false
          };
        }
        this.options = options;
        this.options.name = this.options.name || uuid.v4();
        this._task = new Task(func);
        this._scheduler = new Scheduler(cronExpression, options.timezone, options.recoverMissedExecutions);
        this._scheduler.on("scheduled-time-matched", (now) => {
          this.now(now);
        });
        if (options.scheduled !== false) {
          this._scheduler.start();
        }
        if (options.runOnInit === true) {
          this.now("init");
        }
      }
      now(now = "manual") {
        let result = this._task.execute(now);
        this.emit("task-done", result);
      }
      start() {
        this._scheduler.start();
      }
      stop() {
        this._scheduler.stop();
      }
    };
    module2.exports = ScheduledTask;
  }
});

// node_modules/node-cron/src/background-scheduled-task/index.js
var require_background_scheduled_task = __commonJS({
  "node_modules/node-cron/src/background-scheduled-task/index.js"(exports2, module2) {
    var EventEmitter = require("events");
    var path5 = require("path");
    var { fork } = require("child_process");
    var uuid = (init_esm_node(), __toCommonJS(esm_node_exports));
    var daemonPath = `${__dirname}/daemon.js`;
    var BackgroundScheduledTask = class extends EventEmitter {
      constructor(cronExpression, taskPath, options) {
        super();
        if (!options) {
          options = {
            scheduled: true,
            recoverMissedExecutions: false
          };
        }
        this.cronExpression = cronExpression;
        this.taskPath = taskPath;
        this.options = options;
        this.options.name = this.options.name || uuid.v4();
        if (options.scheduled) {
          this.start();
        }
      }
      start() {
        this.stop();
        this.forkProcess = fork(daemonPath);
        this.forkProcess.on("message", (message) => {
          switch (message.type) {
            case "task-done":
              this.emit("task-done", message.result);
              break;
          }
        });
        let options = this.options;
        options.scheduled = true;
        this.forkProcess.send({
          type: "register",
          path: path5.resolve(this.taskPath),
          cron: this.cronExpression,
          options
        });
      }
      stop() {
        if (this.forkProcess) {
          this.forkProcess.kill();
        }
      }
      pid() {
        if (this.forkProcess) {
          return this.forkProcess.pid;
        }
      }
      isRunning() {
        return !this.forkProcess.killed;
      }
    };
    module2.exports = BackgroundScheduledTask;
  }
});

// node_modules/node-cron/src/storage.js
var require_storage = __commonJS({
  "node_modules/node-cron/src/storage.js"(exports2, module2) {
    module2.exports = (() => {
      if (!global.scheduledTasks) {
        global.scheduledTasks = /* @__PURE__ */ new Map();
      }
      return {
        save: (task) => {
          if (!task.options) {
            const uuid = (init_esm_node(), __toCommonJS(esm_node_exports));
            task.options = {};
            task.options.name = uuid.v4();
          }
          global.scheduledTasks.set(task.options.name, task);
        },
        getTasks: () => {
          return global.scheduledTasks;
        }
      };
    })();
  }
});

// node_modules/node-cron/src/node-cron.js
var require_node_cron = __commonJS({
  "node_modules/node-cron/src/node-cron.js"(exports2, module2) {
    "use strict";
    var ScheduledTask = require_scheduled_task();
    var BackgroundScheduledTask = require_background_scheduled_task();
    var validation = require_pattern_validation();
    var storage = require_storage();
    function schedule2(expression, func, options) {
      const task = createTask(expression, func, options);
      storage.save(task);
      return task;
    }
    function createTask(expression, func, options) {
      if (typeof func === "string")
        return new BackgroundScheduledTask(expression, func, options);
      return new ScheduledTask(expression, func, options);
    }
    function validate2(expression) {
      try {
        validation(expression);
        return true;
      } catch (_) {
        return false;
      }
    }
    function getTasks() {
      return storage.getTasks();
    }
    module2.exports = { schedule: schedule2, validate: validate2, getTasks };
  }
});

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.6.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports2, module2) {
    var fs6 = require("fs");
    var path5 = require("path");
    var os2 = require("os");
    var crypto6 = require("crypto");
    var packageJson = require_package();
    var version2 = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse2(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match2;
      while ((match2 = LINE.exec(lines)) != null) {
        const key = match2[1];
        let value = match2[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.log(`[dotenv@${version2}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version2}][DEBUG] ${message}`);
    }
    function _log(message) {
      console.log(`[dotenv@${version2}] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs6.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path5.resolve(process.cwd(), ".env.vault");
      }
      if (fs6.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path5.join(os2.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (debug || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path5.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path6 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs6.readFileSync(path6, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path6} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (debug || !quiet) {
        const keysCount = Object.keys(parsedAll).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path5.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt2(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto6.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt: decrypt2,
      parse: parse2,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// node_modules/@hono/node-server/dist/index.mjs
var import_http = require("http");
var import_http2 = require("http2");
var import_http22 = require("http2");
var import_stream = require("stream");
var import_crypto = __toESM(require("crypto"), 1);
var RequestError = class extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "RequestError";
  }
};
var toRequestError = (e) => {
  if (e instanceof RequestError) {
    return e;
  }
  return new RequestError(e.message, { cause: e });
};
var GlobalRequest = global.Request;
var Request2 = class extends GlobalRequest {
  constructor(input, options) {
    if (typeof input === "object" && getRequestCache in input) {
      input = input[getRequestCache]();
    }
    if (typeof options?.body?.getReader !== "undefined") {
      ;
      options.duplex ??= "half";
    }
    super(input, options);
  }
};
var newHeadersFromIncoming = (incoming) => {
  const headerRecord = [];
  const rawHeaders = incoming.rawHeaders;
  for (let i = 0; i < rawHeaders.length; i += 2) {
    const { [i]: key, [i + 1]: value } = rawHeaders;
    if (key.charCodeAt(0) !== /*:*/
    58) {
      headerRecord.push([key, value]);
    }
  }
  return new Headers(headerRecord);
};
var wrapBodyStream = Symbol("wrapBodyStream");
var newRequestFromIncoming = (method, url, headers, incoming, abortController) => {
  const init = {
    method,
    headers,
    signal: abortController.signal
  };
  if (method === "TRACE") {
    init.method = "GET";
    const req = new Request2(url, init);
    Object.defineProperty(req, "method", {
      get() {
        return "TRACE";
      }
    });
    return req;
  }
  if (!(method === "GET" || method === "HEAD")) {
    if ("rawBody" in incoming && incoming.rawBody instanceof Buffer) {
      init.body = new ReadableStream({
        start(controller) {
          controller.enqueue(incoming.rawBody);
          controller.close();
        }
      });
    } else if (incoming[wrapBodyStream]) {
      let reader;
      init.body = new ReadableStream({
        async pull(controller) {
          try {
            reader ||= import_stream.Readable.toWeb(incoming).getReader();
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
            } else {
              controller.enqueue(value);
            }
          } catch (error) {
            controller.error(error);
          }
        }
      });
    } else {
      init.body = import_stream.Readable.toWeb(incoming);
    }
  }
  return new Request2(url, init);
};
var getRequestCache = Symbol("getRequestCache");
var requestCache = Symbol("requestCache");
var incomingKey = Symbol("incomingKey");
var urlKey = Symbol("urlKey");
var headersKey = Symbol("headersKey");
var abortControllerKey = Symbol("abortControllerKey");
var getAbortController = Symbol("getAbortController");
var requestPrototype = {
  get method() {
    return this[incomingKey].method || "GET";
  },
  get url() {
    return this[urlKey];
  },
  get headers() {
    return this[headersKey] ||= newHeadersFromIncoming(this[incomingKey]);
  },
  [getAbortController]() {
    this[getRequestCache]();
    return this[abortControllerKey];
  },
  [getRequestCache]() {
    this[abortControllerKey] ||= new AbortController();
    return this[requestCache] ||= newRequestFromIncoming(
      this.method,
      this[urlKey],
      this.headers,
      this[incomingKey],
      this[abortControllerKey]
    );
  }
};
[
  "body",
  "bodyUsed",
  "cache",
  "credentials",
  "destination",
  "integrity",
  "mode",
  "redirect",
  "referrer",
  "referrerPolicy",
  "signal",
  "keepalive"
].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    get() {
      return this[getRequestCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    value: function() {
      return this[getRequestCache]()[k]();
    }
  });
});
Object.defineProperty(requestPrototype, Symbol.for("nodejs.util.inspect.custom"), {
  value: function(depth, options, inspectFn) {
    const props = {
      method: this.method,
      url: this.url,
      headers: this.headers,
      nativeRequest: this[requestCache]
    };
    return `Request (lightweight) ${inspectFn(props, { ...options, depth: depth == null ? null : depth - 1 })}`;
  }
});
Object.setPrototypeOf(requestPrototype, Request2.prototype);
var newRequest = (incoming, defaultHostname) => {
  const req = Object.create(requestPrototype);
  req[incomingKey] = incoming;
  const incomingUrl = incoming.url || "";
  if (incomingUrl[0] !== "/" && // short-circuit for performance. most requests are relative URL.
  (incomingUrl.startsWith("http://") || incomingUrl.startsWith("https://"))) {
    if (incoming instanceof import_http22.Http2ServerRequest) {
      throw new RequestError("Absolute URL for :path is not allowed in HTTP/2");
    }
    try {
      const url2 = new URL(incomingUrl);
      req[urlKey] = url2.href;
    } catch (e) {
      throw new RequestError("Invalid absolute URL", { cause: e });
    }
    return req;
  }
  const host = (incoming instanceof import_http22.Http2ServerRequest ? incoming.authority : incoming.headers.host) || defaultHostname;
  if (!host) {
    throw new RequestError("Missing host header");
  }
  let scheme;
  if (incoming instanceof import_http22.Http2ServerRequest) {
    scheme = incoming.scheme;
    if (!(scheme === "http" || scheme === "https")) {
      throw new RequestError("Unsupported scheme");
    }
  } else {
    scheme = incoming.socket && incoming.socket.encrypted ? "https" : "http";
  }
  const url = new URL(`${scheme}://${host}${incomingUrl}`);
  if (url.hostname.length !== host.length && url.hostname !== host.replace(/:\d+$/, "")) {
    throw new RequestError("Invalid host header");
  }
  req[urlKey] = url.href;
  return req;
};
var responseCache = Symbol("responseCache");
var getResponseCache = Symbol("getResponseCache");
var cacheKey = Symbol("cache");
var GlobalResponse = global.Response;
var Response2 = class _Response {
  #body;
  #init;
  [getResponseCache]() {
    delete this[cacheKey];
    return this[responseCache] ||= new GlobalResponse(this.#body, this.#init);
  }
  constructor(body, init) {
    let headers;
    this.#body = body;
    if (init instanceof _Response) {
      const cachedGlobalResponse = init[responseCache];
      if (cachedGlobalResponse) {
        this.#init = cachedGlobalResponse;
        this[getResponseCache]();
        return;
      } else {
        this.#init = init.#init;
        headers = new Headers(init.#init.headers);
      }
    } else {
      this.#init = init;
    }
    if (typeof body === "string" || typeof body?.getReader !== "undefined" || body instanceof Blob || body instanceof Uint8Array) {
      ;
      this[cacheKey] = [init?.status || 200, body, headers || init?.headers];
    }
  }
  get headers() {
    const cache = this[cacheKey];
    if (cache) {
      if (!(cache[2] instanceof Headers)) {
        cache[2] = new Headers(
          cache[2] || { "content-type": "text/plain; charset=UTF-8" }
        );
      }
      return cache[2];
    }
    return this[getResponseCache]().headers;
  }
  get status() {
    return this[cacheKey]?.[0] ?? this[getResponseCache]().status;
  }
  get ok() {
    const status = this.status;
    return status >= 200 && status < 300;
  }
};
["body", "bodyUsed", "redirected", "statusText", "trailers", "type", "url"].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    get() {
      return this[getResponseCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    value: function() {
      return this[getResponseCache]()[k]();
    }
  });
});
Object.defineProperty(Response2.prototype, Symbol.for("nodejs.util.inspect.custom"), {
  value: function(depth, options, inspectFn) {
    const props = {
      status: this.status,
      headers: this.headers,
      ok: this.ok,
      nativeResponse: this[responseCache]
    };
    return `Response (lightweight) ${inspectFn(props, { ...options, depth: depth == null ? null : depth - 1 })}`;
  }
});
Object.setPrototypeOf(Response2, GlobalResponse);
Object.setPrototypeOf(Response2.prototype, GlobalResponse.prototype);
async function readWithoutBlocking(readPromise) {
  return Promise.race([readPromise, Promise.resolve().then(() => Promise.resolve(void 0))]);
}
function writeFromReadableStreamDefaultReader(reader, writable, currentReadPromise) {
  const cancel = (error) => {
    reader.cancel(error).catch(() => {
    });
  };
  writable.on("close", cancel);
  writable.on("error", cancel);
  (currentReadPromise ?? reader.read()).then(flow, handleStreamError);
  return reader.closed.finally(() => {
    writable.off("close", cancel);
    writable.off("error", cancel);
  });
  function handleStreamError(error) {
    if (error) {
      writable.destroy(error);
    }
  }
  function onDrain() {
    reader.read().then(flow, handleStreamError);
  }
  function flow({ done, value }) {
    try {
      if (done) {
        writable.end();
      } else if (!writable.write(value)) {
        writable.once("drain", onDrain);
      } else {
        return reader.read().then(flow, handleStreamError);
      }
    } catch (e) {
      handleStreamError(e);
    }
  }
}
function writeFromReadableStream(stream2, writable) {
  if (stream2.locked) {
    throw new TypeError("ReadableStream is locked.");
  } else if (writable.destroyed) {
    return;
  }
  return writeFromReadableStreamDefaultReader(stream2.getReader(), writable);
}
var buildOutgoingHttpHeaders = (headers) => {
  const res = {};
  if (!(headers instanceof Headers)) {
    headers = new Headers(headers ?? void 0);
  }
  const cookies = [];
  for (const [k, v] of headers) {
    if (k === "set-cookie") {
      cookies.push(v);
    } else {
      res[k] = v;
    }
  }
  if (cookies.length > 0) {
    res["set-cookie"] = cookies;
  }
  res["content-type"] ??= "text/plain; charset=UTF-8";
  return res;
};
var X_ALREADY_SENT = "x-hono-already-sent";
if (typeof global.crypto === "undefined") {
  global.crypto = import_crypto.default;
}
var outgoingEnded = Symbol("outgoingEnded");
var incomingDraining = Symbol("incomingDraining");
var DRAIN_TIMEOUT_MS = 500;
var MAX_DRAIN_BYTES = 64 * 1024 * 1024;
var drainIncoming = (incoming) => {
  const incomingWithDrainState = incoming;
  if (incoming.destroyed || incomingWithDrainState[incomingDraining]) {
    return;
  }
  incomingWithDrainState[incomingDraining] = true;
  if (incoming instanceof import_http2.Http2ServerRequest) {
    try {
      ;
      incoming.stream?.close?.(import_http2.constants.NGHTTP2_NO_ERROR);
    } catch {
    }
    return;
  }
  let bytesRead = 0;
  const cleanup = () => {
    clearTimeout(timer);
    incoming.off("data", onData);
    incoming.off("end", cleanup);
    incoming.off("error", cleanup);
  };
  const forceClose = () => {
    cleanup();
    const socket = incoming.socket;
    if (socket && !socket.destroyed) {
      socket.destroySoon();
    }
  };
  const timer = setTimeout(forceClose, DRAIN_TIMEOUT_MS);
  timer.unref?.();
  const onData = (chunk) => {
    bytesRead += chunk.length;
    if (bytesRead > MAX_DRAIN_BYTES) {
      forceClose();
    }
  };
  incoming.on("data", onData);
  incoming.on("end", cleanup);
  incoming.on("error", cleanup);
  incoming.resume();
};
var handleRequestError = () => new Response(null, {
  status: 400
});
var handleFetchError = (e) => new Response(null, {
  status: e instanceof Error && (e.name === "TimeoutError" || e.constructor.name === "TimeoutError") ? 504 : 500
});
var handleResponseError = (e, outgoing) => {
  const err = e instanceof Error ? e : new Error("unknown error", { cause: e });
  if (err.code === "ERR_STREAM_PREMATURE_CLOSE") {
    console.info("The user aborted a request.");
  } else {
    console.error(e);
    if (!outgoing.headersSent) {
      outgoing.writeHead(500, { "Content-Type": "text/plain" });
    }
    outgoing.end(`Error: ${err.message}`);
    outgoing.destroy(err);
  }
};
var flushHeaders = (outgoing) => {
  if ("flushHeaders" in outgoing && outgoing.writable) {
    outgoing.flushHeaders();
  }
};
var responseViaCache = async (res, outgoing) => {
  let [status, body, header] = res[cacheKey];
  let hasContentLength = false;
  if (!header) {
    header = { "content-type": "text/plain; charset=UTF-8" };
  } else if (header instanceof Headers) {
    hasContentLength = header.has("content-length");
    header = buildOutgoingHttpHeaders(header);
  } else if (Array.isArray(header)) {
    const headerObj = new Headers(header);
    hasContentLength = headerObj.has("content-length");
    header = buildOutgoingHttpHeaders(headerObj);
  } else {
    for (const key in header) {
      if (key.length === 14 && key.toLowerCase() === "content-length") {
        hasContentLength = true;
        break;
      }
    }
  }
  if (!hasContentLength) {
    if (typeof body === "string") {
      header["Content-Length"] = Buffer.byteLength(body);
    } else if (body instanceof Uint8Array) {
      header["Content-Length"] = body.byteLength;
    } else if (body instanceof Blob) {
      header["Content-Length"] = body.size;
    }
  }
  outgoing.writeHead(status, header);
  if (typeof body === "string" || body instanceof Uint8Array) {
    outgoing.end(body);
  } else if (body instanceof Blob) {
    outgoing.end(new Uint8Array(await body.arrayBuffer()));
  } else {
    flushHeaders(outgoing);
    await writeFromReadableStream(body, outgoing)?.catch(
      (e) => handleResponseError(e, outgoing)
    );
  }
  ;
  outgoing[outgoingEnded]?.();
};
var isPromise = (res) => typeof res.then === "function";
var responseViaResponseObject = async (res, outgoing, options = {}) => {
  if (isPromise(res)) {
    if (options.errorHandler) {
      try {
        res = await res;
      } catch (err) {
        const errRes = await options.errorHandler(err);
        if (!errRes) {
          return;
        }
        res = errRes;
      }
    } else {
      res = await res.catch(handleFetchError);
    }
  }
  if (cacheKey in res) {
    return responseViaCache(res, outgoing);
  }
  const resHeaderRecord = buildOutgoingHttpHeaders(res.headers);
  if (res.body) {
    const reader = res.body.getReader();
    const values = [];
    let done = false;
    let currentReadPromise = void 0;
    if (resHeaderRecord["transfer-encoding"] !== "chunked") {
      let maxReadCount = 2;
      for (let i = 0; i < maxReadCount; i++) {
        currentReadPromise ||= reader.read();
        const chunk = await readWithoutBlocking(currentReadPromise).catch((e) => {
          console.error(e);
          done = true;
        });
        if (!chunk) {
          if (i === 1) {
            await new Promise((resolve3) => setTimeout(resolve3));
            maxReadCount = 3;
            continue;
          }
          break;
        }
        currentReadPromise = void 0;
        if (chunk.value) {
          values.push(chunk.value);
        }
        if (chunk.done) {
          done = true;
          break;
        }
      }
      if (done && !("content-length" in resHeaderRecord)) {
        resHeaderRecord["content-length"] = values.reduce((acc, value) => acc + value.length, 0);
      }
    }
    outgoing.writeHead(res.status, resHeaderRecord);
    values.forEach((value) => {
      ;
      outgoing.write(value);
    });
    if (done) {
      outgoing.end();
    } else {
      if (values.length === 0) {
        flushHeaders(outgoing);
      }
      await writeFromReadableStreamDefaultReader(reader, outgoing, currentReadPromise);
    }
  } else if (resHeaderRecord[X_ALREADY_SENT]) {
  } else {
    outgoing.writeHead(res.status, resHeaderRecord);
    outgoing.end();
  }
  ;
  outgoing[outgoingEnded]?.();
};
var getRequestListener = (fetchCallback, options = {}) => {
  const autoCleanupIncoming = options.autoCleanupIncoming ?? true;
  if (options.overrideGlobalObjects !== false && global.Request !== Request2) {
    Object.defineProperty(global, "Request", {
      value: Request2
    });
    Object.defineProperty(global, "Response", {
      value: Response2
    });
  }
  return async (incoming, outgoing) => {
    let res, req;
    try {
      req = newRequest(incoming, options.hostname);
      let incomingEnded = !autoCleanupIncoming || incoming.method === "GET" || incoming.method === "HEAD";
      if (!incomingEnded) {
        ;
        incoming[wrapBodyStream] = true;
        incoming.on("end", () => {
          incomingEnded = true;
        });
        if (incoming instanceof import_http2.Http2ServerRequest) {
          ;
          outgoing[outgoingEnded] = () => {
            if (!incomingEnded) {
              setTimeout(() => {
                if (!incomingEnded) {
                  setTimeout(() => {
                    drainIncoming(incoming);
                  });
                }
              });
            }
          };
        }
        outgoing.on("finish", () => {
          if (!incomingEnded) {
            drainIncoming(incoming);
          }
        });
      }
      outgoing.on("close", () => {
        const abortController = req[abortControllerKey];
        if (abortController) {
          if (incoming.errored) {
            req[abortControllerKey].abort(incoming.errored.toString());
          } else if (!outgoing.writableFinished) {
            req[abortControllerKey].abort("Client connection prematurely closed.");
          }
        }
        if (!incomingEnded) {
          setTimeout(() => {
            if (!incomingEnded) {
              setTimeout(() => {
                drainIncoming(incoming);
              });
            }
          });
        }
      });
      res = fetchCallback(req, { incoming, outgoing });
      if (cacheKey in res) {
        return responseViaCache(res, outgoing);
      }
    } catch (e) {
      if (!res) {
        if (options.errorHandler) {
          res = await options.errorHandler(req ? e : toRequestError(e));
          if (!res) {
            return;
          }
        } else if (!req) {
          res = handleRequestError();
        } else {
          res = handleFetchError(e);
        }
      } else {
        return handleResponseError(e, outgoing);
      }
    }
    try {
      return await responseViaResponseObject(res, outgoing, options);
    } catch (e) {
      return handleResponseError(e, outgoing);
    }
  };
};
var createAdaptorServer = (options) => {
  const fetchCallback = options.fetch;
  const requestListener = getRequestListener(fetchCallback, {
    hostname: options.hostname,
    overrideGlobalObjects: options.overrideGlobalObjects,
    autoCleanupIncoming: options.autoCleanupIncoming
  });
  const createServer = options.createServer || import_http.createServer;
  const server = createServer(options.serverOptions || {}, requestListener);
  return server;
};
var serve = (options, listeningListener) => {
  const server = createAdaptorServer(options);
  server.listen(options?.port ?? 3e3, options.hostname, () => {
    const serverInfo = server.address();
    listeningListener && listeningListener(serverInfo);
  });
  return server;
};

// src/node-entry.ts
var cron = __toESM(require_node_cron());
var dotenv = __toESM(require_main());
var path4 = __toESM(require("path"));
var os = __toESM(require("os"));
var fs5 = __toESM(require("fs"));
var dns = __toESM(require("dns"));

// node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// node_modules/hono/dist/utils/url.js
var splitPath = (path5) => {
  const paths = path5.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path: path5 } = extractGroupsFromPath(routePath);
  const paths = splitPath(path5);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path5) => {
  const groups = [];
  path5 = path5.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path: path5 };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey2 = `${label}#${next}`;
    if (!patternCache[cacheKey2]) {
      if (match2[2]) {
        patternCache[cacheKey2] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey2, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey2] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey2];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path5 = url.slice(start, end);
      return tryDecodeURI(path5.includes("%25") ? path5.replace(/%25/g, "%2525") : path5);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path5) => {
  if (path5.charCodeAt(path5.length - 1) !== 63 || !path5.includes(":")) {
    return null;
  }
  const segments = path5.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest = class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path5 = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path5;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer2) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer2) {
    buffer2[0] += str;
  } else {
    buffer2 = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer: buffer2, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer2))
    ).then(() => buffer2[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
};
var createResponseInstance = (body, init) => new Response(body, init);
var Context = class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
};

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path5, ...handlers) => {
      for (const p of [path5].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path5, app) {
    const subApp = this.basePath(path5);
    app.routes.map((r) => {
      let handler;
      if (app.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path5) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path5);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path5, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path5);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path5, "*"), handler);
    return this;
  }
  #addRoute(method, path5, handler) {
    method = method.toUpperCase();
    path5 = mergePath(this._basePath, path5);
    const r = { basePath: this._basePath, path: path5, method, handler };
    this.router.add(method, path5, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path5 = this.getPath(request, { env });
    const matchResult = this.router.match(method, path5);
    const c = new Context(request, {
      path: path5,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
};

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path5) {
  const matchers = this.buildAllMatchers();
  const match2 = (method2, path22) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path22];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path22.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  };
  this.match = match2;
  return match2(method, path5);
}

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path5, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path5 = path5.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path5.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path5) {
  return wildcardRegExpCache[path5] ??= new RegExp(
    path5 === "*" ? "" : `^${path5.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path5, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path5] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path5, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path5) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path5) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path5)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path5, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path5 === "/*") {
      path5 = "*";
    }
    const paramCount = (path5.match(/\/:/g) || []).length;
    if (/\*$/.test(path5)) {
      const re = buildWildcardRegExp(path5);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path5] ||= findMiddleware(middleware[m], path5) || findMiddleware(middleware[METHOD_NAME_ALL], path5) || [];
        });
      } else {
        middleware[method][path5] ||= findMiddleware(middleware[method], path5) || findMiddleware(middleware[METHOD_NAME_ALL], path5) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path5) || [path5];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path22 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path22] ||= [
            ...findMiddleware(middleware[m], path22) || findMiddleware(middleware[METHOD_NAME_ALL], path22) || []
          ];
          routes[m][path22].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path5) => [path5, r[method][path5]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path5) => [path5, r[METHOD_NAME_ALL][path5]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path5, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path5, handler]);
  }
  match(method, path5) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path5);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = (children) => {
  for (const _ in children) {
    return true;
  }
  return false;
};
var Node2 = class _Node2 {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path5, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path5);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path5) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path5);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path5[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path5.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path5, handler) {
    const results = checkOptionalParameter(path5);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path5, handler);
  }
  match(method, path5) {
    return this.#node.search(method, path5);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// src/core/config.ts
var DEFAULT_SPEED_TIMEOUT_MS = 5e3;
var DEFAULT_SITE_TIMEOUT_MS = 3e3;
var DEFAULT_FETCH_TIMEOUT_MS = 3e4;
var MERGED_CONFIG = "merged_config";
var MERGED_CONFIG_FULL = "merged_config_full";
var EXPORT_CONFIG = "export_config";
var SOURCE_URLS = "source_urls";
var LAST_UPDATE = "last_update";
var MANUAL_SOURCES = "manual_sources";
var MACCMS_SOURCES = "maccms_sources";
var LIVE_SOURCES = "live_sources";
var BLACKLIST = "blacklist";
var INLINE_PREFIX = "inline_config_";
var NAME_TRANSFORM = "name_transform";
var SOURCE_HEALTH = "source_health";
var SPEED_TEST_ENABLED = "speed_test_enabled";
var SMART_JAR_URL_ENABLED = "smart_jar_url_enabled";
var LIVE_DISABLED = "live_disabled";
var BASE_URL_PLACEHOLDER = "__TVBOX_BASE_URL__";
var TVBOX_UA = "okhttp/3.12.0";
var BROWSER_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36";
var CRON_INTERVAL = "cron_interval";
var DEFAULT_SYNC_SCHEDULE = { period: "disabled", hour: 5, minute: 0 };
function syncScheduleToCron(schedule2) {
  const { period, hour, minute } = schedule2;
  switch (period) {
    case "disabled":
      return "";
    case "daily":
      return `${minute} ${hour} * * *`;
    case "weekly":
      return `${minute} ${hour} * * ${schedule2.dayOfWeek ?? 1}`;
    default:
      return "";
  }
}
function parseCronSchedule(cronExpr) {
  if (!cronExpr) return null;
  const parts = cronExpr.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  const [minStr, hourStr, domStr, , dowStr] = parts;
  const minute = parseInt(minStr);
  const hour = parseInt(hourStr);
  if (domStr === "*" && dowStr === "*") {
    return { period: "daily", hour, minute };
  }
  if (domStr === "*" && dowStr !== "*") {
    return { period: "weekly", hour, minute, dayOfWeek: parseInt(dowStr) };
  }
  return null;
}
function scheduleLabel(schedule2) {
  switch (schedule2.period) {
    case "disabled":
      return "\u7981\u7528";
    case "daily":
      return `\u6BCF\u5929 ${String(schedule2.hour).padStart(2, "0")}:${String(schedule2.minute).padStart(2, "0")}`;
    case "weekly": {
      const days = ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"];
      return `\u6BCF${days[schedule2.dayOfWeek ?? 1]} ${String(schedule2.hour).padStart(2, "0")}:${String(schedule2.minute).padStart(2, "0")}`;
    }
    default:
      return "\u672A\u77E5";
  }
}
var EDGE_PROXIES = "edge_proxies";
var CLOUD_CREDENTIALS = "cloud_credentials";
var CREDENTIAL_POLICY = "credential_policy";
var CREDENTIAL_ENCRYPTION_KEY = "credential_encryption_key";
var SEARCH_QUOTA = "search_quota";
var SEARCH_QUOTA_REPORT = "search_quota_report";
var CHANNEL_SPEED_MAP = "channel_speed_map";
var CHANNEL_PROBE_ENABLED = "channel_probe_enabled";
var CHANNEL_PROBE_STATUS = "channel_probe_status";
var CHANNEL_MERGED_TREE = "channel_merged_tree";
var CHANNEL_PROBE_CRON = "0 */12 * * *";
var CHANNEL_PROBE_CONCURRENCY = 50;
var CHANNEL_PROBE_TIMEOUT_MS = 5e3;
var CHANNEL_SPEED_TTL_MS = 7 * 24 * 60 * 60 * 1e3;

// src/core/base-url.ts
function getRequestBaseUrl(c, fallback, useForwardedHeaders = false) {
  let host;
  if (useForwardedHeaders) {
    const rawForwardedHost = c.req.header("X-Forwarded-Host");
    if (rawForwardedHost) {
      const forwardedHosts = rawForwardedHost.split(",").map((segment) => segment.trim()).filter(Boolean);
      host = forwardedHosts.at(-1);
    }
  }
  if (!host) {
    const rawHost = c.req.header("Host");
    if (rawHost) host = rawHost;
  }
  if (!host) {
    return fallback.replace(/\/$/, "");
  }
  const proto = useForwardedHeaders ? c.req.header("X-Forwarded-Proto")?.split(",")[0].trim() || "http" : "http";
  return `${proto}://${host}`;
}
function applyBaseUrlPlaceholder(jsonString, baseUrl, fallback) {
  let result = jsonString.replaceAll(BASE_URL_PLACEHOLDER, baseUrl);
  if (fallback && fallback !== baseUrl) {
    result = result.replaceAll(fallback, baseUrl);
  }
  return result;
}
function stripHostPort(host) {
  if (host.startsWith("[")) {
    const closeIdx = host.indexOf("]");
    if (closeIdx === -1) return host;
    return host.substring(1, closeIdx);
  }
  const firstColonIdx = host.indexOf(":");
  if (firstColonIdx === -1) return host;
  if (host.indexOf(":", firstColonIdx + 1) !== -1) return host;
  const colonIdx = firstColonIdx;
  return host.substring(0, colonIdx);
}
function isLanHost(host) {
  const lower = host.toLowerCase();
  if (lower === "localhost") return true;
  const ipv4Match = lower.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const a = Number(ipv4Match[1]);
    const b = Number(ipv4Match[2]);
    const c = Number(ipv4Match[3]);
    const d = Number(ipv4Match[4]);
    if (a > 255 || b > 255 || c > 255 || d > 255) return false;
    if (a === 127) return true;
    if (a === 10) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    return false;
  }
  if (lower === "::1") return true;
  if (lower.startsWith("::ffff:")) return false;
  if (/^f[cd][0-9a-f]{2}:/.test(lower)) return true;
  if (/^fe[89ab][0-9a-f]:/.test(lower)) return true;
  return false;
}
function assertHostAllowed(actualBase, fallback, _c, dmzEnabled) {
  if (actualBase === fallback) return true;
  if (dmzEnabled) return true;
  let hostname;
  try {
    hostname = new URL(actualBase).hostname;
  } catch {
    return false;
  }
  return isLanHost(stripHostPort(hostname));
}

// src/core/logger.ts
var VERBOSE_TRUE = /* @__PURE__ */ new Set(["1", "true", "yes", "on"]);
var sinks = /* @__PURE__ */ new Set();
function subscribeLogSink(fn) {
  sinks.add(fn);
  return () => {
    sinks.delete(fn);
  };
}
function emitSink(entry) {
  for (const fn of sinks) {
    try {
      fn(entry);
    } catch {
    }
  }
}
function isVerbose() {
  return VERBOSE_TRUE.has(String(process.env.VERBOSE || "").trim().toLowerCase());
}
function formatValue(value) {
  if (value instanceof Error) return value.message;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
function maskSecret(value) {
  const raw2 = String(value || "");
  if (!raw2) return "(none)";
  if (raw2.length <= 6) return `${raw2[0] || "*"}***`;
  return `${raw2.slice(0, 3)}...${raw2.slice(-2)}(len=${raw2.length})`;
}
function formatFields(fields) {
  return Object.entries(fields).filter(([, value]) => value !== void 0 && value !== null).map(([key, value]) => {
    const raw2 = formatValue(value).replace(/\s+/g, " ").trim();
    if (!raw2) return `${key}=""`;
    if (/^[A-Za-z0-9_./:@?&=%+\-[\],]+$/.test(raw2)) return `${key}=${raw2}`;
    return `${key}=${JSON.stringify(raw2)}`;
  }).join(" ");
}
function formatTimestamp() {
  const d = /* @__PURE__ */ new Date();
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, "0");
  const D = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}
function formatLineFromTs(ts, level, scope, message) {
  const label = level.padEnd(8);
  if (isVerbose()) return `${ts} ${label} [${scope}] ${message}`;
  return `${ts} ${label} ${message}`;
}
var logger = {
  info(scope, message) {
    const ts = formatTimestamp();
    emitSink({ ts, level: "info", scope, message });
    console.log(formatLineFromTs(ts, "INFO", scope, message));
  },
  infoFields(scope, event, fields) {
    this.info(scope, `${event} ${formatFields(fields)}`.trim());
  },
  // D-13/Pitfall 6: 严格顺序——if (!isVerbose()) return 必须在 emitSink 之前，
  // VERBOSE=false 时直接 return，不构造 entry 不触发 sink（DEBUG gate）。
  debug(scope, message) {
    if (!isVerbose()) return;
    const ts = formatTimestamp();
    emitSink({ ts, level: "debug", scope, message });
    console.log(formatLineFromTs(ts, "DEBUG", scope, message));
  },
  debugFields(scope, event, fields) {
    this.debug(scope, `${event} ${formatFields(fields)}`.trim());
  },
  warn(scope, message) {
    const ts = formatTimestamp();
    emitSink({ ts, level: "warn", scope, message });
    console.warn(formatLineFromTs(ts, "WARN", scope, message));
  },
  warnFields(scope, event, fields) {
    this.warn(scope, `${event} ${formatFields(fields)}`.trim());
  },
  error(scope, message) {
    const ts = formatTimestamp();
    emitSink({ ts, level: "error", scope, message });
    console.error(formatLineFromTs(ts, "ERROR", scope, message));
  },
  errorFields(scope, event, fields) {
    this.error(scope, `${event} ${formatFields(fields)}`.trim());
  },
  // D-07: security 走同一 scope 逻辑（scope='security'），不例外。
  security(message) {
    const ts = formatTimestamp();
    emitSink({ ts, level: "security", scope: "security", message });
    console.warn(formatLineFromTs(ts, "SECURITY", "security", message));
  },
  securityFields(event, fields) {
    this.security(`${event} ${formatFields(fields)}`.trim());
  }
};

// src/routes/config-output.ts
function createConfigOutputRouter(deps) {
  const router = new Hono2();
  const { storage, config: config2 } = deps;
  router.get("/", async (c) => {
    const cached = await storage.get(MERGED_CONFIG);
    if (!cached) {
      return c.json(
        { error: "No config available yet. Add sources in /admin and trigger a refresh." },
        503
      );
    }
    const smartRaw = await storage.get(SMART_JAR_URL_ENABLED);
    const smartEnabled = smartRaw === "true";
    const fallback = (config2.localBaseUrl || "").replace(/\/$/, "");
    const dmzEnabled = process.env.DMZ === "0";
    const actualBase = smartEnabled ? getRequestBaseUrl(c, fallback, dmzEnabled) : fallback;
    if (smartEnabled) {
      if (!assertHostAllowed(actualBase, fallback, c, dmzEnabled)) {
        logger.securityFields("host-intercept", {
          method: "GET",
          path: "/",
          result: "blocked",
          reason: "non_lan_host",
          actualBase,
          fallbackBase: fallback,
          host: c.req.header("Host") || "-",
          xForwardedHost: c.req.header("X-Forwarded-Host") || "-",
          dmz: process.env.DMZ ?? "(unset)",
          smartJarUrl: smartEnabled
        });
        return c.text("Forbidden", 403);
      }
    }
    const liveDisabledRaw = await storage.get(LIVE_DISABLED);
    let outputData = cached;
    if (liveDisabledRaw !== "false") {
      try {
        const parsed = JSON.parse(cached);
        parsed.lives = [];
        outputData = JSON.stringify(parsed);
      } catch {
      }
    }
    const body = applyBaseUrlPlaceholder(outputData, actualBase, fallback);
    return c.body(body, 200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=1800",
      "Access-Control-Allow-Origin": "*"
    });
  });
  router.get("/live-config", async (c) => {
    const cached = await storage.get(MERGED_CONFIG);
    if (!cached) {
      return c.json({ error: "No config available yet." }, 503);
    }
    const liveDisabledRaw = await storage.get(LIVE_DISABLED);
    if (liveDisabledRaw !== "false") {
      return c.body(JSON.stringify({ lives: [] }), 200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*"
      });
    }
    const smartRawEarly = await storage.get(SMART_JAR_URL_ENABLED);
    const smartEnabledEarly = smartRawEarly === "true";
    const fallbackEarly = (config2.localBaseUrl || "").replace(/\/$/, "");
    const dmzEnabledEarly = process.env.DMZ === "0";
    const actualBaseEarly = smartEnabledEarly ? getRequestBaseUrl(c, fallbackEarly, dmzEnabledEarly) : fallbackEarly;
    if (smartEnabledEarly) {
      if (!assertHostAllowed(actualBaseEarly, fallbackEarly, c, dmzEnabledEarly)) {
        logger.securityFields("host-intercept", {
          method: "GET",
          path: "/live-config",
          result: "blocked",
          reason: "non_lan_host",
          actualBase: actualBaseEarly,
          fallbackBase: fallbackEarly,
          host: c.req.header("Host") || "-",
          xForwardedHost: c.req.header("X-Forwarded-Host") || "-",
          dmz: process.env.DMZ ?? "(unset)",
          smartJarUrl: smartEnabledEarly
        });
        return c.text("Forbidden", 403);
      }
    }
    try {
      const full = JSON.parse(cached);
      const liveConfig = { lives: full.lives || [] };
      const liveBody = JSON.stringify(liveConfig);
      return c.body(applyBaseUrlPlaceholder(liveBody, actualBaseEarly, fallbackEarly), 200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=1800",
        "Access-Control-Allow-Origin": "*"
      });
    } catch {
      return c.json({ error: "Config parse error" }, 500);
    }
  });
  return router;
}

// src/core/dirty-marker.ts
var DIRTY_MARKER_KEY = "dirty_marker";
async function setDirtyMarker(storage) {
  await storage.put(DIRTY_MARKER_KEY, "1");
}
async function getDirtyMarker(storage) {
  const raw2 = await storage.get(DIRTY_MARKER_KEY);
  return raw2 === "1";
}
async function clearDirtyMarker(storage) {
  await storage.put(DIRTY_MARKER_KEY, "");
  logger.info("dirty-marker", "cleared");
}

// src/core/status-classifier.ts
function classifyStatus(status, consecutiveFailures) {
  if (status === "ok") return "OK";
  if (consecutiveFailures >= 3) return "ERR";
  if (status === "timeout") return "WARN";
  return "ERR";
}
var STATUS_LABELS = {
  ok: "OK",
  timeout: "TIMEOUT",
  decode_error: "DECODE ERR",
  parse_error: "PARSE ERR",
  // HTTP 错误细分
  http_403: "HTTP ERR",
  http_404: "HTTP ERR",
  http_429: "HTTP ERR",
  http_502: "HTTP ERR",
  http_503: "HTTP ERR",
  http_504: "HTTP ERR",
  http_4xx: "HTTP ERR",
  http_5xx: "HTTP ERR",
  // 网络错误细分
  dns_error: "NET ERR",
  conn_refused: "NET ERR",
  conn_reset: "NET ERR",
  tls_error: "NET ERR",
  host_unreachable: "NET ERR",
  net_unreachable: "NET ERR",
  fetch_failed: "NET ERR"
};

// src/routes/dashboard.ts
function createDashboardRouter(deps) {
  const router = new Hono2();
  const { storage, config: config2, runtime } = deps;
  router.get("/status-data", async (c) => {
    const lastUpdate = await storage.get(LAST_UPDATE);
    const sources = await storage.get(MANUAL_SOURCES);
    const macCMSSources = await storage.get(MACCMS_SOURCES);
    const liveSources = await storage.get(LIVE_SOURCES);
    const cached = await storage.get(MERGED_CONFIG);
    let siteCount = 0;
    let parseCount = 0;
    let liveCount = 0;
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        siteCount = parsed.sites?.length || 0;
        parseCount = parsed.parses?.length || 0;
        liveCount = parsed.lives?.length || 0;
      } catch {
      }
    }
    const warnings = [];
    if (config2.dockerMissingBaseUrl) {
      warnings.push("docker_no_base_url");
    }
    const adminFields = {};
    const auth = c.req.header("Authorization");
    const isAdmin = config2.adminToken && auth === "Bearer " + config2.adminToken;
    if (isAdmin) {
      adminFields.syncRunning = runtime.isSyncing();
      adminFields.dirtyMarker = await getDirtyMarker(storage);
    }
    return c.json({
      lastUpdate: lastUpdate || "never",
      sourceCount: sources ? JSON.parse(sources).length : 0,
      macCMSCount: macCMSSources ? JSON.parse(macCMSSources).length : 0,
      liveSourceCount: liveSources ? JSON.parse(liveSources).length : 0,
      sites: siteCount,
      parses: parseCount,
      lives: liveCount,
      ...adminFields,
      warnings
    });
  });
  router.get("/source-status", async (c) => {
    const raw2 = await storage.get(SOURCE_HEALTH);
    const records = raw2 ? JSON.parse(raw2) : [];
    const normalized = records.map((r) => {
      if ("latestStatus" in r && !("status" in r)) {
        const rawStatus = r.latestStatus;
        const failures = r.consecutiveFailures || 0;
        const fetchStatus = rawStatus === "http_error" ? "http_4xx" : rawStatus === "network_error" ? "fetch_failed" : rawStatus;
        const { latestStatus: _omit, ...rest } = r;
        return {
          ...rest,
          status: classifyStatus(fetchStatus, failures),
          fetchStatus
        };
      }
      return r;
    });
    let ok = 0, warn = 0, err = 0;
    for (const r of normalized) {
      if (r.status === "OK") ok++;
      else if (r.status === "WARN") warn++;
      else err++;
    }
    const withLabels = normalized.map((r) => ({
      ...r,
      label: STATUS_LABELS[r.fetchStatus] || "ERR"
    }));
    return c.json({
      records: withLabels,
      summary: { ok, warn, err }
    });
  });
  return router;
}

// src/core/shared-styles.ts
var sharedStyles = `
/* Local fonts (replaces Google Fonts CDN) */
@font-face{
  font-family:'JetBrains Mono';
  font-style:normal;
  font-weight:300 700;
  font-display:swap;
  src:url('/fonts/jetbrains-mono-latin-ext.woff2') format('woff2');
  unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF;
}
@font-face{
  font-family:'JetBrains Mono';
  font-style:normal;
  font-weight:300 700;
  font-display:swap;
  src:url('/fonts/jetbrains-mono-latin.woff2') format('woff2');
  unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}
@font-face{
  font-family:'Outfit';
  font-style:normal;
  font-weight:300 700;
  font-display:swap;
  src:url('/fonts/outfit-latin-ext.woff2') format('woff2');
  unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF;
}
@font-face{
  font-family:'Outfit';
  font-style:normal;
  font-weight:300 700;
  font-display:swap;
  src:url('/fonts/outfit-latin.woff2') format('woff2');
  unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}

*{margin:0;padding:0;box-sizing:border-box}

:root{
  --bg:#0a0e14;
  --surface:#111720;
  --surface-2:#161d2a;
  --border:#1e2a3a;
  --border-glow:#2a3f5f;
  --green:#00e5a0;
  --green-dim:#00e5a033;
  --green-glow:#00e5a066;
  --amber:#f0a030;
  --amber-dim:#f0a03033;
  --red:#ff4060;
  --red-dim:#ff406033;
  --blue:#4da6ff;
  --blue-dim:#4da6ff33;
  --text:#c8d6e5;
  --text-dim:#5a6d82;
  --text-bright:#fff;
  --mono:'JetBrains Mono',monospace;
  --sans:'Outfit',sans-serif;
}

[data-theme="light"]{
  --bg:#f4f6f9;
  --surface:#ffffff;
  --surface-2:#eef1f5;
  --border:#d4dae3;
  --border-glow:#b8c2d0;
  --green:#008c63;
  --green-dim:#008c6320;
  --green-glow:#008c6340;
  --amber:#b87a10;
  --amber-dim:#b87a1020;
  --red:#d02040;
  --red-dim:#d0204020;
  --blue:#2d7cd6;
  --blue-dim:#2d7cd620;
  --text:#2c3e50;
  --text-dim:#6b7d8f;
  --text-bright:#1a202c;
}

[data-theme="light"] body::before,
[data-theme="light"] body::after{
  opacity:0;
}
[data-theme="light"] body{
  background:linear-gradient(180deg,#f4f6f9 0%,#e8ecf2 40%,#f4f6f9 100%);
}

html{font-size:16px}
body{
  background:var(--bg);
  color:var(--text);
  font-family:var(--sans);
  min-height:100vh;
  overflow-x:hidden;
  position:relative;
}

body::after{
  content:'';
  position:fixed;
  inset:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px);
  pointer-events:none;
  z-index:1000;
}

body::before{
  content:'';
  position:fixed;
  inset:0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, #00e5a008 0%, transparent 70%),
    linear-gradient(rgba(30,42,58,0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30,42,58,0.3) 1px, transparent 1px);
  background-size:100% 100%, 60px 60px, 60px 60px;
  pointer-events:none;
  z-index:0;
}

.container{
  max-width:960px;
  margin:0 auto;
  padding:40px 24px 80px;
  position:relative;
  z-index:1;
}

/* Header */
.header{
  margin-bottom:24px;
  animation:fadeSlideDown 0.6s ease-out;
}

.header-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.header-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.2em;
  text-transform:uppercase;
  color:var(--green);
  opacity:0.7;
  margin-bottom:8px;
  display:flex;
  align-items:center;
  gap:8px;
}

.header-label::before{
  content:'';
  display:inline-block;
  width:8px;height:8px;
  background:var(--green);
  border-radius:50%;
  animation:pulse 2s ease-in-out infinite;
}

.header-title{
  font-family:var(--sans);
  font-size:2rem;
  font-weight:700;
  letter-spacing:-0.02em;
  color:var(--text-bright);
  line-height:1.2;
}

.header-title span{color:var(--green)}

.header-nav{
  display:flex;
  gap:0;
  margin-top:16px;
  border-bottom:1px solid var(--border);
  overflow-x:auto;
  flex-wrap:nowrap;
}

.header-nav a{
  flex:1;
  text-align:center;
  font-family:var(--mono);
  font-size:0.75rem;
  font-weight:500;
  letter-spacing:0.1em;
  text-transform:uppercase;
  color:var(--text-dim);
  text-decoration:none;
  padding:12px 20px;
  border-bottom:2px solid transparent;
  transition:all 0.2s;
  user-select:none;
  white-space:nowrap;
}

.header-nav a:hover{
  color:var(--text);
}

.header-nav a.active{
  color:var(--green);
  border-bottom-color:var(--green);
  cursor:default;
  pointer-events:none;
}

.theme-toggle{
  font-family:var(--mono);
  font-size:0.65rem;
  font-weight:500;
  padding:4px 10px;
  border:1px solid var(--border);
  border-radius:4px;
  background:transparent;
  color:var(--text-dim);
  cursor:pointer;
  transition:all 0.2s;
  line-height:1;
}
.theme-toggle:hover{
  border-color:var(--text-dim);
  color:var(--text);
}
/* Login overlay */
.login-overlay{
  position:fixed;
  inset:0;
  background:var(--bg);
  z-index:900;
  display:flex;
  align-items:center;
  justify-content:center;
}

.login-box{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:40px;
  width:360px;
  max-width:90vw;
  animation:fadeSlideUp 0.4s ease-out;
}

.login-box h2{
  font-family:var(--sans);
  font-size:1.4rem;
  font-weight:700;
  color:var(--text-bright);
  margin-bottom:8px;
}

.login-box p{
  font-family:var(--mono);
  font-size:0.7rem;
  color:var(--text-dim);
  letter-spacing:0.1em;
  text-transform:uppercase;
  margin-bottom:24px;
}

.login-box input{
  width:100%;
  font-family:var(--mono);
  font-size:0.85rem;
  padding:12px 16px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:var(--text-bright);
  outline:none;
  margin-bottom:16px;
  transition:border-color 0.2s;
}

.login-box input:focus{border-color:var(--green)}

.login-box .error-msg{
  font-family:var(--mono);
  font-size:0.75rem;
  color:var(--red);
  margin-bottom:12px;
  display:none;
}

/* Buttons */
.btn{
  font-family:var(--mono);
  font-size:0.75rem;
  font-weight:600;
  letter-spacing:0.1em;
  text-transform:uppercase;
  padding:10px 20px;
  background:transparent;
  border:1px solid var(--green);
  color:var(--green);
  border-radius:4px;
  cursor:pointer;
  transition:all 0.3s;
  white-space:nowrap;
}

.btn:hover{
  background:var(--green-dim);
  box-shadow:0 0 20px var(--green-dim);
}

.btn:active{transform:scale(0.97)}

.btn.loading{
  color:var(--amber);
  border-color:var(--amber);
  pointer-events:none;
}

.btn[disabled], .btn:disabled{
  opacity:0.4;
  cursor:not-allowed;
  pointer-events:none;
}

.btn-danger, .btn.danger{
  border-color:var(--red);
  color:var(--red);
}

.btn-danger:hover, .btn.danger:hover{
  background:var(--red-dim);
  box-shadow:0 0 20px var(--red-dim);
}

.btn.secondary{
  border-color:var(--amber);
  color:var(--amber);
}

.btn.secondary:hover{
  background:var(--amber-dim);
  box-shadow:0 0 20px var(--amber-dim);
}

.btn.success{
  border-color:var(--green);
  color:var(--green);
}

.btn.success:hover{
  background:var(--green-dim);
  box-shadow:0 0 20px var(--green-dim);
}

.btn-sm, .btn.sm{
  padding:6px 12px;
  font-size:0.65rem;
}

/* Tabs */
.tabs{
  display:flex;
  gap:0;
  margin-bottom:20px;
  border-bottom:1px solid var(--border);
}

.tab{
  font-family:var(--mono);
  font-size:0.75rem;
  font-weight:500;
  letter-spacing:0.1em;
  text-transform:uppercase;
  padding:12px 20px;
  color:var(--text-dim);
  cursor:pointer;
  border-bottom:2px solid transparent;
  transition:all 0.2s;
  user-select:none;
}

.tab:hover{color:var(--text)}

.tab.active{
  color:var(--green);
  border-bottom-color:var(--green);
}

.tab .badge{
  display:inline-block;
  font-size:0.6rem;
  padding:1px 6px;
  border-radius:8px;
  margin-left:6px;
  background:var(--surface-2);
  color:var(--text-dim);
}

.tab.active .badge{
  background:var(--green-dim);
  color:var(--green);
}

.tab-panel{display:none}
.tab-panel.active{display:block}

/* Search bar */
.search-bar{
  margin-bottom:16px;
  display:flex;
  gap:10px;
}

.search-bar input{
  flex:1;
  font-family:var(--mono);
  font-size:0.8rem;
  padding:10px 14px;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:4px;
  color:var(--text-bright);
  outline:none;
  transition:border-color 0.2s;
}

.search-bar input:focus{border-color:var(--green)}
.search-bar input::placeholder{color:var(--text-dim)}

/* Section cards */
.section{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:24px;
  margin-bottom:20px;
  position:relative;
  overflow:hidden;
}

.section::before{
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:1px;
  background:linear-gradient(90deg, transparent, var(--green-dim), transparent);
}

.section-title{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
  margin-bottom:16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.section-title .count{
  font-size:0.75rem;
  color:var(--green);
  font-weight:600;
}

/* Source list */
.source-list{
  display:flex;
  flex-direction:column;
  gap:8px;
}

.source-item{
  display:flex;
  align-items:center;
  gap:12px;
  padding:12px 16px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  transition:border-color 0.2s;
}

.source-item:hover{border-color:var(--border-glow)}

.source-tag{
  font-family:var(--mono);
  font-size:0.6rem;
  font-weight:600;
  letter-spacing:0.08em;
  text-transform:uppercase;
  padding:3px 8px;
  border-radius:3px;
  flex-shrink:0;
}

.source-tag.scraped{
  background:var(--blue-dim);
  color:var(--blue);
  border:1px solid var(--blue);
}

.source-tag.manual{
  background:var(--green-dim);
  color:var(--green);
  border:1px solid var(--green);
}

.source-info{
  flex:1;
  min-width:0;
  overflow:hidden;
}

.source-name{
  font-family:var(--sans);
  font-size:0.85rem;
  color:var(--text-bright);
  font-weight:500;
  margin-bottom:2px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.source-url{
  font-family:var(--mono);
  font-size:0.7rem;
  color:var(--text-dim);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.source-actions{flex-shrink:0}

/* Add form */
.add-form{
  display:flex;
  gap:10px;
  margin-bottom:8px;
}

.add-form input{
  flex:1;
  font-family:var(--mono);
  font-size:0.8rem;
  padding:10px 14px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:var(--text-bright);
  outline:none;
  transition:border-color 0.2s;
}

.add-form input:focus{border-color:var(--green)}
.add-form input::placeholder{color:var(--text-dim);opacity:0.6}
.add-form .name-input{max-width:160px}

@media(max-width:560px){
  .add-form{flex-wrap:wrap}
  .add-form .name-input{max-width:100%}
  .header-nav a{padding:12px 14px;font-size:0.65rem}
}

/* Empty state */
.empty{
  text-align:center;
  padding:32px 16px;
  font-family:var(--mono);
  font-size:0.8rem;
  color:var(--text-dim);
}

/* Toast */
.toast-container{
  position:fixed;
  bottom:24px;
  right:24px;
  display:flex;
  flex-direction:column;
  gap:8px;
  z-index:999;
  pointer-events:none;
}
.toast{
  font-family:var(--mono);
  font-size:0.75rem;
  padding:12px 20px;
  border-radius:4px;
  white-space:nowrap;
  animation:fadeSlideUp 0.3s ease-out;
  transition:opacity 0.3s;
}

.toast.success{
  background:var(--surface);
  border:1px solid var(--green);
  color:var(--green);
  box-shadow:0 4px 16px rgba(0,0,0,0.2);
}

.toast.error{
  background:var(--red-dim);
  border:1px solid var(--red);
  color:var(--red);
}

/* Collapsible */
.collapsible-toggle{
  font-family:var(--mono);
  font-size:0.65rem;
  letter-spacing:0.08em;
  color:var(--text-dim);
  cursor:pointer;
  padding:6px 0;
  user-select:none;
  transition:color 0.2s;
}

.collapsible-toggle:hover{color:var(--text)}

.collapsible-toggle::before{
  content:'\\25B6';
  display:inline-block;
  margin-right:6px;
  font-size:0.55rem;
  transition:transform 0.2s;
}

.collapsible-toggle.open::before{transform:rotate(90deg)}

.collapsible-body{
  display:none;
  margin-top:8px;
}

.collapsible-body.open{display:block}

/* Warning banner (used by dashboard + config-editor deferred banner) */
.warning-banner{
  background:var(--amber-dim);
  border:1px solid var(--amber);
  border-radius:8px;
  padding:12px 16px;
  margin-bottom:20px;
  font-family:var(--mono);
  font-size:0.75rem;
  color:var(--amber);
  line-height:1.6;
}

/* Footer */
.footer{
  margin-top:36px;
  padding-top:20px;
  border-top:1px solid var(--border);
  font-family:var(--mono);
  font-size:0.65rem;
  color:var(--text-dim);
  text-align:center;
  letter-spacing:0.05em;
}

/* Loading skeleton */
.skeleton{
  background:linear-gradient(90deg, var(--surface-2) 25%, var(--border) 50%, var(--surface-2) 75%);
  background-size:200% 100%;
  animation:shimmer 1.5s infinite;
  border-radius:4px;
  color:transparent !important;
}

/* Animations */
@keyframes fadeSlideDown{
  from{opacity:0;transform:translateY(-12px)}
  to{opacity:1;transform:translateY(0)}
}

@keyframes fadeSlideUp{
  from{opacity:0;transform:translateY(12px)}
  to{opacity:1;transform:translateY(0)}
}

@keyframes pulse{
  0%,100%{opacity:1}
  50%{opacity:0.4}
}

@keyframes loading{
  0%{width:0;left:0}
  50%{width:100%;left:0}
  100%{width:0;left:100%}
}

@keyframes shimmer{
  0%{background-position:200% 0}
  100%{background-position:-200% 0}
}

/* Phase 6 VIEWER-03 (Plan 03): \u65E5\u5FD7\u67E5\u770B\u5668\u6837\u5F0F */
/* D-18: level \u989C\u8272\u6620\u5C04\u2014\u2014info \u9ED8\u8BA4\u8272\u3001warn \u7425\u73C0\u3001error \u7EA2\u3001security \u72EC\u7ACB\u8272\uFF08\u84DD\uFF0C\u65E0 --purple\uFF09\u3001debug dim */
.log-line{
  padding:1px 0;
  line-height:1.4;
}
.log-line.log-info{
  color:var(--text);
}
.log-line.log-warn{
  color:var(--amber);
}
.log-line.log-error{
  color:var(--red);
}
.log-line.log-security{
  color:var(--blue);
}
.log-line.log-debug{
  color:var(--text-dim);
}

/* \u65E5\u5FD7\u6EDA\u52A8\u533A\u5BB9\u5668\uFF08per RESEARCH.md Example 3\uFF09 */
.log-viewer{
  font-family:var(--mono);
  font-size:0.75rem;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  padding:8px;
  height:500px;
  overflow-y:auto;
  white-space:pre-wrap;
  word-break:break-all;
}
`;

// src/core/shared-ui.ts
var sharedUi = `
const $ = id => document.getElementById(id);

function esc(s) {
  if (!s) return '';
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function escAttr(s) {
  return esc(s).replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}

function toast(msg, type) {
  type = type || 'success';
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(function() { el.style.opacity = '0'; setTimeout(function() { el.remove(); }, 300); }, 2500);
}

function initAuth(tokenInputId, errorId, overlayId, contentId, verifyUrl, onSuccess) {
  let token = '';
  const tokenInput = $(tokenInputId);
  const overlay = $(overlayId);
  const content = $(contentId);
  const errorEl = $(errorId);

  function getToken() { return token; }

  function authFetch(url, opts) {
    opts = opts || {};
    opts.headers = Object.assign({}, opts.headers, { 'Authorization': 'Bearer ' + token });
    return fetch(url, opts);
  }

  function doLogin() {
    token = tokenInput.value.trim();
    if (!token) return;
    fetch(verifyUrl, {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(r => {
      if (r.ok) {
        overlay.style.display = 'none';
        content.style.display = 'block';
        sessionStorage.setItem('admin_token', token);
        onSuccess();
      } else {
        errorEl.style.display = 'block';
        tokenInput.value = '';
        tokenInput.focus();
      }
    }).catch(() => {
      errorEl.style.display = 'block';
    });
  }

  tokenInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

  // Auto-login from session
  const saved = sessionStorage.getItem('admin_token');
  if (saved) {
    token = saved;
    fetch(verifyUrl, {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(r => {
      if (r.ok) {
        overlay.style.display = 'none';
        content.style.display = 'block';
        onSuccess();
      }
    });
  }

  return { doLogin, authFetch, getToken };
}

function toggleCollapsible(toggleEl) {
  toggleEl.classList.toggle('open');
  const body = toggleEl.nextElementSibling;
  if (body) body.classList.toggle('open');
}

function getTheme() {
  return localStorage.getItem('theme') || 'dark';
}

var THEMES = [
  { id: 'dark',  icon: '\\uD83C\\uDF19', label: 'Dark',  dot: '#0a0e14' },
  { id: 'light', icon: '\\u2600\\uFE0F', label: 'Light', dot: '#f4f6f9' }
];

function findTheme(id) {
  for (var i = 0; i < THEMES.length; i++) { if (THEMES[i].id === id) return THEMES[i]; }
  return THEMES[0];
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  var btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = findTheme(theme).icon;
}

function toggleTheme() {
  var next = getTheme() === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
}

// Phase 6 VIEWER-03 (Plan 03): streamSse \u2014 \u6D4F\u89C8\u5668\u4FA7 SSE \u5E27\u89E3\u6790\uFF08fetch + getReader\uFF09\u3002
// D-11: \u4E0D\u7528 EventSource\uFF08\u65E0\u6CD5\u8BBE Authorization \u5934\uFF09\uFF0C\u7528 fetch + ReadableStream \u624B\u52A8\u89E3\u6790\u5E27\u3002
// Pitfall 2: TextDecoder.decode(value, {stream:true}) \u5904\u7406\u8DE8 chunk \u7684\u591A\u5B57\u8282 UTF-8\uFF08\u9632\u4E2D\u6587\u4E71\u7801\uFF09\u3002
// \u6309 WHATWG HTML \xA79.2 SSE wire format \u5207\u5E27\uFF1A\u4EE5 '\\n\\n' \u5206\u9694\u5E27\uFF0C\u6BCF\u5E27\u6309\u884C\u89E3\u6790 'field: value'\u3002
// \u8FD4\u56DE { abort } handle \u4F9B\u8C03\u7528\u65B9\u4E3B\u52A8\u65AD\u5F00\uFF08abort \u540E\u7684 AbortError \u4E0D\u89E6\u53D1 onError\uFF09\u3002
function streamSse(url, token, onMessage, onOpen, onError) {
  var controller = new AbortController();
  var decoder = new TextDecoder();
  var buf = '';

  (async function() {
    try {
      var res = await fetch(url, {
        headers: { Authorization: 'Bearer ' + token },
        signal: controller.signal,
      });
      if (!res.ok) {
        onError(new Error('HTTP ' + res.status));
        return;
      }
      if (onOpen) onOpen();
      var reader = res.body.getReader();
      while (true) {
        var r = await reader.read();
        if (r.done) break;
        // {stream:true} \u5904\u7406\u8DE8 chunk \u7684\u591A\u5B57\u8282 UTF-8 \u5B57\u7B26\uFF08Pitfall 2\uFF0C\u9632\u4E2D\u6587\u4E71\u7801\uFF09
        buf += decoder.decode(r.value, { stream: true });
        // \u6309 '\\n\\n' \u5207\u5B8C\u6574\u5E27\uFF0C\u534A\u5E27\u7559 buf\uFF08per WHATWG HTML \xA79.2\uFF09
        var idx;
        while ((idx = buf.indexOf('\\n\\n')) >= 0) {
          var frame = buf.slice(0, idx);
          buf = buf.slice(idx + 2);
          // \u89E3\u6790\u5E27\uFF1A\u6BCF\u884C 'field: value'\uFF0C\u8DF3\u8FC7 ':' \u6CE8\u91CA\u884C\uFF08heartbeat\uFF09\uFF0C\u5408\u5E76\u591A\u884C data
          var dataLines = [];
          var lines = frame.split('\\n');
          for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.charAt(0) === ':') continue; // \u6CE8\u91CA/heartbeat \u5E27\uFF0C\u5FFD\u7565
            var colonIdx = line.indexOf(':');
            if (colonIdx < 0) continue;
            var field = line.slice(0, colonIdx);
            var val = line.slice(colonIdx + 1);
            if (val.charAt(0) === ' ') val = val.slice(1); // spec: \u5192\u53F7\u540E\u53EF\u9009\u7A7A\u683C
            if (field === 'data') dataLines.push(val);
            // event/id/retry \u5B57\u6BB5\u672C\u65B9\u6848\u4E0D\u7528\uFF08D-13 \u7EDF\u4E00 data JSON\uFF09\uFF0C\u5FFD\u7565
          }
          if (dataLines.length > 0) {
            onMessage(dataLines.join('\\n'));
          }
        }
      }
      // \u6D41\u6B63\u5E38\u7ED3\u675F\uFF08\u670D\u52A1\u5668\u5173\u95ED\uFF09\u2014\u2014\u89C6\u4E3A\u65AD\u5F00\uFF0C\u89E6\u53D1\u91CD\u8FDE
      onError(new Error('stream ended'));
    } catch (e) {
      // \u4E3B\u52A8 abort\uFF08AbortError\uFF09\u4E0D\u89E6\u53D1 onError\uFF0C\u907F\u514D\u65AD\u5F00\u65F6\u8BEF\u89E6\u53D1\u91CD\u8FDE
      if (e && e.name === 'AbortError') return;
      onError(e);
    }
  })();

  return { abort: function() { controller.abort(); } };
}

`;

// src/core/admin.ts
var adminHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TVBox Auxiliary - Admin</title>
<style>
${sharedStyles}

/* Admin-specific: action bar in header */
.agg-bar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-top:16px;
  padding:12px 16px;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:6px;
  font-family:var(--mono);
  font-size:0.75rem;
  color:var(--text-dim);
}

.agg-bar .status-text{font-family:var(--mono);font-size:0.75rem;color:var(--text-dim)}
.agg-bar .status-text.success{color:var(--green)}
.agg-bar .status-text.error{color:var(--red)}

/* Inline form label */
.form-label{
  font-family:var(--mono);
  font-size:0.65rem;
  color:var(--text-dim);
  text-transform:uppercase;
  letter-spacing:0.1em;
  display:block;
  margin-bottom:4px;
}

/* Name transform grid */
.nt-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
  margin-bottom:10px;
}

.nt-input{
  width:100%;
  font-family:var(--mono);
  font-size:0.8rem;
  padding:8px 12px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:var(--text-bright);
  outline:none;
  transition:border-color 0.2s;
}

.nt-input:focus{border-color:var(--green)}

.nt-textarea{
  width:100%;
  min-height:60px;
  font-family:var(--mono);
  font-size:0.75rem;
  padding:8px 12px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:var(--text-bright);
  resize:vertical;
  outline:none;
}

.nt-textarea:focus{border-color:var(--green)}


/* Import textarea */
.import-textarea{
  width:100%;
  min-height:100px;
  font-family:var(--mono);
  font-size:0.75rem;
  padding:10px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:var(--text-bright);
  resize:vertical;
  margin-bottom:8px;
}

/* Batch textarea */
.batch-textarea{
  width:100%;
  margin-top:8px;
  min-height:120px;
  font-family:var(--mono);
  font-size:0.75rem;
  padding:10px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:var(--text-bright);
  resize:vertical;
}

/* Source health dot in list items */
.source-health-dot{
  width:8px;height:8px;
  border-radius:50%;
  flex-shrink:0;
  position:relative;
  cursor:default;
}

.source-health-dot.ok{
  background:var(--green);
  box-shadow:0 0 4px var(--green-glow);
}

.source-health-dot.warn{
  background:var(--amber);
  box-shadow:0 0 4px var(--amber-dim);
}

.source-health-dot.error{
  background:var(--red);
  box-shadow:0 0 4px var(--red-dim);
}

.source-health-dot.unknown{
  background:var(--text-dim);
}

.source-item{position:relative}

.source-item .source-health-dot::after{
  content:attr(data-tooltip);
  position:absolute;
  left:0;
  bottom:calc(100% + 8px);
  padding:6px 10px;
  background:var(--surface-2);
  border:1px solid var(--border);
  border-radius:4px;
  font-family:var(--mono);
  font-size:0.6rem;
  color:var(--text);
  white-space:nowrap;
  pointer-events:none;
  opacity:0;
  transition:opacity 0.2s;
  z-index:100;
}

.source-item:hover .source-health-dot::after{
  opacity:1;
}

@media(max-width:560px){
  .nt-grid{grid-template-columns:1fr}
  .tabs{overflow-x:auto;flex-wrap:nowrap}
  .tab{padding:12px 14px;font-size:0.65rem}
}

.tab.disabled{color:var(--text-dim);opacity:0.4;cursor:not-allowed;pointer-events:none}
</style>
<script>(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t)})()</script>
</head>
<body>

<!-- Login -->
<div class="login-overlay" id="loginOverlay">
  <div class="login-box">
    <h2>\u7BA1\u7406\u767B\u5F55</h2>
    <p>TVBox Auxiliary \u7BA1\u7406</p>
    <div class="error-msg" id="loginError">\u65E0\u6548\u7684\u4EE4\u724C</div>
    <input type="password" id="loginInput" placeholder="\u8BF7\u8F93\u5165\u7BA1\u7406\u4EE4\u724C" autocomplete="off">
    <button class="btn" style="width:100%" onclick="auth.doLogin()">\u767B\u5F55</button>
  </div>
</div>

<!-- Main content -->
<div class="container" id="mainContent" style="display:none">
  <header class="header">
    <div class="header-top">
      <div class="header-label">\u7BA1\u7406\u63A7\u5236\u53F0</div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()">\u{1F319}</button>
        </div>
    </div>
    <h1 class="header-title">TVBox <span>Auxiliary</span></h1>
    <nav class="header-nav">
      <a href="/status">\u9996\u9875</a>
      <a href="/admin" class="active">\u63A5\u53E3\u7BA1\u7406</a>
      <a href="/admin/config-editor">\u914D\u7F6E\u7F16\u8F91</a>
    </nav>
  </header>

  <!-- Tabs -->
  <div class="tabs">
    <div class="tab active" data-tab="sources" onclick="switchTab('sources')"><span>\u63A5\u53E3</span> <span class="badge" id="badgeSources">0</span></div>
    <div class="tab" data-tab="maccms" onclick="switchTab('maccms')"><span>MacCMS</span> <span class="badge" id="badgeMacCMS">0</span></div>
    <div class="tab" data-tab="live" onclick="switchTab('live')"><span>\u76F4\u64AD</span> <span class="badge" id="badgeLive">0</span></div>
    <div class="tab" data-tab="searchQuota" onclick="switchTab('searchQuota')" id="tabSearchQuota" style="display:none"><span>\u641C\u7D22</span> <span class="badge" id="badgeSearchQuota">0</span></div>
    <div class="tab" data-tab="settings" onclick="switchTab('settings')"><span>\u8BBE\u7F6E</span></div>
    <div class="tab" data-tab="logs" onclick="switchTab('logs')"><span>\u65E5\u5FD7</span></div>
  </div>

  <!-- Sources Tab -->
  <div class="tab-panel active" id="panelSources">
    <!-- Add source -->
    <div class="section">
      <div class="section-title">\u6DFB\u52A0\u63A5\u53E3</div>
      <div class="add-form">
        <input class="name-input" type="text" id="addName" placeholder="\u540D\u79F0\uFF08\u53EF\u9009\uFF09">
        <input type="url" id="addUrl" placeholder="TVBox \u914D\u7F6E JSON \u5730\u5740">
        <input class="name-input" type="text" id="addConfigKey" placeholder="Config Key (optional, for AES ECB)">
        <button class="btn" id="addBtn" onclick="addSource()">\u6DFB\u52A0</button>
      </div>
      <!-- Import (collapsible) -->
      <div class="collapsible-toggle" onclick="toggleCollapsible(this)">\u5BFC\u5165\u914D\u7F6E</div>
      <div class="collapsible-body">
        <textarea id="importInput" class="import-textarea" placeholder="\u7C98\u8D34 TVBox JSON \u5185\u5BB9\u6216 URL..."></textarea>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn-sm" id="importBtn" onclick="importConfig()">\u5BFC\u5165</button>
          <span class="status-text" id="importResult" style="font-family:var(--mono);font-size:0.75rem"></span>
        </div>
      </div>
    </div>

    <!-- Source list -->
    <div class="section">
      <div class="section-title">
        <span>\u63A5\u53E3\u5217\u8868</span>
        <span class="count" id="sourceCount">0</span>
      </div>
      <div class="source-list" id="sourceList">
        <div class="empty">Loading sources...</div>
      </div>
    </div>
  </div>

  <!-- MacCMS Tab -->
  <div class="tab-panel" id="panelMaccms">
    <!-- Add MacCMS -->
    <div class="section">
      <div class="section-title">\u6DFB\u52A0 MacCMS \u6E90</div>
      <div class="add-form">
        <input class="name-input" type="text" id="mcKey" placeholder="Key\uFF08\u5982 hongniuzy\uFF09">
        <input class="name-input" type="text" id="mcName" placeholder="\u540D\u79F0">
        <input type="url" id="mcApi" placeholder="MacCMS API \u5730\u5740">
        <button class="btn" id="mcAddBtn" onclick="addMacCMS()">\u6DFB\u52A0</button>
      </div>
      <!-- Batch import (collapsible) -->
      <div class="collapsible-toggle" onclick="toggleCollapsible(this)">\u6279\u91CF\u5BFC\u5165</div>
      <div class="collapsible-body">
        <textarea id="mcBatchInput" class="batch-textarea" placeholder='[{"key":"...","name":"...","api":"..."}]'></textarea>
        <button class="btn btn-sm" style="margin-top:8px" id="mcBatchBtn" onclick="batchImportMacCMS()">\u63D0\u4EA4\u6279\u91CF</button>
      </div>
    </div>

    <!-- MacCMS list -->
    <div class="section">
      <div class="section-title">
        <span>MacCMS \u6E90\u5217\u8868</span>
        <span class="count" id="mcCount">0</span>
      </div>
      <div class="source-list" id="mcList">
        <div class="empty">Loading MacCMS sources...</div>
      </div>
    </div>
  </div>

  <!-- Live Tab -->
  <div class="tab-panel" id="panelLive">
    <!-- Add live source -->
    <div class="section">
      <div class="section-title">\u6DFB\u52A0\u76F4\u64AD\u6E90</div>
      <div class="add-form">
        <input class="name-input" type="text" id="liveName" placeholder="\u540D\u79F0\uFF08\u5982 iptv365\uFF09">
        <input type="url" id="liveUrl" placeholder="m3u/txt \u5730\u5740">
        <button class="btn" id="liveAddBtn" onclick="addLive()">\u6DFB\u52A0</button>
      </div>
    </div>

    <!-- Live list -->
    <div class="section">
      <div class="section-title">
        <span>\u76F4\u64AD\u6E90\u5217\u8868</span>
        <span class="count" id="liveCount">0</span>
      </div>
      <div class="source-list" id="liveList">
        <div class="empty">Loading live sources...</div>
      </div>
    </div>

    <!-- Channel Probe (Node/Docker only) -->
    <div class="section" id="channelProbeSection">
      <div class="section-title">\u9891\u9053\u7EA7\u6D4B\u901F\uFF08\u4EC5 Node/Docker\uFF09</div>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:8px">
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
          <input type="checkbox" id="channelProbeCheck" onchange="toggleChannelProbe()">
          <span>\u542F\u7528\u5B9A\u65F6\u9891\u9053\u6D4B\u901F\uFF08\u6BCF 12 \u5C0F\u65F6\uFF09</span>
        </label>
        <button class="btn btn-sm" id="channelProbeTriggerBtn" onclick="triggerChannelProbe()">\u7ACB\u5373\u6267\u884C</button>
        <button class="btn btn-sm" onclick="loadChannelProbe()">\u5237\u65B0</button>
      </div>
      <div id="channelProbeStatus" style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6"></div>
    </div>
  </div>

  <!-- Search Quota Tab -->
  <div class="tab-panel" id="panelSearchQuota">
    <div class="section">
      <div class="section-title">\u6D3B\u8DC3\u641C\u7D22\u6E90</div>
      <div id="sqSelectedInfo" style="margin-bottom:8px;font-size:0.8rem;color:var(--text-secondary)"></div>
      <div id="sqSelectedTable" style="max-height:500px;overflow:auto">
        <div style="color:var(--text-secondary);font-size:0.85rem">\u6267\u884C\u540C\u6B65\u540E\u67E5\u770B\u7ED3\u679C</div>
      </div>
    </div>
  </div>


  <!-- Settings Tab -->
  <div class="tab-panel" id="panelSettings">
    <!-- Sync Schedule -->
    <div class="section">
      <div class="section-title">\u540C\u6B65\u9891\u7387</div>
      <div id="syncScheduleForm" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <select id="syncPeriod" class="nt-input" style="width:auto;min-width:120px" onchange="onSyncPeriodChange()">
          <option value="disabled">\u7981\u7528</option>
          <option value="daily">\u6BCF\u5929</option>
          <option value="weekly">\u6BCF\u5468</option>
        </select>
        <input type="time" id="syncTime" value="05:00" class="nt-input" style="width:auto">
        <select id="syncDayOfWeek" class="nt-input" style="width:auto;min-width:90px;display:none">
          <option value="1">\u5468\u4E00</option>
          <option value="2">\u5468\u4E8C</option>
          <option value="3">\u5468\u4E09</option>
          <option value="4">\u5468\u56DB</option>
          <option value="5">\u5468\u4E94</option>
          <option value="6">\u5468\u516D</option>
          <option value="0">\u5468\u65E5</option>
        </select>
        <button class="btn btn-sm" id="syncSaveBtn" onclick="saveSyncSchedule()">\u4FDD\u5B58</button>
        <span class="status-text" id="syncStatus" style="font-family:var(--mono);font-size:0.75rem"></span>
      </div>
      <div id="syncEnvNotice" style="margin-top:6px;font-size:0.8rem;color:var(--text-secondary);display:none">
        \u73AF\u5883\u53D8\u91CF\u5DF2\u8BBE\u5B9A\uFF0C\u7981\u7528\u624B\u52A8\u8BBE\u7F6E\u805A\u5408\u65F6\u95F4
      </div>
    </div>

    <div class="section">
      <div class="section-title">\u7AD9\u70B9\u6D4B\u901F</div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" id="speedTestCheck" onchange="saveSpeedTest()" checked>
          <span>\u542F\u7528\u7AD9\u70B9\u6D4B\u901F\u4E0E\u4E0D\u53EF\u8FBE\u5254\u9664</span>
        </label>
        <span class="status-text" id="speedTestStatus" style="font-family:var(--mono);font-size:0.75rem"></span>
      </div>
      <div style="margin-top:6px;font-size:0.8rem;color:var(--text-secondary)">\u5173\u95ED\u540E\u4FDD\u7559\u6240\u6709\u7AD9\u70B9\uFF0C\u4E0D\u8FDB\u884C\u53EF\u8FBE\u6027\u68C0\u6D4B</div>
    </div>

    <div class="section">
      <div class="section-title">\u9AD8\u7EA7\u8BBE\u7F6E</div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" id="smartJarUrlCheck" onchange="saveSmartJarUrl()">
          <span>\u667A\u80FD\u54CD\u5E94\u9759\u6001\u8D44\u6E90\u5730\u5740</span>
        </label>
        <span class="status-text" id="smartJarUrlStatus" style="font-family:var(--mono);font-size:0.75rem"></span>
      </div>
      <div style="margin-top:6px;font-size:0.8rem;color:var(--text-secondary)">\u5B9E\u9A8C\u6027\u529F\u80FD\uFF0C\u590D\u7528\u8BBF\u95EE\u63A5\u53E3\u65F6\u7684\u5934\u90E8\u4FE1\u606F\u52A8\u6001\u5730\u4E3A\u8BE5\u5BA2\u6237\u7AEF\u751F\u6210\u9759\u6001\u8D44\u6E90\u5730\u5740\uFF0C\u6CE8\u610F\u6F5C\u5728\u7684\u5B89\u5168\u98CE\u9669\u3002</div>

      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:14px">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" id="liveDisabledCheck" onchange="saveLiveDisabled()">
          <span>\u7981\u7528\u76F4\u64AD\u529F\u80FD</span>
        </label>
        <span class="status-text" id="liveDisabledStatus" style="font-family:var(--mono);font-size:0.75rem"></span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">\u8FB9\u7F18\u51FD\u6570\u4EE3\u7406</div>
      <div style="margin-bottom:6px;font-size:0.8rem;color:var(--text-secondary)">\u914D\u7F6E\u8FB9\u7F18\u51FD\u6570 URL\uFF0C\u7528\u4E8E\u672C\u5730 Docker \u6A21\u5F0F\u7684\u8BF7\u6C42\u4EE3\u7406\u56DE\u9000\u548C\u56FE\u7247 CDN \u52A0\u901F</div>
      <div class="nt-grid">
        <div>
          <label class="form-label">Fetch Proxy URL</label>
          <input type="text" id="edgeFetchProxyUrl" class="nt-input" placeholder="https://tvbox.example.com">
        </div>
        <div>
          <label class="form-label">Vercel Proxy URL</label>
          <input type="text" id="edgeVercelUrl" class="nt-input" placeholder="https://fetch.example.com">
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
        <button class="btn btn-sm" onclick="saveEdgeProxies()">\u4FDD\u5B58</button>
        <span class="status-text" id="edgeProxiesStatus" style="font-family:var(--mono);font-size:0.75rem"></span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">\u641C\u7D22\u914D\u989D</div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <label class="form-label" style="margin:0">\u53EF\u641C\u7D22\u6E90\u4E0A\u9650</label>
        <input type="number" id="maxSearchableInput" class="nt-input" style="width:80px" min="0" max="1000" value="0">
        <button class="btn btn-sm" id="searchQuotaSaveBtn" onclick="saveSearchQuota()">\u4FDD\u5B58</button>
        <span class="status-text" id="searchQuotaStatus" style="font-family:var(--mono);font-size:0.75rem"></span>
      </div>
      <div style="margin-top:6px;font-size:0.8rem;color:var(--text-secondary)">\u9650\u5236\u53EF\u641C\u7D22\u6E90\u6570\u91CF\uFF0C\u51CF\u5C11 TVBox \u641C\u7D22\u5D29\u6E83\u30020 = \u4E0D\u9650\u5236\u3002\u7F6E\u9876\u6E90\u5728\u641C\u7D22\u9875\u7B7E\u7BA1\u7406\u3002</div>
    </div>

    <div class="section">
      <div class="section-title">\u540D\u79F0\u5B9A\u5236</div>
      <div class="nt-grid">
        <div>
          <label class="form-label">\u524D\u7F00</label>
          <input type="text" id="ntPrefix" class="nt-input" placeholder="\u5982 \u3010RioTV\u3011">
        </div>
        <div>
          <label class="form-label">\u540E\u7F00</label>
          <input type="text" id="ntSuffix" class="nt-input" placeholder="\u5982  \xB7 \u7CBE\u9009">
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn" id="ntSaveBtn" onclick="saveNameTransform()">\u4FDD\u5B58</button>
        <span class="status-text" id="ntStatus" style="font-family:var(--mono);font-size:0.75rem"></span>
      </div>
    </div>
  </div>

  <!-- Logs Tab (Phase 6 VIEWER-03 / Plan 03) -->
  <div class="tab-panel" id="panelLogs">
    <div class="section">
      <div class="section-title">\u5B9E\u65F6\u65E5\u5FD7</div>
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px;flex-wrap:wrap">
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
          <input type="checkbox" id="logAutoScroll" checked>
          <span>\u81EA\u52A8\u6EDA\u52A8</span>
        </label>
        <span class="status-text" id="logConnStatus" style="font-family:var(--mono);font-size:0.75rem">\u672A\u8FDE\u63A5</span>
      </div>
      <div id="logViewer" class="log-viewer"></div>
    </div>
  </div>

  <div class="footer">
    <span>TVBox Auxiliary</span>
  </div>
</div>

<script>
${sharedUi}


// --- Auth ---
const auth = initAuth('loginInput', 'loginError', 'loginOverlay', 'mainContent', '/admin/sources', loadAll);

// --- Tab switching ---
function switchTab(tab) {
  if (tab === 'live' && $('liveDisabledCheck')?.checked) return;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => {
    const id = 'panel' + tab.charAt(0).toUpperCase() + tab.slice(1);
    p.classList.toggle('active', p.id === id);
  });
  // Phase 6 VIEWER-03 (Plan 03): logs tab SSE \u751F\u547D\u5468\u671F\u7BA1\u7406\uFF08D-17\uFF09
  // \u5207\u5230 logs \u65F6\u5EF6\u8FDF\u521D\u59CB\u5316 SSE \u8FDE\u63A5\uFF0C\u5207\u8D70\u65F6\u4E3B\u52A8 abort \u91CA\u653E\uFF08Pitfall 4 \u9632\u6CC4\u6F0F\uFF09
  if (tab === 'logs') startLogStream();
  else if (logSseHandle) stopLogStream();
}

// --- Source health ---
let healthMap = {};

async function loadSourceHealth() {
  try {
    const res = await fetch('/source-status');
    // Plan 03.1 D-11: \u540E\u7AEF\u8FD4\u56DE { records, summary }\uFF0C\u524D\u7AEF\u53EA\u53D6 records
    const { records } = await res.json();
    healthMap = {};
    records.forEach(r => { healthMap[r.url] = r; });
  } catch {
    healthMap = {};
  }
}

// --- Load data ---
async function loadAll() {
  await loadSourceHealth();
  loadSources();
  loadMacCMS();
  loadLives();
  loadNameTransform();
  loadSyncSchedule();
  loadSpeedTest();
  loadSmartJarUrl();
  loadLiveDisabled();
  loadEdgeProxies();
  loadSearchQuota();
  loadChannelProbe();
}

async function loadSources() {
  const list = $('sourceList');
  try {
    const res = await auth.authFetch('/admin/sources');
    const sources = await res.json();
    $('sourceCount').textContent = sources.length;
    $('badgeSources').textContent = sources.length;

    if (sources.length === 0) {
      list.innerHTML = '<div class="empty">' + "\u6682\u65E0\u6E90\u3002\u8BF7\u5728\u4E0A\u65B9\u6DFB\u52A0\u3002" + '</div>';
      return;
    }

    list.innerHTML = sources.map(s => {
      const h = healthMap[s.url];
      // Plan 03.1 D-10: \u540E\u7AEF\u5DF2\u5206\u7C7B\uFF0C\u76F4\u63A5\u4F7F\u7528 h.status
      const level = !h ? 'unknown'
        : h.status === 'ERR' ? 'error'
        : h.status === 'WARN' ? 'warn'
        : 'ok';
      // Plan 03.1 D-12: tooltip \u4F18\u5148\u663E\u793A\u5177\u4F53\u9519\u8BEF\u539F\u56E0\uFF08lastFailReason\uFF09\uFF0C\u65E0\u5219\u663E\u793A\u5206\u7C7B\u6807\u7B7E
      // \u4FEE\u590D\uFF1AOK \u72B6\u6001\u4E0B\u4E0D\u5C55\u793A\u5386\u53F2 lastFailReason\uFF08\u5199\u5165\u5C42\u4F1A\u4FDD\u7559\u4F5C\u4E3A\u5386\u53F2\u6863\u6848\uFF09
      const tip = !h ? "\u6682\u65E0\u6570\u636E"
        : h.status === 'OK' ? h.status
        : (h.lastFailReason || h.status);

      return \`<div class="source-item">
        <span class="source-health-dot \${level}" data-tooltip="\${esc(tip)}"></span>
        <div class="source-info">
          <div class="source-name">\${esc(s.name || 'Unnamed')}\${s.configKey ? ' \u{1F511}' : ''}</div>
          <div class="source-url">\${esc(s.url)}</div>
        </div>
        <div class="source-actions">
          <button class="btn btn-sm btn-danger" onclick="removeSource('\${esc(s.url)}')">\${"\u5220\u9664"}</button>
        </div>
      </div>\`;
    }).join('');
  } catch {
    list.innerHTML = '<div class="empty">' + "\u52A0\u8F7D\u6E90\u5931\u8D25" + '</div>';
  }
}

// --- Add source ---
async function addSource() {
  const url = $('addUrl').value.trim();
  if (!url) { $('addUrl').focus(); return; }
  const name = $('addName').value.trim() || '';
  const configKey = $('addConfigKey').value.trim() || '';

  const btn = $('addBtn');
  btn.textContent = "\u6DFB\u52A0\u4E2D...";
  btn.className = 'btn loading';

  try {
    const payload = { name, url };
    if (configKey) payload.configKey = configKey;
    const res = await auth.authFetch('/admin/sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const d = await res.json();
    if (res.ok) {
      toast("\u6E90\u5DF2\u6DFB\u52A0");
      $('addUrl').value = '';
      $('addName').value = '';
      $('addConfigKey').value = '';
      loadSources();
    } else {
      toast(d.error || "\u52A0\u8F7D\u6E90\u5931\u8D25", 'error');
    }
  } catch {
    toast("\u7F51\u7EDC\u9519\u8BEF", 'error');
  }

  btn.textContent = "\u6DFB\u52A0";
  btn.className = 'btn';
}

// --- Remove source ---
async function removeSource(url) {
  try {
    const res = await auth.authFetch('/admin/sources', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    if (res.ok) {
      toast("\u6E90\u5DF2\u5220\u9664");
      loadSources();
    } else {
      const d = await res.json();
      toast(d.error || "\u5220\u9664", 'error');
    }
  } catch {
    toast("\u7F51\u7EDC\u9519\u8BEF", 'error');
  }
}

// --- MacCMS ---
async function loadMacCMS() {
  const list = $('mcList');
  try {
    const res = await auth.authFetch('/admin/maccms');
    const sources = await res.json();
    $('mcCount').textContent = sources.length;
    $('badgeMacCMS').textContent = sources.length;

    if (sources.length === 0) {
      list.innerHTML = '<div class="empty">' + "\u6682\u65E0 MacCMS \u6E90\u3002\u8BF7\u5728\u4E0A\u65B9\u6DFB\u52A0\u3002" + '</div>';
      return;
    }

    list.innerHTML = sources.map(s => \`
      <div class="source-item">
        <span class="source-tag manual">\${esc(s.key)}</span>
        <div class="source-info">
          <div class="source-name">\${esc(s.name)}</div>
          <div class="source-url">\${esc(s.api)}</div>
        </div>
        <div class="source-actions" style="display:flex;gap:6px">
          <button class="btn btn-sm" onclick="validateMC('\${esc(s.api)}')">\${"\u6D4B\u8BD5"}</button>
          <button class="btn btn-sm btn-danger" onclick="removeMC('\${esc(s.key)}')">\${"\u5220\u9664"}</button>
        </div>
      </div>
    \`).join('');
  } catch {
    list.innerHTML = '<div class="empty">' + "\u52A0\u8F7D MacCMS \u6E90\u5931\u8D25" + '</div>';
  }
}

async function addMacCMS() {
  const key = $('mcKey').value.trim();
  const name = $('mcName').value.trim();
  const api = $('mcApi').value.trim();
  if (!key || !name || !api) { toast("\u6240\u6709\u5B57\u6BB5\u5FC5\u586B", 'error'); return; }

  const btn = $('mcAddBtn');
  btn.textContent = "\u6DFB\u52A0\u4E2D...";
  btn.className = 'btn loading';

  try {
    const res = await auth.authFetch('/admin/maccms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, name, api })
    });
    const d = await res.json();
    if (res.ok) {
      toast('Added ' + (d.added || 1) + ' MacCMS source(s)');
      $('mcKey').value = '';
      $('mcName').value = '';
      $('mcApi').value = '';
      loadMacCMS();
    } else {
      toast(d.error || 'Failed', 'error');
    }
  } catch { toast("\u7F51\u7EDC\u9519\u8BEF", 'error'); }

  btn.textContent = "\u6DFB\u52A0";
  btn.className = 'btn';
}

async function removeMC(key) {
  try {
    const res = await auth.authFetch('/admin/maccms', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    if (res.ok) { toast('Removed'); loadMacCMS(); }
    else { const d = await res.json(); toast(d.error || 'Failed', 'error'); }
  } catch { toast("\u7F51\u7EDC\u9519\u8BEF", 'error'); }
}

async function validateMC(api) {
  toast("\u6D4B\u8BD5\u4E2D...");
  try {
    const res = await auth.authFetch('/admin/maccms/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api })
    });
    const d = await res.json();
    toast(d.valid ? "\u6709\u6548" : "\u65E0\u6548/\u4E0D\u53EF\u8FBE", d.valid ? 'success' : 'error');
  } catch { toast("\u7F51\u7EDC\u9519\u8BEF", 'error'); }
}

async function batchImportMacCMS() {
  const raw = $('mcBatchInput').value.trim();
  if (!raw) return;
  let data;
  try { data = JSON.parse(raw); } catch { toast("\u65E0\u6548\u7684 JSON", 'error'); return; }
  if (!Array.isArray(data)) { toast("\u5FC5\u987B\u662F JSON \u6570\u7EC4", 'error'); return; }

  try {
    const res = await auth.authFetch('/admin/maccms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const d = await res.json();
    if (res.ok) {
      toast('Imported ' + (d.added || 0) + ' source(s)');
      $('mcBatchInput').value = '';
      loadMacCMS();
    } else {
      toast(d.error || "\u5BFC\u5165\u5931\u8D25", 'error');
    }
  } catch { toast("\u7F51\u7EDC\u9519\u8BEF", 'error'); }
}

// --- Live Sources ---
async function loadLives() {
  const list = $('liveList');
  try {
    const res = await auth.authFetch('/admin/lives');
    const entries = await res.json();
    $('liveCount').textContent = entries.length;
    $('badgeLive').textContent = entries.length;

    if (entries.length === 0) {
      list.innerHTML = '<div class="empty">' + "\u6682\u65E0\u76F4\u64AD\u6E90\u3002\u8BF7\u5728\u4E0A\u65B9\u6DFB\u52A0\u3002" + '</div>';
      return;
    }

    list.innerHTML = entries.map(s => \`
      <div class="source-item">
        <span class="source-tag manual">LIVE</span>
        <div class="source-info">
          <div class="source-name">\${esc(s.name || 'Unnamed')}</div>
          <div class="source-url">\${esc(s.url)}</div>
        </div>
        <div class="source-actions">
          <button class="btn btn-sm btn-danger" onclick="removeLive('\${esc(s.url)}')">\${"\u5220\u9664"}</button>
        </div>
      </div>
    \`).join('');
  } catch {
    list.innerHTML = '<div class="empty">' + "\u52A0\u8F7D\u76F4\u64AD\u6E90\u5931\u8D25" + '</div>';
  }
}

async function addLive() {
  const url = $('liveUrl').value.trim();
  if (!url) { $('liveUrl').focus(); return; }
  const name = $('liveName').value.trim() || '';

  const btn = $('liveAddBtn');
  btn.textContent = "\u6DFB\u52A0\u4E2D...";
  btn.className = 'btn loading';

  try {
    const res = await auth.authFetch('/admin/lives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url })
    });
    const d = await res.json();
    if (res.ok) {
      toast("\u76F4\u64AD\u6E90\u5DF2\u6DFB\u52A0");
      $('liveUrl').value = '';
      $('liveName').value = '';
      loadLives();
    } else {
      toast(d.error || 'Failed to add', 'error');
    }
  } catch {
    toast("\u7F51\u7EDC\u9519\u8BEF", 'error');
  }

  btn.textContent = "\u6DFB\u52A0";
  btn.className = 'btn';
}

async function removeLive(url) {
  try {
    const res = await auth.authFetch('/admin/lives', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    if (res.ok) { toast("\u5DF2\u5220\u9664"); loadLives(); }
    else { const d = await res.json(); toast(d.error || 'Failed', 'error'); }
  } catch { toast("\u7F51\u7EDC\u9519\u8BEF", 'error'); }
}

// --- Import Config ---
async function importConfig() {
  const input = $('importInput').value.trim();
  if (!input) { $('importInput').focus(); return; }

  const btn = $('importBtn');
  const result = $('importResult');
  btn.textContent = "\u5BFC\u5165\u4E2D...";
  btn.className = 'btn btn-sm loading';
  result.textContent = '';

  try {
    const res = await auth.authFetch('/admin/sources/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });
    const d = await res.json();
    if (res.ok) {
      const typeLabel = d.type === 'multi' ? "\u68C0\u6D4B\u5230\u591A\u4ED3" : "\u68C0\u6D4B\u5230\u5355\u4ED3";
      result.textContent = typeLabel + ': ' + d.added + ' ' + "\u5DF2\u6DFB\u52A0" + (d.duplicates > 0 ? ', ' + d.duplicates + ' ' + "\u91CD\u590D\u8DF3\u8FC7" : '');
      result.className = 'status-text success';
      if (d.added > 0) {
        $('importInput').value = '';
        loadSources();
      }
    } else {
      result.textContent = d.error || "\u89E3\u6790\u5931\u8D25";
      result.className = 'status-text error';
    }
  } catch {
    result.textContent = "\u7F51\u7EDC\u9519\u8BEF";
    result.className = 'status-text error';
  }

  btn.textContent = "\u5BFC\u5165";
  btn.className = 'btn btn-sm';
}

// --- Name Transform ---
async function loadNameTransform() {
  try {
    const res = await auth.authFetch('/admin/name-transform');
    if (!res.ok) return;
    const d = await res.json();
    $('ntPrefix').value = d.prefix || '';
    $('ntSuffix').value = d.suffix || '';
  } catch {}
}

async function saveNameTransform() {
  const btn = $('ntSaveBtn');
  const status = $('ntStatus');
  btn.textContent = "\u4FDD\u5B58\u4E2D...";
  btn.className = 'btn loading';
  status.textContent = '';

  try {
    const res = await auth.authFetch('/admin/name-transform', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prefix: $('ntPrefix').value || '',
        suffix: $('ntSuffix').value || '',
      })
    });
    const d = await res.json();
    if (res.ok) {
      status.textContent = "\u5DF2\u4FDD\u5B58";
      status.className = 'status-text success';
    } else {
      status.textContent = d.error || "\u4FDD\u5B58\u5931\u8D25";
      status.className = 'status-text error';
    }
  } catch {
    status.textContent = "\u7F51\u7EDC\u9519\u8BEF";
    status.className = 'status-text error';
  }

  btn.textContent = "\u4FDD\u5B58";
  btn.className = 'btn';
  setTimeout(() => { status.textContent = ''; }, 3000);
}

// --- Sync Schedule ---
function onSyncPeriodChange() {
  const period = $('syncPeriod').value;
  $('syncTime').style.display = period === 'disabled' ? 'none' : '';
  $('syncDayOfWeek').style.display = period === 'weekly' ? '' : 'none';
}

async function loadSyncSchedule() {
  try {
    const res = await auth.authFetch('/admin/cron-interval');
    if (!res.ok) return;
    const d = await res.json();
    const s = d.schedule || { period: 'disabled', hour: 5, minute: 0 };
    $('syncPeriod').value = s.period || 'disabled';
    const hh = String(s.hour != null ? s.hour : 5).padStart(2, '0');
    const mm = String(s.minute != null ? s.minute : 0).padStart(2, '0');
    $('syncTime').value = hh + ':' + mm;
    if (s.dayOfWeek !== undefined) $('syncDayOfWeek').value = String(s.dayOfWeek);
    onSyncPeriodChange();
    if (d.hasEnvOverride) {
      $('syncEnvNotice').style.display = '';
      $('syncPeriod').disabled = true;
      $('syncTime').disabled = true;
      $('syncDayOfWeek').disabled = true;
      $('syncSaveBtn').style.display = 'none';
    }
  } catch {}
}

async function saveSyncSchedule() {
  const btn = $('syncSaveBtn');
  const status = $('syncStatus');
  btn.textContent = "\u4FDD\u5B58\u4E2D...";
  btn.className = 'btn btn-sm loading';
  status.textContent = '';

  const period = $('syncPeriod').value;
  const timeVal = $('syncTime').value || '05:00';
  const parts = timeVal.split(':');
  const hh = Number(parts[0]);
  const mm = Number(parts[1]);
  const schedule = {
    period,
    hour: hh,
    minute: mm,
  };
  if (period === 'weekly') {
    schedule.dayOfWeek = parseInt($('syncDayOfWeek').value);
  }

  try {
    const res = await auth.authFetch('/admin/cron-interval', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schedule })
    });
    const d = await res.json();
    if (res.ok) {
      status.textContent = "\u5DF2\u4FDD\u5B58";
      status.className = 'status-text success';
    } else {
      status.textContent = d.error || "\u4FDD\u5B58\u5931\u8D25";
      status.className = 'status-text error';
    }
  } catch {
    status.textContent = "\u7F51\u7EDC\u9519\u8BEF";
    status.className = 'status-text error';
  }

  btn.textContent = "\u4FDD\u5B58";
  btn.className = 'btn btn-sm';
  setTimeout(() => { status.textContent = ''; }, 3000);
}

// --- Speed Test Toggle ---
async function loadSpeedTest() {
  try {
    const res = await auth.authFetch('/admin/speed-test');
    if (res.ok) {
      const d = await res.json();
      $('speedTestCheck').checked = d.enabled;
    }
  } catch {}
}

async function saveSpeedTest() {
  const status = $('speedTestStatus');
  const enabled = $('speedTestCheck').checked;
  status.textContent = '';

  try {
    const res = await auth.authFetch('/admin/speed-test', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled })
    });
    if (res.ok) {
      status.textContent = "\u5DF2\u4FDD\u5B58";
      status.className = 'status-text success';
    } else {
      const d = await res.json();
      status.textContent = d.error || "\u4FDD\u5B58\u5931\u8D25";
      status.className = 'status-text error';
    }
  } catch {
    status.textContent = "\u7F51\u7EDC\u9519\u8BEF";
    status.className = 'status-text error';
  }

  setTimeout(() => { status.textContent = ''; }, 3000);
}

// --- Smart JAR URL Toggle ---
async function loadSmartJarUrl() {
  try {
    const res = await auth.authFetch('/admin/smart-jar-url');
    if (res.ok) {
      const d = await res.json();
      $('smartJarUrlCheck').checked = d.enabled;
    }
  } catch {}
}

async function saveSmartJarUrl() {
  const status = $('smartJarUrlStatus');
  const enabled = $('smartJarUrlCheck').checked;
  status.textContent = '';

  try {
    const res = await auth.authFetch('/admin/smart-jar-url', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled })
    });
    if (res.ok) {
      status.textContent = "\u5DF2\u4FDD\u5B58";
      status.className = 'status-text success';
    } else {
      const d = await res.json();
      status.textContent = d.error || "\u4FDD\u5B58\u5931\u8D25";
      status.className = 'status-text error';
    }
  } catch {
    status.textContent = "\u7F51\u7EDC\u9519\u8BEF";
    status.className = 'status-text error';
  }

  setTimeout(() => { status.textContent = ''; }, 3000);
}

// --- Live Disabled Toggle ---
async function loadLiveDisabled() {
  try {
    const res = await auth.authFetch('/admin/live-disabled');
    if (res.ok) {
      const d = await res.json();
      $('liveDisabledCheck').checked = d.disabled;
      updateLiveTabState(d.disabled);
    }
  } catch {}
}

function updateLiveTabState(disabled) {
  const liveTab = document.querySelector('.tab[data-tab="live"]');
  if (!liveTab) return;
  if (disabled) {
    liveTab.classList.add('disabled');
    if (liveTab.classList.contains('active')) switchTab('sources');
  } else {
    liveTab.classList.remove('disabled');
  }
}

async function saveLiveDisabled() {
  const status = $('liveDisabledStatus');
  const disabled = $('liveDisabledCheck').checked;
  status.textContent = "\u5E94\u7528\u4E2D...";
  status.className = 'status-text';

  try {
    const res = await auth.authFetch('/admin/live-disabled', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ disabled })
    });
    if (res.ok) {
      const d = await res.json();
      status.textContent = disabled ? "\u5DF2\u7981\u7528\u76F4\u64AD" : "\u5DF2\u542F\u7528\u76F4\u64AD";
      status.className = 'status-text success';
      updateLiveTabState(disabled);
    } else {
      const d = await res.json();
      status.textContent = d.error || "\u4FDD\u5B58\u5931\u8D25";
      status.className = 'status-text error';
      $('liveDisabledCheck').checked = !disabled;
    }
  } catch {
    status.textContent = "\u7F51\u7EDC\u9519\u8BEF";
    status.className = 'status-text error';
    $('liveDisabledCheck').checked = !disabled;
  }

  setTimeout(() => { status.textContent = ''; }, 3000);
}

// --- Channel Probe (Node/Docker) ---
async function loadChannelProbe() {
  const box = $('channelProbeStatus');
  try {
    const res = await auth.authFetch('/admin/channel-probe/status');
    if (res.status === 404) {
      $('channelProbeSection').style.display = 'none';
      return;
    }
    if (!res.ok) {
      box.textContent = "\u4EC5 Node/Docker \u652F\u6301\u9891\u9053\u7EA7\u6D4B\u901F";
      return;
    }
    const d = await res.json();
    $('channelProbeCheck').checked = !!d.enabled;
    const s = d.status || {};
    const stateLabel = { idle: "\u7A7A\u95F2", running: "\u8FD0\u884C\u4E2D", done: "\u5DF2\u5B8C\u6210", error: "\u5931\u8D25" }[s.state] || s.state || '-';
    const lines = [];
    lines.push("\u72B6\u6001" + ': ' + stateLabel + (d.running ? ' \u23F3' : ''));
    if (s.totalUrls) {
      lines.push("\u8FDB\u5EA6" + ': ' + (s.probed || 0) + ' / ' + s.totalUrls + ' | ' + "\u8986\u76D6\u7387" + ': ' + (s.coverage || 0) + '% | ' + "\u9891\u9053\u6570" + ': ' + (s.totalChannels || 0));
    }
    if (s.durationMs) {
      lines.push("\u8017\u65F6" + ': ' + (s.durationMs / 1000).toFixed(1) + 's');
    }
    if (s.finishedAt) {
      lines.push("\u5B8C\u6210\u65F6\u95F4" + ': ' + new Date(s.finishedAt).toLocaleString());
    }
    if (s.error) {
      lines.push('\u26A0\uFE0F ' + s.error);
    }
    box.innerHTML = lines.map(l => '<div>' + l.replace(/</g,'&lt;') + '</div>').join('');
  } catch {
    box.textContent = "\u7F51\u7EDC\u9519\u8BEF";
  }
}

async function toggleChannelProbe() {
  const enabled = $('channelProbeCheck').checked;
  try {
    await auth.authFetch('/admin/channel-probe/toggle', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled })
    });
    toast("\u5DF2\u4FDD\u5B58");
    loadChannelProbe();
  } catch {
    toast("\u7F51\u7EDC\u9519\u8BEF", 'error');
  }
}

async function triggerChannelProbe() {
  const btn = $('channelProbeTriggerBtn');
  btn.disabled = true;
  try {
    const res = await auth.authFetch('/admin/channel-probe/trigger', { method: 'POST' });
    const d = await res.json();
    if (res.ok) {
      toast("\u6D4B\u901F\u5DF2\u542F\u52A8");
      setTimeout(loadChannelProbe, 500);
    } else {
      toast(d.error || 'Failed', 'error');
    }
  } catch {
    toast("\u7F51\u7EDC\u9519\u8BEF", 'error');
  } finally {
    btn.disabled = false;
  }
}

// --- Edge Proxies ---
async function loadEdgeProxies() {
  try {
    const res = await auth.authFetch('/admin/edge-proxies');
    if (res.ok) {
      const d = await res.json();
      $('edgeFetchProxyUrl').value = d.fetchProxy || '';
      $('edgeVercelUrl').value = d.vercel || '';
    }
  } catch {}
}

async function saveEdgeProxies() {
  const status = $('edgeProxiesStatus');
  try {
    const res = await auth.authFetch('/admin/edge-proxies', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fetchProxy: $('edgeFetchProxyUrl').value.trim(), vercel: $('edgeVercelUrl').value.trim() })
    });
    if (res.ok) {
      status.textContent = "\u5DF2\u4FDD\u5B58";
      status.className = 'status-text success';
    } else {
      status.textContent = "\u4FDD\u5B58\u5931\u8D25";
      status.className = 'status-text error';
    }
  } catch {
    status.textContent = "\u7F51\u7EDC\u9519\u8BEF";
    status.className = 'status-text error';
  }
  setTimeout(() => { status.textContent = ''; }, 3000);
}


// --- Search Quota ---
let sqPinnedKeys = new Set();

async function loadSearchQuota() {
  try {
    const res = await auth.authFetch('/admin/search-quota');
    if (!res.ok) return;
    const d = await res.json();
    $('maxSearchableInput').value = d.maxSearchable;
    sqPinnedKeys = new Set(d.pinnedKeys || []);
    loadSearchQuotaReport();
  } catch {}
}

async function saveSearchQuota() {
  const status = $('searchQuotaStatus');
  status.textContent = '';
  const data = {
    maxSearchable: parseInt($('maxSearchableInput').value) || 0,
    pinnedKeys: [...sqPinnedKeys],
  };
  try {
    const res = await auth.authFetch('/admin/search-quota', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      status.textContent = "\u5DF2\u4FDD\u5B58";
      status.className = 'status-text success';
    } else {
      status.textContent = "\u4FDD\u5B58\u5931\u8D25";
      status.className = 'status-text error';
    }
  } catch {
    status.textContent = "\u7F51\u7EDC\u9519\u8BEF";
    status.className = 'status-text error';
  }
  setTimeout(() => { status.textContent = ''; }, 3000);
}

async function loadSearchQuotaReport() {
  try {
    const res = await auth.authFetch('/admin/search-quota/report');
    if (!res.ok) return;
    const d = await res.json();
    if (d.searchable == null) return;

    // \u663E\u793A Search \u9875\u7B7E
    $('tabSearchQuota').style.display = '';
    $('sqSelectedInfo').textContent = d.totalSites + ' sites \u2192 ' + d.jsExcluded + ' JS excluded \u2192 ' + d.searchable + ' searchable' + (d.truncated > 0 ? ' (' + d.truncated + ' truncated)' : '') + (d.pinnedCount > 0 ? ', ' + d.pinnedCount + ' pinned' : '');
    $('badgeSearchQuota').textContent = d.searchable;

    // \u52A0\u8F7D\u7AD9\u70B9\u5217\u8868
    const cfgRes = await fetch('/');
    if (!cfgRes.ok) return;
    const cfg = await cfgRes.json();
    const allSites = (cfg.sites || []).filter(s => s.searchable === 1);
    sqAllSites = allSites;
    renderSearchSources();
  } catch {}
}

let sqAllSites = [];

function renderSearchSources() {
  const pinnedArr = [...sqPinnedKeys];
  const siteMap = new Map(sqAllSites.map(s => [s.key, s]));
  let html = '';

  // 1. Pinned \u6E90\uFF08\u6709\u5E8F\uFF0C\u53EF\u6392\u5E8F\uFF09
  if (pinnedArr.length > 0) {
    html += '<div style="margin-bottom:12px"><strong style="color:var(--primary)">' + "\u7F6E\u9876\u6E90" + ' (' + pinnedArr.length + ')</strong>';
    html += ' <span style="font-size:0.75rem;color:var(--text-secondary)">\u2014 ' + "\u4E0A\u4E0B\u79FB\u52A8\u6392\u5E8F\uFF0C\u6392\u5728\u524D\u9762\u7684\u6E90\u5728 TVBox \u641C\u7D22\u65F6\u4F18\u5148\u6267\u884C" + '</span></div>';
    html += '<table style="width:100%;border-collapse:collapse;font-size:0.8rem">';
    pinnedArr.forEach((key, i) => {
      const s = siteMap.get(key);
      const name = s ? (s.name || s.key) : key;
      html += '<tr style="border-bottom:1px solid var(--border);background:var(--bg-hover)">';
      html += '<td style="padding:4px;width:30px;color:var(--text-secondary)">' + (i + 1) + '</td>';
      html += '<td style="padding:4px;font-family:var(--mono);font-size:0.75rem">' + escHtml(key) + '</td>';
      html += '<td style="padding:4px">' + escHtml(name) + '</td>';
      html += '<td style="padding:4px;width:100px;text-align:right;white-space:nowrap">';
      if (i > 0) html += '<button class="btn btn-sm" style="padding:1px 6px;font-size:0.7rem" onclick="movePinned(' + i + ',-1)">\u25B2</button> ';
      if (i < pinnedArr.length - 1) html += '<button class="btn btn-sm" style="padding:1px 6px;font-size:0.7rem" onclick="movePinned(' + i + ',1)">\u25BC</button> ';
      html += '<button class="btn btn-sm" style="padding:1px 6px;font-size:0.7rem;color:var(--red)" onclick="togglePin(&quot;' + escHtml(key) + '&quot;)">' + "\u53D6\u6D88\u7F6E\u9876" + '</button>';
      html += '</td></tr>';
    });
    html += '</table>';
  }

  // 2. \u5176\u4ED6\u6E90\uFF08\u53EF pin\uFF09
  const unpinned = sqAllSites.filter(s => !sqPinnedKeys.has(s.key));
  html += '<div style="margin-top:16px;margin-bottom:8px"><strong>' + "\u5176\u4ED6\u6E90" + ' (' + unpinned.length + ')</strong></div>';
  html += '<table style="width:100%;border-collapse:collapse;font-size:0.8rem">';
  unpinned.slice(0, 200).forEach(s => {
    html += '<tr style="border-bottom:1px solid var(--border)">';
    html += '<td style="padding:4px;font-family:var(--mono);font-size:0.75rem">' + escHtml(s.key) + '</td>';
    html += '<td style="padding:4px">' + escHtml(s.name || s.key) + '</td>';
    html += '<td style="padding:4px;width:50px;text-align:right"><button class="btn btn-sm" style="padding:1px 6px;font-size:0.7rem" onclick="togglePin(&quot;' + escHtml(s.key) + '&quot;)">' + "\u7F6E\u9876" + '</button></td>';
    html += '</tr>';
  });
  if (unpinned.length > 200) html += '<tr><td colspan="3" style="padding:4px;color:var(--text-secondary)">... +' + (unpinned.length - 200) + ' more</td></tr>';
  html += '</table>';

  $('sqSelectedTable').innerHTML = html;
}

async function movePinned(index, direction) {
  const arr = [...sqPinnedKeys];
  const target = index + direction;
  if (target < 0 || target >= arr.length) return;
  [arr[index], arr[target]] = [arr[target], arr[index]];
  try {
    const res = await auth.authFetch('/admin/search-quota/pinned', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keys: arr }),
    });
    if (res.ok) {
      const d = await res.json();
      sqPinnedKeys = new Set(d.pinnedKeys);
      renderSearchSources();
    }
  } catch {}
}

function escHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

async function togglePin(key) {
  const isPinned = sqPinnedKeys.has(key);
  try {
    const res = await auth.authFetch('/admin/search-quota/pinned', {
      method: isPinned ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keys: [key] }),
    });
    if (res.ok) {
      const d = await res.json();
      sqPinnedKeys = new Set(d.pinnedKeys);
      renderSearchSources();
    }
  } catch {}
}

// --- Refresh ---
async function triggerRefresh() {
  const btn = $('refreshBtn');
  btn.textContent = "\u8FD0\u884C\u4E2D...";
  btn.className = 'btn btn-sm loading';

  try {
    const res = await auth.authFetch('/refresh', { method: 'POST' });
    const d = await res.json();
    if (d.success) {
      toast("\u540C\u6B65\u5DF2\u5F00\u59CB");
      setTimeout(() => loadSourceHealth(), 3000);
    } else {
      toast("\u5237\u65B0\u5931\u8D25", 'error');
    }
  } catch {
    toast("\u7F51\u7EDC\u9519\u8BEF", 'error');
  }

  setTimeout(() => {
    btn.textContent = "\u5237\u65B0";
    btn.className = 'btn btn-sm';
  }, 3000);
}

// --- Phase 6 VIEWER-03 (Plan 03): \u5B9E\u65F6\u65E5\u5FD7 SSE \u5BA2\u6237\u7AEF ---
// D-13~D-18 \u9501\u5B9A\u51B3\u7B56\uFF1A\u4E0D\u7EA7\u522B\u8FC7\u6EE4 / DOM 500 / auto-scroll \u5E95\u90E8\u8DDF\u968F / \u6301\u7EED\u5B9E\u65F6\u6D41 / tab \u96C6\u6210 / \u5E03\u5C40
// \u7AEF\u70B9\u8DEF\u5F84 /admin/logs \u4E0E Plan 02 D-09 \u4E00\u81F4\uFF1Btoken \u8D70 Authorization \u5934\uFF08D-11\uFF09
let logSseHandle = null;
const LOG_DOM_MAX = 500;       // D-14: DOM \u6E32\u67D3\u4E0A\u9650

function startLogStream() {
  if (logSseHandle) return; // \u9632\u91CD\u590D\u8FDE\u63A5
  var statusEl = $('logConnStatus');
  statusEl.textContent = '\u8FDE\u63A5\u4E2D...';
  // D-11: streamSse \u7528 fetch + Authorization \u5934\uFF08\u4E0D\u7528 EventSource\uFF0C\u65E0\u6CD5\u8BBE\u5934\uFF09
  logSseHandle = streamSse('/admin/logs', auth.getToken(),
    function(data) { onLogEntry(data); },
    function() { statusEl.textContent = '\u5DF2\u8FDE\u63A5'; },
    function(err) {
      statusEl.textContent = '\u5DF2\u65AD\u5F00';
      logSseHandle = null;
      // \u56FA\u5B9A 3s \u91CD\u8FDE\uFF08\u4EC5\u5F53 logs \u9762\u677F\u4ECD\u6FC0\u6D3B\u2014\u2014\u5207\u8D70\u65F6 stopLogStream \u5DF2\u7F6E logSseHandle=null\uFF09
      setTimeout(function() {
        if ($('panelLogs').classList.contains('active')) startLogStream();
      }, 3000);
    }
  );
}

function stopLogStream() {
  if (logSseHandle) { logSseHandle.abort(); logSseHandle = null; }
  $('logConnStatus').textContent = '\u672A\u8FDE\u63A5';
}

function onLogEntry(data) {
  // T-06-json-parse (V5 Input Validation): \u7578\u5F62 JSON \u9759\u9ED8\u8DF3\u8FC7\u4E0D\u5D29\u6E83
  var entry;
  try { entry = JSON.parse(data); } catch (e) { return; }
  appendLogLine(entry);
}

function appendLogLine(entry) {
  var viewer = $('logViewer');
  // D-15: \u5E95\u90E8\u5224\u5B9A\u9608\u503C 30px\u2014\u2014\u4E0A\u6EDA\u65F6\u4E0D\u62A2\u65AD tail -f
  var wasAtBottom = viewer.scrollHeight - viewer.scrollTop - viewer.clientHeight < 30;
  var line = document.createElement('div');
  // \u590D\u7528 Task 1 .log-line.log-* \u6837\u5F0F\uFF08info/warn/error/security/debug\uFF09
  line.className = 'log-line log-' + entry.level;
  // D-18: \u6BCF\u884C ts level message \u683C\u5F0F\uFF08scope \u5DF2\u9690\u542B\u5728 message \u5185\u6216\u53EF\u540E\u7EED\u8FFD\u52A0\uFF09
  line.textContent = entry.ts + ' ' + entry.level.toUpperCase().padEnd(8) + ' ' + entry.message;
  viewer.appendChild(line);
  // D-14: DOM \u4E0A\u9650 500\uFF0C\u8D85\u9650\u4E22\u6700\u65E7
  while (viewer.children.length > LOG_DOM_MAX) {
    viewer.removeChild(viewer.firstChild);
  }
  // D-15: \u4EC5\u5F53\u5DF2\u5728\u5E95\u90E8\u4E14 auto-scroll \u5F00\u542F\u65F6\u8DDF\u968F
  if (wasAtBottom && $('logAutoScroll').checked) {
    viewer.scrollTop = viewer.scrollHeight;
  }
}


applyTheme(getTheme());
</script>
</body>
</html>`;

// src/core/dashboard.ts
var dashboardHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TVBox Auxiliary</title>
<style>
${sharedStyles}

/* Dashboard-specific */
.header{margin-bottom:28px}

.stats-grid{
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:16px;
  margin-bottom:20px;
}

@media(max-width:560px){
  .stats-grid{grid-template-columns:1fr}
}

.stat-card{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:24px;
  position:relative;
  overflow:hidden;
  transition:border-color 0.3s, transform 0.2s;
  animation:fadeSlideUp 0.5s ease-out both;
}

.stat-card:nth-child(1){animation-delay:0.15s}
.stat-card:nth-child(2){animation-delay:0.2s}
.stat-card:nth-child(3){animation-delay:0.25s}
.stat-card:nth-child(4){animation-delay:0.3s}

.stat-card:hover{
  border-color:var(--border-glow);
  transform:translateY(-2px);
}

.stat-card::before{
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:1px;
  background:linear-gradient(90deg, transparent, var(--green-dim), transparent);
}

.stat-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
  margin-bottom:12px;
  display:flex;
  align-items:center;
  gap:6px;
}

.stat-icon{
  width:14px;height:14px;
  opacity:0.5;
}

.stat-value{
  font-family:var(--mono);
  font-size:2.2rem;
  font-weight:700;
  color:var(--text-bright);
  line-height:1;
  letter-spacing:-0.02em;
}

.stat-value .unit{
  font-size:0.8rem;
  font-weight:400;
  color:var(--text-dim);
  margin-left:4px;
}

.stat-card.highlight .stat-value{
  color:var(--green);
  text-shadow:0 0 20px var(--green-dim);
}

/* Update time section */
.update-section{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:20px 24px;
  margin-bottom:20px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  animation:fadeSlideUp 0.5s ease-out both;
}

@media(max-width:560px){
  .update-section{flex-direction:column;align-items:flex-start}
}

.update-info{
  display:flex;flex-direction:column;gap:4px;
}

/* 04-UI: \u628A\u5BFC\u51FA/\u805A\u5408\u4E24\u4E2A\u52A8\u4F5C\u6309\u94AE\u6536\u8FDB\u540C\u4E00\u7EC4\uFF0C\u907F\u514D space-between \u628A\u5355\u4E2A\u6309\u94AE\u6324\u5230\u5BB9\u5668\u4E2D\u5FC3 */
.update-actions{
  display:flex;
  align-items:center;
  gap:10px;
}

.update-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
}

.update-time{
  font-family:var(--mono);
  font-size:0.95rem;
  color:var(--text-bright);
  font-weight:500;
}

.update-time.stale{color:var(--amber)}
.update-time.never{color:var(--red)}

/* Source Health Section */
.health-section{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:20px 24px;
  margin-bottom:20px;
  animation:fadeSlideUp 0.5s ease-out 0.37s both;
}

.health-summary{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  margin-bottom:8px;
}

.health-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
}

.health-counts{
  display:flex;
  gap:16px;
  font-family:var(--mono);
  font-size:0.75rem;
}

.health-count{
  display:flex;
  align-items:center;
  gap:4px;
}

.health-count.ok{color:var(--green)}
.health-count.warn{color:var(--amber)}
.health-count.error{color:var(--red)}

.health-dot{
  width:6px;height:6px;
  border-radius:50%;
  display:inline-block;
}

.health-dot.ok{background:var(--green);box-shadow:0 0 6px var(--green-glow)}
.health-dot.warn{background:var(--amber);box-shadow:0 0 6px var(--amber-dim)}
.health-dot.error{background:var(--red);box-shadow:0 0 6px var(--red-dim)}

.health-table-wrap{
  overflow-x:auto;
  margin-top:12px;
}

.health-table{
  width:100%;
  border-collapse:collapse;
  font-family:var(--mono);
  font-size:0.7rem;
}

.health-table th{
  text-align:left;
  padding:8px 10px;
  font-size:0.6rem;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:var(--text-dim);
  border-bottom:1px solid var(--border);
  white-space:nowrap;
}

.health-table td{
  padding:8px 10px;
  border-bottom:1px solid var(--border);
  color:var(--text);
  white-space:nowrap;
}

.health-table tr:last-child td{border-bottom:none}

.health-table .url-cell{
  max-width:200px;
  overflow:hidden;
  text-overflow:ellipsis;
  color:var(--text-dim);
}

.health-table .status-ok{color:var(--green)}
.health-table .status-warn{color:var(--amber)}
.health-table .status-error{color:var(--red)}

.health-table tr.row-error td{background:var(--red-dim)}
.health-table tr.row-warn td{background:var(--amber-dim)}

@media(max-width:560px){
  .health-summary{flex-direction:column;align-items:flex-start}
  .health-table{font-size:0.6rem}
  .health-table .url-cell{max-width:120px}
}

/* Config URL section */

.config-section{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:20px 24px;
  margin-bottom:20px;
  animation:fadeSlideUp 0.5s ease-out 0.1s both;
}

.config-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
  margin-bottom:10px;
}

.config-url-row{
  display:flex;
  align-items:center;
  gap:10px;
}

.config-url{
  flex:1;
  font-family:var(--mono);
  font-size:0.8rem;
  color:var(--green);
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  padding:10px 14px;
  overflow-x:auto;
  white-space:nowrap;
  user-select:all;
}

.copy-btn{
  font-family:var(--mono);
  font-size:0.7rem;
  font-weight:500;
  letter-spacing:0.08em;
  text-transform:uppercase;
  padding:10px 16px;
  background:var(--surface-2);
  border:1px solid var(--border);
  color:var(--text-dim);
  border-radius:4px;
  cursor:pointer;
  transition:all 0.2s;
  white-space:nowrap;
}

.copy-btn:hover{
  border-color:var(--text-dim);
  color:var(--text);
}

.copy-btn.copied{
  color:var(--green);
  border-color:var(--green);
}

.footer{margin-top:48px;padding-top:24px}
</style>
<script>(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t)})()</script>
</head>
<body>

<!-- Login -->
<div class="login-overlay" id="loginOverlay">
  <div class="login-box">
    <h2>\u7BA1\u7406\u767B\u5F55</h2>
    <p>TVBox Auxiliary \u9996\u9875</p>
    <div class="error-msg" id="loginError">\u65E0\u6548\u7684\u4EE4\u724C</div>
    <input type="password" id="loginInput" placeholder="\u8BF7\u8F93\u5165\u7BA1\u7406\u4EE4\u724C" autocomplete="off">
    <button class="btn" style="width:100%" onclick="auth.doLogin()">\u767B\u5F55</button>
  </div>
</div>

<!-- Main content -->
<div class="container" id="mainContent" style="display:none">
  <header class="header">
    <div class="header-top">
      <div class="header-label">\u7CFB\u7EDF\u76D1\u63A7</div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()">\u{1F319}</button>
        </div>
    </div>
    <h1 class="header-title">TVBox <span>Auxiliary</span></h1>
    <nav class="header-nav">
      <a href="/status" class="active">\u9996\u9875</a>
      <a href="/admin">\u63A5\u53E3\u7BA1\u7406</a>
      <a href="/admin/config-editor">\u914D\u7F6E\u7F16\u8F91</a>
    </nav>
  </header>

  <div id="warningBanner"></div>

  <div class="update-section">
    <div class="update-info">
      <div class="update-label">\u6700\u540E\u805A\u5408\u65F6\u95F4</div>
      <div class="update-time" id="updateTime"><span class="skeleton">&nbsp;Loading...&nbsp;</span></div>
    </div>
    <div class="update-actions">
      <button class="btn btn-sm" id="exportBtn" onclick="triggerExport()">\u5BFC\u51FA\u914D\u7F6E</button>
      <button class="btn btn-sm" id="refreshBtn" onclick="triggerRefresh()">\u7ACB\u5373\u805A\u5408</button>
    </div>
  </div>

  <div class="config-section">
    <div class="config-label">\u63A5\u53E3\u5730\u5740</div>
    <div class="config-url-row">
      <div class="config-url" id="configUrl"></div>
      <button class="copy-btn" id="copyBtn" onclick="copyUrl('configUrl')">\u590D\u5236</button>
    </div>
    <div style="margin-top:12px">
      <div class="config-label">\u76F4\u64AD\u63A5\u53E3\u5730\u5740</div>
      <div class="config-url-row">
        <div class="config-url" id="liveConfigUrl"></div>
        <button class="copy-btn" id="copyLiveBtn" onclick="copyUrl('liveConfigUrl')">\u590D\u5236</button>
      </div>
    </div>
  </div>

  <div class="stats-grid">
    <div class="stat-card highlight">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        <span>\u70B9\u64AD\u6E90</span>
      </div>
      <div class="stat-value" id="statSites"><span class="skeleton">&nbsp;000&nbsp;</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        <span>\u76F4\u64AD\u6E90</span>
      </div>
      <div class="stat-value" id="statLives"><span class="skeleton">&nbsp;00&nbsp;</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        <span>\u89E3\u6790\u5668</span>
      </div>
      <div class="stat-value" id="statParses"><span class="skeleton">&nbsp;00&nbsp;</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
        <span>\u63A5\u53E3\u6570</span>
      </div>
      <div class="stat-value" id="statSources"><span class="skeleton">&nbsp;00&nbsp;</span></div>
    </div>
  </div>

  <div class="health-section">
    <div class="health-summary">
      <div class="health-label">\u63A5\u53E3\u5065\u5EB7\u72B6\u6001</div>
      <div class="health-counts">
        <span class="health-count ok"><span class="health-dot ok"></span> <span id="healthOk">-</span> OK</span>
        <span class="health-count warn"><span class="health-dot warn"></span> <span id="healthWarn">-</span> WARN</span>
        <span class="health-count error"><span class="health-dot error"></span> <span id="healthError">-</span> ERR</span>
      </div>
    </div>
    <div class="collapsible-toggle" id="healthToggle" onclick="toggleCollapsible(this)">\u8BE6\u60C5</div>
    <div class="collapsible-body" id="healthBody">
      <div class="health-table-wrap">
        <table class="health-table">
          <thead>
            <tr>
              <th></th>
              <th>\u540D\u79F0</th>
              <th>URL</th>
              <th>\u72B6\u6001</th>
              <th>\u5931\u8D25</th>
              <th>\u6700\u540E\u6210\u529F</th>
            </tr>
          </thead>
          <tbody id="healthTableBody">
            <tr><td colspan="6" class="empty">Loading...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="health-section" id="searchQuotaSection" style="display:none">
    <div class="health-summary">
      <div class="health-label">\u641C\u7D22\u914D\u989D</div>
      <div class="health-counts">
        <span class="health-count ok"><span class="health-dot ok"></span> <span id="sqActiveCount">-</span> <span>\u6D3B\u8DC3</span></span>
        <span class="health-count error"><span class="health-dot error"></span> <span id="sqExcludedCount">-</span> <span>\u6392\u9664</span></span>
      </div>
    </div>
    <div class="collapsible-toggle" id="sqToggle" onclick="toggleCollapsible(this)">\u8BE6\u60C5</div>
    <div class="collapsible-body" id="sqBody">
      <div class="health-table-wrap">
        <table class="health-table">
          <thead>
            <tr>
              <th>#</th>
              <th>\u540D\u79F0</th>
              <th>\u6765\u6E90</th>
              <th>\u539F\u56E0</th>
            </tr>
          </thead>
          <tbody id="sqTableBody">
            <tr><td colspan="4" class="empty">Loading...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="footer">
    <span>TVBox Auxiliary</span>
  </div>
</div>

<script>
${sharedUi}

const auth = initAuth('loginInput', 'loginError', 'loginOverlay', 'mainContent', '/admin/sources', function() {
  const configUrl = location.origin + '/';
  $('configUrl').textContent = configUrl;
  $('liveConfigUrl').textContent = location.origin + '/live-config';
  loadStatus();
  loadSourceHealth();
  loadSearchQuotaSummary();
  setInterval(loadStatus, 60000);
  setInterval(loadSourceHealth, 60000);
});

// CR-03: 60s loadStatus interval fired toast() every cycle on steady-state warnings
// (syncSuccess===false or syncFailedDownloads>0). Track last-shown signature so
// the toast only fires when the underlying state changes, not on every poll.
let lastSyncWarnKey = null;

async function loadStatus() {
  try {
    const res = await auth.authFetch('/status-data');
    const d = await res.json();

    // D-08: \u540C\u6B65\u8FDB\u884C\u65F6\u7981\u7528\u5BFC\u51FA\u6309\u94AE\uFF08\u4EC5\u7BA1\u7406\u5458\u4F1A\u8BDD\u80FD\u770B\u5230 syncRunning \u5B57\u6BB5\uFF1B
    // \u975E\u7BA1\u7406\u5458\u4F1A\u8BDD auth.authFetch \u9000\u5316\u4E3A\u666E\u901A fetch\uFF0Cd.syncRunning \u4E3A undefined\uFF0C
    // \u6309\u94AE\u4FDD\u6301\u53EF\u70B9\u51FB \u2014 \u540E\u7AEF 409 \u662F\u771F\u6B63\u7684\u4FDD\u62A4\uFF09
    const exportBtn = $('exportBtn');
    if (exportBtn) exportBtn.disabled = !!d.syncRunning;

    $('statSites').textContent = d.sites ?? '\u2014';
    $('statLives').textContent = d.lives ?? '\u2014';
    $('statParses').textContent = d.parses ?? '\u2014';
    $('statSources').textContent = d.sourceCount ?? '\u2014';

    const time = $('updateTime');

    if (d.lastUpdate && d.lastUpdate !== 'never') {
      const date = new Date(d.lastUpdate);
      const now = new Date();
      const diffH = (now - date) / 3.6e6;
      const fmt = date.toLocaleString('zh-CN', {
        year:'numeric', month:'2-digit', day:'2-digit',
        hour:'2-digit', minute:'2-digit', second:'2-digit',
        hour12: false
      });

      time.textContent = fmt;
      time.className = 'update-time' + (diffH > 26 ? ' stale' : '');
    } else {
      time.textContent = "\u4ECE\u672A\u66F4\u65B0";
      time.className = 'update-time never';
    }

    // Render warnings
    const banner = $('warningBanner');
    const warnings = d.warnings || [];
    if (d.dirtyMarker) {
      warnings.unshift('dirty_marker');
    }
    if (warnings.length > 0) {
      const WARN_MESSAGES = {
        docker_no_base_url: '\u68C0\u6D4B\u5230 Docker \u73AF\u5883\u4F46\u672A\u914D\u7F6E BASE_URL\uFF0CJAR \u4EE3\u7406\u5730\u5740\u53EF\u80FD\u4E0D\u53EF\u8FBE\u3002<br>\u8BF7\u5728 docker-compose.yml \u4E2D\u8BBE\u7F6E <b>BASE_URL=http://\u5BBF\u4E3B\u673AIP:\u7AEF\u53E3</b>',
        dirty_marker: '\u23F8 \u914D\u7F6E\u6709\u672A\u5E94\u7528\u7684\u66F4\u6539\uFF0C\u4E0B\u6B21\u805A\u5408\u65F6\u5C06\u81EA\u52A8\u6E05\u9664\u5E76\u91CD\u65B0\u805A\u5408',
      };
      banner.innerHTML = warnings.map(w => '<div class="warning-banner">' + (WARN_MESSAGES[w] || '\u26A0 ' + w) + '</div>').join('');
    } else {
      banner.innerHTML = '';
    }

    // \u540C\u6B65\u5931\u8D25\u6216\u90E8\u5206\u5931\u8D25\u65F6\u5F39 toast \u901A\u77E5
    // CR-03: \u4EC5\u5F53\u544A\u8B66\u7B7E\u540D\uFF08\u72B6\u6001+\u8BA1\u6570+lastUpdate\uFF09\u53D8\u5316\u65F6\u624D\u5F39 toast\uFF0C\u907F\u514D\u6BCF\u5206\u949F\u91CD\u590D
    if (d.syncSuccess === false) {
      const key = 'fail:' + d.lastUpdate;
      if (key !== lastSyncWarnKey) {
        toast("\u4E0A\u6B21\u540C\u6B65\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u65E5\u5FD7", 'error');
        lastSyncWarnKey = key;
      }
    } else if (d.syncFailedDownloads > 0) {
      const key = 'downloads:' + d.syncFailedDownloads + ':' + d.lastUpdate;
      if (key !== lastSyncWarnKey) {
        toast(d.syncFailedDownloads + " \u4E2A\u8D44\u6E90\u4E0B\u8F7D\u5931\u8D25", 'warn');
        lastSyncWarnKey = key;
      }
    } else {
      lastSyncWarnKey = null;
    }
  } catch (e) {
    // WR-09: loadStatus is called every 60s via setInterval \u2014 a silently swallowed
    // error gives operators no signal beyond the displayed "\u83B7\u53D6\u72B6\u6001\u5931\u8D25" text.
    // Log the actual error so the browser console has a diagnostic trail.
    console.warn('loadStatus failed:', e instanceof Error ? e.message : String(e));
    $('updateTime').textContent = "\u83B7\u53D6\u72B6\u6001\u5931\u8D25";
    $('updateTime').className = 'update-time never';
  }
}


function copyUrl(elementId) {
  const text = $(elementId).textContent;
  const btn = $(elementId).parentElement.querySelector('.copy-btn');
  function onOk() {
    btn.textContent = "\u5DF2\u590D\u5236!";
    btn.className = 'copy-btn copied';
    setTimeout(() => { btn.textContent = "\u590D\u5236"; btn.className = 'copy-btn'; }, 2000);
  }
  function onFail() {
    btn.textContent = "\u5931\u8D25";
    btn.className = 'copy-btn error';
    setTimeout(() => { btn.textContent = "\u590D\u5236"; btn.className = 'copy-btn'; }, 2000);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onOk).catch(() => {
      fallbackCopy(text) ? onOk() : onFail();
    });
  } else {
    fallbackCopy(text) ? onOk() : onFail();
  }
}
function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;left:-9999px';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch {}
  document.body.removeChild(ta);
  return ok;
}

async function loadSearchQuotaSummary() {
  try {
    const res = await fetch('/search-quota/summary');
    if (!res.ok) return;
    const d = await res.json();
    if (!d.enabled) {
      $('searchQuotaSection').style.display = 'none';
      return;
    }
    $('searchQuotaSection').style.display = '';
    $('sqActiveCount').textContent = d.searchable || 0;
    $('sqExcludedCount').textContent = (d.jsExcluded || 0) + (d.truncated || 0);

    const tbody = $('sqTableBody');
    let html = '';
    html += '<tr><td>Total</td><td colspan="3">' + (d.totalSites || '-') + ' sites</td></tr>';
    html += '<tr><td>JS excluded</td><td colspan="3">' + (d.jsExcluded || 0) + '</td></tr>';
    html += '<tr><td>Pinned</td><td colspan="3">' + (d.pinnedCount || 0) + '</td></tr>';
    if (d.truncated > 0) html += '<tr><td>Truncated</td><td colspan="3">' + d.truncated + '</td></tr>';
    html += '<tr style="font-weight:600"><td>Searchable</td><td colspan="3">' + (d.searchable || 0) + '</td></tr>';
    tbody.innerHTML = html;
  } catch {}
}
function escDash(s) { const d = document.createElement('div'); d.textContent = s || '-'; return d.innerHTML; }

async function loadSourceHealth() {
  try {
    const res = await fetch('/source-status');
    // Plan 03.1 D-11: \u540E\u7AEF\u8FD4\u56DE { records, summary }\uFF0C\u524D\u7AEF\u4E0D\u518D\u81EA\u884C\u5206\u7C7B
    const { records, summary } = await res.json();

    $('healthOk').textContent = summary.ok;
    $('healthWarn').textContent = summary.warn;
    $('healthError').textContent = summary.err;

    records.sort((a, b) => b.consecutiveFailures - a.consecutiveFailures);
    renderHealthTable(records);

    // \u667A\u80FD\u6298\u53E0\uFF1A\u6709 error \u7EA7\u522B\u65F6\u81EA\u52A8\u5C55\u5F00
    const toggle = $('healthToggle');
    const body = $('healthBody');
    if (summary.err > 0 && !toggle.classList.contains('open')) {
      toggle.classList.add('open');
      body.classList.add('open');
    }
  } catch (e) {
    console.warn('loadSourceHealth failed:', e instanceof Error ? e.message : String(e));
    $('healthTableBody').innerHTML =
      '<tr><td colspan="6" class="empty">' + "\u83B7\u53D6\u72B6\u6001\u5931\u8D25" + '</td></tr>';
  }
}

function renderHealthTable(records) {
  if (!records.length) {
    $('healthTableBody').innerHTML =
      '<tr><td colspan="6" class="empty">' + "\u6682\u65E0\u5065\u5EB7\u6570\u636E" + '</td></tr>';
    return;
  }

  $('healthTableBody').innerHTML = records.map(r => {
    // Plan 03.1 D-10: \u540E\u7AEF\u5DF2\u5206\u7C7B\uFF0C\u524D\u7AEF\u76F4\u63A5\u4F7F\u7528 r.status
    const level = r.status === 'ERR' ? 'error'
               : r.status === 'WARN' ? 'warn' : 'ok';
    // Plan 03.1 D-12: \u6807\u7B7E\u5355\u5143\u683C\u60AC\u6D6E\u663E\u793A\u5177\u4F53\u9519\u8BEF\uFF08lastFailReason\uFF09
    // \u6807\u7B7E\u4F18\u5148\u4F7F\u7528\u540E\u7AEF\u8FD4\u56DE\u7684 label\uFF0C\u5426\u5219\u6309 fetchStatus \u6620\u5C04
    const statusLabel = r.label
      || (r.status === 'OK' ? 'OK' : (r.fetchStatus ? labelFor(r.fetchStatus) : r.status || 'ERR'));

    const lastOk = r.lastSuccessTime
      ? new Date(r.lastSuccessTime).toLocaleString('zh-CN', {
          month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hour12:false
        })
      : "--";

    return '<tr class="row-' + level + '">' +
      '<td><span class="health-dot ' + level + '"></span></td>' +
      '<td>' + esc(r.name || 'Unnamed') + '</td>' +
      '<td class="url-cell" title="' + esc(r.url) + '">' + esc(r.url) + '</td>' +
      '<td class="status-' + level + '"' +
        (r.status === 'OK' ? '' : ' title="' + esc(r.lastFailReason || '') + '"') +
        '>' + statusLabel + '</td>' +
      '<td>' + r.consecutiveFailures + '</td>' +
      '<td>' + lastOk + '</td>' +
    '</tr>';
  }).join('');
}

// Plan 03.1 D-06: \u4FDD\u7559\u6781\u7B80 fetchStatus \u2192 \u6807\u7B7E\u7684\u672C\u5730\u515C\u5E95\u6620\u5C04\uFF08\u4EC5\u5728 API \u672A\u8FD4\u56DE label \u65F6\u4F7F\u7528\uFF09
function labelFor(fetchStatus) {
  if (fetchStatus === 'ok') return 'OK';
  if (fetchStatus === 'timeout') return 'TIMEOUT';
  if (fetchStatus === 'decode_error') return 'DECODE ERR';
  if (fetchStatus === 'parse_error') return 'PARSE ERR';
  if (typeof fetchStatus === 'string') {
    if (fetchStatus.indexOf('http') === 0) return 'HTTP ERR';
    if (fetchStatus === 'network_error' || fetchStatus === 'dns_error' || fetchStatus === 'conn_refused'
      || fetchStatus === 'conn_reset' || fetchStatus === 'tls_error'
      || fetchStatus === 'host_unreachable' || fetchStatus === 'net_unreachable'
      || fetchStatus === 'fetch_failed') return 'NET ERR';
  }
  return fetchStatus || 'ERR';
}

async function triggerExport() {
  const btn = $('exportBtn');
  btn.disabled = true;
  btn.textContent = "\u5BFC\u51FA\u4E2D...";
  try {
    // D-10: auth.authFetch \u5E26 Bearer Token
    const res = await auth.authFetch('/admin/export-config');
    // D-11: \u540C\u6B65\u4E2D\u62D2\u7EDD\u5BFC\u51FA
    if (res.status === 409) {
      toast("\u540C\u6B65\u8FDB\u884C\u4E2D\uFF0C\u8BF7\u7A0D\u540E", 'error');
      return;
    }
    // D-12: \u6CA1\u6709\u53EF\u7528\u5FEB\u7167
    if (res.status === 503) {
      toast("\u8BF7\u5148\u540C\u6B65", 'error');
      return;
    }
    // 401/500/\u5176\u4ED6\u9519\u8BEF
    if (!res.ok) {
      toast("\u5BFC\u51FA\u5931\u8D25", 'error');
      return;
    }
    // D-09: \u6D4F\u89C8\u5668\u4E0B\u8F7D attachment \u2014 \u4ECE Content-Disposition \u53D6\u6587\u4EF6\u540D\uFF0C\u56DE\u9000\u7528\u9ED8\u8BA4\u540D
    const blob = await res.blob();
    const cd = res.headers.get('Content-Disposition') || '';
    const match = cd.match(/filename="?(.+?)"?$/);
    const filename = match ? match[1] : 'tvbox-config.json';
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast("\u5BFC\u51FA\u6210\u529F");
  } catch {
    toast("\u7F51\u7EDC\u9519\u8BEF", 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = "\u5BFC\u51FA\u914D\u7F6E";
  }
}

async function triggerRefresh() {
  const btn = $('refreshBtn');
  btn.textContent = "\u8FD0\u884C\u4E2D...";
  btn.className = 'btn btn-sm loading';
  // 04-06: \u540C\u6B65\u89E6\u53D1\u671F\u95F4\u7981\u7528\u5BFC\u51FA\u6309\u94AE\uFF08\u524D\u7AEF\u65F6\u5E8F\u7ADE\u6001\u4FEE\u590D\uFF09
  // /refresh \u963B\u585E\u5230\u540C\u6B65\u5B8C\u6210\u624D\u8FD4\u56DE\uFF0Cawait \u524D\u540C\u6B65\u7981\u7528\uFF0Cfinally \u6062\u590D
  const exportBtn = $('exportBtn');
  if (exportBtn) exportBtn.disabled = true;
  try {
    const res = await auth.authFetch('/refresh', { method: 'POST' });
    const d = await res.json();
    if (d.success) {
      toast("\u540C\u6B65\u5DF2\u5F00\u59CB");
      setTimeout(loadStatus, 3000);
    } else {
      toast("\u5237\u65B0\u5931\u8D25", 'error');
    }
  } catch {
    toast("\u7F51\u7EDC\u9519\u8BEF", 'error');
  } finally {
    if (exportBtn) exportBtn.disabled = false;
  }
  setTimeout(() => {
    btn.textContent = "\u7ACB\u5373\u805A\u5408";
    btn.className = 'btn btn-sm';
  }, 3000);
}

applyTheme(getTheme());
</script>
</body>
</html>`;

// src/core/config-editor.ts
var configEditorHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TVBox Auxiliary - Config Editor</title>
<style>
${sharedStyles}

/* Config Editor specific */

/* Item row */
.item{
  display:flex;
  align-items:center;
  gap:10px;
  padding:10px 16px;
  border-bottom:1px solid var(--border);
  transition:background 0.15s;
  font-family:var(--mono);
  font-size:0.75rem;
}

.item[data-id]{cursor:pointer}
.item:last-child{border-bottom:none}
.item:hover{background:var(--surface-2)}

.item.blocked{opacity:0.4}

.item-name{
  min-width:0;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  color:var(--text-bright);
  font-weight:500;
}

.item.blocked .item-name{
  text-decoration:line-through;
  color:var(--text-dim);
}

.item-type{
  position:relative;
  font-size:0.6rem;
  padding:2px 8px;
  border-radius:4px;
  font-weight:600;
  letter-spacing:0.05em;
  text-transform:uppercase;
  cursor:help;
  white-space:nowrap;
}

.item-type.t0{background:var(--blue-dim);color:var(--blue)}
.item-type.t1{background:var(--green-dim);color:var(--green)}
.item-type.t3{background:var(--amber-dim);color:var(--amber)}
.item-type.t4{background:var(--red-dim);color:var(--red)}
.item-type.terr{background:var(--red-dim);color:var(--red);border:1px solid var(--red)}

/* Tooltip */
.tooltip{
  position:absolute;
  bottom:calc(100% + 8px);
  left:50%;
  transform:translateX(-50%);
  background:var(--surface);
  border:1px solid var(--border-glow);
  border-radius:6px;
  padding:8px 12px;
  font-family:var(--sans);
  font-size:0.75rem;
  font-weight:400;
  color:var(--text);
  white-space:nowrap;
  pointer-events:none;
  opacity:0;
  transition:opacity 0.15s;
  z-index:100;
  text-transform:none;
  letter-spacing:0;
  box-shadow:0 4px 12px rgba(0,0,0,0.3);
}

.tooltip::after{
  content:'';
  position:absolute;
  top:100%;
  left:50%;
  transform:translateX(-50%);
  border:5px solid transparent;
  border-top-color:var(--border-glow);
}

.item-type:hover .tooltip{opacity:1}

.item-api{
  max-width:200px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  color:var(--text-dim);
  font-size:0.65rem;
  cursor:default;
}

.item-actions{
  display:flex;
  gap:6px;
  flex-shrink:0;
  cursor:default;
}

/* Flat list (for parses / lives) */
.flat-list{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  overflow:visible;
}

/* Stats bar */
.stats{
  display:flex;
  gap:16px;
  margin-bottom:20px;
  font-family:var(--mono);
  font-size:0.7rem;
  color:var(--text-dim);
}

.stats .stat{
  display:flex;
  align-items:center;
  gap:4px;
}

.stats .num{
  color:var(--green);
  font-weight:600;
}

.stats .blocked-num{
  color:var(--red);
  font-weight:600;
}

/* Loading */
.loading-msg{
  text-align:center;
  padding:60px 20px;
  font-family:var(--mono);
  font-size:0.8rem;
  color:var(--text-dim);
}

/* Checkbox */
.item-check{
  width:14px;
  height:14px;
  accent-color:var(--green);
  cursor:pointer;
  flex-shrink:0;
}

.item-label{display:flex;align-items:center;gap:10px;flex:1;min-width:0;cursor:pointer}

/* Batch bar */
.batch-bar{
  position:fixed;
  bottom:24px;
  left:50%;
  transform:translateX(-50%);
  background:var(--surface);
  border:1px solid var(--green-dim);
  border-radius:8px;
  padding:10px 20px;
  display:flex;
  align-items:center;
  gap:12px;
  font-family:var(--mono);
  font-size:0.75rem;
  color:var(--text);
  box-shadow:0 4px 16px rgba(0,0,0,0.4);
  z-index:50;
}
.batch-count{color:var(--green);font-weight:600}

/* Apply Changes button (Phase 14: instant apply) */
.apply-bar{
  position:fixed;
  bottom:24px;
  left:50%;
  transform:translateX(-50%);
  background:var(--surface);
  border:1px solid var(--green-dim);
  border-radius:8px;
  padding:10px 16px;
  display:none; /* \u9ED8\u8BA4\u9690\u85CF\uFF1Bdirty \u65F6\u8BBE\u7F6E\u4E3A flex */
  align-items:center;
  gap:10px;
  font-family:var(--mono);
  font-size:0.75rem;
  color:var(--text);
  box-shadow:0 4px 16px rgba(0,0,0,0.4);
  z-index:50;
}
.apply-bar.dirty{display:flex}
.batch-bar.with-apply{bottom:80px}

/* 14-08: Leave confirmation modal (replaces unstyled beforeunload for in-page navigation) */
.leave-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:1000;display:none;align-items:center;justify-content:center}
.leave-modal-overlay.open{display:flex}
.leave-modal-box{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:24px;width:420px;max-width:90vw;box-shadow:0 8px 32px rgba(0,0,0,0.5);font-family:var(--sans)}
.leave-modal-title{font-size:1.05rem;font-weight:700;color:var(--text-bright);margin-bottom:12px}
.leave-modal-body{font-size:0.85rem;color:var(--text);line-height:1.6;margin-bottom:20px}
.leave-modal-actions{display:flex;justify-content:flex-end;gap:10px}

/* Sync-in-progress: disable regex toggle (D-16) */
.regex-toggle-bar.syncing{color:var(--text-dim);pointer-events:none;cursor:not-allowed}
.regex-toggle-bar.syncing .regex-toggle-arrow{color:var(--text-dim)}

/* Sync overlay on flat-list (D-16) */
.flat-list{position:relative}
.flat-list.syncing::before{
  content:'';
  position:absolute;
  inset:0;
  background:transparent;
  border-radius:10px;
  backdrop-filter:blur(10px);
  -webkit-backdrop-filter:blur(10px);
  z-index:10;
  pointer-events:auto;
}
.flat-list.syncing::after{
  content:'';
  position:absolute;
  top:150px;
  right:0;
  bottom:0;
  left:0;
  background-image:var(--aggr-pattern);
  background-repeat:repeat-y;
  background-position:center top;
  background-size:auto 700px;
  z-index:11;
  pointer-events:none;
}
/* SVG pattern: emoji + \u6B63\u5728\u8FDB\u884C\u63A5\u53E3\u805A\u5408\u2026\u2026 (theme-aware text color) */
:root{
  --aggr-pattern:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='700' viewBox='0 0 600 700'><text x='300' y='130' font-size='110' text-anchor='middle' dominant-baseline='middle'>%E2%9A%A0%EF%B8%8F</text><text x='300' y='220' font-size='20' text-anchor='middle' fill='%23c8d6e5' font-family='monospace'>%E6%AD%A3%E5%9C%A8%E8%BF%9B%E8%A1%8C%E6%8E%A5%E5%8F%A3%E8%81%9A%E5%90%88%E2%80%A6%E2%80%A6</text></svg>");
}
[data-theme="light"]{
  --aggr-pattern:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='700' viewBox='0 0 600 700'><text x='300' y='130' font-size='110' text-anchor='middle' dominant-baseline='middle'>%E2%9A%A0%EF%B8%8F</text><text x='300' y='220' font-size='20' text-anchor='middle' fill='%232c3e50' font-family='monospace'>%E6%AD%A3%E5%9C%A8%E8%BF%9B%E8%A1%8C%E6%8E%A5%E5%8F%A3%E8%81%9A%E5%90%88%E2%80%A6%E2%80%A6</text></svg>");
}
.btn[disabled]{opacity:0.3;cursor:not-allowed;pointer-events:none}

.footer{margin-top:48px;padding-top:24px}

/* Regex section */
.regex-toggle-bar{display:flex;align-items:center;gap:8px;padding:17px 0;cursor:pointer;user-select:none;font-size:0.75rem;font-weight:600;color:var(--text)}
.regex-toggle-bar:hover{color:var(--text-bright)}
.regex-toggle-arrow{font-size:0.65rem;color:var(--text-dim);transition:transform 0.2s;display:inline-block}
.regex-toggle-bar.open .regex-toggle-arrow{transform:rotate(90deg)}
.regex-panel{margin-bottom:12px}
.regex-textarea{width:100%;min-height:190px;padding:10px;font-family:var(--mono);font-size:0.75rem;background:var(--surface);border:1px solid var(--border);border-radius:6px;color:var(--text);resize:vertical;box-sizing:border-box}
.regex-textarea:focus{outline:none;border-color:var(--green)}
.regex-header{display:flex;align-items:center;gap:8px;padding:12px 16px;cursor:pointer;user-select:none;transition:background 0.2s}
.regex-header:hover{background:var(--surface-2)}
.regex-header-title{flex:1;font-family:var(--mono);font-size:0.7rem;font-weight:600;color:var(--text-bright);text-transform:uppercase;letter-spacing:0.08em}
.regex-header-arrow{font-size:0.7rem;color:var(--text-dim);transition:transform 0.2s}
.regex-section.open .regex-header-arrow{transform:rotate(90deg)}
.regex-body{display:none;border-top:1px solid var(--border);padding:16px}
.regex-section.open .regex-body{display:block}

/* Regex input form */
.regex-input-row{display:flex;gap:10px;align-items:center;margin-bottom:12px}
.regex-input{flex:1;font-family:var(--mono);font-size:0.75rem}
.regex-error{font-size:0.7rem;color:var(--red);margin-top:4px;padding:4px 0;display:none}
.regex-status{font-size:0.7rem;padding:0;display:none;transition:opacity 0.5s;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.regex-status.saving{color:var(--text-dim)}
.regex-status.saved{color:var(--green)}
.regex-status.noop{color:var(--text-dim)}
.regex-status.error{color:var(--red)}
#applyChangesBtn{padding:6px 20px;min-width:96px}
.regex-description{font-family:var(--mono);font-size:0.75rem;font-weight:400;line-height:1.6;color:var(--text-dim);padding:0 0 12px 0;margin:0}

/* Preview */
.regex-preview{margin-bottom:12px;display:none}
.regex-preview.open{display:block}
.regex-preview-header{font-size:0.7rem;color:var(--text-dim);margin-bottom:6px;font-family:var(--mono)}
.regex-preview-count{color:var(--blue);font-weight:600}
.regex-preview-list{background:var(--surface-2);border-radius:6px;max-height:400px;overflow-y:auto}
.regex-preview-item{padding:6px 12px;font-family:var(--mono);font-size:0.75rem;color:var(--text);border-bottom:1px solid var(--border)}
.regex-preview-item:last-child{border-bottom:none}
.regex-preview-item:hover{background:var(--surface)}
.regex-preview-empty{padding:12px;font-size:0.75rem;color:var(--text-dim);text-align:center;font-family:var(--mono)}

/* Rule list */
.regex-rule-list{margin-top:4px}
.regex-rule-list-empty{padding:16px;font-size:0.75rem;color:var(--text-dim);text-align:center;font-family:var(--mono)}
.regex-rule{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)}
.regex-rule:last-child{border-bottom:none}
.regex-rule-pattern{flex:1;font-family:var(--mono);font-size:0.75rem;color:var(--text-bright);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.regex-rule-meta{font-size:0.65rem;color:var(--text-dim);white-space:nowrap}

/* Regex-blocked site */
.item.regex-blocked{border-left:4px solid var(--amber-dim);opacity:1}
.item.regex-blocked .item-name{text-decoration:none;color:var(--text-bright)}
.regex-badge{font-size:0.6rem;padding:1px 6px;border-radius:3px;background:var(--amber-dim);color:var(--amber);font-weight:600;margin-left:6px}
.regex-badge.whitelisted{background:var(--green-dim);color:var(--green)}

@media(max-width:560px){
  .apply-bar,.batch-bar{font-size:0.65rem;padding:8px 12px;gap:8px}
  .apply-bar .btn,.batch-bar .btn{font-size:0.6rem;padding:4px 8px}
}
</style>
<script>(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t)})()</script>
</head>
<body>

<!-- Login -->
<div class="login-overlay" id="loginOverlay">
  <div class="login-box">
    <h2>\u914D\u7F6E\u7F16\u8F91\u5668</h2>
    <p>\u8BF7\u8F93\u5165\u7BA1\u7406\u4EE4\u724C</p>
    <div class="error-msg" id="loginError">\u65E0\u6548\u7684\u4EE4\u724C</div>
    <input type="password" id="tokenInput" placeholder="\u7BA1\u7406\u4EE4\u724C" autofocus>
    <button class="btn" style="width:100%" onclick="auth.doLogin()">\u767B\u5F55</button>
  </div>
</div>

<!-- Main -->
<div class="container" id="mainContent" style="display:none">
  <header class="header">
    <div class="header-top">
      <div class="header-label">\u914D\u7F6E\u7F16\u8F91\u5668</div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()">\u{1F319}</button>
        </div>
    </div>
    <h1 class="header-title">TVBox <span>Auxiliary</span></h1>
    <nav class="header-nav">
      <a href="/status">\u9996\u9875</a>
      <a href="/admin">\u63A5\u53E3\u7BA1\u7406</a>
      <a href="/admin/config-editor" class="active">\u914D\u7F6E\u7F16\u8F91</a>
    </nav>
  </header>

  <!-- Tabs -->
  <div class="tabs">
    <div class="tab active" data-tab="sites" onclick="switchTab('sites')">\u70B9\u64AD<span class="badge" id="badgeSites">0</span></div>
    <div class="tab" data-tab="parses" onclick="switchTab('parses')">\u89E3\u6790<span class="badge" id="badgeParses">0</span></div>
    <div class="tab" data-tab="lives" onclick="switchTab('lives')">\u76F4\u64AD<span class="badge" id="badgeLives">0</span></div>
  </div>

  <!-- Search -->
  <div class="search-bar">
    <input type="text" id="searchInput" placeholder="\u641C\u7D22\u540D\u79F0\u3001API\u3001URL..." oninput="doSearch()">
  </div>

  <!-- Regex toggle button (collapsible, below search) -->
  <div class="regex-toggle-bar" onclick="toggleRegexPanel()">
    <span class="regex-toggle-arrow">&#9654;</span>
    <span>\u6B63\u5219\u8868\u8FBE\u5F0F</span>
  </div>

  <!-- Regex panel (collapsible) -->
  <div class="regex-panel" id="regexPanel" style="display:none;margin-bottom:12px">
    <p class="regex-description">\u4F7F\u7528\u6B63\u5219\u8868\u8FBE\u5F0F\u8FDB\u884C\u5C4F\u853D\uFF0C\u4E00\u884C\u4E00\u6761\uFF0C\u9010\u6761\u5339\u914D\uFF0C\u88AB\u547D\u4E2D\u7684\u7AD9\u70B9\u5C06\u88AB\u5C4F\u853D\uFF0C\u89C4\u5219\u4F1A\u968F\u63A7\u4EF6\u7126\u70B9\u72B6\u6001\u81EA\u52A8\u4FDD\u5B58\uFF0C\u6CE8\u610F\uFF0C\u4F60\u4ECD\u9700\u5E94\u7528\u66F4\u6539\u624D\u53EF\u5373\u65F6\u751F\u6548\u3002</p>
    <textarea class="regex-textarea" id="regexTextarea" placeholder="\u8F93\u5165\u6B63\u5219\u6A21\u5F0F..."></textarea>
    <div class="regex-error" id="regexError"></div>
    <div style="display:flex;align-items:center;gap:8px;margin:7px 0 15px 0">
      <button class="btn sm secondary" id="regexPreviewBtn" onclick="toggleRegexPreview()">\u9884\u89C8\u5339\u914D</button>
      <span class="regex-status" id="regexStatus"></span>
    </div>
    <div class="regex-preview" id="regexPreview" style="display:none;margin-bottom:8px">
      <div class="regex-preview-header"><span>\u5339\u914D\u7684\u7AD9\u70B9</span> (<span class="regex-preview-count" id="regexPreviewCount">0</span>)</div>
      <div class="regex-preview-list" id="regexPreviewList"></div>
    </div>
  </div>

  <!-- Stats -->
  <div class="stats" id="statsBar"></div>

  <!-- Sites panel -->
  <div class="tab-panel active" id="panelSites">
    <!-- Loading -->
    <div class="loading-msg" id="loadingSites">\u52A0\u8F7D\u4E2D...</div>
  </div>

  <!-- Parses panel -->
  <div class="tab-panel" id="panelParses">
    <div class="loading-msg" id="loadingParses">\u52A0\u8F7D\u4E2D...</div>
  </div>

  <!-- Lives panel -->
  <div class="tab-panel" id="panelLives">
    <div class="loading-msg" id="loadingLives">\u52A0\u8F7D\u4E2D...</div>
  </div>

  <div class="footer">
    <span>TVBox Auxiliary</span>
  </div>
</div>

<div class="batch-bar" id="batchBar" style="display:none">
  <span><span class="batch-count" id="batchCount">0</span> <span>\u5DF2\u9009</span></span>
  <button class="btn sm secondary" id="selectAllBtn" onclick="toggleSelectAll()">\u5168\u9009</button>
  <button class="btn sm danger" id="batchBlockBtn" onclick="batchBlock()">\u6279\u91CF\u5C4F\u853D</button>
  <button class="btn sm success" id="batchRestoreBtn" onclick="batchRestore()" disabled>\u6279\u91CF\u6062\u590D</button>
  <button class="btn sm secondary" onclick="clearSelection()">\u53D6\u6D88</button>
</div>

<div class="apply-bar" id="applyBar">
  <button class="btn sm success" id="applyChangesBtn" onclick="applyChanges()">\u5E94\u7528\u66F4\u6539</button>
</div>

<div class="leave-modal-overlay" id="leaveModal">
  <div class="leave-modal-box">
    <div class="leave-modal-title" id="leaveModalTitle">\u89C4\u5219\u672A\u5E94\u7528\uFF0C\u786E\u5B9A\u79BB\u5F00\uFF1F</div>
    <div class="leave-modal-actions">
      <button class="btn sm danger" id="leaveModalLeaveBtn">\u79BB\u5F00</button>
      <button class="btn sm success" id="leaveModalStayBtn">\u8FD4\u56DE</button>
    </div>
  </div>
</div>

<script>
${sharedUi}


let TOKEN = '';
let DATA = null;
let CURRENT_TAB = 'sites';
let previewVisible = false;

const auth = initAuth('tokenInput', 'loginError', 'loginOverlay', 'mainContent', '/admin/config-data', async function() {
  TOKEN = auth.getToken();
  loadData();
  startSyncPolling();
  // D-24: restore dirty state from sessionStorage on page load,
  // but reconcile with server \u2014 if server cleared the marker (e.g. aggregation ran),
  // the client-side dirty flag is stale and must be cleared too
  if (sessionStorage.getItem('configEditorDirty') === 'true') {
    try {
      const statusRes = await auth.authFetch('/status-data');
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        if (!statusData.dirtyMarker) {
          // Server says no dirty marker \u2014 aggregation already ran, clear client state
          _dirty = false;
          sessionStorage.removeItem('configEditorDirty');
        } else {
          _dirty = true;
        }
      } else {
        _dirty = true; // can't verify, assume stale
      }
    } catch {
      _dirty = true; // network error, assume stale
    }
    updateApplyBar();
  }

  // 14-08: Intercept internal link clicks while dirty
  document.addEventListener('click', function(e) {
    if (!_dirty) return;
    let el = e.target;
    while (el && el !== document.body) {
      if (el.tagName === 'A' && el.getAttribute('href')) {
        const href = el.getAttribute('href');
        if (href.startsWith('/') && !href.startsWith('//') && !el.target && !el.hasAttribute('download')) {
          e.preventDefault();
          showLeaveModal(href);
          return;
        }
      }
      el = el.parentElement;
    }
  });

  const stayBtn = document.getElementById('leaveModalStayBtn');
  if (stayBtn) stayBtn.addEventListener('click', hideLeaveModal);

  const leaveBtn = document.getElementById('leaveModalLeaveBtn');
  if (leaveBtn) leaveBtn.addEventListener('click', function() {
    const href = _pendingLeaveHref;
    hideLeaveModal();
    _dirty = false; // clear in-memory only so beforeunload does not double-prompt
    // Keep sessionStorage configEditorDirty so dirty state restores on return
    if (href) {
      window.location.href = href;
    }
  });
});

const SITE_TYPE_TIPS = {
  0: () => "XML \u7AD9\u70B9\uFF1A\u901A\u8FC7 XML \u63A5\u53E3\u83B7\u53D6\u5F71\u89C6\u6570\u636E",
  1: () => "JSON \u7AD9\u70B9\uFF08MacCMS\uFF09\uFF1A\u901A\u8FC7 JSON API \u83B7\u53D6\u5F71\u89C6\u6570\u636E",
  3: () => "JAR \u63D2\u4EF6\uFF1A\u901A\u8FC7 Java \u722C\u866B\u63D2\u4EF6\u83B7\u53D6\u6570\u636E\uFF0C\u9700\u8981 spider \u5305",
  4: () => "\u8FDC\u7A0B\u7AD9\u70B9\uFF1A\u4F7F\u7528\u8FDC\u7A0B\u914D\u7F6E\u7684\u7AD9\u70B9",
};

const PARSE_TYPE_TIPS = {
  0: () => "\u55C5\u63A2\u89E3\u6790\uFF1A\u901A\u8FC7\u7F51\u9875\u55C5\u63A2\u63D0\u53D6\u89C6\u9891\u5730\u5740",
  1: () => "JSON \u89E3\u6790\uFF1A\u76F4\u63A5\u8FD4\u56DE JSON \u683C\u5F0F\u7684\u89C6\u9891\u5730\u5740",
  2: () => "JSON \u6269\u5C55\u89E3\u6790\uFF1A\u5E26\u6269\u5C55\u53C2\u6570\u7684 JSON \u89E3\u6790",
  3: () => "\u540C\u6B65\u89E3\u6790\uFF1A\u5408\u5E76\u591A\u4E2A\u89E3\u6790\u63A5\u53E3\u7684\u7ED3\u679C",
  4: () => "\u8D85\u7EA7\u89E3\u6790\uFF1A\u9AD8\u7EA7\u590D\u5408\u89E3\u6790\u6A21\u5F0F",
};

const LIVE_TYPE_TIPS = {
  0: () => "\u76F4\u64AD\u6E90\uFF1AM3U/TXT \u683C\u5F0F\u7684\u9891\u9053\u5217\u8868\u6587\u4EF6",
  3: () => "\u76F4\u64AD\u63D2\u4EF6\uFF1A\u901A\u8FC7 JAR/Python \u63D2\u4EF6\u83B7\u53D6\u9891\u9053",
};

async function extractErrorMessage(res, fallback) {
  try { const j = await res.json(); return j && j.error ? String(j.error) : fallback; }
  catch { try { const t = await res.text(); return t || fallback; } catch { return fallback; } }
}

async function loadData() {
  try {
    const res = await fetch('/admin/config-data', {
      headers: { 'Authorization': 'Bearer ' + TOKEN }
    });
    if (res.status === 401) {
      $('loginError').style.display = 'block';
      return;
    }
    DATA = await res.json();
    $('loginOverlay').style.display = 'none';
    $('mainContent').style.display = 'block';
    render();
  } catch (e) {
    $('loginError').textContent = "\u7F51\u7EDC\u9519\u8BEF";
    $('loginError').style.display = 'block';
  }
}

function switchTab(tab) {
  CURRENT_TAB = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel' + tab.charAt(0).toUpperCase() + tab.slice(1)));
  $('searchInput').value = '';
  doSearch();
  updateBatchBar();

  // Hide regex section on non-Sites tabs (Bug 3 fix)
  const regexBar = document.querySelector('.regex-toggle-bar');
  const regexPanel = $('regexPanel');
  if (tab === 'sites') {
    if (regexBar) regexBar.style.display = '';
    // Don't change regexPanel display \u2014 keep its current open/closed state
  } else {
    if (regexBar) regexBar.style.display = 'none';
    if (regexPanel) regexPanel.style.display = 'none';
    // If panel was open, reset state so re-opening on Sites works
    if (regexPanelOpen) {
      regexPanelOpen = false;
      const bar = document.querySelector('.regex-toggle-bar');
      if (bar) bar.classList.remove('open');
    }
  }
}

function render() {
  if (!DATA) return;
  $('badgeSites').textContent = DATA.sites.length;
  $('badgeParses').textContent = DATA.parses.length;
  $('badgeLives').textContent = DATA.lives.length;
  renderSites();
  renderParses();
  renderLives();
  updateStats();
  updateBatchBar();
  loadRegexRules();
  setupRegexAutoSave();
  setupItemClickDelegate();
}

let _itemClickDelegateBound = false;
function setupItemClickDelegate() {
  if (_itemClickDelegateBound) return;
  _itemClickDelegateBound = true;

  // Bind on static panel containers (survives innerHTML re-renders)
  const panels = ['panelSites', 'panelParses', 'panelLives'];
  panels.forEach(pid => {
    const panel = $(pid);
    if (panel) {
      panel.addEventListener('click', function(e) {
        // Skip if click target is checkbox, button, item-type (with tooltip), or item-api
        const skip = e.target.closest('.item-label, .item-check, .item-actions, .item-type, .item-api');
        if (skip) return;

        const item = e.target.closest('.item[data-id]');
        if (!item) return;

        const checkbox = item.querySelector('.item-check');
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      });
    }
  });
}

function updateStats() {
  if (!DATA) return;
  const bs = DATA.sites.filter(s => s.blocked).length;
  const bp = DATA.parses.filter(p => p.blocked).length;
  const bl = DATA.lives.filter(l => l.blocked).length;
  const regexBlocked = DATA.sites.filter(s => s.regexBlocked).length;
  const regexRestored = DATA.sites.filter(s => s.isOverridden).length;
  const errCount = DATA.sites.filter(s => s.errSource).length;
  $('statsBar').innerHTML =
    '<div class="stat">' + "\u53EF\u7528:" + ' <span class="num">' + (DATA.sites.length - bs) + '</span> ' + "\u7AD9\u70B9" + ', '
    + '<span class="num">' + (DATA.parses.length - bp) + '</span> ' + "\u89E3\u6790" + ', '
    + '<span class="num">' + (DATA.lives.length - bl) + '</span> ' + "\u76F4\u64AD" + '</div>'
    + (bs + bp + bl > 0 ? '<div class="stat">' + "\u5DF2\u5C4F\u853D:" + ' <span class="blocked-num">' + (bs + bp + bl) + '</span></div>' : '')
    + (regexBlocked > 0 ? '<div class="stat">' + "\u6B63\u5219\u5DF2\u5C4F\u853D: {N}".replace('{N}', regexBlocked) + '</div>' : '')
    + (regexRestored > 0 ? '<div class="stat">' + "\u6B63\u5219\u767D\u540D\u5355: {N}".replace('{N}', regexRestored) + '</div>' : '')
    + (errCount > 0 ? '<div class="stat">ERR: <span class="blocked-num">' + errCount + '</span></div>' : '');
}

function typeSpan(type, tips) {
  const t = type ?? 0;
  const tipFn = tips[t];
  const tip = tipFn ? tipFn() : "\u7C7B\u578B " + t;
  return '<span class="item-type t' + t + '">T' + t + '<span class="tooltip">' + tip + '</span></span>';
}

function renderSites() {
  const container = $('panelSites');
  let html = '<div class="flat-list' + (_syncing ? ' syncing' : '') + '">';
  for (const s of DATA.sites) {
    html += siteRow(s);
  }
  html += '</div>';
  container.innerHTML = html;
}

function siteRow(s) {
  let cls = 'item';
  let check = '';
  let btn = '';
  let badge = '';

  if (s.isOverridden) {
    cls = 'item regex-blocked';
    badge = '<span class="regex-badge whitelisted">' + "\u767D\u540D\u5355" + '</span>';
    btn = '<button class="btn sm success" onclick="reblockRegex(\\'' + escAttr(s.name || s.key) + '\\')">' + "\u79FB\u9664\u767D\u540D\u5355" + '</button>';
  } else if (s.regexBlocked) {
    cls = 'item regex-blocked';
    badge = '<span class="regex-badge">Regex</span>';
    btn = '<button class="btn sm secondary" onclick="unblockRegexBlocked(\\'' + escAttr(s.name || s.key) + '\\')">' + "\u6DFB\u52A0\u767D\u540D\u5355" + '</button>';
  } else if (s.blocked) {
    cls = 'item blocked';
    check = '<input type="checkbox" class="item-check" onchange="updateBatchBar()">';
    btn = '<button class="btn sm secondary" onclick="unblock(\\'sites\\',\\'' + escAttr(s.fingerprint) + '\\')">' + "\u6062\u590D" + '</button>';
  } else {
    check = '<input type="checkbox" class="item-check" onchange="updateBatchBar()">';
    btn = '<button class="btn sm danger" onclick="block(\\'sites\\',\\'' + escAttr(s.fingerprint) + '\\')">' + "\u5C4F\u853D" + '</button>';
  }

  const blockType = (s.isOverridden || s.regexBlocked) ? ' data-block-type="regex"' : s.blocked ? ' data-block-type="manual"' : '';
  if (check) {
    return '<div class="' + cls + '" data-id="' + esc(s.fingerprint) + '" data-type="sites"' + blockType + ' data-search="' + esc((s.name||'') + ' ' + s.key + ' ' + s.api) + '">'
      + '<label class="item-label">'
      + check
      + '<span class="item-name" title="' + esc(s.key) + '">' + esc(s.name || s.key) + badge + '</span>'
      + '</label>'
      + (s.errSource
        ? '<span class="item-type terr">ERR<span class="tooltip">' + esc(s.errReason || '\u63A5\u53E3\u6E90\u9A8C\u8BC1\u5931\u8D25') + '</span></span>'
        : typeSpan(s.type, SITE_TYPE_TIPS))
      + '<span class="item-api" title="' + esc(s.api) + '">' + esc(s.api) + '</span>'
      + '<span class="item-actions">' + btn + '</span>'
      + '</div>';
  } else {
    return '<div class="' + cls + '" data-id="' + esc(s.fingerprint) + '" data-type="sites"' + blockType + ' data-search="' + esc((s.name||'') + ' ' + s.key + ' ' + s.api) + '">'
      + '<span class="item-name" style="flex:1" title="' + esc(s.key) + '">' + esc(s.name || s.key) + badge + '</span>'
      + (s.errSource
        ? '<span class="item-type terr">ERR<span class="tooltip">' + esc(s.errReason || '\u63A5\u53E3\u6E90\u9A8C\u8BC1\u5931\u8D25') + '</span></span>'
        : typeSpan(s.type, SITE_TYPE_TIPS))
      + '<span class="item-api" title="' + esc(s.api) + '">' + esc(s.api) + '</span>'
      + '<span class="item-actions">' + btn + '</span>'
      + '</div>';
  }
}

function renderParses() {
  const container = $('panelParses');
  let html = '<div class="flat-list' + (_syncing ? ' syncing' : '') + '">';
  for (const p of DATA.parses) {
    html += parseRow(p);
  }
  html += '</div>';
  container.innerHTML = html;
}

function parseRow(p) {
  const cls = p.blocked ? 'item blocked' : 'item';
  const id = p.url;
  const check = '<input type="checkbox" class="item-check" onchange="updateBatchBar()">';
  const btn = p.blocked
    ? '<button class="btn sm secondary" onclick="unblock(\\'parses\\',\\'' + escAttr(id) + '\\')">' + "\u6062\u590D" + '</button>'
    : '<button class="btn sm danger" onclick="block(\\'parses\\',\\'' + escAttr(id) + '\\')">' + "\u5C4F\u853D" + '</button>';
  return '<div class="' + cls + '" data-id="' + esc(id) + '" data-type="parses" data-search="' + esc((p.name||'') + ' ' + p.url) + '">'
    + '<label class="item-label">'
    + check
    + '<span class="item-name">' + esc(p.name) + '</span>'
    + '</label>'
    + typeSpan(p.type, PARSE_TYPE_TIPS)
    + '<span class="item-api" title="' + esc(p.url) + '">' + esc(p.url) + '</span>'
    + '<span class="item-actions">' + btn + '</span>'
    + '</div>';
}

function renderLives() {
  const container = $('panelLives');
  const liveDisabled = !!DATA.liveDisabled;
  let html = '';
  if (liveDisabled) {
    html += '<div style="padding:10px 14px;margin-bottom:8px;background:var(--amber-dim);border-left:3px solid var(--amber);border-radius:4px;font-size:0.85rem;color:var(--text-bright)">'
      + '\u76F4\u64AD\u529F\u80FD\u5DF2\u7981\u7528'
      + '</div>';
  }
  html += '<div class="flat-list' + (_syncing ? ' syncing' : '') + '">';
  for (const l of DATA.lives) {
    html += liveRow(l, liveDisabled);
  }
  html += '</div>';
  container.innerHTML = html;
}

function liveRow(l, liveDisabled) {
  const url = l.url || l.api || '';
  // liveDisabled \u65F6\u5F3A\u5236 blocked \u6837\u5F0F\u3001\u65E0 checkbox\u3001\u65E0\u6309\u94AE
  const cls = (l.blocked || liveDisabled) ? 'item blocked' : 'item';
  const check = liveDisabled ? '' : '<input type="checkbox" class="item-check" onchange="updateBatchBar()">';
  const btn = (url && !liveDisabled)
    ? (l.blocked
      ? '<button class="btn sm secondary" onclick="unblock(\\'lives\\',\\'' + escAttr(url) + '\\')">' + "\u6062\u590D" + '</button>'
      : '<button class="btn sm danger" onclick="block(\\'lives\\',\\'' + escAttr(url) + '\\')">' + "\u5C4F\u853D" + '</button>')
    : '';
  if (check) {
    return '<div class="' + cls + '" data-id="' + esc(url) + '" data-type="lives" data-search="' + esc((l.name||'') + ' ' + url) + '">'
      + '<label class="item-label">'
      + check
      + '<span class="item-name">' + esc(l.name || '(unnamed)') + '</span>'
      + '</label>'
      + typeSpan(l.type, LIVE_TYPE_TIPS)
      + '<span class="item-api" title="' + esc(url) + '">' + esc(url) + '</span>'
      + '<span class="item-actions">' + btn + '</span>'
      + '</div>';
  } else {
    return '<div class="' + cls + '" data-id="' + esc(url) + '" data-type="lives" data-search="' + esc((l.name||'') + ' ' + url) + '">'
      + '<span class="item-name" style="flex:1">' + esc(l.name || '(unnamed)') + '</span>'
      + typeSpan(l.type, LIVE_TYPE_TIPS)
      + '<span class="item-api" title="' + esc(url) + '">' + esc(url) + '</span>'
      + '<span class="item-actions">' + btn + '</span>'
      + '</div>';
  }
}

function doSearch() {
  const q = $('searchInput').value.toLowerCase().trim();
  const panel = document.querySelector('.tab-panel.active');
  if (!panel) return;
  panel.querySelectorAll('.item').forEach(item => {
    const text = (item.dataset.search || '').toLowerCase();
    item.style.display = (!q || text.includes(q)) ? '' : 'none';
  });
}

async function block(type, id) {
  if (type === 'lives' && DATA && DATA.liveDisabled) return;
  try {
    const res = await fetch('/admin/blacklist', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id })
    });
    if (!res.ok) { alert('\u64CD\u4F5C\u5931\u8D25: ' + await extractErrorMessage(res, '\u670D\u52A1\u5668\u8FD4\u56DE ' + res.status)); return; }
    if (type === 'sites') {
      const s = DATA.sites.find(s => s.fingerprint === id);
      if (s) s.blocked = true;
    } else if (type === 'parses') {
      const p = DATA.parses.find(p => p.url === id);
      if (p) p.blocked = true;
    } else if (type === 'lives') {
      const l = DATA.lives.find(l => (l.url || l.api || '') === id);
      if (l) l.blocked = true;
    }
    updateItemDom(type, id, true);
    updateStats();
    updateBatchBar();
    markDirty();
    toast("\u5DF2\u5C4F\u853D");
  } catch (e) { alert('Network error'); }
}

async function unblock(type, id) {
  if (type === 'lives' && DATA && DATA.liveDisabled) return;
  try {
    const res = await fetch('/admin/blacklist', {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id })
    });
    if (!res.ok) { alert('\u64CD\u4F5C\u5931\u8D25: ' + await extractErrorMessage(res, '\u670D\u52A1\u5668\u8FD4\u56DE ' + res.status)); return; }
    if (type === 'sites') {
      const s = DATA.sites.find(s => s.fingerprint === id);
      if (s) s.blocked = false;
    } else if (type === 'parses') {
      const p = DATA.parses.find(p => p.url === id);
      if (p) p.blocked = false;
    } else if (type === 'lives') {
      const l = DATA.lives.find(l => (l.url || l.api || '') === id);
      if (l) l.blocked = false;
    }
    updateItemDom(type, id, false);
    updateStats();
    markDirty();
    toast("\u5DF2\u6062\u590D");
  } catch (e) { alert('Network error'); }
}

function updateItemDom(type, id, blocked) {
  const panel = type === 'sites' ? 'panelSites' : type === 'parses' ? 'panelParses' : 'panelLives';
  const el = $(panel).querySelector('[data-id="' + CSS.escape(id) + '"]');
  if (!el) return;
  if (blocked) {
    el.classList.add('blocked');
    el.querySelector('.item-actions').innerHTML = '<button class="btn sm secondary" onclick="unblock(\\'' + type + '\\',\\'' + escAttr(id) + '\\')">' + "\u6062\u590D" + '</button>';
  } else {
    el.classList.remove('blocked');
    let btns = '';
    if (type === 'sites') {
      const s = DATA.sites.find(s => s.fingerprint === id);
      if (s && s.isOverridden) {
        btns = '<button class="btn sm success" onclick="reblockRegex(\\'' + escAttr(s.name || s.key) + '\\')">' + "\u79FB\u9664\u767D\u540D\u5355" + '</button>';
      } else if (s && s.regexBlocked) {
        btns = '<button class="btn sm secondary" onclick="unblockRegexBlocked(\\'' + escAttr(s.name || s.key) + '\\')">' + "\u6DFB\u52A0\u767D\u540D\u5355" + '</button>';
      }
    }
    if (!btns) {
      btns = '<button class="btn sm danger" onclick="block(\\'' + type + '\\',\\'' + escAttr(id) + '\\')">' + "\u5C4F\u853D" + '</button>';
    }
    el.querySelector('.item-actions').innerHTML = btns;
  }
}

function updateBatchBar() {
  const checked = document.querySelectorAll('.tab-panel.active .item-check:checked');
  const bar = $('batchBar');
  if (checked.length > 0) {
    $('batchCount').textContent = checked.length;
    bar.style.display = 'flex';
    let hasBlocked = 0;
    checked.forEach(cb => {
      const item = cb.closest('.item');
      if (item.classList.contains('blocked')) hasBlocked++;
    });
    $('batchRestoreBtn').disabled = !hasBlocked;
    // Disable batch block when all selected items are already blocked
    $('batchBlockBtn').disabled = hasBlocked === checked.length;
  } else {
    bar.style.display = 'none';
  }
  // Sync select-all button text with current selection state
  const btn = $('selectAllBtn');
  if (btn) {
    const panel = document.querySelector('.tab-panel.active');
    const all = panel ? Array.from(panel.querySelectorAll('.item:not(.regex-blocked) .item-check')).filter(cb => cb.offsetParent !== null) : [];
    btn.textContent = (all.length > 0 && all.every(cb => cb.checked)) ? "\u53D6\u6D88\u5168\u9009" : "\u5168\u9009";
  }
}

function clearSelection() {
  document.querySelectorAll('.item-check:checked').forEach(cb => { cb.checked = false; });
  updateBatchBar();
  const btn = $('selectAllBtn');
  if (btn) btn.textContent = "\u5168\u9009";
}

function toggleSelectAll() {
  const panel = document.querySelector('.tab-panel.active');
  if (!panel) return;
  const checkboxes = Array.from(panel.querySelectorAll('.item:not(.regex-blocked) .item-check'))
    .filter(cb => cb.offsetParent !== null);
  if (checkboxes.length === 0) return;
  const allChecked = checkboxes.every(cb => cb.checked);
  if (allChecked) {
    // All already checked \u2014 deselect all
    checkboxes.forEach(cb => { cb.checked = false; });
  } else {
    // Not all checked \u2014 select all
    checkboxes.forEach(cb => { cb.checked = true; });
  }
  updateBatchBar();
  const btn = $('selectAllBtn');
  btn.textContent = allChecked ? "\u5168\u9009" : "\u53D6\u6D88\u5168\u9009";
}

async function batchBlock() {
  const checked = document.querySelectorAll('.tab-panel.active .item-check:checked');
  if (checked.length === 0) return;
  const byType = {};
  checked.forEach(cb => {
    const item = cb.closest('.item');
    if (item.classList.contains('blocked')) return; // Skip already blocked
    const type = item.dataset.type;
    const id = item.dataset.id;
    if (!byType[type]) byType[type] = [];
    byType[type].push(id);
  });
  try {
    for (const type of Object.keys(byType)) {
      const ids = byType[type];
      const res = await fetch('/admin/blacklist/batch', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ids })
      });
      if (!res.ok) { alert('\u64CD\u4F5C\u5931\u8D25: ' + await extractErrorMessage(res, '\u670D\u52A1\u5668\u8FD4\u56DE ' + res.status)); return; }
      ids.forEach(id => {
        if (type === 'sites') { const s = DATA.sites.find(s => s.fingerprint === id); if (s) s.blocked = true; }
        else if (type === 'parses') { const p = DATA.parses.find(p => p.url === id); if (p) p.blocked = true; }
        else if (type === 'lives') { const l = DATA.lives.find(l => (l.url || l.api || '') === id); if (l) l.blocked = true; }
        updateItemDom(type, id, true);
      });
    }
    updateStats();
    updateBatchBar();
    clearSelection();
    markDirty();
    toast("\u5DF2\u6279\u91CF\u5C4F\u853D");
  } catch (e) { alert('Network error'); }
}

async function batchRestore() {
  const checked = document.querySelectorAll('.tab-panel.active .item-check:checked');
  if (checked.length === 0) return;
  const toRestore = [];
  checked.forEach(cb => {
    const item = cb.closest('.item');
    if (item.classList.contains('blocked') && !item.classList.contains('regex-blocked')) {
      toRestore.push({ type: item.dataset.type, id: item.dataset.id });
    }
  });
  if (toRestore.length === 0) return;
  try {
    for (const { type, id } of toRestore) {
      const res = await fetch('/admin/blacklist', {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id })
      });
      if (!res.ok) {
        // Reload to reflect partial state rather than leaving UI stale
        const reloadRes = await auth.authFetch('/admin/config-data');
        if (reloadRes.ok) { DATA = await reloadRes.json(); }
        renderSites();
        renderParses();
        renderLives();
        updateStats();
        updateBatchBar();
        alert('\u6062\u590D\u5931\u8D25: ' + await extractErrorMessage(res, '\u670D\u52A1\u5668\u8FD4\u56DE ' + res.status));
        return;
      }
    }
    // Full reload per D-10/D-11
    const reloadRes = await auth.authFetch('/admin/config-data');
    if (reloadRes.ok) { DATA = await reloadRes.json(); }
    renderSites();
    renderParses();
    renderLives();
    updateStats();
    updateBatchBar();
    clearSelection();
    markDirty();
    toast("\u5DF2\u6279\u91CF\u6062\u590D");
  } catch (e) { alert('Network error'); }
}

// \u2500\u2500\u2500 Regex Blocking (Phase 5) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

let regexPanelOpen = false;
let regexSaveTimer = null;
let regexBlurHandler = null;
let regexFadeTimer = null;
let isSaving = false;

function toggleRegexPanel() {
  regexPanelOpen = !regexPanelOpen;
  const panel = $('regexPanel');
  const bar = document.querySelector('.regex-toggle-bar');
  if (regexPanelOpen) {
    panel.style.display = 'block';
    bar.classList.add('open');
    $('regexTextarea').focus();
  } else {
    panel.style.display = 'none';
    bar.classList.remove('open');
  }
}

async function loadRegexRules() {
  try {
    if (DATA && DATA.regexRules && Array.isArray(DATA.regexRules)) {
      // Already loaded from DATA.regexRules
    } else {
      const res = await auth.authFetch('/admin/regex-rules');
      if (!res.ok) return;
      const data = await res.json();
      DATA.regexRules = data.rules || [];
    }
    const ta = $('regexTextarea');
    if (ta && DATA.regexRules) {
      ta.value = DATA.regexRules.map(r => r.pattern).join(String.fromCharCode(10));
    }
  } catch (e) { /* silently handle */ }
}

async function saveRegexRules() {
  const ta = $('regexTextarea');
  if (!ta) return;
  if (isSaving) return;
  isSaving = true;
  const lines = ta.value.split(String.fromCharCode(10)).map(l => l.trim()).filter(l => l.length > 0);

  // Show saving status
  const statusEl = $('regexStatus');
  const errorEl = $('regexError');
  // Clear any previous fade timer to prevent race conditions
  if (regexFadeTimer) clearTimeout(regexFadeTimer);
  errorEl.style.display = 'none';
  statusEl.textContent = "\u4FDD\u5B58\u4E2D...";
  statusEl.className = 'regex-status saving';
  statusEl.style.display = 'inline';
  statusEl.style.opacity = '1';

  // Validate each line
  const errors = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length > 200) { errors.push('Line ' + (i+1) + ': ' + "\u6A21\u5F0F\u8FC7\u957F\uFF08\u6700\u591A200\u5B57\u7B26\uFF09"); continue; }
    try { new RegExp(line, 'u'); } catch { errors.push('Line ' + (i+1) + ': ' + "\u6B63\u5219\u8BED\u6CD5\u65E0\u6548" + ' \u2014 ' + esc(line)); continue; }
    if (/([^)]*[+*{][^)]*)[+*{]/.test(line)) { errors.push('Line ' + (i+1) + ': ' + "\u6A21\u5F0F\u5305\u542B\u5D4C\u5957\u91CF\u8BCD\uFF08\u5B58\u5728ReDoS\u98CE\u9669\uFF09" + ' \u2014 ' + esc(line)); continue; }
  }

  if (errors.length > 0) {
    errorEl.innerHTML = errors.join('<br>');
    errorEl.style.display = 'block';
    statusEl.style.display = 'none';
    isSaving = false;
    return;
  }

  // Get existing rules
  const existing = (DATA && DATA.regexRules) || [];
  const existingMap = new Map(existing.map(r => [r.pattern, r]));

  // Find added and deleted patterns
  const newPatterns = new Set(lines);
  const toDelete = existing.filter(r => !newPatterns.has(r.pattern));
  const toAdd = lines.filter(l => !existingMap.has(l));

  // Detect no-op
  if (toDelete.length === 0 && toAdd.length === 0) {
    statusEl.textContent = "\u65E0\u53D8\u66F4";
    statusEl.className = 'regex-status noop';
    regexFadeTimer = setTimeout(() => {
      statusEl.style.opacity = '0';
      setTimeout(() => { statusEl.style.display = 'none'; }, 500);
    }, 2000);
    renderSites();
    updateStats();
    isSaving = false;
    return;
  }

  try {
    // Delete removed rules
    for (const rule of toDelete) {
      await auth.authFetch('/admin/regex-rule/' + encodeURIComponent(rule.id), { method: 'DELETE' });
    }
    // Add new rules
    for (const line of toAdd) {
      await auth.authFetch('/admin/regex-rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pattern: line })
      });
    }
    // Reload fresh data
    const res = await auth.authFetch('/admin/regex-rules');
    if (res.ok) {
      const data = await res.json();
      DATA.regexRules = data.rules || [];
    }
    // Reload full config-data to refresh regexBlocked/isOverridden state
    const reloadRes = await auth.authFetch('/admin/config-data');
    if (reloadRes.ok) { DATA = await reloadRes.json(); }
    statusEl.textContent = "\u89C4\u5219\u5DF2\u4FDD\u5B58";
    statusEl.className = 'regex-status saved';
    statusEl.style.opacity = '1';
    regexFadeTimer = setTimeout(() => {
      statusEl.style.opacity = '0';
      setTimeout(() => { statusEl.style.display = 'none'; }, 500);
    }, 3000);
    renderSites();
    updateStats();
    markDirty();
    toast("\u6B63\u5219\u89C4\u5219\u5DF2\u4FDD\u5B58");
  } catch (e) {
    statusEl.textContent = "\u4FDD\u5B58\u5931\u8D25";
    statusEl.className = 'regex-status error';
    statusEl.style.opacity = '1';
    // Error persists until next interaction \u2014 no auto-fade
  } finally {
    isSaving = false;
  }
}

// Auto-save when leaving textarea
function setupRegexAutoSave() {
  const ta = $('regexTextarea');
  if (!ta) return;
  // Remove previous listener to prevent accumulation
  if (regexBlurHandler) {
    ta.removeEventListener('blur', regexBlurHandler);
  }
  regexBlurHandler = () => {
    if (regexSaveTimer) clearTimeout(regexSaveTimer);
    regexSaveTimer = setTimeout(saveRegexRules, 500);
  };
  ta.addEventListener('blur', regexBlurHandler);
}

// Preview matching sites for regex patterns
function toggleRegexPreview() {
  const ta = $('regexTextarea');
  const errorEl = $('regexError');
  const previewEl = $('regexPreview');
  const btn = $('regexPreviewBtn');

  if (previewVisible) {
    previewVisible = false;
    previewEl.style.display = 'none';
    btn.textContent = "\u9884\u89C8\u5339\u914D";
    return;
  }

  const lines = ta.value.split(String.fromCharCode(10)).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) {
    errorEl.textContent = "\u6A21\u5F0F\u4E0D\u80FD\u4E3A\u7A7A";
    errorEl.style.display = 'block';
    return;
  }

  for (const line of lines) {
    try { new RegExp(line, 'u'); } catch {
      errorEl.textContent = "\u6B63\u5219\u8BED\u6CD5\u65E0\u6548" + String.fromCharCode(8212) + ' ' + esc(line);
      errorEl.style.display = 'block';
      return;
    }
  }
  errorEl.style.display = 'none';

  const allMatches = [];
  for (const line of lines) {
    try {
      const re = new RegExp(line, 'u');
      const matches = (DATA && DATA.sites || []).filter(s => re.test(s.name || ''));
      allMatches.push(...matches.map(s => s.name || s.key));
    } catch { /* skip */ }
  }

  const unique = [...new Set(allMatches)];
  $('regexPreviewCount').textContent = unique.length;
  const listEl = $('regexPreviewList');
  if (unique.length === 0) {
    listEl.innerHTML = '<div class="regex-preview-empty">' + "\u6CA1\u6709\u7AD9\u70B9\u5339\u914D\u6B64\u6A21\u5F0F" + '</div>';
  } else {
    listEl.innerHTML = unique.map(n => '<div class="regex-preview-item">' + esc(n) + '</div>').join('');
  }
  previewEl.style.display = 'block';
  previewVisible = true;
  btn.textContent = "\u9690\u85CF\u9884\u89C8";
}

// Restore a regex-blocked site
async function unblockRegexBlocked(siteName) {
  try {
    const res = await auth.authFetch('/admin/blacklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'regexOverrides', id: siteName })
    });
    if (!res.ok) { alert('\u6DFB\u52A0\u767D\u540D\u5355\u5931\u8D25: ' + await extractErrorMessage(res, '\u670D\u52A1\u5668\u8FD4\u56DE ' + res.status)); return; }
    // Reload config-data to get server-computed isOverridden state
    const reloadRes = await auth.authFetch('/admin/config-data');
    if (reloadRes.ok) { DATA = await reloadRes.json(); }
    toast("\u5DF2\u6DFB\u52A0\u767D\u540D\u5355");
    renderSites();
    updateStats();
    markDirty();
  } catch (e) { alert("\u7F51\u7EDC\u9519\u8BEF: " + (e && e.message ? e.message : String(e))); }
}

// Re-block a regex-restored site
async function reblockRegex(siteName) {
  try {
    const res = await auth.authFetch('/admin/blacklist', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'regexOverrides', id: siteName })
    });
    if (!res.ok) { alert('\u79FB\u9664\u767D\u540D\u5355\u5931\u8D25: ' + await extractErrorMessage(res, '\u670D\u52A1\u5668\u8FD4\u56DE ' + res.status)); return; }
    const s = DATA.sites.find(s => (s.name || s.key) === siteName);
    if (s && DATA.regexRules) {
      const matches = DATA.regexRules.some(r => {
        try { return new RegExp(r.pattern, 'u').test(s.name || ''); }
        catch { return false; }
      });
      if (matches) {
        s.isOverridden = false;
        s.regexBlocked = true;
        s.blocked = true;
      } else {
        s.isOverridden = false;
      }
    }
    toast("\u5DF2\u79FB\u9664\u767D\u540D\u5355");
    renderSites();
    updateStats();
    markDirty();
  } catch (e) { alert("\u7F51\u7EDC\u9519\u8BEF: " + (e && e.message ? e.message : String(e))); }
}

applyTheme(getTheme());

// \u2500\u2500\u2500 Phase 14: Instant Apply \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// D-15: dirty \u72B6\u6001\u4EC5\u5185\u5B58\uFF0C\u5237\u65B0\u540E\u4E22\u5931
let _dirty = false;
let _syncing = true; // default true; cleared by first /status-data response. Prevents mutation window on page load.
let _lastSyncRunning = false; // tracks state transitions for post-sync data refresh
let _syncPollTimer = null;

// 14-08: Custom in-page leave guard (replaces unstyled beforeunload dialog for in-app navigation)
let _pendingLeaveHref = null;

function showLeaveModal(href) {
  _pendingLeaveHref = href;
  const m = document.getElementById('leaveModal');
  if (m) m.classList.add('open');
}

function hideLeaveModal() {
  _pendingLeaveHref = null;
  const m = document.getElementById('leaveModal');
  if (m) m.classList.remove('open');
}

function markDirty() {
  _dirty = true;
  sessionStorage.setItem('configEditorDirty', 'true');
  updateApplyBar();
}

function clearDirty() {
  _dirty = false;
  sessionStorage.removeItem('configEditorDirty');
  updateApplyBar();
}

function updateApplyBar() {
  const bar = document.getElementById('applyBar');
  if (!bar) return;
  // D-14: \u53EA\u6709 dirty \u4E14\u975E\u540C\u6B65\u4E2D\u624D\u663E\u793A
  if (_dirty && !_syncing) {
    bar.classList.add('dirty');
  } else {
    bar.classList.remove('dirty');
  }
  const batchBar = document.getElementById('batchBar');
  if (batchBar) {
    if (_dirty && !_syncing) batchBar.classList.add('with-apply');
    else batchBar.classList.remove('with-apply');
  }
}

async function applyChanges() {
  const btn = document.getElementById('applyChangesBtn');
  if (!btn) return;
  btn.disabled = true;
  toast("\u5E94\u7528\u4E2D\uFF0C\u8BF7\u68C0\u67E5\u65E5\u5FD7");
  try {
    const res = await auth.authFetch('/admin/patch-config', { method: 'POST' });
    if (res.status === 409) {
      alert("\u540C\u6B65\u8FDB\u884C\u4E2D\uFF0C\u8BF7\u7A0D\u5019");
      return;
    }
    if (!res.ok) {
      let msg = "\u5E94\u7528\u5931\u8D25";
      try { const j = await res.json(); if (j && j.error) msg += ': ' + j.error; } catch {}
      alert(msg);
      return;
    }
    // Check for ok:false in response body (patch skipped)
    try {
      const j = await res.json();
      if (j && !j.ok && j.error) {
        alert("\u5E94\u7528\u5931\u8D25" + ': ' + j.error);
        return;
      }
    } catch {}
    clearDirty();
  } catch (e) {
    alert("\u5E94\u7528\u5931\u8D25");
  } finally {
    btn.disabled = false;
  }
}

// D-16: \u540C\u6B65\u72B6\u6001\u8F6E\u8BE2 + UI \u5E94\u7528
function applySyncingState(running) {
  _syncing = !!running;
  // \u7981\u7528 regex toggle bar
  const rb = document.querySelector('.regex-toggle-bar');
  if (rb) {
    if (_syncing) rb.classList.add('syncing');
    else rb.classList.remove('syncing');
  }
  // flat-list \u906E\u7F69
  document.querySelectorAll('.flat-list').forEach(el => {
    if (_syncing) el.classList.add('syncing');
    else el.classList.remove('syncing');
  });
  updateApplyBar();
}

async function pollSyncStatus() {
  try {
    const res = await auth.authFetch('/status-data');
    if (!res.ok) return;
    const j = await res.json();
    const syncRunning = !!j.syncRunning;

    // \u540C\u6B65\u521A\u5B8C\u6210 \u2192 \u5237\u65B0\u7AD9\u70B9\u6570\u636E\uFF08errSource \u7B49\u5B9E\u65F6\u72B6\u6001\uFF09
    if (_lastSyncRunning && !syncRunning) {
      const reloadRes = await auth.authFetch('/admin/config-data');
      if (reloadRes.ok) {
        DATA = await reloadRes.json();
        renderSites();
        renderParses();
        renderLives();
        updateStats();
      }
    }
    _lastSyncRunning = syncRunning;
    applySyncingState(syncRunning);
    // If server says no dirty marker but client thinks it's dirty,
    // aggregation already ran and cleared it \u2014 sync client state
    if (!j.dirtyMarker && _dirty) {
      _dirty = false;
      sessionStorage.removeItem('configEditorDirty');
      updateApplyBar();
    }
  } catch { /* network blip; retry next tick */ }
}

function startSyncPolling() {
  if (_syncPollTimer) return;
  pollSyncStatus();
  _syncPollTimer = setInterval(pollSyncStatus, 1000);
}


function stopSyncPolling() {
  if (_syncPollTimer) {
    clearInterval(_syncPollTimer);
    _syncPollTimer = null;
  }
}
</script>
</body>
</html>`;

// src/routes/ui-pages.ts
function createUiPagesRouter(deps) {
  const router = new Hono2();
  router.get("/admin", (c) => {
    return c.html(adminHtml);
  });
  router.get("/status", (c) => {
    return c.html(dashboardHtml);
  });
  router.get("/admin/config-editor", (c) => {
    return c.html(configEditorHtml);
  });
  return router;
}

// src/routes/static-assets.ts
var FONTS = {
  "jetbrains-mono-latin-ext.woff2": { path: "static/fonts/jetbrains-mono-latin-ext.woff2", type: "font/woff2" },
  "jetbrains-mono-latin.woff2": { path: "static/fonts/jetbrains-mono-latin.woff2", type: "font/woff2" },
  "outfit-latin-ext.woff2": { path: "static/fonts/outfit-latin-ext.woff2", type: "font/woff2" },
  "outfit-latin.woff2": { path: "static/fonts/outfit-latin.woff2", type: "font/woff2" }
};
function createStaticAssetsRouter() {
  const router = new Hono2();
  router.get("/fonts/:name", async (c) => {
    const entry = FONTS[c.req.param("name")];
    if (!entry) return c.text("Not Found", 404);
    const fs6 = await import("fs");
    const path5 = await import("path");
    const filePath = path5.join(__dirname, entry.path);
    try {
      const data = await fs6.promises.readFile(filePath);
      return c.body(data, 200, {
        "Content-Type": entry.type,
        "Cache-Control": "public, max-age=31536000, immutable"
      });
    } catch {
      return c.text("Not Found", 404);
    }
  });
  return router;
}

// src/core/decoder.ts
async function decodeConfigResponse(buffer2, configKey, context = {}) {
  const sourceFields = {
    source: context.sourceName || "(unnamed)",
    url: context.sourceUrl || "(unknown)",
    bytes: buffer2.byteLength,
    key: configKey ? maskSecret(configKey) : "(none)"
  };
  logger.debugFields("decoder", "decode-start", sourceFields);
  const utf8Text = new TextDecoder("utf-8").decode(buffer2);
  if (isJson(utf8Text)) {
    logger.debugFields("decoder", "decode-success", { ...sourceFields, method: "json" });
    return utf8Text;
  }
  const text = Buffer.from(buffer2).toString("latin1");
  const imageDecoded = decodeImageWrapped(text);
  if (imageDecoded !== null) {
    logger.debugFields("decoder", "decode-success", { ...sourceFields, method: "image-base64" });
    return imageDecoded;
  }
  if (text.startsWith("2423")) {
    logger.debugFields("decoder", "decode-attempt", { ...sourceFields, method: "aes-cbc" });
    try {
      const cbcResult = await decryptAesCbc(text);
      if (cbcResult !== null) {
        logger.debugFields("decoder", "decode-success", { ...sourceFields, method: "aes-cbc" });
        return cbcResult;
      }
    } catch (e) {
      logger.debugFields("decoder", "decode-failed", { ...sourceFields, method: "aes-cbc", error: e });
    }
  }
  if (configKey && !isJson(text)) {
    logger.debugFields("decoder", "decode-attempt", { ...sourceFields, method: "aes-ecb" });
    try {
      const ecbResult = await decryptAesEcb(text, configKey);
      if (ecbResult !== null) {
        logger.debugFields("decoder", "decode-success", { ...sourceFields, method: "aes-ecb" });
        return ecbResult;
      }
    } catch (e) {
      logger.debugFields("decoder", "decode-failed", { ...sourceFields, method: "aes-ecb", error: e });
    }
  }
  logger.debugFields("decoder", "decode-fallback", { ...sourceFields, method: "raw-utf8" });
  return utf8Text;
}
function decodeImageWrapped(text) {
  const marker = /[A-Za-z0]{8}\*\*/;
  const match2 = marker.exec(text);
  if (!match2) return null;
  const base64Start = match2.index + 10;
  const base64Data = text.substring(base64Start).trim();
  if (!base64Data) return null;
  try {
    return base64Decode(base64Data);
  } catch {
    return null;
  }
}
async function decryptAesCbc(hexContent) {
  const separatorIndex = hexContent.indexOf("2324");
  if (separatorIndex === -1) return null;
  const data = hexContent.substring(separatorIndex + 4, hexContent.length - 26);
  const fullStr = hexToString(hexContent).toLowerCase();
  const keyStart = fullStr.indexOf("$#");
  const keyEnd = fullStr.indexOf("#$");
  if (keyStart === -1 || keyEnd === -1) return null;
  const key = rightPadding(fullStr.substring(keyStart + 2, keyEnd), "0", 16);
  const iv = rightPadding(fullStr.substring(fullStr.length - 13), "0", 16);
  const cipherBytes = hexToBytes(data);
  const keyBytes = new TextEncoder().encode(key);
  const ivBytes = new TextEncoder().encode(iv);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivBytes },
    cryptoKey,
    cipherBytes
  );
  return new TextDecoder("utf-8").decode(decrypted);
}
async function decryptAesEcb(hexContent, key) {
  const paddedKey = rightPadding(key, "0", 16);
  const cipherBytes = hexToBytes(hexContent);
  const keyBytes = new TextEncoder().encode(paddedKey);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
  const zeroIv = new Uint8Array(16);
  const blocks = [];
  for (let i = 0; i < cipherBytes.length; i += 16) {
    const block = cipherBytes.slice(i, i + 16);
    if (i + 16 < cipherBytes.length) {
      const paddedBlock = new Uint8Array(32);
      paddedBlock.set(block, 0);
      for (let j = 16; j < 32; j++) paddedBlock[j] = 16;
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv: zeroIv },
        cryptoKey,
        paddedBlock
      );
      blocks.push(new Uint8Array(decrypted));
    } else {
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv: zeroIv },
        cryptoKey,
        block
      );
      blocks.push(new Uint8Array(decrypted));
    }
  }
  const totalLength = blocks.reduce((sum, b) => sum + b.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const b of blocks) {
    result.set(b, offset);
    offset += b.length;
  }
  return new TextDecoder("utf-8").decode(result);
}
function rightPadding(str, pad, length) {
  let result = str;
  while (result.length < length) {
    result += pad;
  }
  return result.substring(0, length);
}
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}
function hexToString(hex) {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
  }
  return str;
}
function isJson(text) {
  const trimmed = text.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return false;
  try {
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}
function base64Decode(data) {
  return Buffer.from(data, "base64").toString("utf-8");
}

// src/core/fetcher.ts
var MAX_MULTI_REPO_DEPTH = 3;
var MAX_RETRY_ATTEMPTS = 3;
var RETRY_BACKOFF_MS = [5e3, 1e4, 2e4];
var RETRY_JITTER = 0.2;
async function fetchConfigs(sources, timeoutMs = DEFAULT_FETCH_TIMEOUT_MS, proxyConfig) {
  const configs = [];
  const fetchResults = [];
  const seen = /* @__PURE__ */ new Set();
  await expandSources(sources, configs, fetchResults, seen, timeoutMs, 0, proxyConfig);
  logger.infoFields("fetcher", "fetch-complete", {
    configs: configs.length,
    topLevelSources: sources.length,
    results: fetchResults.length
  });
  return { configs, fetchResults };
}
async function expandSources(sources, configs, fetchResults, seen, timeoutMs, depth, proxyConfig) {
  const uniqueSources = sources.filter((s) => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });
  if (uniqueSources.length === 0) return;
  const tag = depth === 0 ? "" : ` (depth ${depth})`;
  logger.infoFields("fetcher", "fetch-batch", {
    count: uniqueSources.length,
    depth,
    label: tag || "top-level"
  });
  uniqueSources.forEach((source, index) => {
    logger.infoFields("fetcher", "source-queued", {
      index: index + 1,
      depth,
      name: source.name,
      url: source.url,
      key: source.configKey ? "present" : "none"
    });
  });
  const multiRepoChildren = [];
  for (const source of uniqueSources) {
    const { config: fetchedConfig, fetchResult } = await fetchSingleConfig(source, timeoutMs, proxyConfig, depth);
    fetchResults.push(fetchResult);
    if (fetchResult.status !== "ok") {
      continue;
    }
    if (isMultiRepoConfig(fetchedConfig)) {
      const children = extractMultiRepoEntries(fetchedConfig, fetchResult.name);
      logger.debugFields("fetcher", "multi-repo-detected", {
        parent: source.name,
        url: source.url,
        depth,
        children: children.length
      });
      children.forEach((child, childIndex) => {
        logger.debugFields("fetcher", "multi-repo-child", {
          parent: source.name,
          index: childIndex + 1,
          name: child.name,
          url: child.url
        });
      });
      if (depth < MAX_MULTI_REPO_DEPTH) {
        multiRepoChildren.push(...children);
      } else {
        logger.debugFields("fetcher", "multi-repo-max-depth", {
          parent: source.name,
          url: source.url,
          depth,
          maxDepth: MAX_MULTI_REPO_DEPTH
        });
      }
    } else {
      configs.push({
        sourceUrl: source.url,
        sourceName: source.name,
        config: fetchedConfig,
        speedMs: fetchResult.speedMs
      });
    }
  }
  if (multiRepoChildren.length > 0) {
    await expandSources(multiRepoChildren, configs, fetchResults, seen, timeoutMs, depth + 1, proxyConfig);
  }
}
function sleepWithJitter(baseMs) {
  const offset = baseMs * RETRY_JITTER * (2 * Math.random() - 1);
  const delay = Math.round(baseMs + offset);
  return new Promise((resolve3) => setTimeout(resolve3, delay));
}
async function fetchSingleConfigNoRetry(source, timeoutMs, proxyConfig, depth = 0) {
  const result = await fetchWithUA(source, timeoutMs, TVBOX_UA, "tvbox", depth);
  if (result.config) return result;
  if (result.fetchResult.status === "parse_error" || result.fetchResult.status === "decode_error") {
    logger.debugFields("fetcher", "retry-browser-ua", {
      name: source.name,
      url: source.url,
      previousStatus: result.fetchResult.status
    });
    const browserResult = await fetchWithUA(source, timeoutMs, BROWSER_UA, "browser", depth);
    if (browserResult.config) return browserResult;
  }
  if (proxyConfig?.urls.length && isProxyRetriable(result.fetchResult.status)) {
    for (let i = 0; i < proxyConfig.urls.length; i++) {
      const proxyUrl = proxyConfig.urls[i];
      logger.debugFields("fetcher", "retry-proxy", {
        name: source.name,
        url: source.url,
        proxyIndex: i + 1,
        proxyHost: safeHost(proxyUrl),
        previousStatus: result.fetchResult.status
      });
      const proxyResult = await fetchViaProxy(source, timeoutMs, proxyUrl, proxyConfig.token);
      if (proxyResult.config) return proxyResult;
    }
  } else {
    logger.debugFields("fetcher", "retry-skipped", {
      name: source.name,
      url: source.url,
      status: result.fetchResult.status,
      proxyConfigured: Boolean(proxyConfig?.urls.length)
    });
  }
  return result;
}
async function fetchSingleConfig(source, timeoutMs, proxyConfig, depth = 0) {
  let result = await fetchSingleConfigNoRetry(source, timeoutMs, proxyConfig, depth);
  if (result.fetchResult.status === "ok") return result;
  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
    const backoffMs = RETRY_BACKOFF_MS[attempt - 1];
    logger.infoFields("fetcher", "source-retry-attempt", {
      name: source.name,
      url: source.url,
      attempt,
      reason: result.fetchResult.errorMessage || result.fetchResult.status,
      backoffMs
    });
    await sleepWithJitter(backoffMs);
    result = await fetchSingleConfigNoRetry(source, timeoutMs, proxyConfig, depth);
    if (result.fetchResult.status === "ok") {
      logger.infoFields("fetcher", "source-retry-recovered", {
        name: source.name,
        url: source.url,
        attempt,
        recovered: true
      });
      return result;
    }
  }
  logger.infoFields("fetcher", "source-retry-exhausted", {
    name: source.name,
    url: source.url,
    attempts: MAX_RETRY_ATTEMPTS,
    finalReason: result.fetchResult.errorMessage || result.fetchResult.status
  });
  return result;
}
function isProxyRetriable(status) {
  return status === "timeout" || status.startsWith("http_") || [
    "dns_error",
    "conn_refused",
    "conn_reset",
    "tls_error",
    "host_unreachable",
    "net_unreachable",
    "fetch_failed"
  ].includes(status);
}
function classifyHttpError(status) {
  switch (status) {
    case 403:
      return "http_403";
    case 404:
      return "http_404";
    case 429:
      return "http_429";
    case 502:
      return "http_502";
    case 503:
      return "http_503";
    case 504:
      return "http_504";
    default:
      if (status >= 400 && status < 500) return "http_4xx";
      if (status >= 500 && status < 600) return "http_5xx";
      return "fetch_failed";
  }
}
function classifyNetworkError(error) {
  if (error instanceof Error && error.name === "AbortError") return "timeout";
  const cause = error?.cause;
  const code = cause?.code || "";
  switch (code) {
    case "ABORT_ERR":
      return "timeout";
    case "ENOTFOUND":
      return "dns_error";
    case "ECONNREFUSED":
      return "conn_refused";
    case "ECONNRESET":
      return "conn_reset";
    case "ERR_TLS_CERT_ALTNAME_INVALID":
    case "ERR_TLS_PROTOCOL_VERSION":
    case "ERR_TLS_HANDSHAKE_TIMEOUT":
      return "tls_error";
    case "EHOSTUNREACH":
      return "host_unreachable";
    case "ENETUNREACH":
      return "net_unreachable";
    default:
      return "fetch_failed";
  }
}
function classifyNetworkErrorMessage(error) {
  if (error instanceof Error && error.name === "AbortError") return "\u8BF7\u6C42\u8D85\u65F6";
  const cause = error?.cause;
  const code = cause?.code || "";
  const hostname = cause?.hostname || error instanceof Error && error.hostname || "unknown host";
  const host = cause?.host || hostname;
  const port = cause?.port;
  switch (code) {
    case "ABORT_ERR":
      return "\u8BF7\u6C42\u8D85\u65F6";
    case "ENOTFOUND":
      return `DNS \u89E3\u6790\u5931\u8D25: ${hostname}`;
    case "ECONNREFUSED":
      return port ? `\u8FDE\u63A5\u88AB\u62D2\u7EDD: ${host}:${port}` : `\u8FDE\u63A5\u88AB\u62D2\u7EDD: ${hostname}`;
    case "ECONNRESET":
      return "\u8FDE\u63A5\u88AB\u91CD\u7F6E";
    case "ERR_TLS_CERT_ALTNAME_INVALID":
    case "ERR_TLS_PROTOCOL_VERSION":
    case "ERR_TLS_HANDSHAKE_TIMEOUT":
      return "TLS \u63E1\u624B\u5931\u8D25";
    case "EHOSTUNREACH":
      return `\u4E3B\u673A\u4E0D\u53EF\u8FBE: ${hostname}`;
    case "ENETUNREACH":
      return "\u7F51\u7EDC\u4E0D\u53EF\u8FBE";
    default:
      return error instanceof Error ? error.message : String(error);
  }
}
async function fetchViaProxy(source, timeoutMs, proxyUrl, token) {
  const url = `${proxyUrl}?url=${encodeURIComponent(source.url)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const startTime = Date.now();
    const headers = {
      "Accept": "application/json, text/plain, */*",
      "X-Proxy-UA": TVBOX_UA
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    logger.debugFields("fetcher", "proxy-attempt-start", {
      name: source.name,
      url: source.url,
      proxyHost: safeHost(proxyUrl),
      timeoutMs,
      token: token ? "present" : "none"
    });
    const response = await fetch(url, { signal: controller.signal, headers });
    logger.debugFields("fetcher", "proxy-response", {
      name: source.name,
      url: source.url,
      proxyHost: safeHost(proxyUrl),
      status: response.status,
      contentType: response.headers.get("content-type") || "(none)"
    });
    if (!response.ok) {
      return {
        config: null,
        fetchResult: { url: source.url, name: source.name, status: classifyHttpError(response.status), errorMessage: `Proxy: HTTP ${response.status} ${response.statusText}` }
      };
    }
    const buffer2 = await response.arrayBuffer();
    const decoded = await decodeConfigResponse(buffer2, source.configKey, {
      sourceName: source.name,
      sourceUrl: source.url
    });
    if (!decoded) {
      return {
        config: null,
        fetchResult: { url: source.url, name: source.name, status: "decode_error", errorMessage: "Proxy: Undecodable" }
      };
    }
    const result = parseConfigJson(decoded);
    if (!result.ok) {
      logger.debugFields("fetcher", "parse-failed", {
        name: source.name,
        url: source.url,
        via: "proxy",
        bytes: buffer2.byteLength,
        errorCategory: result.errorCategory
      });
      return {
        config: null,
        fetchResult: { url: source.url, name: source.name, status: "parse_error", errorMessage: `Proxy: ${result.errorCategory}: ${result.message}`, validationError: result }
      };
    }
    const config2 = result.config;
    const speedMs = Date.now() - startTime;
    logger.debugFields("fetcher", "proxy-success", {
      name: source.name,
      url: source.url,
      proxyHost: safeHost(proxyUrl),
      speedMs,
      sites: config2.sites?.length || 0,
      parses: config2.parses?.length || 0,
      lives: config2.lives?.length || 0
    });
    return {
      config: config2,
      fetchResult: { url: source.url, name: source.name, status: "ok", speedMs }
    };
  } catch (error) {
    return {
      config: null,
      fetchResult: { url: source.url, name: source.name, status: classifyNetworkError(error), errorMessage: `Proxy: ${classifyNetworkErrorMessage(error)}` }
    };
  } finally {
    clearTimeout(timer);
  }
}
async function fetchWithUA(source, timeoutMs, userAgent, uaLabel, depth) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const startTime = Date.now();
    logger.debugFields("fetcher", "direct-attempt-start", {
      name: source.name,
      url: source.url,
      depth,
      ua: uaLabel,
      timeoutMs
    });
    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": userAgent
      }
    });
    logger.debugFields("fetcher", "direct-response", {
      name: source.name,
      url: source.url,
      depth,
      ua: uaLabel,
      status: response.status,
      contentType: response.headers.get("content-type") || "(none)"
    });
    if (!response.ok) {
      logger.warnFields("fetcher", "source-http-error", {
        name: source.name,
        url: source.url,
        ua: uaLabel,
        status: response.status
      });
      return {
        config: null,
        fetchResult: { url: source.url, name: source.name, status: classifyHttpError(response.status), errorMessage: `HTTP ${response.status} ${response.statusText}` }
      };
    }
    const buffer2 = await response.arrayBuffer();
    const decoded = await decodeConfigResponse(buffer2, source.configKey, {
      sourceName: source.name,
      sourceUrl: source.url
    });
    if (!decoded) {
      logger.warnFields("fetcher", "source-decode-error", {
        name: source.name,
        url: source.url,
        ua: uaLabel,
        bytes: buffer2.byteLength
      });
      return {
        config: null,
        fetchResult: { url: source.url, name: source.name, status: "decode_error", errorMessage: "Undecodable content" }
      };
    }
    const result = parseConfigJson(decoded);
    if (!result.ok) {
      logger.warnFields("fetcher", "source-parse-error", {
        name: source.name,
        url: source.url,
        ua: uaLabel,
        bytes: buffer2.byteLength,
        errorCategory: result.errorCategory
      });
      return {
        config: null,
        fetchResult: { url: source.url, name: source.name, status: "parse_error", errorMessage: `${result.errorCategory}: ${result.message}`, validationError: result }
      };
    }
    const config2 = result.config;
    const speedMs = Date.now() - startTime;
    logger.debugFields("fetcher", "direct-success", {
      name: source.name,
      url: source.url,
      depth,
      ua: uaLabel,
      speedMs,
      bytes: buffer2.byteLength,
      sites: config2.sites?.length || 0,
      parses: config2.parses?.length || 0,
      lives: config2.lives?.length || 0
    });
    return {
      config: config2,
      fetchResult: { url: source.url, name: source.name, status: "ok", speedMs }
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("abort")) {
      logger.warnFields("fetcher", "source-timeout", {
        name: source.name,
        url: source.url,
        ua: uaLabel,
        timeoutMs
      });
      return {
        config: null,
        fetchResult: { url: source.url, name: source.name, status: "timeout", errorMessage: "\u8BF7\u6C42\u8D85\u65F6" }
      };
    }
    logger.warnFields("fetcher", "source-network-error", {
      name: source.name,
      url: source.url,
      ua: uaLabel,
      error: msg
    });
    return {
      config: null,
      fetchResult: { url: source.url, name: source.name, status: classifyNetworkError(error), errorMessage: classifyNetworkErrorMessage(error) }
    };
  } finally {
    clearTimeout(timer);
  }
}
function safeHost(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    return parsed.host;
  } catch {
    return rawUrl.slice(0, 40);
  }
}
function parseConfigJson(text) {
  let cleaned = text.replace(/^﻿/, "");
  cleaned = cleaned.trim();
  if (!cleaned) {
    return { ok: false, errorCategory: "empty", message: "Empty response after BOM/whitespace removal", preview: "" };
  }
  const jsonpMatch = cleaned.match(/^w+(([sS]+))$/);
  if (jsonpMatch) {
    cleaned = jsonpMatch[1];
  }
  const first = tryParseJsonWithMessage(cleaned);
  let parsed = first.parsed;
  if (!parsed) {
    const stripped = stripJsonComments(cleaned);
    const second = tryParseJsonWithMessage(stripped);
    parsed = second.parsed;
    if (!parsed) {
      const errMsg = second.error || first.error || "Unknown JSON parse error";
      return { ok: false, errorCategory: "syntax", message: errMsg, preview: text.slice(0, 200) };
    }
  }
  if (parsed === null) {
    return { ok: false, errorCategory: "structure", message: "Parsed value is null, expected object", preview: text.slice(0, 200) };
  }
  if (Array.isArray(parsed)) {
    return { ok: false, errorCategory: "structure", message: "Parsed value is an array, expected object", preview: text.slice(0, 200) };
  }
  if (typeof parsed !== "object") {
    return { ok: false, errorCategory: "structure", message: `Parsed value is ${typeof parsed}, expected object`, preview: text.slice(0, 200) };
  }
  return { ok: true, config: parsed };
}
function tryParseJsonWithMessage(text) {
  try {
    return { parsed: JSON.parse(text) };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { parsed: null, error: msg };
  }
}
function isMultiRepoConfig(config2) {
  const raw2 = config2;
  if (Array.isArray(raw2.storeHouse)) return true;
  if (Array.isArray(raw2.urls) && !config2.sites) return true;
  return false;
}
function extractMultiRepoEntries(config2, parentName) {
  const raw2 = config2;
  const entries = [];
  if (Array.isArray(raw2.storeHouse)) {
    for (const item of raw2.storeHouse) {
      const url = item?.sourceUrl;
      if (typeof url === "string" && url.trim()) {
        entries.push({
          name: typeof item.sourceName === "string" ? item.sourceName : parentName,
          url: url.trim()
        });
      }
    }
  } else if (Array.isArray(raw2.urls)) {
    for (const item of raw2.urls) {
      const url = item?.url;
      if (typeof url === "string" && url.trim()) {
        entries.push({
          name: typeof item.name === "string" ? item.name : parentName,
          url: url.trim()
        });
      }
    }
  }
  return entries;
}
function stripJsonComments(text) {
  let result = "";
  let inString = false;
  let escape = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (escape) {
      result += ch;
      escape = false;
      continue;
    }
    if (ch === "\\" && inString) {
      result += ch;
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      result += ch;
      continue;
    }
    if (!inString && ch === "/" && text[i + 1] === "/") {
      const newline = text.indexOf("\n", i);
      if (newline === -1) break;
      i = newline - 1;
      continue;
    }
    result += ch;
  }
  return result;
}

// src/routes/admin-auth.ts
function adminAuthMiddleware(config2) {
  return async (c, next) => {
    if (!config2.adminToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const auth = c.req.header("Authorization");
    if (auth !== `Bearer ${config2.adminToken}`) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    await next();
  };
}

// src/routes/source-management.ts
function createSourceMgmtRouter(deps) {
  const { storage, config: config2 } = deps;
  const router = new Hono2();
  router.use("/admin/*", adminAuthMiddleware(config2));
  router.get("/admin/sources", async (c) => {
    const raw2 = await storage.get(MANUAL_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    return c.json(sources);
  });
  router.post("/admin/sources", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    let url = body.url?.trim() || "";
    if (!url) return c.json({ error: "URL is required" }, 400);
    let configKey = body.configKey?.trim() || "";
    const pkMatch = url.match(/;pk;(.+)$/);
    if (pkMatch) {
      configKey = configKey || pkMatch[1];
      url = url.replace(/;pk;.+$/, "");
    }
    try {
      new URL(url);
    } catch {
      return c.json({ error: "Invalid URL format" }, 400);
    }
    const name = body.name?.trim() || "";
    const raw2 = await storage.get(MANUAL_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    if (sources.some((s) => s.url === url)) {
      return c.json({ error: "Source already exists" }, 409);
    }
    const entry = { name, url };
    if (configKey) entry.configKey = configKey;
    sources.push(entry);
    await storage.put(MANUAL_SOURCES, JSON.stringify(sources));
    return c.json({ success: true });
  });
  router.delete("/admin/sources", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const url = body.url?.trim();
    if (!url) return c.json({ error: "URL is required" }, 400);
    const raw2 = await storage.get(MANUAL_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    const filtered = sources.filter((s) => s.url !== url);
    await storage.put(MANUAL_SOURCES, JSON.stringify(filtered));
    return c.json({ success: true });
  });
  router.post("/admin/sources/import", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const input = body.input?.trim();
    if (!input) return c.json({ error: "input is required" }, 400);
    const isUrl = /^https?:\/\//i.test(input);
    let jsonText;
    let sourceUrl = null;
    let configKey;
    let fetchUrl = input;
    if (isUrl) {
      const pkMatch = input.match(/;pk;(.+)$/);
      if (pkMatch) {
        configKey = pkMatch[1];
        fetchUrl = input.replace(/;pk;.+$/, "");
      }
      sourceUrl = fetchUrl;
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), config2.fetchTimeoutMs);
        try {
          const resp = await fetch(fetchUrl, {
            headers: { "Accept": "application/json, text/plain, */*", "User-Agent": "okhttp/3.12.0" },
            signal: controller.signal
          });
          if (!resp.ok) return c.json({ error: `Fetch failed: HTTP ${resp.status}` }, 502);
          const buffer2 = await resp.arrayBuffer();
          const decoded = await decodeConfigResponse(buffer2, configKey);
          jsonText = decoded || "";
        } finally {
          clearTimeout(timer);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return c.json({ error: "Fetch failed: request timed out" }, 504);
        }
        const msg = err instanceof Error ? err.message : String(err);
        return c.json({ error: `Fetch failed: ${msg}` }, 502);
      }
    } else {
      jsonText = input;
    }
    const parsed = parseConfigJson(jsonText);
    if (!parsed.ok) return c.json({ error: `Failed to parse JSON: ${parsed.errorCategory}: ${parsed.message}` }, 400);
    const raw2 = await storage.get(MANUAL_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    const existingUrls = new Set(sources.map((s) => s.url));
    let added = 0;
    let duplicates = 0;
    const addedSources = [];
    if (isMultiRepoConfig(parsed.config)) {
      const entries = extractMultiRepoEntries(parsed.config, "Imported");
      for (const entry of entries) {
        if (existingUrls.has(entry.url)) {
          duplicates++;
        } else {
          sources.push(entry);
          existingUrls.add(entry.url);
          addedSources.push(entry.url);
          added++;
        }
      }
      await storage.put(MANUAL_SOURCES, JSON.stringify(sources));
      return c.json({ type: "multi", added, duplicates, sources: addedSources });
    } else {
      if (sourceUrl) {
        if (existingUrls.has(sourceUrl)) {
          return c.json({ type: "single", added: 0, duplicates: 1, sources: [] });
        }
        const entry = { name: "Imported", url: sourceUrl };
        if (configKey) entry.configKey = configKey;
        sources.push(entry);
        await storage.put(MANUAL_SOURCES, JSON.stringify(sources));
        return c.json({ type: "single", added: 1, duplicates: 0, sources: [sourceUrl] });
      } else {
        const key = `${INLINE_PREFIX}${Date.now()}`;
        await storage.put(key, jsonText);
        const inlineUrl = `inline://${key}`;
        sources.push({ name: "Inline Config", url: inlineUrl });
        await storage.put(MANUAL_SOURCES, JSON.stringify(sources));
        return c.json({ type: "single", added: 1, duplicates: 0, sources: [inlineUrl] });
      }
    }
  });
  return router;
}

// src/core/site-store.ts
var path = __toESM(require("path"));
var fs = __toESM(require("fs"));
var DATA_DIR_ENV = "DATA_DIR";
function getDataDir() {
  return path.resolve(process.env[DATA_DIR_ENV] || path.join(process.cwd(), "data"));
}
function siteIndexToDirName(index) {
  return String(index + 1).padStart(2, "0");
}
function getSiteResourceDir(index, type) {
  return path.join(getDataDir(), "sites", siteIndexToDirName(index), type);
}
function safeFileName(url) {
  const segments = url.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "";
  let filtered = last.replace(/[^a-zA-Z0-9_.-]/g, "");
  filtered = filtered.replace(/[-.]+$/, "");
  return filtered || "resource";
}
function ensureSiteDir(index, type) {
  const dir = getSiteResourceDir(index, type);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
function getTmpSitesDir() {
  return path.join(getDataDir(), ".tmp-sites");
}
function cleanStaleTempDir() {
  const tmpDir = getTmpSitesDir();
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    logger.info("site-store", "Cleaned stale temp directory");
  }
}
function swapSiteDirectories() {
  const sitesDir = path.join(getDataDir(), "sites");
  const tmpDir = getTmpSitesDir();
  const backupDir = path.join(getDataDir(), ".sites-backup");
  if (fs.existsSync(backupDir)) {
    try {
      fs.rmSync(backupDir, { recursive: true, force: true });
    } catch (e) {
      logger.warn("site-store", `Failed to remove stale .sites-backup: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  if (fs.existsSync(sitesDir)) {
    try {
      fs.renameSync(sitesDir, backupDir);
    } catch (e) {
      logger.warn("site-store", `Rename to backup failed, falling back to rmSync: ${e instanceof Error ? e.message : String(e)}`);
      fs.rmSync(sitesDir, { recursive: true, force: true });
    }
    try {
      fs.renameSync(tmpDir, sitesDir);
      try {
        fs.rmSync(backupDir, { recursive: true, force: true });
      } catch (e) {
        logger.warn("site-store", `Synchronous cleanup of .sites-backup failed (next sync will retry): ${e instanceof Error ? e.message : String(e)}`);
      }
    } catch (e) {
      logger.error("site-store", `CRITICAL: tmp->sites rename failed; attempting restore from backup: ${e instanceof Error ? e.message : String(e)}`);
      try {
        if (fs.existsSync(backupDir)) {
          fs.renameSync(backupDir, sitesDir);
          logger.warn("site-store", "Restored sites/ from backup after swap failure");
        }
      } catch (restoreErr) {
        logger.error("site-store", `FATAL: restore from backup also failed: ${restoreErr instanceof Error ? restoreErr.message : String(restoreErr)}`);
      }
      throw e;
    }
  } else {
    fs.renameSync(tmpDir, sitesDir);
  }
  logger.info("site-store", "Swapped temp directory to sites");
}
function findCacheFile(dir, key) {
  try {
    const files = fs.readdirSync(dir);
    const prefix = key + "-";
    const match2 = files.find((f) => f.startsWith(prefix));
    return match2 ? path.join(dir, match2) : null;
  } catch {
    return null;
  }
}
async function cleanupZombieFiles(storage) {
  try {
    const sitesDir = path.join(getDataDir(), "sites");
    if (!fs.existsSync(sitesDir)) return;
    const whitelist = /* @__PURE__ */ new Set();
    const jarKeys = await storage.list("jar-source:");
    for (const key of jarKeys) {
      const hash = key.substring("jar-source:".length);
      whitelist.add(`${hash}.jar`);
    }
    const staticKeys = await storage.list("static-source:");
    for (const key of staticKeys) {
      const raw2 = await storage.get(key);
      if (!raw2) continue;
      try {
        const entry = JSON.parse(raw2);
        const hash = key.substring("static-source:".length);
        const ext = entry.type || "js";
        whitelist.add(`${hash}.${ext}`);
      } catch {
      }
    }
    let removed = 0;
    const indexEntries = fs.readdirSync(sitesDir, { withFileTypes: true });
    for (const indexDir of indexEntries) {
      if (!indexDir.isDirectory()) continue;
      const indexPath = path.join(sitesDir, indexDir.name);
      const typeEntries = fs.readdirSync(indexPath, { withFileTypes: true });
      for (const typeDir of typeEntries) {
        if (!typeDir.isDirectory()) continue;
        const typePath = path.join(indexPath, typeDir.name);
        for (const file of fs.readdirSync(typePath)) {
          if (whitelist.has(file)) continue;
          const filePath = path.join(typePath, file);
          fs.rmSync(filePath, { force: true });
          removed++;
          logger.info("site-store", `Zombie file removed: ${indexDir.name}/${typeDir.name}/${file}`);
        }
      }
    }
    logger.info("site-store", `Zombie cleanup complete: ${removed} files removed`);
  } catch (e) {
    logger.warn("site-store", `cleanupZombieFiles failed: ${e instanceof Error ? e.message : String(e)}`);
  }
}
async function cleanupOrphanedStaticSources(storage, merged) {
  try {
    const activeIndexes = /* @__PURE__ */ new Set();
    if (merged.sites) {
      for (let i = 0; i < merged.sites.length; i++) {
        activeIndexes.add(i);
      }
    }
    const staticKeys = await storage.list("static-source:");
    let removed = 0;
    for (const key of staticKeys) {
      const raw2 = await storage.get(key);
      if (!raw2) continue;
      try {
        const entry = JSON.parse(raw2);
        if (entry.index !== void 0 && !activeIndexes.has(entry.index)) {
          await storage.delete(key);
          removed++;
        }
      } catch {
      }
    }
    if (removed > 0) {
      logger.info("site-store", `Cleaned ${removed} orphaned static-source KV entries`);
    }
  } catch (e) {
    logger.warn("site-store", `cleanupOrphanedStaticSources failed: ${e instanceof Error ? e.message : String(e)}`);
  }
}

// src/core/jar-proxy.ts
var fs2 = __toESM(require("fs"));
var JAR_PREFIX = "jar:";
function parseSpiderString(spider) {
  let prefix = "";
  let rest = spider;
  if (rest.startsWith("img+")) {
    prefix = "img+";
    rest = rest.substring(4);
  }
  const md5Idx = rest.indexOf(";md5;");
  if (md5Idx !== -1) {
    const url = rest.substring(0, md5Idx);
    const md53 = rest.substring(md5Idx + 5);
    return { prefix, url, md5: md53, raw: spider };
  }
  return { prefix, url: rest, md5: null, raw: spider };
}
async function urlToKey(url) {
  const data = new TextEncoder().encode(url);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes.slice(0, 16)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function buildRewrittenSpider(spider, baseUrl, urlKeyMap) {
  if (!spider) return null;
  const parsed = parseSpiderString(spider);
  if (!parsed.url.startsWith("http://") && !parsed.url.startsWith("https://")) {
    return null;
  }
  const key = urlKeyMap.get(parsed.url);
  if (!key) return null;
  const proxyUrl = `${baseUrl.replace(/\/$/, "")}/jar/${key}`;
  if (parsed.md5) {
    return `${parsed.prefix}${proxyUrl};md5;${parsed.md5}`;
  }
  return `${parsed.prefix}${proxyUrl}`;
}
async function rewriteJarUrls(config2, baseUrl, storage, sourceIndexMap) {
  const uniqueJars = /* @__PURE__ */ new Map();
  if (config2.spider) {
    const parsed = parseSpiderString(config2.spider);
    if (parsed.url.startsWith("http://") || parsed.url.startsWith("https://")) {
      uniqueJars.set(parsed.url, { md5: parsed.md5 });
    }
  }
  for (const site of config2.sites || []) {
    if (site.jar) {
      const parsed = parseSpiderString(site.jar);
      if (parsed.url.startsWith("http://") || parsed.url.startsWith("https://")) {
        if (!uniqueJars.has(parsed.url)) {
          uniqueJars.set(parsed.url, { md5: parsed.md5 });
        }
      }
    }
  }
  if (uniqueJars.size === 0) {
    logger.info("jar-proxy", "No JAR URLs to rewrite");
    return config2;
  }
  const urlKeyMap = /* @__PURE__ */ new Map();
  for (const [url, { md5: md53 }] of uniqueJars) {
    const key = md53 || await urlToKey(url);
    urlKeyMap.set(url, key);
    await storage.put(`${JAR_PREFIX}${key}`, url);
    if (sourceIndexMap?.has(url)) {
      const index = sourceIndexMap.get(url);
      const name = safeFileName(url);
      await storage.put(`jar-source:${key}`, JSON.stringify({ index, hash: key.substring(0, 8), name }));
    }
    logger.info("jar-proxy", `Mapped ${key} \u2192 ${url.substring(0, 60)}...`);
  }
  logger.info("jar-proxy", `Wrote ${urlKeyMap.size} KV mappings`);
  const result = { ...config2 };
  if (result.spider) {
    const rewritten = buildRewrittenSpider(result.spider, baseUrl, urlKeyMap);
    if (rewritten) result.spider = rewritten;
  }
  if (result.sites) {
    result.sites = result.sites.map((site) => {
      if (!site.jar) return site;
      const rewritten = buildRewrittenSpider(site.jar, baseUrl, urlKeyMap);
      if (rewritten) return { ...site, jar: rewritten };
      return site;
    });
  }
  logger.info("jar-proxy", `Rewrote ${urlKeyMap.size} unique JAR URLs across config`);
  const { spider, ...rest } = result;
  const finalResult = spider ? { spider, ...rest } : rest;
  return finalResult;
}
async function lookupJarUrl(key, storage) {
  return storage.get(`${JAR_PREFIX}${key}`);
}
function isMd5Key(key) {
  return /^[0-9a-f]{32}$/i.test(key);
}
function getResourceUrlType(url) {
  try {
    const cleaned = url.split("?")[0].split("#")[0];
    if (cleaned.endsWith(".jar")) return "jar";
    if (cleaned.endsWith(".js")) return "js";
    if (cleaned.endsWith(".py")) return "py";
    if (cleaned.endsWith(".json")) return "json";
    if (cleaned.endsWith(".txt")) return "txt";
    return null;
  } catch {
    return null;
  }
}
function collectAllSiteResources(sites, parses) {
  const seen = /* @__PURE__ */ new Set();
  const resources = [];
  for (const site of sites) {
    if (site.jar) {
      const parsed = parseSpiderString(site.jar);
      if (parsed.url.startsWith("http://") || parsed.url.startsWith("https://")) {
        if (!seen.has(parsed.url)) {
          seen.add(parsed.url);
          resources.push({ url: parsed.url, type: "jar" });
        }
      }
    }
    if (site.api) {
      if (!seen.has(site.api)) {
        const type = getResourceUrlType(site.api);
        if (type) {
          seen.add(site.api);
          resources.push({ url: site.api, type });
        }
      }
    }
    if (site.ext) {
      extractExtUrls(site.ext, seen, resources);
    }
  }
  if (parses) {
    for (const parse2 of parses) {
      if (parse2.url && !seen.has(parse2.url)) {
        const type = getResourceUrlType(parse2.url);
        if (type) {
          seen.add(parse2.url);
          resources.push({ url: parse2.url, type });
        }
      }
      if (parse2.ext) {
        extractExtUrls(parse2.ext, seen, resources);
      }
    }
  }
  return resources;
}
function extractExtUrls(ext, seen, resources) {
  if (typeof ext === "string") {
    const extParts = ext.split(/[\s$;|]+/);
    for (const part of extParts) {
      if (!part.startsWith("http://") && !part.startsWith("https://")) continue;
      if (seen.has(part)) continue;
      const type = getResourceUrlType(part);
      if (type) {
        seen.add(part);
        resources.push({ url: part, type });
      }
    }
  } else if (typeof ext === "object" && ext !== null) {
    for (const val of Object.values(ext)) {
      if (typeof val !== "string") continue;
      if (!val.startsWith("http://") && !val.startsWith("https://")) continue;
      if (seen.has(val)) continue;
      const type = getResourceUrlType(val);
      if (type) {
        seen.add(val);
        resources.push({ url: val, type });
      }
    }
  }
}
async function rewriteNonJarUrls(config2, baseUrl, storage) {
  const result = { ...config2 };
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");
  let rewriteCount = 0;
  if (result.sites) {
    for (let i = 0; i < result.sites.length; i++) {
      const site = result.sites[i];
      if (site.api) {
        const apiType = getResourceUrlType(site.api);
        if (apiType && apiType !== "jar" && (site.api.startsWith("http://") || site.api.startsWith("https://"))) {
          const key = await urlToKey(site.api);
          const name = safeFileName(site.api);
          await storage.put(`static-source:${key}`, JSON.stringify({
            index: i,
            hash: key.substring(0, 8),
            name,
            type: apiType,
            url: site.api
          }));
          result.sites[i] = { ...site, api: `${cleanBaseUrl}/${apiType}/${key}.${apiType}` };
          rewriteCount++;
          logger.info("jar-proxy", `Rewrote site.api ${key} \u2192 ${apiType} (site ${i + 1})`);
        }
      }
      const currentSite = result.sites[i];
      if (currentSite.ext) {
        const rewrittenExt = await rewriteExtFieldAsync(currentSite.ext, cleanBaseUrl, i, storage);
        if (rewrittenExt !== null) {
          result.sites[i] = { ...currentSite, ext: rewrittenExt };
          rewriteCount++;
        }
      }
    }
  }
  if (result.parses) {
    for (let i = 0; i < result.parses.length; i++) {
      const parse2 = result.parses[i];
      if (parse2.url) {
        const urlType = getResourceUrlType(parse2.url);
        if (urlType && urlType !== "jar" && (parse2.url.startsWith("http://") || parse2.url.startsWith("https://"))) {
          const key = await urlToKey(parse2.url);
          const name = safeFileName(parse2.url);
          await storage.put(`static-source:${key}`, JSON.stringify({
            index: i,
            hash: key.substring(0, 8),
            name,
            type: urlType,
            url: parse2.url
          }));
          result.parses[i] = { ...parse2, url: `${cleanBaseUrl}/${urlType}/${key}.${urlType}` };
          rewriteCount++;
          logger.info("jar-proxy", `Rewrote parse.url ${key} \u2192 ${urlType} (parse ${i + 1})`);
        }
      }
      const currentParse = result.parses[i];
      if (currentParse.ext) {
        const rewrittenExt = await rewriteExtFieldAsync(currentParse.ext, cleanBaseUrl, i, storage);
        if (rewrittenExt !== null) {
          result.parses[i] = { ...currentParse, ext: rewrittenExt };
          rewriteCount++;
        }
      }
    }
  }
  logger.info("jar-proxy", `Rewrote ${rewriteCount} non-JAR URLs across config`);
  return result;
}
async function rewriteExtFieldAsync(ext, baseUrl, index, storage) {
  if (typeof ext === "string") {
    const parts = ext.split(/([\s$;|]+)/);
    let didRewrite = false;
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j];
      if (!part.startsWith("http://") && !part.startsWith("https://")) continue;
      const type = getResourceUrlType(part);
      if (!type || type === "jar") continue;
      const key = await urlToKey(part);
      const name = safeFileName(part);
      await storage.put(`static-source:${key}`, JSON.stringify({
        index,
        hash: key.substring(0, 8),
        name,
        type,
        url: part
      }));
      parts[j] = `${baseUrl}/${type}/${key}.${type}`;
      didRewrite = true;
    }
    return didRewrite ? parts.join("") : null;
  }
  if (typeof ext === "object" && ext !== null) {
    const newObj = {};
    let didRewrite = false;
    for (const [k, val] of Object.entries(ext)) {
      if (typeof val === "string" && (val.startsWith("http://") || val.startsWith("https://"))) {
        const type = getResourceUrlType(val);
        if (type && type !== "jar") {
          const key = await urlToKey(val);
          const name = safeFileName(val);
          await storage.put(`static-source:${key}`, JSON.stringify({
            index,
            hash: key.substring(0, 8),
            name,
            type,
            url: val
          }));
          newObj[k] = `${baseUrl}/${type}/${key}.${type}`;
          didRewrite = true;
          continue;
        }
      }
      newObj[k] = val;
    }
    return didRewrite ? newObj : null;
  }
  return null;
}
function sortResourcesByPriority(resources, spiderUrl) {
  if (!spiderUrl) return resources;
  const parsed = parseSpiderString(spiderUrl);
  const priority = [];
  const rest = [];
  for (const r of resources) {
    if (r.type === "jar" && r.url === parsed.url) {
      priority.push(r);
    } else {
      rest.push(r);
    }
  }
  return [...priority, ...rest];
}
function isUrlSafe(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
  if (process.env.DMZ !== "0") {
    const host = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, "");
    if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "0.0.0.0") return false;
    if (host.endsWith(".local") || host.endsWith(".internal")) return false;
    if (/^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.|169\.254\.)/.test(host)) return false;
    if (/^fe[89ab][0-9a-f]?:/i.test(host)) return false;
    if (host.startsWith("fc") || host.startsWith("fd")) return false;
  }
  return true;
}
async function downloadResource(url, timeoutMs) {
  if (!isUrlSafe(url)) {
    logger.security(`downloadResource blocked unsafe URL: ${url.length > 60 ? url.substring(0, 60) + "..." : url}`);
    return null;
  }
  const MAX_ATTEMPTS = 3;
  const HARD_DEADLINE_MS = 3e4;
  const deadlineStartedAt = Date.now();
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const elapsed = Date.now() - deadlineStartedAt;
    const remainingBudget = HARD_DEADLINE_MS - elapsed;
    if (remainingBudget <= Math.min(timeoutMs / 2, 5e3) && attempt > 1) {
      logger.warn("jar-proxy", `Download aborted \u2014 exceeded ${HARD_DEADLINE_MS}ms aggregate deadline after ${attempt - 1} attempts: ${url.substring(0, 60)}...`);
      return null;
    }
    const effectiveTimeout = Math.min(timeoutMs, Math.max(remainingBudget, 1e3));
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), effectiveTimeout);
    try {
      const resp = await fetch(url, {
        headers: { "User-Agent": "okhttp/3.12.0" },
        signal: controller.signal
      });
      if (!resp.ok) {
        if (attempt < MAX_ATTEMPTS) {
          const delay = Math.pow(2, attempt - 1) * 1e3;
          logger.warn("jar-proxy", `Download attempt ${attempt}/${MAX_ATTEMPTS} failed (HTTP ${resp.status}), retrying in ${delay}ms: ${url.substring(0, 60)}...`);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }
        return null;
      }
      return Buffer.from(await resp.arrayBuffer());
    } catch (e) {
      const isAbort = e instanceof Error && (e.name === "AbortError" || e instanceof DOMException && e.name === "AbortError");
      if (isAbort) {
        logger.warn("jar-proxy", `Download timed out after ${effectiveTimeout}ms (no retry): ${url.substring(0, 60)}...`);
        return null;
      }
      if (attempt < MAX_ATTEMPTS) {
        const delay = Math.pow(2, attempt - 1) * 1e3;
        logger.warn("jar-proxy", `Download attempt ${attempt}/${MAX_ATTEMPTS} failed, retrying in ${delay}ms: ${url.substring(0, 60)}...`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      logger.warn("jar-proxy", `Download failed after ${MAX_ATTEMPTS} attempts: ${url.substring(0, 60)}...`);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}
async function writeResourceCache(key, data, sourceDir, url, storage, index, type) {
  const safeIndex = Number.isFinite(index) && index >= 0 ? index : 0;
  const safeName = safeFileName(url);
  const fileName = `${key}.${type}`;
  const filePath = sourceDir.endsWith("/") || sourceDir.endsWith("\\") ? sourceDir + fileName : sourceDir + "/" + fileName;
  fs2.writeFileSync(filePath, data);
  await storage.put(`static-source:${key}`, JSON.stringify({ index: safeIndex, hash: key.substring(0, 8), name: safeName, type, url }));
  logger.info("jar-proxy", `Cached ${type} ${key} in site ${safeIndex + 1}: ${fileName}`);
}

// src/core/blacklist.ts
var EMPTY_BLACKLIST = {
  sites: [],
  parses: [],
  lives: [],
  regexRules: [],
  regexBlockOverrides: []
};
async function siteFingerprint(site) {
  const ext = typeof site.ext === "string" ? site.ext : JSON.stringify(site.ext || "");
  const raw2 = `${site.api}|${ext}|${site.jar || ""}`;
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw2));
  const arr = new Uint8Array(buf);
  return Array.from(arr.slice(0, 8)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function loadBlacklist(storage) {
  try {
    const raw2 = await storage.get(BLACKLIST);
    if (!raw2) return EMPTY_BLACKLIST;
    const parsed = JSON.parse(raw2);
    if (!Array.isArray(parsed.sites) || !Array.isArray(parsed.parses) || !Array.isArray(parsed.lives)) {
      logger.warn("blacklist", "Invalid structure, skipping");
      return EMPTY_BLACKLIST;
    }
    return {
      sites: parsed.sites,
      parses: parsed.parses,
      lives: parsed.lives,
      regexRules: Array.isArray(parsed.regexRules) ? parsed.regexRules : [],
      regexBlockOverrides: Array.isArray(parsed.regexBlockOverrides) ? parsed.regexBlockOverrides : []
    };
  } catch (e) {
    logger.error("blacklist", `Failed to load, skipping filter: ${e instanceof Error ? e.message : String(e)}`);
    return EMPTY_BLACKLIST;
  }
}
async function saveBlacklist(storage, blacklist) {
  await storage.put(BLACKLIST, JSON.stringify(blacklist));
}
var MAX_PATTERN_LENGTH = 200;
var NESTED_QUANTIFIER_RE = /\([^)]*[+*{][^)]*\)[+*{]/u;
function validateRegexPattern(pattern) {
  if (!pattern) {
    return { valid: false, error: "\u6B63\u5219\u6A21\u5F0F\u4E0D\u80FD\u4E3A\u7A7A" };
  }
  if (pattern.length > MAX_PATTERN_LENGTH) {
    return { valid: false, error: `\u6B63\u5219\u6A21\u5F0F\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7${MAX_PATTERN_LENGTH}\u5B57\u7B26` };
  }
  try {
    new RegExp(pattern, "u");
  } catch {
    return { valid: false, error: "\u6B63\u5219\u8BED\u6CD5\u65E0\u6548" };
  }
  if (NESTED_QUANTIFIER_RE.test(pattern)) {
    return { valid: false, error: "\u6B63\u5219\u5305\u542B\u5D4C\u5957\u91CF\u8BCD\uFF0C\u5B58\u5728ReDoS\u98CE\u9669" };
  }
  return { valid: true };
}
async function saveRegexRule(storage, pattern) {
  const validation = validateRegexPattern(pattern);
  if (!validation.valid) return { success: false, error: validation.error };
  const blacklist = await loadBlacklist(storage);
  const rule = {
    id: crypto.randomUUID(),
    pattern,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  blacklist.regexRules.push(rule);
  await saveBlacklist(storage, blacklist);
  return { success: true, rule };
}
async function deleteRegexRule(storage, ruleId) {
  const blacklist = await loadBlacklist(storage);
  const index = blacklist.regexRules.findIndex((r) => r.id === ruleId);
  if (index === -1) {
    return { success: false, error: "\u89C4\u5219\u4E0D\u5B58\u5728" };
  }
  blacklist.regexRules.splice(index, 1);
  await saveBlacklist(storage, blacklist);
  return { success: true };
}
function applyRegexFilter(sites, regexRules, regexBlockOverrides) {
  if (regexRules.length === 0) {
    return { sites, removedByRegex: 0, removedItems: [] };
  }
  const overrideSet = new Set(regexBlockOverrides);
  const compiled = [];
  for (const rule of regexRules) {
    try {
      compiled.push(new RegExp(rule.pattern, "u"));
    } catch {
      logger.warn("blacklist", "Skipping invalid regex pattern: " + rule.pattern);
    }
  }
  const filtered = [];
  let removedByRegex = 0;
  const removedItems = [];
  for (const site of sites) {
    const name = site.name || "";
    if (overrideSet.has(name)) {
      filtered.push(site);
      continue;
    }
    let blocked = false;
    for (const re of compiled) {
      if (re.test(name)) {
        removedByRegex++;
        blocked = true;
        removedItems.push({
          kind: "regex-site",
          key: site.key,
          name: site.name,
          url: site.api,
          pattern: re.source
        });
        break;
      }
    }
    if (!blocked) {
      filtered.push(site);
    }
  }
  return { sites: filtered, removedByRegex, removedItems };
}
async function applyBlacklist(config2, blacklist) {
  const siteSet = new Set(blacklist.sites);
  const parseSet = new Set(blacklist.parses);
  const liveSet = new Set(blacklist.lives);
  let removedSites = 0;
  let removedParses = 0;
  let removedLives = 0;
  const removedItems = [];
  let sites = config2.sites || [];
  if (siteSet.size > 0) {
    const filtered = [];
    for (const site of sites) {
      const fp = await siteFingerprint(site);
      if (siteSet.has(fp)) {
        removedSites++;
        removedItems.push({
          kind: "site",
          key: site.key,
          name: site.name,
          url: site.api,
          fingerprint: fp
        });
      } else {
        filtered.push(site);
      }
    }
    sites = filtered;
  }
  let removedByRegex = 0;
  if (blacklist.regexRules.length > 0) {
    const regexResult = applyRegexFilter(sites, blacklist.regexRules, blacklist.regexBlockOverrides);
    sites = regexResult.sites;
    removedByRegex = regexResult.removedByRegex;
    removedItems.push(...regexResult.removedItems);
  }
  let parses = config2.parses || [];
  if (parseSet.size > 0) {
    parses = parses.filter((p) => {
      if (parseSet.has(p.url)) {
        removedParses++;
        removedItems.push({
          kind: "parse",
          name: p.name,
          url: p.url
        });
        return false;
      }
      return true;
    });
  }
  let lives = config2.lives || [];
  if (liveSet.size > 0) {
    lives = lives.filter((l) => {
      const url = l.url || l.api || "";
      if (url && liveSet.has(url)) {
        removedLives++;
        removedItems.push({
          kind: "live",
          name: l.name,
          url
        });
        return false;
      }
      return true;
    });
  }
  return {
    config: { ...config2, sites, parses, lives },
    removedSites,
    removedParses,
    removedLives,
    removedByRegex,
    removedItems
  };
}
async function generateExportConfig(merged, blacklist, liveDisabled) {
  const { config: filtered } = await applyBlacklist(merged, blacklist);
  if (liveDisabled) {
    filtered.lives = [];
  }
  delete filtered.pic;
  return filtered;
}
async function patchMergedConfig(storage) {
  const fullRaw = await storage.get(MERGED_CONFIG_FULL);
  if (!fullRaw) {
    logger.warn("blacklist", "patchMergedConfig: MERGED_CONFIG_FULL is null, skipping");
    return { patched: false, reason: "MERGED_CONFIG_FULL not available" };
  }
  let full;
  try {
    full = JSON.parse(fullRaw);
  } catch (e) {
    logger.error("blacklist", `patchMergedConfig: failed to parse MERGED_CONFIG_FULL, skipping: ${e instanceof Error ? e.message : String(e)}`);
    return { patched: false, reason: "Failed to parse MERGED_CONFIG_FULL" };
  }
  const blacklist = await loadBlacklist(storage);
  const { config: filtered } = await applyBlacklist(full, blacklist);
  const liveDisabledRaw = await storage.get(LIVE_DISABLED);
  const liveDisabled = liveDisabledRaw !== "false";
  if (liveDisabled) {
    logger.info("blacklist", "patchMergedConfig: live_disabled=true, clearing lives");
    filtered.lives = [];
  }
  logger.info("blacklist", "patchMergedConfig: reapplying JAR rewrite with placeholder");
  const result = await rewriteJarUrls(filtered, BASE_URL_PLACEHOLDER, storage);
  await storage.put(MERGED_CONFIG, JSON.stringify(result));
  const exportConfig = await generateExportConfig(full, blacklist, liveDisabled);
  delete exportConfig.pic;
  await storage.put(EXPORT_CONFIG, JSON.stringify(exportConfig));
  logger.infoFields("blacklist", "export-config-patched", {
    sites: exportConfig.sites?.length || 0,
    parses: exportConfig.parses?.length || 0,
    lives: exportConfig.lives?.length || 0
  });
  await storage.put(LAST_UPDATE, (/* @__PURE__ */ new Date()).toISOString());
  const skipped = ["name transforms (Step 5.5)", "credential injection (Step 5.7)", "search quota (Step 4.7)", "empty-entry cleanup (Step 4.6)", "image proxy prefix (Step 7.5)"];
  const liveNote = liveDisabled ? "; live_disabled=true \u2192 lives cleared" : "";
  return { patched: true, warning: `Instant patch reapplied blacklist + JAR rewrite${liveNote}. Skipped: ${skipped.join(", ")}; full sync will resolve differences` };
}
async function pruneBlacklist(blacklist, currentConfig) {
  const currentSiteFps = /* @__PURE__ */ new Set();
  for (const site of currentConfig.sites || []) {
    currentSiteFps.add(await siteFingerprint(site));
  }
  const currentParseUrls = new Set((currentConfig.parses || []).map((p) => p.url));
  const currentLiveUrls = new Set(
    (currentConfig.lives || []).map((l) => l.url || l.api || "").filter(Boolean)
  );
  const prunedSites = blacklist.sites.filter((fp) => currentSiteFps.has(fp));
  const prunedParses = blacklist.parses.filter((url) => currentParseUrls.has(url));
  const prunedLives = blacklist.lives.filter((url) => currentLiveUrls.has(url));
  const removed = blacklist.sites.length - prunedSites.length + (blacklist.parses.length - prunedParses.length) + (blacklist.lives.length - prunedLives.length);
  if (removed > 0) {
    logger.info("blacklist", `Pruned ${removed} stale entries`);
  }
  return {
    sites: prunedSites,
    parses: prunedParses,
    lives: prunedLives,
    regexRules: blacklist.regexRules,
    regexBlockOverrides: blacklist.regexBlockOverrides
  };
}

// src/routes/settings.ts
function createSettingsRouter(deps) {
  const { storage, config: config2 } = deps;
  const router = new Hono2();
  router.use("/admin/*", adminAuthMiddleware(config2));
  router.get("/admin/name-transform", async (c) => {
    const raw2 = await storage.get(NAME_TRANSFORM);
    const transform = raw2 ? JSON.parse(raw2) : {};
    return c.json(transform);
  });
  router.put("/admin/name-transform", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const transform = {
      prefix: body.prefix || void 0,
      suffix: body.suffix || void 0
    };
    await storage.put(NAME_TRANSFORM, JSON.stringify(transform));
    return c.json({ success: true });
  });
  router.get("/admin/cron-interval", async (c) => {
    const raw2 = await storage.get(CRON_INTERVAL);
    let schedule2 = { ...DEFAULT_SYNC_SCHEDULE };
    if (raw2) {
      try {
        const parsed = JSON.parse(raw2);
        if (parsed && typeof parsed === "object" && parsed.period) {
          schedule2 = parsed;
        }
      } catch {
      }
    }
    const hasEnvOverride = !!deps.cronEnvSchedule;
    const effectiveSchedule = hasEnvOverride ? deps.cronEnvSchedule : schedule2;
    return c.json({ schedule: effectiveSchedule, hasEnvOverride });
  });
  router.put("/admin/cron-interval", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const schedule2 = body.schedule;
    if (!schedule2 || !schedule2.period) {
      return c.json({ error: "schedule with period is required" }, 400);
    }
    const validPeriods = ["daily", "weekly", "disabled"];
    if (!validPeriods.includes(schedule2.period)) {
      return c.json({ error: `period must be one of: ${validPeriods.join(", ")}` }, 400);
    }
    if (schedule2.period !== "disabled") {
      if (typeof schedule2.hour !== "number" || schedule2.hour < 0 || schedule2.hour > 23) {
        return c.json({ error: "hour must be 0-23" }, 400);
      }
      if (typeof schedule2.minute !== "number" || schedule2.minute < 0 || schedule2.minute > 59) {
        return c.json({ error: "minute must be 0-59" }, 400);
      }
    }
    if (schedule2.period === "weekly") {
      if (typeof schedule2.dayOfWeek !== "number" || schedule2.dayOfWeek < 0 || schedule2.dayOfWeek > 6) {
        return c.json({ error: "dayOfWeek must be 0-6 (0=Sunday)" }, 400);
      }
    }
    await storage.put(CRON_INTERVAL, JSON.stringify(schedule2));
    if (deps.onCronScheduleChange) {
      deps.onCronScheduleChange(schedule2);
    }
    return c.json({ success: true, schedule: schedule2 });
  });
  router.get("/admin/speed-test", async (c) => {
    const raw2 = await storage.get(SPEED_TEST_ENABLED);
    return c.json({ enabled: raw2 !== "false" });
  });
  router.put("/admin/speed-test", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    if (typeof body.enabled !== "boolean") {
      return c.json({ error: "enabled must be a boolean" }, 400);
    }
    await storage.put(SPEED_TEST_ENABLED, String(body.enabled));
    return c.json({ success: true, enabled: body.enabled });
  });
  router.get("/admin/smart-jar-url", async (c) => {
    const raw2 = await storage.get(SMART_JAR_URL_ENABLED);
    return c.json({ enabled: raw2 === "true" });
  });
  router.put("/admin/smart-jar-url", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    if (typeof body.enabled !== "boolean") {
      return c.json({ error: "enabled must be a boolean" }, 400);
    }
    await storage.put(SMART_JAR_URL_ENABLED, String(body.enabled));
    return c.json({ success: true, enabled: body.enabled });
  });
  router.get("/admin/live-disabled", async (c) => {
    const raw2 = await storage.get(LIVE_DISABLED);
    return c.json({ disabled: raw2 !== "false" });
  });
  router.put("/admin/live-disabled", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    if (typeof body.disabled !== "boolean") {
      return c.json({ error: "disabled must be a boolean" }, 400);
    }
    await storage.put(LIVE_DISABLED, String(body.disabled));
    let patched = false;
    try {
      const result = await patchMergedConfig(storage);
      patched = result.patched;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      logger.warnFields("blacklist", "live-disabled-patch-failed", {
        disabled: body.disabled,
        error: msg
      });
    }
    logger.debugFields("blacklist", "live-disabled-set", {
      disabled: body.disabled,
      patched
    });
    return c.json({ success: true, disabled: body.disabled, patched });
  });
  router.get("/admin/edge-proxies", async (c) => {
    const raw2 = await storage.get(EDGE_PROXIES);
    return c.json(raw2 ? JSON.parse(raw2) : {});
  });
  router.put("/admin/edge-proxies", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const clean = {
      fetchProxy: body.fetchProxy?.replace(/\/+$/, "") || void 0,
      vercel: body.vercel?.replace(/\/+$/, "") || void 0
    };
    await storage.put(EDGE_PROXIES, JSON.stringify(clean));
    return c.json({ success: true, ...clean });
  });
  return router;
}

// src/core/search-quota.ts
async function loadSearchQuota(storage) {
  const raw2 = await storage.get(SEARCH_QUOTA);
  if (raw2) {
    try {
      return JSON.parse(raw2);
    } catch {
    }
  }
  return { maxSearchable: 0, pinnedKeys: [] };
}
async function saveSearchQuota(storage, config2) {
  await storage.put(SEARCH_QUOTA, JSON.stringify(config2));
}
function applySearchQuota(sites, config2) {
  const limit = config2.maxSearchable;
  const totalSites = sites.length;
  let jsExcluded = 0;
  sites = sites.map((site) => {
    if (site.type === 3 && site.searchable === 1 && /^https?:\/\//.test(site.api)) {
      jsExcluded++;
      return { ...site, searchable: 0 };
    }
    return site;
  });
  const siteByKey = new Map(sites.map((s) => [s.key, s]));
  const pinned = [];
  for (const key of config2.pinnedKeys) {
    const site = siteByKey.get(key);
    if (site) pinned.push(site);
  }
  const pinnedKeySet = new Set(pinned.map((s) => s.key));
  const rest = sites.filter((s) => !pinnedKeySet.has(s.key));
  sites = [...pinned, ...rest];
  let truncated = 0;
  if (limit > 0) {
    let count = 0;
    sites = sites.map((site) => {
      if (site.searchable !== 1) return site;
      count++;
      if (count > limit) {
        truncated++;
        return { ...site, searchable: 0 };
      }
      return site;
    });
  }
  const searchable = sites.filter((s) => s.searchable === 1).length;
  const pinnedCount = pinned.filter((s) => s.searchable === 1).length;
  return {
    sites,
    quotaReport: { totalSites, jsExcluded, searchable, pinnedCount, truncated }
  };
}

// src/routes/search-quota.ts
function createSearchQuotaRouter(deps) {
  const { storage, config: config2 } = deps;
  const router = new Hono2();
  const auth = adminAuthMiddleware(config2);
  router.get("/admin/search-quota", auth, async (c) => {
    const quota = await loadSearchQuota(storage);
    return c.json(quota);
  });
  router.put("/admin/search-quota", auth, async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const current = await loadSearchQuota(storage);
    if (typeof body.maxSearchable === "number") current.maxSearchable = body.maxSearchable;
    if (Array.isArray(body.pinnedKeys)) current.pinnedKeys = body.pinnedKeys;
    await saveSearchQuota(storage, current);
    return c.json({ success: true, ...current });
  });
  router.post("/admin/search-quota/pinned", auth, async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    if (!Array.isArray(body.keys)) return c.json({ error: "keys must be an array" }, 400);
    const current = await loadSearchQuota(storage);
    const set = new Set(current.pinnedKeys);
    for (const key of body.keys) set.add(key);
    current.pinnedKeys = [...set];
    await saveSearchQuota(storage, current);
    return c.json({ success: true, pinnedKeys: current.pinnedKeys });
  });
  router.put("/admin/search-quota/pinned", auth, async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    if (!Array.isArray(body.keys)) return c.json({ error: "keys must be an array" }, 400);
    const current = await loadSearchQuota(storage);
    current.pinnedKeys = body.keys;
    await saveSearchQuota(storage, current);
    return c.json({ success: true, pinnedKeys: current.pinnedKeys });
  });
  router.delete("/admin/search-quota/pinned", auth, async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    if (!Array.isArray(body.keys)) return c.json({ error: "keys must be an array" }, 400);
    const current = await loadSearchQuota(storage);
    const removeSet = new Set(body.keys);
    current.pinnedKeys = current.pinnedKeys.filter((k) => !removeSet.has(k));
    await saveSearchQuota(storage, current);
    return c.json({ success: true, pinnedKeys: current.pinnedKeys });
  });
  router.get("/admin/search-quota/report", auth, async (c) => {
    const raw2 = await storage.get(SEARCH_QUOTA_REPORT);
    if (!raw2) return c.json({ error: "No report yet. Run sync first." }, 404);
    return c.json(JSON.parse(raw2));
  });
  router.get("/search-quota/summary", async (c) => {
    const raw2 = await storage.get(SEARCH_QUOTA_REPORT);
    if (!raw2) return c.json({ enabled: false });
    return c.json({ enabled: true, ...JSON.parse(raw2) });
  });
  return router;
}

// src/core/cloud-login.ts
var import_crypto5 = require("crypto");
var BILI_APPKEY = "4409e2ce8ffd12b8";
var BILI_APPSEC = "59b43e04ad6965f34319062b478f83dd";
async function biliSign(params) {
  const sorted = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("&");
  const raw2 = sorted + BILI_APPSEC;
  const hash = md52(raw2);
  return sorted + "&sign=" + hash;
}
function md52(text) {
  return (0, import_crypto5.createHash)("md5").update(text).digest("hex");
}
var bilibiliHandler = {
  async generateQR() {
    const ts = Math.floor(Date.now() / 1e3).toString();
    const params = { appkey: BILI_APPKEY, local_id: "0", ts };
    const body = await biliSign(params);
    const resp = await fetch("https://passport.bilibili.com/x/passport-tv-login/qrcode/auth_code", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });
    const data = await resp.json();
    if (data.code !== 0) throw new Error(data.message || "Bilibili QR generate failed");
    return {
      qrUrl: data.data.url,
      token: data.data.auth_code
    };
  },
  async pollStatus(token) {
    const ts = Math.floor(Date.now() / 1e3).toString();
    const params = { appkey: BILI_APPKEY, auth_code: token, local_id: "0", ts };
    const body = await biliSign(params);
    const resp = await fetch("https://passport.bilibili.com/x/passport-tv-login/qrcode/poll", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });
    const data = await resp.json();
    if (data.code === 0) {
      const cookies = data.data?.cookie_info?.cookies || [];
      const cookieParts = [];
      for (const c of cookies) {
        cookieParts.push(`${c.name}=${c.value}`);
      }
      return {
        status: "confirmed",
        credential: { cookie: cookieParts.join("; ") }
      };
    }
    if (data.code === 86090) return { status: "scanned" };
    if (data.code === 86038) return { status: "expired" };
    return { status: "waiting" };
  }
};
var aliyunHandler = {
  async generateQR() {
    const resp = await fetch("https://passport.aliyundrive.com/newlogin/qrcode/generate.do?appName=aliyun_drive&fromSite=52&appEntrance=web&_bx-v=2.5.6", {
      method: "GET",
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const data = await resp.json();
    const content = data?.content?.data;
    if (!content?.codeContent) throw new Error("Aliyun QR generate failed");
    return {
      qrUrl: content.codeContent,
      token: JSON.stringify({ t: content.t, ck: content.ck || "" })
    };
  },
  async pollStatus(token) {
    const { t, ck } = JSON.parse(token);
    const body = new URLSearchParams({
      t: String(t),
      ck: ck || "",
      appName: "aliyun_drive",
      appEntrance: "web",
      fromSite: "52",
      "_bx-v": "2.5.6"
    });
    const resp = await fetch("https://passport.aliyundrive.com/newlogin/qrcode/query.do", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });
    const data = await resp.json();
    const content = data?.content?.data;
    if (!content) return { status: "error", message: "Invalid response" };
    const qrStatus = content.qrCodeStatus;
    if (qrStatus === "CONFIRMED") {
      try {
        const bizJson = JSON.parse(atob(content.bizExt));
        const loginResult = bizJson.pds_login_result;
        return {
          status: "confirmed",
          credential: {
            refresh_token: loginResult?.refreshToken || "",
            access_token: loginResult?.accessToken || ""
          }
        };
      } catch {
        return { status: "error", message: "Failed to parse login result" };
      }
    }
    if (qrStatus === "SCANED") return { status: "scanned" };
    if (qrStatus === "EXPIRED") return { status: "expired" };
    return { status: "waiting" };
  }
};
var quarkHandler = {
  async generateQR() {
    const requestId = crypto.randomUUID();
    const resp = await fetch(`https://uop.quark.cn/cas/ajax/getTokenForQrcodeLogin?client_id=532&v=1.2&request_id=${requestId}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const data = await resp.json();
    if (data.status !== 200 || !data.data?.members?.token) {
      throw new Error(data.message || "Quark QR generate failed");
    }
    const token = data.data.members.token;
    return {
      qrUrl: `https://su.quark.cn/4_eMHBJ?token=${token}&client_id=532&ssb=weblogin`,
      token
    };
  },
  async pollStatus(token) {
    const resp = await fetch(`https://uop.quark.cn/cas/ajax/getServiceTicketByQrcodeToken?client_id=532&token=${token}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const data = await resp.json();
    const status = data.data?.members?.status;
    if (status === "CONFIRMED") {
      const serviceTicket = data.data?.members?.service_ticket;
      if (!serviceTicket) return { status: "error", message: "No service ticket" };
      try {
        const loginResp = await fetch(`https://pan.quark.cn/account/info?st=${serviceTicket}&lw=scan`, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
          redirect: "manual"
        });
        const setCookies = loginResp.headers.getSetCookie?.() || [];
        const cookieParts = [];
        for (const sc of setCookies) {
          const part = sc.split(";")[0];
          if (part) cookieParts.push(part);
        }
        if (cookieParts.length > 0) {
          return { status: "confirmed", credential: { cookie: cookieParts.join("; ") } };
        }
        return { status: "confirmed", credential: { cookie: `__st=${serviceTicket}` } };
      } catch (err) {
        return { status: "error", message: `Cookie exchange failed: ${err}` };
      }
    }
    if (status === "SCANED") return { status: "scanned" };
    if (status === "EXPIRED") return { status: "expired" };
    return { status: "waiting" };
  }
};
var ucHandler = {
  async generateQR() {
    const requestId = crypto.randomUUID();
    const resp = await fetch(`https://api.open.uc.cn/cas/ajax/getTokenForQrcodeLogin?client_id=381&v=1.2&request_id=${requestId}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const data = await resp.json();
    if (data.status !== 200 || !data.data?.members?.token) {
      throw new Error(data.message || "UC QR generate failed");
    }
    const token = data.data.members.token;
    return {
      qrUrl: `https://su.quark.cn/4_eMHBJ?token=${token}&client_id=381&ssb=weblogin`,
      token
    };
  },
  async pollStatus(token) {
    const resp = await fetch(`https://api.open.uc.cn/cas/ajax/getServiceTicketByQrcodeToken?client_id=381&token=${token}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const data = await resp.json();
    const status = data.data?.members?.status;
    if (status === "CONFIRMED") {
      const serviceTicket = data.data?.members?.service_ticket;
      if (!serviceTicket) return { status: "error", message: "No service ticket" };
      try {
        const loginResp = await fetch(`https://drive.uc.cn/account/info?st=${serviceTicket}&lw=scan`, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
          redirect: "manual"
        });
        const setCookies = loginResp.headers.getSetCookie?.() || [];
        const cookieParts = [];
        for (const sc of setCookies) {
          const part = sc.split(";")[0];
          if (part) cookieParts.push(part);
        }
        if (cookieParts.length > 0) {
          return { status: "confirmed", credential: { cookie: cookieParts.join("; ") } };
        }
        return { status: "confirmed", credential: { cookie: `__st=${serviceTicket}` } };
      } catch (err) {
        return { status: "error", message: `Cookie exchange failed: ${err}` };
      }
    }
    if (status === "SCANED") return { status: "scanned" };
    if (status === "EXPIRED") return { status: "expired" };
    return { status: "waiting" };
  }
};
var pan115Handler = {
  async generateQR() {
    const resp = await fetch("https://qrcodeapi.115.com/api/1.0/web/1.0/token/", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const data = await resp.json();
    if (!data?.data?.uid) throw new Error("115 QR generate failed");
    return {
      qrUrl: `https://qrcodeapi.115.com/api/1.0/web/1.0/qrcode?uid=${data.data.uid}`,
      token: JSON.stringify({ uid: data.data.uid, time: data.data.time, sign: data.data.sign })
    };
  },
  async pollStatus(token) {
    const { uid, time, sign } = JSON.parse(token);
    const resp = await fetch(`https://qrcodeapi.115.com/get/status/?uid=${uid}&time=${time}&sign=${sign}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const data = await resp.json();
    if (data?.data?.status === 2) {
      try {
        const loginResp = await fetch("https://passportapi.115.com/app/1.0/web/1.0/login/qrcode/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
          },
          body: `account=${uid}&app=web`
        });
        const loginData = await loginResp.json();
        const cookie = loginData?.data?.cookie;
        if (cookie) {
          const parts = Object.entries(cookie).map(([k, v]) => `${k}=${v}`).join("; ");
          return { status: "confirmed", credential: { cookie: parts } };
        }
        return { status: "error", message: "No cookie in login response" };
      } catch (err) {
        return { status: "error", message: `Login failed: ${err}` };
      }
    }
    if (data?.data?.status === 1) return { status: "scanned" };
    if (data?.data?.status === -2) return { status: "expired" };
    return { status: "waiting" };
  }
};
var tianyiHandler = {
  async generateQR() {
    const resp = await fetch("https://open.e.189.cn/api/logbox/oauth2/getQrcImg.do", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://open.e.189.cn/"
      },
      body: "appId=8025431004"
    });
    const data = await resp.json();
    if (data?.result !== 0 || !data?.uuid) throw new Error(data?.msg || "Tianyi QR generate failed");
    return {
      qrUrl: `https://open.e.189.cn/api/logbox/oauth2/qrImg.do?uuid=${data.uuid}`,
      token: data.uuid
    };
  },
  async pollStatus(token) {
    const resp = await fetch("https://open.e.189.cn/api/logbox/oauth2/qrcodeLoginState.do", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://open.e.189.cn/"
      },
      body: `uuid=${token}&appId=8025431004`
    });
    const data = await resp.json();
    if (data?.result === 0 && data?.redirectUrl) {
      try {
        const redirectResp = await fetch(data.redirectUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
          redirect: "manual"
        });
        const setCookies = redirectResp.headers.getSetCookie?.() || [];
        const cookieParts = [];
        for (const sc of setCookies) {
          const part = sc.split(";")[0];
          if (part) cookieParts.push(part);
        }
        if (cookieParts.length > 0) {
          return { status: "confirmed", credential: { cookie: cookieParts.join("; ") } };
        }
      } catch {
      }
      return { status: "confirmed", credential: { cookie: "" } };
    }
    if (data?.result === 0 && data?.status === 1) return { status: "scanned" };
    if (data?.result === -1 || data?.status === -1) return { status: "expired" };
    return { status: "waiting" };
  }
};
var baiduHandler = {
  async generateQR() {
    const resp = await fetch("https://passport.baidu.com/v2/api/getqrcode?lp=pc&qrloginfrom=pc&gid=" + generateGid(), {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const data = await resp.json();
    if (!data?.imgurl || !data?.sign) throw new Error("Baidu QR generate failed");
    return {
      qrUrl: `https://${data.imgurl}`,
      token: data.sign
    };
  },
  async pollStatus(token) {
    const resp = await fetch(`https://passport.baidu.com/channel/unicast?channel_id=${token}&tpl=netdisk&gid=${generateGid()}&apiver=v3`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const data = await resp.json();
    if (data?.errno === 0 && data?.channel_v) {
      try {
        const channelData = JSON.parse(data.channel_v);
        if (channelData.status === 0) {
          const loginResp = await fetch(`https://passport.baidu.com/v3/login/main/qrbdusslogin?bduss=${channelData.v}&loginVersion=v5`, {
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
            redirect: "manual"
          });
          const setCookies = loginResp.headers.getSetCookie?.() || [];
          const cookieParts = [];
          for (const sc of setCookies) {
            const part = sc.split(";")[0];
            if (part && (part.includes("BDUSS") || part.includes("STOKEN"))) {
              cookieParts.push(part);
            }
          }
          if (cookieParts.length > 0) {
            return { status: "confirmed", credential: { cookie: cookieParts.join("; ") } };
          }
          return { status: "confirmed", credential: { cookie: `BDUSS=${channelData.v}` } };
        }
        if (channelData.status === 1) return { status: "scanned" };
      } catch {
      }
    }
    if (data?.errno === 1) return { status: "waiting" };
    if (data?.errno === -1) return { status: "expired" };
    return { status: "waiting" };
  }
};
function generateGid() {
  return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : r & 3 | 8).toString(16).toUpperCase();
  });
}
var pan123Handler = {
  async generateQR() {
    const resp = await fetch("https://www.123pan.com/api/user/sign_in/qr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Platform": "web"
      },
      body: JSON.stringify({})
    });
    const data = await resp.json();
    if (data?.code !== 0 || !data?.data?.qrCode) throw new Error(data?.message || "123 QR generate failed");
    return {
      qrUrl: data.data.qrCode,
      token: data.data.requestId || data.data.request_id || ""
    };
  },
  async pollStatus(token) {
    const resp = await fetch(`https://www.123pan.com/api/user/sign_in/qr/result?requestId=${token}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Platform": "web"
      }
    });
    const data = await resp.json();
    if (data?.code === 0 && data?.data?.token) {
      return {
        status: "confirmed",
        credential: { token: data.data.token }
      };
    }
    if (data?.data?.status === 1) return { status: "scanned" };
    if (data?.code === 400 || data?.data?.expired) return { status: "expired" };
    return { status: "waiting" };
  }
};
var thunderHandler = {
  async passwordLogin(username, password) {
    if (!username || !password) {
      return { success: false, message: "\u8BF7\u8F93\u5165\u8D26\u53F7\u548C\u5BC6\u7801" };
    }
    return {
      success: true,
      credential: { username, password }
    };
  }
};
var pikpakHandler = {
  async passwordLogin(username, password) {
    if (!username || !password) {
      return { success: false, message: "\u8BF7\u8F93\u5165\u8D26\u53F7\u548C\u5BC6\u7801" };
    }
    try {
      const resp = await fetch("https://user.mypikpak.com/v1/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: "YNxT9w7GMdWvEOKa",
          username,
          password
        })
      });
      const data = await resp.json();
      if (data?.access_token) {
        return {
          success: true,
          credential: { username, password }
        };
      }
      return { success: false, message: data?.error_description || "\u767B\u5F55\u5931\u8D25" };
    } catch (err) {
      return {
        success: true,
        credential: { username, password }
      };
    }
  }
};
var HANDLERS = {
  bilibili: bilibiliHandler,
  aliyun: aliyunHandler,
  quark: quarkHandler,
  uc: ucHandler,
  pan115: pan115Handler,
  tianyi: tianyiHandler,
  baidu: baiduHandler,
  pan123: pan123Handler,
  thunder: thunderHandler,
  pikpak: pikpakHandler
};
var PASSWORD_PLATFORMS = ["thunder", "pikpak"];
var QR_PLATFORMS = ["bilibili", "aliyun", "quark", "uc", "pan115", "tianyi", "baidu", "pan123"];
var PLATFORM_NAMES = {
  aliyun: "\u963F\u91CC\u4E91\u76D8",
  bilibili: "Bilibili",
  quark: "\u5938\u514B\u7F51\u76D8",
  uc: "UC \u7F51\u76D8",
  pan115: "115 \u7F51\u76D8",
  tianyi: "\u5929\u7FFC\u4E91\u76D8",
  baidu: "\u767E\u5EA6\u7F51\u76D8",
  pan123: "123 \u7F51\u76D8",
  thunder: "\u8FC5\u96F7",
  pikpak: "PikPak"
};
async function generateQR(platform) {
  const handler = HANDLERS[platform];
  if (!handler?.generateQR) throw new Error(`Platform ${platform} does not support QR login`);
  return handler.generateQR();
}
async function pollQRStatus(platform, token) {
  const handler = HANDLERS[platform];
  if (!handler?.pollStatus) throw new Error(`Platform ${platform} does not support QR login`);
  return handler.pollStatus(token);
}
async function passwordLogin(platform, username, password) {
  const handler = HANDLERS[platform];
  if (!handler?.passwordLogin) throw new Error(`Platform ${platform} does not support password login`);
  return handler.passwordLogin(username, password);
}

// src/core/credential-store.ts
var import_crypto6 = require("crypto");
var subtle = import_crypto6.webcrypto.subtle;
async function getOrCreateEncryptionKey(storage) {
  const raw2 = await storage.get(CREDENTIAL_ENCRYPTION_KEY);
  if (raw2) {
    const keyData = Uint8Array.from(atob(raw2), (c) => c.charCodeAt(0));
    return subtle.importKey("raw", keyData, "AES-GCM", false, ["encrypt", "decrypt"]);
  }
  const key = await subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  const exported = await subtle.exportKey("raw", key);
  const b64 = btoa(String.fromCharCode(...new Uint8Array(exported)));
  await storage.put(CREDENTIAL_ENCRYPTION_KEY, b64);
  return subtle.importKey("raw", exported, "AES-GCM", false, ["encrypt", "decrypt"]);
}
async function encrypt(key, plaintext) {
  const iv = import_crypto6.webcrypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.length);
  return btoa(String.fromCharCode(...combined));
}
async function decrypt(key, encrypted) {
  const combined = Uint8Array.from(atob(encrypted), (c) => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);
  const plainBuffer = await subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  return new TextDecoder().decode(plainBuffer);
}
async function loadCredentials(storage) {
  const map = /* @__PURE__ */ new Map();
  const raw2 = await storage.get(CLOUD_CREDENTIALS);
  if (!raw2) return map;
  try {
    const key = await getOrCreateEncryptionKey(storage);
    const json = await decrypt(key, raw2);
    const arr = JSON.parse(json);
    for (const cred of arr) {
      map.set(cred.platform, cred);
    }
  } catch (err) {
    logger.error("credential-store", `Failed to decrypt credentials: ${err instanceof Error ? err.message : String(err)}`);
  }
  return map;
}
async function saveCredential(storage, credential) {
  const existing = await loadCredentials(storage);
  existing.set(credential.platform, credential);
  const key = await getOrCreateEncryptionKey(storage);
  const json = JSON.stringify([...existing.values()]);
  const encrypted = await encrypt(key, json);
  await storage.put(CLOUD_CREDENTIALS, encrypted);
}
async function deleteCredential(storage, platform) {
  const existing = await loadCredentials(storage);
  if (!existing.has(platform)) return;
  existing.delete(platform);
  const key = await getOrCreateEncryptionKey(storage);
  if (existing.size === 0) {
    await storage.put(CLOUD_CREDENTIALS, "");
    return;
  }
  const json = JSON.stringify([...existing.values()]);
  const encrypted = await encrypt(key, json);
  await storage.put(CLOUD_CREDENTIALS, encrypted);
}
var DEFAULT_POLICY = {
  allowedHighRiskKeys: [],
  deniedKeys: []
};
async function loadCredentialPolicy(storage) {
  const raw2 = await storage.get(CREDENTIAL_POLICY);
  if (!raw2) return { ...DEFAULT_POLICY };
  try {
    return JSON.parse(raw2);
  } catch {
    return { ...DEFAULT_POLICY };
  }
}
async function saveCredentialPolicy(storage, policy) {
  await storage.put(CREDENTIAL_POLICY, JSON.stringify(policy));
}

// src/core/credential-risk.ts
var COOKIE_FIELD_NAMES = /* @__PURE__ */ new Set([
  "cookie",
  "cookies",
  "token",
  "refresh_token",
  "open_token",
  "quark_cookie",
  "uccookie",
  "tyitoken",
  "dutoken",
  "p123token",
  "tuctoken",
  "bili_cookie",
  "ali_token"
]);
var OFFICIAL_DOMAINS = /* @__PURE__ */ new Set([
  "www.alipan.com",
  "api.alipan.com",
  "open.alipan.com",
  "aliyundrive.com",
  "api.bilibili.com",
  "passport.bilibili.com",
  "drive.quark.cn",
  "uop.quark.cn",
  "drive-pc.quark.cn",
  "pc-api.uc.cn",
  "webapi.115.com",
  "proapi.115.com",
  "qrcodeapi.115.com",
  "cloud.189.cn",
  "api.cloud.189.cn",
  "pan.baidu.com",
  "openapi.baidu.com",
  "www.123pan.com",
  "open-api.123pan.com"
]);
var FIELD_TO_PLATFORM = {
  "cookie": "quark",
  // 默认 cookie 字段通常是夸克（最常见）
  "quark_cookie": "quark",
  "uccookie": "uc",
  "bili_cookie": "bilibili",
  "ali_token": "aliyun",
  "refresh_token": "aliyun",
  "open_token": "aliyun",
  "token": "aliyun",
  "tyitoken": "tianyi",
  "dutoken": "baidu",
  "p123token": "pan123",
  "tuctoken": "thunder"
};
var API_TO_PLATFORMS = {
  "csp_Bili": ["bilibili"],
  "csp_BiliR": ["bilibili"],
  "csp_Wobg": ["aliyun", "quark", "uc", "pan115", "thunder", "pikpak"],
  "csp_Wogg": ["aliyun", "quark", "uc", "pan115", "thunder", "pikpak"],
  "csp_Mogg": ["quark", "aliyun", "uc", "tianyi", "baidu", "pan123", "thunder"],
  "csp_Pan115": ["pan115"]
};
function assessSourceRisk(site) {
  const result = {
    siteKey: site.key,
    api: site.api,
    riskLevel: "safe",
    reason: "",
    neededPlatforms: [],
    thirdPartyDomains: []
  };
  const ext = site.ext;
  if (!ext) {
    result.reason = "A\u7C7B: \u65E0 ext \u5B57\u6BB5";
    return result;
  }
  const { hasCookieFields, cookieFieldNames, thirdPartyDomains, isTokenJsonExt, proxyMode } = analyzeExt(ext, site.api);
  result.thirdPartyDomains = thirdPartyDomains;
  const apiPlatforms = API_TO_PLATFORMS[site.api];
  if (apiPlatforms) {
    result.neededPlatforms = [...apiPlatforms];
  } else {
    const platforms = /* @__PURE__ */ new Set();
    for (const field of cookieFieldNames) {
      const p = FIELD_TO_PLATFORM[field];
      if (p) platforms.add(p);
    }
    result.neededPlatforms = [...platforms];
  }
  if (!hasCookieFields && !isTokenJsonExt) {
    result.reason = "A\u7C7B: ext \u65E0 cookie \u76F8\u5173\u5B57\u6BB5";
    return result;
  }
  if (isTokenJsonExt) {
    if (proxyMode === "noproxy" || proxyMode === "db") {
      result.riskLevel = "low";
      result.reason = `D\u7C7B: token.json + ${proxyMode}\uFF08\u4E0D\u8D70\u4EE3\u7406\uFF09`;
    } else if (proxyMode === "proxy") {
      result.riskLevel = "high";
      result.reason = `D\u7C7B: token.json + proxy\uFF08\u6D41\u91CF\u7ECF\u7B2C\u4E09\u65B9 ${thirdPartyDomains.join(", ")}\uFF09`;
    } else {
      result.riskLevel = "unaudited";
      result.reason = `D\u7C7B: token.json + proxy=${proxyMode || "null"}\uFF08\u672A\u5BA1\u8BA1\uFF09`;
    }
    return result;
  }
  if (hasCookieFields && thirdPartyDomains.length === 0) {
    result.riskLevel = "safe";
    result.reason = "B\u7C7B: \u6709 cookie \u5B57\u6BB5\uFF0C\u76F4\u8FDE\u5B98\u65B9";
    return result;
  }
  if (hasCookieFields && thirdPartyDomains.length > 0) {
    result.riskLevel = "low";
    result.reason = `C\u7C7B: \u6709 cookie + site URL\uFF08${thirdPartyDomains.join(", ")}\uFF09`;
    return result;
  }
  return result;
}
function assessAllSources(sites) {
  return sites.map(assessSourceRisk);
}
function analyzeExt(ext, api) {
  const result = {
    hasCookieFields: false,
    cookieFieldNames: [],
    thirdPartyDomains: [],
    isTokenJsonExt: false,
    proxyMode: null
  };
  if (typeof ext === "string") {
    return analyzeStringExt(ext, api);
  }
  for (const key of Object.keys(ext)) {
    if (COOKIE_FIELD_NAMES.has(key.toLowerCase())) {
      result.hasCookieFields = true;
      result.cookieFieldNames.push(key);
    }
  }
  for (const value of Object.values(ext)) {
    if (typeof value === "string") {
      const domains = extractDomains(value);
      for (const d of domains) {
        if (!OFFICIAL_DOMAINS.has(d)) {
          result.thirdPartyDomains.push(d);
        }
      }
    }
  }
  return result;
}
function analyzeStringExt(ext, api) {
  const result = {
    hasCookieFields: false,
    cookieFieldNames: [],
    thirdPartyDomains: [],
    isTokenJsonExt: false,
    proxyMode: null
  };
  if (ext.includes("token.json") || ext.includes("token_json")) {
    result.isTokenJsonExt = true;
    const segments = ext.split("$$$");
    if (segments.length >= 3) {
      result.proxyMode = segments[2]?.trim() || null;
    }
    if (segments.length >= 2) {
      const siteUrl = segments[1]?.trim();
      if (siteUrl) {
        const domains2 = extractDomains(siteUrl);
        result.thirdPartyDomains = domains2;
      }
    }
    result.hasCookieFields = true;
    return result;
  }
  try {
    const obj = JSON.parse(ext);
    if (typeof obj === "object" && obj !== null) {
      return analyzeExt(obj, api);
    }
  } catch {
  }
  const lower = ext.toLowerCase();
  for (const field of COOKIE_FIELD_NAMES) {
    if (lower.includes(field)) {
      result.hasCookieFields = true;
      result.cookieFieldNames.push(field);
    }
  }
  const domains = extractDomains(ext);
  for (const d of domains) {
    if (!OFFICIAL_DOMAINS.has(d)) {
      result.thirdPartyDomains.push(d);
    }
  }
  return result;
}
function extractDomains(text) {
  const urlRegex = /https?:\/\/([^/\s$]+)/g;
  const domains = [];
  let match2;
  while ((match2 = urlRegex.exec(text)) !== null) {
    const host = match2[1].split(":")[0];
    if (host && !host.includes("localhost") && !host.startsWith("127.") && !host.startsWith("192.168.")) {
      domains.push(host);
    }
  }
  return [...new Set(domains)];
}

// src/core/credential-injector.ts
function parseExt(ext) {
  if (typeof ext !== "string") {
    return { obj: ext || {}, wasString: false, wasJson: false };
  }
  try {
    const parsed = JSON.parse(ext);
    if (typeof parsed === "object" && parsed !== null) {
      return { obj: parsed, wasString: true, wasJson: true };
    }
  } catch {
  }
  return { obj: {}, wasString: true, wasJson: false };
}
function restoreExt(obj, wasString, wasJson) {
  if (!wasString) return obj;
  if (wasJson) return JSON.stringify(obj);
  return obj;
}
function getCredValue(creds, platform, field) {
  return creds.get(platform)?.credential[field] || "";
}
var BUILTIN_RULES = [
  // csp_Bili / csp_BiliR: ext.cookie = bilibili cookie
  {
    apiPattern: /^csp_Bili/,
    platforms: ["bilibili"],
    inject: (ext, creds) => {
      const { obj, wasString, wasJson } = parseExt(ext);
      obj.cookie = getCredValue(creds, "bilibili", "cookie");
      return restoreExt(obj, wasString, wasJson);
    }
  },
  // csp_Wobg / csp_Wogg (token.json 派): 替换 token.json URL
  {
    apiPattern: /^csp_Wo[bg]g$/,
    platforms: ["aliyun", "quark", "uc", "pan115", "thunder", "pikpak"],
    inject: (ext, creds, baseUrl) => {
      if (typeof ext !== "string") return ext;
      if (!baseUrl) return ext;
      return ext.replace(/https?:\/\/[^$\s]+token[_.]?json[^$\s]*/i, `${baseUrl}/credential/token.json`);
    }
  },
  // csp_Mogg: 多字段注入
  {
    apiPattern: "csp_Mogg",
    platforms: ["quark", "aliyun", "uc", "tianyi", "baidu", "pan123", "thunder"],
    inject: (ext, creds) => {
      const { obj, wasString, wasJson } = parseExt(ext);
      if ("cookie" in obj) obj.cookie = getCredValue(creds, "quark", "cookie");
      if ("token" in obj) obj.token = getCredValue(creds, "aliyun", "refresh_token");
      if ("uccookie" in obj) obj.uccookie = getCredValue(creds, "uc", "cookie");
      if ("tyitoken" in obj) obj.tyitoken = getCredValue(creds, "tianyi", "cookie");
      if ("dutoken" in obj) obj.dutoken = getCredValue(creds, "baidu", "cookie");
      if ("p123token" in obj) obj.p123token = getCredValue(creds, "pan123", "token");
      if ("tuctoken" in obj) obj.tuctoken = getCredValue(creds, "thunder", "token");
      return restoreExt(obj, wasString, wasJson);
    }
  },
  // csp_Pan115: ext.cookie = 115 cookie
  {
    apiPattern: "csp_Pan115",
    platforms: ["pan115"],
    inject: (ext, creds) => {
      const { obj, wasString, wasJson } = parseExt(ext);
      obj.cookie = getCredValue(creds, "pan115", "cookie");
      return restoreExt(obj, wasString, wasJson);
    }
  }
];
function matchRule(api, rule) {
  if (typeof rule.apiPattern === "string") {
    return api === rule.apiPattern;
  }
  return rule.apiPattern.test(api);
}
function findMatchingRule(site) {
  for (const rule of BUILTIN_RULES) {
    if (matchRule(site.api, rule)) return rule;
  }
  return null;
}
function injectCredentials(sites, credentials, policy, baseUrl) {
  const report = {
    injected: 0,
    skippedSafe: 0,
    skippedDenied: 0,
    skippedHighRisk: 0,
    skippedUnaudited: 0,
    skippedNoRule: 0,
    skippedNoCredential: 0
  };
  const deniedSet = new Set(policy.deniedKeys);
  const allowedSet = new Set(policy.allowedHighRiskKeys);
  const result = sites.map((site) => {
    const risk = assessSourceRisk(site);
    if (risk.neededPlatforms.length === 0) {
      report.skippedSafe++;
      return site;
    }
    if (deniedSet.has(site.key)) {
      report.skippedDenied++;
      return site;
    }
    if (risk.riskLevel === "high" || risk.riskLevel === "unaudited") {
      if (!allowedSet.has(site.key)) {
        risk.riskLevel === "high" ? report.skippedHighRisk++ : report.skippedUnaudited++;
        return site;
      }
    }
    const rule = findMatchingRule(site);
    if (!rule) {
      report.skippedNoRule++;
      return site;
    }
    const hasAnyCredential = rule.platforms.some((p) => credentials.has(p));
    if (!hasAnyCredential) {
      report.skippedNoCredential++;
      return site;
    }
    const newExt = rule.inject(site.ext, credentials, baseUrl);
    report.injected++;
    return { ...site, ext: newExt };
  });
  return { sites: result, report };
}
function generateTokenJson(credentials, neededPlatforms) {
  const token = {};
  const platforms = neededPlatforms || [...credentials.keys()];
  for (const platform of platforms) {
    const cred = credentials.get(platform);
    if (!cred) continue;
    switch (platform) {
      case "aliyun":
        if (cred.credential.refresh_token) token.refresh_token = cred.credential.refresh_token;
        if (cred.credential.open_token) token.open_token = cred.credential.open_token;
        break;
      case "quark":
        if (cred.credential.cookie) token.quark_cookie = cred.credential.cookie;
        break;
      case "uc":
        if (cred.credential.cookie) token.uc_cookie = cred.credential.cookie;
        break;
      case "pan115":
        if (cred.credential.cookie) token["115_cookie"] = cred.credential.cookie;
        break;
      case "thunder":
        if (cred.credential.username) {
          token.thunder_username = cred.credential.username;
          token.thunder_password = cred.credential.password;
        }
        break;
      case "pikpak":
        if (cred.credential.username) {
          token.pikpak_username = cred.credential.username;
          token.pikpak_password = cred.credential.password;
        }
        break;
      case "bilibili":
        if (cred.credential.cookie) token.bili_cookie = cred.credential.cookie;
        break;
      case "tianyi":
        if (cred.credential.cookie) token.tianyi_cookie = cred.credential.cookie;
        break;
      case "baidu":
        if (cred.credential.cookie) token.baidu_cookie = cred.credential.cookie;
        break;
      case "pan123":
        if (cred.credential.token) token["123_token"] = cred.credential.token;
        break;
    }
  }
  return token;
}

// src/routes/cloud-credentials.ts
function createCloudCredRouter(deps) {
  const router = new Hono2();
  const { storage, config: config2 } = deps;
  router.get("/admin/cloud-credentials", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) return c.json({ error: "Unauthorized" }, 401);
    const creds = await loadCredentials(storage);
    const result = {};
    for (const [platform, cred] of creds) {
      result[platform] = {
        platform: cred.platform,
        status: cred.status,
        obtainedAt: cred.obtainedAt,
        expiresAt: cred.expiresAt,
        hasCredential: Object.keys(cred.credential).length > 0
      };
    }
    return c.json({ platforms: PLATFORM_NAMES, credentials: result });
  });
  router.delete("/admin/cloud-credentials/:platform", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) return c.json({ error: "Unauthorized" }, 401);
    const platform = c.req.param("platform");
    if (!PLATFORM_NAMES[platform]) return c.json({ error: "Unknown platform" }, 400);
    await deleteCredential(storage, platform);
    return c.json({ success: true });
  });
  router.post("/admin/cloud-credentials/:platform", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) return c.json({ error: "Unauthorized" }, 401);
    const platform = c.req.param("platform");
    if (!PLATFORM_NAMES[platform]) return c.json({ error: "Unknown platform" }, 400);
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    if (!body.credential || typeof body.credential !== "object") {
      return c.json({ error: "credential object is required" }, 400);
    }
    const cred = {
      platform,
      credential: body.credential,
      obtainedAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "valid"
    };
    await saveCredential(storage, cred);
    return c.json({ success: true });
  });
  router.post("/admin/cloud-login/:platform/qr", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) return c.json({ error: "Unauthorized" }, 401);
    const platform = c.req.param("platform");
    if (!QR_PLATFORMS.includes(platform)) {
      return c.json({ error: `Platform ${platform} does not support QR login` }, 400);
    }
    try {
      const result = await generateQR(platform);
      return c.json(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return c.json({ error: msg }, 502);
    }
  });
  router.get("/admin/cloud-login/:platform/poll", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) return c.json({ error: "Unauthorized" }, 401);
    const platform = c.req.param("platform");
    const token = c.req.query("token");
    if (!token) return c.json({ error: "token is required" }, 400);
    try {
      const result = await pollQRStatus(platform, token);
      if (result.status === "confirmed" && result.credential) {
        const cred = {
          platform,
          credential: result.credential,
          obtainedAt: (/* @__PURE__ */ new Date()).toISOString(),
          status: "valid"
        };
        await saveCredential(storage, cred);
      }
      return c.json(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return c.json({ error: msg, status: "error" }, 502);
    }
  });
  router.post("/admin/cloud-login/:platform/password", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) return c.json({ error: "Unauthorized" }, 401);
    const platform = c.req.param("platform");
    if (!PASSWORD_PLATFORMS.includes(platform)) {
      return c.json({ error: `Platform ${platform} does not support password login` }, 400);
    }
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    try {
      const result = await passwordLogin(platform, body.username || "", body.password || "");
      if (result.success && result.credential) {
        const cred = {
          platform,
          credential: result.credential,
          obtainedAt: (/* @__PURE__ */ new Date()).toISOString(),
          status: "valid"
        };
        await saveCredential(storage, cred);
      }
      return c.json(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return c.json({ success: false, message: msg }, 502);
    }
  });
  router.get("/admin/credential-policy", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) return c.json({ error: "Unauthorized" }, 401);
    return c.json(await loadCredentialPolicy(storage));
  });
  router.put("/admin/credential-policy", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) return c.json({ error: "Unauthorized" }, 401);
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const policy = await loadCredentialPolicy(storage);
    if (Array.isArray(body.allowedHighRiskKeys)) policy.allowedHighRiskKeys = body.allowedHighRiskKeys;
    if (Array.isArray(body.deniedKeys)) policy.deniedKeys = body.deniedKeys;
    await saveCredentialPolicy(storage, policy);
    return c.json({ success: true, ...policy });
  });
  router.get("/admin/credential-risk-report", async (c) => {
    if (!verifyAdmin(c.req.raw, config2)) return c.json({ error: "Unauthorized" }, 401);
    const configRaw = await storage.get(MERGED_CONFIG_FULL);
    if (!configRaw) return c.json({ error: "No config available. Run sync first." }, 404);
    const adminBase = (config2.localBaseUrl || "").replace(/\/$/, "");
    const substituted = applyBaseUrlPlaceholder(configRaw, adminBase);
    const parsed = JSON.parse(substituted);
    const sites = parsed.sites || [];
    const assessments = assessAllSources(sites);
    const policy = await loadCredentialPolicy(storage);
    const summary = { safe: 0, low: 0, high: 0, unaudited: 0 };
    for (const a of assessments) {
      summary[a.riskLevel]++;
    }
    return c.json({ summary, assessments, policy });
  });
  router.get("/credential/token.json", async (c) => {
    const creds = await loadCredentials(storage);
    if (creds.size === 0) {
      return c.json({}, 200, { "Access-Control-Allow-Origin": "*" });
    }
    const tokenJson = generateTokenJson(creds);
    return c.json(tokenJson, 200, {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache"
    });
  });
  return router;
}
function verifyAdmin(request, config2) {
  const token = config2.adminToken;
  if (!token) return false;
  const auth = request.headers.get("Authorization");
  return auth === `Bearer ${token}`;
}

// src/core/maccms.ts
async function validateMacCMS(api, timeoutMs) {
  const url = api.includes("?") ? `${api}&ac=list` : `${api}?ac=list`;
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const resp = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    const speedMs = Date.now() - start;
    if (!resp.ok) return { ok: false, speedMs };
    const data = await resp.json();
    const ok = !!(data && (data.class || data.list));
    return { ok, speedMs };
  } catch {
    return { ok: false, speedMs: Date.now() - start };
  }
}
function macCMSToTVBoxSites(entries, proxyBaseUrl, speedMap) {
  return entries.map((entry) => {
    let name = entry.name;
    const speedMs = speedMap?.get(entry.key);
    if (speedMs != null) {
      const seconds = (speedMs / 1e3).toFixed(1);
      name = `${name} [${seconds}s]`;
    }
    return {
      key: entry.key,
      name,
      type: 1,
      api: proxyBaseUrl ? `${proxyBaseUrl.replace(/\/$/, "")}/api/${entry.key}` : entry.api,
      searchable: 1,
      quickSearch: 1,
      filterable: 1
    };
  });
}
async function processMacCMSForLocal(entries, timeoutMs) {
  if (entries.length === 0) return { passed: [], speedMap: /* @__PURE__ */ new Map() };
  logger.infoFields("maccms", "validation-start", { count: entries.length, timeoutMs });
  entries.forEach((entry, index) => {
    logger.infoFields("maccms", "source-queued", {
      index: index + 1,
      key: entry.key,
      name: entry.name,
      api: entry.api
    });
  });
  const results = await Promise.allSettled(
    entries.map(async (entry) => {
      const validation = await validateMacCMS(entry.api, timeoutMs);
      return { entry, validation };
    })
  );
  const passed = [];
  const speedMap = /* @__PURE__ */ new Map();
  for (const result of results) {
    if (result.status === "fulfilled") {
      const { entry, validation } = result.value;
      if (validation.ok) {
        passed.push(entry);
        speedMap.set(entry.key, validation.speedMs);
        logger.infoFields("maccms", "source-valid", {
          key: entry.key,
          name: entry.name,
          api: entry.api,
          speedMs: validation.speedMs
        });
      } else {
        logger.infoFields("maccms", "source-filtered", {
          key: entry.key,
          name: entry.name,
          api: entry.api,
          reason: "validation_failed",
          speedMs: validation.speedMs
        });
      }
    } else {
      logger.warnFields("maccms", "source-error", { error: result.reason });
    }
  }
  logger.infoFields("maccms", "validation-complete", {
    passed: passed.length,
    total: entries.length
  });
  return { passed, speedMap };
}

// src/routes/maccms-admin.ts
function createMaccmsAdminRouter(deps) {
  const router = new Hono2();
  const { storage, config: config2 } = deps;
  router.use("/admin/*", adminAuthMiddleware(config2));
  router.get("/admin/maccms", async (c) => {
    const raw2 = await storage.get(MACCMS_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    return c.json(sources);
  });
  router.post("/admin/maccms", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const newEntries = Array.isArray(body) ? body : [body];
    for (const entry of newEntries) {
      if (!entry.key?.trim() || !entry.name?.trim() || !entry.api?.trim()) {
        return c.json({ error: "Each entry requires key, name, and api" }, 400);
      }
      try {
        new URL(entry.api);
      } catch {
        return c.json({ error: `Invalid URL: ${entry.api}` }, 400);
      }
    }
    const raw2 = await storage.get(MACCMS_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    const existingKeys = new Set(sources.map((s) => s.key));
    let added = 0;
    for (const entry of newEntries) {
      if (!existingKeys.has(entry.key)) {
        sources.push({ key: entry.key.trim(), name: entry.name.trim(), api: entry.api.trim() });
        existingKeys.add(entry.key);
        added++;
      }
    }
    await storage.put(MACCMS_SOURCES, JSON.stringify(sources));
    return c.json({ success: true, added, total: sources.length });
  });
  router.delete("/admin/maccms", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const key = body.key?.trim();
    if (!key) return c.json({ error: "key is required" }, 400);
    const raw2 = await storage.get(MACCMS_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    const filtered = sources.filter((s) => s.key !== key);
    await storage.put(MACCMS_SOURCES, JSON.stringify(filtered));
    return c.json({ success: true });
  });
  router.post("/admin/maccms/validate", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const api = body.api?.trim();
    if (!api) return c.json({ error: "api is required" }, 400);
    const ok = await validateMacCMS(api, config2.siteTimeoutMs);
    return c.json({ api, valid: ok });
  });
  return router;
}

// src/routes/blacklist.ts
function createBlacklistRouter(deps) {
  const router = new Hono2();
  const { storage, config: config2, runtime } = deps;
  router.use("/admin/*", adminAuthMiddleware(config2));
  router.post("/admin/regex-rule", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const pattern = body.pattern?.trim();
    if (!pattern) {
      return c.json({ error: "Pattern cannot be empty" }, 400);
    }
    const t0 = performance.now();
    const result = await saveRegexRule(storage, pattern);
    if (!result.success) {
      logger.warnFields("regex", "rule-save-failed", {
        pattern: pattern.length > 80 ? pattern.slice(0, 80) + "..." : pattern,
        error: result.error,
        durationMs: Math.round(performance.now() - t0)
      });
      return c.json({ error: result.error }, 400);
    }
    await setDirtyMarker(storage);
    logger.debugFields("regex", "rule-save", {
      pattern: pattern.length > 80 ? pattern.slice(0, 80) + "..." : pattern,
      ruleId: result.rule?.id,
      durationMs: Math.round(performance.now() - t0)
    });
    return c.json({ success: true, rule: result.rule });
  });
  router.delete("/admin/regex-rule/:id", async (c) => {
    const id = c.req.param("id");
    if (!id) {
      return c.json({ error: "id is required" }, 400);
    }
    const t0 = performance.now();
    const result = await deleteRegexRule(storage, id);
    if (!result.success) {
      logger.warnFields("regex", "rule-delete-failed", {
        ruleId: id,
        error: result.error,
        durationMs: Math.round(performance.now() - t0)
      });
      return c.json({ error: result.error }, 404);
    }
    await setDirtyMarker(storage);
    logger.debugFields("regex", "rule-delete", {
      ruleId: id,
      durationMs: Math.round(performance.now() - t0)
    });
    return c.json({ success: true });
  });
  router.get("/admin/regex-rules", async (c) => {
    const blacklist = await loadBlacklist(storage);
    return c.json({ rules: blacklist.regexRules });
  });
  router.post("/admin/blacklist", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const { type, id } = body;
    if (!type || !id) return c.json({ error: "type and id are required" }, 400);
    if (!["sites", "parses", "lives", "regexOverrides"].includes(type)) {
      return c.json({ error: "type must be sites, parses, lives, or regexOverrides" }, 400);
    }
    const t0 = performance.now();
    try {
      const blacklist = await loadBlacklist(storage);
      if (type === "regexOverrides") {
        const beforeSize2 = blacklist.regexBlockOverrides.length;
        if (!blacklist.regexBlockOverrides.includes(id)) {
          blacklist.regexBlockOverrides.push(id);
        }
        await saveBlacklist(storage, blacklist);
        await setDirtyMarker(storage);
        const afterSize2 = blacklist.regexBlockOverrides.length;
        logger.debugFields("blacklist", "block", {
          type,
          id,
          beforeSize: beforeSize2,
          afterSize: afterSize2,
          added: afterSize2 > beforeSize2,
          durationMs: Math.round(performance.now() - t0)
        });
        return c.json({ success: true });
      }
      const key = type;
      const list = blacklist[key];
      const beforeSize = list.length;
      if (!list.includes(id)) {
        list.push(id);
      }
      await saveBlacklist(storage, blacklist);
      await setDirtyMarker(storage);
      const afterSize = list.length;
      logger.debugFields("blacklist", "block", {
        type,
        id,
        beforeSize,
        afterSize,
        added: afterSize > beforeSize,
        durationMs: Math.round(performance.now() - t0)
      });
      return c.json({ success: true });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      logger.warnFields("blacklist", "block-failed", {
        type,
        id,
        error: msg,
        durationMs: Math.round(performance.now() - t0)
      });
      return c.json({ error: "Server error: " + msg }, 500);
    }
  });
  router.post("/admin/blacklist/batch", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const { type, ids } = body;
    if (!type || !Array.isArray(ids) || ids.length === 0) {
      return c.json({ error: "type and ids[] are required" }, 400);
    }
    if (ids.length > 500) {
      return c.json({ error: "Too many ids (max 500)" }, 400);
    }
    if (!["sites", "parses", "lives", "regexOverrides"].includes(type)) {
      return c.json({ error: "type must be sites, parses, lives, or regexOverrides" }, 400);
    }
    const t0 = performance.now();
    const blacklist = await loadBlacklist(storage);
    const beforeSize = blacklist[type].length;
    if (type === "regexOverrides") {
      let added2 = 0;
      for (const id of ids) {
        if (typeof id === "string" && !blacklist.regexBlockOverrides.includes(id)) {
          blacklist.regexBlockOverrides.push(id);
          added2++;
        }
      }
      await saveBlacklist(storage, blacklist);
      await setDirtyMarker(storage);
      const afterSize2 = blacklist.regexBlockOverrides.length;
      logger.debugFields("blacklist", "batch-block", {
        type,
        requested: ids.length,
        added: added2,
        beforeSize,
        afterSize: afterSize2,
        durationMs: Math.round(performance.now() - t0)
      });
      return c.json({ success: true, added: added2 });
    }
    const list = blacklist[type];
    let added = 0;
    for (const id of ids) {
      if (typeof id === "string" && !list.includes(id)) {
        list.push(id);
        added++;
      }
    }
    await saveBlacklist(storage, blacklist);
    await setDirtyMarker(storage);
    const afterSize = list.length;
    logger.debugFields("blacklist", "batch-block", {
      type,
      requested: ids.length,
      added,
      beforeSize,
      afterSize,
      durationMs: Math.round(performance.now() - t0)
    });
    return c.json({ success: true, added });
  });
  router.delete("/admin/blacklist", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const { type, id } = body;
    if (!type || !id) return c.json({ error: "type and id are required" }, 400);
    if (!["sites", "parses", "lives", "regexOverrides"].includes(type)) {
      return c.json({ error: "type must be sites, parses, lives, or regexOverrides" }, 400);
    }
    const t0 = performance.now();
    try {
      const blacklist = await loadBlacklist(storage);
      if (type === "regexOverrides") {
        const beforeSize2 = blacklist.regexBlockOverrides.length;
        blacklist.regexBlockOverrides = blacklist.regexBlockOverrides.filter((v) => v !== id);
        await saveBlacklist(storage, blacklist);
        await setDirtyMarker(storage);
        const afterSize2 = blacklist.regexBlockOverrides.length;
        logger.debugFields("blacklist", "unblock", {
          type,
          id,
          beforeSize: beforeSize2,
          afterSize: afterSize2,
          removed: afterSize2 < beforeSize2,
          durationMs: Math.round(performance.now() - t0)
        });
        return c.json({ success: true });
      }
      const key = type;
      const beforeSize = blacklist[key].length;
      blacklist[key] = blacklist[key].filter((v) => v !== id);
      await saveBlacklist(storage, blacklist);
      await setDirtyMarker(storage);
      const afterSize = blacklist[key].length;
      logger.debugFields("blacklist", "unblock", {
        type,
        id,
        beforeSize,
        afterSize,
        removed: afterSize < beforeSize,
        durationMs: Math.round(performance.now() - t0)
      });
      return c.json({ success: true });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      logger.warnFields("blacklist", "unblock-failed", {
        type,
        id,
        error: msg,
        durationMs: Math.round(performance.now() - t0)
      });
      return c.json({ error: "Server error: " + msg }, 500);
    }
  });
  router.post("/admin/patch-config", async (c) => {
    if (runtime.isSyncing()) {
      return c.json({ error: "Sync in progress" }, 409);
    }
    if (runtime.getPatchLock()) {
      return c.json({ error: "Patch in progress" }, 409);
    }
    runtime.setPatchLock(true);
    const t0 = performance.now();
    try {
      const result = await patchMergedConfig(storage);
      const durationMs = Math.round(performance.now() - t0);
      if (!result.patched) {
        logger.debugFields("blacklist", "patch-config", {
          patched: false,
          durationMs,
          reason: result.reason
        });
        return c.json({ ok: false, error: result.reason || "Patch skipped" }, 200);
      }
      logger.debugFields("blacklist", "patch-config", {
        patched: true,
        durationMs
      });
      await clearDirtyMarker(storage);
      return c.json({ ok: true, warning: result.warning });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      logger.warnFields("blacklist", "patch-config-failed", {
        error: msg,
        durationMs: Math.round(performance.now() - t0)
      });
      return c.json({ ok: false, error: msg }, 500);
    } finally {
      runtime.setPatchLock(false);
    }
  });
  router.delete("/admin/dirty-marker", async (c) => {
    const t0 = performance.now();
    await clearDirtyMarker(storage);
    logger.debugFields("blacklist", "dirty-marker-clear", {
      durationMs: Math.round(performance.now() - t0)
    });
    return c.json({ ok: true });
  });
  return router;
}

// src/routes/export-config.ts
function createExportConfigRouter(deps) {
  const router = new Hono2();
  const { storage, config: config2, runtime } = deps;
  router.use("/admin/*", adminAuthMiddleware(config2));
  router.get("/admin/export-config", async (c) => {
    if (runtime.isSyncing()) {
      return c.json({ error: "\u540C\u6B65\u8FDB\u884C\u4E2D\uFF0C\u8BF7\u7A0D\u540E" }, 409);
    }
    const cached = await storage.get(EXPORT_CONFIG);
    if (!cached) {
      return c.json({ error: "\u8BF7\u5148\u540C\u6B65" }, 503);
    }
    const now = /* @__PURE__ */ new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const filename = `tvbox-config-${ts}.json`;
    logger.debugFields("export", "download-ok", {
      filename,
      bytes: Buffer.byteLength(cached, "utf8")
    });
    return c.body(cached, 200, {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store"
    });
  });
  return router;
}

// src/routes/config-editor.ts
function createConfigEditorRouter(deps) {
  const router = new Hono2();
  const { storage, config: config2 } = deps;
  router.use("/admin/*", adminAuthMiddleware(config2));
  router.get("/admin/config-data", async (c) => {
    const full = await storage.get(MERGED_CONFIG_FULL);
    const cached = full || await storage.get(MERGED_CONFIG);
    if (!cached) {
      return c.json({ sites: [], parses: [], lives: [] });
    }
    let parsed;
    try {
      const adminBase = (config2.localBaseUrl || "").replace(/\/$/, "");
      const substituted = applyBaseUrlPlaceholder(cached, adminBase);
      parsed = JSON.parse(substituted);
    } catch {
      return c.json({ error: "Config parse error" }, 500);
    }
    const blacklist = await loadBlacklist(storage);
    const siteSet = new Set(blacklist.sites);
    const parseSet = new Set(blacklist.parses);
    const liveSet = new Set(blacklist.lives);
    const overrideSet = new Set(blacklist.regexBlockOverrides);
    const compiledRegex = [];
    for (const rule of blacklist.regexRules) {
      try {
        compiledRegex.push(new RegExp(rule.pattern, "u"));
      } catch {
      }
    }
    const sites = [];
    for (const site of parsed.sites || []) {
      const fp = await siteFingerprint(site);
      const api = site.api || "";
      let group = "\u5176\u4ED6";
      if (api.startsWith("csp_") || api.startsWith("py_") || api.startsWith("js_")) {
        group = api;
      } else if (api.startsWith("http")) {
        try {
          group = "\u8FDC\u7A0B: " + new URL(api).hostname;
        } catch {
          group = "\u8FDC\u7A0B\u6E90";
        }
      }
      const name = site.name || "";
      const fingerprintBlocked = siteSet.has(fp);
      const overridden = !fingerprintBlocked && overrideSet.has(name);
      const regexBlocked = !fingerprintBlocked && !overridden && compiledRegex.some((re) => re.test(name));
      const isOverridden = overridden && compiledRegex.some((re) => re.test(name));
      sites.push({ ...site, fingerprint: fp, blocked: fingerprintBlocked || regexBlocked, regexBlocked, isOverridden, group });
    }
    const parses = (parsed.parses || []).map((p) => ({
      ...p,
      blocked: parseSet.has(p.url)
    }));
    const lives = (parsed.lives || []).map((l) => ({
      ...l,
      blocked: liveSet.has(l.url || l.api || "")
    }));
    const liveDisabledRaw = await storage.get(LIVE_DISABLED);
    const liveDisabled = liveDisabledRaw !== "false";
    const healthRaw = await storage.get(SOURCE_HEALTH);
    const healthRecords = healthRaw ? JSON.parse(healthRaw) : [];
    const erroredSourceNames = /* @__PURE__ */ new Set();
    const erroredSourceReasons = /* @__PURE__ */ new Map();
    for (const record of healthRecords) {
      const r = record;
      const rawStatus = r.fetchStatus || r.latestStatus;
      if (!rawStatus) continue;
      if (classifyStatus(rawStatus, record.consecutiveFailures) === "ERR" && record.lastFailReason && record.name) {
        erroredSourceNames.add(record.name);
        erroredSourceReasons.set(record.name, record.lastFailReason);
      }
    }
    if (erroredSourceNames.size > 0) {
      for (const site of sites) {
        const group = site.group || "";
        for (const errName of erroredSourceNames) {
          if (group.includes(errName)) {
            site.errSource = true;
            site.errReason = erroredSourceReasons.get(errName);
            break;
          }
        }
      }
    }
    const validationErrors = healthRecords.filter((r) => {
      const rr = r;
      const rawStatus = rr.fetchStatus || rr.latestStatus;
      return rawStatus && classifyStatus(rawStatus, r.consecutiveFailures) === "ERR" && r.lastFailReason && r.name;
    }).map((r) => ({ url: r.url, name: r.name, reason: r.lastFailReason }));
    return c.json({ sites, parses, lives, regexRules: blacklist.regexRules, liveDisabled, validationErrors });
  });
  return router;
}

// src/routes/live-sources.ts
function createLiveSourcesRouter(deps) {
  const { storage, config: config2 } = deps;
  const router = new Hono2();
  router.use("/admin/*", adminAuthMiddleware(config2));
  router.get("/admin/lives", async (c) => {
    const raw2 = await storage.get(LIVE_SOURCES);
    const entries = raw2 ? JSON.parse(raw2) : [];
    return c.json(entries);
  });
  router.post("/admin/lives", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const url = body.url?.trim();
    if (!url) return c.json({ error: "URL is required" }, 400);
    try {
      new URL(url);
    } catch {
      return c.json({ error: "Invalid URL format" }, 400);
    }
    const name = body.name?.trim() || "";
    const raw2 = await storage.get(LIVE_SOURCES);
    const entries = raw2 ? JSON.parse(raw2) : [];
    if (entries.some((e) => e.url === url)) {
      return c.json({ error: "Live source already exists" }, 409);
    }
    entries.push({ name, url });
    await storage.put(LIVE_SOURCES, JSON.stringify(entries));
    return c.json({ success: true });
  });
  router.delete("/admin/lives", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    const url = body.url?.trim();
    if (!url) return c.json({ error: "URL is required" }, 400);
    const raw2 = await storage.get(LIVE_SOURCES);
    const entries = raw2 ? JSON.parse(raw2) : [];
    const filtered = entries.filter((e) => e.url !== url);
    await storage.put(LIVE_SOURCES, JSON.stringify(filtered));
    return c.json({ success: true });
  });
  return router;
}

// node_modules/hono/dist/utils/stream.js
var StreamingApi = class {
  writer;
  encoder;
  writable;
  abortSubscribers = [];
  responseReadable;
  /**
   * Whether the stream has been aborted.
   */
  aborted = false;
  /**
   * Whether the stream has been closed normally.
   */
  closed = false;
  constructor(writable, _readable) {
    this.writable = writable;
    this.writer = writable.getWriter();
    this.encoder = new TextEncoder();
    const reader = _readable.getReader();
    this.abortSubscribers.push(async () => {
      await reader.cancel();
    });
    this.responseReadable = new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        done ? controller.close() : controller.enqueue(value);
      },
      cancel: () => {
        this.abort();
      }
    });
  }
  async write(input) {
    try {
      if (typeof input === "string") {
        input = this.encoder.encode(input);
      }
      await this.writer.write(input);
    } catch {
    }
    return this;
  }
  async writeln(input) {
    await this.write(input + "\n");
    return this;
  }
  sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
  async close() {
    try {
      await this.writer.close();
    } catch {
    }
    this.closed = true;
  }
  async pipe(body) {
    this.writer.releaseLock();
    await body.pipeTo(this.writable, { preventClose: true });
    this.writer = this.writable.getWriter();
  }
  onAbort(listener) {
    this.abortSubscribers.push(listener);
  }
  /**
   * Abort the stream.
   * You can call this method when stream is aborted by external event.
   */
  abort() {
    if (!this.aborted) {
      this.aborted = true;
      this.abortSubscribers.forEach((subscriber) => subscriber());
    }
  }
};

// node_modules/hono/dist/helper/streaming/utils.js
var isOldBunVersion = () => {
  const version2 = typeof Bun !== "undefined" ? Bun.version : void 0;
  if (version2 === void 0) {
    return false;
  }
  const result = version2.startsWith("1.1") || version2.startsWith("1.0") || version2.startsWith("0.");
  isOldBunVersion = () => result;
  return result;
};

// node_modules/hono/dist/helper/streaming/sse.js
var SSEStreamingApi = class extends StreamingApi {
  constructor(writable, readable) {
    super(writable, readable);
  }
  async writeSSE(message) {
    const data = await resolveCallback(message.data, HtmlEscapedCallbackPhase.Stringify, false, {});
    const dataLines = data.split(/\r\n|\r|\n/).map((line) => {
      return `data: ${line}`;
    }).join("\n");
    for (const key of ["event", "id", "retry"]) {
      if (message[key] && /[\r\n]/.test(message[key])) {
        throw new Error(`${key} must not contain "\\r" or "\\n"`);
      }
    }
    const sseData = [
      message.event && `event: ${message.event}`,
      dataLines,
      message.id && `id: ${message.id}`,
      message.retry && `retry: ${message.retry}`
    ].filter(Boolean).join("\n") + "\n\n";
    await this.write(sseData);
  }
};
var run = async (stream2, cb, onError) => {
  try {
    await cb(stream2);
  } catch (e) {
    if (e instanceof Error && onError) {
      await onError(e, stream2);
      await stream2.writeSSE({
        event: "error",
        data: e.message
      });
    } else {
      console.error(e);
    }
  } finally {
    stream2.close();
  }
};
var contextStash = /* @__PURE__ */ new WeakMap();
var streamSSE = (c, cb, onError) => {
  const { readable, writable } = new TransformStream();
  const stream2 = new SSEStreamingApi(writable, readable);
  if (isOldBunVersion()) {
    c.req.raw.signal.addEventListener("abort", () => {
      if (!stream2.closed) {
        stream2.abort();
      }
    });
  }
  contextStash.set(stream2.responseReadable, c);
  c.header("Transfer-Encoding", "chunked");
  c.header("Content-Type", "text/event-stream");
  c.header("Cache-Control", "no-cache");
  c.header("Connection", "keep-alive");
  run(stream2, cb, onError);
  return c.newResponse(stream2.responseReadable);
};

// src/core/log-buffer.ts
var CAPACITY = 1e3;
var buffer = new Array(CAPACITY);
var head = 0;
var size = 0;
var subscribers = /* @__PURE__ */ new Set();
function push(entry) {
  if (size < CAPACITY) {
    buffer[(head + size) % CAPACITY] = entry;
    size++;
  } else {
    buffer[head] = entry;
    head = (head + 1) % CAPACITY;
  }
  for (const fn of subscribers) {
    try {
      fn(entry);
    } catch {
    }
  }
}
function getHistory() {
  const out = [];
  for (let i = 0; i < size; i++) {
    out.push(buffer[(head + i) % CAPACITY]);
  }
  return out;
}
function subscribe(fn) {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}
subscribeLogSink(push);

// src/routes/log-viewer.ts
function createLogViewerRouter(deps) {
  const router = new Hono2();
  const { config: config2 } = deps;
  router.use("/admin/*", adminAuthMiddleware(config2));
  router.get("/admin/logs", (c) => {
    return streamSSE(c, async (stream2) => {
      for (const entry of getHistory()) {
        await stream2.writeSSE({ data: JSON.stringify(entry) });
      }
      const unsubscribe = subscribe((entry) => {
        if (stream2.closed) return;
        stream2.writeSSE({ data: JSON.stringify(entry) }).catch(() => {
        });
      });
      const heartbeat = setInterval(() => {
        if (stream2.closed) return;
        stream2.write(": ping\n\n").catch(() => {
        });
      }, 25e3);
      try {
        await new Promise((resolve3) => {
          stream2.onAbort(() => resolve3());
        });
      } finally {
        clearInterval(heartbeat);
        unsubscribe();
      }
    });
  });
  return router;
}

// src/routes/maccms-proxy.ts
function createMaccmsProxyRouter(deps) {
  const router = new Hono2();
  const { storage, config: config2 } = deps;
  router.all("/api/:key", async (c) => {
    const key = c.req.param("key");
    const raw2 = await storage.get(MACCMS_SOURCES);
    const sources = raw2 ? JSON.parse(raw2) : [];
    const source = sources.find((s) => s.key === key);
    if (!source) {
      return c.json({ error: "Unknown MacCMS source" }, 404);
    }
    const targetUrl = new URL(source.api);
    const reqUrl = new URL(c.req.url);
    reqUrl.searchParams.forEach((v, k) => targetUrl.searchParams.set(k, v));
    const attempts = [];
    const edgeRaw = await storage.get(EDGE_PROXIES);
    if (edgeRaw) {
      const edge = JSON.parse(edgeRaw);
      const encoded = encodeURIComponent(targetUrl.toString());
      if (edge.vercel) {
        attempts.push({
          label: "vercel",
          url: `${edge.vercel.replace(/\/$/, "")}/api/proxy?url=${encoded}`,
          headers: {}
        });
      }
      if (edge.fetchProxy) {
        attempts.push({
          label: "fetchProxy",
          url: `${edge.fetchProxy.replace(/\/$/, "")}/fetch-proxy?url=${encoded}`,
          headers: config2.adminToken ? { Authorization: `Bearer ${config2.adminToken}` } : {}
        });
      }
    }
    attempts.push({ label: "direct", url: targetUrl.toString(), headers: {} });
    let lastError = "";
    for (const { label, url, headers } of attempts) {
      try {
        const resp = await fetch(url, {
          headers: { "User-Agent": "okhttp/3.12.0", ...headers },
          signal: AbortSignal.timeout(8e3)
        });
        if (!resp.ok) {
          lastError = `upstream ${resp.status}`;
          logger.debug("maccms-proxy", `${key} via ${label} fail: ${lastError}`);
          continue;
        }
        const data = await resp.json();
        logger.debug("maccms-proxy", `${key} via ${label} ok`);
        return c.json(data, 200, {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=300"
        });
      } catch (error) {
        lastError = error instanceof Error ? error.message : String(error);
        logger.warn("maccms-proxy", `${key} via ${label} fail: ${lastError}`);
      }
    }
    return c.json({ error: lastError || "All proxies failed" }, 502);
  });
  return router;
}

// src/routes/jar-proxy.ts
var fs3 = __toESM(require("fs"));
var path2 = __toESM(require("path"));
var downloadLocks = /* @__PURE__ */ new Map();
var ALLOWED_STATIC_TYPES = /* @__PURE__ */ new Set(["jar", "js", "py", "json", "txt"]);
async function getJarSourceDir(key, storage) {
  try {
    const mapping = await storage.get(`jar-source:${key}`);
    if (!mapping) return null;
    const { index } = JSON.parse(mapping);
    return ensureSiteDir(index, "jar");
  } catch (e) {
    logger.warn("jar-proxy", `getJarSourceDir failed for ${key}: ${e instanceof Error ? e.message : String(e)}`);
    return null;
  }
}
function createJarProxyRouter(deps) {
  const router = new Hono2();
  const { storage, config: config2 } = deps;
  async function fetchAndCacheJar(key, originalUrl) {
    const buf = await downloadResource(originalUrl, 3e4);
    if (!buf) return null;
    try {
      const sourceDir = await getJarSourceDir(key, storage);
      if (sourceDir) {
        fs3.writeFileSync(path2.join(sourceDir, `${key}.jar`), buf);
        logger.debug("jar-proxy", `Cached ${key}.jar in ${sourceDir} (${(buf.length / 1024).toFixed(1)} KB)`);
      }
    } catch (writeErr) {
      logger.warn("jar-proxy", `Failed to write cache for ${key}: ${writeErr instanceof Error ? writeErr.message : String(writeErr)}`);
    }
    return buf;
  }
  router.get("/jar/:key", async (c) => {
    const key = c.req.param("key");
    const originalUrl = await lookupJarUrl(key, storage);
    if (!originalUrl) {
      return c.json({ error: "Unknown JAR key" }, 404);
    }
    const sourceDir = await getJarSourceDir(key, storage);
    if (sourceDir) {
      const md5Key = isMd5Key(key);
      const newPath = path2.join(sourceDir, `${key}.jar`);
      const cacheFile = fs3.existsSync(newPath) ? newPath : findCacheFile(sourceDir, key);
      if (cacheFile) {
        try {
          if (!fs3.existsSync(cacheFile)) {
          } else {
            const stat = fs3.statSync(cacheFile);
            const ttl = md5Key ? 864e5 : 216e5;
            if (Date.now() - stat.mtimeMs < ttl) {
              const buf2 = fs3.readFileSync(cacheFile);
              return new Response(buf2, {
                headers: {
                  "Content-Type": "application/octet-stream",
                  "Cache-Control": `public, max-age=${ttl / 1e3}`,
                  "Access-Control-Allow-Origin": "*"
                }
              });
            }
          }
        } catch (e) {
          logger.warn("jar-proxy", `Cache file vanished during read for ${key}: ${e instanceof Error ? e.message : String(e)}`);
        }
      }
    }
    let downloading = downloadLocks.get(key);
    if (!downloading) {
      downloading = fetchAndCacheJar(key, originalUrl).finally(() => downloadLocks.delete(key));
      downloadLocks.set(key, downloading);
    }
    const buf = await downloading;
    if (buf) {
      return new Response(buf, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Cache-Control": `public, max-age=${isMd5Key(key) ? 86400 : 21600}`,
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    return c.json({ error: "JAR unavailable from origin" }, 502);
  });
  router.get("/static/:key/:type", async (c) => {
    const key = c.req.param("key");
    const type = c.req.param("type");
    return c.redirect(`/${type}/${key}.${type}`, 308);
  });
  router.get("/:type/:key", async (c) => {
    const type = c.req.param("type");
    let key = c.req.param("key");
    const dotSuffix = `.${type}`;
    if (key.endsWith(dotSuffix)) {
      key = key.slice(0, -dotSuffix.length);
    }
    return handleStaticRequest(c, type, key);
  });
  async function handleStaticRequest(c, type, key) {
    if (!ALLOWED_STATIC_TYPES.has(type)) {
      return c.json({ error: "Invalid resource type" }, 400);
    }
    const mappingRaw = await storage.get(`static-source:${key}`);
    if (!mappingRaw) {
      return c.json({ error: "Unknown static resource key" }, 404);
    }
    let mapping;
    try {
      mapping = JSON.parse(mappingRaw);
    } catch {
      return c.json({ error: "Invalid mapping data" }, 500);
    }
    const contentType = getStaticContentType(type);
    const sourceDir = getSiteResourceDir(mapping.index, type);
    const newPath = path2.join(sourceDir, `${key}.${type}`);
    const oldPath = path2.join(sourceDir, `${key}-${mapping.name}`);
    const filePath = fs3.existsSync(newPath) ? newPath : oldPath;
    try {
      if (fs3.existsSync(filePath)) {
        const buf = fs3.readFileSync(filePath);
        return new Response(buf, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=86400",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
    } catch (e) {
      logger.warn("jar-proxy", `Cache file vanished during read for static ${key}/${type}: ${e instanceof Error ? e.message : String(e)}`);
    }
    const originalUrl = mapping.url;
    if (!originalUrl) {
      logger.warn("jar-proxy", `Static resource ${key} not cached and no original URL in KV mapping`);
      return c.json({ error: "Resource not cached and original URL unknown" }, 404);
    }
    const downloadTimeout = config2.fetchTimeoutMs || 1e4;
    const data = await downloadResource(originalUrl, downloadTimeout);
    if (!data) {
      logger.warn("jar-proxy", `On-demand download failed for ${type} ${key} from ${originalUrl.substring(0, 60)}...`);
      return c.json({ error: "Failed to download from origin" }, 502);
    }
    try {
      fs3.mkdirSync(sourceDir, { recursive: true });
      fs3.writeFileSync(filePath, data);
      logger.info("jar-proxy", `On-demand cached ${type} ${key} (${(data.length / 1024).toFixed(1)} KB)`);
    } catch (writeErr) {
      logger.warn("jar-proxy", `Failed to cache ${key} on demand: ${writeErr instanceof Error ? writeErr.message : String(writeErr)}`);
    }
    return new Response(data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=21600",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
  return router;
}
function getStaticContentType(type) {
  switch (type) {
    case "js":
      return "application/javascript";
    case "py":
      return "text/x-python";
    case "jar":
      return "application/octet-stream";
    case "json":
      return "application/json";
    case "txt":
      return "text/plain";
    default:
      return "application/octet-stream";
  }
}

// src/routes/refresh.ts
function createRefreshRouter(deps) {
  const router = new Hono2();
  const { config: config2, runtime } = deps;
  router.post("/refresh", async (c) => {
    if (config2.refreshToken || config2.adminToken) {
      const auth = c.req.raw.headers.get("Authorization");
      const validTokens = [config2.refreshToken, config2.adminToken].filter(Boolean);
      if (!validTokens.some((t) => auth === `Bearer ${t}`)) {
        return c.json({ error: "Unauthorized" }, 401);
      }
    }
    if (runtime.getPatchLock()) {
      return c.json({ error: "Patch in progress" }, 409);
    }
    try {
      const result = await deps.triggerRefresh({ source: "manual" });
      if (!result.ran) {
        return c.json({ success: false, message: "Already running, skipped" });
      }
      return c.json({ success: true, message: "Refresh completed" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return c.json({ success: false, error: msg }, 500);
    }
  });
  return router;
}

// src/core/live-merger.ts
var TRAD_SIMP_MAP = {
  "\u96FB": "\u7535",
  "\u8996": "\u89C6",
  "\u81FA": "\u53F0",
  "\u983B": "\u9891",
  "\u9053": "\u9053",
  "\u7D9C": "\u7EFC",
  "\u85DD": "\u827A",
  "\u9AD4": "\u4F53",
  "\u80B2": "\u80B2",
  "\u5287": "\u5267",
  "\u7D93": "\u7ECF",
  "\u83EF": "\u534E",
  "\u6771": "\u4E1C",
  "\u897F": "\u897F",
  "\u570B": "\u56FD",
  "\u969B": "\u9645",
  "\u4E9E": "\u4E9A",
  "\u6B50": "\u6B27",
  "\u8CA1": "\u8D22",
  "\u9CF3": "\u51E4"
};
var SUFFIX_PATTERNS = [
  /\s*\[?hd\]?$/i,
  /\s*\[?uhd\]?$/i,
  /\s*\[?fhd\]?$/i,
  /\s*高清$/,
  /\s*超清$/,
  /\s*蓝光$/,
  /\s*藍光$/,
  /\s*4k$/i,
  /\s*1080p?$/i,
  /\s*720p?$/i
];
function normalizeChannelName(raw2) {
  let s = raw2.trim();
  let out = "";
  for (const ch of s) out += TRAD_SIMP_MAP[ch] || ch;
  s = out;
  for (const p of SUFFIX_PATTERNS) s = s.replace(p, "");
  s = s.replace(/\s+/g, "").trim();
  return s || raw2.trim();
}
function parseM3U(content, source, sourceSpeedMs) {
  const lines = content.split(/\r?\n/);
  const out = [];
  let currentName = "";
  let currentGroup = "\u5176\u4ED6";
  let currentLogo;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.startsWith("#EXTINF")) {
      const grpM = line.match(/group-title="([^"]+)"/i);
      currentGroup = grpM ? grpM[1] : "\u5176\u4ED6";
      const logoM = line.match(/tvg-logo="([^"]+)"/i);
      currentLogo = logoM ? logoM[1] : void 0;
      const commaIdx = line.lastIndexOf(",");
      currentName = commaIdx > 0 ? line.slice(commaIdx + 1).trim() : "";
    } else if (line.startsWith("#")) {
      continue;
    } else if (currentName && /^https?:\/\//i.test(line)) {
      out.push({
        group: currentGroup,
        name: currentName,
        logo: currentLogo,
        url: line,
        source,
        sourceSpeedMs
      });
      currentName = "";
      currentLogo = void 0;
    }
  }
  return out;
}
function parseTxt(content, source, sourceSpeedMs) {
  const lines = content.split(/\r?\n/);
  const out = [];
  let currentGroup = "\u5176\u4ED6";
  for (const raw2 of lines) {
    const line = raw2.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf(",");
    if (idx <= 0) continue;
    const left = line.slice(0, idx).trim();
    const right = line.slice(idx + 1).trim();
    if (right === "#genre#") {
      currentGroup = left || "\u5176\u4ED6";
      continue;
    }
    const urls = right.split("#").filter((u) => /^https?:\/\//i.test(u.trim()));
    for (const u of urls) {
      out.push({
        group: currentGroup,
        name: left,
        url: u.trim(),
        source,
        sourceSpeedMs
      });
    }
  }
  return out;
}
function parseLiveContent(content, source, sourceSpeedMs) {
  if (content.includes("#EXTM3U") || content.includes("#EXTINF")) {
    return parseM3U(content, source, sourceSpeedMs);
  }
  return parseTxt(content, source, sourceSpeedMs);
}
async function downloadLive(input, timeoutMs) {
  const uas = [input.ua || TVBOX_UA, BROWSER_UA];
  for (const ua of uas) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const resp = await fetch(input.url, {
        signal: controller.signal,
        headers: { "User-Agent": ua, ...input.header || {} }
      });
      clearTimeout(timer);
      if (resp.ok) {
        const text = await resp.text();
        if (text && text.length > 20) return text;
      }
    } catch {
      clearTimeout(timer);
    }
  }
  return null;
}
function scrubTypeLiteral(s) {
  return s.replace(/type/gi, "tp");
}
function scrubUrlType(url) {
  return url.replace(/type/gi, (m) => {
    const hex = m.charCodeAt(0).toString(16).toUpperCase();
    return "%" + hex + m.slice(1);
  });
}
async function mergeLivesToNative(sources, fetchTimeoutMs, channelSpeedMap) {
  if (sources.length === 0) {
    return { groups: [], totalChannels: 0, totalUrls: 0, sourcesDownloaded: 0, sourcesFailed: 0 };
  }
  logger.info("live-merger", `Downloading ${sources.length} live source files...`);
  const downloadResults = await Promise.allSettled(
    sources.map((s) => downloadLive(s, fetchTimeoutMs).then((content) => ({ input: s, content })))
  );
  let sourcesDownloaded = 0;
  let sourcesFailed = 0;
  const allEntries = [];
  for (const r of downloadResults) {
    if (r.status === "fulfilled" && r.value.content) {
      sourcesDownloaded++;
      try {
        const entries = parseLiveContent(r.value.content, r.value.input.name, r.value.input.speedMs);
        allEntries.push(...entries);
      } catch (err) {
        logger.warn("live-merger", `Parse failed for ${r.value.input.name}: ${err}`);
      }
    } else {
      sourcesFailed++;
    }
  }
  logger.info("live-merger", `Downloaded ${sourcesDownloaded}/${sources.length} sources, parsed ${allEntries.length} channel entries`);
  const channelMap = /* @__PURE__ */ new Map();
  for (const e of allEntries) {
    const normName = normalizeChannelName(e.name);
    if (!normName) continue;
    let agg = channelMap.get(normName);
    if (!agg) {
      agg = {
        group: e.group || "\u5176\u4ED6",
        rawName: e.name,
        logo: e.logo,
        urls: /* @__PURE__ */ new Map()
      };
      channelMap.set(normName, agg);
    }
    if (!agg.urls.has(e.url)) {
      agg.urls.set(e.url, e);
    }
    if (!agg.logo && e.logo) agg.logo = e.logo;
  }
  const groupMap = /* @__PURE__ */ new Map();
  let totalUrls = 0;
  for (const [, agg] of channelMap) {
    const urlList = Array.from(agg.urls.values());
    urlList.sort((a, b) => {
      const sa = channelSpeedMap?.[a.url];
      const sb = channelSpeedMap?.[b.url];
      const fa = sa && sa.kind !== "fail" ? sa.speedMs : void 0;
      const fb = sb && sb.kind !== "fail" ? sb.speedMs : void 0;
      if (fa != null && fb != null) return fa - fb;
      if (fa != null) return -1;
      if (fb != null) return 1;
      const failA = sa?.kind === "fail";
      const failB = sb?.kind === "fail";
      if (failA && !failB) return 1;
      if (!failA && failB) return -1;
      const ssA = a.sourceSpeedMs ?? Infinity;
      const ssB = b.sourceSpeedMs ?? Infinity;
      return ssA - ssB;
    });
    const urlStrs = urlList.map((e) => `${scrubUrlType(e.url)}$${scrubTypeLiteral(e.source)}`);
    totalUrls += urlStrs.length;
    const channel = {
      name: scrubTypeLiteral(agg.rawName),
      urls: urlStrs
    };
    const groupKey = scrubTypeLiteral(agg.group || "\u5176\u4ED6");
    let list = groupMap.get(groupKey);
    if (!list) {
      list = [];
      groupMap.set(groupKey, list);
    }
    list.push(channel);
  }
  const groups = [];
  for (const [group, channels] of groupMap) {
    groups.push({ group, channels });
  }
  let finalJson = JSON.stringify(groups);
  let cleanedGroups = groups;
  if (/"type"\s*:/i.test(finalJson)) {
    logger.warn("live-merger", 'WARNING: "type" field leaked into output, stripping...');
    finalJson = finalJson.replace(/,\s*"type"\s*:\s*("[^"]*"|[\d.]+|null|true|false)/gi, "").replace(/"type"\s*:\s*("[^"]*"|[\d.]+|null|true|false)\s*,?/gi, "");
    cleanedGroups = JSON.parse(finalJson);
  }
  if (/type/i.test(finalJson)) {
    logger.warn("live-merger", 'WARNING: "type" substring in value, encoding to %74ype...');
    finalJson = finalJson.replace(/type/gi, (m) => {
      const hex = m.charCodeAt(0).toString(16).toUpperCase();
      return "%" + hex + m.slice(1);
    });
    cleanedGroups = JSON.parse(finalJson);
    return {
      groups: cleanedGroups,
      totalChannels: channelMap.size,
      totalUrls,
      sourcesDownloaded,
      sourcesFailed
    };
  }
  if (cleanedGroups !== groups) {
    return {
      groups: cleanedGroups,
      totalChannels: channelMap.size,
      totalUrls,
      sourcesDownloaded,
      sourcesFailed
    };
  }
  logger.info("live-merger", `Merged ${channelMap.size} channels / ${totalUrls} URLs across ${groups.length} groups`);
  return {
    groups,
    totalChannels: channelMap.size,
    totalUrls,
    sourcesDownloaded,
    sourcesFailed
  };
}
function extractAllUrls(groups) {
  const set = /* @__PURE__ */ new Set();
  for (const g of groups) {
    for (const ch of g.channels) {
      for (const u of ch.urls) {
        const idx = u.lastIndexOf("$");
        const bare = idx > 0 ? u.slice(0, idx) : u;
        if (bare) set.add(bare);
      }
    }
  }
  return Array.from(set);
}

// src/core/channel-probe.ts
async function isProbeEnabled(storage) {
  const v = await storage.get(CHANNEL_PROBE_ENABLED);
  return v === "true";
}
async function setProbeEnabled(storage, enabled) {
  await storage.put(CHANNEL_PROBE_ENABLED, enabled ? "true" : "false");
}
async function loadStatus(storage) {
  const raw2 = await storage.get(CHANNEL_PROBE_STATUS);
  if (raw2) {
    try {
      return JSON.parse(raw2);
    } catch {
    }
  }
  return {
    state: "idle",
    totalUrls: 0,
    probed: 0,
    success: 0,
    failed: 0,
    totalChannels: 0,
    coverage: 0
  };
}
async function saveStatus(storage, status) {
  await storage.put(CHANNEL_PROBE_STATUS, JSON.stringify(status));
}
async function loadSpeedMap(storage) {
  const raw2 = await storage.get(CHANNEL_SPEED_MAP);
  if (!raw2) return {};
  try {
    return JSON.parse(raw2);
  } catch {
    return {};
  }
}
async function saveSpeedMap(storage, map) {
  await storage.put(CHANNEL_SPEED_MAP, JSON.stringify(map));
}
function pruneExpired(map) {
  const now = Date.now();
  const out = {};
  for (const [url, entry] of Object.entries(map)) {
    const ts = Date.parse(entry.probedAt);
    if (isFinite(ts) && now - ts < CHANNEL_SPEED_TTL_MS) {
      out[url] = entry;
    }
  }
  return out;
}
async function probeSingle(url) {
  const isM3U8 = /\.m3u8(\?|$)/i.test(url);
  const isTs = /\.(ts|flv|mp4)(\?|$)/i.test(url);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CHANNEL_PROBE_TIMEOUT_MS);
  const start = Date.now();
  try {
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": TVBOX_UA }
    });
    const ttfb = Date.now() - start;
    if (!resp.ok) {
      clearTimeout(timer);
      return { url, speedMs: 0, kind: "fail" };
    }
    const reader = resp.body?.getReader();
    if (!reader) {
      clearTimeout(timer);
      return { url, speedMs: ttfb, kind: "tcp" };
    }
    try {
      const { value } = await reader.read();
      clearTimeout(timer);
      if (!value) {
        return { url, speedMs: ttfb, kind: "tcp" };
      }
      if (isM3U8) {
        const head2 = new TextDecoder().decode(value.slice(0, Math.min(1024, value.length)));
        if (head2.includes("#EXTM3U")) {
          return { url, speedMs: ttfb, kind: "m3u8" };
        }
        return { url, speedMs: 0, kind: "fail" };
      }
      if (isTs) {
        const end = Math.min(4096, value.length);
        for (let i = 0; i < end; i += 188) {
          if (value[i] === 71) {
            return { url, speedMs: ttfb, kind: "ts" };
          }
        }
        return { url, speedMs: ttfb, kind: "tcp" };
      }
      return { url, speedMs: ttfb, kind: "tcp" };
    } finally {
      reader.cancel().catch(() => {
      });
    }
  } catch {
    clearTimeout(timer);
    return { url, speedMs: 0, kind: "fail" };
  }
}
async function runWithConcurrency(items, limit, fn, onProgress) {
  const results = new Array(items.length);
  let index = 0;
  let done = 0;
  async function worker() {
    while (index < items.length) {
      const i = index++;
      try {
        results[i] = await fn(items[i], i);
      } catch {
        results[i] = { url: String(items[i]), speedMs: 0, kind: "fail" };
      }
      done++;
      if (onProgress && done % 50 === 0) onProgress(done, items.length);
    }
  }
  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  if (onProgress) onProgress(done, items.length);
  return results;
}
var running = false;
async function runChannelProbe(storage) {
  if (running) {
    logger.info("channel-probe", "Already running, skipping");
    return loadStatus(storage);
  }
  if (!await isProbeEnabled(storage)) {
    logger.info("channel-probe", "Disabled by user, skipping");
    return loadStatus(storage);
  }
  if (await storage.get(LIVE_DISABLED) === "true") {
    logger.info("channel-probe", "Live disabled, skipping");
    return loadStatus(storage);
  }
  const treeRaw = await storage.get(CHANNEL_MERGED_TREE);
  if (!treeRaw) {
    logger.info("channel-probe", "No merged tree available, skipping (run main sync first)");
    const status2 = {
      state: "error",
      totalUrls: 0,
      probed: 0,
      success: 0,
      failed: 0,
      totalChannels: 0,
      coverage: 0,
      error: "No merged channel tree (run main sync first)"
    };
    await saveStatus(storage, status2);
    return status2;
  }
  let groups;
  try {
    groups = JSON.parse(treeRaw);
  } catch (err) {
    const status2 = {
      state: "error",
      totalUrls: 0,
      probed: 0,
      success: 0,
      failed: 0,
      totalChannels: 0,
      coverage: 0,
      error: `Parse merged tree failed: ${err}`
    };
    await saveStatus(storage, status2);
    return status2;
  }
  const urls = extractAllUrls(groups);
  const totalChannels = groups.reduce((n, g) => n + g.channels.length, 0);
  if (urls.length === 0) {
    const status2 = {
      state: "done",
      totalUrls: 0,
      probed: 0,
      success: 0,
      failed: 0,
      totalChannels,
      coverage: 0,
      finishedAt: (/* @__PURE__ */ new Date()).toISOString(),
      durationMs: 0
    };
    await saveStatus(storage, status2);
    return status2;
  }
  running = true;
  const startedAt = (/* @__PURE__ */ new Date()).toISOString();
  const startMs = Date.now();
  let success = 0;
  let failed = 0;
  const status = {
    state: "running",
    startedAt,
    totalUrls: urls.length,
    probed: 0,
    success: 0,
    failed: 0,
    totalChannels,
    coverage: 0
  };
  await saveStatus(storage, status);
  logger.info("channel-probe", `Started: ${urls.length} URLs, ${totalChannels} channels, concurrency=${CHANNEL_PROBE_CONCURRENCY}`);
  try {
    const oldMap = pruneExpired(await loadSpeedMap(storage));
    const fresh = { ...oldMap };
    const toProbe = urls.filter((u) => !fresh[u]);
    logger.info("channel-probe", `${toProbe.length} new URLs to probe (${urls.length - toProbe.length} cached)`);
    const results = await runWithConcurrency(
      toProbe,
      CHANNEL_PROBE_CONCURRENCY,
      (url) => probeSingle(url),
      (done, total) => {
        status.probed = done + (urls.length - toProbe.length);
        saveStatus(storage, status).catch(() => {
        });
        if (done % 200 === 0) {
          logger.info("channel-probe", `Progress: ${done}/${total}`);
        }
      }
    );
    const now = (/* @__PURE__ */ new Date()).toISOString();
    for (const r of results) {
      fresh[r.url] = {
        speedMs: r.speedMs,
        probedAt: now,
        kind: r.kind
      };
      if (r.kind === "fail") failed++;
      else success++;
    }
    const cachedSuccess = urls.length - toProbe.length;
    success += cachedSuccess;
    await saveSpeedMap(storage, fresh);
    const durationMs = Date.now() - startMs;
    const coverage = urls.length > 0 ? Math.round(success / urls.length * 100) : 0;
    const finalStatus = {
      state: "done",
      startedAt,
      finishedAt: (/* @__PURE__ */ new Date()).toISOString(),
      durationMs,
      totalUrls: urls.length,
      probed: urls.length,
      success,
      failed,
      totalChannels,
      coverage
    };
    await saveStatus(storage, finalStatus);
    logger.info("channel-probe", `Done in ${(durationMs / 1e3).toFixed(1)}s: ${success} success, ${failed} failed, coverage=${coverage}%`);
    return finalStatus;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const errStatus = {
      state: "error",
      startedAt,
      finishedAt: (/* @__PURE__ */ new Date()).toISOString(),
      durationMs: Date.now() - startMs,
      totalUrls: urls.length,
      probed: status.probed,
      success,
      failed,
      totalChannels,
      coverage: 0,
      error: msg
    };
    await saveStatus(storage, errStatus);
    logger.error("channel-probe", `Error: ${msg}`);
    return errStatus;
  } finally {
    running = false;
  }
}
function isRunning() {
  return running;
}

// src/routes/channel-probe-admin.ts
function createChannelProbeRouter(deps) {
  const router = new Hono2();
  const { storage, config: config2 } = deps;
  const auth = adminAuthMiddleware(config2);
  router.get("/admin/channel-probe/status", auth, async (c) => {
    const [enabled, status] = await Promise.all([
      isProbeEnabled(storage),
      loadStatus(storage)
    ]);
    return c.json({
      enabled,
      running: isRunning(),
      status
    });
  });
  router.put("/admin/channel-probe/toggle", auth, async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON" }, 400);
    }
    if (typeof body.enabled !== "boolean") {
      return c.json({ error: "enabled must be a boolean" }, 400);
    }
    await setProbeEnabled(storage, body.enabled);
    return c.json({ success: true, enabled: body.enabled });
  });
  router.post("/admin/channel-probe/trigger", auth, async (c) => {
    if (isRunning()) {
      return c.json({ success: false, error: "Already running" }, 409);
    }
    if (!await isProbeEnabled(storage)) {
      return c.json({ success: false, error: "Probe is disabled, enable it first" }, 400);
    }
    runChannelProbe(storage).catch((err) => {
      logger.error("channel-probe-admin", "Trigger error: " + (err instanceof Error ? err.message : String(err)));
    });
    return c.json({ success: true, message: "Probe started" });
  });
  return router;
}

// src/routes.ts
function createApp(deps) {
  const app = new Hono2();
  const { storage, config: config2, runtime } = deps;
  app.route("/", createConfigOutputRouter({ storage, config: config2 }));
  app.route("/", createDashboardRouter({ storage, config: config2, runtime }));
  app.route("/", createUiPagesRouter({ config: config2 }));
  app.route("/", createStaticAssetsRouter());
  app.route("/", createSourceMgmtRouter({ storage, config: config2 }));
  app.route("/", createSettingsRouter({
    storage,
    config: config2,
    runtime,
    onCronScheduleChange: deps.onCronScheduleChange,
    cronEnvSchedule: deps.cronEnvSchedule
  }));
  app.route("/", createSearchQuotaRouter({ storage, config: config2 }));
  app.route("/", createCloudCredRouter({ storage, config: config2 }));
  app.route("/", createMaccmsAdminRouter({ storage, config: config2 }));
  app.route("/", createBlacklistRouter({ storage, config: config2, runtime }));
  app.route("/", createExportConfigRouter({ storage, config: config2, runtime }));
  app.route("/", createConfigEditorRouter({ storage, config: config2 }));
  app.route("/", createLiveSourcesRouter({ storage, config: config2 }));
  app.route("/", createLogViewerRouter({ storage, config: config2 }));
  if (config2.localBaseUrl) {
    app.route("/", createMaccmsProxyRouter({ storage, config: config2 }));
    app.route("/", createJarProxyRouter({ storage, config: config2 }));
  }
  app.route("/", createRefreshRouter({
    storage,
    config: config2,
    runtime,
    triggerRefresh: deps.triggerRefresh
  }));
  if (deps.enableChannelProbe) {
    app.route("/", createChannelProbeRouter({ storage, config: config2 }));
  }
  return app;
}

// src/core/parser.ts
function normalizeConfig(sourced) {
  const config2 = sourced.config;
  return {
    ...sourced,
    config: {
      spider: normalizeSpider(config2.spider, sourced.sourceUrl),
      sites: normalizeSites(config2.sites || [], config2.spider, sourced.sourceUrl),
      parses: normalizeParses(config2.parses, sourced.sourceUrl),
      lives: normalizeLives(config2.lives || [], sourced.sourceUrl),
      hosts: config2.hosts || [],
      rules: config2.rules || [],
      doh: config2.doh || [],
      ads: config2.ads || [],
      flags: config2.flags || []
    }
  };
}
function normalizeSpider(spider, sourceUrl) {
  if (!spider) return void 0;
  return resolveUrl(spider, sourceUrl);
}
function normalizeSites(sites, globalSpider, sourceUrl) {
  return sites.filter((site) => site.key && site.api !== void 0).map((site) => {
    const normalized = {
      ...site,
      name: site.name || site.key,
      searchable: site.searchable ?? 1,
      quickSearch: site.quickSearch ?? 1,
      filterable: site.filterable ?? 1
    };
    if (site.type === 0 || site.type === 1) {
      normalized.api = resolveUrl(site.api, sourceUrl);
    }
    if (site.type === 3 && isResolvableUrl(site.api)) {
      normalized.api = resolveUrl(site.api, sourceUrl);
    }
    if (site.jar) {
      normalized.jar = resolveUrl(site.jar, sourceUrl);
    }
    if (site.playUrl) {
      normalized.playUrl = resolveUrl(site.playUrl, sourceUrl);
    }
    if (site.ext) {
      normalized.ext = resolveExt(site.ext, sourceUrl);
    }
    return normalized;
  });
}
function resolveExt(ext, sourceUrl) {
  if (typeof ext === "string") {
    return isResolvableUrl(ext) ? resolveUrl(ext, sourceUrl) : ext;
  }
  const resolved = {};
  for (const [key, value] of Object.entries(ext)) {
    if (typeof value === "string" && isResolvableUrl(value)) {
      resolved[key] = resolveUrl(value, sourceUrl);
    } else {
      resolved[key] = value;
    }
  }
  return resolved;
}
function resolveUrl(url, baseUrl) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) {
    try {
      const base = new URL(baseUrl);
      return `${base.protocol}${url}`;
    } catch {
      return `https:${url}`;
    }
  }
  if (url.startsWith("./") || url.startsWith("../")) {
    try {
      return new URL(url, baseUrl).href;
    } catch {
      return url;
    }
  }
  if (url.startsWith("csp_") || url.startsWith("py_") || url.startsWith("js_")) {
    return url;
  }
  try {
    return new URL(url, baseUrl).href;
  } catch {
    return url;
  }
}
function normalizeParses(parses, sourceUrl) {
  if (!parses) return [];
  return parses.map((parse2) => {
    const normalized = { ...parse2 };
    if (parse2.url) {
      normalized.url = resolveUrl(parse2.url, sourceUrl);
    }
    if (parse2.ext) {
      normalized.ext = resolveExt(parse2.ext, sourceUrl);
    }
    return normalized;
  });
}
function normalizeLives(lives, sourceUrl) {
  return lives.map((live) => {
    const normalized = { ...live };
    if (live.url && isResolvableUrl(live.url)) {
      normalized.url = resolveUrl(live.url, sourceUrl);
    }
    if (live.api) {
      normalized.api = resolveUrl(live.api, sourceUrl);
    }
    if (live.jar) {
      normalized.jar = resolveUrl(live.jar, sourceUrl);
    }
    if (live.epg) {
      normalized.epg = resolveUrl(live.epg, sourceUrl);
    }
    if (live.ext) {
      normalized.ext = resolveExt(live.ext, sourceUrl);
    }
    return normalized;
  });
}
function isResolvableUrl(url) {
  if (!url) return false;
  if (url.startsWith("http://") || url.startsWith("https://")) return true;
  if (url.startsWith("./") || url.startsWith("../")) return true;
  if (url.startsWith("//")) return true;
  if (url.startsWith("csp_") || url.startsWith("py_") || url.startsWith("js_")) return false;
  return false;
}
function extractSpiderJarUrl(spider) {
  if (!spider) return null;
  const parts = spider.split(";md5;");
  let url = parts[0].trim();
  if (url.startsWith("img+")) {
    url = url.substring(4);
  }
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return null;
  }
  return url;
}

// src/core/dedup.ts
function deduplicateSites(sites) {
  const keyMap = /* @__PURE__ */ new Map();
  const dedupKey = (site) => {
    return `${site.key}|${site.api}`;
  };
  const result = [];
  const seen = /* @__PURE__ */ new Set();
  const usedKeys = /* @__PURE__ */ new Map();
  for (const site of sites) {
    const dk = dedupKey(site);
    if (seen.has(dk)) continue;
    seen.add(dk);
    if (keyMap.has(site.key)) {
      const existing = keyMap.get(site.key);
      if (dedupKey(existing) !== dk) {
        const count = (usedKeys.get(site.key) || 1) + 1;
        usedKeys.set(site.key, count);
        site.key = `${site.key}_${count}`;
        if (site.name) {
          site.name = `${site.name}(${count})`;
        }
      }
    } else {
      keyMap.set(site.key, site);
      usedKeys.set(site.key, 1);
    }
    result.push(site);
  }
  return result;
}
function deduplicateParses(parses) {
  const seen = /* @__PURE__ */ new Set();
  return parses.filter((parse2) => {
    const key = `${parse2.url}|${parse2.type ?? 0}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function deduplicateLives(lives) {
  const seen = /* @__PURE__ */ new Set();
  return lives.filter((live) => {
    const url = live.url || live.api || "";
    if (!url) return true;
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}
function deduplicateDoh(dohs) {
  const seen = /* @__PURE__ */ new Set();
  return dohs.filter((doh) => {
    if (seen.has(doh.url)) return false;
    seen.add(doh.url);
    return true;
  });
}
function mergeRules(rules) {
  const hostMap = /* @__PURE__ */ new Map();
  for (const rule of rules) {
    const hostKey = rule.host || (rule.hosts || []).sort().join(",");
    if (!hostKey) {
      hostMap.set(`__anon_${hostMap.size}`, rule);
      continue;
    }
    if (hostMap.has(hostKey)) {
      const existing = hostMap.get(hostKey);
      if (rule.rule) existing.rule = [.../* @__PURE__ */ new Set([...existing.rule || [], ...rule.rule])];
      if (rule.filter) existing.filter = [.../* @__PURE__ */ new Set([...existing.filter || [], ...rule.filter])];
      if (rule.regex) existing.regex = [.../* @__PURE__ */ new Set([...existing.regex || [], ...rule.regex])];
      if (rule.script) existing.script = [.../* @__PURE__ */ new Set([...existing.script || [], ...rule.script])];
    } else {
      hostMap.set(hostKey, { ...rule });
    }
  }
  return [...hostMap.values()];
}
function deduplicateHosts(hosts) {
  const map = /* @__PURE__ */ new Map();
  for (const entry of hosts) {
    const eqIndex = entry.indexOf("=");
    if (eqIndex > 0) {
      const domain = entry.substring(0, eqIndex);
      map.set(domain, entry);
    }
  }
  return [...map.values()];
}
function deduplicateStrings(arr) {
  return [...new Set(arr)];
}

// src/core/merger.ts
function mergeConfigs(sourcedConfigs) {
  const normalized = sourcedConfigs.map(normalizeConfig);
  const globalSpider = selectGlobalSpider(normalized);
  const globalSpiderFull = globalSpider ? findFullSpiderString(normalized, globalSpider) : null;
  const allSites = [];
  const allParses = [];
  const allLives = [];
  const allHosts = [];
  const allRules = [];
  const allDoh = [];
  const allAds = [];
  const allFlags = [];
  for (const sourced of normalized) {
    const config2 = sourced.config;
    if (config2.sites) {
      for (const site of config2.sites) {
        const siteCopy = { ...site };
        if (site.type === 3 && !site.jar) {
          const spiderJar = extractSpiderJarUrl(config2.spider);
          if (spiderJar && spiderJar !== globalSpider) {
            siteCopy.jar = config2.spider;
          }
        }
        allSites.push(siteCopy);
      }
    }
    if (config2.parses) allParses.push(...config2.parses);
    if (config2.lives) allLives.push(...config2.lives);
    if (config2.hosts) allHosts.push(...config2.hosts);
    if (config2.rules) allRules.push(...config2.rules);
    if (config2.doh) allDoh.push(...config2.doh);
    if (config2.ads) allAds.push(...config2.ads);
    if (config2.flags) allFlags.push(...config2.flags);
  }
  const dedupedSites = deduplicateSites(allSites);
  const spider = globalSpiderFull || globalSpider;
  const merged = {
    ...spider ? { spider } : {},
    sites: dedupedSites,
    parses: deduplicateParses(allParses || []),
    lives: deduplicateLives(allLives || []),
    hosts: deduplicateHosts(allHosts),
    rules: mergeRules(allRules || []),
    doh: deduplicateDoh(allDoh || []),
    ads: deduplicateStrings(allAds),
    flags: deduplicateStrings(allFlags)
  };
  logger.info("merger", `Merged: ${merged.sites?.length} sites, ${merged.parses?.length} parses, ${merged.lives?.length} lives`);
  return { config: merged };
}
function selectGlobalSpider(configs) {
  const jarCounts = /* @__PURE__ */ new Map();
  for (const sourced of configs) {
    const spiderJar = extractSpiderJarUrl(sourced.config.spider);
    if (!spiderJar) continue;
    const type3Count = (sourced.config.sites || []).filter((s) => s.type === 3 && !s.jar).length;
    if (type3Count > 0) {
      jarCounts.set(spiderJar, (jarCounts.get(spiderJar) || 0) + type3Count);
    }
  }
  if (jarCounts.size === 0) return null;
  let maxJar = null;
  let maxCount = 0;
  for (const [jar, count] of jarCounts) {
    if (count > maxCount) {
      maxCount = count;
      maxJar = jar;
    }
  }
  return maxJar;
}
function findFullSpiderString(configs, jarUrl) {
  for (const sourced of configs) {
    const extracted = extractSpiderJarUrl(sourced.config.spider);
    if (extracted === jarUrl && sourced.config.spider) {
      return sourced.config.spider;
    }
  }
  return null;
}
function cleanEmptyEntries(config2) {
  const before = {
    sites: config2.sites?.length || 0,
    parses: config2.parses?.length || 0,
    lives: config2.lives?.length || 0,
    doh: config2.doh?.length || 0
  };
  const sites = (config2.sites || []).filter((s) => s.key && s.api);
  const parses = (config2.parses || []).filter((p) => p.name && p.url);
  const lives = (config2.lives || []).filter((l) => l.url || l.api);
  const doh = (config2.doh || []).filter((d) => d.name && d.url);
  const removed = before.sites - sites.length + (before.parses - parses.length) + (before.lives - lives.length) + (before.doh - doh.length);
  if (removed > 0) {
    logger.info("cleaner", `Removed ${removed} empty entries: ${before.sites - sites.length} sites, ${before.parses - parses.length} parses, ${before.lives - lives.length} lives, ${before.doh - doh.length} doh`);
  }
  return { ...config2, sites, parses, lives, doh };
}
function cleanLocalRefs(config2) {
  const isLocal = (url) => url.includes("127.0.0.1") || url.includes("localhost");
  const sites = (config2.sites || []).filter((site) => {
    if (site.api && isLocal(site.api)) {
      logger.info("cleaner", `Removed site ${site.key}: local api ${site.api}`);
      return false;
    }
    if (typeof site.ext === "string" && isLocal(site.ext)) {
      logger.info("cleaner", `Removed site ${site.key}: local ext`);
      return false;
    }
    return true;
  });
  const lives = (config2.lives || []).filter((live) => {
    if (live.url && isLocal(live.url)) {
      logger.info("cleaner", `Removed live ${live.name || "unnamed"}: local url ${live.url}`);
      return false;
    }
    return true;
  });
  const removedSites = (config2.sites?.length || 0) - sites.length;
  const removedLives = (config2.lives?.length || 0) - lives.length;
  if (removedSites > 0 || removedLives > 0) {
    logger.info("cleaner", `Removed ${removedSites} sites, ${removedLives} lives with local refs`);
  }
  return { ...config2, sites, lives };
}

// src/core/speedtest.ts
async function httpSpeedTest(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const start = Date.now();
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": TVBOX_UA }
    });
    const speedMs = Date.now() - start;
    if (!resp.ok) return null;
    await resp.text();
    return speedMs;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
async function batchSiteSpeedTest(sites, timeoutMs) {
  const tasks = [];
  for (const site of sites) {
    const url = getTestableUrl(site);
    if (url) {
      tasks.push({ key: site.key, name: site.name, url });
      logger.infoFields("speedtest", "site-test-queued", {
        key: site.key,
        name: site.name || site.key,
        url
      });
    } else {
      logger.debugFields("speedtest", "site-test-skipped", {
        key: site.key,
        name: site.name || site.key,
        api: site.api,
        type: site.type,
        reason: "not_testable"
      });
    }
  }
  if (tasks.length === 0) return /* @__PURE__ */ new Map();
  logger.infoFields("speedtest", "batch-start", { count: tasks.length, timeoutMs });
  const results = await Promise.allSettled(
    tasks.map(async ({ key, name, url }) => {
      const speedMs = await httpSpeedTest(url, timeoutMs);
      return { key, name, url, speedMs };
    })
  );
  const speedMap = /* @__PURE__ */ new Map();
  for (const result of results) {
    if (result.status === "fulfilled") {
      speedMap.set(result.value.key, result.value.speedMs);
      logger.infoFields("speedtest", "site-test-result", {
        key: result.value.key,
        name: result.value.name || result.value.key,
        url: result.value.url,
        status: result.value.speedMs === null ? "unreachable" : "reachable",
        speedMs: result.value.speedMs
      });
    } else {
      logger.warnFields("speedtest", "site-test-error", { error: result.reason });
    }
  }
  const passed = [...speedMap.values()].filter((v) => v !== null).length;
  logger.infoFields("speedtest", "batch-complete", {
    reachable: passed,
    total: speedMap.size
  });
  return speedMap;
}
function appendSpeedToName(sites, speedMap) {
  return sites.map((site) => {
    const speedMs = speedMap.get(site.key);
    if (speedMs == null) return site;
    const seconds = (speedMs / 1e3).toFixed(1);
    return { ...site, name: `${site.name || site.key} [${seconds}s]` };
  });
}
function filterUnreachableSites(sites, speedMap) {
  const totalTestable = [...speedMap.keys()].length;
  if (totalTestable === 0) return { sites, filtered: 0 };
  const reachable = [];
  const unreachable = [];
  for (const site of sites) {
    const speed = speedMap.get(site.key);
    if (speed === void 0) {
      reachable.push(site);
    } else if (speed !== null) {
      reachable.push(site);
    } else {
      unreachable.push(site);
    }
  }
  const reachableTestable = reachable.filter((s) => speedMap.has(s.key)).length;
  if (totalTestable > 0 && reachableTestable / totalTestable < 0.1) {
    logger.warnFields("speedtest", "safety-valve", {
      reachable: reachableTestable,
      totalTestable,
      threshold: "10%",
      result: "keeping_all"
    });
    return { sites, filtered: 0 };
  }
  for (const site of unreachable) {
    logger.infoFields("speedtest", "site-filtered", {
      key: site.key,
      name: site.name || site.key,
      api: site.api,
      reason: "unreachable"
    });
  }
  logger.infoFields("speedtest", "filter-complete", {
    filtered: unreachable.length,
    kept: reachable.length
  });
  return { sites: reachable, filtered: unreachable.length };
}
function getTestableUrl(site) {
  const api = site.api || "";
  if (api.startsWith(BASE_URL_PLACEHOLDER)) return null;
  if (site.type === 1) {
    return api.includes("?") ? `${api}&ac=list` : `${api}?ac=list`;
  }
  if (site.type === 0) {
    if (api.startsWith("http")) return api;
    return null;
  }
  if (site.type === 3) {
    if (api.startsWith("http://") || api.startsWith("https://")) return api;
    return null;
  }
  return null;
}

// src/core/cleaner.ts
function transformSiteNames(config2, transform) {
  if (!config2.sites || config2.sites.length === 0) return config2;
  const sites = config2.sites.map((site) => {
    let name = site.name || "";
    if (transform.prefix) name = transform.prefix + name;
    if (transform.suffix) name = name + transform.suffix;
    if (!name.trim()) name = site.key;
    return { ...site, name };
  });
  return { ...config2, sites };
}

// src/core/source-scraper.ts
var MAX_PAGES = 10;
async function scrapeSourceList(cfg) {
  const allSources = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    try {
      const html = await fetchPage(cfg, page);
      if (!html || !html.trim()) break;
      const sources = parsePage(html);
      if (sources.length === 0) break;
      allSources.push(...sources);
      logger.debug("source-scraper", `Page ${page}: ${sources.length} sources`);
      sources.forEach((source, index) => logger.debugFields("source-scraper", "page-source", {
        page,
        index: index + 1,
        name: source.name,
        url: source.url
      }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.warn("source-scraper", `Page ${page} failed: ${msg}`);
      break;
    }
  }
  logger.info("source-scraper", `Total scraped: ${allSources.length} sources`);
  return allSources;
}
async function fetchPage(cfg, page) {
  const resp = await fetch(cfg.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "okhttp/3.12.0",
      "Referer": cfg.referer,
      "X-Requested-With": "XMLHttpRequest"
    },
    body: `action=load&page=source&type=one&paged=${page}`
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.text();
}
function parsePage(html) {
  const sources = [];
  const nameRegex = /col-form-label">([^<]+)</g;
  const urlRegex = /value="([^"]+)"/g;
  const names = [];
  const urls = [];
  let m;
  while ((m = nameRegex.exec(html)) !== null) names.push(m[1].trim());
  while ((m = urlRegex.exec(html)) !== null) urls.push(m[1].trim());
  for (let i = 0; i < names.length && i < urls.length; i++) {
    const url = urls[i];
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      sources.push({ name: names[i], url });
    }
  }
  return sources;
}
async function scrapeMacCMSSources(cfg) {
  logger.info("maccms-scraper", "Fetching from API...");
  const url = `${cfg.apiUrl}?t=${Math.floor(Date.now() / 1e3)}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`MacCMS API HTTP ${resp.status}`);
  }
  const json = await resp.json();
  if (json.code !== 200 || !json.data) {
    throw new Error(`MacCMS API error: code=${json.code}`);
  }
  const decrypted = await decryptData(json.data, cfg.aesKey, cfg.aesIv);
  const parsed = JSON.parse(decrypted);
  if (!parsed.list) {
    throw new Error("Decrypted data has no list field");
  }
  const sections = ["zanzhu", "m3u8"];
  const seen = /* @__PURE__ */ new Map();
  for (const section of sections) {
    const rows = parsed.list[section]?.rows || [];
    for (const row of rows) {
      if (!row.flag || !row.apis || !row.name) continue;
      if (!seen.has(row.flag)) {
        seen.set(row.flag, {
          key: row.flag,
          name: row.name,
          api: row.apis
        });
      }
    }
  }
  const entries = Array.from(seen.values());
  logger.info("maccms-scraper", `Scraped ${entries.length} unique sources`);
  entries.forEach((entry, index) => logger.infoFields("maccms-scraper", "source-scraped", {
    index: index + 1,
    key: entry.key,
    name: entry.name,
    api: entry.api
  }));
  return entries;
}
async function decryptData(base64Data, key, iv) {
  const keyBytes = new TextEncoder().encode(key);
  const ivBytes = new TextEncoder().encode(iv);
  const binaryStr = atob(base64Data);
  const ciphertext = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    ciphertext[i] = binaryStr.charCodeAt(i);
  }
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivBytes },
    cryptoKey,
    ciphertext
  );
  return new TextDecoder().decode(decrypted);
}

// src/syncer.ts
var fs4 = __toESM(require("fs"));
var path3 = __toESM(require("path"));
async function runSync(storage, config2) {
  const startTime = Date.now();
  logger.infoFields("sync", "run-start", {
    fetchTimeoutMs: config2.fetchTimeoutMs,
    siteTimeoutMs: config2.siteTimeoutMs,
    speedTimeoutMs: config2.speedTimeoutMs
  });
  try {
    await _runSync(storage, config2, startTime);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : "";
    logger.error("sync", `FATAL ERROR: ${msg}`);
    logger.error("sync", `Stack: ${stack}`);
    await storage.put(LAST_UPDATE, `ERROR @ ${(/* @__PURE__ */ new Date()).toISOString()}: ${msg}`);
    try {
      cleanStaleTempDir();
    } catch (cleanupErr) {
      logger.warn("sync", `Failed to clean temp directory after sync failure: ${cleanupErr instanceof Error ? cleanupErr.message : String(cleanupErr)}`);
    }
  }
}
async function _runSync(storage, config2, startTime) {
  if (config2.scrapeSourceUrl && config2.scrapeSourceReferer) {
    logger.info("sync", "Step 0: Auto-scraping sources...");
    try {
      const scrapeCfg = { url: config2.scrapeSourceUrl, referer: config2.scrapeSourceReferer };
      const scraped = await scrapeSourceList(scrapeCfg);
      if (scraped.length > 0) {
        const existingRaw = await storage.get(MANUAL_SOURCES);
        const existingSources = existingRaw ? JSON.parse(existingRaw) : [];
        const existingUrls = new Set(existingSources.map((s) => s.url));
        let added = 0;
        const addedSources = [];
        for (const source of scraped) {
          if (!existingUrls.has(source.url)) {
            existingSources.push(source);
            existingUrls.add(source.url);
            added++;
            addedSources.push(source);
          }
        }
        if (added > 0) {
          await storage.put(MANUAL_SOURCES, JSON.stringify(existingSources));
          logger.infoFields("sync", "auto-scrape-added", { added, total: existingSources.length });
          addedSources.forEach((source, index) => logger.infoFields("sync", "auto-scrape-source", {
            index: index + 1,
            name: source.name,
            url: source.url,
            added: true
          }));
        } else {
          logger.infoFields("sync", "auto-scrape-none-added", { scraped: scraped.length, reason: "all_exist" });
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.warn("sync", `Auto-scrape failed (non-blocking): ${msg}`);
    }
  }
  if (config2.maccmsApiUrl && config2.maccmsAesKey && config2.maccmsAesIv) {
    logger.info("sync", "Step 0.5: Auto-scraping MacCMS sources...");
    try {
      const maccmsCfg = { apiUrl: config2.maccmsApiUrl, aesKey: config2.maccmsAesKey, aesIv: config2.maccmsAesIv };
      const scraped = await scrapeMacCMSSources(maccmsCfg);
      if (scraped.length > 0) {
        await storage.put(MACCMS_SOURCES, JSON.stringify(scraped));
        logger.infoFields("sync", "maccms-auto-scraped", { count: scraped.length });
        scraped.forEach((source, index) => logger.infoFields("sync", "maccms-auto-source", {
          index: index + 1,
          key: source.key,
          name: source.name,
          api: source.api
        }));
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.warn("sync", `MacCMS auto-scrape failed (non-blocking): ${msg}`);
    }
  }
  logger.info("sync", "Step 1: Loading sources...");
  const raw2 = await storage.get(MANUAL_SOURCES);
  const sources = raw2 ? JSON.parse(raw2) : [];
  const macCMSRaw = await storage.get(MACCMS_SOURCES);
  const hasMacCMS = macCMSRaw ? JSON.parse(macCMSRaw).length > 0 : false;
  if (sources.length === 0 && !hasMacCMS) {
    logger.warn("sync", "No sources configured, nothing to do");
    return;
  }
  logger.infoFields("sync", "config-sources-loaded", { count: sources.length });
  sources.forEach((source, index) => {
    logger.infoFields("sync", "config-source", {
      index: index + 1,
      name: source.name,
      url: source.url,
      kind: source.url.startsWith("inline://") ? "inline" : "remote",
      key: source.configKey ? "present" : "none"
    });
  });
  await storage.put(SOURCE_URLS, JSON.stringify(sources));
  logger.info("sync", "Step 1.5: Processing MacCMS sources...");
  const macCMSConfigs = await processMacCMSSources(storage, config2);
  const remoteSources = sources.filter((s) => !s.url.startsWith("inline://"));
  const inlineSources = sources.filter((s) => s.url.startsWith("inline://"));
  const inlineConfigs = [];
  logger.infoFields("sync", "source-split", {
    remote: remoteSources.length,
    inline: inlineSources.length
  });
  for (const src of inlineSources) {
    const kvKey = src.url.replace("inline://", "");
    const raw3 = await storage.get(kvKey);
    if (raw3) {
      const parsed = parseConfigJson(raw3);
      if (parsed.ok) {
        inlineConfigs.push({ sourceUrl: src.url, sourceName: src.name || "Inline", config: parsed.config });
        logger.infoFields("sync", "inline-loaded", {
          name: src.name || "Inline",
          key: kvKey,
          sites: parsed.config.sites?.length || 0,
          parses: parsed.config.parses?.length || 0,
          lives: parsed.config.lives?.length || 0
        });
      } else {
        logger.warnFields("sync", "inline-parse-failed", {
          name: src.name,
          key: kvKey,
          errorCategory: parsed.errorCategory,
          message: parsed.message
        });
      }
    } else {
      logger.warnFields("sync", "inline-missing", { name: src.name, key: kvKey });
    }
  }
  logger.info("sync", "Step 2: Fetching configs...");
  let proxyConfig;
  const edgeRaw = await storage.get(EDGE_PROXIES);
  if (edgeRaw) {
    const edge = JSON.parse(edgeRaw);
    const urls = [];
    if (edge.fetchProxy) urls.push(`${edge.fetchProxy}/fetch-proxy`);
    if (edge.vercel) urls.push(`${edge.vercel}/api/proxy`);
    if (urls.length > 0) {
      proxyConfig = { urls, token: config2.adminToken };
      logger.info("sync", `Edge proxies configured: ${urls.join(", ")}`);
    }
  }
  const { configs: sourcedConfigs, fetchResults } = await fetchConfigs(remoteSources, config2.fetchTimeoutMs, proxyConfig);
  fetchResults.forEach((result) => {
    logger.infoFields("sync", "fetch-result", {
      name: result.name,
      url: result.url,
      status: result.status,
      speedMs: result.speedMs,
      error: result.errorMessage
    });
  });
  fetchResults.filter((r) => r.validationError).forEach((result) => {
    const ve = result.validationError;
    logger.infoFields("sync", "source-validation-error", {
      name: result.name,
      url: result.url,
      errorCategory: ve.errorCategory,
      message: ve.message,
      preview: ve.preview
    });
  });
  await updateSourceHealth(storage, fetchResults);
  if (sourcedConfigs.length === 0 && inlineConfigs.length === 0 && macCMSConfigs.length === 0) {
    logger.warn("sync", "No valid configs fetched and no MacCMS/inline sources, keeping previous cache");
    return;
  }
  let filteredConfigs = sourcedConfigs;
  const configsWithSpeed = sourcedConfigs.filter((c) => c.speedMs != null);
  if (configsWithSpeed.length > 0) {
    logger.info("sync", "Step 3: Filtering configs by fetch speed...");
    filteredConfigs = sourcedConfigs.filter((c) => {
      if (c.speedMs == null) {
        logger.infoFields("sync", "speed-filter-keep", {
          name: c.sourceName,
          url: c.sourceUrl,
          reason: "no_speed_data"
        });
        return true;
      }
      if (c.speedMs <= config2.speedTimeoutMs) {
        logger.infoFields("sync", "speed-filter-keep", {
          name: c.sourceName,
          url: c.sourceUrl,
          speedMs: c.speedMs,
          thresholdMs: config2.speedTimeoutMs
        });
        return true;
      }
      logger.infoFields("sync", "speed-filter-remove", {
        name: c.sourceName,
        url: c.sourceUrl,
        speedMs: c.speedMs,
        thresholdMs: config2.speedTimeoutMs
      });
      return false;
    });
    if (filteredConfigs.length === 0) {
      logger.warn("sync", "All configs failed speed filter, using all fetched configs");
      filteredConfigs = sourcedConfigs;
    } else {
      logger.info("sync", `${filteredConfigs.length}/${sourcedConfigs.length} configs passed speed filter`);
    }
  } else {
    logger.info("sync", "Step 3: No speed data available, skipping filter");
  }
  logger.info("sync", "Step 4: Merging configs...");
  const allConfigs = [...filteredConfigs, ...inlineConfigs, ...macCMSConfigs];
  logger.infoFields("sync", "merge-inputs", {
    remote: filteredConfigs.length,
    inline: inlineConfigs.length,
    maccms: macCMSConfigs.length,
    total: allConfigs.length
  });
  allConfigs.forEach((source, index) => logger.infoFields("sync", "merge-source", {
    index: index + 1,
    name: source.sourceName,
    url: source.sourceUrl,
    sites: source.config.sites?.length || 0,
    parses: source.config.parses?.length || 0,
    lives: source.config.lives?.length || 0
  }));
  const mergeResult = mergeConfigs(allConfigs);
  let merged = mergeResult.config;
  logger.infoFields("sync", "merge-output", configCounts(merged));
  logger.info("sync", "Step 4.5: Applying blacklist...");
  const blacklist = await loadBlacklist(storage);
  const hasBlacklist = blacklist.sites.length > 0 || blacklist.parses.length > 0 || blacklist.lives.length > 0 || blacklist.regexRules.length > 0;
  logger.infoFields("sync", "blacklist-inventory", {
    sites: blacklist.sites.length,
    parses: blacklist.parses.length,
    lives: blacklist.lives.length,
    regexRules: blacklist.regexRules.length,
    overrides: blacklist.regexBlockOverrides.length
  });
  await storage.put(MERGED_CONFIG_FULL, JSON.stringify(merged));
  if (hasBlacklist) {
    const pruned = await pruneBlacklist(blacklist, merged);
    if (JSON.stringify(pruned) !== JSON.stringify(blacklist)) {
      await saveBlacklist(storage, pruned);
      logger.infoFields("sync", "blacklist-pruned", {
        sitesBefore: blacklist.sites.length,
        sitesAfter: pruned.sites.length,
        parsesBefore: blacklist.parses.length,
        parsesAfter: pruned.parses.length,
        livesBefore: blacklist.lives.length,
        livesAfter: pruned.lives.length
      });
    }
    const { config: filtered, removedSites, removedParses, removedLives, removedByRegex, removedItems } = await applyBlacklist(merged, pruned);
    merged = filtered;
    removedItems.forEach((item) => logger.infoFields("sync", "blacklist-removed-item", {
      kind: item.kind,
      key: item.key,
      name: item.name,
      url: item.url,
      fingerprint: item.fingerprint,
      pattern: item.pattern
    }));
    if (removedByRegex > 0) {
      logger.info("sync", `Blacklist removed: ${removedSites} sites, ${removedParses} parses, ${removedLives} lives; regex removed ${removedByRegex} sites`);
    } else {
      logger.info("sync", `Blacklist removed: ${removedSites} sites, ${removedParses} parses, ${removedLives} lives`);
    }
  } else {
    logger.info("sync", "Step 4.5: No blacklist entries, skipping");
  }
  logger.info("sync", "Step 4.6: Cleaning invalid entries...");
  const beforeClean = configCounts(merged);
  merged = cleanEmptyEntries(merged);
  merged = cleanLocalRefs(merged);
  logger.infoFields("sync", "cleanup-complete", {
    ...beforeAfterCounts(beforeClean, configCounts(merged))
  });
  logger.info("sync", "Step 4.6.5: Generating EXPORT_CONFIG snapshot...");
  const liveDisabledRaw465 = await storage.get(LIVE_DISABLED);
  const liveDisabled465 = liveDisabledRaw465 !== "false";
  const exportConfig = await generateExportConfig(merged, blacklist, liveDisabled465);
  delete exportConfig.pic;
  await storage.put(EXPORT_CONFIG, JSON.stringify(exportConfig));
  logger.infoFields("sync", "export-config-snapshot", {
    sites: exportConfig.sites?.length || 0,
    parses: exportConfig.parses?.length || 0,
    lives: exportConfig.lives?.length || 0,
    liveDisabled: liveDisabled465
  });
  const quotaConfig = await loadSearchQuota(storage);
  if (merged.sites) {
    const { sites: quotaSites, quotaReport } = applySearchQuota(merged.sites, quotaConfig);
    merged.sites = quotaSites;
    logger.infoFields("sync", "search-quota-complete", {
      totalSites: quotaReport.totalSites,
      jsExcluded: quotaReport.jsExcluded,
      pinned: quotaReport.pinnedCount,
      truncated: quotaReport.truncated,
      searchable: quotaReport.searchable
    });
    await storage.put(SEARCH_QUOTA_REPORT, JSON.stringify({
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      ...quotaReport
    }));
  }
  const ntRaw = await storage.get(NAME_TRANSFORM);
  const nameTransform = ntRaw ? JSON.parse(ntRaw) : {};
  if (nameTransform.prefix || nameTransform.suffix) {
    logger.infoFields("sync", "name-transform-start", {
      prefix: Boolean(nameTransform.prefix),
      suffix: Boolean(nameTransform.suffix),
      sites: merged.sites?.length || 0
    });
    merged = transformSiteNames(merged, nameTransform);
  }
  const credentials = await loadCredentials(storage);
  if (credentials.size > 0 && merged.sites && merged.sites.length > 0) {
    logger.infoFields("sync", "credential-injection-start", {
      credentials: credentials.size,
      sites: merged.sites.length
    });
    const credentialPolicy = await loadCredentialPolicy(storage);
    const { sites: injectedSites, report: injReport } = injectCredentials(
      merged.sites,
      credentials,
      credentialPolicy,
      BASE_URL_PLACEHOLDER
    );
    merged.sites = injectedSites;
    logger.infoFields("sync", "credential-injection-complete", {
      injected: injReport.injected,
      skippedSafe: injReport.skippedSafe,
      skippedHighRisk: injReport.skippedHighRisk,
      skippedUnaudited: injReport.skippedUnaudited,
      skippedNoRule: injReport.skippedNoRule,
      skippedNoCredential: injReport.skippedNoCredential
    });
  } else {
    logger.info("sync", "Step 5.7: No cloud credentials configured, skipping");
  }
  const speedTestRaw = await storage.get(SPEED_TEST_ENABLED);
  const speedTestEnabled = speedTestRaw !== "false";
  if (!speedTestEnabled) {
    logger.info("sync", "Step 6: Speed test disabled, skipping");
  } else if (merged.sites && merged.sites.length > 0) {
    logger.infoFields("sync", "site-speed-start", {
      sites: merged.sites.length,
      timeoutMs: config2.siteTimeoutMs
    });
    const speedMap = await batchSiteSpeedTest(merged.sites, config2.siteTimeoutMs);
    if (speedMap.size > 0) {
      const { sites: filteredSites, filtered } = filterUnreachableSites(merged.sites, speedMap);
      merged.sites = filteredSites;
      logger.infoFields("sync", "site-speed-filter-complete", {
        tested: speedMap.size,
        filtered,
        remaining: merged.sites.length
      });
      merged.sites = appendSpeedToName(merged.sites, speedMap);
    }
  } else {
    logger.info("sync", "Step 6: No sites to test");
  }
  logger.info("sync", "Step 6.5: Channel-level live merging...");
  {
    const liveDisabledRaw = await storage.get(LIVE_DISABLED);
    const liveDisabled = liveDisabledRaw !== "false";
    if (liveDisabled) {
      logger.info("sync", "Step 6.5: live_disabled=true, skipping live merge and clearing lives");
      merged.lives = [];
    } else {
      const liveInputs = [];
      for (const l of merged.lives || []) {
        if (l.group && !l.url && !l.api) continue;
        const u = l.url || l.api;
        if (!u || !/^https?:\/\//i.test(u)) continue;
        if (u.includes("127.0.0.1") || u.includes("localhost")) continue;
        liveInputs.push({
          name: l.name || "source",
          url: u,
          ua: l.ua,
          header: l.header
        });
      }
      const liveRaw = await storage.get(LIVE_SOURCES);
      if (liveRaw) {
        try {
          const manual = JSON.parse(liveRaw);
          for (const m of manual) {
            if (!m.url || !/^https?:\/\//i.test(m.url)) continue;
            if (m.url.includes("127.0.0.1") || m.url.includes("localhost")) continue;
            liveInputs.push({ name: m.name || "manual", url: m.url });
          }
        } catch {
        }
      }
      const seen = /* @__PURE__ */ new Set();
      const uniqueInputs = liveInputs.filter((i) => {
        if (seen.has(i.url)) return false;
        seen.add(i.url);
        return true;
      });
      if (uniqueInputs.length === 0) {
        logger.info("sync", "Step 6.5: No live sources to merge");
        merged.lives = [];
      } else {
        logger.infoFields("sync", "live-merge-inputs", { unique: uniqueInputs.length });
        uniqueInputs.forEach((input, index) => logger.infoFields("sync", "live-source", {
          index: index + 1,
          name: input.name,
          url: input.url,
          ua: input.ua ? "present" : "none",
          header: input.header ? "present" : "none"
        }));
        const channelSpeedMap = await loadSpeedMap(storage);
        const mergeResult2 = await mergeLivesToNative(uniqueInputs, config2.fetchTimeoutMs, channelSpeedMap);
        merged.lives = mergeResult2.groups;
        await storage.put(CHANNEL_MERGED_TREE, JSON.stringify(mergeResult2.groups));
        logger.infoFields("sync", "live-merge-complete", {
          sourcesDownloaded: mergeResult2.sourcesDownloaded,
          sourcesTotal: uniqueInputs.length,
          groups: mergeResult2.groups.length,
          channels: mergeResult2.totalChannels,
          urls: mergeResult2.totalUrls
        });
      }
    }
  }
  const jarSourceIndexMap = /* @__PURE__ */ new Map();
  if (merged.sites) {
    for (const site of merged.sites) {
      if (site.jar) {
        const parsed = parseSpiderString(site.jar);
        if (parsed.url.startsWith("http://") || parsed.url.startsWith("https://")) {
          if (!jarSourceIndexMap.has(parsed.url)) {
            jarSourceIndexMap.set(parsed.url, jarSourceIndexMap.size);
          }
        }
      }
    }
  }
  logger.info("sync", "Step 7: Rewriting JAR URLs for proxy (placeholder)...");
  const beforeJar = configCounts(merged);
  merged = await rewriteJarUrls(merged, BASE_URL_PLACEHOLDER, storage, jarSourceIndexMap);
  logger.infoFields("sync", "jar-rewrite-complete", {
    ...beforeJar,
    placeholder: BASE_URL_PLACEHOLDER,
    spider: merged.spider ? "present" : "none"
  });
  logger.info("sync", "Step 7.1: Downloading static resources...");
  if (merged.sites && merged.sites.length > 0) {
    cleanStaleTempDir();
    fs4.mkdirSync(getTmpSitesDir(), { recursive: true });
    const resources = collectAllSiteResources(merged.sites, merged.parses);
    const sorted = sortResourcesByPriority(resources, merged.spider);
    if (sorted.length > 0) {
      logger.infoFields("sync", "static-resources-found", { count: sorted.length });
      const downloadTimeout = config2.fetchTimeoutMs || 1e4;
      let downloaded = 0;
      let failed = 0;
      let copiedFromLive = 0;
      for (const { url, type } of sorted) {
        let key = null;
        if (type === "jar") {
          const parsed = parseSpiderString(url);
          key = parsed.md5 || await urlToKey(url);
        } else {
          key = await urlToKey(url);
        }
        if (!key) {
          failed++;
          continue;
        }
        let resourceIndex = 0;
        if (type === "jar") {
          const jarSourceRaw = await storage.get(`jar-source:${key}`);
          if (jarSourceRaw) {
            try {
              resourceIndex = JSON.parse(jarSourceRaw).index;
            } catch {
            }
          } else {
            const siteIdx = merged.sites.findIndex(
              (s) => s.jar && parseSpiderString(s.jar).url === url
            );
            resourceIndex = siteIdx >= 0 ? siteIdx : 0;
          }
        } else {
          const staticSourceRaw = await storage.get(`static-source:${key}`);
          if (staticSourceRaw) {
            try {
              resourceIndex = JSON.parse(staticSourceRaw).index;
            } catch {
            }
          }
          if (!staticSourceRaw) {
            const originalIdx = resources.findIndex((r) => r.url === url);
            if (originalIdx >= 0 && originalIdx < merged.sites.length) {
              resourceIndex = originalIdx;
            } else if (originalIdx >= merged.sites.length) {
              logger.warn("sync", `Static resource ${url.substring(0, 60)}... is parse-sourced (originalIdx=${originalIdx}, sites=${merged.sites.length}); falling back to site 01 \u2014 disk layout may be misleading`);
            }
          }
        }
        const tmpDir = path3.join(getTmpSitesDir(), siteIndexToDirName(resourceIndex), type);
        fs4.mkdirSync(tmpDir, { recursive: true });
        const liveDir = getSiteResourceDir(resourceIndex, type);
        let liveFilePath = null;
        const newFilePath = path3.join(liveDir, `${key}.${type}`);
        if (fs4.existsSync(newFilePath)) {
          liveFilePath = newFilePath;
        } else {
          liveFilePath = findCacheFile(liveDir, key);
        }
        const md5Key = isMd5Key(key);
        const ttlMs = md5Key ? 864e5 : 216e5;
        if (liveFilePath && isCacheFileValid(liveFilePath, ttlMs)) {
          try {
            const fileName = path3.basename(liveFilePath);
            fs4.copyFileSync(liveFilePath, path3.join(tmpDir, fileName));
            copiedFromLive++;
            logger.infoFields("sync", "resource-copied-from-live", {
              type,
              key,
              site: resourceIndex + 1,
              fileName
            });
            continue;
          } catch (copyErr) {
            logger.warn("sync", `Failed to copy valid cache ${key}: ${copyErr instanceof Error ? copyErr.message : String(copyErr)}, falling back to download`);
          }
        }
        try {
          const data = await downloadResource(url, downloadTimeout);
          if (!data) {
            failed++;
            logger.warn("sync", `Failed to download ${type}: ${url.substring(0, 60)}...`);
            continue;
          }
          try {
            await writeResourceCache(key, data, tmpDir, url, storage, resourceIndex, type);
            downloaded++;
          } catch (writeErr) {
            failed++;
            logger.warn("sync", `Failed to write resource ${type} ${key}: ${writeErr instanceof Error ? writeErr.message : String(writeErr)}`);
            continue;
          }
          logger.infoFields("sync", "resource-downloaded", {
            type,
            key,
            sizeKB: (data.length / 1024).toFixed(1),
            site: resourceIndex + 1
          });
        } catch (downloadErr) {
          failed++;
          logger.warn("sync", `Unexpected error downloading ${type} ${key}: ${downloadErr instanceof Error ? downloadErr.message : String(downloadErr)}`);
          continue;
        }
      }
      logger.infoFields("sync", "static-resource-download-complete", { downloaded, copiedFromLive, failed, total: sorted.length });
    } else {
      logger.info("sync", "Step 7.1: No static resources found");
    }
  } else {
    logger.info("sync", "Step 7.1: No sites to scan");
  }
  logger.info("sync", "Step 7.1.5: Rewriting non-JAR resource URLs...");
  merged = await rewriteNonJarUrls(merged, BASE_URL_PLACEHOLDER, storage);
  await cleanupOrphanedStaticSources(storage, merged);
  logger.info("sync", "Step 7.2: Atomic swap temp directory to live...");
  swapSiteDirectories();
  logger.info("sync", "Step 7.3: Cleaning zombie files...");
  await cleanupZombieFiles(storage);
  const edgeRaw2 = await storage.get(EDGE_PROXIES);
  if (edgeRaw2) {
    const edge = JSON.parse(edgeRaw2);
    if (edge.fetchProxy) {
      merged.pic = `${edge.fetchProxy.replace(/\/$/, "")}/img/`;
      logger.infoFields("sync", "pic-proxy-injected", { pic: merged.pic });
    }
  }
  const mergedJson = JSON.stringify(merged);
  await storage.put(MERGED_CONFIG, mergedJson);
  await storage.put(LAST_UPDATE, (/* @__PURE__ */ new Date()).toISOString());
  logger.infoFields("sync", "storage-write-complete", {
    key: MERGED_CONFIG,
    bytes: Buffer.byteLength(mergedJson, "utf8"),
    ...configCounts(merged)
  });
  logger.info("sync", "Step 9: Sync complete");
  const elapsed = ((Date.now() - startTime) / 1e3).toFixed(1);
  logger.infoFields("sync", "run-complete", {
    elapsedSeconds: elapsed,
    ...configCounts(merged)
  });
}
async function processMacCMSSources(storage, config2) {
  const raw2 = await storage.get(MACCMS_SOURCES);
  const entries = raw2 ? JSON.parse(raw2) : [];
  if (entries.length === 0) {
    logger.info("sync", "No MacCMS sources configured");
    return [];
  }
  logger.infoFields("sync", "maccms-sources-found", { count: entries.length });
  entries.forEach((entry, index) => logger.infoFields("sync", "maccms-source", {
    index: index + 1,
    key: entry.key,
    name: entry.name,
    api: entry.api
  }));
  let validEntries;
  let speedMap;
  const edgeProxiesRaw = await storage.get(EDGE_PROXIES);
  if (edgeProxiesRaw) {
    logger.info("sync", "Skipping MacCMS validation (edge proxy configured)");
    validEntries = entries;
  } else {
    logger.info("sync", "Local mode (no edge proxy): validating MacCMS sources...");
    const result = await processMacCMSForLocal(entries, config2.siteTimeoutMs);
    validEntries = result.passed;
    speedMap = result.speedMap;
  }
  if (validEntries.length === 0) {
    logger.warn("sync", "No valid MacCMS sources after processing");
    return [];
  }
  const sites = macCMSToTVBoxSites(validEntries, BASE_URL_PLACEHOLDER, speedMap);
  logger.infoFields("sync", "maccms-converted", { sites: sites.length });
  return [{
    sourceUrl: "maccms://builtin",
    sourceName: "MacCMS Sources",
    config: { sites }
  }];
}
async function updateSourceHealth(storage, fetchResults) {
  if (fetchResults.length === 0) return;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const raw2 = await storage.get(SOURCE_HEALTH);
  const oldRecords = raw2 ? JSON.parse(raw2).map((r) => {
    if ("latestStatus" in r && !("fetchStatus" in r)) {
      const legacy = r.latestStatus;
      const failures = r.consecutiveFailures || 0;
      const { latestStatus: _omit, ...rest } = r;
      return {
        ...rest,
        fetchStatus: legacy,
        status: classifyStatus(legacy, failures)
      };
    }
    return r;
  }) : [];
  const oldMap = new Map(oldRecords.map((r) => [r.url, r]));
  const fetchedUrls = new Set(fetchResults.map((r) => r.url));
  const newRecords = [];
  for (const fr of fetchResults) {
    const old = oldMap.get(fr.url);
    if (fr.status === "ok") {
      newRecords.push({
        url: fr.url,
        name: fr.name,
        status: classifyStatus(fr.status, 0),
        fetchStatus: fr.status,
        consecutiveFailures: 0,
        lastSuccessTime: now,
        lastFailTime: old?.lastFailTime,
        lastFailReason: old?.lastFailReason,
        lastSpeedMs: fr.speedMs
      });
    } else {
      const newFailCount = (old?.consecutiveFailures ?? 0) + 1;
      newRecords.push({
        url: fr.url,
        name: fr.name,
        status: classifyStatus(fr.status, newFailCount),
        fetchStatus: fr.status,
        consecutiveFailures: newFailCount,
        lastSuccessTime: old?.lastSuccessTime,
        lastFailTime: now,
        lastFailReason: fr.errorMessage,
        lastSpeedMs: old?.lastSpeedMs
      });
    }
  }
  const failCount = newRecords.filter((r) => r.consecutiveFailures > 0).length;
  if (failCount > 0) {
    logger.info("sync", `Source health: ${newRecords.length - failCount} ok, ${failCount} failing`);
  }
  await storage.put(SOURCE_HEALTH, JSON.stringify(newRecords));
}
function configCounts(config2) {
  return {
    sites: config2.sites?.length || 0,
    parses: config2.parses?.length || 0,
    lives: config2.lives?.length || 0
  };
}
function isCacheFileValid(filePath, ttlMs) {
  try {
    const stat = fs4.statSync(filePath);
    return Date.now() - stat.mtimeMs < ttlMs;
  } catch {
    return false;
  }
}
function beforeAfterCounts(before, after) {
  return {
    sitesBefore: before.sites,
    sitesAfter: after.sites,
    parsesBefore: before.parses,
    parsesAfter: after.parses,
    livesBefore: before.lives,
    livesAfter: after.lives
  };
}

// src/storage/json-file.ts
var import_fs = require("fs");
var import_path = require("path");
var JsonFileStorage = class {
  data;
  filePath;
  constructor(filePath) {
    this.filePath = filePath;
    const dir = (0, import_path.dirname)(filePath);
    if (!(0, import_fs.existsSync)(dir)) {
      (0, import_fs.mkdirSync)(dir, { recursive: true });
    }
    if ((0, import_fs.existsSync)(filePath)) {
      try {
        this.data = JSON.parse((0, import_fs.readFileSync)(filePath, "utf-8"));
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        logger.warn("storage", `Failed to parse JSON file ${filePath}, starting empty: ${msg}`);
        this.data = {};
      }
    } else {
      this.data = {};
    }
  }
  async get(key) {
    return this.data[key] ?? null;
  }
  async put(key, value) {
    this.data[key] = value;
    try {
      (0, import_fs.writeFileSync)(this.filePath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      logger.error("storage", `Failed to write JSON file ${this.filePath}: ${msg}`);
      throw error;
    }
  }
  async delete(key) {
    if (!(key in this.data)) return;
    delete this.data[key];
    try {
      (0, import_fs.writeFileSync)(this.filePath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      logger.error("storage", `Failed to write JSON file ${this.filePath}: ${msg}`);
      throw error;
    }
  }
  async list(prefix) {
    return Object.keys(this.data).filter((key) => key.startsWith(prefix));
  }
};

// src/node-entry.ts
dotenv.config();
function createStorage() {
  const dataDir = path4.resolve(process.env.DATA_DIR || path4.join(process.cwd(), "data"));
  const newJsonPath = path4.join(dataDir, "config.json");
  const oldJsonPath = path4.join(dataDir, "tvbox-data.json");
  if (!fs5.existsSync(newJsonPath) && fs5.existsSync(oldJsonPath)) {
    fs5.renameSync(oldJsonPath, newJsonPath);
    logger.info("storage", "Migrated tvbox-data.json to config.json");
  }
  return { storage: new JsonFileStorage(newJsonPath), jsonPath: newJsonPath };
}
async function buildConfig(port) {
  const docker = isDocker();
  let lanIp = getLocalIp();
  let dockerMissingBaseUrl = false;
  if (docker && !process.env.BASE_URL) {
    try {
      const result = await dns.promises.lookup("host.docker.internal");
      lanIp = result.address;
    } catch {
      dockerMissingBaseUrl = true;
    }
  }
  const baseUrl = process.env.BASE_URL || `http://${lanIp || "localhost"}:${port}`;
  return {
    adminToken: process.env.ADMIN_TOKEN,
    refreshToken: process.env.REFRESH_TOKEN,
    speedTimeoutMs: parseInt(process.env.SPEED_TIMEOUT_MS || "") || DEFAULT_SPEED_TIMEOUT_MS,
    siteTimeoutMs: parseInt(process.env.SITE_TIMEOUT_MS || "") || DEFAULT_SITE_TIMEOUT_MS,
    fetchTimeoutMs: parseInt(process.env.FETCH_TIMEOUT_MS || "") || DEFAULT_FETCH_TIMEOUT_MS,
    cronSchedule: process.env.CRON_SCHEDULE || void 0,
    localBaseUrl: baseUrl.replace(/\/$/, ""),
    dockerMissingBaseUrl,
    // 自动抓取（环境变量驱动）
    scrapeSourceUrl: process.env.SCRAPE_SOURCE_URL,
    scrapeSourceReferer: process.env.SCRAPE_SOURCE_REFERER,
    maccmsApiUrl: process.env.MACCMS_API_URL,
    maccmsAesKey: process.env.MACCMS_AES_KEY,
    maccmsAesIv: process.env.MACCMS_AES_IV
  };
}
async function main() {
  const { storage, jsonPath } = createStorage();
  const port = parseInt(process.env.PORT || "") || 5678;
  const config2 = await buildConfig(port);
  if (process.env.DMZ === "0") {
    logger.securityFields("Starting up with DMZ=0! BE SAFE!", {});
  }
  let refreshRunning = false;
  let patchLock = false;
  const SYNC_TIMEOUT_MS = 3e5;
  const runtime = {
    getPatchLock: () => patchLock,
    setPatchLock: (locked) => {
      patchLock = locked;
    },
    isSyncing: () => refreshRunning
  };
  const runWithGuard = async (opts) => {
    if (refreshRunning) {
      logger.warn("sync", "Already running, skipping");
      return { ran: false };
    }
    const dirty = await getDirtyMarker(storage);
    if (dirty) {
      logger.info("sync", "clearing dirty marker before aggregation");
      await clearDirtyMarker(storage);
    }
    refreshRunning = true;
    try {
      await Promise.race([
        runSync(storage, config2),
        new Promise(
          (_, reject) => setTimeout(() => reject(new Error("Sync timed out")), SYNC_TIMEOUT_MS)
        )
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error("sync", `Error: ${msg}`);
    } finally {
      refreshRunning = false;
    }
    return { ran: true };
  };
  let currentTask = null;
  let currentSchedule = "";
  function scheduleCron(schedule2, silent) {
    if (currentTask) {
      currentTask.stop();
    }
    const cronExpr = syncScheduleToCron(schedule2);
    if (!cronExpr) {
      currentSchedule = "";
      currentSyncSchedule = schedule2;
      if (!silent) logger.info("cron", "\u81EA\u52A8\u540C\u6B65\u65F6\u95F4\u8BBE\u5B9A\u4E3A\uFF1A\u7981\u7528");
      return;
    }
    currentSchedule = cronExpr;
    currentSyncSchedule = schedule2;
    currentTask = cron.schedule(cronExpr, () => {
      logger.info("cron", `Triggered at ${(/* @__PURE__ */ new Date()).toISOString()}`);
      runWithGuard({ source: "cron" });
    });
    if (!silent) logger.info("cron", `\u81EA\u52A8\u540C\u6B65\u65F6\u95F4\u8BBE\u5B9A\u4E3A\uFF1A${scheduleLabel(schedule2)} (${cronExpr})`);
  }
  const storedRaw = await storage.get(CRON_INTERVAL);
  let currentSyncSchedule = { ...DEFAULT_SYNC_SCHEDULE };
  const envSchedule = config2.cronSchedule ? parseCronSchedule(config2.cronSchedule) : null;
  if (envSchedule) {
    currentSyncSchedule = envSchedule;
  } else if (storedRaw) {
    try {
      const parsed = JSON.parse(storedRaw);
      if (parsed && typeof parsed === "object" && parsed.period) {
        currentSyncSchedule = parsed;
      }
    } catch {
    }
  }
  if (config2.cronSchedule && !envSchedule) {
    logger.warn("cron", `CRON_SCHEDULE="${config2.cronSchedule}" \u65E0\u6CD5\u8BC6\u522B\uFF0C\u6709\u6548\u683C\u5F0F\u5982 "0 5 * * *"\uFF0C\u5DF2\u7981\u7528`);
  }
  scheduleCron(currentSyncSchedule, true);
  cron.schedule(CHANNEL_PROBE_CRON, async () => {
    try {
      if (!await isProbeEnabled(storage)) return;
      logger.info("channel-probe-cron", `Triggered at ${(/* @__PURE__ */ new Date()).toISOString()}`);
      await runChannelProbe(storage);
    } catch (err) {
      logger.error("channel-probe-cron", `Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  });
  const app = createApp({
    storage,
    config: config2,
    runtime,
    triggerRefresh: runWithGuard,
    enableChannelProbe: true,
    onCronScheduleChange: (schedule2) => {
      scheduleCron(schedule2);
    },
    cronEnvSchedule: envSchedule
  });
  let displayHost = "localhost";
  try {
    const u = new URL(config2.localBaseUrl || "");
    displayHost = u.hostname;
  } catch {
  }
  serve({ fetch: app.fetch, port }, (info) => {
    console.log("  TVBox Auxiliary");
    if (displayHost !== "localhost") {
      console.log(`  \u7BA1\u7406\u9762\u677F\uFF1Ahttp://${displayHost}:${info.port}/status`);
    }
    const cronSource = envSchedule ? "\u73AF\u5883\u53D8\u91CF" : "\u7F51\u9875\u914D\u7F6E";
    console.log(`  \u81EA\u52A8\u805A\u5408\u65F6\u95F4\u4E3A\uFF1A${currentSchedule || "disabled"} (${scheduleLabel(currentSyncSchedule)}) [${cronSource}]`);
    if (config2.dockerMissingBaseUrl) {
      console.log("");
      console.log("  \u26A0\uFE0F  Docker \u8FD0\u884C\u65F6\uFF0C\u4F46\u672A\u68C0\u6D4B\u5230 BASE_URL \u8BBE\u5B9A");
      console.log(`     \u81EA\u52A8\u68C0\u6D4B\u7684\u5730\u5740\u4E3A\uFF1A ${displayHost}`);
      console.log("     \u8BF7\u5728 .env \u6216 docker-compose.yml \u4E2D\u8BBE\u7F6E\uFF1ABASE_URL=http://\u5BBF\u4E3B\u673AIP:\u7AEF\u53E3");
      console.log("     \u6216\u8005\u5C1D\u8BD5\u524D\u5F80\u7F51\u9875\u8BBE\u7F6E\u4E2D\u5F00\u542F\u667A\u80FD\u751F\u6210\u9759\u6001\u8D44\u6E90\u5730\u5740");
    }
    console.log("");
    logger.info("storage", `JSON file storage: ${jsonPath}`);
    logger.info("channel-probe", `\u9891\u9053\u6D4B\u901F\u5B9A\u65F6\u5668\u5DF2\u6CE8\u518C: ${CHANNEL_PROBE_CRON}\uFF08\u4EC5\u5728\u5F00\u542F\u65F6\u6267\u884C\uFF09`);
  });
}
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}
function isDocker() {
  try {
    fs5.accessSync("/.dockerenv");
    return true;
  } catch {
    try {
      const cgroup = fs5.readFileSync("/proc/1/cgroup", "utf8");
      return /docker|containerd/.test(cgroup);
    } catch {
      return false;
    }
  }
}
main();
