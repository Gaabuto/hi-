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
      categories[editIndex].nameCategory = nameCategory;
      categories[editIndex].description = description;
      localStorage.setItem("categories", JSON.stringify(categories));
      editIndex = -1;
      document.getElementById("exampleModalLabel").innerText = "Add Category";
    }
  }

  render();
  document.getElementById("addName").value = "";
  document.getElementById("description").value = "";
  let modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal")
  );
  modal.hide();
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
  if (confirm("bạn có muốn cứu không?")) categories.splice(index, 1);
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
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});
swalWithBootstrapButtons
  .fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true,
  })
  .then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error",
      });
    }
  });
