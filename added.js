let crossings = [];

class KnotMaker {
  constructor(crossings = 3, size = 150, resolution = 0.01) {
    this.crossings = crossings;
    this.size = size;
    this.resolution = resolution;
    this.knotPoints = [];
  }

  generateKnotPoints() {
    angleMode(RADIANS);
    let x = (t) => (sin(t) + 2 * sin((this.crossings - 1) * t)) * this.size;
    let y = (t) => (cos(t) - 2 * cos((this.crossings - 1) * t)) * this.size;
    let z = (t) => -sin(this.crossings * t);

    this.knotPoints = [];
    for (let t = 0; t <= TWO_PI; t += this.resolution) {
      this.knotPoints.push({
        x: x(t),
        y: y(t),
        z: z(t),
      });
    }
  }

  getKnotPoints() {
    return this.knotPoints;
  }

  setCrossings(crossings) {
    this.crossings = crossings;
    this.generateKnotPoints();
  }
}

function findCrossings(pathPoints) {
  crossings = [];
  let numPoints = pathPoints.length;

  for (let i = 0; i < numPoints - 1; i++) {
    let p1 = pathPoints[i];
    let p2 = pathPoints[i + 1];

    for (let j = i + 2; j < numPoints - 1; j++) {
      // Avoid adjacent segments
      if (Math.abs(i - j) <= 1) continue;

      let p3 = pathPoints[j];
      let p4 = pathPoints[j + 1];

      if (segmentsIntersect(p1, p2, p3, p4)) {
        // Determine which segment is over based on z-values at the intersection point
        // For simplicity, use the average z-value of each segment
        let z1 = (p1.z + p2.z) / 2;
        let z2 = (p3.z + p4.z) / 2;

        let overSegment, underSegment;
        if (z1 > z2) {
          overSegment = { start: p1, end: p2 };
          underSegment = { start: p3, end: p4 };
        } else {
          overSegment = { start: p3, end: p4 };
          underSegment = { start: p1, end: p2 };
        }

        crossings.push({
          point1Index: i,
          point2Index: j,
          overSegment,
          underSegment,
          intersectionPoint: getIntersectionPoint(p1, p2, p3, p4),
        });
      }
    }
  }
}

function segmentsIntersect(p1, p2, p3, p4) {
  let denominator =
    (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
  if (denominator === 0) return false; // Lines are parallel

  let ua =
    ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) /
    denominator;
  let ub =
    ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) /
    denominator;

  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}

function getIntersectionPoint(p1, p2, p3, p4) {
  let denominator =
    (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
  if (denominator === 0) return null; // Lines are parallel

  let ua =
    ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) /
    denominator;

  let x = p1.x + ua * (p2.x - p1.x);
  let y = p1.y + ua * (p2.y - p1.y);

  return { x, y };
}

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

function segmentsIntersect(p1, p2, p3, p4) {
  let denominator =
    (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
  if (denominator === 0) return false; // Lines are parallel

  let ua =
    ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) /
    denominator;
  let ub =
    ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) /
    denominator;

  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}
