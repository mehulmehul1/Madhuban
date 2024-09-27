function generateWeedLeaf() {
  // noFill();
  let points = [];
  const size = 180;
  const centerX = width / 2;
  const centerY = height / 2;

  // transform(0, 900);

  beginShape();
  for (let theta = 0; theta < TWO_PI; theta += 0.05) {
    // Use radians for theta
    let R =
      -size *
      (1 + (9.0 / 10.0) * cos(8 * theta)) *
      (1 + (1.0 / 10.0) * cos(24 * theta)) *
      (9.0 / 10.0 + (1.0 / 10.0) * cos(200 * theta)) *
      (1 + sin(theta));

    let x = centerX + R * cos(theta);
    let y = centerY + R * sin(theta) + 250;

    points.push(createVector(x, y));
    vertex(x, y);
  }
  endShape(CLOSE);

  // console.log("Points:", points);
  return points;
}

function generateHeartShape() {
  // noFill(); // No fill color
  let scale = 10;
  const size = 100 * scale;

  let points = [];
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    const r = size;
    const x = r * 16 * pow(sin(a), 3) + width / 2;
    const y =
      -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a)) +
      height / 2;
    points.push(createVector(x, y));
  }
  endShape();
  console.log("Points:", points);
  return points;
}

function generateDiamondShape() {
  // noFill(); // No fill color
  // size = 400 * scaleFactor;
  size = 200;

  let points = [];
  const centerX = width / 2;
  const centerY = height / 2;

  // Define the four vertices of the diamond
  points.push(createVector(centerX, centerY - size)); // Top vertex
  points.push(createVector(centerX + size, centerY)); // Right vertex
  points.push(createVector(centerX, centerY + size)); // Bottom vertex
  points.push(createVector(centerX - size, centerY)); // Left vertex

  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);

  console.log("Points:", points);
  return points;
}

function generateCirclePoints(centerX, centerY, radius, numPoints) {
  let points = [];
  for (let i = 0; i < numPoints; i++) {
    let theta = (TWO_PI / numPoints) * i;
    let x = centerX + radius * cos(theta);
    let y = centerY + radius * sin(theta);
    points.push({ x: x, y: y });
  }
  return points;
}
