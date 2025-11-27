# Express User Management API

이 프로젝트는 Express.js, Prisma, Zod를 사용하여 구현된 사용자 관리 백엔드 API입니다. User Group, User, User Setting에 대한 CRUD(생성, 조회, 업데이트, 삭제) 작업을 제공합니다.

## 기능 (Features)

*   **User Management (사용자 관리):** 사용자 생성, 조회, 업데이트, 삭제 기능을 제공합니다.
*   **User Groups (사용자 그룹):** 사용자들을 그룹으로 묶어 관리합니다.
*   **User Settings (사용자 설정):** 사용자별 선호도 및 설정을 관리합니다.
*   **Database (데이터베이스):** Prisma ORM과 PostgreSQL을 사용합니다.
*   **Validation (데이터 유효성 검증):** Zod를 사용하여 요청 데이터의 유효성을 검증합니다.
*   **Error Handling (오류 처리):** 중앙 집중식 오류 처리 미들웨어를 통해 일관된 오류 응답을 제공합니다.
*   **Unit Tests (단위 테스트):** Vitest를 사용하여 서비스 계층의 단위 테스트를 작성했습니다.

## 시작하기 (Getting Started)

프로젝트를 로컬에서 설정하고 실행하는 방법은 다음과 같습니다.

### 필수 조건 (Prerequisites)

*   Node.js (LTS 버전 권장)
*   npm (Node.js와 함께 설치됩니다)
*   Docker & Docker Compose (로컬 데이터베이스 설정을 위해)

### 1. 저장소 복제 (Clone the repository)

```bash
git clone <repository_url>
cd express-user-management-app
```

### 2. 환경 변수 설정 (Environment Variables)

프로젝트 루트 디렉토리에 `.env.example` 파일을 참고하여 `.env` 파일을 생성하세요. 이 파일에는 데이터베이스 연결 정보가 포함됩니다.

```ini
# .env
DB_HOST=localhost
POSTGRES_HOST_PORT=15432 # 컨테이너의 5432 포트에 매핑될 호스트 머신의 포트
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=user_management_db # 업데이트된 기본 데이터베이스 이름
DB_PORT=${POSTGRES_HOST_PORT} # 애플리케이션 연결을 위한 설정 가능한 호스트 포트 사용

# 중요: 위 설정값들을 아래 DATABASE_URL에 직접 입력해서 설정해야 합니다. 템플릿 리터럴 형식이 적용되지 않습니다.
DATABASE_URL=postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public

# Application Port (애플리케이션 포트)
PORT=3000
```

### 3. Docker를 이용한 데이터베이스 설정 (Database Setup with Docker)

Docker Compose를 사용하여 PostgreSQL 데이터베이스를 쉽게 시작할 수 있습니다.

```bash
docker-compose up -d postgres
```
이 명령은 백그라운드에서 PostgreSQL 컨테이너를 시작합니다.

### 4. 의존성 설치 (Install Dependencies)

```bash
npm install
```

### 5. Prisma 마이그레이션 실행 (Run Prisma Migrations)

`prisma/schema.prisma`에 정의된 데이터베이스 스키마를 PostgreSQL 데이터베이스에 적용합니다.

```bash
npm run prisma:migrate -- --name initial_migration # 마이그레이션 이름을 변경할 수 있습니다
```
이 명령은 데이터베이스에 필요한 테이블을 생성합니다.

### 6. Prisma Client 생성 (Generate Prisma Client)

애플리케이션이 데이터베이스와 상호작용하는 데 사용하는 Prisma Client를 생성합니다.

```bash
npm run prisma:generate
```

### 7. 애플리케이션 실행 (Run the Application)

개발 모드로 Express.js 서버를 시작합니다.

```bash
npm run dev
```

서버는 `http://localhost:3000` (또는 `.env` 파일에 지정된 포트)에서 실행됩니다.

## API 문서 (API Documentation - Swagger/OpenAPI)

`http://localhost:3000/api-docs` 경로에서 Swagger UI를 통해 API 문서를 확인할 수 있습니다.

## 테스트 실행 (Running Tests)

```bash
npm test
```

## 프로젝트 구조 (Project Structure)

```
.
├── src/
│   ├── db/                 # 데이터베이스 클라이언트 및 연결 설정
│   │   └── client.js
│   ├── middlewares/        # Express 미들웨어 (오류 처리, 유효성 검증)
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   ├── modules/            # 기능별 모듈
│   │   ├── user-groups/
│   │   │   ├── dto/
│   │   │   ├── user-group.controller.js
│   │   │   ├── user-group.routes.js
│   │   │   ├── user-group.service.js
│   │   │   └── user-group.service.test.js
│   │   ├── users/
│   │   │   ├── dto/
│   │   │   ├── user.controller.js
│   │   │   ├── user.routes.js
│   │   │   ├── user.service.js
│   │   │   └── user.service.test.js
│   │   └── user-settings/
│   │       ├── dto/
│   │       ├── user-setting.controller.js
│   │       ├── user-setting.routes.js
│   │       ├── user-setting.service.js
│   │       └── user-setting.service.test.js
│   └── index.js            # 메인 애플리케이션 진입점
├── prisma/                 # Prisma 스키마 및 마이그레이션
│   ├── migrations/
│   └── schema.prisma
├── .env.example            # 환경 변수 예시
├── package.json
├── package-lock.json
├── README.md
├── vitest.config.js        # Vitest 설정 (선택 사항, package.json에 포함 가능)
└── docker-compose.yml      # 로컬 데이터베이스 설정을 위한 Docker Compose
```
