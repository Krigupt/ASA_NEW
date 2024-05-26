// // // ml5.js: Pose Classification
// // // The Coding Train / Daniel Shiffman
// // // https://thecodingtrain.com/Courses/ml5-beginners-guide/7.2-pose-classification.html
// // // https://youtu.be/FYgYyq-xqAw

// // // All code: https://editor.p5js.org/codingtrain/sketches/JoZl-QRPK

// // // Separated into three sketches
// // // 1: Data Collection: https://editor.p5js.org/codingtrain/sketches/kTM0Gm-1q
// // // 2: Model Training: https://editor.p5js.org/codingtrain/sketches/-Ywq20rM9
// // // 3: Model Deployment: https://editor.p5js.org/codingtrain/sketches/c5sDNr8eM

// let video;
// let poseNet;
// let pose;
// let skeleton;

// let brain;
// let poseLabel = "Y";

// // Initialize poseCounts as an empty object
// let poseCounts = {};

// function startVideo() {
//     video.play();
// }

// function setup() {
//     createCanvas(2000, 1000);
//     video = createVideo(['baddi_mine.mp4'])
//     video.hide();
//     video.play();
//     poseNet = ml5.poseNet(video, modelLoaded);
//     poseNet.on('pose', gotPoses);
  
//     let options = {
//       inputs: 34,
//       outputs: 4,
//       task: 'classification',
//       debug: true
//     };
  
//     brain = ml5.neuralNetwork(options);
//     const modelInfo = {
//       model: 'model.json',
//       metadata: 'model_meta.json',
//       weights: 'model.weights.bin',
//     };
//     brain.load(modelInfo, brainLoaded);
// }

// function brainLoaded() {
//   console.log('pose classification ready!');
//   classifyPose();
// }

// function classifyPose() {
//   if (pose) {
//     let inputs = [];
//     for (let i = 0; i < pose.keypoints.length; i++) {
//       let x = pose.keypoints[i].position.x;
//       let y = pose.keypoints[i].position.y;
//       inputs.push(x);
//       inputs.push(y);
//     }
//     brain.classify(inputs, gotResult);
//   } else {
//     setTimeout(classifyPose, 100);
//   }
// }

// function gotResult(error, results) {
//   if (results[0].confidence > 0.75) {
//     let newPoseLabel = results[0].label.toUpperCase();
//     if (newPoseLabel !== poseLabel) {
//       poseLabel = newPoseLabel;

//       // Increment count for the detected pose
//       poseCounts[poseLabel] = (poseCounts[poseLabel] || 0) + 1;
//       // Print the count for each pose
//       console.log(poseCounts);
//     }
//   }
//   classifyPose();
// }

// function gotPoses(poses) {
//   if (poses.length > 0) {
//     pose = poses[0].pose;
//     skeleton = poses[0].skeleton;
//   }
// }

// function modelLoaded() {
//   console.log('poseNet ready');
// }

// function draw() {
//   push();
//   translate(video.width, 0);
//   scale(-1, 1);
//   image(video, 0, 0, video.width, video.height);

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
//   }
//   pop();

//   fill(255, 0, 255);
//   noStroke();
//   textSize(512);
//   textAlign(CENTER, CENTER);
//   text(poseLabel, width / 2, height / 2);
// }




let video1;
let video2;
let poseNet1;
let poseNet2;
let pose1;
let pose2;
let skeleton1;
let skeleton2;

let brain1;
let brain2;
let poseLabel1 = "Y";
let poseLabel2 = "Y";

// Initialize poseCounts as empty objects for each video
let poseCounts1 = {};
let poseCounts2 = {};
let finalResults2 = [];

const folderPath = 'C:/Users/aadig/Downloads/p5_first';


function startVideo() {
    video1.play();
    video2.play();
}


function setup() {
    createCanvas(2000, 1000);

    // Create first video element
    video1 = createVideo(['test_vid1.mp4']);
    video1.hide();
    video1.play();
    poseNet1 = ml5.poseNet(video1, modelLoaded1);
    poseNet1.on('pose', gotPoses1);

    // Create second video element
    video2 = createVideo(['test_vid3.mp4']);
    video2.hide();
    video2.play();
    poseNet2 = ml5.poseNet(video2, modelLoaded2);
    poseNet2.on('pose', gotPoses2);

    let options = {
        inputs: 34,
        outputs: 4,
        task: 'classification',
        debug: true
    };

    // Create separate brain instances for each video
    brain1 = ml5.neuralNetwork(options);
    brain2 = ml5.neuralNetwork(options);

    // Load models for each brain instance
    const modelInfo1 = {
        model: 'model.json',
        metadata: 'model_meta.json',
        weights: 'model.weights.bin',
    };
    brain1.load(modelInfo1, brainLoaded1);

    const modelInfo2 = {
        model: 'model.json',
        metadata: 'model_meta.json',
        weights: 'model.weights.bin',
    };
    brain2.load(modelInfo2, brainLoaded2);
    
    video2.onended(createTableinExcel);
}

function createTableinExcel(){
    console.log('video is over')
    console.log(finalResults2);

    createExcelFile(finalResults2, 'pose_counts.xlsx')
}

function brainLoaded1() {
    console.log('pose classification ready for video 1!');
    classifyPose1();
}

function brainLoaded2() {
    console.log('pose classification ready for video 2!');
    classifyPose2();
}

function classifyPose1() {
    if (pose1) {
        let inputs = [];
        for (let i = 0; i < pose1.keypoints.length; i++) {
            let x = pose1.keypoints[i].position.x;
            let y = pose1.keypoints[i].position.y;
            inputs.push(x);
            inputs.push(y);
        }
        brain1.classify(inputs, gotResult1);
    } else {
        setTimeout(classifyPose1, 100);
    }
}

function classifyPose2() {
    if (pose2) {
        let inputs = [];
        for (let i = 0; i < pose2.keypoints.length; i++) {
            let x = pose2.keypoints[i].position.x;
            let y = pose2.keypoints[i].position.y;
            inputs.push(x);
            inputs.push(y);
        }
        brain2.classify(inputs, gotResult2);
    } else {
        setTimeout(classifyPose2, 100);
    }
    
}

function gotResult1(error, results) {
    if (results[0].confidence > 0.75) {
        let newPoseLabel = results[0].label.toUpperCase();
        if (newPoseLabel !== poseLabel1) {
            poseLabel1 = newPoseLabel;
            poseCounts1[poseLabel1] = (poseCounts1[poseLabel1] || 0) + 1;
            console.log("Video 1: ", poseCounts1);
        }
    }
    classifyPose1();
}



function gotResult2(error, results) {
    if (!error && results && results.length > 0 && results[0].confidence > 0.75) {
        let newPoseLabel = results[0].label.toUpperCase();
        if (newPoseLabel !== poseLabel2) {
            poseLabel2 = newPoseLabel;
            poseCounts2[poseLabel2] = (poseCounts2[poseLabel2] || 0) + 1;
            let timestamp = video2.time();
            console.log("Video 2 - Time:", timestamp, "Counts:", poseCounts2,);


            finalResults2.push({ timestamp: timestamp, counts: { ...poseCounts2 } });

        }
    }
    classifyPose2();
}


function createExcelFile(data, filePath) {
    console.log('creating new file');

    const poseLabels = new Set();
    data.forEach((result) => {
        const { counts } = result;
        Object.keys(counts).forEach((pose) => {
            poseLabels.add(pose);
        });
    });

    const sortedPoseLabels = Array.from(poseLabels).sort();

    // Construct the data array for the Excel file
    const data_to_add = data.map((result) => {
        const { timestamp, counts } = result;
        const row = sortedPoseLabels.map((pose) => counts[pose] || 0); // Use 0 if the pose count is undefined
        row.unshift(timestamp); // Add timestamp as the first element
        return row;
    });

    // Add headers for columns
    const headers = ['Timestamp', ...sortedPoseLabels];
    data_to_add.unshift(headers);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data_to_add);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Final Results');

    // Write the workbook to a file
    XLSX.writeFile(workbook, filePath);

    console.log('Final results have been stored in an Excel file:', filePath);

}

function gotPoses1(poses) {
    if (poses.length > 0) {
        pose1 = poses[0].pose;
        skeleton1 = poses[0].skeleton;
    }
}

function gotPoses2(poses) {
    if (poses.length > 0) {
        pose2 = poses[0].pose;
        skeleton2 = poses[0].skeleton;
    }
}

function modelLoaded1() {
    console.log('poseNet ready for video 1');
}

function modelLoaded2() {
    console.log('poseNet ready for video 2');
}

function draw() {
    // Draw first video
    push();
    translate(video1.width, 0);
    scale(-1, 1);
    image(video1, 0, 0, video1.width, video1.height);
    if (pose1) {
        for (let i = 0; i < skeleton1.length; i++) {
            let a = skeleton1[i][0];
            let b = skeleton1[i][1];
            strokeWeight(2);
            stroke(0);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
        for (let i = 0; i < pose1.keypoints.length; i++) {
            let x = pose1.keypoints[i].position.x;
            let y = pose1.keypoints[i].position.y;
            fill(0);
            stroke(255);
            ellipse(x, y, 16, 16);
        }
    }
    pop();

    // Draw second video
    push();
    translate(0, video2.height);
    image(video2, 0, 0, video2.width, video2.height);
    if (pose2) {
        for (let i = 0; i < skeleton2.length; i++) {
            let a = skeleton2[i][0];
            let b = skeleton2[i][1];
            strokeWeight(2);
            stroke(0);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
        for (let i = 0; i < pose2.keypoints.length; i++) {
            let x = pose2.keypoints[i].position.x;
            let y = pose2.keypoints[i].position.y;
            fill(0);
            stroke(255);
            ellipse(x, y, 16, 16);
        }
    }
    pop();
}
