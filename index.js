import reddit from './redditAPI';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// EVENT LISTENERS
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.getElementById('limit').value;
  if (searchTerm === '') {
    showMessage('Enter a search term', 'alert-danger');
  }
  searchInput.value = '';

  // SEARCH REDDIT
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    console.log(results);
    let output = '<div class="card-columns">';
    results.forEach((post) => {
      // check for image
      let image = post.preview
        ? post.preview.images[0].source.url
        : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mSU7zvXLWk2A7gLCwxfWUgHaGG%26pid%3DApi&f=1';
      output += `
        <div class="card">
            <img src="${image}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${
                truncateText(post.selftext, 50)
                  ? truncateText(post.selftext, 50)
                  : ''
              }</p>
              <a href="${
                post.url
              }" target="_blank" class="btn btn-primary">Go to post</a>
              <hr>
              <span class="badge badge-primary">Subreddit: ${post.subreddit}</span>
              <span class="badge badge-danger">Score: ${post.score}</span>
            </div>
        </div>
        `;
    });
    output += `</div>`;
    document.getElementById('results').innerHTML = output;
  });
});

function showMessage(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const searchContainer = document.getElementById('search-container');
  const search = document.getElementById('search');
  searchContainer.insertBefore(div, search);
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 2000);
}

// TRUNCATE TEXT
function truncateText(text, limit) {
  const shortended = text.indexOf(' ', limit);
  if (shortended === -1) return text;
  return text.substring(0, shortended);
}
// truncate functions
