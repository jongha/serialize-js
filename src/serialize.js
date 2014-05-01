var deserialize, serialize;

serialize = function(object) {
  var number_type, object_type, result, string_type;
  result = "";
  object_type = function(data) {
    var items, k, v, _i, _len;
    items = [];
    if (data instanceof Array) {
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        v = data[_i];
        items.push(encodeURIComponent(serialize(v)));
      }
      return result += "[" + items.join(",") + "]";
    } else {
      for (k in data) {
        v = data[k];
        items.push(encodeURIComponent(k) + ":" + encodeURIComponent(serialize(v)));
      }
      return result += "{" + items.join(",") + "}";
    }
  };
  string_type = function(data) {
    return result + data;
  };
  number_type = function(data) {
    return data;
  };
  switch (typeof object) {
    case "object":
      result += object_type(object);
      break;
    case "string":
      result += string_type(object);
      break;
    case "number":
      result += number_type(object);
      break;
    default:
      result += string_type(object);
  }
  return result;
};

deserialize = function(object) {
  var array_type, dict_type, result;
  result = "";
  array_type = function(data) {
    var end, escapes, items, v, _i, _len;
    items = [];
    end = 0;
    while (++end < data.length && data[end] !== "]") {
      continue;
    }
    escapes = data.substring(1, end).split(/,/gi);
    for (_i = 0, _len = escapes.length; _i < _len; _i++) {
      v = escapes[_i];
      items.push(deserialize(decodeURIComponent(v)));
    }
    return items;
  };
  dict_type = function(data) {
    var end, escapes, items, token, v, _i, _len;
    items = {};
    end = 0;
    while (++end < data.length && data[end] !== "}") {
      continue;
    }
    escapes = data.substring(1, end).split(/,/gi);
    for (_i = 0, _len = escapes.length; _i < _len; _i++) {
      v = escapes[_i];
      token = v.split(":");
      items[decodeURIComponent(token[0])] = deserialize(decodeURIComponent(token[1]));
    }
    return items;
  };
  switch (object[0]) {
    case "[":
      return array_type(object);
    case "{":
      return dict_type(object);
    default:
      return object;
  }
};
