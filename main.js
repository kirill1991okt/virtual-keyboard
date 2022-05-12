import { creatKeyboardFragment, objectWithKeyboardKyes } from './keyboardLayout.js';

class Keyboard {
  constructor() {
    this.caps = false;
    this.lang = localStorage.getItem('lang') === 'ru' ? 'ru' : 'en';
  }

  init() {
    this.wrapper = document.createElement('main');
    this.title = document.createElement('h1');
    this.text = document.createElement('textarea');
    this.paragrah = document.createElement('p');
    this.instruction = document.createElement('p');

    this.container = document.createElement('div');

    this.wrapper.classList.add('wrapper');
    this.title.classList.add('title');
    this.text.classList.add('text');
    this.paragrah.classList.add('info');
    this.instruction.classList.add('info');
    this.container.classList.add('container');

    this.title.innerText = 'RSS Virtual keyboard';
    this.paragrah.innerText = 'Клавиатура была создана в Windows';
    this.instruction.innerText = 'Для переключения ENG/РУС нажимай Alt + Ctrl';

    this.text.autofocus = true;
    this.container.appendChild(creatKeyboardFragment);
    this.switchLang(this.lang);

    document.body.appendChild(this.wrapper);
    this.wrapper.appendChild(this.title);
    this.wrapper.appendChild(this.paragrah);
    this.wrapper.appendChild(this.instruction);
    this.wrapper.appendChild(this.text);
    this.wrapper.appendChild(this.container);

    this.callListeners();
  }

  callListeners() {
    this.text.addEventListener('blur', () => {
      setTimeout(() => {
        this.text.focus();
      }, 0);
    });

    document.addEventListener('keydown', (e) => {
      e.stopImmediatePropagation();

      // const key1 = document.querySelector(`#${e.code}`);
      const key = document.getElementById(e.code);

      if (!key) {
        e.preventDefault();
        return;
      }

      if (e.key === 'CapsLock' && !e.repeat) {
        e.preventDefault();
        this.caps = !this.caps;

        if (this.caps) {
          key.classList.add('active');
        } else {
          key.classList.remove('active');
        }
        this.switchCaps(e.shiftKey);
      } else {
        key.classList.add('active');

        if (e.altKey && e.ctrlKey && !e.repeat) {
          this.lang = this.lang === 'ru' ? 'en' : 'ru';
          localStorage.setItem('lang', this.lang);
          this.switchLang(this.lang, e.shiftKey);
        } else if (e.key === 'Shift' && !e.repeat) {
          e.preventDefault();
          this.switchCaps(e.shiftKey);
        } else if (e.code === 'Tab') {
          e.preventDefault();
          this.putText('\t');
        } else if (e.code === 'Enter') {
          e.preventDefault();
          this.putText('\n');
        } else if (e.code === 'Backspace') {
          e.preventDefault();
          this.pressBackspace();
        } else if (e.code === 'Delete' && !e.repet) {
          e.preventDefault();
          this.pressDelete();
        } else if (e.code === 'ArrowUp' && !e.isTrusted) {
          e.preventDefault();
          this.arrowUp();
        } else if (e.code === 'ArrowDown' && !e.isTrusted) {
          e.preventDefault();
          this.arrowDown();
        } else if (e.code === 'ArrowLeft' && !e.isTrusted) {
          e.preventDefault();
          this.arrowLeft();
        } else if (e.code === 'ArrowRight' && !e.isTrusted) {
          e.preventDefault();
          this.arrowRight();
        } else if (!objectWithKeyboardKyes[e.code].func) {
          e.preventDefault();
          this.putText(key.textContent);
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      e.stopImmediatePropagation();

      // const key = document.querySelector(`#${e.code}`);
      const key = document.getElementById(e.code);

      if (!key) {
        e.preventDefault();
        return;
      }

      if (e.key !== 'CapsLock') {
        key.classList.remove('active');

        if (e.key === 'Shift') {
          e.preventDefault();
          this.switchCaps(e.shiftKey);
        }
      }
    });

    this.container.addEventListener('click', (e) => {
      this.text.focus();
      const eventKeyDown = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        code: e.target.id,
        view: window,
      });
      document.dispatchEvent(eventKeyDown);

      this.text.focus();
      const eventKeyUp = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        code: e.target.id,
        view: window,
      });
      document.dispatchEvent(eventKeyUp);
    });
  }

  switchCaps(shiftKey) {
    const showUpperCase = (this.caps && !shiftKey) || (!this.caps && shiftKey);

    this.container.querySelectorAll('.keyboard-key').forEach((e) => {
      if (!objectWithKeyboardKyes[e.id].func) {
        if (e.id === 'Backquote' && this.lang === 'en') {
          e.textContent = shiftKey ? '~' : '`';
        } else if (e.id === 'Minus' && this.lang === 'en') {
          e.textContent = shiftKey ? '_' : '-';
        } else if (e.id === 'Equal' && this.lang === 'en') {
          e.textContent = shiftKey ? '+' : '=';
        } else if (e.id === 'BracketLeft' && this.lang === 'en') {
          e.textContent = shiftKey ? '{' : '[';
        } else if (e.id === 'BracketRight' && this.lang === 'en') {
          e.textContent = shiftKey ? '}' : ']';
        } else if (e.id === 'Backslash' && this.lang === 'en') {
          e.textContent = shiftKey ? '|' : '\\';
        } else if (e.id === 'Semicolon' && this.lang === 'en') {
          e.textContent = shiftKey ? ':' : ';';
        } else if (e.id === 'Quote' && this.lang === 'en') {
          e.textContent = shiftKey ? '"' : "'";
        } else if (e.id === 'Comma' && this.lang === 'en') {
          e.textContent = shiftKey ? '<' : ',';
        } else if (e.id === 'Period' && this.lang === 'en') {
          e.textContent = shiftKey ? '>' : '.';
        } else if (e.id === 'Slash' && this.lang === 'en') {
          e.textContent = shiftKey ? '?' : '/';
        } else if (e.id === 'Digit1' && (this.lang === 'en' || this.lang === 'ru')) {
          e.textContent = shiftKey ? '!' : '1';
        } else if (e.id === 'Digit2' && this.lang === 'en') {
          e.textContent = shiftKey ? '@' : '2';
        } else if (e.id === 'Digit2' && this.lang === 'ru') {
          e.textContent = shiftKey ? '"' : '2';
        } else if (e.id === 'Digit3' && this.lang === 'en') {
          e.textContent = shiftKey ? '#' : '3';
        } else if (e.id === 'Digit3' && this.lang === 'ru') {
          e.textContent = shiftKey ? '№' : '3';
        } else if (e.id === 'Digit4' && this.lang === 'en') {
          e.textContent = shiftKey ? '$' : '4';
        } else if (e.id === 'Digit4' && this.lang === 'ru') {
          e.textContent = shiftKey ? ';' : '4';
        } else if (e.id === 'Digit5' && (this.lang === 'en' || this.lang === 'ru')) {
          e.textContent = shiftKey ? '%' : '5';
        } else if (e.id === 'Digit6' && this.lang === 'en') {
          e.textContent = shiftKey ? '^' : '6';
        } else if (e.id === 'Digit6' && this.lang === 'ru') {
          e.textContent = shiftKey ? ':' : '6';
        } else if (e.id === 'Digit7' && this.lang === 'en') {
          e.textContent = shiftKey ? '&' : '7';
        } else if (e.id === 'Digit7' && this.lang === 'ru') {
          e.textContent = shiftKey ? '?' : '7';
        } else if (e.id === 'Digit8' && (this.lang === 'en' || this.lang === 'ru')) {
          e.textContent = shiftKey ? '*' : '8';
        } else if (e.id === 'Digit9' && (this.lang === 'en' || this.lang === 'ru')) {
          e.textContent = shiftKey ? '(' : '9';
        } else if (e.id === 'Digit0' && (this.lang === 'en' || this.lang === 'ru')) {
          e.textContent = shiftKey ? ')' : '0';
        } else if (e.id === 'Slash' && this.lang === 'ru') {
          e.textContent = shiftKey ? ',' : '.';
        } else if (showUpperCase) {
          e.textContent = e.textContent.toUpperCase();
        } else {
          e.textContent = e.textContent.toLowerCase();
        }
      }
    });
  }

  // потестировать это функцию
  switchLang(lang, shift) {
    this.container.querySelectorAll('.keyboard-key').forEach((e) => {
      e.textContent = objectWithKeyboardKyes[e.id][lang];
    });

    this.switchCaps(shift);
  }

  putText(char) {
    const { text } = this;
    const start = text.selectionStart;
    const end = text.selectionEnd;
    const cursorAt = start;

    text.value = text.value.slice(0, cursorAt) + char + text.value.slice(end);

    this.text.selectionStart = cursorAt + char.length;
    this.text.selectionEnd = this.text.selectionStart;
  }

  pressBackspace() {
    if (this.text.selectionStart !== this.text.selectionEnd) {
      this.putText('');
    } else {
      const cursorAt = Math.max(0, this.text.selectionStart - 1);

      this.text.value = this.text.value.slice(0, cursorAt)
      + this.text.value.slice(this.text.selectionEnd);

      this.text.selectionStart = cursorAt;
      this.text.selectionEnd = this.text.selectionStart;
    }
  }

  pressDelete() {
    if (this.text.selectionStart !== this.text.selectionEnd) {
      this.putText('');
    } else {
      const currentPosition = this.text.selectionStart;
      this.text.value = this.text.value.slice(0, this.text.selectionStart)
      + this.text.value.slice(this.text.selectionEnd + 1);

      this.text.selectionStart = currentPosition;
      this.text.selectionEnd = this.text.selectionStart;
    }
  }

  arrowUp() {
    this.text.selectionStart = 0;
    this.text.selectionEnd = this.text.selectionStart;
  }

  arrowDown() {
    this.text.selectionStart = this.text.value.length;
    this.text.selectionEnd = this.text.selectionStart;
  }

  arrowLeft() {
    this.text.selectionStart -= 1;
    this.text.selectionEnd = this.text.selectionStart;
  }

  arrowRight() {
    this.text.selectionStart += 1;
    this.text.selectionEnd = this.text.selectionStart;
  }
}

new Keyboard().init();
