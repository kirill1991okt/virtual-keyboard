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
    instruction.innerText = 'Для переключения ENG/РУС нажимай Alt + Ctrl';

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
      console.log(e);
      
      const key = document.querySelector(`#${e.code}`);

      if(!key){
        e.preventDefault();
        return;
      }

      
      if(e.key === 'CapsLock' && !e.repeat){
        e.preventDefault();
        this.caps = !this.caps;

        if(this.caps){
          key.classList.add('active');
        } else{
          key.classList.remove('active');
        }
        this.switchCaps(e.shiftKey);
      } else {
        key.classList.add('active');

        if(e.altKey && e.ctrlKey && !e.repeat){
          this.lang = this.lang === 'ru' ? 'en' : 'ru';
          localStorage.setItem('lang', this.lang);
          this.switchLang(this.lang, e.shiftKey);
        } else if (e.key === 'Shift' && !e.repeat){
          e.preventDefault();
          this.switchCaps(e.shiftKey);
        } else if (e.code === 'Tab' && !e.repet){
          e.preventDefault();
          this.putText('\t');
        } else if (e.code === 'Enter' && !e.repet){
          e.preventDefault();
          this.putText('\n');
        } else if (e.code === 'Backspace' && !e.repet){
          e.preventDefault();
          this.pressBackspace();
        } else if (e.code === 'Delete' && !e.repet){
          e.preventDefault();
          this.pressDelete();
        } else if (e.code === 'ArrowUp' && !e.repet){
          e.preventDefault();
          this.arrowUp();
        } else if (e.code === 'ArrowDown' && !e.repet){
          e.preventDefault();
          this.arrowDown();
        } else if (e.code === 'ArrowLeft' && !e.repet){
          e.preventDefault();
          this.arrowLeft();
        } else if (e.code === 'ArrowRight' && !e.repet){
          e.preventDefault();
          this.arrowRight();
        } else if (!objectWithKeyboardKyes[e.code].func){
          e.preventDefault();
          this.putText(key.textContent);
        } 

      }
    })

    document.addEventListener('keyup', (e) => {
      e.stopImmediatePropagation();
      const key = document.querySelector(`#${e.code}`);

      if(!key){
        e.preventDefault();
        return;
      }

      if(e.key !== 'CapsLock'){
        key.classList.remove('active');

        
        if(e.key === 'Shift'){
          console.log(this.caps);
          console.log(e);
          e.preventDefault();
          this.switchCaps(e.shiftKey);
        }
      }
    })
  }

  switchCaps(shiftKey){
    const showUpperCase = (this.caps && !shiftKey) || (!this.caps && shiftKey);
    
    this.container.querySelectorAll('.keyboard-key').forEach(e => {
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

 // потестировать это функцию
switchLang(lang, shift){
  this.container.querySelectorAll('.keyboard-key').forEach(e =>{
    e.textContent = objectWithKeyboardKyes[e.id][lang];
  })

  this.switchCaps(shift);
}

putText(char){
  let text = this.text,
  start = text.selectionStart,
  end = text.selectionEnd;

  text.value = text.value.slice(0, start) + char + text.value.slice(end);

  start = start + char.length;
  end = start; 
}

pressBackspace(){
  if (this.text.selectionStart !== this.text.selectionEnd) {
    this.putText('');
  } else {
    this.text.value = this.text.value.slice(0, this.text.selectionStart - 1) + this.text.value.slice(this.text.selectionEnd);

    this.text.selectionStart = this.text.selectionStart;
    this.text.selectionEnd = this.text.selectionStart;

  }
}

pressDelete(){
  if (this.text.selectionStart !== this.text.selectionEnd) {
    this.putText('');
  } else {
    const currentPosition = this.text.selectionStart;
    this.text.value = this.text.value.slice(0, this.text.selectionStart) + this.text.value.slice(this.text.selectionEnd + 1);

    this.text.selectionStart = currentPosition;
    this.text.selectionEnd = this.text.selectionStart;
  }
}

arrowUp(){
  this.text.selectionStart = 0;
  this.text.selectionEnd = this.text.selectionStart;
  console.log('up');
}

arrowDown(){
  this.text.selectionStart = this.text.value.length;
  this.text.selectionEnd = this.text.selectionStart;
  console.log('down');
}

arrowLeft(){
  this.text.selectionStart = this.text.selectionStart - 1;
  this.text.selectionEnd = this.text.selectionStart;
  console.log('left');
}

arrowRight(){
  this.text.selectionStart = this.text.selectionStart + 1;
  this.text.selectionEnd = this.text.selectionStart;
  console.log('right');
}

}

new Keyboard().init();