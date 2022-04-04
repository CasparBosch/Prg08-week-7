// Initialize the Image Classifier method with MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

const classifier = featureExtractor.classification();

//variables 
let flowerIndex = 0;
const img = new Image(400, 400)
const testImg = document.getElementById('output');
let folderNames = ['alfalfa']
let amount = [20]
let images = []

for (let index = 0; index < folderNames.length; index++) {
    for (let i = 1; i < amount[index]; i++) {
        images.push({
            file: `./plants/dataset/resized/${folderNames[index]}/${folderNames[index]}${i}.jpg`,
            label: `${folderNames[index]}`,
        });
    }
}

//variables accuracy
const fileButton = document.getElementById('file');
const button = document.getElementById('btn');
const save = document.getElementById('save');

//* event listeners
button.addEventListener('click', training);
save.addEventListener('click', saveModel);
fileButton.addEventListener('change', event => loadFile(event));

//functions
function modelLoaded() {
    console.log('Model loaded');
    loadFlower();
}

function loadFlower() {
    img.src = images[flowerIndex].file;
    console.log(images[flowerIndex].file);
    img.addEventListener('load', addFlower());
}

function addFlower() {
    console.log(`Dit is image ${flowerIndex} with label ${images[flowerIndex].label}`);
    classifier.addImage(img, images[flowerIndex].label, imageAddedFlower);
}

function imageAddedFlower() {
    flowerIndex++;
    if (flowerIndex < images.length) {
        loadFlower();
    } else {
        console.log('finished loading images');
    }
}

function training() {
    classifier.train(lossValue => {
        console.log('Loss is', lossValue);
        if (lossValue == null) {
            saveModel();
        }
    });
}

function loadFile(event) {
    testImg.src = URL.createObjectURL(event.target.files[0]);
}

function saveModel() {
    featureExtractor.save('Model');
    console.log("model is saved")
}