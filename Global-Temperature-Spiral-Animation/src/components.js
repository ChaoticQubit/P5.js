function getYear(){
    if (currentRow == data.getRowCount()){
        let lastYear = data.getRow(data.getRowCount() - 1).get('Year');
        text(lastYear, 0, 0)
    }else{
        let year = data.getRow(currentRow).get('Year');
        text(year, 0, 0);
    }
}

function createCircle(color, size, content=""){
    stroke(color);
    strokeWeight(4);
    noFill();
    circle(0, 0, size);
    cirleText(color, size, deg=content);
}

function cirleText(color, size, deg=""){
    fill(color);
    noStroke();
    if (deg != ""){
        text(deg, (size / 2) + 35, 0)
    }else{
        for (let i = 0; i < monthsLength; i++){
            push();
            let angle = map(i, 0, monthsLength, 0, TWO_PI) - PI/3;
            let { x, y } = giveCartesianCoordinates(angle, (monthsRadius + 15));
            translate(x, y);
            rotate(angle + PI/2);
            text(months[i], 0, 0);
            pop();
        }
    }
}

function createSpiral(){
    noFill();
    strokeWeight(3);
    creatingYearlyDataPoints();
}