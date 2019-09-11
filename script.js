// XMLHTTPrequest Practice from MDN
// Studio Ghibli API url => https://ghibliapi.herokuapp.com/
// Endpoints => [ Films, People, Location, Species, Vehicles ] => {id}

window.addEventListener('DOMContentLoaded', () => {
    // Have reference to the root Div element
    const root = document.querySelector('#root');

    // Make the heading and give it title of 'Studio Ghibli'
    const heading = document.createElement('h1');
    heading.innerText = 'Studio Ghibli';

    // Make a dropdown list of all the endpoints in Studio Ghibli API (Select tag)
    const select = document.createElement('select');
    const optionArray = ['films', 'people', 'locations', 'species', 'vehicles'];

    // Make the dropdown list items with the values of the API endpoints (Option tag) 
    // & add it to the dropdown list
    optionArray.forEach(endPoint => {
        const option = document.createElement('option');
        option.value = endPoint;
        option.innerText = endPoint;
        select.appendChild(option);
    })
    // Create a search Button
    const searchButton = document.createElement('button');
    searchButton.innerText = 'Search';

    let selectedEndPoint = '';
    console.log(select.selectedIndex);
    console.log(selectedEndPoint);

    // After the dropdown the container that shows the query's results
    const displayQuery = document.createElement('div');

    // Add all elements to the root element
    root.appendChild(heading);
    root.appendChild(select);
    root.appendChild(searchButton);
    root.appendChild(displayQuery);


    // Callback function for the search button
    function search() {
        let data = [];
        // Creating a new XMLHttpRequest object
        const request = new XMLHttpRequest();

        // Get the current selected value from dropdown list
        selectedEndPoint = optionArray[select.selectedIndex];
        request.open('GET', `https://ghibliapi.herokuapp.com/${selectedEndPoint}`);

        // Runs function once the data loads
        request.addEventListener("load", listOfMovies);

        request.send();

        // On load listener for the API
        function listOfMovies(response) {
            // console.log(request);
            data = JSON.parse(this.response);
            console.log(data);

            // If there is already data remove all of it before displaying new data
            while(displayQuery.hasChildNodes()) {
                displayQuery.removeChild(displayQuery.firstChild);
                // console.dir(displayQuery);
            }

            // Returns a node with data formatted as a list item
            const listMadeFromData = listData(data, selectedEndPoint);

            displayQuery.appendChild(listMadeFromData);
            // displayQuery.hasChildNodes() ?
            // ul.parentNode.removeChild(listMadeFromData)
            // : displayQuery.appendChild(listMadeFromData);
            console.dir(displayQuery);
        }
    }

    // Creates a formatted list item for every array recieved from the api and its endpoint
    function listData(data, endPoint) {
        const ul = document.createElement('ul');

        data.forEach(ele => {
            const li = document.createElement('li');
            const cardItem = document.createElement('div');
            const heading = document.createElement('h1');
            const body = document.createElement('p');

            let headingText = '';
            let bodyText = '';

            if (endPoint === 'films') {
                headingText = ele.title;
                bodyText = ele.description;
            } else if (endPoint === 'people') {
                headingText = ele.name;
                bodyText = `${ele.gender === 'NA' ? '' : `Gender: ${ele.gender}` }
                    Eyes: ${ele.eye_color}
                    Hair: ${ele.hair_color}`;
            } else if (endPoint === 'locations') {
                headingText = ele.name;
                bodyText = `Climate: ${ele.climate}
                    Terrain: ${ele.terrain}`;
            } else if (endPoint === 'species') {
                headingText = ele.name;
                console.log(typeof ele.eye_colors);
                bodyText = `Eye color: ${ele.eye_colors}
                    Hair color: ${ele.hair_colors}`;
            } else if (endPoint === 'vehicles') {
                headingText = ele.name;
                bodyText = ele.description;
            }

            heading.innerText = headingText;
            body.innerText = bodyText;

            cardItem.appendChild(heading);
            cardItem.appendChild(body);
            // console.log(li);
            li.appendChild(cardItem);
            ul.appendChild(li);
        })
        return ul;
    }

    // Add the the seach button event listener
    searchButton.addEventListener('click', search);
})