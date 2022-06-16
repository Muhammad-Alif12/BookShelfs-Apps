const books = [];

const RENDER_EVENT = 'render-book';


  function addBook() {
    const judul = document.getElementById('inputBookTitle').value;
    const penulis = document.getElementById('inputBookAuthor').value;
    const tahun = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;
    const generatedID = +new Date();
    const bookObject = generateBookObject(generatedID, judul, penulis, tahun, isComplete );
    books.push(bookObject);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function generateBookObject(id, title, author, year, isCompleted) {
    return {
      id,
      title,
      author,
      year,
      isCompleted
    }
  }

  

  function makeBook(bookObject) {

    const textJudul = document.createElement('h3');
    textJudul.innerText = bookObject.title;
   
    const textPenulis = document.createElement('p');
    textPenulis.innerText = bookObject.author;

    const textTahun = document.createElement('p');
    textTahun.innerText = bookObject.year;
   
    const textContainer = document.createElement('div');
    textContainer.classList.add('action');
    
   
    const container = document.createElement('article');
    container.classList.add('book_item');
    container.append(textJudul,textPenulis,textTahun,textContainer);
    container.setAttribute('id', `book-${bookObject.id}`);

    if (bookObject.isCompleted) {
      const button = document.createElement('button');
      const buttonText = document.createTextNode("Belum Selesai DiBaca");
      button.appendChild(buttonText);
      button.classList.add('green');
   
      button.addEventListener('click', function () {
        undoBookFromCompleted(bookObject.id);
      });
   
      const buttonHapus = document.createElement('button');
      const buttonTextHapus = document.createTextNode("Hapus Buku");
      buttonHapus.appendChild(buttonTextHapus);
      buttonHapus.classList.add('red');
   
      buttonHapus.addEventListener('click', function () {
        removeBookFromCompleted(bookObject.id);
      });
   
      textContainer.append(button, buttonHapus);
    } else {
      const button2 = document.createElement('button');
      const buttonText = document.createTextNode("Selesai DiBaca");
      button2.appendChild(buttonText);
      button2.classList.add('green');
   
      button2.addEventListener('click', function () {
        addTBookToCompleted(bookObject.id);
      });
   
      const buttonHapus = document.createElement('button');
      const buttonTextHapus = document.createTextNode("Hapus Buku");
      buttonHapus.appendChild(buttonTextHapus);
      buttonHapus.classList.add('red');
   
      buttonHapus.addEventListener('click', function () {
        removeBookFromCompleted(bookObject.id);
      });
   
      textContainer.append(button2, buttonHapus);
    }
   
    return container;
  }

  function addTBookToCompleted (bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function findBook(bookId) {
    for (const bookItem of books) {
      if (bookItem.id === bookId) {
        return bookItem;
      }
    }
    return null;
  }

  function removeBookFromCompleted(bookId) {
    const hapus = confirm("apakah anda yakin ingin menghapus");

    if(hapus){
      const bookTarget = findTodoIndex(bookId);
   
      if (bookTarget === -1) return;
   
      books.splice(bookTarget, 1);
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
    }
  }
   
   
  function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();

  }

  function findTodoIndex(bookId) {
    for (const index in books) {
      if (books[index].id === bookId) {
        return index;
      }
    }
   
    return -1;
  }