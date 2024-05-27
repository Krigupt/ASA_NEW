// // let poseNet;
// // let brain;
// // let images = [];
// // let labels = [];
// // let currentIndex = 0;
// // let pose;
// // let skeleton;
// // let state = 'waiting';
// // let targetLabel;
// // let processingStarted = false;


// // var imageList = [];


// // function preload() {
// //   console.log('before preloD')
// //   // Load all images and labels
// //   loadImagesFromDataset('/Users/krishna/Desktop/ASA_NEW/newdata');
// //   console.log("FTER PREFLOAD")
// // }




// // function setup() {
// //   createCanvas(640, 480);
// //   poseNet = ml5.poseNet(modelLoaded);
// //   poseNet.on('pose', gotPoses);

// //   let options = {
// //     inputs: 34,
// //     outputs: 2,
// //     task: 'classification',
// //     debug: true
// //   }
// //   brain = ml5.neuralNetwork(options);
// // }

// // function modelLoaded() {
// //   console.log('poseNet ready');
// //   if (processingStarted) {
// //     nextImage();
// //   }
// // }

// // function gotPoses(poses) {
// //   if (poses.length > 0) {
// //     pose = poses[0].pose;
// //     skeleton = poses[0].skeleton;
// //     if (state == 'collecting') {
// //       let inputs = [];
// //       for (let i = 0; i < pose.keypoints.length; i++) {
// //         let x = pose.keypoints[i].position.x;
// //         let y = pose.keypoints[i].position.y;
// //         inputs.push(x);
// //         inputs.push(y);
// //       }
// //       let target = [targetLabel];
// //       brain.addData(inputs, target);
// //       nextImage();
// //     }
// //   }
// // }

// // function nextImage() {
// //   if (currentIndex < images.length) {
// //     targetLabel = labels[currentIndex];
// //     state = 'collecting';
// //     image(images[currentIndex], 0, 0, width, height);
// //     currentIndex++;
// //   } else {
// //     state = 'waiting';
// //     brain.normalizeData();
// //     brain.train({ epochs: 50 }, finished);
// //   }
// // }

// // function finished() {
// //   console.log('model trained');
// //   brain.save();
// // }

// // function draw() {
// //   background(220);
// //   if (pose) {
// //     for (let i = 0; i < skeleton.length; i++) {
// //       let a = skeleton[i][0];
// //       let b = skeleton[i][1];
// //       strokeWeight(2);
// //       stroke(0);
// //       line(a.position.x, a.position.y, b.position.x, b.position.y);
// //     }
// //     for (let i = 0; i < pose.keypoints.length; i++) {
// //       let x = pose.keypoints[i].position.x;
// //       let y = pose.keypoints[i].position.y;
// //       fill(0);
// //       stroke(255);
// //       ellipse(x, y, 16, 16);
// //     }
// //   }
// // }

// // // Load images from the dataset folder
// // function loadImagesFromDataset(folderPath) {
// //   console.log('is rhis working')
// //   let classes = [ 'overhead','smashes']; // Update this with your class names
// //   for (let i = 0; i < classes.length; i++) {
// //     let classPath = `${folderPath}/${classes[i]}`;
// //     for (let j = 0; j < 10; j++) { // Replace 10 with the number of images in each class
// //     //   let imgPath = `${classPath}/img${j + 1}.jpg`;
// //       let imgPath = classPath[i];
// //       let img = loadImage(imgPath, imgLoaded, imgError);
// //       images.push(img);
// //       labels.push(classes[i]);
// //     }
// //   }
// // }




// // function imgLoaded() {
// //   console.log('Image loaded');
// // }

// // function imgError(err) {
// //   console.error('Error loading image:', err);
// // }

// // // Start the processing when the button is clicked
// // function startProcessing() {
// //   if (imagesLoaded === totalImages) {
// //     processingStarted = true;
// //     if (poseNet) {
// //       nextImage();
// //     }
// //   } else {
// //     console.log('Images are still loading...');
// //   }

// // }

// let poseNet;
// let brain;
// let images = [];
// let labels = [];
// let currentIndex = 0;
// let pose;
// let skeleton;
// let state = 'waiting';
// let targetLabel;
// let processingStarted = false;
// let imagesLoaded = 0;
// let totalImages = 95;

// let imageList = [];

// // function preload() {
// //   console.log('Preloading images...');
// //   imageList[0] = loadImage('newdata/overhead/img1.jpg', imgLoaded, imgError);
// //   imageList[1] = loadImage('newdata/overhead/img2.jpg', imgLoaded, imgError);
// //   imageList[2] = loadImage('newdata/overhead/img3.jpg', imgLoaded, imgError);
// // }


// function preload() {
//   console.log('Preloading images...');
//   for (let i = 1; i <= totalImages; i++) {
//     let imgPath = `newdata/overhead/img${i}.jpg`;
//     imageList.push(loadImage(imgPath, imgLoaded, imgError));
//   }
// }



// // function preload() {
// //   console.log('Preloading images...');
// //   let imgPath = 'newdata/smashes/img79.jpg'; // Path to your single image
// //   imageList.push(loadImage(imgPath, imgLoaded, imgError));
// // }


// function setup() {
//   createCanvas(640, 480);
//   console.log('Setting up PoseNet...');
//   poseNet = ml5.poseNet(modelLoaded);
//   poseNet.on('pose', gotPoses);

//   let options = {
//     inputs: 34,
//     outputs: 2,
//     task: 'classification',
//     debug: true
//   }
//   brain = ml5.neuralNetwork(options);

//   // Wait until images are loaded
//   if (imagesLoaded === totalImages) {
//     startProcessing();
//   }
// }

// function modelLoaded() {
//   console.log('PoseNet model loaded');
// }

// // function gotPoses(poses) {
// //   console.log('gotPoses called');
// //   if (poses.length > 0) {
// //     pose = poses[0].pose;
// //     skeleton = poses[0].skeleton;
// //     if (state == 'collecting') {
// //       let inputs = [];
// //       for (let i = 0; i < pose.keypoints.length; i++) {
// //         let x = pose.keypoints[i].position.x;
// //         let y = pose.keypoints[i].position.y;
// //         inputs.push(x);
// //         inputs.push(y);
// //       }
// //       let target = [targetLabel];
// //       brain.addData(inputs, target);
// //       nextImage();
// //     }
// //   }
// // }

// // function nextImage() {
// //   if (currentIndex < imageList.length) {
// //     targetLabel = labels[currentIndex];
// //     state = 'collecting';
// //     image(imageList[currentIndex], 0, 0, width, height);
// //     console.log(`Displaying image ${currentIndex}`);
// //     currentIndex++;
// //   } else {
// //     state = 'waiting';
// //     brain.normalizeData();
// //     brain.train({ epochs: 100 }, finished);
// //   }
// // }




// function gotPoses(poses) {
//   console.log('gotPoses called');
//   if (poses.length > 0) {
//     pose = poses[0].pose;
//     skeleton = poses[0].skeleton;
//     if (state == 'collecting') {
//       let inputs = [];
//       for (let i = 0; i < pose.keypoints.length; i++) {
//         let x = pose.keypoints[i].position.x;
//         let y = pose.keypoints[i].position.y;
//         inputs.push(x);
//         inputs.push(y);
//       }
//       let target = [targetLabel];
//       brain.addData(inputs, target);
//       console.log('Pose data collected:', inputs);
//       state = 'waiting';  // Prevent collecting poses continuously
//     }
//   }
// }

// function nextImage() {
//   if (currentIndex < imageList.length) {
//     targetLabel = 'class1';  // You can set this to your desired label
//     state = 'collecting';
//     image(imageList[currentIndex], 0, 0, width, height);
//     console.log(`Displaying image ${currentIndex}`);
//     currentIndex++;
//   } else {
//     state = 'waiting';
//     brain.normalizeData();
//     brain.train({ epochs: 100 }, finished);
//   }
// }




// function finished() {
//   console.log('Model trained');
// }

// // function draw() {
// //   background(220);
// //   if (pose) {
// //     for (let i = 0; i < skeleton.length; i++) {
// //       let a = skeleton[i][0];
// //       let b = skeleton[i][1];
// //       strokeWeight(2);
// //       stroke(0);
// //       line(a.position.x, a.position.y, b.position.x, b.position.y);
// //     }
// //     for (let i = 0; i < pose.keypoints.length; i++) {
// //       let x = pose.keypoints[i].position.x;
// //       let y = pose.keypoints[i].position.y;
// //       fill(0);
// //       stroke(255);
// //       ellipse(x, y, 16, 16);
// //     }
// //   }
// // }


// function draw() {
//   background(220);
//   if (pose) {
//     for (let i = 0; i < skeleton.length; i++) {
//       let a = skeleton[i][0];
//       let b = skeleton[i][1];
//       strokeWeight(2);
//       stroke(0);
//       line(a.position.x, a.position.y, b.position.x, b.position.y);
//     }
//     for (let i = 0; i < pose.keypoints.length; i++) {
//       let x = pose.keypoints[i].position.x;
//       let y = pose.keypoints[i].position.y;
//       fill(0);
//       stroke(255);
//       ellipse(x, y, 16, 16);
//     }
//   } else {
//     // Keep displaying the current image to allow PoseNet to detect poses
//     if (currentIndex > 0 && currentIndex <= imageList.length) {
//       image(imageList[currentIndex - 1], 0, 0, width, height);
//     }
//   }
// }

// function keyPressed() {
//   if (key == 's') {
//     console.log('Saving model...');
//     brain.save();
//   }
// }



// function imgLoaded() {
//   console.log('Image loaded');
//   imagesLoaded++;
//   if (imagesLoaded === totalImages) {
//     console.log('All images loaded, starting processing');
//     startProcessing();
//   }
// }

// function imgError(err) {
//   console.error('Error loading image:', err);
// }

// function startProcessing() {
//   processingStarted = true;
//   if (poseNet) {
//     nextImage();
//   }
// }



let poseNet;
let brain;
let imageList = [];
let currentIndex = 0;
let pose;
let skeleton;
let state = 'waiting';
let targetLabel;
let processingStarted = false;
let imagesLoaded = 0;
let totalImages = 95; // Adjust this to the number of images you have

function preload() {
  console.log('Preloading images...');
  for (let i = 1; i <= totalImages; i++) {
    let imgPath = `newdata/overhead/img${i}.jpg`;
    imageList.push(loadImage(imgPath, imgLoaded, imgError));
  }
}

function setup() {
  createCanvas(640, 480);
  console.log('Setting up PoseNet...');
  poseNet = ml5.poseNet(modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 34,
    outputs: 2,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);

  if (imagesLoaded === totalImages) {
    startProcessing();
  }
}

function modelLoaded() {
  console.log('PoseNet model loaded');
  if (imagesLoaded === totalImages) {
    startProcessing();
  }
}

function gotPoses(poses) {
  console.log('gotPoses called');
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    if (state == 'collecting') {
      let inputs = [];
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        inputs.push(x);
        inputs.push(y);
      }
      let target = [targetLabel];
      brain.addData(inputs, target);
      console.log('Pose data collected:', inputs);
      state = 'waiting';  // Prevent collecting poses continuously
      nextImage();  // Move to the next image
    }
  }
}

function nextImage() {
  if (currentIndex < imageList.length) {
    targetLabel = 'class1';  // You can set this to your desired label
    state = 'collecting';
    image(imageList[currentIndex], 0, 0, width, height);
    console.log(`Displaying image ${currentIndex}`);
    currentIndex++;
  } else {
    state = 'waiting';
    brain.normalizeData();
    brain.train({ epochs: 100 }, finished);
  }
}

function finished() {
  console.log('Model trained');
}

function draw() {
  background(220);
  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  } else {
    if (currentIndex > 0 && currentIndex <= imageList.length) {
      image(imageList[currentIndex - 1], 0, 0, width, height);
    }
  }
}

function keyPressed() {
  if (key == 's') {
    console.log('Saving model...');
    brain.save();
  }
}

function imgLoaded() {
  console.log('Image loaded');
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    console.log('All images loaded, starting processing');
    startProcessing();
  }
}

function imgError(err) {
  console.error('Error loading image:', err);
}

function startProcessing() {
  processingStarted = true;
  if (poseNet) {
    nextImage();
  }
}
