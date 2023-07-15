class App {
  container: HTMLElement;

  constructor() {
    this.container = document.querySelector('.root') as HTMLElement;
    this.initiate();
  }

  initiate = () => {
    this.container.innerHTML = `
		<p>App is running</p>
		`;
  };
}

export default App;
