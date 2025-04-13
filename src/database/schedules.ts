const schedules = [
  {
    id: 1,
    title: '점심미팅',
    content: '안녕하세요',
    startDate: '2025-04-11T10:00:00',
    endDate: '2025-04-11T10:00:00',
    isAllDay: false,
    style: {
      color: 'primary.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 2,
    title: '저녁미팅',
    content: '안녕하세요',
    startDate: '2025-04-11T18:00:00',
    endDate: '2025-04-18T20:00:00',
    isAllDay: false,
    style: {
      color: 'primary.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 3,
    title: '영화보는 날',
    content: '안녕하세요',
    startDate: '2025-04-15T18:00:00',
    endDate: '2025-04-15T20:00:00',
    isAllDay: false,
    style: {
      color: 'primary.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },

  {
    id: 4,
    title: '화이팅!',
    content: '안녕하세요',
    startDate: '2025-04-29T18:00:00',
    endDate: '2025-05-01T20:00:00',
    isAllDay: false,
    style: {
      color: 'primary.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 5,
    title: '무슨 날일까요',
    content: '안녕하세요',
    startDate: '2025-03-31T18:00:00',
    endDate: '2025-04-02T20:00:00',
    isAllDay: false,
    style: {
      color: 'feedback.error.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 6,
    title: '바쁜날',
    content: '안녕하세요',
    startDate: '2025-04-01T18:00:00',
    endDate: '2025-04-05T20:00:00',
    isAllDay: true,
    style: {
      color: 'feedback.info.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 7,
    title: '바쁜날2',
    content: '안녕하세요',
    startDate: '2025-04-16T18:00:00',
    endDate: '2025-04-17T20:00:00',
    isAllDay: false,
    style: {
      color: 'feedback.info.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 8,
    title: '테스트',
    content: '안녕하세요',
    startDate: '2025-04-08T17:00:00',
    endDate: '2025-04-09T20:00:00',
    isAllDay: true,
    style: {
      color: 'feedback.info.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 9,
    title: '테스트',
    content: '안녕하세요',
    startDate: '2025-04-08T17:00:00',
    endDate: '2025-04-09T20:00:00',
    isAllDay: false,
    style: {
      color: 'feedback.info.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 10,
    title: '명상의 날2',
    content: '안녕하세요',
    startDate: '2025-04-14T19:00:00',
    endDate: '2025-04-17T21:00:00',
    isAllDay: true,
    style: {
      color: 'primary.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 11,
    title: '명상의 날3',
    content: '안녕하세요',
    startDate: '2025-04-14T22:00:00',
    endDate: '2025-04-17T23:00:00',
    isAllDay: false,
    style: {
      color: 'primary.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 12,
    title: '명상의 날4',
    content: '안녕하세요',
    startDate: '2025-04-14T15:00:00',
    endDate: '2025-04-17T16:00:00',
    isAllDay: false,
    style: {
      color: 'primary.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 13,
    title: '최고의 날',
    content: '안녕하세요',
    startDate: '2025-04-14T21:00:00',
    endDate: '2025-04-17T22:00:00',
    isAllDay: false,
    style: {
      color: 'primary.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 14,
    title: '오오',
    content: '안녕하세요',
    startDate: '2025-04-15T21:00:00',
    endDate: '2025-04-15T22:00:00',
    isAllDay: true,
    style: {
      color: 'primary.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 15,
    title: '오오오',
    content: '안녕하세요',
    startDate: '2025-04-15T21:00:00',
    endDate: '2025-04-15T22:00:00',
    isAllDay: true,
    style: {
      color: 'primary.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  },
  {
    id: 16,
    title: '명상의 날7',
    content: '안녕하세요',
    startDate: '2025-04-17T22:30:00',
    endDate: '2025-04-17T24:00:00',
    isAllDay: false,
    style: {
      color: 'primary.main'
    },
    createdAt: '2025-04-12T10:00:00',
    updatedAt: '2025-04-12T10:00:00'
  }
];

export default schedules;
