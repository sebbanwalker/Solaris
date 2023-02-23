let resp;
let data;
let searchContainer = document.getElementById('search-results');
let searchInput = document.getElementById('search-input');

async function getSolarSystem() {

    resp = await fetch('https://majazocom.github.io/Data/solaris.json');
    data = await resp.json();
    console.log(data);


    for(i = 0; i < data.length; i++) {
        let item = data[i].name;
        console.log(item);
    };
    
}

getSolarSystem();

if(searchInput) {
    console.log("Searchinput is true");
    searchInput.addEventListener("input", filterItems);
}

function filterItems() {
    const searchValue = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.search-item');

    if (searchValue === '') {
        // Hide all items if search field is empty
        items.forEach(item => item.style.display = '');
    } else {   
        items.forEach(item => {
            const title = item.innerText.toLowerCase();
            //console.log(item.innerText.toLowerCase());
            if(title.includes(searchValue)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }
}

searchContainer.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('search-item')) {
      let itemName = e.target.textContent;
      //window.location.href = `https://example.com/search?query=${itemName}`;
      console.log(itemName);
    }
  });