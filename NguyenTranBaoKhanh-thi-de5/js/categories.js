let categories = JSON.parse(localStorage.getItem("categories")) || [];

function addNewCategory(e) {
  e.preventDefault();
  let nameCategory = document.getElementById("addName").value;
  if (nameCategory == "") {
    alert("Bạn cần đặt tên cho category");
  } else {
    let description = document.getElementById("description").value;

    let newCategory = {
      nameCategory: nameCategory,
      description: description,
    };

    categories.push(newCategory);
    localStorage.setItem("categories", JSON.stringify(categories));
    render();

    nameCategory.value = "";
    description.value = "";
  }
}

function render() {
  let body = document.getElementById("tbody");
  body.innerHTML = "";
  document.getElementById("exampleModalLabel").innerText = "Add Category";

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
  categories.splice(index, 1);
  localStorage.setItem("categories", JSON.stringify(categories));
  render();
}

render();
