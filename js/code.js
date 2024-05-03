const TEXT_SEPARATOR = ' ';
const TYPED_CHARS_LIMIT = 10;
const NEXT_CHARS_LIMIT = 20;

let text_block = 'Hi, this is a block!';
let blocks_number = 3;
let full_text = '';
let full_text_pointer = 0;

let typed_chars = '';
let next_chars = '';

let typing_errors = 0;
let typing_inaccuracy = 0;
let typing_start = 0;
let typing_finish = 0;
let typing_time = 0;
let characters_per_minute = 0;


var repeat_text = function(text, count) {
    var array = [];
    for (var i = 0; i < count;) {
        array[i++] = text;
    }
    return array.join(TEXT_SEPARATOR);
}

function update_typed_chars(new_char) {
    typed_chars += new_char;
    if (typed_chars.length > TYPED_CHARS_LIMIT) {
    		typed_chars = typed_chars.substr(1);
    }
}

function update_next_chars() {
		full_text_pointer += 1;
    next_chars = full_text.substr(full_text_pointer, NEXT_CHARS_LIMIT);
}

function calculate_stats() {
    typing_time = typing_finish - typing_start;
    typing_inaccuracy = typing_errors / full_text_pointer;
    characters_per_minute = full_text_pointer / typing_time * 60;
}

function process_user_char(user_char) {
    if (user_char !== full_text.substr(full_text_pointer, 1)) {
    		typing_errors += 1;
        return;
    }
    update_typed_chars(user_char);
    update_next_chars();
}
