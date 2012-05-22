const main      = require("main");
const clipboard = require("clipboard");
const tabs      = require("tabs");

exports.test_format = function(test) {
    var pattern = "the {animal} is {color}"
    test.assertEqual(main.format(pattern, {animal: "dog", color: "blue"}), "the dog is blue");
};
