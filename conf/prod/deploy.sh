#!/bin/bash
set -ex

docker pull ar4s/yaga-api:latest
docker-compose stop -t 1 api-1 api-2
docker-compose rm -f api-1 api-2
docker-compose up -d api-1 api-2
