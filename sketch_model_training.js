let brain;

function setup() {
  console.log("hi1")
  createCanvas(640, 480);
  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
    
  }
  brain = ml5.neuralNetwork(options);
  brain.loadData('json1.json', dataReady);
  
}

function dataReady() {
  console.log("hi")
  brain.normalizeData();
  brain.train({epochs: 50}, finished); 
  console.log("hi")
}

function finished() {
  console.log('model trained');
  brain.save();
  console.log("hi")
}