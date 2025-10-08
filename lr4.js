function loadPosts(callback) {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(r => r.json())
    .then(callback)
    .catch(err => console.log("Ошибка загрузки постов:", err));
}

function sortTitlesDescending(data) {
  const result = data.sort((x, y) => y.title.length - x.title.length);
  console.log(result);
}

loadPosts(sortTitlesDescending);

function loadComments(callback) {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then(r => r.json())
    .then(callback)
    .catch(err => console.log("Ошибка загрузки комментариев:", err));
}

function sortEmailsAlphabetically(data) {
  const result = data.sort((x, y) => x.email.localeCompare(y.email));
  console.log(result);
}

loadComments(sortEmailsAlphabetically);

function fetchUsers() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(r => {
        if (!r.ok) throw new Error("Ошибка HTTP: " + r.status);
        return r.json();
      })
      .then(list => {
        const trimmed = list.map(u => ({
          id: u.id,
          name: u.name,
          username: u.username,
          email: u.email,
          phone: u.phone
        }));
        resolve(trimmed);
      })
      .catch(reject);
  });
}

fetchUsers()
  .then(data => console.log("Пользователи:", data))
  .catch(err => console.log("Ошибка:", err));

function fetchTodos() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(r => {
        if (!r.ok) throw new Error("Ошибка HTTP: " + r.status);
        return r.json();
      })
      .then(list => {
        const filtered = list.filter(item => !item.completed);
        resolve(filtered);
      })
      .catch(reject);
  });
}

fetchTodos()
  .then(data => {
    console.log("Невыполненные задачи:", data);
    console.log("Всего:", data.length);
  })
  .catch(err => console.log("Ошибка:", err));

async function getSortedPosts() {
  try {
    const r = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!r.ok) throw new Error("Ошибка HTTP: " + r.status);
    const list = await r.json();
    const sorted = list.sort((a, b) => b.title.length - a.title.length);
    console.log(sorted);
  } catch (err) {
    console.log("Ошибка:", err);
  }
}

getSortedPosts();

async function getSortedComments() {
  try {
    const r = await fetch("https://jsonplaceholder.typicode.com/comments");
    if (!r.ok) throw new Error("Ошибка HTTP: " + r.status);
    const list = await r.json();
    const sorted = list.sort((a, b) => a.email.localeCompare(b.email));
    console.log(sorted);
  } catch (err) {
    console.log("Ошибка:", err);
  }
}

getSortedComments();
