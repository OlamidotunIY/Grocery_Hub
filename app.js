// ****** SELECT ITEMS **********

const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option

let editElement;
let editFlag = false;
let editID = '';
// ****** EVENT LISTENERS **********
// submit from
form.addEventListener('submit',addItems)

// clear items
clearBtn.addEventListener('click', clearItems)
// ****** FUNCTIONS **********
function addItems(e){
    e.preventDefault();

    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag){
        const element = document.createElement('article')

        // add class
        element.classList.add('grocery-item');

        // add unique id

        const attr = document.createAttribute('data-id')
        attr.value = id;
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`

        // select btns
        const deleteBtn = element.querySelector('.delete-btn')
        const editBtn = element.querySelector('.edit-btn')
        deleteBtn.addEventListener('click', deleteItem)
        editBtn.addEventListener('click', editItem)
        // append child
        list.appendChild(element)
        displayAlert('item added to the list', 'success')
        // show container
        container.classList.add('show-container')

        // add to local storage
        addToLocalStorage(id, value);

        // Set back to default
        setBackToDefault();
    }
    else if(value && editFlag){
      editElement.innerHTML = value;
      displayAlert('Item changed', 'success')
      setBackToDefault()
    }
    else{
       displayAlert("please enter value", "danger")
    }
}

// display alert
function displayAlert(text, action){
    alert.textContent = text
    alert.classList.add(`alert-${action}`)


    // remove alert 
    setTimeout(function(){
    alert.textContent = ''
    alert.classList.remove(`alert-${action}`)
}, 1000)
}
// set back to default
function setBackToDefault(){
  grocery.value = "";
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}
// clear  items
function clearItems(){
  const items = document.querySelectorAll('.grocery-item')

 if(items.length > 0){
  items.forEach(function(item){
    list.removeChild(item);
  })
 }
 container.classList.remove('show-container')
 displayAlert('Item cleared', 'success')
 setBackToDefault();
}
// delete item
function deleteItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if(list.children.length === 0){
    container.classList.remove('show-container')
  }
  displayAlert('Item Deleted', 'danger')
  // editLocalStorage(editID, value);
  setBackToDefault();
  // removeFromLocalStorage();
}

// edit items
function editItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  // set edit value
  editElement = e.currentTarget.parentElement.previousElementSibling;

  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = 'edit'
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id:id, value:value };
  let items = getLocalStorage();
  console.log(items)

  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function removeFromLocalStorage(){

}
function editLocalStorage(editID, value){

}
// ****** SETUP ITEMS **********

