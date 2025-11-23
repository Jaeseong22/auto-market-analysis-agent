# AI 기반 자동 시장성 분석 에이전트  
**Auto Market Analysis Agent**

AI 기반 자동 시장성 분석 에이전트는 사용자가 입력한 프로젝트 폼 데이터를 기반으로,
해당 시장의 시장성을 RAG와 LLM System Prompt를 활용해 자동으로 분석하는 오픈소스 에이전트입니다.

KOSIS(통계청) API로 수집한 데이터를 Qdrant Vector Store에 저장하기 위해
4096 토큰 단위로 청크를 분할하고, 이를 Upstage Embeddings의 요구 스펙에 정확히 맞춰 최적화했습니다.

생성된 분석 결과는 사용자의 노션에 자동 정리되며,
HTML 형식의 보고서로도 즉시 다운로드할 수 있습니다.

이 프로젝트는 기업이나 개인이 새로운 서비스·사업을 기획할 때 필수적으로 수행해야 하는
시장 규모·트렌드·경쟁사 분석 등 초기 시장 조사 과정을 완전 자동화하기 위해 설계되었습니다.
AI 기반 분석 에이전트가 데이터를 수집 → 해석 → 구조화 → 보고서화까지 일괄 처리하여,
프로젝트 착수 전 의사결정의 속도와 정확성을 크게 높여줍니다.

---

# 주요 기능 하이라이트

- GPT 기반 프로젝트 요약 자동 생성  
- RAG(Qdrant) 기반 시장 데이터 분석  
- JSON 스키마 기반 구조화 LLM 파서  
- HTML → Markdown → Notion 자동 페이지 생성  
- n8n 전체 파이프라인 자동화 구성  

---

#  왜 이런 기술 스택을 선택했는가?

##  왜 Qdrant(VectorDB)를 사용했는가?

| 필요한 기능 | Qdrant를 선택한 이유 |
|------------|--------------------------|
| 빠른 벡터 검색 | Rust 기반 엔진으로 매우 빠름 |
| Embedding 기반 RAG 구축 | Dense vector 검색에 최적화 |
| 필터링 + payload 저장 | 메타데이터 결합 편리 |
| 호스팅/온프레미스 모두 지원 | 개발 및 배포 환경 유연 |
| 비용 효율성 | 완전한 오픈소스 + Docker 기반 손쉬운 배포로 초기 비용이 거의 없음 |
| n8n + LangChain과의 궁합 | 플러그인 연동 자연스러움 |

**결론:**  
시장 분석 자동화에서는 *“유사 산업 데이터, 경쟁사 정보, 산업 트렌드”* 같은 비정형 정보를 벡터 검색해야 함 → **RAG는 필수**.  
그중 **Qdrant는 속도·안정성·유연성·비용 효율성 모두 잡혀 있어 최적의 선택**이었습니다.

---

##  왜 OpenAI GPT-4.1 / 4.1-mini를 사용했는가?

| 요구 사항 | GPT 모델을 선택한 이유 |
|-----------|-------------------------|
| 구조화된 JSON 출력 필요 | GPT-4.1은 JSON 안정성이 매우 강함 |
| 자연스러운 프로젝트 요약 | 한국어·영어 혼합 콘텐츠 처리 품질 우수 |
| 스키마 기반 파싱 | GPT-4.1의 reasoning/분류 능력이 뛰어남 |
| Notion block 생성 | Markdown/HTML 변환 시 오류 적음 |
| Hallucination 억제 | 규칙 기반 JSON 파서 설계에 적합 |

**결론:**  
**“정확한 JSON + 자연어 요약 + 포맷 안정성”**을 모두 충족하는 모델은 GPT 계열뿐이었기 때문에 선택.

---

# 시스템 아키텍처

User Input (Project JSON)

↓

n8n Webhook

↓

LLM Summary (GPT-4.1-mini)

↓

RAG Search (Qdrant Vector DB)

↓

Structured Parsing (GPT-4.1)

↓

HTML Render (Template)

↓

Markdown Conversion

↓

Notion API Upload

↓

Notion Market Analysis Page 생성

전체 아키텍쳐 Workflow
<img width="1294" height="256" alt="Image" src="https://github.com/user-attachments/assets/81a4947e-1ea9-49e0-a8b0-4c326ee62955" />
---

# 기술 스택

### • AI / LLM  
OpenAI GPT-4.1, GPT-4.1-mini  
(Structured JSON Parsing + Natural Language Summary)

### • RAG / Vector Search  
Qdrant, Upstage Embeddings  

### • Workflow Automation  
n8n  

### • Document Automation  
Notion API  

---

# 주요 기능

## 1) 서비스 입력 자동 요약  
GPT-4.1-mini가 프로젝트 목적·문제·핵심 기능·타겟층을  
**자연스러운 3~5문장**으로 요약.

---

## 2) 시장 분석 자동 생성 (RAG 기반)

- 시장 규모  
- 산업 트렌드  
- 경쟁사  
- 기회/위험 요소  
- 사업 모델  
- ROI 분석  

→ 모두 **스키마 기반 structured JSON**으로 자동 생성.

---

## 3) JSON 파싱 안정성 극대화

- 스키마 강제 (`output must be valid JSON`)  
- Markdown 제거  
- ROI 필드 검증  
- JSON 이외 출력 금지  
- stop-gradient 처리  

---

## 4) 리포트 자동 생성  
**HTML → Markdown → Notion Block(JSON)** 으로 변환  
→ Notion API 업로드 자동화

---

## 5) 완전 자동화 Pipeline  
입력 후 **약 8초 안에 최종 Notion 페이지 생성**.

---

# 나의 기여도
	•	전체 시스템 아키텍처 설계
	•	n8n 기반 자동화 파이프라인 구축
	•	GPT JSON 구조화 파서 직접 개발
	•	Qdrant 기반 시장 RAG 검색 시스템 구축
	•	HTML → Markdown → Notion block 변환 시스템 구축
	•	GitHub + Lovable 자동 동기화 환경 구성
