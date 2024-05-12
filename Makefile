all: install test

install:
	npm install

test:
	npm test

clean:
	rm -rf node_modules/
