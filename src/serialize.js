var serialize = function(object) {
    var result = "", i;
    switch(typeof(object)) {
        case "object":
            var items = [];
            if(object instanceof Array) { // Array
                result += "[";
                for(i in object) {
                    items.push(serialize(object[i]));
                }
                result += items.join(",");
                result += "]";

            }else { // Dictonary
                result += "{";
                for(i in object) {
                    items.push(i + ":" + serialize(object[i]));
                }
                result += items.join("^");
                result += "}";
            }
            break;

        default:
        case "string":
            result += object;
            break;
    }

    return result;
};

var deserialize = function(serialized) {
    var i, result, value;
    switch(serialized[0]) {
        case "[":
            result = [];
            for(i = 1; serialized[i] !== "]" && i<serialized.length; ++i) { }
            
            value = serialized.substring(1, i).split(",");
            for(i in value) {
                result.push(value[i]);
            }
            return result;

        case "{":
            result = {};
            for(i = 1; serialized[i] !== "}" && i<serialized.length; ++i) { }
            
            value = serialized.substring(1, i).split("^");
            for(i in value) {
                var tokens = value[i].split(":");
                result[tokens[0]] = deserialize(tokens[1]);
            }
            return result;

        default:
            return serialized;
    }
};

