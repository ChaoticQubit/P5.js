function creatingYearlyDataPoints(){
    firstValue = true;
    for(let i = 0; i < currentRow; i++){
        let row = data.getRow(i);
        let totalMonths = months.length;
        if(i == currentRow - 1){
            totalMonths = currentMonth;
        }
        creatingMonthlyDataPoints(totalMonths, row);
    }
    animate();
}

function creatingMonthlyDataPoints(totalMonths, row){
    for(let i = 0; i < totalMonths; i++){
        let anomaly = row.get(months[i]);
        if(anomaly !== '***'){
            anomaly = parseFloat(anomaly);
            let prevR = map(previousAnomaly, 0, 1, zeroRadius, oneRadius);
            let r = map(anomaly, 0, 1, zeroRadius, oneRadius);
            let angle = map(i, 0, monthsLength, 0, TWO_PI) - PI/3;
            let { x: x1, y: y1 } = giveCartesianCoordinates(angle, r);
            let { x: x2, y: y2 } = giveCartesianCoordinates((angle - (PI / 6)), prevR);
            if(!firstValue){
                changeColor(anomaly);
                line(x1, y1, x2, y2);
            }
            firstValue = false;
            previousAnomaly = anomaly;
        }
    }
}

function giveCartesianCoordinates(angle, radius){
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    return { x, y };
}

function animate(){
    currentMonth = currentMonth + 1;
    if(currentMonth == monthsLength){
        currentMonth = 0;
        currentRow++;
        if (currentRow == data.getRowCount()){
            noLoop();
        }
    }
}

function changeColor(anomaly){
    let avg = (anomaly + previousAnomaly) * 0.5;
    let cold = color(0, 0, 255);
    let neutral = color(255);
    let warm = color(255, 0, 0);
    let lineColor = neutral;
    if(avg < 0){
        lineColor = lerpColor(neutral, cold, abs(avg));
    }else{
        lineColor = lerpColor(neutral, warm, abs(avg));
    }
    stroke(lineColor);
}