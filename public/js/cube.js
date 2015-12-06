(function() {

	var canvas = document.getElementById('interactive');
	var context = canvas.getContext('2d');

	canvas.width = "340";
	canvas.height = "340";

	context.translate(canvas.width / 2, canvas.height / 2); // 0 should be in the centre
	context.strokeStyle = 'black';
	context.lineWidth = 3;
	context.textwidth = 3;

	var modelSize = canvas.width / 4;
	var scale = modelSize ;
	var step = 0;

	loop.fns.push(function() {
		context.clearRect(- canvas.width / 2, - canvas.height / 2, canvas.width, canvas.height);
		var transform = Mat3.rotationZ(Math.PI * step / 128)
			.multiply(Mat3.rotationY(Math.PI * step / 256))
			.multiply(Mat3.rotationX(Math.PI * step++ / 512));

		var fx = function(vertex) {
			return vertex.x() * scale;
		};

		var fy = function(vertex) {
			return vertex.y() * scale;
		};

		drawAxisIndicator(context, transform);

		for (var i = 0; i < modelPolygons.length; ++i) {
			drawPolygon2(context, modelPolygons[i], transform, fx, fy);
		}
	});

}) ();

loop.start();


