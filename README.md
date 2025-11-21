⸻

🚀 AI 기반 자동 시장성 분석 에이전트

Auto Market Analysis Agent

입력된 프로젝트 데이터만으로
시장 분석 · 경쟁사 분석 · ROI 분석을 자동 생성하고 Notion 페이지까지 자동 업로드하는
AI 기반 자동 시장성 분석 시스템입니다.

본 프로젝트는 n8n + OpenAI GPT-4.1 + Qdrant + Notion API를 결합하여
서비스 아이디어 입력 → 자동 분석 → 문서 생성까지 모든 과정을 자동화합니다.

⸻

✨ 주요 기능 하이라이트
	•	🧠 GPT 기반 프로젝트 요약 자동 생성
	•	📊 RAG(Qdrant) 기반 시장 데이터 분석
	•	📝 JSON 스키마 기반 구조화 LLM 파서
	•	🌐 HTML → Markdown → Notion 자동 페이지 생성
	•	⚙️ n8n 전체 파이프라인 자동화 구성
	•	🔗 Lovable ↔ GitHub 자동 동기화

⸻

📌 왜 이런 기술 스택을 선택했는가?

🔸 왜 Qdrant(VectorDB) 를 사용했는가?

필요한 기능	Qdrant가 딱 맞았던 이유
빠른 벡터 검색	Rust 기반으로 매우 빠름
Embedding 기반 RAG 구조 구축	Qdrant는 dense vector 검색에 최적화
필터링, payload 저장	메타데이터 결합이 용이
호스팅/로컬 모두 지원	개발/배포 환경 유연
n8n + LangChain과의 궁합	플러그인 연동 자연스러움

결론:
시장 분석 자동화는 “유사 산업 데이터”, “경쟁사 데이터”, “트렌드 정보” 같은
비정형 텍스트 기반 지식이 필요함 → 벡터 기반 검색(RAG)은 필수.
그중 Qdrant는 관리 편하고 빠르며, RAG 구축 성능이 뛰어나서 선택함.

⸻

🔸 왜 OpenAI GPT-4.1 / 4.1-mini 를 사용했는가?

요구 사항	GPT 모델을 선택한 이유
구조화된 JSON 출력이 필요	GPT-4.1은 JSON 구조화 능력이 매우 안정적
프로젝트 요약을 자연어로 생성	GPT 계열이 한국어·영어 혼용 데이터에서 품질 우수
긴 문장을 스키마 기반으로 정확히 파싱	GPT-4.1의 reasoning·분류 능력이 매우 강함
Notion 블록 구조 생성	HTML/Markdown 변환 시 오류가 적고 형식 준수 능력 높음
LLM hallucination 억제	GPT-4.1은 규칙 기반 JSON 파서로 안정성이 뛰어남

결론:
정확한 스키마(JSON) 출력 + 안정적인 요약 + 규칙 기반 파싱이라는
3가지 요구사항을 만족하는 모델이 GPT라 가장 적합했습니다.

⸻

🧱 시스템 아키텍처

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


⸻

🌐 기술 스택
	•	Frontend / Agent UI
Vite, React, TypeScript, shadcn-ui, Tailwind CSS
	•	AI/LLM
OpenAI GPT-4.1, GPT-4.1-mini
(Structured JSON Parsing + Natural Language Summary)
	•	RAG / Vector Search
Qdrant, Upstage Embeddings
	•	Workflow Automation
n8n
	•	Document Automation
Notion API
	•	Deployment
Lovable Publish

⸻

🔍 주요 기능

1) 서비스 입력 자동 요약

GPT-4.1-mini가 프로젝트 목적·문제·핵심 기능·타겟층을
자연스러운 3~5문장으로 요약.

2) 시장 분석 자동 생성 (RAG 기반)
	•	시장 규모
	•	산업 트렌드
	•	경쟁사
	•	기회/위험 요소
	•	사업 모델
	•	ROI 분석

모두 스키마 기반 structured JSON으로 자동 생성.

3) JSON 파싱 안정성 극대화
	•	스키마 강제(output must be valid JSON)
	•	Markdown 제거
	•	ROI 필드 존재 여부 검증
	•	JSON 이외 출력 금지
	•	stop-gradient 문자열 처리

4) 리포트 자동 생성 (HTML → Markdown → Notion Block)

n8n workflow에서 자동 변환하여
Notion API children 구조(JSON)로 업로드.

5) 완전 자동화 Pipeline

입력 후 8초 안에 최종 Notion 페이지 생성.

⸻

🛠 설치 및 실행 방법

1) 저장소 클론

git clone https://github.com/Jaeseong22/auto-market-analysis-agent.git
cd auto-market-analysis-agent

2) 의존성 설치

npm install

3) 개발 서버 실행

npm run dev

→ http://localhost:8080 접속

⸻

📦 빌드

npm run build

빌드 미리보기

npm run preview


⸻

📁 프로젝트 구조

auto-market-analysis-agent/
├── src/               # React + TypeScript UI
├── n8n-workflow/      # n8n 자동화 workflow (clear.json 포함)
├── prompts/           # LLM prompt 구조
├── public/
├── package.json
└── README.md


⸻

🧠 나의 기여도
	•	전체 시스템 아키텍처 설계
	•	n8n 기반 자동화 파이프라인 구축
	•	GPT JSON 구조화 파서 직접 개발
	•	Qdrant 기반 시장 RAG 검색 구축
	•	HTML → Markdown → Notion block 변환 시스템 구축
	•	GitHub + Lovable 환경 동기화

⸻

🚀 배포 방법

Lovable → Share → Publish

Custom Domain
→ Project > Settings > Domains > Connect Domain

⸻

📞 Contact
	•	GitHub: https://github.com/Jaeseong22
	•	Email: rmsiddlwotjd@naver.com
⸻

필요하면 Notion 버전으로도 다시 꾸며줄게!
