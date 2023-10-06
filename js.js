// get joke from api
let config = { headers: { "Accept": "application/json" } };
const appendJoke = async function () {
    const res = await axios.get("https://icanhazdadjoke.com/", config);
    const jokeDiv = document.querySelector("#joke");
    jokeDiv.textContent = res.data.joke;
}

const button = document.querySelector("button");
// algorithm to move gif across screen
function moveOnClick() {
    // disable button
    button.disabled = true;
    button.classList.remove("button-active")
    button.classList.add("button-disabled")

    // get image and display it
    const img = document.querySelector("#laugh");
    img.style.display = "block"

    // get image dimensions
    const imgWidth = img.getBoundingClientRect().width;
    const imgHeigth = img.getBoundingClientRect().height;
    let imgLeft = img.getBoundingClientRect().left;
    let imgTop = img.getBoundingClientRect().top;

    // get window dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // function to retireve random number from an array of numbers
    function getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // set available pixels to move image
    let moveArr = [-3, -2, -1, 1, 2, 3]

    // get inital moves
    let moveX = getRandom(moveArr);
    let moveY = getRandom(moveArr);


    let move = setInterval(function () {
        let makeMoveX = false;
        let makeMoveY = false;

        // x-axis
        // if move to the right
        if (moveX > 0) {
            // if there is space for a whole move -> ok
            if (imgLeft + moveX + imgWidth <= width) {
                imgLeft += moveX;
                makeMoveX = true;
            }
            // if there is not space for a whole move -> set to remaining space
            else if (imgLeft + imgWidth < width) {
                imgLeft = width - imgWidth
                makeMoveX = true;
            }
            // otherwise don't move
            else {
                makeMoveX = false;
            }
        }
        // if move to the left
        else {
            // if there is space for a whole move -> ok
            if (imgLeft + moveX >= 0) {
                imgLeft += moveX;
                makeMoveX = true;
            }
            // if there is not space for a whole move -> set to remaining space
            else if (imgLeft > 0) {
                imgLeft = 0
                makeMoveX = true;
            }
            // otherwise don't move
            else {
                makeMoveX = false;
            }
        }
        // y-axis
        if (moveY > 0) {
            if (imgTop + moveY + imgHeigth <= height) {
                imgTop += moveY;
                makeMoveY = true;
            }
            // if there is not space for a whole move -> set to remaining space
            else if (imgTop + imgHeigth < height) {
                imgTop = height - imgHeigth
                makeMoveY = true;
            }
            // otherwise don't move
            else {
                makeMoveY = false;
            }
        }
        else {
            // if there is space for a whole move -> ok
            if (imgTop + moveY >= 0) {
                imgTop += moveY;
                makeMoveY = true;
            }
            // if there is not space for a whole move -> set to remaining space
            else if (imgTop > 0) {
                imgTop = 0
                makeMoveY = true;
            }
            // otherwise don't move
            else {
                makeMoveY = false;
            }
        }
        // get new moveX
        if (makeMoveX === false) {
            moveX = getRandom(moveArr);
        }
        // get new moveY
        if (makeMoveY === false) {
            moveY = getRandom(moveArr);
        }
        // only move if both directions are okay
        else if (makeMoveX === true && makeMoveY === true) {
            img.style.left = imgLeft + "px";
            img.style.top = imgTop + "px";
        }
    }, 10)
}


// add event (api call)
button.addEventListener("click", appendJoke)

// add event (move image around)
button.addEventListener("click", moveOnClick)



