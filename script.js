let base_URL = "https://pokeapi.co/api/v2/pokemon/";

// Function to fetch a list of pokemon
function getPokemonList(url) {
  fetch(url)
    // Convert data from JSON
    .then((response) => response.json())
    //Stuff to do with data
    .then((data) => {
      // Console log to make sure I am getting the data
      console.log(data);
      // Get the list of pokemon from the results
      let pokemon = data.results;
      // Get element from HTML to write buttons in
      let container = document.querySelector(".pokemon-list-container");
      // Clear the container
      container.innerHTML = "";
      // Loop over pokemon list and create an HTML button for each one. Add the button to the container
      pokemon.forEach((btn) => {
        container.innerHTML += `<button onclick="getPokemonInfo('${btn.url}')">${btn.name}</button>`;
      });
      // Adding a next and a previous pokemon button
      container.innerHTML += `<br><br><button onclick="getPokemonList('${data.previous}')">Previous</button>`;
      container.innerHTML += `<button onclick="getPokemonList('${data.next}')">Next</button>`;
    });
}

// Get default pokemon list
getPokemonList(base_URL);

// Function to get information about a specific pokemin
function getPokemonInfo(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Make sure data comes throufg
      console.log(data.abilities);
      fetch(data.species.url)
        .then((res) => res.json())
        .then((speciesData) => {
          console.log(speciesData);
          // Write data to pokemon information container
          document.querySelector(".pokemon-info").innerHTML = `
            <img class="sprite" src="${data.sprites.front_default} ">
            <p>NAME: ${data.name}</p>
            <p>ABILITY: ${data.abilities[0].ability.name}</p>
            <p>${speciesData.flavor_text_entries[0].flavor_text}</p>
          `;
        });
    });
}

function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  //   Removing existing ripples from previous clicks
  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  //   Injecting the span inside the circle
  button.appendChild(circle);
}

const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}
