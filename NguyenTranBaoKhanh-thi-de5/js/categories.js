javascript;

Collapse;

Wrap;

Copy;
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let editIndex = -1;
let currentPage = 1;
let taskPerPage = 5;
let totalPage = Math.ceil(categories.length / taskPerPage);

function addNewCategory(e) {
  e.preventDefault();
  let nameCategory = document.getElementById("addName").value;
  let description = document.getElementById("description").value;

  if (editIndex === -1) {
    if (nameCategory === "") {
      alert("Bạn cần đặt tên cho category");
    } else if (
      categories.some(
        (category) =>
          category.nameCategory.toLowerCase() === nameCategory.toLowerCase()
      )
    ) {
      alert("Tên không được trùng");
    } else {
      let newCategory = { nameCategory, description };
      categories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(categories));
      render();
      renderPagination();
    }
  } else {
    if (nameCategory === "") {
      alert("Bạn cần đặt tên cho category");
    } else if (
      categories.some(
        (category, index) =>
          category.nameCategory.toLowerCase() === nameCategory.toLowerCase() &&
          index !== editIndex
      )
    ) {
      alert("Tên không được trùng");
    } else {
      categories[editIndex] = { nameCategory, description };
      localStorage.setItem("categories", JSON.stringify(categories));
      editIndex = -1;
      document.getElementById("exampleModalLabel").innerText = "Add Category";
      render();
      renderPagination();
    }
  }

  document.getElementById("addName").value = "";
  document.getElementById("description").value = "";
  let modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal")
  );
  modal.hide();
}

function getFilteredCategories() {
  let search = document.getElementById("searchInput").value.toLowerCase();
  let filteredCategories = categories;

  if (search) {
    filteredCategories = categories.filter((category) =>
      category.nameCategory.toLowerCase().includes(search)
    );
  }
  return filteredCategories;
}

function render() {
  let body = document.getElementById("tbody");
  let filteredCategories = getFilteredCategories();

  let startIndex = (currentPage - 1) * taskPerPage;
  let endIndex = startIndex + taskPerPage;
  let paginatedCategories = filteredCategories.slice(startIndex, endIndex);

  body.innerHTML = "";
  paginatedCategories.forEach((category) => {
    body.innerHTML += `
      <tr style="background-color: white;">
        <td>${category.nameCategory}</td>
        <td>${category.description}</td>
        <td>
          <button onclick="editCategory(${categories.indexOf(category)})" 
            style="border: none; color: #4667E2; background-color: white; margin-right: 10px;">edit</button>
          <button onclick="delCategory(${categories.indexOf(category)})" 
            style="border: none; color: #CA533B; background-color: white;">delete</button>
        </td>
      </tr>
    `;
  });

  renderPagination();
}

function renderPagination() {
  let paginateContainer = document.getElementById("paginate-container");
  let filteredCategories = getFilteredCategories();
  totalPage = Math.ceil(filteredCategories.length / taskPerPage);

  if (currentPage > totalPage && totalPage > 0) {
    currentPage = totalPage;
  } else if (totalPage === 0) {
    currentPage = 1;
  }

  paginateContainer.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    if (i === currentPage) {
      paginateContainer.innerHTML += `<span class="paginate-button current-page" onclick="changePage(${i})">${i}</span>`;
    } else {
      paginateContainer.innerHTML += `<span class="paginate-button" onclick="changePage(${i})">${i}</span>`;
    }
  }
}

function changePage(page) {
  currentPage = page;
  render();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    render();
  }
}

function nextPage() {
  if (currentPage < totalPage) {
    currentPage++;
    render();
  }
}

function delCategory(index) {
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
        categories.splice(index, 1);
        localStorage.setItem("categories", JSON.stringify(categories));
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your category has been deleted.",
          icon: "success",
        });
        render();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your category is safe :)",
          icon: "error",
        });
      }
    });
}

function editCategory(index) {
  editIndex = index;
  document.getElementById("addName").value = categories[index].nameCategory;
  document.getElementById("description").value = categories[index].description;
  document.getElementById("exampleModalLabel").innerText = "Edit Category";

  let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
}

document
  .getElementById("exampleModal")
  .addEventListener("hidden.bs.modal", () => {
    document.getElementById("addName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("exampleModalLabel").innerText = "Add Category";
    editIndex = -1;
  });

document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;
  render();
});

render();
