let site = [];

function cirk(headers,ul){
  for (i = 0; i < headers[1].length; i++) {
    site = [headers[1][i], headers[3][i]];
    createElementItem(site,ul);
    };
}

const createElementItem = (site,parentElement) => {
  let ElementItem = document.createElement('li');
  ElementItem.classList.add('list-item_1');
  let a = document.createElement('a');
  a.setAttribute ('href',site[1]);
  a.classList.add('promise_1');
  a.textContent= site[0];
  ElementItem.append(a);
  parentElement.append(ElementItem);
}

const  searchWiki = () => {
  let search = document.querySelector('.input-in').value;
  let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&ailimit=3&format=json&origin=*&search=';
  let url1= url + search;
    return  fetch(url1).then(response => {
      return response.json()
    })
    .then((data) => {
    const headers = data;
    const ul = document.createElement('ul');
    cirk(headers,ul);
    document.body.appendChild(ul);
    })
  }

const searchWiki_1 = async () => {
  let search = document.querySelector('.input-in').value;
  let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&ailimit=3&format=json&origin=*&search=';
  let url1= url + search;
  let response =  await fetch(url1);
  let result = await response.json();
      const headers = result;
      const ul = document.createElement('ul');
      cirk(headers,ul);
      document.body.appendChild(ul);
    }
  
const searchWiki_2 = asyncAlt(function*()  {
    let search = document.querySelector('.input-in').value;
    let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&ailimit=3&format=json&origin=*&search=';
    let url1= url + search;
    let response =  yield fetch(url1);
    let result = yield response.json();
        const headers =  result;
        const ul = document.createElement('ul');
        cirk(headers,ul);
        document.body.appendChild(ul);
        
      }
)
function asyncAlt(generatorFunction) {
  return function() { 
    const generator = generatorFunction()
    function resolve(next) {
      if (next.done) {
        return Promise.resolve(next.value)
      }
      return Promise.resolve(next.value).then(response => {
        return resolve(generator.next(response))
      })
    }
    return resolve(generator.next())
  }
}

function setOnClick(method){ 
  clearFunction();
  switch(method){
case 'promise':
  document.querySelector('.main_search').removeEventListener('click',searchWiki_1);
  document.querySelector('.main_search').removeEventListener('click',searchWiki_2);
  
  document.querySelector('.main_search').addEventListener('click',searchWiki);
break;
case 'async':
  document.querySelector('.main_search').removeEventListener('click',searchWiki);
  document.querySelector('.main_search').removeEventListener('click',searchWiki_2);
  
  document.querySelector('.main_search').addEventListener('click',searchWiki_1);
  break;
  case 'gen':
    document.querySelector('.main_search').removeEventListener('click',searchWiki);
    document.querySelector('.main_search').removeEventListener('click',searchWiki_1);
    
    document.querySelector('.main_search').addEventListener('click',searchWiki_2);
    break;
default:undefined;
  }
}

function clearFunction(){
   document.querySelector('ul')?.remove();
}


