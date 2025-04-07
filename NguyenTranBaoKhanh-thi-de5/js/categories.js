let categories = JSON.parse(localStorage.getItem("categories")) || [];
let editIndex = -1;

function addNewCategory(e) {
  e.preventDefault();
  let nameCategory = document.getElementById("addName").value;
  let description = document.getElementById("description").value;
  if (editIndex == -1) {
    document.getElementById("exampleModalLabel").innerText = "Add Category";
    if (nameCategory == "") {
      alert("Bạn cần đặt tên cho category");
    } else if (
      categories.filter(
        (category) =>
          category.nameCategory.toLowerCase() === nameCategory.toLowerCase()
      ).length > 0
    ) {
      alert("Tên không được trùng");
    } else {
      let newCategory = {
        nameCategory: nameCategory,
        description: description,
      };
      categories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  } else {
    document.getElementById("exampleModalLabel").innerText = "Edit Category";
    categories[editIndex].nameCategory = nameCategory;
    categories[editIndex].description = description;

    editIndex = -1;
    document.getElementById("exampleModalLabel").innerText = "Add Category";
  }

  render();
  document.getElementById("addName").value = "";
  document.getElementById("description").value = "";
}

function render() {
  let body = document.getElementById("tbody");
  body.innerHTML = "";
  categories.forEach((category, index) => {
    body.innerHTML += `
      <tr style="background-color: white;">
        <td>${category.nameCategory}</td>
        <td>${category.description}</td>
        <td>
          <button onclick="editCategory(${index})" style="border: none; color: #4667E2; background-color: white; margin-right: 10px;">edit</button>
          <button onclick="delCategory(${index})" style="border: none; color: #CA533B; background-color: white;">delete</button>
        </td>
      </tr>
      
    `;
  });
}

function delCategory(index) {
  if (confirm()) categories.splice(index, 1);
  localStorage.setItem("categories", JSON.stringify(categories));
  render();
}
function editCategory(index) {
  editIndex = index;
  document.getElementById("addName").value = categories[index].nameCategory;
  document.getElementById("description").value = categories[index].description;

  let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
}

render();
