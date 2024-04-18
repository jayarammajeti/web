class Present {
  constructor(containerElement, presentSrc, index, onOpenCallback) {
    this.containerElement = containerElement;
    this.presentSrc = presentSrc;
    this.index = index;
    this.onOpenCallback = onOpenCallback;

    this.image = document.createElement('img');
    this.image.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/gift-icon.png';
    this.containerElement.appendChild(this.image);

    this.image.addEventListener('click', () => {
      this._openPresent();
    });
  }

  _openPresent() {
    this.image.src = this.presentSrc;
    alert("SURPRISE!!!!!! CLICK OK TO SEE THE PRESENT. IF YOU DIDN'T LIKED IT, CLICK ON THE BUTTON TO GET OTHER PRESENT");
    this.onOpenCallback(this.index);
  }

  resetToPlaceholder() {
    this.image.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/gift-icon.png';
  }

  changeImage(newSrc) {
    this.presentSrc = newSrc; 
    this.image.src = newSrc;
  }
}
