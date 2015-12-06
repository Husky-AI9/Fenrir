/*------------------------------ga.js------------------------------------------------
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-37741327-3', 'stuartw.io');ga('send', 'pageview');
/*------------------------------Vector.js------------------------------------------------*/
function Vec3(elements) {

	if (elements.length !== 3) {
		throw new Error('Vec3 must have 3 elements');
	}

	this.element = function(i) {

		if (i < 0 || i > 2) {
			throw new Error('i must be in the range 0 - 2');
		}

		return elements[i];
	};

	this.multiply = function(matrix) {

		if (!(matrix instanceof Mat3)) {
			throw new Error('matrix must be a Mat3');
		}

		return matrix.multiply(this);
	}
}

/*------------------------------Math.js------------------------------------------------*/
function Mat3(elements) {

	if (elements.length !== 9) {
		throw new Error('Mat3 must have 9 elements');
	}

	this.element = function(x, y) {

		if (x < 0 || x > 2) {
			throw new Error('x must be in the range 0 -2');
		}

		if (y < 0 || y > 2) {
			throw new Error('y must be in the range 0 - 2');
		}

		return elements[y * 3 + x];

	};

	this.multiply = function(other) {

		if (!(other instanceof Vec3)
				&& !(other instanceof Mat3)) {
			throw new Error('vector must be either a Vec3 or Mat3');
		}

		if (other instanceof Vec3) {

			var elements = [];
			for (var y = 0; y < 3; ++y) {
				var sum = 0;
				for (var x = 0; x < 3; ++x) {
					sum += other.element(x) * this.element(x, y);
				}
				elements.push(sum);
			}

			return new Vec3(elements);
		} else {

			var elements = [];
			for (var z = 0; z < 3; ++z) {
				for (var y = 0; y < 3; ++y) {
					var sum = 0;
					for (var x = 0; x < 3; ++x) {
						sum += other.element(y, x) * this.element(x, z);
					}
					elements.push(sum);
				}
			}

			return new Mat3(elements);
		}
	};
}

Mat3.identity = function() {
	return new Mat3([
		1.0, 0.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 0.0, 1.0
	]);
}

Mat3.rotationX = function(angle) {
	var a = Math.cos(angle);
	var b = Math.sin(angle);
	return new Mat3([
		1.0, 0.0, 0.0,
		0.0,   a,  -b,
		0.0,   b,   a,
	]);
};

Mat3.rotationY = function(angle) {
	var a = Math.cos(angle);
	var b = Math.sin(angle);
	return new Mat3([
		  a, 0.0,   b,
		0.0, 1.0, 0.0,
		 -b, 0.0,   a,
	]);
};


Mat3.rotationZ = function(angle) {
	var a = Math.cos(angle);
	var b = Math.sin(angle);
	return new Mat3([
		  a,  -b, 0.0,
		  b,   a, 0.0,
		0.0, 0.0, 1.0,
	]);
};

Mat3.isometric = function(angle) {
	var a = Math.cos(angle);
	var b = Math.sin(angle);
	return new Mat3([
		 a, 0, a,
		-b, 1, b,
		 0, 0, 0
	]);
};

/*------------------------------Vertex.js------------------------------------------------*/
function Vertex(x, y, z) {
	this.x = function() {
		return x;
	};

	this.y = function() {
		return y;
	};

	this.z = function() {
		return z;
	};
}

Vertex.transform = function(vertex, matrix) {
	return Vertex.fromVec3(
		matrix.multiply(
			Vertex.toVec3(vertex)
		)
	);
};

Vertex.toVec3 = function(vertex) {
	return new Vec3([vertex.x(), vertex.y(), vertex.z()]);
};

Vertex.fromVec3 = function(vector) {
	return new Vertex(vector.element(0), vector.element(1), vector.element(2));
};
/*------------------------------Poly.js------------------------------------------------*/
function Polygon(vertices) {
	this.count = function() {
		return vertices.length;
	};

	this.vertex = function(i) {
		if (i < 0) {
			throw new Error('Vertex index must be a positive integer')
		}
		if (i >= vertices.length) {
			throw new Error('Vertex index out of bounds');
		}

		return vertices[i];
	};
}

/*------------------------------oblique.js------------------------------------------------*/
var oblique = {
	gx: function(scale, zc) {
		return function(vertex) {
			return (vertex.x() + vertex.z() * zc) * scale;
		};
	},

	gy: function(scale, zc) {
		return function(vertex) {
			return (vertex.y() + vertex.z() * zc) * scale;
		};
	}
};

/*------------------------------orthogonal.js------------------------------------------------*/
var orthogonal = {
	gx: function(scale) {
		return function(vertex) {
			return vertex.x() * scale;
		};
	},

	gy: function(scale) {
		return function(vertex) {
			return vertex.y() * scale;
		};
	}
};

/*------------------------------isometric.js------------------------------------------------*/
var isometric = {
	gx: function(scale, c) {
		return function(vertex) {
			return (vertex.x() * c + vertex.z() * c) * scale;
		};
	},

	gy: function(scale, c) {
		return function(vertex) {
			return (vertex.y() + vertex.z() * c - vertex.x() * c) * scale;
		};
	}
};

/*------------------------------drawing.js------------------------------------------------*/
function drawPolygon(context, polygon, fx, fy) {
	context.beginPath();
	context.moveTo(fx(polygon.vertex(0)), -1 * fy(polygon.vertex(0)));
	for (var i = 1; i < polygon.count(); ++i) {
		context.lineTo(fx(polygon.vertex(i)), -1 * fy(polygon.vertex(i)));
	}
	context.closePath();
	context.stroke();
}

function drawPolygon2(context, polygon, matrix, fx, fy) {
	context.beginPath();
	var vertex = Vertex.transform(polygon.vertex(0), matrix);
	context.moveTo(fx(vertex), -1 * fy(vertex));
	for (var i = 1; i < polygon.count(); ++i) {
		vertex = Vertex.transform(polygon.vertex(i), matrix);
		context.lineTo(fx(vertex), -1 * fy(vertex));
	}
	context.closePath();
	context.stroke();
}

function drawAxisIndicator(context, matrix) {

	context.save();

	context.textBaseline = 'middle';
	context.textAlign = 'center';


	context.strokeStyle = '#CF000F';
	context.fillStyle = '#CF000F';

	var x = new Vec3([50.0, 0.0, 0.0]).multiply(matrix);
	context.fillText('X', x.element(0), -1 * x.element(1));
	drawLineFromVectors(
		context,
		new Vec3([0.0, 0.0, 0.0]).multiply(matrix),
		new Vec3([40.0, 0.0, 0.0]).multiply(matrix)
	);

	context.strokeStyle = '#34495E';
	context.fillStyle = '#34495E';

	var y = new Vec3([0.0, 50.0, 0.0]).multiply(matrix);
	context.fillText('Y', y.element(0), -1 * y.element(1));
	drawLineFromVectors(
		context,
		new Vec3([0.0, 0.0, 0.0]).multiply(matrix),
		new Vec3([0.0, 40.0, 0.0]).multiply(matrix)
	);

	context.strokeStyle = '#1E824C';
	context.fillStyle = '#1E824C';

	var z = new Vec3([0.0, 0.0, 50.0]).multiply(matrix);
	context.fillText('Z', z.element(0), -1 * z.element(1));
	drawLineFromVectors(
		context,
		new Vec3([0.0, 0.0, 0.0]).multiply(matrix),
		new Vec3([0.0, 0.0, 40.0]).multiply(matrix)
	);

	context.restore();

}

function drawLineFromVectors(context, a, b) {
	context.beginPath();
	context.moveTo(a.element(0), -1 * a.element(1));
	context.lineTo(b.element(0), -1 * b.element(1));
	context.stroke();
}




/*------------------------------animation.js------------------------------------------------*/

var loop = {
	fns: [],
	start: function() {
		var fns = this.fns;
		var step = function() {
			for (var i = 0; i < fns.length; ++i) {
				fns[i]();
			}
			window.requestAnimationFrame(step);
		};
		window.requestAnimationFrame(step);
	}
};


/*------------------------------model.js------------------------------------------------*/

var modelVerts = [
	new Vertex(-1.0, -1.0, -1.0), // 0 FBL
	new Vertex( 1.0, -1.0, -1.0), // 1 FBR

	new Vertex(-1.0, -1.0,  1.0), // 2 RBL
	new Vertex( 1.0, -1.0,  1.0), // 3 RBR
	
	new Vertex(-1.0,  1.0, -1.0), // 4 FTL
	new Vertex( 1.0,  1.0, -1.0), // 5 FTR

	new Vertex(-1.0,  1.0,  1.0), // 6 RTL
	new Vertex( 1.0,  1.0,  1.0)  // 7 RTR
];

var modelPolygons = [
	new Polygon([
		modelVerts[0],
		modelVerts[1],
		modelVerts[5],
		modelVerts[4]
	]), // FRONT
	new Polygon([
		modelVerts[2],
		modelVerts[3],
		modelVerts[7],
		modelVerts[6]
	]), // REAR
	new Polygon([
		modelVerts[0],
		modelVerts[1],
		modelVerts[3],
		modelVerts[2]
	]), // BOTTOM
	new Polygon([
		modelVerts[4],
		modelVerts[5],
		modelVerts[7],
		modelVerts[6]
	]), // TOP
	new Polygon([
		modelVerts[0],
		modelVerts[2],
		modelVerts[6],
		modelVerts[4]
	]), // LEFT
	new Polygon([
		modelVerts[1],
		modelVerts[3],
		modelVerts[7],
		modelVerts[5]
	])  // RIGHT
];

/*------------------------------------------------------------------------------*/

// Basic scaled projection discarding depth / z value
(function() {

	var canvas = document.getElementById('canvas-1');
	var context = canvas.getContext('2d');

	canvas.width = 640;
	canvas.height = 240;

	context.translate(canvas.width / 2, canvas.height / 2); // 0 should be in the centre
	context.strokeStyle = '#222222';

	var modelSize = canvas.width / 4;
	var scale = modelSize / 2;
	var fx = orthogonal.gx(scale);
	var fy = orthogonal.gy(scale);

	for (var i = 0; i < modelPolygons.length; ++i) {
		drawPolygon(context, modelPolygons[i], fx, fy);
	}

}) ();