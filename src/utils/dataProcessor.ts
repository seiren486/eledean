import Papa from 'papaparse';
import { MARKETER_MAPPING } from '../data/marketerMapping';

export interface ProcessedData {
  date: string; // 매출일자
  memberNo: string; // 회원번호
  advertiserId: string; // 광고주ID
  marketerId: string; // 마케터ID
  marketerName: string; // 마케터명
  team: string; // 팀
  totalRevenue: number; // 전체광고비
  settledRevenue: number; // 정산광고비
}

// 파일 인코딩 감지 및 파싱 유틸리티
const parseFile = (file: File): Promise<any[][]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      encoding: "EUC-KR", // 한국에서 다운받는 엑셀/CSV는 보통 EUC-KR
      complete: (results) => {
        resolve(results.data as any[][]);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const processFiles = async (salesFile: File, advertiserFile: File): Promise<ProcessedData[]> => {
  const salesData = await parseFile(salesFile);
  const advData = await parseFile(advertiserFile);

  // 1. 광고주 데이터 매핑 (회원번호(D열: idx 3) -> 마케터ID(A열: idx 0), 광고주ID(B열: idx 1))
  const advMapping: Record<string, { marketerId: string; advertiserId: string }> = {};
  
  // 첫 줄이 헤더일 수 있으므로 건너뛰기 처리 (휴리스틱: '마케터'나 '회원' 글자가 포함되어 있으면 헤더)
  const isAdvHeader = (row: any[]) => row[0]?.includes('마케터') || row[3]?.includes('회원');
  const advStartIndex = isAdvHeader(advData[0]) ? 1 : 0;

  for (let i = advStartIndex; i < advData.length; i++) {
    const row = advData[i];
    if (row.length < 4) continue;
    const marketerId = row[0]?.trim() || '';
    const advertiserId = row[1]?.trim() || '';
    const memberNo = row[3]?.trim() || '';
    
    if (memberNo) {
      advMapping[memberNo] = { marketerId, advertiserId };
    }
  }

  const processedList: ProcessedData[] = [];
  
  // 2. 매출 데이터 파싱 및 병합
  // A열(idx 0): 매출일자, L열(idx 11): 회원번호, N열(idx 13): 전체귀속매출, O열(idx 14): 정산귀속매출
  const isSalesHeader = (row: any[]) => row[0]?.includes('일자') || row[11]?.includes('회원');
  const salesStartIndex = isSalesHeader(salesData[0]) ? 1 : 0;

  for (let i = salesStartIndex; i < salesData.length; i++) {
    const row = salesData[i];
    if (row.length < 15) continue; // 적어도 O열(14)까지 있어야 함

    const date = row[0]?.trim() || '';
    const memberNo = row[11]?.trim() || '';
    
    // 금액에서 콤마(,) 등 숫자 외 문자 제거
    const parseCurrency = (val: string) => {
      const parsed = parseFloat((val || '').replace(/[^0-9.-]+/g, ''));
      return isNaN(parsed) ? 0 : parsed;
    };

    const totalRevenue = parseCurrency(row[13]);
    const settledRevenue = parseCurrency(row[14]);

    if (!memberNo) continue;

    // 병합
    const advInfo = advMapping[memberNo];
    const marketerId = advInfo?.marketerId || '미분류';
    const advertiserId = advInfo?.advertiserId || '미분류';

    const marketerInfo = MARKETER_MAPPING[marketerId];
    const marketerName = marketerInfo?.name || '미분류';
    const team = marketerInfo?.team || '미분류';

    processedList.push({
      date,
      memberNo,
      advertiserId,
      marketerId,
      marketerName,
      team,
      totalRevenue,
      settledRevenue
    });
  }

  return processedList;
};
