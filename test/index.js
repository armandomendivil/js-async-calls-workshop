const request = require('request');
const P = require('popsicle');
const co = require('co'); // co-routine

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const userId = 1;
const data = {};

// Callbacks
request.get(`${BASE_URL}/users`, function (err, response) {
    if (err) throw err;
    var data = {};
    data.user = JSON.parse(response.body)[0];
    request.get(`${BASE_URL}/posts`, function (err, response) {
      if (err) throw err;
      data.posts = JSON.parse(response.body)[0]
      request.get(`${BASE_URL}/comments`, function (err, response) {
        if (err) throw err;
        data.comments = JSON.parse(response.body)[0]
        request.get(`${BASE_URL}/photos`, function (err, response) {
          if (err) throw err;
          data.photos = JSON.parse(response.body)[0]
          request.get(`${BASE_URL}/albums`, function (err, response) {
            if (err) throw err[0];
            data.albums = JSON.parse(response.body)[0]
            request.get(`${BASE_URL}/todos`, function (err, response) {
              if (err) throw err;
              data.todos = JSON.parse(response.body)[0]
              console.log(data);
            });
          });
        });
      });
    });
  });

var data = {};
// Promises
P
  .get(`${BASE_URL}/users`)
  .then(function (response) {
    data.users = JSON.parse(response.body)[0]
    return P.get(`${BASE_URL}/posts`);
  })
  .then(function (response) {
    data.comments = JSON.parse(response.body)[0]
    return P.get(`${BASE_URL}/comments`);
  })
  .then(function (response) {
    data.photos = JSON.parse(response.body)[0]
    return P.get(`${BASE_URL}/photos`);
  })
  .then(function (response) {
    data.albums = JSON.parse(response.body)[0]
    return P.get(`${BASE_URL}/albums`);
  })
  .then(function (response) {
    data.todos = JSON.parse(response.body)[0]
    return data;
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (e) {
    console.log(e);
  });

function* createCounter() {
  yield 1;
  yield 2;
  yield 3;
}
const counter = createCounter();
console.log(counter.next());
console.log(counter.next());
console.log(counter.next());
console.log(counter.next());
// for (let i of counter) {
//   console.log(i);
// }

// Generators
function* createGenerator() {
  const users = yield P.get(`${BASE_URL}/users`);
  const posts = yield P.get(`${BASE_URL}/posts`);
  const photos = yield P.get(`${BASE_URL}/photos`);
  const albums = yield P.get(`${BASE_URL}/albums`);
  return {
    user: JSON.parse(users.body)[0],
    posts: JSON.parse(posts.body)[0],
    photos: JSON.parse(photos.body)[0],
    albums: JSON.parse(albums.body)[0],
  };
}

const generator = co(createGenerator);
generator.then(response => console.log(response));

// Async await
async function getData () {
  const users = await P.get(`${BASE_URL}/users`);
  const posts = await P.get(`${BASE_URL}/posts`);
  const photos = await P.get(`${BASE_URL}/photos`);
  const albums = await P.get(`${BASE_URL}/albums`);

  var data = {
    user: JSON.parse(users.body)[0],
    posts: JSON.parse(posts.body)[0],
    photos: JSON.parse(photos.body)[0],
    albums: JSON.parse(albums.body)[0],
  };
  console.log(data);
}

async function getData () {
  var sites = await Promise.all([
    P.get(`${BASE_URL}/users`),
    P.get(`${BASE_URL}/posts`),
    P.get(`${BASE_URL}/photos`)
  ]);

  var data = {
    user: JSON.parse(sites[0].body)[0],
    posts: JSON.parse(sites[1].body)[0],
    photos: JSON.parse(sites[2].body)[0],
  };
  console.log(data);
};

getData();
