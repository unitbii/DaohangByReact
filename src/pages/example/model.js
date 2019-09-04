export default {
  namespace: 'example',
  state: {
    list: [{ name: '产品1', category: '分类1' }, { name: '产品2', category: '分类2' }],
  },
  effects: {
    init({ payload = {} }, { put, call }) {
      // yield put({type: 'fetch'});
      return true;
    },
  },
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
