const kingBooksDOM = document.getElementById('king-books');

fetch('https://stephen-king-api.onrender.com/api/books')
    .then((res) => res.json())
    .then((data) => {
        console.log(data.data);
        data.data.forEach((book) => {
            kingBooksDOM.insertAdjacentHTML('beforeend',
                `<tr>
                    <td>${book.Title}</td>
                    <td>${book.Year}</td>
                    <td>${book.Publisher}</td>
                    <td>${book.ISBN}</td>
                    <td>${book.Pages}</td>
                    <td>${book.Notes[0]}</td>
                </tr>`
            )
        })
    })
    .catch((error) => console.log(error));

