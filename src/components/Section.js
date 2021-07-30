export class Section {
  constructor({ containerSelector }) {
    this._container = document.querySelector(containerSelector);
  }

  renderItems({ items, renderer }) {
    this._items = items;
    this._renderer = renderer;
    this._items.forEach(item => this._renderer(item));
  }

  addItem({ item }) {
    this._container.prepend(item);
  }
}