const TEXT_SEPARATOR = ' ';
const TYPED_CHARS_LIMIT = 10;
const NEXT_CHARS_LIMIT = 20;

let repeats_number = 5;
const repeats_number_input = document.getElementById('repeats_number');

let main_user_text = 'Ֆիզիկոս Մկրտիչը օճառաջուր ցողելով բժշկում է գնդապետ Հայկի փքված ձախ թևը։'; // Ֆիզիկոս Մկրտիչը օճառաջուր ցողելով բժշկում է գնդապետ Հայկի փքված ձախ թևը:
const main_user_text_input = document.getElementById('main_user_text');
let full_text = '';
let full_text_pointer = 0;

let typed_chars = '';
const typed_chars_div = document.getElementById('typed_chars');
let next_chars = '';
const next_chars_div = document.getElementById('next_chars');

let typing_errors = 0;
let typing_inaccuracy = 0;
let typing_start = 0;
let typing_finish = 0;
let typing_time = 0;
let characters_per_minute = 0;

const stat_results_div = document.getElementById('stat_results');

let is_game_on = false;


var repeat_text = function(text, count) {
    var array = [];
    for (var i = 0; i < count;) {
        array[i++] = text;
    }
    return array.join(TEXT_SEPARATOR);
}

function update_typed_chars(new_char) {
    var typed_pointer = full_text_pointer + 1 - TYPED_CHARS_LIMIT;
    if (typed_pointer < 0) {
        typed_pointer = 0;
    }

    var typed_len = full_text_pointer - typed_pointer + 1;

    typed_chars = full_text.substr(typed_pointer, typed_len)
    typed_chars_div.innerHTML = '_' + typed_chars + '_';
}

function update_next_chars() {
    full_text_pointer += 1;
    next_chars = full_text.substr(full_text_pointer, NEXT_CHARS_LIMIT);
    next_chars_div.innerHTML = '_' + next_chars + '_';
}

function calculate_stats() {
    typing_inaccuracy = typing_errors / full_text_pointer;

    typing_finish = Date.now();
    typing_time = Math.round((typing_finish - typing_start) / 10, 2) / 100;  // to seconds
    characters_per_minute = Math.round(full_text_pointer / typing_time * 100 * 60) / 100;

    stat_results_div.innerHTML = 'Errors: ' + typing_errors + ' (' + typing_inaccuracy + '%), CPM speed: ' +
        characters_per_minute + ', time: ' + typing_time + ' sec., ' + full_text_pointer + ' chars';
}

function process_user_char(user_char) {
    if (full_text_pointer == 0) {
        if (typing_errors == 0) {
            typing_start = Date.now();
        }
    }
    if (user_char !== full_text.substr(full_text_pointer, 1)) {
        typing_errors += 1;
        return;
    }
    update_typed_chars(user_char);
    update_next_chars();
    if (full_text_pointer == full_text.length) {
        is_game_on = false;
        calculate_stats();
    }
}

function process_keypress(key) {
    if (is_game_on) {
        process_user_char(key);
    }
}

function start_game() {
    is_game_on = true;
    full_text = repeat_text(main_user_text, repeats_number);
    main_user_text_input.style.display = 'none';

    next_chars = full_text.substr(full_text_pointer, NEXT_CHARS_LIMIT);
    next_chars_div.innerHTML = '_' + next_chars + '_';
}

function less_repeats() {
    repeats_number -= 1;
    update_repeats_input();
}

function more_repeats() {
    repeats_number += 1;
    update_repeats_input();
}

function update_repeats_input() {
    repeats_number_input.value = repeats_number;
}

function update_repeats_variable() {
    repeats_number = repeats_number_input.value;
}

function udpate_main_user_text() {
    main_user_text = main_user_text_input.value;
}

function entry_point() {
    repeats_number_input.value = repeats_number;
    main_user_text_input.value = main_user_text;
    document.addEventListener('keypress', (event) => {
        process_keypress(event.key);
        console.log('Key: <' + event.key + '>');
        if (event.key == ' ') {
            console.log(event);
        }
        console.log('Full text pointer: ' + full_text_pointer);
    })
}
