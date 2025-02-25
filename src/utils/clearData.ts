/* eslint-disable @typescript-eslint/no-explicit-any */


const clearData = (obj: Record<string, unknown>): any => {
  const body = {...obj};
  for (const key in body) {
    if (!body[key]) {
      delete body[key];
    }
  }
  return body;
}

export default clearData;