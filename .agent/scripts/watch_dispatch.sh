#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
DISPATCH_DIR="$ROOT_DIR/.agent/dispatch"

if [ ! -d "$DISPATCH_DIR" ]; then
    echo "Dispatch directory not found: $DISPATCH_DIR"
    exit 1
fi

declare -A FILE_STATES

echo "Monitoring $DISPATCH_DIR for new or updated tasks..."
echo "Press Ctrl+C to stop."

while true; do
    for file in "$DISPATCH_DIR"/TASK_*.md; do
        if [[ "$(basename "$file")" == "TASK_TEMPLATE.md" ]]; then continue; fi
        [ -e "$file" ] || continue
        
        M_TIME=$(stat -f %m "$file" 2>/dev/null)
        
        if [[ -z "${FILE_STATES[$file]}" || "${FILE_STATES[$file]}" != "$M_TIME" ]]; then
            FILE_STATES[$file]=$M_TIME
            
            CONTENT=$(cat "$file")
            STATUS=$(echo "$CONTENT" | grep -i -E "\*\*Status\*\*:\s*|\*\*Status:\*\*\s*" | sed -E 's/.*\*\*Status\*\*:\s*([^*]*)|\*\*\*Status:\*\*\s*([^*]*)/\1\2/' | tr -d '\r' | xargs)
            
            if [[ "$STATUS" == "Pending" ]]; then
                ROLE=$(echo "$CONTENT" | grep -i -E "\*\*Target Role\*\*:\s*|\*\*Target Role:\*\*\s*|\*\*Role\*\*:\s*" | sed -E 's/.*\*\*Target Role\*\*:\s*([^*]*)|\*\*Target Role:\*\*\s*([^*]*)|\*\*Role\*\*:\s*([^*]*)/\1\2\3/' | tr -d '\r' | xargs)
                ID=$(echo "$CONTENT" | grep -i -E "\*\*Task ID\*\*:\s*|\*\*Task ID:\*\*\s*" | sed -E 's/.*\*\*Task ID\*\*:\s*([^*]*)|\*\*\*Task ID:\*\*\s*([^*]*)/\1\2/' | tr -d '\r' | xargs)
                
                echo -e "\n\033[0;32m[TRIGGER DETECTED] Task Updated: $(basename "$file")\033[0m"
                echo -e "Task ID: $ID"
                echo -e "\033[0;33mTarget Role: $ROLE\033[0m"
                echo -e "\033[0;36mAction: Please start a new session with the '$ROLE' role.\033[0m"
                
                # MacOS Beep
                echo -e "\a"
            fi
        fi
    done
    sleep 2
done
