

  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  const header = document.querySelector('header');
  const mainDiv = document.querySelector('.main');
  let ul = document.getElementById('invitedList');
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  let errorMessage = document.createElement('p');
  const lis = ul.children;
  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    if(isChecked) {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
          li.querySelector('label').style.display = 'none';  
        } else {
          li.style.display = 'none';                       
        }
      }
    } else {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        li.style.display = '';
        li.querySelector('label').style.display = '';  
      }                                 
    }
  });
  
  function createLI(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);  
      element[property] = value; 
      return element;
    }
    
    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);     
      li.appendChild(element); 
      return element;
    }
    
    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);     
    appendToLI('label', 'textContent', 'Confirm')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
    return li;
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    if (text == '') {
      errorMessage.textContent = 'You have entered a blank field';
      errorMessage.style.color = 'red';
      header.appendChild(errorMessage);
    } else {
      let duplicate = false;
      for (let i = 0; i < lis.length; i++) {
        if (text === lis[i].firstElementChild.textContent) {
          errorMessage.textContent = 'You have entered a duplicate name';
          errorMessage.style.color = 'red';
          header.appendChild(errorMessage);
          duplicate = true;
          break;
        } 
      }
      if (errorMessage.textContent == 'You have entered a blank field') {
        header.removeChild(errorMessage);
      }
      if (!duplicate){
      const li = createLI(text);
      ul.appendChild(li);
      header.removeChild(errorMessage);
      }
    }
  localStorage.setItem("invitedList",ul.innerHTML);    
  });
  
  ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    
    if (checked) {
      listItem.className = 'responded';
      listItem.querySelector('label').childNodes[0].textContent = 'Confirmed';
    } else {
      listItem.className = '';
      listItem.querySelector('label').childNodes[0].textContent = 'Confirm';
    }
  });
    
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      if (button.textContent === 'remove') {
        ul.removeChild(li);
      } else if (button.textContent === 'edit') { 
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'save';
      } else if (button.textContent === 'save') { 
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'edit';
      }
    }
  });  

ul.innerHTML = localStorage.getItem("invitedList");



  
  
  
  
  
  
  