
## How to build a
From terminal below the text (type "Ctrl + `" to show it), type the following: 

Do once, at the beginning of a development session
- `git pull` to get the new code from github.
- `npm install` to install or update all of the modules.

When starting dev, do 
- `npm run watch` to run and ability to change the code and things will rebuild on the background.

Then, go to 

- home page: http://localhost:8080/
- 3d test: http://localhost:8080/test.html


## How to develop

- In VSCode in the project, (Ctrl + `) (or Command + Shift + P and type integrated term)
- `npm run watch` does the start and build when code change.

- for the 3d test: http://localhost:8080/test.html

- To revert to working code 
	- Click on terminal
	- Type `Ctrl c`
	- `git checkout -- .`


## Useful docs

- Gravity: https://doc.babylonjs.com/how_to/using_the_physics_engine