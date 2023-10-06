

// get joke from api
let config = { headers: { "Accept": "application/json" } };
const appendJoke = async function () {
    const res = await axios.get("https://icanhazdadjoke.com/", config);
    const jokeDiv = document.querySelector("#joke");
    jokeDiv.textContent = res.data.joke;

}


function getDistance(x1, y1, x2, y2) {
    x = x2 - x1;
    y = y2 - y1;
    return Math.sqrt(x * x + y * y);
}

async function moveNew() {
    // get image
    const img = document.querySelector("#laugh");

    img.style.display = "block";

    // get image dimensions
    const imgWidth = document.querySelector("#laugh").getBoundingClientRect().width;
    const imgHeigth = document.querySelector("#laugh").getBoundingClientRect().height;

    // get window dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;


    let imgLeft = img.getBoundingClientRect().left;
    let imgTop = img.getBoundingClientRect().top;

    console.log(imgLeft, imgTop)

    function randomHeight() {
        return Math.floor(Math.random() * (height - imgHeigth) + 1);
    }
    function randomWidth() {
        return Math.floor(Math.random() * (width - imgWidth) + 1);
    }

    // function to retrieve random number from an array of numbers
    function getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }


    let newCoord = [];
    if (imgLeft == 0) {
        // img on the left side
        temp = []
        temp.push(width - imgWidth);
        temp.push(randomHeight());
        newCoord.push(temp)

        temp = []
        temp.push(randomWidth());
        temp.push(height - imgHeigth);
        newCoord.push(temp)

        temp = []
        temp.push(randomWidth());
        temp.push(0);
        newCoord.push(temp)
    }
    else if (imgLeft == width - imgWidth) {
        // img on the right side
        temp = []
        temp.push(0);
        temp.push(randomHeight());
        newCoord.push(temp)

        temp = []
        temp.push(randomWidth());
        temp.push(height - imgHeigth);
        newCoord.push(temp)

        temp = []
        temp.push(randomWidth());
        temp.push(0);
        newCoord.push(temp)
    }
    else if (imgTop == height - imgHeigth) {
        // img on the bottom
        temp = []
        temp.push(width - imgWidth);
        temp.push(randomHeight());
        newCoord.push(temp)

        temp = []
        temp.push(0);
        temp.push(randomHeight());
        newCoord.push(temp)

        temp = []
        temp.push(randomWidth());
        temp.push(0);
        newCoord.push(temp)

    }
    else if (imgTop == 0) {
        // img on the top
        temp = []
        temp.push(width - imgWidth);
        temp.push(randomHeight());
        newCoord.push(temp)

        temp = []
        temp.push(0);
        temp.push(randomHeight());
        newCoord.push(temp)

        temp = []
        temp.push(randomWidth());
        temp.push(height - imgHeigth);
        newCoord.push(temp)
    }

    newCoord = getRandom(newCoord)

    newX = newCoord[0]
    newY = newCoord[1]

    // get distance to current location and max distance
    let newDistance = getDistance(imgLeft, imgTop, newX, newY);
    const maxDistance = getDistance(0, 0, width - imgWidth, height - imgHeigth);

    newSpeed = 2000 / maxDistance * newDistance

    img.style.transition = `all ${newSpeed}ms linear`




    img.style.left = newX + "px";
    img.style.top = newY + "px";

    setTimeout(() => {
        moveNew()
    }, newSpeed + 30);

}

const button = document.querySelector("button");
// add event(api call)
button.addEventListener("click", appendJoke)

// add event (move image around)
button.addEventListener("click", moveNew)





