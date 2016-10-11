help:
	@echo "make run - Build image and run container (first time)"
	@echo "make start-i - Start container on Interactive mode"
	@echo "make start-d - Start container on Detached mode (background)"
	@echo "make stop - Stop container"

build:
	docker build -t mqtt-server .

run: build
	docker run -t -i -p 80:80 -p 1883:1883 --name mqtt-server mqtt-server npm start

start-i:
	docker start -i mqtt-server

start-d:
	docker start mqtt-server

stop:
	docker stop mqtt-server