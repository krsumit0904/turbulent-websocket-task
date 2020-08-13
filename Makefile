# Lint Typescript project
lint:
	npx eslint src/ --ext=ts,js --fix

check-install-deps:
	node bin/check-install-dependencies.js

killstart:
	node --inspect babel-loader.js ./src/server

dev_server: check-install-deps
	npx concurrently --names "SERVER,LINT" -c "bgBlue.bold,bgMagenta.bold" "npx nodemon --exec 'make killstart'" "npx nodemon --exec 'make lint'"
