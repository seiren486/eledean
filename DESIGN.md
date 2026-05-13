---
name: Data Analytics Design System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#5c403c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#916f6b'
  outline-variant: '#e6bdb8'
  surface-tint: '#bf0715'
  primary: '#b70011'
  on-primary: '#ffffff'
  primary-container: '#dc2626'
  on-primary-container: '#fff6f5'
  inverse-primary: '#ffb4ab'
  secondary: '#555f6d'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f1'
  on-secondary-container: '#596372'
  tertiary: '#525a64'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b727d'
  on-tertiary-container: '#f5f7ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#d9e3f4'
  secondary-fixed-dim: '#bdc7d8'
  on-secondary-fixed: '#121c28'
  on-secondary-fixed-variant: '#3e4755'
  tertiary-fixed: '#dce3f0'
  tertiary-fixed-dim: '#c0c7d3'
  on-tertiary-fixed: '#151c25'
  on-tertiary-fixed-variant: '#404752'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  section-gap: 48px
  element-gap: 16px
---

## Brand & Style

이 디자인 시스템은 데이터 기반의 의사결정을 지원하는 **신뢰성(Reliability)**과 **명확성(Clarity)**을 핵심 가치로 합니다. 복잡한 데이터를 다루는 전문가들을 위해 불필요한 시각적 노이즈를 제거한 **현대적 미니멀리즘(Modern Minimalism)** 스타일을 채택합니다.

전체적인 인터페이스는 화이트와 라이트 그레이의 레이어링을 통해 깊이감을 부여하며, 정교하게 선택된 레드 액센트 컬러를 통해 사용자의 시선을 중요한 지표와 행동 유도 버튼으로 유도합니다. 전문적이고 우아하며, 데이터의 가독성을 최우선으로 고려한 정제된 사용자 경험을 제공합니다.

## Colors

색상 체계는 데이터 가독성을 극대화하기 위해 절제된 팔레트를 사용합니다.

*   **Primary (Sophisticated Red):** `#dc2626` (Tailwind Red-600)을 핵심 지표, 활성 상태, 주요 CTA 버튼에 사용합니다. 이 색상은 분석 리포트에서 가장 중요한 통찰을 강조하는 역할을 합니다.
*   **Surface:** 배경은 `#ffffff`로 설정하여 깨끗한 캔버스를 제공하며, 섹션 구분이나 카드 배경에는 `#f9fafb`를 사용하여 미세한 층위를 형성합니다.
*   **Neutral:** 텍스트와 보조 아이콘에는 그레이 스케일을 적용합니다. 본문은 `#374151`, 보조 텍스트는 `#6b7280`을 사용하여 시각적 위계를 관리합니다.
*   **Data Vis:** 차트에서는 Primary Red를 메인 데이터로 사용하고, 비교군은 `#9ca3af`(Light Gray)나 `#4b5563`(Slate Gray)와 같은 무채색을 활용하여 대비를 높입니다.

## Typography

가독성이 뛰어난 **Inter** 폰트를 기반으로 시스템을 구축합니다. 한국어 환경에서도 균형 잡힌 가독성을 제공하도록 자간과 행간을 정밀하게 조정합니다.

*   **Headlines:** 굵고 명확한 볼드체(700)를 사용하여 대시보드의 각 섹션을 구분합니다. 상단 타이틀은 약간의 음수 자간(-0.02em)을 적용하여 밀도 있는 느낌을 줍니다.
*   **Body:** 본문은 충분한 행간을 확보하여 긴 수치 데이터나 설명을 읽을 때 피로도를 낮춥니다.
*   **Numeric Data:** 수치 정보는 가독성을 위해 폰트 가중치를 조절하거나 레이블과의 크기 대비를 확실히 합니다.

## Layout & Spacing

이 디자인 시스템은 **Fixed-Fluid Hybrid Grid** 모델을 따릅니다. 데스크탑에서는 12컬럼 시스템을 사용하며 최대 너비를 제한하여 대형 모니터에서도 시선 확산을 방지합니다.

*   **Whitespace:** Shadcn/ui의 철학에 따라 여백을 관대하게 사용합니다. 카드 사이의 간격과 섹션 간의 수직 간격을 넓게 설정하여 데이터 간의 논리적 구분을 명확히 합니다.
*   **Consistency:** 모든 간격은 4px 또는 8px의 배수를 기본 단위로 사용하여 정렬된 리듬감을 유지합니다.
*   **Responsive:** 모바일 환경에서는 1컬럼으로 리플로우되며, 마진을 16px로 축소하여 콘텐츠 공간을 확보합니다.

## Elevation & Depth

물리적인 그림자보다는 **Subtle Borders**와 **Tonal Layers**를 통해 깊이감을 표현합니다.

*   **Borders:** 모든 컨테이너와 카드는 `1px solid #e5e7eb` 테두리를 가집니다. 이는 플랫한 디자인에 구조적인 명확성을 부여합니다.
*   **Shadows:** 카드가 강조되어야 하거나 인터랙션이 발생할 때만 매우 부드럽고 투명도가 낮은 소프드 섀도우를 사용합니다. (e.g., `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)`)
*   **Layering:** 메인 배경(`white`) 위에 보조 섹션(`f9fafb`)을 배치하여 정보를 계층화합니다.

## Shapes

이 시스템은 전문적이고 신뢰감 있는 인상을 주기 위해 **Soft (0.25rem / 4px)** 곡률을 기본으로 합니다.

*   **Components:** 버튼, 입력 필드, 카드는 모두 4px의 둥근 모서리를 적용하여 절제된 현대미를 유지합니다.
*   **Larger Elements:** 모달 창이나 대형 대시보드 카드의 경우 8px(`rounded-lg`)까지 확장하여 시각적 안정감을 제공합니다.
*   **Data Markers:** 차트의 데이터 포인트나 상태 표시 칩(Chip) 등 작은 요소는 기하학적 형태를 유지하여 정밀함을 강조합니다.

## Components

*   **Buttons:** Primary 버튼은 `#dc2626` 배경에 화이트 텍스트를 사용합니다. 호버 시에는 약간 더 어두운 톤으로 변화하며, 텍스트 버튼은 최소한의 패딩과 함께 사용합니다.
*   **Cards:** 분석 대시보드의 기본 단위입니다. 흰색 배경, 미세한 테두리, 그리고 매우 옅은 그림자를 조합하여 데이터 시각화 결과물을 담습니다.
*   **Input Fields:** 입력창은 포커스 시 Primary Red 컬러의 테두리와 옅은 아웃라인 글로우를 사용하여 활성 상태를 명확히 알립니다.
*   **Charts (Recharts style):**
    *   주요 선 그래프는 Primary Red를 사용하고 굵기를 2px로 설정합니다.
    *   그리드 라인은 매우 연한 회색을 사용하여 데이터 흐름을 방해하지 않도록 합니다.
    *   툴팁은 다크 그레이 배경에 화이트 텍스트로 가독성을 확보합니다.
*   **Data Tables:** 행 사이의 경계선을 최소화하고 충분한 세로 패딩을 주어 많은 양의 정보도 쉽게 훑어볼 수 있도록 설계합니다.