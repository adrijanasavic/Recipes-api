const getBtn = document.querySelector('.btn-get');
const api = "enter your api key";
getBtn.addEventListener('click', () => {
    fetch("https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tasty.p.rapidapi.com",
            "x-rapidapi-key": api
        }
    })
        .then(response => {
            return response.body;
        })
        .then(rb => {
            const reader = rb.getReader();

            return new ReadableStream({
                start(controller) {
                    // The following function handles each data chunk
                    function push() {
                        // "done" is a Boolean and value a "Uint8Array"
                        reader.read().then(({ done, value }) => {
                            // If there is no more data to read
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Get the data and send it to the browser via the controller
                            controller.enqueue(value);
                            // Check chunks by logging to the console
                            push();
                        })
                    }
                    push();
                }
            });
        })
        .then(stream => {
            // Respond with our stream
            return new Response(stream, { headers: { "Content-Type": "json" } }).json();
        })
        .then(result => {
            console.log(result);
            createRecipie(result);
        })

        .catch(err => {
            console.error(err);
        });

});

function createRecipie(result) {
    const recipies = result.results;
    // Do things with result
    console.log(recipies);

    // recipeCard.textContent = recipe;
    // document.body.appendChild(recipeCard);

    for (let i = 0; i < recipies.length; i++) {

        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';

        const title = document.createElement('h3');
        title.className = 'recipe-card__title';
        title.textContent = recipies[i].name;
        recipeCard.appendChild(title);

        const ingredients = document.createElement('dl')
        ingredients.className = 'recipe__ingredients';

        // for (let i = 0; i < recipies.sections.length; i++) {
        // }
        document.body.appendChild(recipeCard);
    }

}

const clapButton = document.getElementById('clap-button');

clapButton.addEventListener('click', switchBackground);

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const color = `rgb(${red}, ${green}, ${blue})`
    return color;
}

function switchBackground() {
    const backgroundColor = randomColor();
    document.body.style.backgroundColor = backgroundColor;
}



