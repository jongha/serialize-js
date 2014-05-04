(function() {
    test("Serialize Test", function() {
        deepEqual(serialize([1, 2, 3]), "[1,2,3]", "Array Serialize Test");
        deepEqual(serialize([1, 2, 3, "a"]), "[1,2,3,a]", "Array Serialize Test");
        deepEqual(serialize([1, 2, 3, "a,"]), "[1,2,3,a%2C]", "Array Serialize Test");
        deepEqual(serialize([1, 2, 3, "a][,"]), "[1,2,3,a%5D%5B%2C]", "Array Serialize Test");

        deepEqual(serialize({1:1, 2:2, 3:3}), "{1:1,2:2,3:3}", "Dictonary Serialize Test");
        deepEqual(serialize({1:1, 2:2, 3:3, "a":"b"}), "{1:1,2:2,3:3,a:b}", "Dictonary Serialize Test");
        deepEqual(serialize({1:1, 2:2, 3:3, "a":"b,"}), "{1:1,2:2,3:3,a:b%2C}", "Dictonary Serialize Test");        
        deepEqual(serialize({1:1, 2:2, 3:3, "a":"b:^"}), "{1:1,2:2,3:3,a:b%3A%5E}", "Dictonary Serialize Test");        
        deepEqual(serialize({1:1, 2:2, 3:3, "a":"b}{:"}), "{1:1,2:2,3:3,a:b%7D%7B%3A}", "Dictonary Serialize Test");

        deepEqual(serialize(100), "100", "Number Serialize Test");
        deepEqual(serialize("test"), "test", "String Serialize Test");
        deepEqual(serialize("The quick brown fox jumps over the lazy dog"), "The quick brown fox jumps over the lazy dog", "Pangrams Serialize Test");
        deepEqual(serialize(function () { "output"; }), "{{function%20()%20%7B%20%22output%22%3B%20%7D}}", "Function Serialize Test");
    });

    test("Deserialize Test", function() {
        deepEqual(deserialize("[1,2,3]"), ["1","2","3"], "Array Deserialize Test");
        deepEqual(deserialize("[1,2,3,a]"), ["1","2","3","a"], "Array Deserialize Test");
        deepEqual(deserialize("[1,2,3,a%2C]"), ["1","2","3","a,"], "Array Deserialize Test");
        deepEqual(deserialize("[1,2,3,a%5D%5B%2C]"), ["1","2","3","a][,"], "Array Deserialize Test");

        deepEqual(deserialize("{1:1,2:2,3:3}"), {1:"1", 2:"2", 3:"3"}, "Dictonary Deserialize Test");
        deepEqual(deserialize("{1:1,2:2,3:3,a:b}"), {1:"1", 2:"2", 3:"3", "a":"b"}, "Dictonary Deserialize Test");
        deepEqual(deserialize("{1:1,2:2,3:3,a:b%2C}"), {1:"1", 2:"2", 3:"3", "a":"b,"}, "Dictonary Deserialize Test");        
        deepEqual(deserialize("{1:1,2:2,3:3,a:b%3A%5E}"), {1:"1", 2:"2", 3:"3", "a":"b:^"}, "Dictonary Deserialize Test");
        deepEqual(deserialize("{1:1,2:2,3:3,a:b%7D%7B%3A}"), {1:"1", 2:"2", 3:"3", "a":"b}{:"}, "Dictonary Deserialize Test");                

        deepEqual(deserialize(100), 100, "Number Deserialize Test");
        deepEqual(deserialize("test"), "test", "String Deserialize Test");
        deepEqual(deserialize("The quick brown fox jumps over the lazy dog"), "The quick brown fox jumps over the lazy dog", "Pangrams Deserialize Test");
        deepEqual(deserialize("{{function%20()%20%7B%20%22output%22%3B%20%7D}}"), 'function () { "output"; }', "Function Deserialize Test");
    });
}(jQuery));

