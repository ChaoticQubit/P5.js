let data;
let months;

let zeroRadius = 100;
let oneRadius = 200;
let monthsRadius = 300;

function preload() {
  data = loadTable('Data/dSST.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowHeight, windowWidth);
  months = data.columns.slice(1, 13);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  createCircle(zeroRadius * 2, content="0°");
  createCircle(oneRadius * 2, content="1°");
  createCircle(monthsRadius * 2);
  let row = data.getRow(0);
  let year = row.get("Year");
  textAlign(CENTER, CENTER);
  text(year, 0, 0)
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
    for (let i = 0; i < months.length; i++){
      noStroke();
      fill(255);
      textAlign(CENTER);
      textSize(24);
      let angle = map(i, 0, months.length, 0, TWO_PI) - PI/3;
      push();
      let x = (monthsRadius + 15) * cos(angle);
      let y = (monthsRadius + 15) * sin(angle);
      translate(x, y);
      rotate(angle + PI/2);
      text(months[i], 0, 0);
      pop();
    }
  }
}

function createSpiral(){
  
} 