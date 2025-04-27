export default function getRandomIndex(array: Array<unknown>) {
  const index = Math.floor(Math.random() * array.length);

  return index;
}
