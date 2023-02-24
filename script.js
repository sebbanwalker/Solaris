let resp;
let data;
let searchContainer = document.getElementById('search-results');
let searchInput = document.getElementById('search-input');
let backButton = document.getElementById('back-button');
let leftButton = document.getElementById('left-button');
let rightButton = document.getElementById('right-button');
let currentPlanet;

async function getSolarSystem() {

    resp = await fetch('https://majazocom.github.io/Data/solaris.json');
    data = await resp.json();
    console.log(data);


    for(i = 0; i < data.length; i++) {
        let planet = document.getElementById(`${data[i].name.toLowerCase()}--planet`);
        let item = data[i];
        console.log(item.name);
        planet.addEventListener('click', function() {
            openPlanet(item);
        });
    };
    
}

getSolarSystem();

function openPlanet(item) {
    console.log("I am clickabe: " + item.name);
    currentPlanet = item.id;
    console.log("Current planet ID: " + currentPlanet);
    document.getElementById('modal-window').style.display = "flex";
    document.getElementById('planet-name').innerHTML = item.name;
    document.getElementById('desc--content').innerHTML = item.desc;
}

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

      for(i = 0; i < data.length; i++) {
        if(e.target.textContent.toLowerCase() == data[i].name.toLowerCase()) {
            console.log("Found a matching planet:" + data[i].name.toLowerCase());
            document.getElementById('modal-window').style.display = "flex";
            openPlanet(data[i]);
        }
      }
    }
  });

backButton.addEventListener('click', function() {document.getElementById('modal-window').style.display = "none";})

leftButton.addEventListener('click', function() {
    if(currentPlanet > 0) {
        openPlanet(data[currentPlanet-1]);
    }
})

rightButton.addEventListener('click', function() {
    if(currentPlanet < 8) {
        openPlanet(data[currentPlanet+1]);
    }
})