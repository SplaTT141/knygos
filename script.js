const kingBooksDOM = document.getElementById('king-books');
const loaderDOM = document.getElementById('loader');
const tableDOM = document.getElementById('table')

tableDOM.classList.add('hide');
loaderDOM.classList.add('show');

fetch('https://stephen-king-api.onrender.com/api/books')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        tableDOM.classList.remove('hide');
        loaderDOM.classList.remove('show');

        data.data.forEach((book) => {
            kingBooksDOM.insertAdjacentHTML('beforeend',
                `<tr>
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
    const tr = e.target.parentElement;
    const bid = tr.dataset.bookid;

    fetch("https://stephen-king-api.onrender.com/api/book/" + bid)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            tr.insertAdjacentHTML(
                "afterend",
                `
        <tr>
          <td colspan="2">${data.data.Title}</td>
          <td colspan="4">${data.data.villains}</td>
        </tr>
        `
            );
        })
        .catch((err) => console.log(err));
});

