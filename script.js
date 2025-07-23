const kingBooksDOM = document.getElementById('king-books');
const loaderDOM = document.getElementById('loader');
const tableDOM = document.getElementById('table');
const villainsRowDOM = document.getElementById('villains-row');

const modalWindow = document.createElement("div");
modalWindow.id = 'modal';

const closeBtn = document.createElement('div');
closeBtn.classList.add('close-modal');
closeBtn.textContent = 'x';

const contentDOM = document.createElement('div');
closeBtn.classList.add('api-content');

modalWindow.appendChild(closeBtn);
modalWindow.appendChild(contentDOM);
console.log(modalWindow);

tableDOM.classList.add('hide');
loaderDOM.classList.add('show');

fetch('https://stephen-king-api.onrender.com/api/books')
    .then((res) => res.json())
    .then((data) => {

        tableDOM.classList.remove('hide');
        loaderDOM.classList.remove('show');

        data.data.forEach((book) => {
            kingBooksDOM.insertAdjacentHTML('beforeend',
                `<tr data-bookid="${book.id}">
                    <td>${book.Title}</td>
                    <td>${book.Year}</td>
                    <td>${book.Publisher}</td>
                    <td>${book.ISBN}</td>
                    <td>${book.Pages}</td>
                    <td>${book.Notes[0] ? book.Notes.join(' ') : 'No additional notes'}</td>
                </tr>`
            )
        })
    })
    .catch((error) => console.log(error));

kingBooksDOM.addEventListener("click", (e) => {
    villainsRowDOM && kingBooksDOM.removeChild(villainsRowDOM);
    const tr = e.target.parentElement;
    const bid = tr.dataset.bookid;
    if (villainsRowDOM && villainsRowDOM != tr) {
        kingBooksDOM.removeChild(villainsRowDOM);
    }

    fetch("https://stephen-king-api.onrender.com/api/book/" + bid)
        .then((res) => res.json())
        .then((data) => {
            tr.insertAdjacentHTML(
                "afterend", `
                <tr id="villains-row">
                    <td colspan="1">Villains:</td>  
                    <td colspan="5">${data.data.villains
                .map((villain) => villain.name)
                .join('<br/>')}</td>
                </tr>`
            );
        })
        .catch((err) => console.log(err));
});

