// Initialize the Image Classifier method with MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', loadModel);

const classifier = featureExtractor.classification();

//variables accuracy

const button = document.getElementById('btn');
const accuracy = document.getElementById('accuracy');
const testImg = document.getElementById('output');
const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event) => loadFile(event))
image.addEventListener('load', () => userImageUploaded())

// When the model is loaded
async function loadModel() {
  await featureExtractor.load('./model/model.json');
  console.log('model loaded');
}

function userImageUploaded() {
  console.log("The image visible in DOM")
  // Make a prediction with a selected image
  featureExtractor.classify(document.getElementById('output'), (err, results) => {
    console.log(results[0]);
    document.getElementById("first").innerHTML += results[0].label
    document.getElementById("accuracy").innerHTML += Math.round(results[0].confidence * 100) + "%"
  })
}

function loadFile(event) {
  console.log(event);
  image.src = URL.createObjectURL(event.target.files[0])
}