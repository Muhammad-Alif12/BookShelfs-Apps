
document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBook();
      document.forms['inputBook'].reset();
    });
    if (isStorageExist()) {
        loadDataFromStorage();
      }
  });

  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBOOKList = document.getElementById('incompleteBookshelfList');
    uncompletedBOOKList.innerHTML = '';
    const completedBOOKList = document.getElementById('completeBookshelfList');
    completedBOOKList.innerHTML = '';
    for (const bookItem of books) {
      const bookElement = makeBook(bookItem);
      if (bookItem.isCompleted){
        completedBOOKList.append(bookElement);
      }
      else{
        uncompletedBOOKList.append(bookElement);
      }
    }
  });

  function refreshBuku(){
    const bookItem = document.querySelectorAll("section.book_shelf > .book_list > .book_item");
    for (let i = 0; i < bookItem.length; i++) {
      txtValue = bookItem[i].textContent || bookItem[i].innerText; {
          bookItem[i].style.display = "";
      }
    }
  };

  function cariBuku() {
    let cari = prompt("masukkan yang dicari");
    if(cari === null || cari === undefined){
      cari = "";
    }
  
    const filter = cari.toUpperCase();
    const bookItem = document.querySelectorAll("section.book_shelf > .book_list > .book_item");
    for (let i = 0; i < bookItem.length; i++) {
        txtValue = bookItem[i].textContent || bookItem[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            bookItem[i].style.display = "";
        } else {
            bookItem[i].style.display = "none";
        }
    }
  };
  
  function checkboxComplete (){
    const checkBox = document.getElementById("inputBookIsComplete");
    const gantiButton = document.getElementById("bookSubmit");
    if(checkBox.checked === true){   
        const buttonText = document.createTextNode("MASUKAN BUKU KEDALAM RAK YANG SELESAI DIBACA");
        gantiButton.removeChild(gantiButton.firstChild);
        gantiButton.appendChild(buttonText);
    }else {
        const buttonText = document.createTextNode("MASUKAN BUKU KEDALAM RAK YANG BELUM SELESAI DIBACA");
        gantiButton.removeChild(gantiButton.firstChild);
        gantiButton.appendChild(buttonText);
    }
  };