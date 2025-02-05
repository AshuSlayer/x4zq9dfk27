const subContainer = document.querySelector('.subcontainer');
subContainer.classList.add('loading');

window.addEventListener('load', function () {
    subContainer.classList.remove('loading');
});

const cardTemplate = document.querySelector('[data-card-template]');
const bookTemplate = document.querySelector('[data-book]');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const books = [
    [0, "image1.jpg", "Rock Politics", "Ashutosh Bhattarai", "Masterclass", "Highly Dynamic and critically acclaimed fundamentals guide to Rock music and theory. The guitar lessons are unmatched in terms of illustration and clarity.", 25, true, "../home.html#courses"],
    [1, "image2.jpg", "Explosion of Ideas", "Ashutosh Bhattarai", "Workbook", "Harness the power of intense licks, as the workbook takes you on a journey of anthemic proportions. Creating, joining, transposing, juggling, shuffling and brainstorming a simple idea or lick into multiple planes of expression.", 18, true, "files/ExplosionOfIdeas.pdf"],
    [2, "image3.jpg", "Comprehensive Soloing I", "Ashutosh Bhattarai", "Guide", "Comprehensive Soloing is a masterful guide to crafting authentic melodies and compositions.", 15, true, ""],
    [3, "image4.jpg", "Beato Book IVth", "Rick Beato", "Guide", "The Beato Book Interactive is a digital music theory textbook written by Rick Beato.", 15, true, ""],
];

books.forEach((book) => {
    const card = document.importNode(cardTemplate.content, true);
    const [id, image, title, author, genre, description, price, available] = book;
    card.querySelector('img').id = id;
    card.querySelector('img').src = image;
    card.querySelector('[data-title]').textContent = title;
    card.querySelector('[data-genre]').textContent = genre;
    card.querySelector('[data-author]').textContent = author;
    subContainer.appendChild(card);
});

const cards = document.querySelectorAll('.img-container');

cards.forEach(function (card) {
    card.addEventListener('click', function () {
        subContainer.classList.add('show');
        const title = this.querySelector('.title').textContent;
        const author = this.querySelector('.author').textContent;
        const id = this.querySelector('img').id;
        const description = books[+id][5];
        const cost = books[+id][6];
        const genre = this.querySelector('.genre').textContent;
        const downloadLink = books[+id][8]; // Get individual book link
        
        const book = document.importNode(bookTemplate.content, true);
        book.querySelector('.modal-title').textContent = title;
        book.querySelector('.modal-author').textContent = `- ${author}`;
        book.querySelector('.modal-genre').textContent = genre;
        book.querySelector('.description').textContent = description;
        book.querySelector('.cost').innerText = `$${cost}`;
        
        const getButton = book.querySelector('.cost:nth-of-type(2)'); // Select the second button (Get button)
        if (downloadLink) {
            getButton.innerHTML = `<a href="${downloadLink}" target="_blank" style="color: white; text-decoration: none;">Get</a>`;
        } else {
            getButton.style.opacity = "0.5"; // Grey out if no download available
            getButton.disabled = true;
        }
        
        const bookImg = this.querySelector('.book-img').src;
        book.querySelector('img').src = bookImg;
        book.querySelector('.back').style.backgroundImage = `url(${bookImg})`;
        
        modal.appendChild(book);
    });
});

overlay.addEventListener('click', function () {
    subContainer.classList.remove('show');
    modal.innerHTML = '';
});
