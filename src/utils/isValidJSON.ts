function isValidJSON(str: string) : boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export default isValidJSON;