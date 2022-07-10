let site = [];

function createList(title){
  const ul = document.createElement('ul');
  const urlTitle = 1;
  const urlLink = 3;
  for (i = 0; i < title[1].length; i++) {
    site = [title[urlTitle][i], title[urlLink][i]];
    createElementItem(site,ul);
  };
  document.body.appendChild(ul);
}

const createElementItem = (site, parentElement) => {
  let ElementItem = document.createElement('li');
  ElementItem.classList.add('list-item_1');
  let a = document.createElement('a');
  a.setAttribute ('href',site[1]);
  a.classList.add('link');
  a.textContent = site[0];
  ElementItem.append(a);
  parentElement.append(ElementItem);
}

function URL(){
  let search = document.querySelector('.input-in').value;
  let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&ailimit=3&format=json&origin=*&search=';
  return url + search;
}

const  searchWikiPromise = () => {
    return  fetch(URL()).then(response => {
      return response.json()
    })
    .then((data) => {
    const title = data;
    createList(title);
    })
  }

const searchWikiAsync = async () => {
  let response =  await fetch(URL());
  let result = await response.json();
  const title = result;
  createList(title);
}
  
const searchWikiGen = asyncAlt(function*()  {
    let response =  yield fetch(URL());
    let result = yield response.json();
    const title =  result;
    createList(title);
})

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

const methods = {
  promise:'promise',
  async:'async',
  gen:'gen'
}

function setOnClick(method){ 
  clearFunction();
  switch(method){
  case methods.promise:
    document.querySelector('.main_search').removeEventListener('click',searchWikiAsync);
    document.querySelector('.main_search').removeEventListener('click',searchWikiGen);
    document.querySelector('.main_search').addEventListener('click',searchWikiPromise);
  break;
  case methods.async:
    document.querySelector('.main_search').removeEventListener('click',searchWikiPromise);
    document.querySelector('.main_search').removeEventListener('click',searchWikiGen);
    document.querySelector('.main_search').addEventListener('click',searchWikiAsync);
  break;
  case methods.gen:
    document.querySelector('.main_search').removeEventListener('click',searchWikiPromise);
    document.querySelector('.main_search').removeEventListener('click',searchWikiAsync);
    document.querySelector('.main_search').addEventListener('click',searchWikiGen);
  break;
  default:undefined;
  }
}

function clearFunction(){
   document.querySelector('ul')?.remove();
}


