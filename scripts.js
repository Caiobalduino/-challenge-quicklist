const startContainer = document.getElementById("start-container");
const shoppingList = document.getElementById("shopping-list");
const backButton = document.getElementById("back-btn");
const addItemButton = document.getElementById("add-item");
const itemInput = document.getElementById("item-input");
const notification = document.getElementById("notification");

shoppingList.style.display = "none";
startContainer.style.display = "flex";

setTimeout(() => {
  startContainer.style.opacity = "1";
  startContainer.style.transform = "translateY(0)";
}, 100);

document.getElementById("start-list").addEventListener("click", () => {
    startContainer.classList.add("hidden");
    setTimeout(() => {
      startContainer.style.display = "none";
      shoppingList.style.display = "flex";
      shoppingList.classList.remove("hidden");
      setTimeout(() => {
        shoppingList.style.opacity = "1";
        shoppingList.style.transform = "translateY(0)";
      }, 100);
    }, 500);
});

backButton.addEventListener("click", () => {
    shoppingList.classList.add("hidden");
    setTimeout(() => {
      shoppingList.style.display = "none";
      startContainer.style.display = "flex";
      startContainer.classList.remove("hidden");
      setTimeout(() => {
        startContainer.style.opacity = "1";
        startContainer.style.transform = "translateY(0)";
      }, 100);
    }, 500);
  });

function addItemToList(itemName) {
  const itemList = document.getElementById("list");

  const listItem = document.createElement("li");
  listItem.classList.add("list-item");

  const leftDiv = document.createElement("div");
  leftDiv.style.display = "flex";
  leftDiv.style.alignItems = "center";
  leftDiv.style.width = "100%";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.marginRight = "10px";

  const itemText = document.createElement("span");
  itemText.textContent = itemName;

  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(itemText);

  const rightDiv = document.createElement("div");
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "img/delete.svg";
  deleteIcon.alt = "Delete Item";
  deleteIcon.style.cursor = "pointer";
  deleteIcon.style.width = "20px";

  deleteIcon.addEventListener("click", () => {
    if (checkbox.checked) {
      listItem.remove();
      saveListToLocalStorage();
      showNotification("Item removido da lista");
    } else {
      showNotification("Selecione primeiro o item para deletar");
    }
  });

  rightDiv.appendChild(deleteIcon);
  listItem.appendChild(leftDiv);
  listItem.appendChild(rightDiv);

  itemList.appendChild(listItem);

  saveListToLocalStorage();
}

itemInput.addEventListener("input", (event) => {
  const inputValue = event.target.value;
  event.target.value = inputValue.replace(/\d/g, "");
});

function saveListToLocalStorage() {
  const items = [];
  const listItems = document.querySelectorAll(".list-item");

  listItems.forEach((item) => {
    const itemName = item.querySelector("span").textContent;
    items.push(itemName);
  });

  localStorage.setItem("shoppingList", JSON.stringify(items));
}

function loadListFromLocalStorage() {
  const savedItems = JSON.parse(localStorage.getItem("shoppingList"));

  if (savedItems) {
    savedItems.forEach((itemName) => {
      addItemToList(itemName);
    });
  }
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationText = notification.querySelector("p");
  notificationText.textContent = message;

  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
  }, 3000);
}

window.addEventListener("DOMContentLoaded", loadListFromLocalStorage);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

addItemButton.addEventListener("click", () => {
  let itemName = itemInput.value.trim();

  if (itemName !== "") {
    itemName = capitalizeFirstLetter(itemName);
    addItemToList(itemName);
    itemInput.value = "";
  }
});

itemInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    let itemName = itemInput.value.trim();

    if (itemName !== "") {
      itemName = capitalizeFirstLetter(itemName);
      addItemToList(itemName);
      itemInput.value = "";
    }
  }
});
