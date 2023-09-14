let data;
let months;
let monthsLength;

let zeroRadius = 100;
let oneRadius = 200;
let monthsRadius = 300;

let currentRow = 0;
let currentMonth = 0;

function preload() {
  data = loadTable('Data/dSST.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowHeight, windowWidth);
  months = data.columns.slice(1, 13);
  monthsLength = months.length;
}

function draw() {
  background(0);
  translate(width/2, height/2);
  textAlign(CENTER, CENTER);
  textSize(24);
  createCircle(zeroRadius * 2, content="0°");
  createCircle(oneRadius * 2, content="1°");
  createCircle(monthsRadius * 2);
  getYear();
  createSpiral();
}

function createCircle(size, content=""){
  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, size);
  cirleText(size, deg=content);
}

function cirleText(size, deg=""){
  console.log(deg);
  if (deg != ""){
    fill(255);
    noStroke();
    text(deg, (size / 2) + 20, 0)
  }else{
    for (let i = 0; i < monthsLength; i++){
      noStroke();
      fill(255);
      push();
      let { x, y, angle } = giveCartesianCoordinates(i, (monthsRadius + 15));
      translate(x, y);
      rotate(angle + PI/2);
      text(months[i], 0, 0);
      pop();
    }
  }
}

function getYear(){
  let year = data.getRow(currentRow).get('Year');
  text(year, 0, 0);
}

function createSpiral(){
  beginShape();
  noFill();
  stroke(255);
  creatingYearlyDataPoints();
  endShape();
}

function creatingYearlyDataPoints(){
  for(let i = 0; i < currentRow; i++){
    let row = data.getRow(i);

    let totalMonths = months.length;
    if(i == currentRow - 1){
      totalMonths = currentMonth;
    }

    creatingMonthlyDataPoints(totalMonths, row);
  }

  currentMonth = currentMonth + 1;
  if(currentMonth == monthsLength){
    currentMonth = 0;
    currentRow++;
    if (currentRow == data.getRowCount()){
      noLoop();
    }
  }
}

function creatingMonthlyDataPoints(totalMonths, row){
  for(let i = 0; i < totalMonths; i++){
    let anomaly = row.get(months[i]);
    if(anomaly !== '***'){
      let r = map(anomaly, 0, 1, zeroRadius, oneRadius);
      let { x, y } = giveCartesianCoordinates(i, r);
      vertex(x, y);
    }
  }
}

function giveCartesianCoordinates(value, radius){
  let angle = map(value, 0, monthsLength, 0, TWO_PI) - PI/3;
  let x = radius * cos(angle);
  let y = radius * sin(angle);
  return { x, y, angle };
}