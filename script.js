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
                    <td>${book.Notes[0] ? book.Notes.join(' ') : 'No notes'}</td>
                </tr>`
            )
        })
    })
    .catch((error) => console.log(error));

kingBooksDOM.addEventListener('click', (e) => {
    const bid = e.target.parentElement.dataset.bookid;
    console.log(bid);
    fetch('https://stephen-king-api.onrender.com/api/book/' + bid)
        .then(res => res.json())
        .then(data => console.log(data))
        .then(err => console.log(err));
});