class App {
  constructor(presentContainer) {
    this.presentContainer = presentContainer;
    this.presents = [];
    this.latestPresentIndex = -1;
    this._fillPresentContainer();
    this._setupChooseAnotherButton();
    this._updateTitle("Click a present to open it"); 
  }

  _fillPresentContainer() {
    PRESENT_SOURCES.slice(0, 5).forEach((source, index) => {
      const present = new Present(this.presentContainer, source, index, this._handlePresentOpened.bind(this));
      this.presents.push(present);
    });
  }

  _setupChooseAnotherButton() {
    const button = document.getElementById('chooseAnother');
    button.addEventListener('click', () => {
      if (this.latestPresentIndex !== -1) {
        let newSrc;
        do {
          newSrc = PRESENT_SOURCES[Math.floor(Math.random() * PRESENT_SOURCES.length)];
        } while (newSrc === this.presents[this.latestPresentIndex].presentSrc);
        this.presents[this.latestPresentIndex].changeImage(newSrc);
      }
    });
  }

  _handlePresentOpened(index) {
    if (this.latestPresentIndex === -1) {
      document.getElementById('chooseAnother').style.display = 'block';
      this._updateTitle("Enjoy your Gifts!!!!!"); 
    }
    this.latestPresentIndex = index;
  }

  _updateTitle(newTitle) {
    const titleElement = document.getElementById('title');
    if (titleElement) {
      titleElement.textContent = newTitle;
    }
  }
}
