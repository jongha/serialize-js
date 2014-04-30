var serialize = function(object) {
    var result = "", i;
    switch(typeof(object)) {
        case "object":
            var items = [];
            if(object instanceof Array) { // Array
                result += "[";
                for(i in object) {
                    items.push(encodeURIComponent(serialize(object[i])));
                }
                result += items.join(",");
                result += "]";

            }else { // Dictonary
                result += "{";
                for(i in object) {
                    items.push(encodeURIComponent(i) + ":" + encodeURIComponent(serialize(object[i])));
                }
                result += items.join(",");
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
    var i, j, result = null, escapes;
    switch(serialized[0]) {
        case "[":
            result = [];
            for(i = 1; serialized[i] !== "]" && i<serialized.length; ++i) { }
            escapes = serialized.substring(1, i).split(/,/gi);
            
            for(j in escapes) {
                result.push(deserialize(decodeURIComponent(escapes[j])));
            }

            return result;

        case "{":
            result = {};
            for(i = 1; serialized[i] !== "}" && i<serialized.length; ++i) { }
            escapes = serialized.substring(1, i).split(/,/gi);

            for(j in escapes) {
                var tokens = escapes[j].split(":");
                result[decodeURIComponent(tokens[0])] = deserialize(decodeURIComponent(tokens[1]));
            }

            return result;

        default:
            return serialized;
    }
};

