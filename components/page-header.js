class PageHeader {
  constructor(headerElement) {
    this.headerElement = headerElement;
  }
  updateAverage(newAverage) {
    var badge = this.headerElement.querySelector('.badge');
    badge.textContent = newAverage;
    console.log(newAverage);
  }
}
