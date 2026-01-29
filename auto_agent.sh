#!/bin/bash

while true; do
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Launching Agent Subsession..."
    bash "./.agent/scripts/launch_subsession.sh"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Waiting for 5 minutes (300 seconds) before next check..."
    sleep 300
done
