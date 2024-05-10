const TEXT_SEPARATOR = ' ';
const TYPED_CHARS_LIMIT = 10;
const NEXT_CHARS_LIMIT = 20;

let repeats_number = 5;
const repeats_number_input = document.getElementById('repeats_number');
const less_number_button = document.getElementById('less_button');
const more_number_button = document.getElementById('more_button');
const start_button = document.getElementById('start_button');
const restart_button = document.getElementById('restart_button');

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


const repeat_text = (text, count) => {
    return Array(count).fill(text).join(TEXT_SEPARATOR);
}

function update_typed_chars() {
    var typed_pointer = full_text_pointer + 1 - TYPED_CHARS_LIMIT;
    if (typed_pointer < 0) {
        typed_pointer = 0;
    }

    var typed_len = full_text_pointer - typed_pointer + 1;

    typed_chars = full_text.substring(typed_pointer, typed_pointer + typed_len)
    typed_chars_div.innerHTML = '_' + typed_chars + '_';
}

function update_next_chars() {
    full_text_pointer += 1;
    next_chars = full_text.substring(full_text_pointer, full_text_pointer + NEXT_CHARS_LIMIT);
    next_chars_div.innerHTML = '_' + next_chars + '_';
}

function calculate_stats() {
    typing_inaccuracy = Math.round(typing_errors / full_text_pointer * 1000) / 10;

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
    if (user_char !== full_text.substring(full_text_pointer, full_text_pointer + 1)) {
        typing_errors += 1;
        return;
    }
    update_typed_chars();
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
    repeats_number_input.style.display = 'none';
    less_number_button.style.display = 'none';
    more_number_button.style.display = 'none';
    start_button.style.display = 'none';
    restart_button.style.gridColumn = 'span 6';

    next_chars = full_text.substring(full_text_pointer, full_text_pointer + NEXT_CHARS_LIMIT);
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
    })
}
