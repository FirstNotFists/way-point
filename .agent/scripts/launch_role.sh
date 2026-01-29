#!/bin/bash

# Default values
ROLE="auto"
TASK_FILE="auto"

# Argument parsing
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --role) ROLE="$2"; shift ;;
        --task) TASK_FILE="$2"; shift ;;
    esac
    shift
done

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
DISPATCH_DIR="$ROOT_DIR/.agent/dispatch"

TARGET_PATH=""
DETECTED_ROLE=""

find_task() {
    if [ ! -d "$DISPATCH_DIR" ]; then return; fi
    
    for file in $(ls -tr "$DISPATCH_DIR"/TASK_*.md 2>/dev/null); do
        if [[ "$(basename "$file")" == "TASK_TEMPLATE.md" ]]; then continue; fi
        
        STATUS=$(grep -i -E "\*\*Status\*\*:\s*|\*\*Status:\*\*\s*" "$file" | sed -E 's/.*\*\*Status\*\*:\s*([^*]*)|\*\*\*Status:\*\*\s*([^*]*)/\1\2/' | tr -d '\r' | xargs)
        
        if [[ "$STATUS" == "Pending" ]]; then
            FILE_ROLE=$(grep -i -E "\*\*Target Role\*\*:\s*|\*\*Target Role:\*\*\s*|\*\*Role\*\*:\s*" "$file" | sed -E 's/.*\*\*Target Role\*\*:\s*([^*]*)|\*\*Target Role:\*\*\s*([^*]*)|\*\*Role\*\*:\s*([^*]*)/\1\2\3/' | tr -d '\r' | xargs)
            
            if [[ "$ROLE" == "auto" ]]; then
                DETECTED_ROLE="$FILE_ROLE"
                TARGET_PATH="$file"
                return
            elif [[ "$ROLE" == "$FILE_ROLE" ]]; then
                DETECTED_ROLE="$ROLE"
                TARGET_PATH="$file"
                return
            fi
        fi
    done
}

if [[ "$TASK_FILE" == "auto" ]]; then
    find_task
else
    TARGET_PATH="$DISPATCH_DIR/$TASK_FILE"
    if [ -f "$TARGET_PATH" ]; then
        DETECTED_ROLE=$(grep -i -E "\*\*Target Role\*\*:\s*|\*\*Role\*\*:\s*" "$TARGET_PATH" | sed -E 's/.*\*\*Target Role\*\*:\s*([^*]*)|\*\*Role\*\*:\s*([^*]*)/\1\2/' | tr -d '\r' | xargs)
    fi
fi

if [ -z "$TARGET_PATH" ] || [ ! -f "$TARGET_PATH" ]; then
    echo -e "\033[0;32mNo Pending tasks found in $DISPATCH_DIR. Nothing to do.\033[0m"
    exit 0
fi

# Update status to In Progress
sed -i '' 's/\*\*Status\*\*:\s*Pending/\*\*Status\*\*:\ In Progress/g' "$TARGET_PATH"
sed -i '' 's/\*\*Status:\*\*\s*Pending/\*\*Status\*\*:\ In Progress/g' "$TARGET_PATH"
echo -e "\033[0;35mLocked Task: Status updated to 'In Progress'\033[0m"

if [[ "$ROLE" == "auto" ]]; then ROLE="$DETECTED_ROLE"; fi

echo -e "\033[0;36mFound Task: $(basename "$TARGET_PATH")\033[0m"
echo -e "\033[0;32mTarget Role: $ROLE\033[0m"

# Map Role to File
ROLE_FILE=$(echo "$ROLE" | tr '[:upper:]' '[:lower:]' | sed 's/ /_/g').md
case "$ROLE" in
    "Developer") ROLE_FILE="developer.md" ;;
    "Tester") ROLE_FILE="tester.md" ;;
    "Error Analyst") ROLE_FILE="error_analyst.md" ;;
    "Proposal Expert") ROLE_FILE="proposal_expert.md" ;;
    "Orchestrator") ROLE_FILE="orchestrator.md" ;;
    "Security Specialist") ROLE_FILE="security_specialist.md" ;;
    "Code Auditor") ROLE_FILE="code_auditor.md" ;;
    "User Guide Writer") ROLE_FILE="user_guide_writer.md" ;;
esac
ROLE_PATH="$ROOT_DIR/.agent/roles/$ROLE_FILE"

if [ ! -f "$ROLE_PATH" ]; then
    echo -e "\033[0;31mError: Role definition file not found: $ROLE_PATH\033[0m"
    exit 1
fi

PROMPT="=== SYSTEM BOOTSTRAP ===
You are the '$ROLE'.

1. **LOAD ROLE DEFINITION**:
   - Please read your role definition file at:
   - File: \"$ROLE_PATH\"

2. **LOAD TASK ASSIGNMENT**:
   - Please read your task dispatch file at:
   - File: \"$TARGET_PATH\"

3. **EXECUTE**:
   - Adopt your role.
   - **FIRST ACTION**: Update the Task File Status from 'Pending' to 'In Progress' (if not already done).
   - Follow the instructions in the task file.
   - Use \`task_boundary\` to start the task."

echo "$PROMPT" | pbcopy
echo -e "\033[0;32mOK Role Context copied to clipboard!\033[0m"
echo -e "\033[0;33mAction Required: Open your AI Chat and PASTE (Cmd+V) to start.\033[0m"
