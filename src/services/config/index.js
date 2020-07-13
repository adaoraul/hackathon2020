export const isProduction = process.env.NODE_ENV === 'production';

export default {
  api: {
    base: isProduction
      ? ''
      : 'http://localhost:8082',
    ideas: '/ideas',
    members: '/members'
  }
};
