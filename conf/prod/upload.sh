#!/bin/bash

rsync -r . ubuntu@${PROD_HOST}:~/yaga
