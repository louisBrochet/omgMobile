import store from '../redux/store';

//
// Service file that contains all the requests for the OMG server API.
//

const hostUrl = 'http://92.222.24.129:3000';
const headers = new Headers({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  // 'Accept-Charset': 'utf-8',
  // 'Accept-Encoding': 'gzip, deflate, br',
});

/**
 * request for insert activation tag in the database
 *
 * @param tag
 * @param date
 * @return {Promise<any>} : return result request
 */
export async function postSimpleTag(tag, date) {
  try {
    const url = hostUrl + '/tags/one';
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + store.getState().storeApiKey.apiKey,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tag: tag,
        startDatetime: date,
        endDatetime: date,
      }),
    });
    return res.json();
  } catch (e) {
    return e;
  }
}

/**
 * signin request
 *
 * @param email
 * @param password
 * @return {Promise<any>} : return results
 */
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

/**
 * recent tags request
 *
 * @return {Promise<null|any>} : 8 most recent tags or error
 */
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

/**
 * verify token request
 *
 * @param apiKey
 * @return {Promise<Response>}
 */
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
