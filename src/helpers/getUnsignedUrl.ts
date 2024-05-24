export function getUnsignedUrl(signedUrl: string) {
  // Regex to match the part after amazonaws.com/ and before the first ?
  const regex = /amazonaws\.com\/([^?]*)/;
  const match = signedUrl.match(regex);

  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  } else {
    return signedUrl;
  }
}
