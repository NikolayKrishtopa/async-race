export default function getRandomColor() {
  let colorCode = '#';
  for (let i = 1; i < 4; i += 1) {
    const num = Math.floor(Math.random() * 255);
    colorCode += num.toString(16);
  }
  return colorCode;
}
