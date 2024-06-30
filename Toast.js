const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
};
export default class Toast {
  #toastElement;
  #autoCloseTimeout;

  constructor(options) {
    this.#toastElement = document.createElement("div");
    this.#toastElement.classList.add("toast");
    this.update({ ...DEFAULT_OPTIONS, ...options });
  }

  set position(value) {
    const currentContainer = this.#toastElement.parentElement;
    const selector = `.toast-container[data-position="${value}"]`;
    const container =
      document.querySelector(selector) || this.createContainer(value);
    container.append(this.#toastElement);

    if (currentContainer !== null && !currentContainer.hasChildNodes())
      currentContainer.remove();
  }

  set text(value) {
    this.#toastElement.textContent = value;
  }

  set autoClose(value) {
    if (value === false) return;
    if (this.#autoCloseTimeout !== null) clearTimeout(this.#autoCloseTimeout);

    this.#autoCloseTimeout = setTimeout(() => {
      this.remove();
    }, value);
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  remove() {
    const container = this.#toastElement.parentElement;
    this.#toastElement.remove();

    if (!container.hasChildNodes()) container.remove();
    this.onClose();
  }

  createContainer(position) {
    const container = document.createElement("div");
    container.classList.add("toast-container");
    container.dataset.position = position;
    document.body.append(container);
    return container;
  }
}
