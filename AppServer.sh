#!/bin/bash

if [ $1 = "prod" ]; then
	./AppServer.Prod.sh
else
	./AppServer.Dev.sh
fi #end if