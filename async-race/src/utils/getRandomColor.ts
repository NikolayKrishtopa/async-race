export default function getRandomColor() {
  let colorCode = '#';
  for (let i = 1; i < 4; i += 1) {
    const num = Math.floor(Math.random() * 255);
    console.log(num);

    colorCode += num.toString(16);
  }
  console.log(colorCode);

  return colorCode;
}
