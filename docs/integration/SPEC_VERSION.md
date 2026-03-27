# Yuhan Suite 통합 스펙 버전

| 필드 | 값 |
|------|-----|
| **integration_spec** | `0.4.4` |
| **대상** | [openapi-yuhan-suite.yaml](./openapi-yuhan-suite.yaml), [events-catalog.md](./events-catalog.md), [asyncapi-events.yaml](./asyncapi-events.yaml) (동기화 단위) |
| **BFF 참조** | [apps/api](../../apps/api) (`package.json` version과 독립) |

## 버전 올리기

- **patch**: 오타, 설명, 예시만 변경.
- **minor**: 새 엔드포인트·이벤트 추가, 기존 필드 optional 추가.
- **major**: 경로 제거, 필수 필드 추가로 **깨지는** 변경.

BFF 코드 변경 시 이 파일과 OpenAPI를 **같은 PR**에서 갱신하는 것을 원칙으로 합니다.
