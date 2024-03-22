async function start() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        createBreedList(data.message);
    } catch (error) {
        console.error('Error fetching dog breeds:', error);
    }
}
start();

function createBreedList(breedList) {
    const breedSelect = document.getElementById("breed");
    breedSelect.innerHTML = `
        <select onchange="loadByBreed(this.value)">
            <option>Select a breed</option>
            ${Object.keys(breedList).map(function(breed) {
                return `<option>${breed}</option>`;
            }).join('')}
        </select>`;
}

async function loadByBreed(breed) {
    if (breed !== "Select a breed") {
        try {
            const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
            const data = await response.json();
            createSlideshow(data.message);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }
}

let lastDisplayedImage = ''; // Variable to store the last displayed image
function createSlideshow(images) {
    const slideshowContainer = document.getElementById("slideshow");
    slideshowContainer.innerHTML = ''; // Clear previous images

    // Select a random image from the array
    let randomImage;
    do {
        randomImage = images[Math.floor(Math.random() * images.length)];
    } while (randomImage === lastDisplayedImage); // Keep selecting until we get a different image

    // Create an img element for the selected image
    const img = document.createElement('img');
    img.src = randomImage;
    img.alt = 'Dog Breed Image'; // Set alt attribute for accessibility
    img.style.width = 'auto'; // Set width to 100% to fill the container
    img.style.height = 'auto'; // Set height to auto to maintain aspect ratio
    img.style.objectFit = 'cover'; // Set object fit to cover to fill the container
    img.style.objectPosition = 'center'; // Set object position to center to center the image in the container
    img.style.marginBottom = '10px'; // Add a margin bottom to separate the images from each other
    img.style.borderRadius = '5px'; // Add a border radius to make the images look rounded
    img.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)'; // Add a box shadow to make the images look more prominent
    img.className = 'col-md-4 col-lg-4 col-xl-4 col-sm-6  col-xs-6 images'; 
    slideshowContainer.appendChild(img); // Append the img element to the container

    lastDisplayedImage = randomImage; // Update the last displayed image
}
