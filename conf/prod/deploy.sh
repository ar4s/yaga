!/bin/bash
set -ex

docker pull ar4s/yaga-api:latest
docker-compose stop -t 1 api
docker-compose rm -f api
docker-compose up -d api
