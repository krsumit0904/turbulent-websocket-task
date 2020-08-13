clean:
	@rm -rf ./dist

# Compile Typescript project
compile:
	@npx babel . -d ./dist -s \
		--copy-files  --extensions ".js,.jsx,.ts,.tsx" --verbose \
		--ignore dist,node_modules

# Build Typescript project
build: clean compile

check-install-deps:
	node bin/check-install-dependencies.js

dev_server: check-install-deps
