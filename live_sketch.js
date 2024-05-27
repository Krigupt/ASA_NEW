let video;
let poseNet;
let pose;
let skeleton;

let brain;
let poseLabel = "Y";

// Object to store counts for each pose
let poseCounts = {};
let finalResults = [];


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }

  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'live_video_model3/model.json',
    metadata: 'live_video_model3/model_meta.json',
    weights: 'live_video_model3/model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);

//   video.onended(createTableinExcel);

}

function mousePressed(){
    video.stop();
    createTableinExcel();
}
function createTableinExcel(){
    console.log('video is over')
    console.log(finalResults);

    createExcelFile(finalResults, 'pose_counts_live.xlsx')
}

function brainLoaded() {
  console.log('pose classification ready!');
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  if (results[0].confidence > 0.75) {
    let newPoseLabel = results[0].label.toUpperCase();
    if (newPoseLabel !== poseLabel) {
      poseLabel = newPoseLabel;

      // Increment count for the detected pose
      poseCounts[poseLabel] = (poseCounts[poseLabel] || 0) + 1;
      // Print the count for each pose
      console.log(poseCounts);

      finalResults.push({counts: { ...poseCounts } });

    }
  }
  classifyPose();
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
        const { counts } = result;
        const row = sortedPoseLabels.map((pose) => counts[pose] || 0); // Use 0 if the pose count is undefined
        //row.unshift(timestamp); // Add timestamp as the first element
        return row;
    });

    // Add headers for columns
    const headers = [ ...sortedPoseLabels];
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

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  // Draw video and skeleton
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);
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
  }
  pop();

  // Display pose label
  fill(255, 0, 255);
  noStroke();
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Current Pose: " + poseLabel, width / 2, height - 20);
}
