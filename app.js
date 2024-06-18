document.addEventListener('DOMContentLoaded', () => {
  const itemInput = document.getElementById("itemInput");
  const addItemBtn = document.getElementById("addItemBtn");
  const itemList = document.getElementById("itemList"); 

  //Load Items from local storage
  let items = JSON.parse(localStorage.getItem('items')) || [];

  //Render Items
  const renderItems = () => { 
    itemList.innerHTML = '';
    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" ${item.completed ? 'checked' : ''} data-index=${index}>
        <span class="${item.completed ? 'completed' : ''}" style="margin-right: 10px;">${item.text}</span>
        <button data-index=${index};">
          <i class="fa fa-trash-o"></i>
        </button>
      `;

      itemList.appendChild(li);
    });
  };

  //Add a new item
  const addItem = () => {
    const itemText= itemInput.value;
    if (itemText) {
      items.push({text: itemText, completed: false});
      itemInput.value = '';
      updateLocalStorage();
      renderItems();
    };
  };

  document.getElementById("itemInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  });

  //Delete an item 
  const deleteItem = (index) => { 
    items.splice(index, 1);
    updateLocalStorage();
    renderItems();
  };

  //Toggle item completion 
  const toggleItemCompletion = (index) => { 
    items[index].completed = !items[index].completed; 
    updateLocalStorage();
    renderItems();
  };

  //Upate local storage 
  const updateLocalStorage = () => {
    localStorage.setItem('items', JSON.stringify(items));
  };

  //Event Listeners 
  addItemBtn.addEventListener('click', addItem);
  itemList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === "I") {
      const index = e.target.getAttribute('data-index');
      deleteItem(index);
    } else if (e.target.tagName === 'INPUT') {
      const index = e.target.getAttribute('data-index');
      toggleItemCompletion(index);
    }
  });

  //Initial Render 
  renderItems() 
})