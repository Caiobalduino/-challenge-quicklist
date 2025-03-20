
const startContainer = document.getElementById("start-container");
const shoppingList = document.getElementById("shopping-list");

shoppingList.style.display = "none";
startContainer.style.display = "flex";

setTimeout(() => {
  startContainer.style.opacity = "1";
  startContainer.style.transform = "translateY(0)";
}, 100);


document.getElementById("start-list").addEventListener("click", () => {
  startContainer.style.display = "none";  
  shoppingList.style.display = "flex";   
});