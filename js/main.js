
document.addEventListener("DOMContentLoaded", function(event) {
	// move the plane
	var plane1El = document.getElementById("plane-1");
	plane1El.style.left = "400px";

	// draw the building
	var building1Canvas = document.getElementById("building-1");	
	rect(building1Canvas, 10, 10, 60, 50, "red", "blue");
  
  var building2Canvas = document.getElementById("building-2");	
	rect(building2Canvas, 10, 10, 60, 100, "gray", "black");

  var building3Canvas = document.getElementById("building-3");	
	rect(building3Canvas, 10, 10, 60, 100, "gray", "black");

 var building4Canvas  = document.getElementById("building-4");	
	rect(building4Canvas, 10, 10, 60, 100, "gray", "black");

});



function rect(canvas, x, y, w, h, fill, stroke){
	var context = canvas.getContext('2d');
  context.beginPath();
  context.rect(x, y, w, h);
  context.fillStyle = fill;
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = stroke;
  context.stroke();	
}

