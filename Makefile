backend-image:
	docker build --target=backend -t ar4s/yaga-api -f Dockerfile .

backend-push:
	docker push ar4s/yaga-api
