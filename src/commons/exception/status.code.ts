/* eslint-disable prettier/prettier */
import { HttpStatus } from '@nestjs/common';

export const statusCode: { [key: string]: object } = {
  SUCCESS: { status: HttpStatus.OK, code: '2000', message: 'success!' },

  // COMMON Error
  INTERNAL_SERVER_ERROR: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'COMMON000',
    message: '서버 에러, 관리자에게 문의 바랍니다.',
  },
  BAD_REQUEST: { status: HttpStatus.INTERNAL_SERVER_ERROR, code: 'COMMON001', message: '잘못된 요청입니다.' },
  UNAUTHORIZED: { status: HttpStatus.INTERNAL_SERVER_ERROR, code: 'COMMON002', message: '권한이 잘못되었습니다.' },
  METHOD_NOT_ALLOWED: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'COMMON003',
    message: '지원하지 않는 Http Method 입니다.',
  },
  FORBIDDEN: { status: HttpStatus.INTERNAL_SERVER_ERROR, code: 'COMMON004', message: '금지된 요청입니다.' },
  NOT_FOUND: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'COMMON005',
    message: '요청한 페이지를 찾을 수 없습니다. 관리자에게 문의 바랍니다.',
  },

  // /sentiment route 관련 에러
  SENTIMENT_MODEL_NOT_FOUND: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'SENTIMENT001',
    message: '감정분석 모델을 불러올 수 없습니다.',
  },
};
