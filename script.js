let resp;
let data;
let searchContainer = document.getElementById('search-results');
let searchInput = document.getElementById('search-input');
let backButton = document.getElementById('back-button');
let leftButton = document.getElementById('left-button');
let rightButton = document.getElementById('right-button');
let currentPlanet;

//Loading all the API data.
async function getSolarSystem() {

    resp = await fetch('https://majazocom.github.io/Data/solaris.json');
    data = await resp.json();
    console.log(data);


    for(i = 0; i < data.length; i++) {
        console.log(data[i].name.toLowerCase());
        let planet = document.getElementById(`${data[i].name.toLowerCase()}--planet`);
        let item = data[i];
        console.log(item.name);
        planet.addEventListener('click', function() {
            openPlanet(item);
        });
    };
    
}

getSolarSystem();


//Opens the modal window and loads all planetary info from the API data. 
function openPlanet(item) {
    console.log("I am clickable: " + item.name);
    currentPlanet = item.id;
    console.log("Current planet ID: " + currentPlanet);
    document.getElementById('modal-window').style.display = "flex";
    document.getElementById('planet-name').innerHTML = item.name;
    document.getElementById('desc--content').innerHTML = item.desc;
    document.getElementById('image').style.backgroundImage = `url("assets/${item.name.toLowerCase()}.jpg")`;
    document.getElementById('latin-name').innerHTML = item.latinName;
    document.getElementById('moons').innerHTML = "";
    if(item.moons.length > 2) {
        for(i = 0; i < item.moons.length; i++) {
            if (i < 4) {
                if (i == item.moons.length-1) {
                    document.getElementById('moons').innerHTML += item.moons[i];
                } else {
                    document.getElementById('moons').innerHTML += item.moons[i] + ", ";   
                } 
            } else if (i == 4) {
                document.getElementById('moons').innerHTML += item.moons[i] + " m.fl...";
            } else {

            }
        }
    }   else if(item.moons.length == 1) {
        document.getElementById('moons').innerHTML += item.moons[0];
    }   else if(item.moons.length == 2) {
        document.getElementById('moons').innerHTML += item.moons[0] + ", ";
        document.getElementById('moons').innerHTML += item.moons[1];
    }   else {
        document.getElementById('moons').innerHTML += "Inga";
    }

    document.getElementById('orbit').innerHTML = item.orbitalPeriod + " dagar";
    document.getElementById('distance').innerHTML = item.distance + " km";

    document.getElementById('temp').innerHTML = "Dag: " + item.temp.day + ", Natt: " + item.temp.night;



    console.log("I am at the end of openPlanet.");
}

//Adds an eventlistener to the input field.
if(searchInput) {
    console.log("Searchinput is true");
    searchInput.addEventListener("input", filterItems);
}


//Search filter that filters search results in a list in real-time.
function filterItems() {
    console.log("filterItems is running");
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
    console.log("filterItems is done.");
}

//Opens the modal window for the chosen planet in the search list
searchContainer.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('search-item')) {
      let itemName = e.target.textContent.toLowerCase();
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

//Event listener to leave the modal window
backButton.addEventListener('click', function() {document.getElementById('modal-window').style.display = "none";})

//Event listener to paginate left in the solar system
leftButton.addEventListener('click', function() {
    if(currentPlanet > 0) {
        openPlanet(data[currentPlanet-1]);
    }
})

//Event listener to paginate right in the solar system
rightButton.addEventListener('click', function() {
    if(currentPlanet < 8) {
        openPlanet(data[currentPlanet+1]);
    }
})