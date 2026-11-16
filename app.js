const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsList = document.getElementById('posts-list');
const statusMessage = document.getElementById('status');
const reloadButton = document.getElementById('reload-btn');

async function loadPosts() {
    statusMessage.textContent = 'Загрузка…';
    statusMessage.className = 'status';
    postsList.replaceChildren();
    reloadButton.disabled = true;

    try {
        // Отправляем GET-запрос к открытому API.
        const response = await fetch(API_URL);

        // fetch не считает HTTP-ошибки (например, 404 или 500) исключениями.
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        // Преобразуем JSON-ответ в массив JavaScript-объектов.
        const posts = await response.json(); 

        // Создаём карточки публикаций. textContent безопаснее innerHTML
        // для вывода данных, полученных от внешнего API.
        const fragment = document.createDocumentFragment();

        posts.forEach((post) => {
            const item = document.createElement('li');
            item.className = 'post-card';

            const title = document.createElement('h3');
            title.textContent = post.title;

            const body = document.createElement('p');
            body.textContent = post.body;

            const number = document.createElement('span');
            number.className = 'post-number';
            number.textContent = `Публикация №${post.id}`;

            item.append(title, body, number);
            fragment.appendChild(item);
        });

        postsList.appendChild(fragment);
        statusMessage.textContent = `Загружено публикаций: ${posts.length}`;
    } catch (error) {
        // Здесь обрабатываются сетевые ошибки и ошибки HTTP-проверки.
        statusMessage.textContent =
            `Не удалось загрузить данные. Проверьте подключение к интернету и попробуйте ещё раз. (${error.message})`;
        statusMessage.className = 'status error';
        console.error('Ошибка загрузки публикаций:', error);
    } finally {
        reloadButton.disabled = false;
    }
}

reloadButton.addEventListener('click', loadPosts);

// Загружаем публикации при открытии страницы.
loadPosts();
