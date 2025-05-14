# weebur-frontend-task

이 프로젝트는 [Next.js](https://nextjs.org/)를 기반으로 [DummyJSON API](https://dummyjson.com/docs/products)에서 상품 정보를 가져와 표시하고 필터링하는 기능을 제공합니다.

## 프로젝트 개요

이 애플리케이션은 상품 목록을 가져와 사용자에게 다음 기능을 제공합니다.
- 리스트 또는 그리드 형태로 상품 보기
- 상품명으로 검색하기
- 별점 높은 순으로 정렬하기
- 무한 스크롤로 상품 목록 탐색하기

## 주요 사용 기술

- **프레임워크:** Next.js (App Router)
- **UI:** React, Tailwind CSS, shadcn/ui
- **상태 관리/데이터 페칭:** React Query (`@tanstack/react-query`)
- **HTTP 클라이언트:** Axios
- **유틸리티 훅:** usehooks-ts
- **알림:** react-toastify

## 시작하기

먼저, 필요한 의존성을 설치합니다.

```bash
yarn install
```

그다음, 개발 서버를 실행합니다.

```bash
yarn dev
```
```localhost:3000``` 으로 접속합니다.