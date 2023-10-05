function calculate() {
  var xValuesInput = document.getElementById("x-values");
  var yValuesInput = document.getElementById("y-values");

  var xValues = xValuesInput.value.split(",");
  var yValues = yValuesInput.value.split(",");

  if (xValues.length !== yValues.length) {
    alert("Los números de valores X y Y no coinciden.");
    return;
  }

  var sumX = 0;
  var sumY = 0;
  var sumXY = 0;
  var sumX2 = 0;

  for (var i = 0; i < xValues.length; i++) {
    sumX += parseFloat(xValues[i]);
    sumY += parseFloat(yValues[i]);
    sumXY += parseFloat(xValues[i]) * parseFloat(yValues[i]);
    sumX2 += parseFloat(xValues[i]) ** 2;
  }

  var slope =
    (xValues.length * sumXY - sumX * sumY) /
    (xValues.length * sumX2 - sumX ** 2);
  var intercept = (sumY - slope * sumX) / xValues.length;

  var equation = `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`;
  document.getElementById("equation").innerText = equation;

  var graphCanvas = document.getElementById("graph");
  var ctx = graphCanvas.getContext("2d");
  ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);

  var minX = Math.min(...xValues);
  var maxX = Math.max(...xValues);
  var minY = Math.min(...yValues);
  var maxY = Math.max(...yValues);

  var xPadding = 20;
  var yPadding = 20;
  var xScale = (graphCanvas.width - xPadding) / (maxX - minX);
  var yScale = (graphCanvas.height - yPadding) / (maxY - minY);

  ctx.beginPath();
  for (i = 0; i < xValues.length; i++) {
    var x = (xValues[i] - minX) * xScale + xPadding;
    var y = graphCanvas.height - ((yValues[i] - minY) * yScale + yPadding);
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "#00f";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xPadding, graphCanvas.height - (intercept * yScale + yPadding));
  ctx.lineTo(
    graphCanvas.width,
    graphCanvas.height - ((slope * maxX + intercept - minY) * yScale + yPadding)
  );
  ctx.strokeStyle = "#f00";
  ctx.lineWidth = 2;
  ctx.stroke();
}
