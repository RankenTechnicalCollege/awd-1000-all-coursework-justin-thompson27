// Initial Array of Drinks
let drinkMenu = ["Ski","Apple Juice","Pepsi","Cola","Milk"];

document.addEventListener("DOMContentLoaded",displayMenu);
//Function to Display the drink menu
function displayMenu(){
  const list = document.getElementById("drinkList");
  list.innerHTML = "";
  if(drinkMenu.length === 0){
    list.innerHTML = "<li>No drinks on the menu </li>";
    return;
  }
  
  for (let i = 0; i < drinkMenu.length; i++) {
    const li = document.createElement("li");
    li.textContent = drinkMenu[i];
    list.appendChild(li);
    
  }
}
//Add a new drink to the array
function addDrink(){
  const input = document.getElementById("newDrink");
  // trim gets rid of blank spaces
  const drinkName = input.value.trim();
  if(drinkName === "")
  {
    alert("Please enter a drink name");
  }
  drinkMenu.push(drinkName);
  input.value = "";
  displayMenu();

}
//remove drink
function removeDrink(){
  const input = document.getElementById("removeDrink");
  const drinkName = input.value.trim();
  const index = drinkMenu.indexOf(drinkName);

  if(index === -1){
    alert(`${drinkName} not found on the menu`);
    return;
  }
  drinkMenu.splice(index,1);
  input.value = "";
  displayMenu();
}

//edit drinks
function editDrink(){
  const oldName = document.getElementById("oldDrink").value.trim();
  const newName = document.getElementById("editedDrink").value.trim();

  if (oldName === "" || newName === "") {
    alert("Please enter the current and new drink names!");
    return;
  }
  const index = drinkMenu.indexOf(oldName);
  if (index === -1) {
    alert(`${oldName}not found on the menu `);
    return;
    
  }
  drinkMenu[index] = newName;
  document.getElementById("oldDrink").value = "";
  document.getElementById("editedDrink").value = "";
  displayMenu();


  
}