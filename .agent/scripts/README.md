# 🛠️ 에이전트 스크립트 가이드 (Scripts Guide)

이 디렉토리는 에이전트 시스템을 운영하고 자동화하기 위한 Bash 스크립트들을 포함하고 있습니다. macOS/Linux 환경에 최적화되어 있습니다.

## 📜 스크립트 목록 및 상세 설명

### 1. `launch_subsession.sh` (핵심)
보류 중인 태스크를 자동으로 감지하여 `gemini-cli` 기반의 서브 세션을 즉시 시작합니다.
- **주요 기능**: 태스크 파일 분석, 역할(Role) 매핑, API Key 로드, 에이전트 실행.
- **사용법**:
  ```bash
  ./.agent/scripts/launch_subsession.sh
  ```

### 2. `launch_role.sh` (수동 핸드오프)
에이전트 매니저(Agent Manager) 등 외부 채팅 인터페이스를 사용할 때 컨텍스트를 클립보드에 복사해 줍니다.
- **주요 기능**: 역할 정의와 태스크 내용을 합쳐 클립보드로 복사.
- **사용법**:
  ```bash
  ./.agent/scripts/launch_role.sh
  ```
- **팁**: 실행 후 원하는 채팅창에 `Cmd+V`로 붙여넣으십시오.

### 3. `check_status.sh` (상태 확인)
현재 시스템에서 진행 중인 논리적 태스크 상태와 실제 실행 중인 백그라운드 프로세스를 표시합니다.
- **표시 정보**: Task ID, Role, Status, Objective, 실행 중인 gemini-cli 프로세스.
- **사용법**:
  ```bash
  ./.agent/scripts/check_status.sh
  ```

### 4. `watch_dispatch.sh` (태스크 감시)
`dispatch` 폴더를 실시간으로 감시하며 새로운 태스크가 생성되거나 업데이트될 때 알림(소리 및 메시지)을 줍니다.
- **사용법**: 터미널 하나를 열어 계속 실행해 두십시오.
  ```bash
  ./.agent/scripts/watch_dispatch.sh
  ```

### 5. `auto_launcher.sh` (고급 자동화)
주기적으로 상태를 확인하고 보류 중인 작업이 있으면 자동으로 컨텍스트를 클립보드에 복사해 주는 자동 관리 도구입니다.
- **사용법**:
  ```bash
  ./.agent/scripts/auto_launcher.sh
  ```

---
> [!IMPORTANT]
> 모든 스크립트는 **Bash** 또는 **Zsh** 환경에서 실행 가능하며, `jq`와 `gemini-cli`가 설치되어 있어야 합니다.
