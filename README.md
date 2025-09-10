# DOU Backend API Server
AI 감정 분석 도우미 서비스, DOU의 메인 API 서버 레포지토리

[📽️ DOU 시연 영상](https://drive.google.com/file/d/1hSAbpaFYzKeULfNx4ukcbTy0-Qf63d1q/view)

[💻 DOU 발표 자료](https://drive.google.com/file/d/1hfUSxAX4w-U8A6k6vghWjUectPvPycOS/view)

## 📋 프로젝트 개요
청년들의 번아웃·불안·우울감 해소를 위한 한국어 음성 기반 감정 분석 및 관리 서비스의 백엔드 API 서버입니다.

사용자의 음성 기반 감정 데이터를 관리하고, ML 서버와 연동하여 감정 분석 결과를 제공합니다.

## 🙋 팀 구성
| 이름 | 깃허브 | 역할 |
| --- | --- | --- |
| 한상은 | [@silvarge](https://github.com/silvarge) | 팀장 / 기획, 백엔드 및 ML 전체 담당 |
| 김가현 | [@gahyunkim](https://github.com/gahyunkim) | 기획, 프론트엔드(안드로이드) 및 디자인 담당 |

## 🛠️ 기술 스택
| 분류 | 내용 |
| --- | --- |
| Framework | NestJS (TypeScript) |
| Database | MySQL (AWS RDS) |
| ORM | TypeORM |
| Authentication | JWT, Bcrypt, Kakao OAuth |
| Deploy & Infra | GitHub Actions, AWS Elastic Beanstalk, AWS Route 53, AWS Certificate Manager |
| Documentation | Swagger | 

## 🚀 주요 기능
### 사용자 관리
- 카카오 OAuth 기반 소셜 로그인
- JWT 토큰 기반 인증/인가
- 토큰 만료 및 리프레시 토큰 자동 갱신

### 감정 분석 관리
- ML 서버와 REST API 연동으로 감정 분석 요청/응답 처리
- 7가지 감정 분류 결과 기반 응답 메시지 분기 처리
- 감정 분석 히스토리 저장 및 조회

### 감정 데이터 관리
- 사용자별 감정 대화 기록 CRUD API
- 감정 달력 데이터 제공
- 분석 결과와 원문 대화 기록 연동 저장

## 🐛 문제 해결 및 개선사항
### 해결된 주요 이슈
- 소셜 로그인 인증 복잡성
  - 토큰 만료 처리 로직 보완
  - 리프레시 토큰 자동 재발급 기능 구현
  - 불필요한 재인증 요청 제거

- API 문서 최신화 문제
  - DTO 변경 시 자동 문서화 프로세스 적용
  - 설명 및 예시 데이터 보강
  - API 연동 오류 0건 달성

## 🏗️ 서비스 아키텍처
``` mermaid
graph TB
    A[Client<br/>Android] <--> B[API Server<br/>NestJS]
    B <--> C[ML Server<br/>Flask]
    B <--> E[GPT-3.5 Turbo API]
    B --> D[(Database<br/>MySQL<br/>-AWS RDS-)]
```

## 📂 프로젝트 구조
``` bash
DOU_Backend/
├── .github/workflows/     # GitHub Actions CI/CD
├── .platform/nginx/       # Elastic Beanstalk 설정
├── src/
│   ├── apis/
│   │   ├── auths/         # 인증/인가 (카카오 OAuth, JWT)
│   │   ├── sentiments/    # 감정 분석 API 연동
│   │   ├── records/       # 대화 기록 및 감정 히스토리
│   │   ├── gpt/          # GPT 응답 처리
│   │   └── users/        # 사용자 관리
│   ├── commons/          # 공통 모듈 (예외처리, 로거, Swagger)
│   └── main.ts
├── test/                 # E2E 테스트
└── package.json
```
