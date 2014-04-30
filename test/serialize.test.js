(function() {
    test('Serialize Test',function() {
        deepEqual(serialize([1, 2, 3]), "[1,2,3]", "Array Serialize Test");
        deepEqual(serialize({1:1, 2:2, 3:3}), "{1:1^2:2^3:3}", "Dictonary Serialize Test");
        deepEqual(serialize(100), "100", "Number Serialize Test");
        deepEqual(serialize("test"), "test", "String Serialize Test");
        deepEqual(serialize("The quick brown fox jumps over the lazy dog"), "The quick brown fox jumps over the lazy dog", "Pangrams Serialize Test");
    });

    test('Serialize/Deserialize Test',function() {
        deepEqual(serialize(deserialize(serialize([1, 2, 3]))), "[1,2,3]", "Array Serialize/Deserialize Test");
        deepEqual(serialize(deserialize(serialize({1:1, 2:2, 3:3}))), "{1:1^2:2^3:3}", "Dictonary Serialize/Deserialize Test");
        deepEqual(serialize(deserialize(serialize(100))), "100", "Number Serialize/Deserialize Test");
        deepEqual(serialize(deserialize(serialize("test"))), "test", "String Serialize/Deserialize Test");
        deepEqual(serialize(deserialize(serialize("The quick brown fox jumps over the lazy dog"))), "The quick brown fox jumps over the lazy dog", "Pangrams Serialize/Deserialize Test");
    });
}(jQuery));

