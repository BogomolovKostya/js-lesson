/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return new Promise(function(resolve, reject) {
        loadingBlock.innerHTML = 'Загрузка...';
        loadingBlock.style.display = 'block';
        filterBlock.style.display = 'none';

        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';

        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                setTimeout(function() {
                    resolve(xhr.response.sort(function(a, b) {
                        return (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0;
                    }));
                }, 1500);
            } else {
                reject();
            }

        });
        xhr.addEventListener('error', function() {
            reject();
        });

        xhr.send();
    })
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    /**
     * return (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) ? true : false;
     * Можно ли использовать includes ???
     */
    return full.toLowerCase().includes(chunk.toLowerCase());
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise = [];

function getTowns() {
    loadTowns()
        .then(function(result) {
            Array.prototype.push.apply(townsPromise, result);
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';
        })
        .catch(function() {
            loadingBlock.innerHTML = 'Не удалось загрузить города';

            let button = document.createElement('BUTTON');

            button.innerHTML = 'Повторить загрузку';
            button.className = 'refrash';
            loadingBlock.appendChild(button);

            button.addEventListener('click', function() {
                getTowns();
            });
        });
}

filterInput.addEventListener('keyup', function() {

    filterResult.innerHTML = '';
    /*
    * Немного коряво получилось =(
    */
    if (filterInput.value !== '') {
        for (let i = 0; i < townsPromise.length; i++) {
            if (isMatching(townsPromise[i].name, filterInput.value)) {
                filterResult.innerHTML += townsPromise[i].name + '<br>';
            }
        }
    }
});

getTowns();

export {
    loadTowns,
    isMatching
};
