help:
	@echo "docker-run - Run container"

build:
	docker build -t mqtt-server .
run: build
	docker run -t -i -p 80:80 -p 1883:1883 --name mqtt mqtt npm start