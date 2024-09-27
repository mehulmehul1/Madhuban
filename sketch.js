//////////////////////////////////////////////////
// Object for creation and real-time resize of canvas
// Good function to create canvas and resize functions. I use this in all examples.
const C = {
  loaded: false,
  prop() {
    return this.height / this.width;
  },
  isLandscape() {
    return window.innerHeight <= window.innerWidth * this.prop();
  },
  resize() {
    if (this.isLandscape()) {
      console.log("yes");
      document.getElementById(this.css).style.height = "100%";
      document.getElementById(this.css).style.removeProperty("width");
    } else {
      document.getElementById(this.css).style.removeProperty("height");
      document.getElementById(this.css).style.width = "100%";
    }
  },
  setSize(w, h, p, css) {
    (this.width = w), (this.height = h), (this.pD = 1), (this.css = css);
  },
  createCanvas() {
    (this.main = createCanvas(this.width, this.height, WEBGL)),
      pixelDensity(this.pD),
      this.main.id(this.css),
      this.resize();
  },
};

function windowResized() {
  C.resize();
}

function initializeSketch() {
  setup();
}

let border1;
let border2;

const gridSize = 5;
const cellSize = 200;
const borderTypes = ["triangle", "circle", "diamond", "square", "noshape"];
const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];

let straightLine = [
  { x: 50, y: 400 },
  { x: 1500, y: 400 },
];
// let pathPoints = [
//   { x: 50, y: 50 },
//   { x: 500, y: 100 },
//   { x: 600, y: 50 },
//   { x: 1200, y: 100 },
//   { x: 4000, y: 300 },
// ];

let pathPoints = [
  { x: 50, y: 100 },
  { x: 50, y: 50 },
  { x: 500, y: 100 },
  { x: 600, y: 50 },
  { x: 800, y: 50 },
  { x: 800, y: 200 },
  { x: 600, y: 300 },
  { x: 400, y: 200 },
  { x: 50, y: 100 },
];

// let pathPoi = generateWeedLeaf();
// let pathPointsArray = pathPoi.map((pt) => ({ x: pt.x, y: pt.y }));

function setup() {
  C.setSize(windowWidth, windowHeight, 1, "mainCanvas");
  C.createCanvas();
  angleMode(DEGREES);
  // background("#fffceb");

  brush.load();
  brush.set("rotring", "#002185", 1);

  // brush.field("truncated");

  // border2 = new Border(straightLine);
  border1 = new Border(pathPoints);
  // border1 = new Border(circlePoints);

  // border1 = new Border(50, 50, 1500, 250);

  border1.setBeadStyle("square", 20, 10);
  // border1.setBeadStyle("triangle");
  // border1.setShapeStyle(random(borderTypes), 20);

  border1.setBorderStyle(color(0), 2, 60);

  // Generate the weed leaf points

  // Convert pathPoints to the required format

  // generateWeedLeaf();
  // let pathPoi = generateWeedLeaf();
  // let pathPointsArray = pathPoi.map((pt) => ({ x: pt.x, y: pt.y }));

  // console.log(generateWeedLeaf());

  // border2 = new Border(pathPointsArray);
  // border2.setShapeStyle("circle", 5);
  // border2.setBorderStyle(color(0), 2, 10);

  // border1.draw();
}

function draw() {
  translate(-width / 2, -height / 2);
  // brush.refreshField(frameCount / 10);
  stroke(0);
  // noFill();

  push();
  // for (let border of borders) {
  //   border.draw();
  // }

  border1.draw();
  // border2.draw(s);

  pop();
}

class Border {
  // constructor(startX, startY, endX, endY) {
  constructor(pathPoints) {
    // console.log("Is pathPoints an array?", Array.isArray(pathPoints));
    // this.path = pathPoints.map((pt) => createVector(pt.x, pt.y));
    this.path = [];
    if (Array.isArray(pathPoints)) {
      pathPoints.forEach((pt) => {
        this.path.push(createVector(pt.x, pt.y));
      });
    } else if (typeof pathPoints === "object" && pathPoints !== null) {
      Object.keys(pathPoints).forEach((key) => {
        let pt = pathPoints[key];
        this.path.push(createVector(pt.x, pt.y));
      });
    } else {
      throw new Error("Invalid format for pathPoints");
    }

    // console.log(" this.path:", this.path);
    this.borderColor = color(0);
    this.borderWeight = 5;
    this.borderWidth = 40;
    this.beadSize = this.borderWidth * 1.1;
    this.shapeSpacing = 50;
    this.shapeType = "circle";
    this.spacing = 10;
    this.beadType = "circle";
    this.offsetPath1 = [];
    this.offsetPath2 = [];

    this.beads = [];
    this.shapes = []; // Array to store shape objects
  }

  setBorderStyle(c, weight, width) {
    this.borderColor = c;
    this.borderWeight = weight;
    this.borderWidth = width;
  }

  setBeadStyle(type, size, spacing) {
    this.beadType = type;
    this.beadSize = size;
    this.spacing = spacing;
  }

  // setHatchPreset(preset) {
  //   this.hatchPreset = preset;
  //   switch (preset) {
  //     case "diagonal":
  //       this.hatchAngle = 45;
  //       break;
  //     case "cross":
  //       this.hatchAngle = 0;
  //       break;
  //     case "horizontal":
  //       this.hatchAngle = 0;
  //       break;
  //     case "vertical":
  //       this.hatchAngle = 90;
  //       break;
  //   }
  // }

  draw() {
    brush.stroke(2);
    this.calculateBeadPositions();
    this.calculateOffsetPaths();
    this.drawBorders();

    brush.hatch(3, 90, { rand: 0.1, continuous: false, gradient: 0.3 });
    this.drawBeads();

    // this.drawShapes();
    noLoop(); // Remove if you want continuous drawing
  }
  calculateBeadPositions() {
    // Calculate total path length and segment lengths
    let segmentLengths = [];
    let cumulativeLengths = [0]; // Cumulative lengths along the path
    let totalLength = 0;

    for (let i = 0; i < this.path.length - 1; i++) {
      let len = p5.Vector.dist(this.path[i], this.path[i + 1]);
      segmentLengths.push(len);
      totalLength += len;
      cumulativeLengths.push(totalLength);
    }

    // Handle closed path
    let isClosed = this.isClosedPath();
    if (isClosed) {
      let len = p5.Vector.dist(this.path[this.path.length - 1], this.path[0]);
      segmentLengths.push(len);
      totalLength += len;
      cumulativeLengths.push(totalLength);
    }

    // Calculate the maximum number of beads that can fit
    let beadSpace = this.beadSize;
    let minSpacing = this.spacing;
    let numBeads = Math.floor(
      (totalLength + minSpacing) / (beadSpace + minSpacing)
    );

    // Recalculate spacing to fit the beads evenly
    let actualSpacing = (totalLength - numBeads * beadSpace) / (numBeads + 1);

    // Place beads along the path
    this.beads = [];
    for (let i = 0; i < numBeads; i++) {
      let targetDistance =
        actualSpacing * (i + 1) + beadSpace * i + beadSpace / 2;

      // Find the segment where this distance falls
      let segmentIndex = this.findSegmentIndex(
        cumulativeLengths,
        targetDistance
      );

      let segmentStart = this.path[segmentIndex];
      let segmentEnd = this.path[(segmentIndex + 1) % this.path.length];

      let segmentLength = segmentLengths[segmentIndex];
      let distanceInSegment = targetDistance - cumulativeLengths[segmentIndex];
      let t = distanceInSegment / segmentLength;

      // Interpolate bead position
      let beadPosition = p5.Vector.lerp(segmentStart, segmentEnd, t);

      // console.log(this.beads);
      // console.log(beadPosition);

      // Calculate angle of the segment for bead orientation
      let segmentAngle = atan2(
        segmentEnd.y - segmentStart.y,
        segmentEnd.x - segmentStart.x
      );
      segmentAngle = degrees(segmentAngle);

      this.beads.push({
        position: beadPosition,
        angle: segmentAngle,
      });
      // console.log(this.beads);
      // console.log("Is pathPoints an array?", Array.isArray(this.beads));
    }
  }

  findSegmentIndex(cumulativeLengths, targetDistance) {
    for (let i = 0; i < cumulativeLengths.length - 1; i++) {
      if (
        targetDistance >= cumulativeLengths[i] &&
        targetDistance <= cumulativeLengths[i + 1]
      ) {
        return i;
      }
    }
    // If not found, return last segment (for closed paths)
    return cumulativeLengths.length - 2;
  }

  calculateOffsetPaths() {
    this.offsetPath1 = [];
    this.offsetPath2 = [];
    let numPoints = this.path.length;

    for (let i = 0; i < numPoints; i++) {
      let prevIndex = (i - 1 + numPoints) % numPoints;
      let nextIndex = (i + 1) % numPoints;

      let prev = this.path[prevIndex];
      let current = this.path[i];
      let next = this.path[nextIndex];

      // Compute tangent vector as the average of the incoming and outgoing directions
      let dir1 = p5.Vector.sub(current, prev).normalize();
      let dir2 = p5.Vector.sub(next, current).normalize();
      let tangent = p5.Vector.add(dir1, dir2).normalize();

      // If the path is open and at the ends, use the single direction
      if (!this.isClosedPath() && (i === 0 || i === numPoints - 1)) {
        tangent = i === 0 ? dir2 : dir1;
      }

      // Normal vector
      let normal = createVector(-tangent.y, tangent.x);

      // Offset by half the bead size
      let offset = p5.Vector.mult(normal, this.borderWidth / 2);

      this.offsetPath1.push(p5.Vector.add(current, offset));
      this.offsetPath2.push(p5.Vector.sub(current, offset));
    }
  }
  // calculateOffsetPaths() {
  //   this.offsetPath1 = [];
  //   this.offsetPath2 = [];
  //   let numPoints = this.path.length;

  //   for (let i = 0; i < this.path.length - 1; i++) {
  //     let current = this.path[i];
  //     let next = this.path[i + 1];

  //     // Tangent vector
  //     let tangent = p5.Vector.sub(next, current).normalize();

  //     // Normal vector (perpendicular to tangent)
  //     let normal = createVector(-tangent.y, tangent.x);

  //     // Scale normal by borderWidth / 2
  //     let offset = p5.Vector.mult(normal, this.borderWidth / 2);

  //     // Offset current and next points
  //     let offsetCurrent1 = p5.Vector.add(current, offset);
  //     let offsetNext1 = p5.Vector.add(next, offset);
  //     let offsetCurrent2 = p5.Vector.sub(current, offset);
  //     let offsetNext2 = p5.Vector.sub(next, offset);

  //     // Add to offset paths
  //     this.offsetPath1.push(offsetCurrent1);
  //     this.offsetPath2.push(offsetCurrent2);

  //     // Handle the last point
  //     if (i === this.path.length - 2) {
  //       this.offsetPath1.push(offsetNext1);
  //       this.offsetPath2.push(offsetNext2);
  //     }
  //   }
  // }

  drawBorders() {
    noFill();
    brush.stroke(this.borderColor);
    brush.strokeWeight(this.borderWeight);
    brush.noHatch();

    // Draw first offset path
    brush.beginShape();
    for (let pt of this.offsetPath1) {
      brush.vertex(pt.x, pt.y);
    }
    if (this.isClosedPath()) {
      brush.endShape(CLOSE);
    } else {
      brush.endShape();
    }

    // Draw second offset path
    brush.beginShape();
    for (let pt of this.offsetPath2) {
      brush.vertex(pt.x, pt.y);
    }
    if (this.isClosedPath()) {
      brush.endShape(CLOSE);
    } else {
      brush.endShape();
    }
  }

  drawBeads() {
    for (let bead of this.beads) {
      push();
      // translate(bead.position.x, bead.position.y);
      // console.log(bead.position.x, bead.position.y);
      rotate(bead.angle);
      switch (this.beadType) {
        case "circle":
          console.log(this.beadSize, bead.position.x, bead.position.y);
          drawCircle(bead.position.x, bead.position.y, this.beadSize);
          // brush.circle(bead.position.x, bead.position.y, this.beadSize);
          break;
        case "square":
          rectMode(CENTER);
          console.log("square");

          drawSquare(
            bead.position.x,
            bead.position.y,
            this.beadSize,
            bead.angle
          );
          break;
        case "triangle":
          // this.drawTringle(this.beadSize);

          drawTriangle(
            bead.position.x,
            bead.position.y,
            this.beadSize,
            bead.angle
          );
          break;
        // Add more shapes as needed
      }
      pop();
    }
  }

  // drawShapes() {
  //   // Draw each shape stored in the shapes array
  //   for (let shape of this.shapes) {
  //     // push();
  //     console.log("Drawing shape at:", shape.x, shape.y);
  //     // translate(shape.x, shape.y);
  //     // rotate(shape.angle);
  //     let angleDeg = shape.angle;
  //     // Calculate the offset to center the shape between the two border lines
  //     let offsetDistance = (this.borderWidth - shape.size) / 2;

  //     // Compute the angle in radians
  //     let offsetX = -offsetDistance * sin(angleDeg);
  //     let offsetY = offsetDistance * cos(angleDeg);

  //     let finalX = shape.x + offsetX;
  //     let finalY = shape.y + offsetY;

  //     switch (shape.type) {
  //       case "triangle":
  //         // The triangle vertices in local coordinates
  //         drawTriangle(shape, finalX, finalY);
  //         break;

  //       case "circle":
  //         // Draw circle at finalX, finalY
  //         drawCircle(shape, finalX, finalY);
  //         // brush.circle(finalX, finalY, shape.size);
  //         break;

  //       case "square":
  //         // The square vertices in local coordinates
  //         drawSquare(shape, finalX, finalY);
  //         break;

  //       // Add other shapes as needed
  //       default:
  //         break;
  //     }

  //     // brush.pop();
  //     // pop();
  //   }
  // }

  updatePoints(startX, startY, endX, endY) {
    this.startPoint = createVector(startX, startY);
    this.endPoint = createVector(endX, endY);
  }

  getLength() {
    return dist(
      this.startPoint.x,
      this.startPoint.y,
      this.endPoint.x,
      this.endPoint.y
    );
  }
  isClosedPath() {
    // Determine if the path is closed
    return p5.Vector.dist(this.path[0], this.path[this.path.length - 1]) < 1e-6;
  }

  rotate(angle) {
    let center = p5.Vector.add(this.startPoint, this.endPoint).div(2);
    this.startPoint.sub(center).rotate(angle).add(center);
    this.endPoint.sub(center).rotate(angle).add(center);
  }

  scale(factor) {
    let center = p5.Vector.add(this.startPoint, this.endPoint).div(2);
    this.startPoint.sub(center).mult(factor).add(center);
    this.endPoint.sub(center).mult(factor).add(center);
  }

  mirror(axis) {
    if (axis === "x") {
      this.startPoint.y = -this.startPoint.y;
      this.endPoint.y = -this.endPoint.y;
    } else if (axis === "y") {
      this.startPoint.x = -this.startPoint.x;
      this.endPoint.x = -this.endPoint.x;
    }
  }
}

function drawTriangle(finalX, finalY, beadSize, angle) {
  // The triangle vertices in local coordinates
  let triVertices = [
    createVector(-beadSize / 2, beadSize / 2),
    createVector(0, -beadSize / 2),
    createVector(beadSize / 2, beadSize / 2),
  ];
  let angleRad = angle;

  // Rotate and translate the vertices to global coordinates
  let triGlobalVertices = triVertices.map((v) => {
    // Apply rotation
    let x = v.x * cos(angleRad) - v.y * sin(angleRad);
    let y = v.x * sin(angleRad) + v.y * cos(angleRad);

    // Translate to final position
    x += finalX;
    y += finalY;

    return { x, y };
  });

  // Draw the triangle using `brush`
  brush.beginShape();
  for (let gv of triGlobalVertices) {
    brush.vertex(gv.x, gv.y);
  }
  brush.endShape(CLOSE);
}

function drawCircle(finalX, finalY, beadSize) {
  // brush.set("rotring", 0, 1);
  brush.circle(finalX, finalY, beadSize / 2);
}
// function drawCircle(shape, finalX, finalY) {
//   brush.circle(finalX, finalY, shape.size / 2);
// }

function drawSquare(finalX, finalY, beadSize, angle) {
  // The square vertices in local coordinates
  let angleRad = angle;

  let halfSize = beadSize / 2;
  let sqVertices = [
    createVector(-halfSize, -halfSize),
    createVector(halfSize, -halfSize),
    createVector(halfSize, halfSize),
    createVector(-halfSize, halfSize),
  ];

  // Rotate and translate the vertices to global coordinates
  let sqGlobalVertices = sqVertices.map((v) => {
    // Apply rotation
    let x = v.x * cos(angleRad) - v.y * sin(angleRad);
    let y = v.x * sin(angleRad) + v.y * cos(angleRad);

    // Translate to final position
    x += finalX;
    y += finalY;

    return { x, y };
  });

  // Draw the square using `brush`
  brush.beginShape();
  for (let gv of sqGlobalVertices) {
    brush.vertex(gv.x, gv.y);
  }
  brush.endShape(CLOSE);
}
