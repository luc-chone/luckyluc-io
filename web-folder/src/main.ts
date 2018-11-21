
import * as p5 from 'p5';
import { Entity, EntityConfig, Plane, Car, Dog, entityManager, Person } from './entities';

const cloud1: EntityConfig = {
	htmlId: "cloud-1",
	limitLeft: -100,
	limitRight: 1100,
	direction: 1,
	speed: 0.32
};

const cloud2: EntityConfig = {
	htmlId: "cloud-2",
	limitLeft: -100,
	limitRight: 1100,
	direction: 1,
	speed: 0.02,
	onClick: function () {
		const newPlane = new Plane();
		entityManager.add(newPlane);
	}
};

const house2: EntityConfig = {
	htmlId: "house-2",

	onClick: function () {
		const newCar = new Car();
		entityManager.add(newCar);
	}
};

const doghouse1: EntityConfig = {
	htmlId: "doghouse-1",

	onClick: function () {
		const newDog = new Dog();
		entityManager.add(newDog);
	}
};

const house1: EntityConfig = {
	htmlId: "house-1",

	onClick: function () {
		const newperson = new Person();
		entityManager.add(newperson);
	}
};

const configs: EntityConfig[] = [cloud1, cloud2, house2, house1, doghouse1];


// start the p5 loop
new p5(function (p) {

	p.setup = function () {
		console.log('...setup')
	}

	p.draw = function () {
		for (const entity of entityManager.getEntities()) {
			moveEntity(entity);
		}
	};

});


function moveEntity(entity: Entity) {

	// here we make sure we move object that have a direction
	if (entity.direction == null) {
		return;
	}

	// get the current left
	entity.currentLeft = (entity.currentLeft == null) ? entity.el.offsetLeft : entity.currentLeft;

	// decide the direction
	if (entity.currentLeft > entity.limitRight) {
		entity.el.classList.add("left");
		entity.direction = -1;
	} else if (entity.currentLeft < entity.limitLeft) {
		entity.el.classList.remove("left");
		entity.direction = 1;
	}

	// get the new left position from the direction
	var newLeft = entity.currentLeft + entity.direction * entity.speed;

	// update the html element left (this will round the el.offsetLeft)
	entity.el.style.left = newLeft + "px";

	// and we store exact newLeft in the entity.currentLeft
	entity.currentLeft = newLeft;
}
// ------- /P5 app code ------- //

// This will be called when the page is loaded (before setup and draw)
document.addEventListener("DOMContentLoaded", function (event) {

	// for all of our mo
	for (let config of configs) {
		// the element is already in HTML, so, we just get it by id.
		const entity = new Entity(config);
		entityManager.add(entity);
	}
	console.log('DOMContentLoaded DONE', entityManager.getEntities());

});



