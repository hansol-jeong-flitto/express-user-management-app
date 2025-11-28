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

## 기술 선택 이유

*   **Prisma**: TypeORM은 TypeScript에 최적화된 ORM이어서 다른 선택지들 중 가장 현대적인 ORM인 Prisma를 적용해봤습니다.
*   **Zod**: validator로 여러 선택지를 고민했지만, TypeScript 최적 패키지임에도 불구하고 js도 호환되며 개인적으로 익숙한 Zod를 선택했습니다.
*   **Vitest**: Jest가 익숙하고 대표적이지만 최근 주목받고 있고 더 우수한 성능을 가지고 있다는 Vitest를 적용해봤습니다.

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

### 2. 환경 변수 설정 (.env)

`.env.sample` 파일을 참고하여 `.env` 파일을 생성하고 데이터베이스 연결 정보를 설정합니다.

```bash
cp .env.sample .env
# .env 파일을 열어 필요한 정보로 수정합니다.
```

예시 (`.env` 파일 내용):

```ini
# .env
DB_HOST=localhost
DB_PORT=5432 # 컨테이너의 5432 포트에 매핑될 호스트 머신의 포트
DB_USERNAME=myuser # 데이터베이스 사용자 이름
DB_PASSWORD=mypassword # 데이터베이스 비밀번호
DB_NAME=mydatabase # 데이터베이스 이름 (예: user_management_db)

# Application Port (애플리케이션 포트)
PORT=3000
```
**중요**: `DATABASE_URL`은 `src/config/config.js`에서 위 값들을 기반으로 자동으로 구성됩니다.

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

## 개선하면 좋을 점들
- User를 삭제했을 때 해당하는 UserSetting이 삭제 되는 등 onDelete: Cascade 정책을 고려하여 적용해볼 수 있습니다.
- User Group을 삭제했을 때 해당 userGroupId를 가진 User의 데이터 변경을 고려해볼 수 있습니다.
- 예외 처리 로직을 고도화하고 에러 메시지를 구체화하여 프로젝트 품질을 높일 수 있습니다.