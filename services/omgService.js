export async function postTag(tag) {
  const url = 'http://192.168.0.20:3000/tags/one';
  let dateStart = new Date(Date.now());
  let dateEnd = new Date(Date.now());
  console.log(dateEnd);
  dateStart.setHours(dateStart.getHours() - 1);
  dateEnd.setHours(dateEnd.getHours() + 3);
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tag: tag,
      startDatetime: dateStart.toISOString(),
      endDatetime: dateEnd.toISOString(),
      userId: 'a301cca5-165c-4197-952b-d302343b876a',
    }),
  });
  if (res.status === 200) {
    return 'Tag activated';
  } else {
    return 'Something wrong happened';
  }
}
