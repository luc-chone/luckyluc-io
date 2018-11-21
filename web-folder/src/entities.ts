export interface EntityConfig {

	// when entity create its own HTMLElement
	type?: string;
	src?: string;
	width?: number;

	// when we refer to an existing html
	htmlId?: string;

	speed?: number;
	limitLeft?: number;
	limitRight?: number;
	direction?: number;

	onClick?: () => void;
}

export class Entity {
	// set at initialization/constructor
	el: HTMLElement;

	speed: number = 0;
	limitLeft: number = 0;
	limitRight: number = 3000;
	direction: number = 1;
	onClick?: () => void;

	// used when moving
	currentLeft?: number;

	constructor(config: EntityConfig) {
		let el: HTMLElement | null = null;
		//#region    ---------- create the el ---------- 
		if (config.type) {
			const html = `<img class='${config.type}' src='${config.src}' width='${config.width}'>`;
			el = htmlToElement(html);
			document.getElementsByTagName('body')[0].append(el);
		} else if (config.htmlId) {
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
				this.onClick!();
			})
		}
	}

	crash() {
		this.el.setAttribute("src", "images/explosion-1.gif");
		setTimeout(() => {
			if (this.el.parentNode == null) {
				throw new Error(`Cannot display ${this.el} no parentNode`)
			}
			this.el.parentNode.removeChild(this.el);
			entityManager.remove(this);
		}, 500)
	}
}

export class Plane extends Entity {
	constructor() {
		super({ type: 'plane', src: 'images/plane-1.png', width: 100 });

		this.limitLeft = -500;
		this.limitRight = 1200;
		this.direction = 1;
		this.speed = 6;
	}
}

export class Car extends Entity {
	constructor() {
		super({ type: 'car', src: 'images/car-1.png', width: 100 });

		this.limitLeft = -200;
		this.limitRight = 1400;
		this.direction = 1;
		this.speed = 4;
	}
}

export class Person extends Entity {
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

export class Dog extends Entity {
	constructor() {
		super({ type: 'dog', src: 'images/dog-a.gif', width: 35 });

		this.limitLeft = -50;
		this.limitRight = 900;
		this.direction = 1;
		this.speed = 0.8;
	}
}

// create HTMLELement from string
function htmlToElement(html: string): HTMLElement {
	var template = document.createElement('template');
	template.innerHTML = html;
	return template.content.firstElementChild as HTMLElement;
}

class EntityManager {
	entities: Entity[] = []

	// Add a new object to the list of managed objects
	add(entity: Entity) {
		// first, we add it to the DOM (to HTML with javascript)
		document.querySelector("body")!.appendChild(entity.el);
		this.entities.push(entity);
	}

	// helper function
	remove(entity: Entity) {
		var index = this.entities.indexOf(entity);
		this.entities.splice(index, 1);
	}

	getEntities() {
		return this.entities.slice(0);
	}
}

export const entityManager = new EntityManager();
