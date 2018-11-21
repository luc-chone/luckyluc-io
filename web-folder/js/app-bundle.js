var app_bundle = (function (exports,p5) {
	'use strict';

	class Entity {
	    constructor(config) {
	        this.speed = 0;
	        this.limitLeft = 0;
	        this.limitRight = 3000;
	        this.direction = 1;
	        let el = null;
	        //#region    ---------- create the el ---------- 
	        if (config.type) {
	            const html = `<img class='${config.type}' src='${config.src}' width='${config.width}'>`;
	            el = htmlToElement(html);
	            document.getElementsByTagName('body')[0].append(el);
	        }
	        else if (config.htmlId) {
	            el = document.getElementById(config.htmlId);
	        }
	        if (el === null) {
	            throw new Error(`Cannot create element for ${config}`);
	        }
	        this.el = el;
	        //#endregion ---------- /create the el ---------- 
	        //#region    ---------- Other configs ---------- 
	        if (config.speed != null) {
	            this.speed = config.speed;
	        }
	        if (config.limitLeft != null) {
	            this.limitLeft = config.limitLeft;
	        }
	        if (config.limitRight != null) {
	            this.limitRight = config.limitRight;
	        }
	        if (config.direction != null) {
	            this.direction = config.direction;
	        }
	        if (config.onClick != null) {
	            this.onClick = config.onClick;
	        }
	        //#endregion ---------- /Other configs ---------- 
	        if (this.onClick) {
	            this.el.addEventListener('click', (event) => {
	                this.onClick();
	            });
	        }
	    }
	    crash() {
	        this.el.setAttribute("src", "images/explosion-1.gif");
	        setTimeout(() => {
	            if (this.el.parentNode == null) {
	                throw new Error(`Cannot display ${this.el} no parentNode`);
	            }
	            this.el.parentNode.removeChild(this.el);
	            entityManager.remove(this);
	        }, 500);
	    }
	}
	class Plane extends Entity {
	    constructor() {
	        super({ type: 'plane', src: 'images/plane-1.png', width: 100 });
	        this.limitLeft = -500;
	        this.limitRight = 1200;
	        this.direction = 1;
	        this.speed = 6;
	    }
	}
	class Car extends Entity {
	    constructor() {
	        super({ type: 'car', src: 'images/car-1.png', width: 100 });
	        this.limitLeft = -200;
	        this.limitRight = 1400;
	        this.direction = 1;
	        this.speed = 4;
	    }
	}
	class Person extends Entity {
	    constructor() {
	        super({ type: 'person', src: 'images/person-running.gif', width: 35 });
	        // var html = '<img class="person" src="images/person-running.gif" width="50">';
	        // this.el = htmlToElement(html);
	        this.limitLeft = -50;
	        this.limitRight = 900;
	        this.direction = 1;
	        this.speed = 2;
	    }
	}
	class Dog extends Entity {
	    constructor() {
	        super({ type: 'dog', src: 'images/dog-a.gif', width: 35 });
	        this.limitLeft = -50;
	        this.limitRight = 900;
	        this.direction = 1;
	        this.speed = 0.8;
	    }
	}
	// create HTMLELement from string
	function htmlToElement(html) {
	    var template = document.createElement('template');
	    template.innerHTML = html;
	    return template.content.firstElementChild;
	}
	class EntityManager {
	    constructor() {
	        this.entities = [];
	    }
	    // Add a new object to the list of managed objects
	    add(entity) {
	        // first, we add it to the DOM (to HTML with javascript)
	        document.querySelector("body").appendChild(entity.el);
	        this.entities.push(entity);
	    }
	    // helper function
	    remove(entity) {
	        var index = this.entities.indexOf(entity);
	        this.entities.splice(index, 1);
	    }
	    getEntities() {
	        return this.entities.slice(0);
	    }
	}
	const entityManager = new EntityManager();

	const cloud1 = {
	    htmlId: "cloud-1",
	    limitLeft: -100,
	    limitRight: 1100,
	    direction: 1,
	    speed: 0.32
	};
	const cloud2 = {
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
	const house2 = {
	    htmlId: "house-2",
	    onClick: function () {
	        const newCar = new Car();
	        entityManager.add(newCar);
	    }
	};
	const doghouse1 = {
	    htmlId: "doghouse-1",
	    onClick: function () {
	        const newDog = new Dog();
	        entityManager.add(newDog);
	    }
	};
	const house1 = {
	    htmlId: "house-1",
	    onClick: function () {
	        const newperson = new Person();
	        entityManager.add(newperson);
	    }
	};
	const configs = [cloud1, cloud2, house2, house1, doghouse1];
	// start the p5 loop
	new p5(function (p) {
	    p.setup = function () {
	        console.log('...setup');
	    };
	    p.draw = function () {
	        for (const entity of entityManager.getEntities()) {
	            moveEntity(entity);
	        }
	    };
	});
	function moveEntity(entity) {
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
	    }
	    else if (entity.currentLeft < entity.limitLeft) {
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

	exports.Entity = Entity;
	exports.Plane = Plane;
	exports.Car = Car;
	exports.Person = Person;
	exports.Dog = Dog;
	exports.entityManager = entityManager;

	return exports;

}({},window.p5));
//# sourceMappingURL=app-bundle.js.map
