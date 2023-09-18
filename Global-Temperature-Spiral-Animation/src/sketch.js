let data;
let months;
let monthsLength;

let negOneRadius = 75;
let zeroRadius = 150;
let oneRadius = 225;
let monthsRadius = 300;

let currentRow = 1;
let currentMonth = 1;

let previousAnomaly = 0;
let firstValue = true;

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
  translate(width, height);
  textAlign(CENTER, CENTER);
  textSize(20);
  createSpiral();
  createCircle("#EFCC00", negOneRadius * 2, content="-1° C");
  createCircle("#66ff00", zeroRadius * 2, content="0° C");
  createCircle("#EFCC00", oneRadius * 2, content="+1° C");
  createCircle("#EFCC00", monthsRadius * 2);
  getYear();
}