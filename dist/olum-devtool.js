/**
 * @name olum-devtool.js
 * @version 0.1.3
 * @copyright 2021
 * @author Eissa Saber
 * @license MIT
 */

export default class DevTool {
  global = typeof self !== "undefined" ? self : window;
  isDown = false;
  isActive = false;
  startX;
  startY;
  currentX;
  currentY;
  walkX;
  walkY;
  logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" fill="none"><path d="M75.324 150c25.508 0 46.186-20.678 46.186-46.187H29.138c0 25.509 20.678 46.187 46.186 46.187z" fill="url(#A)"/><path d="M94.815 4.661L98.417 0S90.05 2.279 85.069 4.661C81.894 6.18 80.05 7.003 77.23 9.11c-2.859 2.137-4.618 3.366-6.568 6.356s-3.951 8.898-3.951 26.907S57.39 65.89 57.39 65.89s-1.695.848-2.966-.636-1.048-18.432-1.271-19.915-.699-3.467-1.77-5.508c-.97-1.849-2.966-4.449-2.966-4.449s-2.265-2.876-4.237-4.026c-.864-.503-2.331-1.059-2.331-1.059s1.222 2.651 1.695 4.449c.363 1.381.505 2.179.636 3.602.144 1.565.141 2.46 0 4.025-.182 2.02-.608 3.107-1.059 5.085l-2.542 9.534c-1.419 4.846-2.462 7.487-4.025 12.288-1.831 5.622-3.286 8.655-4.661 14.407-1.344 5.623-2.446 10.117-2.754 15.89-.344 6.458-.084 8.508 1.271 14.831l90.466-2.754c.744-5.499.894-9.185.423-15.043-.738-9.194-2.467-14.83-5.857-22.881s-5.509-13.983-18.221-35.381-2.405-33.686-2.405-33.686z" fill="url(#B)"/><path d="M58.025.635s1.055 4.485 1.271 7.415c.269 3.634-.332 7.409-.848 11.017-.423 2.966-.886 4.727 0 8.686.503 2.249 1.907 5.932 1.907 5.932s-7.962-5.085-8.898-11.017 3.208-9.438 4.873-15.466C57.035 4.65 58.025.635 58.025.635z" fill="url(#C)"/><path d="M106.331 107.203c0 17.201-14.195 29.873-30.509 29.026s-29.873-11.825-29.873-29.026 12.673-30.932 29.873-30.932 30.509 13.732 30.509 30.932z" fill="url(#D)"/><path d="M72.116 92.638l1.271-4.237v-1.907s-.635-4.449-13.347.847-7.946 21.557-4.344 23.888 3.351 2.56 5.828 2.807c.906.091 1.442.196 2.331 0 2.463-.542 2.973-2.691 4.237-4.873 2.197-3.79 2.435-10.646 2.435-10.646s.897-3.711 1.59-5.879zm20.232-3.231c.269-.383.212-.551.847-.847s3.524 2.498 4.661 4.873c.841 1.757 1.059 4.873 1.059 4.873s.238 3.046-1.059 4.025c-.503.38-2.119 0-2.119 0s-1.321-1.246-2.119-2.754c-1.146-2.165-1.483-5.72-1.483-5.72s-.693-3.163.212-4.449zm-7.204 7.203s1.121-1.329 2.119-1.483c1.034-.16 1.749.575 2.331 1.483.542.848.558 1.545.424 2.542-.148 1.101-.494 1.914-1.271 2.543a2.77 2.77 0 0 1-3.602 0c-.777-.629-1-1.333-1.059-2.331-.069-1.15 1.059-2.754 1.059-2.754zm5.085 12.439s-.576-3.967.212-4.6c.816-.656 3.39 1.695 4.255 2.398a5.16 5.16 0 0 1 1.638 2.202c.422 1.027.529 1.904.17 2.838a2.77 2.77 0 0 1-3.119 1.8c-.987-.156-1.532-.654-2.083-1.488-.635-.962-1.073-3.15-1.073-3.15z" fill-opacity=".7" fill="#2d00a5"/><defs><linearGradient id="A" x1="75.324" y1="103.813" x2="75.324" y2="150" gradientUnits="userSpaceOnUse"><stop stop-color="#fc4555"/><stop offset="1" stop-color="#fc4055"/></linearGradient><linearGradient id="B" x1="75.284" y1="0" x2="75.284" y2="114.407" gradientUnits="userSpaceOnUse"><stop stop-color="#ffd864"/><stop offset="1" stop-color="#fc4055"/></linearGradient><linearGradient id="C" x1="55.839" y1=".635" x2="55.839" y2="33.686" gradientUnits="userSpaceOnUse"><stop stop-color="#ffd864"/><stop offset="1" stop-color="#fc4055"/></linearGradient><linearGradient id="D" x1="76.14" y1="76.271" x2="76.14" y2="136.269" gradientUnits="userSpaceOnUse"><stop stop-color="#b833e1"/><stop offset="1" stop-color="#4d54e0"/></linearGradient></defs></svg>`;
  eye = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/></svg>`;

  constructor() {
    this.olumVer = "{{olumVer}}";
    this.selector = "{{olumSelector}}";
    this.appMarkup = document.querySelector(this.selector);
    this.render();
  }

  template() {
    return `
      <div class="DevTool">
        <div class="DevTool__header">
          <button type="button" class="DevTool__header--closeBtn">&#10005;</button>
          <span class="DevTool__header__logo">${this.logo}</span>
          <span class="DevTool__header__version"><i>detected</i> olum@${this.olumVer}</span>
        </div>
        <div class="DevTool__body">${this.root()}</div>
      </div>
      <div class="DevTool__layer"><span></span></div>
    `;
  }

  render() {
    this.global.olumDevtool = this.devtool.bind(this);
  }

  removeDevtool(btn, template, layer) {
    if (!!btn && !!template && !!layer) {
      btn.addEventListener("click", () => {
        template.remove();
        layer.remove();
      });
      this.global.addEventListener("popstate", () => {
        template.remove();
        layer.remove();
      });
    }
  }

  root() {
    const root = document.createElement("div");
    root.className = "DevTool__body__root";
    const clonedTree = this.appMarkup.cloneNode(true);
    // clean tree
    const elms = clonedTree.querySelectorAll("*");
    elms.forEach(elm => {
      this.clean(elm);
      if (!elm.getAttribute("olum-component")) elm.remove();
    });
    this.clean(clonedTree);
    root.append(clonedTree);

    const comps = root.querySelectorAll("[olum-component]");
    comps.forEach(comp => {
      if (!!comp.childElementCount) comp.className = "caret";
      const lt = `<span class="chars">&lt;</span>`;
      const gt = `<span class="chars">&gt;</span>`;
      const name = `<span class="name">${comp.getAttribute("olum-component")}</span>`;
      const view = comp.getAttribute("olum-view") ? `<span class="view">view</span>` : "";
      const scroll = `<button type="button" class="scroll" data-name="${comp.getAttribute("olum-component")}">${this.eye}</button>`;
      const line = `<div class="line">${lt + name + gt + view + scroll}</div>`;
      comp.insertAdjacentHTML("afterbegin", line);
    });

    return root.outerHTML;
  }

  devtool() {
    if (!this.appMarkup) return console.warn("olum-devtool - couldn't find application root element via this selector '" + this.selector + "' !");
    let template = document.querySelector(".DevTool");
    if (!template) {
      document.body.insertAdjacentHTML("beforeend", this.template());
      template = document.querySelector(".DevTool");
      if (!!template) {
        const btn = template.querySelector(".DevTool__header--closeBtn");
        const header = template.querySelector(".DevTool__header");
        const layer = document.querySelector(".DevTool__layer");
        if (!!btn && !!header && !!layer) {
          this.center(template); // center devtool in view-port
          template.addEventListener("click", e => this.toggle(e)); // toggle tree components
          template.addEventListener("click", e => this.scroll(e)); // scroll into view
          this.removeDevtool(btn, template, layer); // when closing or navigating
          // make devtool dragable
          header.addEventListener("touchstart", e => this.dragStart(e, template));
          header.addEventListener("mousedown", e => this.dragStart(e, template));
          header.addEventListener("touchmove", e => this.dragMove(e, template));
          header.addEventListener("mousemove", e => this.dragMove(e, template));
          header.addEventListener("mouseup", () => (this.isDown = false), (this.isActive = false));
          header.addEventListener("touchend", () => (this.isDown = false), (this.isActive = false));
          header.addEventListener("mouseleave", () => (this.isActive = false));
          // layer
          template.addEventListener("mousemove", e => this.displayLayer(e, layer));
        }
      }
    }
  }

  dragStart(e, template) {
    e = e || this.global.event;
    this.isDown = true;
    this.isActive = true;
    if (e.type == "mousedown") {
      this.startX = e.pageX - template.offsetLeft;
      this.startY = e.pageY - template.offsetTop;
    } else {
      // touch
      this.startX = e.touches[0].clientX - template.offsetLeft;
      this.startY = e.touches[0].clientY - template.offsetTop;
    }
  }

  dragMove(e, template) {
    e = e || this.global.event;
    let left = template.offsetLeft;
    let top = template.offsetTop;
    if (this.isDown && this.isActive) {
      if (e.type == "mousemove") {
        this.currentX = e.pageX - template.offsetLeft;
        this.currentY = e.pageY - template.offsetTop;
      } else {
        // touch
        this.currentX = e.touches[0].clientX - template.offsetLeft;
        this.currentY = e.touches[0].clientY - template.offsetTop;
      }
      this.walkX = this.currentX - this.startX;
      this.walkY = this.currentY - this.startY;
      left += this.walkX;
      top += this.walkY;
      template.style.left = left + "px";
      template.style.top = top + "px";
    }
  }

  clean(elm) {
    if (!!elm) {
      elm.removeAttribute("id");
      elm.removeAttribute("class");
      elm.removeAttribute("style");
      const children = [...elm.childNodes];
      if (Array.isArray(children) && children.length) {
        children.forEach(node => (node.nodeType === Node.TEXT_NODE ? node.remove() : null));
      }
    }
  }

  center(template) {
    if (!!template) {
      template.style.left = (this.global.innerWidth - template.offsetWidth) / 2 + "px";
      template.style.top = (this.global.innerHeight - template.offsetHeight) / 2 + "px";
    }
  }

  toggle(e) {
    if (e.target.classList.contains("line") && e.target.parentElement.classList.contains("caret")) {
      const caret = e.target.parentElement;
      caret.classList.toggle("active");
    }
  }

  scroll(e) {
    if (e.target.classList.contains("scroll")) {
      const name = e.target.getAttribute("data-name");
      const comp = document.querySelector(`[olum-component="${name}"]`);
      if (!!comp) comp.scrollIntoView({ behavior: "smooth" });
    }
  }

  displayLayer(e, layer) {
    if (e.target.classList.contains("line")) {
      const compName = e.target.parentElement.getAttribute("olum-component");
      const currentComp = document.querySelector(`[olum-component="${compName}"]`);
      const rect = currentComp.getBoundingClientRect();
      const left = rect.left;
      const top = rect.top;
      const width = rect.width;
      const height = rect.height;
      layer.style.width = width + "px";
      layer.style.height = height + "px";
      layer.style.left = left + "px";
      layer.style.top = top + "px";
      layer.querySelector("span").textContent = compName;
      layer.style.display = "flex";
    } else {
      layer.style.display = "none";
    }
  }
}
new DevTool();