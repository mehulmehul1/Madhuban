let crossings = [];

class StringMaker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.points = [];
  }

  bezierCurveStringMaker(numPoints, complexity = 0.6, spread = 0.9) {
    let seed = createVector(this.x, this.y);
    
    for (let i = 0; i < numPoints; i++) {
      let controlPoints = [];
      
      for (let j = 0; j < 3; j++) {
        let controlPoint = p5.Vector.lerp(
          seed, 
          createVector(
            this.x + randomGaussian(0, width * complexity * spread),
            this.y + randomGaussian(0, height * complexity * spread)
          ),
          random(0.4, 0.5)
        );
        controlPoints.push(controlPoint);
      }
      
      let destination = createVector(
        this.x + randomGaussian(0, width * 0.3 * spread),
        this.y + randomGaussian(0, height * 0.3 * spread)
      );
      
      for (let t = 0; t <= 1; t += 0.05) {
        let x = bezierPoint(
          seed.x, 
          controlPoints[0].x, 
          controlPoints[1].x, 
          destination.x, 
          t
        );
        
        let y = bezierPoint(
          seed.y, 
          controlPoints[0].y, 
          controlPoints[1].y, 
          destination.y, 
          t
        );
        this.points.push({ x, y });
        seed = destination;
      }
    }
    
    return this.points;
  }

  getPoints() {
    return this.points;
  }

  draw() {
    brush.stroke("red");
    strokeWeight(2);
    // noFill();
    
    borders.push(new Border(this.getPoints()))
    console.log("chal rha h")

    beginShape();
    for (let pt of this.points) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);

    console.log(this.points)

    for (let border of borders) {
    border.draw();

  }

  
  }
}

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

function checkIntersection(border1, border2) {
  for (let vertex of border1.offsetPath1) {
    if (pointInPolygon(vertex, border2.offsetPath1)) {
      return true;
    }
  }
  for (let vertex of border2.offsetPath1) {
    if (pointInPolygon(vertex, border1.offsetPath1)) {
      return true;
    }
  }
  return false;
}


function lineIntersect(line1, line2) {
  let x1 = line1.p1.x, y1 = line1.p1.y;
  let x2 = line1.p2.x, y2 = line1.p2.y;
  let x3 = line2.p1.x, y3 = line2.p1.y;
  let x4 = line2.p2.x, y4 = line2.p2.y;

  let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  if (denominator === 0) {
      return false;
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
  }

  let x = x1 + ua * (x2 - x1);
  let y = y1 + ua * (y2 - y1);

  return { x, y };
}

function pointInPolygon(point, vertices) {
  let x = point.x;
  let y = point.y;
  let n = vertices.length;
  let inside = false;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    let xi = vertices[i].x;
    let yi = vertices[i].y;
    let xj = vertices[j].x;
    let yj = vertices[j].y;

    if (
      ((yi > y) !== (yj > y)) &&
      (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
    ) {
      inside = !inside;
    }
  }

  return inside;
}



function findOverlap(border1, border2) {
  let intersectionPoints = [];
  let containedPointsBorder1 = [];
  let containedPointsBorder2 = [];

  // Find all intersection points

  for (let i = 0; i < border1.length - 1; i++) {
      let line1 = { p1: border1[i], p2: border1[i + 1] };
      for (let j = 0; j < border2.length - 1; j++) {
          let line2 = { p1: border2[j], p2: border2[j + 1] };
          let intersection = lineIntersect(line1, line2);
          if (intersection) {
              intersectionPoints.push(intersection);
          }
      }
  }

  // Find contained points
  for (let point of border2.slice(0, -1)) {
      if (pointInPolygon(point, border1)) {
          containedPointsBorder1.push(point);
      }
  }

  for (let point of border1.slice(0, -1)) {
      if (pointInPolygon(point, border2)) {
          containedPointsBorder2.push(point);
      }
  }

  // Combine points
  let combinedPoints = [...intersectionPoints, ...containedPointsBorder1, ...containedPointsBorder2];
  return combinedPoints;
}


function getAngle(point, center) {
  let dx = point.x - center.x;
  let dy = point.y - center.y;
  return Math.atan2(dy, dx);
}

function sortPointsByAngle(points) {
  let center = { x: 0, y: 0 };
  points.forEach(point => {
      center.x += point.x;
      center.y += point.y;
  });
  center.x /= points.length;
  center.y /= points.length;

  return points.sort((a, b) => getAngle(a, center) - getAngle(b, center));
}

function createPolygon(points) {
  let polygon = [];
  for (let point of points) {
      polygon.push({ x: point.x, y: point.y });
  }
  return polygon;
}

function displayPolygon(polygon, color) {
  beginShape();
  fill(color);
  for (let point of polygon) {
      vertex(point.x, point.y);
  }
  endShape(CLOSE);
}

function shoelaceArea(vertices) {
  let area = 0;
  for (let i = 0; i < vertices.length; i++) {
    let j = (i + 1) % vertices.length;
    area += vertices[i].x * vertices[j].y - vertices[j].x * vertices[i].y;
  }
  return Math.abs(area) / 2;
}


// function polygonOffset(path, distance) {
//   const subjectPoly = ClipperLib.PolyType.Subject;
  
//   // Convert p5.Path to ClipperLib.Paths
//   const clipperPaths = path.map(point => 
//     new ClipperLib.IntPoint(point.x, point.y)
//   );

//   // Create subject polygon
//   const clipperSubject = new ClipperLib.Paths();
//   clipperSubject.pushPoly(clipperPaths, true);

//   // Create offset polygons
//   const clipperOffset = new ClipperLib.Paths();

//   // Perform offset operation
//   ClipperLib.Clipper.offset(clipperSubject, distance, subjectPoly, clipperOffset);

//   // Convert ClipperLib.Paths back to p5.Path
//   const offsetPath = [];
//   for (let i = 0; i < clipperOffset.length; i++) {
//     const poly = clipperOffset[i];
//     for (let j = 0; j < poly.length; j++) {
//       offsetPath.push(createVector(poly[j].X, poly[j].Y));
//     }
//   }

//   return offsetPath;
// }





function chaikinSmooth(points, iterations = 1) {
  let newPoints = [];
  
  for (let i = 0; i < points.length - 1; i++) {
    let p0 = points[i];
    let p1 = points[(i + 1) % points.length];
    
    // Calculate midpoints
    let q0 = createVector(p0.x * 3/4 + p1.x * 1/4, p0.y * 3/4 + p1.y * 1/4);
    let q1 = createVector(p0.x * 1/4 + p1.x * 3/4, p0.y * 1/4 + p1.y * 3/4);
    
    newPoints.push(q0, q1);
  }
  
  // Add the first point again to close the shape
  newPoints.push(newPoints[0]);
  
  if (iterations > 1) {
    return chaikinSmooth(newPoints, iterations - 1);
  } else {
    return newPoints;
  }
}



//--------------------------------------------------------------

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
