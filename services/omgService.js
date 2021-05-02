import store from '../redux/store';

const hostUrl = 'http://192.168.0.20:3001';
const headers = new Headers({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  // 'Accept-Charset': 'utf-8',
  // 'Accept-Encoding': 'gzip, deflate, br',
});

export async function postSimpleTag(tag) {
  try {
    const url = 'http://192.168.0.20:3001/tags/one';
    const dateNow = new Date(Date.now());
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tag: tag,
        startDatetime: dateNow.toISOString(),
        endDatetime: dateNow.toISOString(),
      }),
    });
    console.log(res);
    if (res.status === 200) {
      return 'Tag activated';
    } else {
      return 'Something wrong happened';
    }
  } catch (e) {
    return e;
  }
}

export async function signin(email, password) {
  let url = hostUrl + '/users/signin';
  let res = await fetch(url, {
    credentials: 'same-origin',
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  return res.json();
}

export async function getRecentTags() {
  let url = hostUrl + '/tags/recent';
  let res = await fetch(url, {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + store.getState().storeApiKey.apiKey,
      Accept: 'application/json',
      'Accept-Charset': 'utf-8',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  });
  if (res.ok) {
    return await res.json();
  } else {
    console.log(res);
    return null;
  }
}

export async function verifyToken(apiKey) {
  let url = hostUrl + '/users/verify';
  return await fetch(url, {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      Accept: 'application/json',
      'Accept-Charset': 'utf-8',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  });
}
