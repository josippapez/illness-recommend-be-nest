const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_ACCESS_TOKEN_EXPIRATION_TIME':
        return '3600';
      case 'JWT_ACCESS_TOKEN_SECRET':
        return '2F423F4528482B4D6251655468576D5A';
      case 'JWT_REFRESH_TOKEN_SECRET':
        return '2F423F4528482B4D6251655468576D5A';
      case 'JWT_SECRET':
        return '2F423F4528482B4D6251655468576D5A';
    }
  },
};

export default mockedConfigService;
