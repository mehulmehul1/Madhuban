//////////////////////////////////////////////////
// Object for creation and real-time resize of canvas
// Good function to create canvas and resize functions. I use this in all examples.
// import * as clipperLib from "js-angusj-clipper";
// import { Clipper2ZFactoryFunction, MainModule } from 'libraries/clipper2-wasm/dist/clipper2z';
// import * as _Clipper2ZFactory from '../libraries/Clipper2-WASM-main/clipper2-wasm/dist/clipper2z';



// import * as clipperLib from "/node_modules/js-angusj-clipper/web/index.js";



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
function saveImage() {
  saveCanvas("myImage", "png");
}

// let clipper;


// async function initClipper() {
//   const clipper = await clipperLib.loadNativeClipperLibInstanceAsync(
//     clipperLib.NativeClipperLibRequestedFormat.WasmWithAsmJsFallback
//   );
//   return clipper;
// }

// let clipper;


let knotMaker;
let border1;
let border2;
let border3;
let strborder;

let strings = [];
let borders = [];

const gridSize = 5;
const cellSize = 200;
const borderTypes = ["triangle", "circle", "square"];
const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];

let straightLine = [
  { x: 50, y: 50 },
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
  // Initialize KnotMaker
  knotMaker = new KnotMaker(int(random(2, 7)), 120, 0.01);
  angleMode(RADIANS);
  knotMaker.generateKnotPoints();
  angleMode(DEGREES);

  // Get the knot points
  let knotPoints = knotMaker.getKnotPoints();
  findCrossings(knotPoints);
  

  // for (let i = 0; i < 10; i++) {
  //   let x = random(100,windowWidth-100);
  //   let y = random(100,windowHeight-100);
  //   strings.push(new StringMaker(x, y));
  // }
  
  let stringMaker = new StringMaker(100, 100);
  let pathPoints = stringMaker.bezierCurveStringMaker(12);

  strborder = new Border(pathPoints);

  // border2 = new Border(knotPoints);
  border1 = new Border(pathPoints);
  border3 = new Border(straightLine);
  // border1 = new Border(knotPoints);


  // border1.calculateOffsetPaths();
  // border3.calculateArea();
  // border2.calculateArea();

  // border1 = new Border(50, 50, 1500, 250);
  border1.setBorderStyle(color(1,52,169),"#000", 2, 80);

  // border2.setBorderStyle(color(0),"#fff", 2, 80);

  border1.setBeadStyle("triangle", 40, 10);
  strborder.setBeadStyle(random(borderTypes), 40, 20);
  // border2.setBeadStyle(random(borderTypes), 40, 20);

  // strborder.setBorderStyle("red","#fff", 2, 60);


  // console.log(knotPoints);

  // Assuming border1 and border2 are arrays of points
  // if (checkIntersection(border3, border2)) {
  //   console.log("Borders intersect");
  // } else {
  //   console.log("Borders do not intersect");
  // }

  // clipper = await initClipper();

  // Listen for a key press event
  document.addEventListener("keydown", function (event) {
    // Check if the pressed key is the 'e' key (you can change this to any key you want)
    if (event.key === "s") {
      // Call the function to export the canvas as a PNG image
      saveImage();
      // exportCanvasAsPNG(canvas);
    }
  });
  noLoop();
}

function draw() {
  // translate(-width / 2, -height / 2);
  // brush.refreshField(frameCount / 10);
  stroke(0);
  // noFill();

  push();
  // for (let border of borders) {
  //   border.draw();
  // }

  // stringMaker.draw();

  // strborder.draw();

  border1.draw();

  // border1.draw();
  // border3.draw();



  pop();
}

class Border {
  // constructor(startX, startY, endX, endY) {
  constructor(pathPoints) {
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
    this.fillColor = color("#fff");
    this.borderWeight = 5;
    this.borderWidth = 40;
    this.beadSize = this.borderWidth * 1.1;
    this.shapeSpacing = 50;
    this.shapeType = "circle";
    this.spacing = 10;
    this.beadType = "null";
    this.offsetPath1 = [];
    this.offsetPath2 = [];

    // this.smoothedPoints = chaikinSmooth(this.path);

    this.beads = [];
    this.shapes = []; // Array to store shape objects
  }

  setBorderStyle(c,f, weight, width) {
    this.borderColor = c;
    this.fillColor = f;

    this.borderWeight = weight;
    this.borderWidth = width;
  }

  // setBeadStyle(type) {
  //   this.beadType = type;
  //   // this.beadSize = size;
  //   // this.spacing = spacing;
  // }
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
    // background(6);
    // fill(this.fillColor);
    brush.stroke(2);
    noFill();
    this.calculateBeadPositions();
    this.calculateOffsetPaths();
    this.drawBorders();
    // this.drawBordersWithCrossings();

    // fill("#000")
    // beginShape();
    // for (let pt of this.path) {
    //   curveVertex(pt.x, pt.y);
    // }
    // if (this.isClosedPath()) {
    //   endShape(CLOSE);
    // } else {
    //   endShape();
    // }

    // brush.beginShape();
    // for (let pt of this.path) {
    //   brush.vertex(pt.x, pt.y);
    // }
    // if (this.isClosedPath()) {
    //   brush.endShape(CLOSE);
    // } else {
    //   brush.endShape();
    // }

    brush.hatch(6, 180, { rand: 0, continuous: false, gradient: 0.3 });
    // brush.hatch(random(2, 8), 90, {
    //   rand: 0,
    //   continuous: false,
    //   gradient: 0.3,
    // });
 
    // for (var i = 0; i < vertices.length; i++) {
    //   var v = vertices[i];
    //   var rotatedX = v.x * cos(angle) - v.y * sin(angle);
    //   var rotatedY = v.x * sin(angle) + v.y * cos(angle);

    //   this.updateBoundingRadius(rotatedX, rotatedY);

    //   brush.vertex(rotatedX, rotatedY);
    // }
    // brush.endShape();

    this.drawBeads();

    // this.drawShapes();
    // noLoop(); // Remove if you want continuous drawing
  }

  drawBordersWithCrossings() {
    // noFill();
    brush.stroke(this.borderColor);
    brush.strokeWeight(this.borderWeight);
    brush.noHatch();

    // Draw the path with consideration of crossings
    for (let i = 0; i < this.path.length - 1; i++) {
      let p1 = this.path[i];
      let p2 = this.path[i + 1];

      // Check if this segment is under at any crossing
      let isUnder = false;
      let crossing = null;

      for (let c of crossings) {
        if (
          (c.underSegment.start === p1 && c.underSegment.end === p2) ||
          (c.underSegment.start === p2 && c.underSegment.end === p1)
        ) {
          isUnder = true;
          crossing = c;
          break;
        }
      }

      if (isUnder && crossing) {
        // Draw segment with gap at the crossing
        this.drawSegmentWithGap(p1, p2, crossing.intersectionPoint);
      } else {
        // Draw segment normally
        brush.line(p1.x, p1.y, p2.x, p2.y);
      }
    }
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

    const inwardDistance = -this.borderWidth / 2;
    const outwardDistance = this.borderWidth / 2;
  
    // this.offsetPath1 = polygonOffset(this.path, inwardDistance);
    // this.offsetPath2 = polygonOffset(this.path, outwardDistance);


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

    this.offsetPath1 = chaikinSmooth(this.offsetPath1);
    this.offsetPath2 = chaikinSmooth(this.offsetPath2);


    console.log(this.offsetPath1);
    console.log("outerLEN of "+ this.outerLen)

    console.log(this.offsetPath2);

  }

  // calculateOffsetPaths() {
  //   let numPoints = this.path.length;

  //   for (let i = 0; i < numPoints; i++) {
  //     let prevIndex = (i - 1 + numPoints) % numPoints;
  //     let nextIndex = (i + 1) % numPoints;

  //     let prev = this.path[prevIndex];
  //     let current = this.path[i];
  //     let next = this.path[nextIndex];

  //     // Compute tangent vector as the average of the incoming and outgoing directions
  //     let dir1 = p5.Vector.sub(current, prev).normalize();
  //     let dir2 = p5.Vector.sub(next, current).normalize();
  //     let tangent = p5.Vector.add(dir1, dir2).normalize();

  //     // If the path is open and at the ends, use the single direction
  //     if (!this.isClosedPath() && (i === 0 || i === numPoints - 1)) {
  //       tangent = i === 0 ? dir2 : dir1;
  //     }

  //     // Normal vector
  //     let normal = createVector(-tangent.y, tangent.x);

  //     // Offset by half the bead size
  //     let offset = p5.Vector.mult(normal, this.borderWidth / 2);

  //     // Apply Chaikin smooth algorithm to current point
  //     let q0 = createVector(
  //       prev.x * 3/4 + current.x * 1/4,
  //       prev.y * 3/4 + current.y * 1/4
  //     );
  //     let q1 = createVector(
  //       prev.x * 1/4 + current.x * 3/4,
  //       prev.y * 1/4 + current.y * 3/4
  //     );

  //     // Update offset paths with smoothed points
  //     this.offsetPath1.push(q0);
  //     this.offsetPath2.push(q0);

  //     // Repeat for next point
  //     let q2 = createVector(
  //       current.x * 3/4 + next.x * 1/4,
  //       current.y * 3/4 + next.y * 1/4
  //     );
  //     let q3 = createVector(
  //       current.x * 1/4 + next.x * 3/4,
  //       current.y * 1/4 + next.y * 3/4
  //     );

  //     this.offsetPath1.push(q2);
  //     this.offsetPath2.push(q2);
  //   }

  //   // Add the first point again to close the shape
  //   this.offsetPath1.push(this.offsetPath1[0]);
  //   this.offsetPath2.push(this.offsetPath2[0]);

  //   // Apply Chaikin smooth algorithm multiple times
  //   for (let i = 0; i < ; i++) { // You can adjust this number for more smoothing
  //     this.offsetPath1 = chaikinSmooth(this.offsetPath1);
  //     this.offsetPath2 = chaikinSmooth(this.offsetPath2);
  //   }
  // }

  
  drawBorders() {
    // noFill();

    brush.stroke(this.borderColor);
    brush.strokeWeight(this.borderWeight);
    brush.noHatch();

    // Draw first offset path
    // fill(this.fillColor);
    // fill("#fff");


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

  calculateArea() {
    const clipPoly = {
      paths: [this.path],
      type: "poly"
    };

    const result = clipperLib.polyArea(clipPoly);
    this.outerArea = result[0];
    this.innerArea = result[1];
    this.totalArea = this.outerArea - this.innerArea;
    console.log("Outer area:", this.outerArea);
    console.log("Inner area:", this.innerArea);
    console.log("Total area:", this.totalArea);
  }

  getPolygonVertices() {
    return {
      outer: this.offsetPath1,
      inner: this.offsetPath2,
    };
  }

  drawBeads() {
    for (let bead of this.beads) {
      push();
      // translate(bead.position.x, bead.position.y);
      // console.log(bead.position.x, bead.position.y);
      rotate(bead.angle);
      switch (this.beadType) {
        case "circle":
          // console.log(this.beadSize, bead.position.x, bead.position.y);
          drawCircle(bead.position.x, bead.position.y, this.beadSize);
          // brush.circle(bead.position.x, bead.position.y, this.beadSize);
          break;
        case "square":
          rectMode(CENTER);
          // console.log("square");

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
    return this.path[0].x === this.path[this.path.length - 1].x && 
           this.path[0].y === this.path[this.path.length - 1].y;
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
