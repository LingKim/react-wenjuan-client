import Mock from 'mockjs'

Mock.mock('/api/test', 'get', () => {
  return {
    errno: 0,
    data: {
      name: `李大仙${Date.now()}`,
    },
  }
})
