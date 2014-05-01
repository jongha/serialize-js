serialize = (object) ->
    result = ""

    object_type = (data) ->
        items = []
        if data instanceof Array
            items.push(encodeURIComponent(serialize(v))) for v in data
            result += "[" + items.join(",") + "]"
        else
            items.push(encodeURIComponent(k) + ":" + encodeURIComponent(serialize(v))) for k, v of data
            result += "{" + items.join(",") + "}"

    string_type = (data) -> result + data
    number_type = (data) -> data

    switch typeof(object)
        when "object" then result += object_type(object)
        when "string" then result += string_type(object)
        when "number" then result += number_type(object)
        else result += string_type(object)

    return result

deserialize = (object) ->
    result = ""

    array_type = (data) ->
        items = []
        end = 0
        while ++end < data.length && data[end] != "]"
            continue

        escapes = data.substring(1, end).split(/,/gi);
        items.push(deserialize(decodeURIComponent(v))) for v in escapes
        return items;

    dict_type = (data) ->
        items = {}
        end = 0
        while ++end < data.length && data[end] != "}"
            continue

        escapes = data.substring(1, end).split(/,/gi);
        for v in escapes
            token = v.split(":")
            items[decodeURIComponent(token[0])] = deserialize(decodeURIComponent(token[1]))

        return items;

    switch object[0]
        when "[" then array_type(object)
        when "{" then dict_type(object)
        else object

