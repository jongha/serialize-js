var serialize = function(object) {
    var result = "";
    switch(typeof(object)) {
        case "object":
            var items = [];
            if(object instanceof Array) { // Array
                result += "[";
                for(var i in object) {
                    items.push(serialize(object[i]));
                }
                result += items.join(",");
                result += "]";

            }else { // Dictonary
                result += "{";
                for(var i in object) {
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
    switch(serialized[0]) {
        case "[":
            var result = [], i=1;
            for(; serialized[i] !== "]" && i<serialized.length; ++i) { }
            var value = serialized.substring(1, i).split(",");
            for(var i in value) {
                result.push(value[i]);
            }
            return result;

        case "{":
            var result = {}, i=1;
            for(; serialized[i] !== "}" && i<serialized.length; ++i) { }
            var value = serialized.substring(1, i).split("^");
            for(var i in value) {
                var tokens = value[i].split(":");
                result[tokens[0]] = deserialize(tokens[1]);
            }
            return result;

        default:
            return serialized;
    }
};

