#!/bin/bash

# Default values
INTERVAL=120

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --interval) INTERVAL="$2"; shift ;;
    esac
    shift
done

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
DISPATCH_DIR="$ROOT_DIR/.agent/dispatch"
LAUNCH_ROLE="$SCRIPT_DIR/launch_role.sh"
CHECK_STATUS="$SCRIPT_DIR/check_status.sh"

echo -e "\033[0;36m==========================================\033[0m"
echo -e "\033[0;36m   GIIP Agent Auto-Launcher (MacOS/zsh)\033[0m"
echo -e "\033[0;36m==========================================\033[0m"

echo -e "\nWatching for Pending Tasks..."
echo -e "Press Ctrl+C to stop.\n"

while true; do
    # 1. Periodically Report Status
    CURRENT_TIME=$(date '+%H:%M:%S')
    echo -e "\n[$CURRENT_TIME] Checking Status..."
    
    bash "$CHECK_STATUS"

    # 2. Check for pending files
    PENDING_FILE=""
    if [ -d "$DISPATCH_DIR" ]; then
        for file in "$DISPATCH_DIR"/TASK_*.md; do
            if [[ "$(basename "$file")" == "TASK_TEMPLATE.md" ]]; then continue; fi
            [ -e "$file" ] || continue
            
            STATUS=$(grep -i -E "\*\*Status\*\*:\s*|\*\*Status:\*\*\s*" "$file" | sed -E 's/.*\*\*Status\*\*:\s*([^*]*)|\*\*\*Status:\*\*\s*([^*]*)/\1\2/' | tr -d '\r' | xargs | head -n 1)
            if [[ "$STATUS" == "Pending" ]]; then
                PENDING_FILE="$file"
                break
            fi
        done
    fi

    if [ -n "$PENDING_FILE" ]; then
        FILE_NAME=$(basename "$PENDING_FILE")
        echo -e "\n\033[0;32m[AutoLauncher] Pending task detected: $FILE_NAME\033[0m"
        
        # Launch role to prepare clipboard
        bash "$LAUNCH_ROLE" --task "$FILE_NAME"
        
        # Mac Beep
        echo -e "\a"
        
        echo -e "\033[0;34m[AutoLauncher] Context ready in clipboard.\033[0m"
        sleep 5
    else
        sleep "$INTERVAL"
    fi
done
