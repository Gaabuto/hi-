let vocabList = JSON.parse(localStorage.getItem("vocabList")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let editIndex = -1;

function searchBarCategories() {
  let categorySelect = document.getElementById("categorySelect");
  let categoryFilter = document.getElementById("categoryFilter");

  if (categories.length === 0) {
    alert(
      "Chưa có category nào. Vui lòng thêm category trong trang Categories trước!"
    );
    return;
  }

  categorySelect.innerHTML = '<option value="">Select a category</option>';
  categoryFilter.innerHTML = '<option value="">All Categories</option>';
  categories.forEach((category) => {
    categorySelect.innerHTML += `<option value="${category.nameCategory}">${category.nameCategory}</option>`;
    categoryFilter.innerHTML += `<option value="${category.nameCategory}">${category.nameCategory}</option>`;
  });
}

function addNewWord(e) {
  e.preventDefault();
  let word = document.getElementById("wordInput").value;
  let meaning = document.getElementById("meaningInput").value;
  let category = document.getElementById("categorySelect").value;

  if (editIndex === -1) {
    if (word === "") {
      alert("Bạn cần nhập từ vựng");
    } else if (category === "") {
      alert("Bạn cần chọn một category");
    } else if (
      vocabList.filter(
        (vocab) => vocab.word.toLowerCase() === word.toLowerCase()
      ).length > 0
    ) {
      alert("Từ vựng không được trùng");
    } else {
      let newVocab = { word, meaning, category };
      vocabList.push(newVocab);
      localStorage.setItem("vocabList", JSON.stringify(vocabList));
      let modal = bootstrap.Modal.getInstance(
        document.getElementById("vocabModal")
      );
      modal.hide();
    }
  } else {
    if (word === "") {
      alert("Bạn cần nhập từ vựng");
    } else if (category === "") {
      alert("Bạn cần chọn một category");
    } else if (
      vocabList.filter(
        (vocab, index) =>
          vocab.word.toLowerCase() === word.toLowerCase() && index !== editIndex
      ).length > 0
    ) {
      alert("Từ vựng không được trùng");
    } else {
      vocabList[editIndex] = { word, meaning, category };
      localStorage.setItem("vocabList", JSON.stringify(vocabList));
      editIndex = -1;
      let modal = bootstrap.Modal.getInstance(
        document.getElementById("vocabModal")
      );
      modal.hide();
    }
  }

  render();
  document.getElementById("wordInput").value = "";
  document.getElementById("meaningInput").value = "";
  document.getElementById("categorySelect").value = "";
}

function render() {
  let body = document.getElementById("tbody");
  let selectedCategory = document.getElementById("categoryFilter").value;
  let searchVocab = document.getElementById("searchInput").value.toLowerCase();

  body.innerHTML = "";
  let filteredVocab = vocabList;

  if (selectedCategory) {
    filteredVocab = filteredVocab.filter(
      (vocab) => vocab.category === selectedCategory
    );
  }

  if (searchVocab) {
    filteredVocab = filteredVocab.filter((vocab) =>
      vocab.word.toLowerCase().includes(searchVocab)
    );
  }

  filteredVocab.forEach((vocab, index) => {
    body.innerHTML += `
            <tr style="background-color: white;">
                <td>${vocab.word}</td>
                <td>${vocab.meaning}</td>
                <td>${vocab.category}</td>
                <td>
                    <button onclick="editWord(${vocabList.indexOf(
                      vocab
                    )})" style="border: none; color: #4667E2; background-color: white; margin-right: 10px;">edit</button>
                    <button onclick="delWord(${vocabList.indexOf(
                      vocab
                    )})" style="border: none; color: #CA533B; background-color: white;">delete</button>
                </td>
            </tr>
        `;
  });
}

function delWord(index) {
  let swalWithBootstrapButtons = Swal.mixin({
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
        vocabList.splice(index, 1);
        localStorage.setItem("vocabList", JSON.stringify(vocabList));
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your word has been deleted.",
          icon: "success",
        });
        render();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your word is safe :)",
          icon: "error",
        });
      }
    });
}

function editWord(index) {
  editIndex = index;
  document.getElementById("wordInput").value = vocabList[index].word;
  document.getElementById("meaningInput").value = vocabList[index].meaning;
  document.getElementById("categorySelect").value = vocabList[index].category;
  document.getElementById("vocabModalLabel").innerText = "Edit Vocabulary";

  let modal = new bootstrap.Modal(document.getElementById("vocabModal"));
  modal.show();
}

document.getElementById("categoryFilter").addEventListener("change", render);
document.getElementById("searchInput").addEventListener("input", render);

document
  .getElementById("vocabModal")
  .addEventListener("hidden.bs.modal", () => {
    document.getElementById("wordInput").value = "";
    document.getElementById("meaningInput").value = "";
    document.getElementById("categorySelect").value = "";
    document.getElementById("vocabModalLabel").innerText = "Add Vocabulary";
    editIndex = -1;
  });

searchBarCategories();
render();
