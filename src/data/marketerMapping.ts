export interface MarketerMapping {
  marketerId: string;
  marketerName: string;
  team: string;
}

// 11번가 마케터 매칭.txt 기반 예시 데이터
export const MARKETER_MAPPING: Record<string, MarketerMapping> = {
  "mp2803": {
    marketerId: "mp2803",
    marketerName: "장현민",
    team: "마케팅2팀"
  },
  "mp7167": {
    marketerId: "mp7167",
    marketerName: "김성수",
    team: "1팀"
  },
  // 예시 데이터를 몇 개 추가합니다. 나중에 실제 데이터로 교체 가능합니다.
  "mp1001": {
    marketerId: "mp1001",
    marketerName: "김철수",
    team: "A팀"
  },
  "mp1002": {
    marketerId: "mp1002",
    marketerName: "이영희",
    team: "A팀"
  },
  "mp2001": {
    marketerId: "mp2001",
    marketerName: "박민수",
    team: "B팀"
  },
  "mp2002": {
    marketerId: "mp2002",
    marketerName: "정미경",
    team: "B팀"
  },
  "mp3001": {
    marketerId: "mp3001",
    marketerName: "최승우",
    team: "C팀"
  }
};
