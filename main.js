import {creatKeyboardFragment, objectWithKeyboardKyes} from './keyboardLayout.js';

console.log(creatKeyboardFragment);
console.log(objectWithKeyboardKyes);


class Keboard {
  constructor(){
    this.caps = false;

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
    instruction.innerText = 'Для переключения ENG/РУС нажимай Ctr + Alt';

    textarea.autofocus = true;
    container.appendChild(creatKeyboardFragment);

    document.body.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(paragraph);
    wrapper.appendChild(instruction);
    wrapper.appendChild(textarea);
    wrapper.appendChild(container);
    

  }
}

const keyboard = new Keboard();
keyboard.init();
