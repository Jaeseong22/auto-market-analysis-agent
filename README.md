# 🚀 AI 기반 자동 시장성 분석 에이전트  
**Auto Market Analysis Agent**

입력된 프로젝트 데이터만으로  
**시장 분석 · 경쟁사 분석 · ROI 분석**을 자동 생성하고 **Notion 페이지까지 자동 업로드**하는  
AI 기반 자동 시장성 분석 시스템입니다.

본 프로젝트는 **n8n + OpenAI GPT-4.1 + Qdrant + Notion API**를 결합하여  
서비스 아이디어 입력 → 자동 분석 → 문서 생성까지 모든 과정을 자동화합니다.

---

# ✨ 주요 기능 하이라이트

- 🧠 GPT 기반 프로젝트 요약 자동 생성  
- 📊 RAG(Qdrant) 기반 시장 데이터 분석  
- 📝 JSON 스키마 기반 구조화 LLM 파서  
- 🌐 HTML → Markdown → Notion 자동 페이지 생성  
- ⚙️ n8n 전체 파이프라인 자동화 구성  
- 🔗 Lovable ↔ GitHub 자동 동기화  

---

# 📌 왜 이런 기술 스택을 선택했는가?

## 🔸 왜 Qdrant(VectorDB)를 사용했는가?

| 필요한 기능 | Qdrant가 딱 맞았던 이유 |
|------------|--------------------------|
| 빠른 벡터 검색 | Rust 기반 엔진으로 매우 빠름 |
| Embedding 기반 RAG 구축 | Dense vector 검색에 최적화 |
| 필터링 + payload 저장 | 메타데이터 결합 편리 |
| 호스팅/온프레미스 모두 지원 | 개발 및 배포 환경 유연 |
| n8n + LangChain과의 궁합 | 플러그인 연동 자연스러움 |

**결론:**  
시장 분석 자동화에서는 *“유사 산업 데이터, 경쟁사 정보, 산업 트렌드”* 같은 비정형 정보를 벡터 검색해야 함 → **RAG는 필수**.  
그중 **Qdrant는 속도·안정성·유연성 모두 잡혀 있어 최적의 선택**이었음.

---

## 🔸 왜 OpenAI GPT-4.1 / 4.1-mini를 사용했는가?

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

# 🧱 시스템 아키텍처

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

---

# 🌐 기술 스택

### • Frontend / Agent UI  
Vite, React, TypeScript, shadcn-ui, Tailwind CSS  

### • AI / LLM  
OpenAI GPT-4.1, GPT-4.1-mini  
(Structured JSON Parsing + Natural Language Summary)

### • RAG / Vector Search  
Qdrant, Upstage Embeddings  

### • Workflow Automation  
n8n  

### • Document Automation  
Notion API  

### • Deployment  
Lovable Publish  

---

# 🔍 주요 기능

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

# 🛠 설치 및 실행 방법

## 1) 저장소 클론
git clone https://github.com/Jaeseong22/auto-market-analysis-agent.git
cd auto-market-analysis-agent

## 2) 의존성 설치

npm install

## 3) 개발 서버 실행

npm run dev

접속:
👉 http://localhost:8080

⸻

# 📦 빌드

npm run build

빌드 미리보기

npm run preview


⸻

# 📁 프로젝트 구조

auto-market-analysis-agent/
├── src/               # React + TypeScript UI
├── n8n-workflow/      # n8n 자동화 workflow (clear.json 포함)
├── prompts/           # LLM prompt 구조
├── public/
├── package.json
└── README.md


⸻

# 🧠 나의 기여도
	•	전체 시스템 아키텍처 설계
	•	n8n 기반 자동화 파이프라인 구축
	•	GPT JSON 구조화 파서 직접 개발 (파싱 실패 0%)
	•	Qdrant 기반 시장 RAG 검색 시스템 구축
	•	HTML → Markdown → Notion block 변환 시스템 구축
	•	GitHub + Lovable 자동 동기화 환경 구성

⸻

# 🚀 배포 방법

Lovable → Share → Publish

Custom Domain 연결
→ Project > Settings > Domains > Connect Domain

⸻

# 📞 Contact
	•	GitHub: https://github.com/Jaeseong22
	•	Email: rmsiddlwotjd@naver.com

⸻
