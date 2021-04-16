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
