export function renderSearchBar(){
  document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchInput = document.querySelector('.js-search-input').value;
    window.location.href = `amazon.html?search=${searchInput}`;
  });

  document.querySelector('.js-search-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
      const searchInput = document.querySelector('.js-search-input').value;
      window.location.href = `amazon.html?search=${searchInput}`;
    }
  });
}