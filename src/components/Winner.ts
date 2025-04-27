import { CarType, WinnerType } from '../types/models';
import SELECTORS from '../utils/selectors';

export default class Winner {
  element: HTMLElement | null;
  winnerData: WinnerType;
  CarData: CarType | null;
  generateCarImg: (color: string, className: string) => string;
  fetchForCarData: (id: string) => Promise<CarType>;

  constructor(
    winnerData: WinnerType,
    generateCarImg: (color: string, className: string) => string,
    fetchForCarData: (id: string) => Promise<CarType>
  ) {
    this.fetchForCarData = fetchForCarData;
    this.winnerData = winnerData;
    this.generateCarImg = generateCarImg;
    this.element = this.createLayout();
    this.initiate();
  }

  getCarData = async () => {
    const carData = await this.fetchForCarData(this.winnerData.id);
    this.CarData = carData;
  };

  createLayout = () => {
    const element = document.createElement('div');
    element.classList.add('winner');
    element.innerHTML = `
      <p class="winner__text winner__text_type_number"></p>
      <div class="winner__icon-wrapper">
        
      </div>
      <p class="winner__text winner__text_type_name"></p>
      <p class="winner__text winner__text_type_wins"></p>
      <p class="winner__text winner__text_type_best-time"></p>
  `;
    return element;
  };

  fillLayoutWithData = () => {
    if (!this.element) return;
    const number = this.element.querySelector(SELECTORS.WINNER_NUMBER);
    const wins = this.element.querySelector(SELECTORS.WINNER_WINS);
    const bestTime = this.element.querySelector(SELECTORS.WINNER_BEST_TIME);
    const carName = this.element.querySelector(SELECTORS.WINNER_CAR_NAME);
    const iconContainer = this.element.querySelector('.winner__icon-wrapper');

    if (
      number &&
      wins &&
      bestTime &&
      carName &&
      this.CarData &&
      this.winnerData.id &&
      iconContainer
    ) {
      number.textContent = this.winnerData.id.toString();
      wins.textContent = this.winnerData.wins.toString();
      bestTime.textContent = this.winnerData.time.toString();
      carName.textContent = this.CarData.name;
      iconContainer.innerHTML = this.generateCarImg(
        this.CarData.color,
        'winner__car-icon'
      );
    }
  };

  initiate = async () => {
    await this.getCarData();
    this.fillLayoutWithData();
  };
}
