const searchInput = document.getElementById('searchInput');
const input = document.querySelector('form');
const results = document.getElementById('results');
const likeButton =  document.getElementById('like-button')


async function fetchData() {
  const response = await fetch('http://localhost:3000/matches');
  const data = await response.json();
  return data;
}


function filterData(data, query) {
  return data.filter(item => {
    return (
    item.team1.toLowerCase().includes(query.toLowerCase()) ||
      item.team2.toLowerCase().includes(query.toLowerCase()) ||
      item.round.includes(query)
    );
  });
}


function displayResults(data) {
  results.innerHTML = '';
  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.round}: ${item.team1} vs ${item.team2} - ${item.score}`;
    results.appendChild(listItem);
  });
}


input.addEventListener('submit', (e) => {
  e.preventDefault()
  const query = searchInput.value;
  fetchData()
    .then(data => filterData(data, query))
    .then(data => displayResults(data));
});

const toggler = document.querySelector("#dark-mode-toggle-icon")
 toggler.addEventListener('click', () =>{

  if(!document.documentElement.classList.contains('dark')){
    document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }

 })
