/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

function getCookie() {
    if (document.cookie) {
        let afterSplit = document.cookie.split('; ');
        let cookies = afterSplit.reduce(function(previousValue, currentValue) {
            let [name, value] = currentValue.split('=');

            previousValue[name] = value;

            return previousValue;
        }, {});

        return cookies;
    }
}

function createRow(allCookies) {
    listTable.innerHTML = '';

    for (let cook in allCookies) {
        let row = document.createElement('tr');
        let td = document.createElement('tr');
        let button = document.createElement('button');

        button.textContent = 'Удалить';

        td.appendChild(button);

        row.innerHTML = '<td>' + cook + '</td>' + '<td>' + allCookies[cook] + '</td>';
        row.appendChild(td);

        button.addEventListener('click', function() {
            if (allCookies.hasOwnProperty(cook)) {
                let date = new Date(0);

                document.cookie = cook + '=; expires=' + date.toUTCString();
                createRow(getCookie());
            }
        });

        listTable.appendChild(row);
    }
}

function search(value) {
    let result = {};
    let allCook = getCookie();

    listTable.innerHTML = '';

    for (let cook in allCook) {
        if (isMatching(allCook[cook], value) || isMatching(cook, value)) {
            result[cook] = allCook[cook];
        }
    }
    if (result) {
        createRow(result);
    }
}

createRow(getCookie());

filterNameInput.addEventListener('keyup', function() {
    if (filterNameInput.value !== '') {
        search(filterNameInput.value);
    } else {
        createRow(getCookie())
    }
});

addButton.addEventListener('click', function() {
    if (addNameInput.value !== '' && addValueInput.value !== '') {
        document.cookie = addNameInput.value + '=' + addValueInput.value;

        search(filterNameInput.value);
    }
});