class App {
  container: HTMLElement;
  mode: 'garage' | 'winners';
  garageBtn: HTMLButtonElement | null;
  winnersBtn: HTMLButtonElement | null;

  constructor() {
    this.container = document.querySelector('.root') as HTMLElement;
    this.mode = 'garage';
    this.garageBtn = null;
    this.winnersBtn = null;
    this.initiate();
  }

  createHeaderLayout = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML = `
     <h1 class="header__title">ASYNC RACE</h1>
      <div class="header__btn-wrapper">
        <button class="header__link" id="garageBtn">Garage</button>
        <button class="header__link" id="winnersBtn">Winners</button>
      </div>
    `;
    this.container.prepend(header);
    this.garageBtn = document.querySelector('#garageBtn') as HTMLButtonElement;
    this.winnersBtn = document.querySelector(
      '#winnersBtn'
    ) as HTMLButtonElement;
    this.renderMode();
  };

  renderMode = () => {
    if (!this.garageBtn || !this.winnersBtn) return;
    if (this.mode === 'garage') {
      this.garageBtn.classList.add('header__link_state_active');
      this.winnersBtn.classList.remove('header__link_state_active');
    } else if (this.mode === 'winners') {
      this.winnersBtn.classList.add('header__link_state_active');
      this.garageBtn.classList.remove('header__link_state_active');
    }
  };

  setMode = (mode: typeof this.mode) => {
    this.mode = mode;
    this.renderMode();
  };

  setListeners = () => {
    if (!this.garageBtn || !this.winnersBtn) return;
    this.garageBtn.addEventListener('click', () => this.setMode('garage'));
    this.winnersBtn.addEventListener('click', () => this.setMode('winners'));
  };

  createLayout = () => {
    this.createHeaderLayout();
  };

  initiate = () => {
    this.createLayout();
    this.setListeners();
  };
}

export default App;
