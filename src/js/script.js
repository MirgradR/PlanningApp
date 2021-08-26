let ul = document.querySelector('.plan-list');
let btnDelete = document.querySelector('.btn-delete');

let list = [];
if (localStorage.getItem('todo')!=undefined) {
    list = JSON.parse(localStorage.getItem('todo'))
    showList()
}

function getCase() {
    let name = document.getElementById('name');
    let details = document.getElementById('details');
    let save = document.getElementById('save')
    if (save) {
        save.addEventListener('click', function (){
            let item = {}
            item.name = name.value;
            item.details = details.value;
            item.important = 'false';
            list.push(item);
            showList();
            localStorage.setItem('todo', JSON.stringify(list));
            name.value = ''
            details.value = ''
        }) 
    }
}
getCase()

function showList() {
    if (ul) {
        ul.innerHTML = ''  
        for (let key in list) {
            let li = document.createElement('li')
            li.classList.add(`plan-item`)
            li.classList.add(`item${key}`)
            li.setAttribute('id', `${key}`) 
            if (list[key].important == 'true') {
                li.classList.add(`important`)
            }
            li.innerHTML = `
            <div class="plan-item_content">
                <h2 class="plan-item_title">${list[key].name}</h2>
                <p class="plan-item_description">${list[key].details}</p>
            </div>
            <div class="plan-item_buttons">
                <button class="btn-set">&#9734;</button>
                <button class="btn-delete (${key})">&#10060;</button>
            </div>
            `
            ul.append(li)  
        } 
    }
}

function deleteList() {
    let btnsDel = document.querySelectorAll('.btn-delete')
    for (let del of btnsDel) {
        del.addEventListener('click', function(e) {
            let a = del.closest('.plan-item')
            a.remove()
            list = JSON.parse(localStorage.getItem('todo'))
            for (let i = 0; i<list.length; i++) {
                if (del.classList.contains(`(${i})`)) {
                    list.splice(i,1) 
                }
            }
            localStorage.setItem('todo', JSON.stringify(list)); 
        })
    }
}
deleteList()

// Search elem

const search = document.querySelector('.input-search');
const li = document.querySelectorAll('li')
const elem = document.querySelectorAll('li h2')

const searchElem = () => {
    if (search) {
        search.addEventListener('input', function() {
            let value = RegExp(this.value.trim(), 'gi')
            if (value != '') {
                elem.forEach(e => {
                    if (e.innerText.search(value) == -1) {  
                        e.closest('li').classList.add('hide')
                    } else {
                        e.closest('li').classList.remove('hide')
                    }
                })
            } else {
                elem.forEach(e => {
                    e.closest('li').classList.remove('hide')
                })
            } 
        })
    }     
}
searchElem()

//important list

const setImportant = () => {
    let setBtns = document.querySelectorAll('.btn-set');
    setBtns.forEach(e => {
        e.addEventListener('click', function() {
            let closestLI = e.closest('li');
            list = JSON.parse(localStorage.getItem('todo'))
            for (let key in list) {
                if (key == closestLI.id && list[key].important == 'false') {
                    list[key].important = 'true'
                    closestLI.classList.add('important')
                    //console.log(list[key]) 
                } else if (key == closestLI.id && list[key].important == 'true') {
                    list[key].important = 'false'
                    closestLI.classList.remove('important')
                    //console.log(list[key]) 
                }
            }
            localStorage.setItem('todo', JSON.stringify(list));
        })
    })
}
setImportant()