export enum GPTRequestQuery {
  SUMMARY = '이 글에 대하여 세 문장 이내로 요약한 것을 json 형식으로 전달해 줘. 요약은 친구에게 들은 경험을 그랬구나, 의 느낌으로 내가 생각해서 말해주는 느낌으로 전달해 줘. Key 값의 경우는 요약은 response로 총 1개의 key 값을 갖도록 전달해 줘',
  COMMON_RESPONSE = '라는 문장에 대하여 친구의 이야기를 듣는 상황에서의 일상적인 대답을 json 형식으로 전달해 줘. Key 값의 경우는 요약은 response로 총 1개의 key 값을 갖도록 전달해 줘',
  HAPPY_RESPONSE = '라는 문장에 대하여 친구의 이야기를 들을 때 공감하는 느낌으로 긍정적 뉘앙스의 답변을 json 형식으로 전달해 줘. Key 값의 경우는 요약은 response로 총 1개의 key 값을 갖도록 전달해 줘',
  SENTIMENT_RESPONSE = '이 감정에 대해 친구에게 해주는 답변 문장 한 개와 이 문장을 긍정적인 관점으로 변화시킨 문장 예시를 3개 말해줘. 응답의 경우는 json 형식으로 전달해 줘. Key 값의 경우는 답변은 response로 문장 예시의 경우는 positive로 설정해서 전달해 줘 총 2개의 key 값을 갖도록 전달해 줘',
  TRANSFORM_CONFIRM = '로 바꾸겠다고 할 때 해 줄수 있는 긍정적이고 적절한 답변을 제안해 줘.\n응답의 경우는 json 형식으로 전달해 줘. Key 값의 경우는 요약은 response로 총 1개의 key 값을 갖도록 전달해 줘',
}

export enum reqTypeNames {
  'COMMON_RESPONSE' = 'COMMON_RESPONSE',
  'HAPPY_RESPONSE' = 'HAPPY_RESPONSE',
  'SENTIMENT_RESPONSE' = 'SENTIMENT_RESPONSE',
  'TRANSFORM_CONFIRM' = 'TRANSFORM_CONFIRM',
}

export enum GPTSentimentQuery {
  HAPPY = '행복',
  SURPRISE = '놀람',
  NEUTRAL = '중립',
  SAD = '슬픔',
  DISGUEST = '꺼림',
  ANGER = '분노',
  FEAR = '두려움',
}
