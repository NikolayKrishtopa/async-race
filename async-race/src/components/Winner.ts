import { CarType, WinnerType } from '../types/models';
import SELECTORS from '../utils/selectors';

export default class Winner {
  element: HTMLElement | null;
  winnerData: WinnerType;
  CarData: CarType | null;
  generateCarImg: (color: string) => string;

  constructor(
    winnerData: WinnerType,
    generateCarImg: (color: string) => string
  ) {
    this.winnerData = winnerData;
    this.generateCarImg = generateCarImg;
    this.element = this.createLayout();
  }

  createLayout = () => {
    const element = document.createElement('div');
    element.classList.add('winner');
    element.innerHTML = `
   <p class="winner__text winner__text_type_number"></p>
        <!-- <img src="#" alt="car icon" class="winner__icon" /> -->
        <p class="winner__text winner__text_type_name"></p>
        <p class="winner__text winner__text_type_wins"></p>
        <p class="winner__text winner__text_type_best-time"></p>
  `;
    const number = element.querySelector('.winner__text_type_number');
    const wins = element.querySelector('.winner__text_type_wins');
    const bestTime = element.querySelector('.winner__text_type_best-time');
    if (number && wins && bestTime && this.winnerData.id) {
      number.textContent = this.winnerData.id.toString();
      wins.textContent = this.winnerData.wins.toString();
      bestTime.textContent = this.winnerData.time.toString();
    }
    return element;
  };
}
