#!/bin/bash
# Usage: Bash script used to run tasks in background:
#	- frontend (index.js) and log it to client.log 
# 	- backend (server.js) and log in to server.log
# Author: Marius Pozniakovas

SERVER_LOG_FILE=server.log
CLIENT_LOG_FILE=client.log

# check if old logs exits => rename then if they exist
cd logs

# server:
if [[ -f "$SERVER_LOG_FILE" ]]; then
    echo "renaming $SERVER_LOG_FILE..."
    for filename in *server.log*; do
        basename=$(basename "$filename" .log)
        timestamp=$(date -d "$(stat -c %y "$filename")" +%F-%T)
        mv "$filename" "$basename-$timestamp.log"
    done
fi

# client
if [[ -f "$CLIENT_LOG_FILE" ]]; then
    echo "renaming $CLIENT_LOG_FILE..."
    for filename in *client.log*; do
        basename=$(basename "$filename" .log)
        timestamp=$(date -d "$(stat -c %y "$filename")" +%F-%T)
        mv "$filename" "$basename-$timestamp.log"
    done
fi

# run processes
cd ..

# kill any nodes
pkill node

# wait for few seconds
echo "Wait for few seconds for nodes to die"

# frontend
npm start > logs/client.log &

# backend
node server.js > logs/server.log &





