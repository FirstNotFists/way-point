#!/bin/bash

# Default values
ROLE="auto"
TASK_FILE="auto"
HEADLESS=false

# Argument parsing
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --role) ROLE="$2"; shift ;;
        --task) TASK_FILE="$2"; shift ;;
        --headless) HEADLESS=true ;;
    esac
    shift
done

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
DISPATCH_DIR="$ROOT_DIR/.agent/dispatch"

# 1. Identify Task and Role
TARGET_PATH=""
DETECTED_ROLE=""

find_task() {
    if [ ! -d "$DISPATCH_DIR" ]; then return; fi
    
    # Sort by modification time (oldest first like Sort-Object LastWriteTime)
    for file in $(ls -tr "$DISPATCH_DIR"/TASK_*.md 2>/dev/null); do
        if [[ "$(basename "$file")" == "TASK_TEMPLATE.md" ]]; then continue; fi
        
        # Extract Status
        STATUS=$(grep -i -E "\*\*Status\*\*:\s*|\*\*Status:\*\*\s*" "$file" | sed -E 's/.*\*\*Status\*\*:\s*([^[:space:]*]*)|\*\*Status:\*\*\s*([^[:space:]*]*)/\1\2/' | tr -d '\r' | xargs)
        
        if [[ "$STATUS" == "Pending" ]]; then
            # Extract Role
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
    echo -e "\033[0;32mNo Pending tasks found. Exit.\033[0m"
    exit 0
fi

if [[ "$ROLE" == "auto" ]]; then ROLE="$DETECTED_ROLE"; fi

# 1.1 Update Task Status to In Progress
sed -i '' 's/\*\*Status\*\*:\s*Pending/\*\*Status\*\*: In Progress/g' "$TARGET_PATH"
sed -i '' 's/\*\*Status:\*\*\s*Pending/\*\*Status\*\*: In Progress/g' "$TARGET_PATH"
echo -e "\033[0;32mUpdated status to 'In Progress' for $(basename "$TARGET_PATH")\033[0m"

# 2. Setup Role Definition
ROLE_FILE=$(echo "$ROLE" | tr '[:upper:]' '[:lower:]' | sed 's/ /_/g').md
# Hardcoded overrides like in PS1 if needed
case "$ROLE" in
    "Developer") ROLE_FILE="developer.md" ;;
    "Error Analyst") ROLE_FILE="error_analyst.md" ;;
    "Orchestrator") ROLE_FILE="orchestrator.md" ;;
    "Code Reviewer") ROLE_FILE="code_reviewer.md" ;;
esac
ROLE_PATH="$ROOT_DIR/.agent/roles/$ROLE_FILE"

# 3. Construct Bootstrap Prompt
PROMPT="=== SYSTEM BOOTSTRAP (SUB-SESSION) ===
You are the '$ROLE'.
Please read:
- Role Definition: \"$ROLE_PATH\"
- Task Dispatch: \"$TARGET_PATH\"

Execute the task following all project standards in GEMINI.md."

# 4. Launch Gemini CLI
echo -e "\033[0;36mLaunching Gemini CLI for Role: $ROLE, Task: $(basename "$TARGET_PATH")\033[0m"

# Ensure API Key
if [ -z "$GEMINI_API_KEY" ]; then
    LOCAL_SETTINGS="$ROOT_DIR/.agent/settings.json"
    GLOBAL_SETTINGS="$HOME/.gemini/settings.json"
    SETTINGS_PATH=""
    if [ -f "$LOCAL_SETTINGS" ]; then SETTINGS_PATH="$LOCAL_SETTINGS"; elif [ -f "$GLOBAL_SETTINGS" ]; then SETTINGS_PATH="$GLOBAL_SETTINGS"; fi

    if [ -n "$SETTINGS_PATH" ]; then
        MODE=$(jq -r '.api_key_mode' "$SETTINGS_PATH" 2>/dev/null)
        if [[ "$MODE" == "sequential" ]]; then
            STATE_FILE="$ROOT_DIR/.agent/state.json"
            if [ ! -f "$STATE_FILE" ]; then echo '{"api_key_index": 0}' > "$STATE_FILE"; fi
            INDEX=$(jq -r '.api_key_index' "$STATE_FILE")
            COUNT=$(jq '.api_keys | length' "$SETTINGS_PATH")
            KEY_INDEX=$((INDEX % COUNT))
            GEMINI_API_KEY=$(jq -r ".api_keys[$KEY_INDEX]" "$SETTINGS_PATH")
            NEXT_INDEX=$((INDEX + 1))
            jq --arg next "$NEXT_INDEX" '.api_key_index = ($next | tonumber)' "$STATE_FILE" > "${STATE_FILE}.tmp" && mv "${STATE_FILE}.tmp" "$STATE_FILE"
            echo -e "\033[0;37mSelected API Key #$((KEY_INDEX + 1)) (Sequential mode)\033[0m"
        else
            GEMINI_API_KEY=$(jq -r '.api_key // .api_keys[0]' "$SETTINGS_PATH" 2>/dev/null)
        fi
    fi
fi

if [ -z "$GEMINI_API_KEY" ] || [ "$GEMINI_API_KEY" == "null" ]; then
    echo -e "\033[0;31mError: GEMINI_API_KEY not found in environment or settings.json\033[0m"
    exit 1
fi

export GEMINI_API_KEY

if [ "$HEADLESS" = true ]; then
    echo -e "\033[0;33mRunning in HEADLESS mode with AUTO-APPROVE (-y)\033[0m"
    gemini -m gemini-2.0-flash -y -p "$PROMPT"
else
    # Auto-approve (-y) is used by default for automation consistency
    gemini -m gemini-2.0-flash -y -p "$PROMPT"
fi
