'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// //https://countries-api-836d.onrender.com/countries/
// const countrieBlock = (data1, cn = '') => {
//   const countrieBlock1 = `
//           <article class="country ${cn}">
//           <img class="country__img" src="${data1.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data1.name}</h3>
//             <h4 class="country__region">${data1.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data1.population / 100000000
//             ).toFixed(2)}</p>
//             <p class="country__row"><span>🗣️</span>${
//               data1.languages[0].name
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               data1.currencies[0].symbol
//             }</p>
//           </div>
//         </article>`;
//   countriesContainer.insertAdjacentHTML('beforeend', countrieBlock1);
//   countriesContainer.style.opacity = 1;
// };

// // const getCountry = name => {
// //   const req = new XMLHttpRequest();

// //   req.open('GET', `https://restcountries.com/v2/name/${name}`);
// //   req.send();

// //   req.addEventListener('load', function () {
// //     const [data1] = JSON.parse(this.responseText);
// //     console.log(data1);
// //     countrieBlock(data1);

// //     const [neighbour] = data1.borders;
// //     if (!neighbour) return;
// //     const req1 = new XMLHttpRequest();

// //     req1.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
// //     req1.send();

// //     req1.addEventListener('load', function () {
// //       const data2 = JSON.parse(this.responseText);
// //       console.log(data2);
// //       countrieBlock(data2, 'neighbour');
// //     });
// //   });
// // };
// // getCountry('portugal');
// // getCountry('usa');

// /*

// url - https - protocol , domain - DNS, resource - what we have to access.

// 1. dns - convert domain into realIPadd - special server - internet service provider

// real - https, ip add, portNumber - 443, 80

// 2. tcp/ip socket connection- transmission control pt, internal protocol --- communication - set the rules how to date move on internet.
// --job break the req/res into 100 junks and send the junks through internet.

// 3. request - through http rq

// http method - get, request target, http verions.

// http request headers.

// request body - only when sending data to server, post

// https - encrypted with tls,ssl

// 4. response - through http res

// http version , status code, status message

// http response headers

// response body.
// */

// /*

// Promises and fetch API

// fetch return a promise.

// container for future value - asynchronously delivered value.

// not to rely on event and callback function ,
// we can chain promises for sequence of asynchronous operation: escaping callback hell.

// the promise lifecycle.

// promise maybe in different state.
// before the future value is avail.
// pending -----Async task--->settle ----async task has finished --- 1.fulfilled or 2.rejected
// only settle once --- it's impossible change the state.

// build Promise --[fetch API returning promise] ------> consume promise -[ from fetch API.]

// */

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       countrieBlock(data[0]);
//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => countrieBlock(data, 'neighbour'))
//     .catch(err => alert(err));
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugadfuel');
// });

// const WhereAmI = (lat, lng) => {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => response.json())
//     .then(res => console.log(res));
// };

// WhereAmI(52.508, 72.873);

// console.log('test start');

// setTimeout(() => console.log('0 sec timer'), 0);

// Promise.resolve('Resolved promise').then(res => console.log(res));

// Promise.resolve('Resolved promise').then(res => {
//   for (let i = 0; i < 10000; i++) {}
//   console.log(res);
// });
// console.log('test end');

// const lotteryPromise = new Promise(function (resolve, rejected) {
//   console.log();
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN💙');
//     } else {
//       rejected(new Error('you lost your money 🤔'));
//     }
//   }, 3000);
// });

// lotteryPromise.then(res => console.log(res)).catch(res => console.error(res));

// //promisify

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(res => console.log(res));

const wait = function (num) {
  return new Promise(function (resolve) {
    setTimeout(resolve, num * 1000);
  });
};

const imageee = document.querySelector('.images');

const createImage = imgPath => {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;

    image.addEventListener('load', function () {
      imageee.append(image);
      resolve(image);
    });

    image.addEventListener('error', function () {
      reject(image);
    });
  });
};

// let imge;

// createImage('./img/img-1.jpg')
//   .then(img => {
//     imge = img;
//     console.log('image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     imge.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     imge = img;
//     console.log('image 2 loaded');
//     return wait(2);
//   })
//   .then(() => (imge.style.display = 'none'))
//   .catch(err => console.error(err));

const loadNpause = async () => {
  try {
    let img1;
    const res1 = await createImage('./img/img-1.jpg');
    if (res1) {
      img1 = res1;
      console.log('image 1 loaded');
    }
    await wait(2);
    img1.style.display = 'none';
    const res2 = await createImage('./img/img-2.jpg');
    if (res2) {
      img1 = res2;
      console.log('image 2 loaded');
    }
    await wait(2);
    img1.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

loadNpause();

const loadAll = async () => {};

/*
async function -  always return promise for that we have to use await to clear out that, get the actual result.

async promise.all - all task run at a same time

combinators;
all
race - first settled promise , wins the race - don't care about fulfilled or rejected.
allsettled - it'll return a all promise even rej, ful.
any - first settled promise - only fullfilled one.

running promise in parallel
*/

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

(async function () {
  const res = await Promise.any([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(res);
})();
