import {creatKeyboardFragment, objectWithKeyboardKyes} from './keyboardLayout.js';

console.log(objectWithKeyboardKyes);


class Keyboard {
  constructor(){
    this.caps = false;
    this.lang = localStorage.getItem('lang') === 'ru' ? 'ru':'en';

  }

  init(){
    const wrapper = this.wrapper = document.createElement('main');
    const title = this.title = document.createElement('h1');
    const textarea = this.text = document.createElement('textarea');
    const paragraph = this.paragrah = document.createElement('p');
    const instruction = this.instruction = document.createElement('p');

    const container = this.container = document.createElement('div');  

    wrapper.classList.add('wrapper');
    title.classList.add('title');
    textarea.classList.add('text');
    paragraph.classList.add('info');
    instruction.classList.add('info');
    container.classList.add('container');

    title.innerText = 'RSS Virtual keyboard';
    paragraph.innerText = 'Клавиатура была создана в Windows';
    instruction.innerText = 'Для переключения ENG/РУС нажимай Ctrl + Alt';

    textarea.autofocus = true;
    container.appendChild(creatKeyboardFragment);

    document.body.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(paragraph);
    wrapper.appendChild(instruction);
    wrapper.appendChild(textarea);
    wrapper.appendChild(container);
    
    this.callListeners();
  }

  callListeners(){

    document.addEventListener('keydown', (e) =>{
      e.stopImmediatePropagation();
      
      const key = document.querySelector(`#${e.code}`);

      if(!key){
        e.preventDefault();
        return;
      }

      if(e.key === 'CapsLock' && !e.repeat){
        e.preventDefault();
        this.caps = true;

        key.classList.add('active');

        this.switchCaps(e.shiftKey); // поставить аргумент в функцию.
      }
      
    })
  }
              //false
  switchCaps(shiftKey){
    const showUpperCase = (this.caps && !shiftKey) || (!this.caps && shiftKey);

    
    this.container.querySelectorAll('.keyboard-key').forEach(e => {
      // console.log(objectWithKeyboardKyes[e.id].func)
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
        } else if (e.id === 'Slash' && this.lang === 'ru') {
          e.textContent = shiftKey ? ',' : '.';
        } else {
          if (showUpperCase) {
            e.textContent = e.textContent.toUpperCase();
          } else {
            e.textContent = e.textContent.toLowerCase();
          }
        }
      } 
    });

    
  }
}

new Keyboard().init();
// const keyboard = new Keyboard();
// console.log(keyboard);
