#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
DISPATCH_DIR="$ROOT_DIR/.agent/dispatch"

if [ ! -d "$DISPATCH_DIR" ]; then
    echo -e "\033[0;31mError: Dispatch directory not found: $DISPATCH_DIR\033[0m"
    exit 1
fi

echo -e "\033[0;33m=== ACTIVE TASKS (Logical Status) ===\033[0m"
printf "%-20s | %-15s | %-12s | %s\n" "Task ID" "Role" "Status" "Objective"
echo "--------------------------------------------------------------------------------"

TASK_COUNT=0
for file in "$DISPATCH_DIR"/TASK_*.md; do
    if [[ "$(basename "$file")" == "TASK_TEMPLATE.md" ]]; then continue; fi
    [ -e "$file" ] || continue
    
    CONTENT=$(cat "$file")
    
    STATUS=$(echo "$CONTENT" | grep -i -E "\*\*Status\*\*:\s*|\*\*Status:\*\*\s*" | sed -E 's/.*\*\*Status\*\*:\s*([^*]*)|\*\*\*Status:\*\*\s*([^*]*)/\1\2/' | tr -d '\r' | xargs)
    ROLE=$(echo "$CONTENT" | grep -i -E "\*\*Target Role\*\*:\s*|\*\*Target Role:\*\*\s*|\*\*Role\*\*:\s*" | sed -E 's/.*\*\*Target Role\*\*:\s*([^*]*)|\*\*Target Role:\*\*\s*([^*]*)|\*\*Role\*\*:\s*([^*]*)/\1\2\3/' | tr -d '\r' | xargs)
    ID=$(echo "$CONTENT" | grep -i -E "\*\*Task ID\*\*:\s*|\*\*Task ID:\*\*\s*" | sed -E 's/.*\*\*Task ID\*\*:\s*([^*]*)|\*\*\*Task ID:\*\*\s*([^*]*)/\1\2/' | tr -d '\r' | xargs)
    OBJECTIVE=$(echo "$CONTENT" | awk '/## Objective/{flag=1; next} /^#/{flag=0} flag' | head -n 1 | xargs)

    if [[ "$STATUS" != "Completed" && "$STATUS" != "Archived" && "$STATUS" != "Success" && -n "$STATUS" ]]; then
        printf "%-20s | %-15s | %-12s | %s\n" "$ID" "$ROLE" "$STATUS" "$OBJECTIVE"
        TASK_COUNT=$((TASK_COUNT + 1))
    fi
done

if [ "$TASK_COUNT" -eq 0 ]; then
    echo -e "\033[0;32mNo Active Tasks.\033[0m"
fi

echo -e "\n\033[0;36m=== ACTIVE SUB-SESSIONS (Background Processes) ===\033[0m"
# Detect node processes running gemini
PROCESSES=$(ps aux | grep "node" | grep "gemini" | grep -v "grep")

if [ -n "$PROCESSES" ]; then
    printf "%-8s | %-10s | %s\n" "PID" "Started" "Command"
    echo "--------------------------------------------------------------------------------"
    echo "$PROCESSES" | awk '{printf "%-8s | %-10s | %s %s %s %s %s\n", $2, $9, $11, $12, $13, $14, $15}'
else
    echo -e "\033[0;37mNo active gemini-cli processes detected.\033[0m"
fi
