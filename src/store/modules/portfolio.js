/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors

import moment from 'moment-timezone';
import Sort from './utilits/sort';

const state = {
  portfolio: [],
  values: {
    holdings: 0,
    change7d: '0(0.00%)',
    original: 0,
    realised: 0,
  },
};

const mutations = {
  cleanPortfolio(state) {
    state.portfolio = [];
  },
  toogleWindows(state, [type, id]) {
    const object = state.portfolio;
    Object.keys(object).forEach((item) => {
      if (object.indexOf(item) == id) {
        object[item][type] = !object[item][type];
      } else {
        object[item][type] = false;
      }
      if (type === 'deposit') object[item].withdraw = false;
      if (type === 'withdraw') object[item].deposit = false;
    })
  },
  toggleLoading(state, id) {
    const item = state.portfolio[id];
    item.loading = !item.loading;
  },
  pushToPortfolio(state, data) {
    state.portfolio.push(data);
  },
  setValues(state, data) {
    Object.entries(data).forEach((item) => {
      state.values[item[0]] = item[1];
    })
  },
  sort(state, [arr, type]) {
    if (state[arr].length) {
      const array = new Sort(state[arr]);
      const isNumber = array.isNumeric(type);
      if (isNumber) {
        array.sortNumbers(type);
      } else {
        array.sortStrings(type);
      }
    }
  },
  sortDates(state, [arr, type]) {
    if (state[arr].length) {
      const array = new Sort(state[arr]);
      array.sortDates(type);
    }
  },
};

const getters = {
  someOpenWindow: state => state.portfolio.some(item => item.deposit || item.withdraw),
};

// TODO: All of for..in iterations must be replaced by Http requests
const actions = {
  sortPortfolio({ commit }, type) {
    commit('sort', ['portfolio', type]);
  },
  sortPortfolioDates({ commit }, type) {
    commit('sortDates', ['portfolio', type]);
  },
  toggleDeposit({ commit }, id) {
    commit('toogleWindows', ['deposit', id]);
  },
  toggleWithdraw({ commit }, id) {
    commit('toogleWindows', ['withdraw', id]);
  },
  downloadPortfolio({ commit }) {
    for (let i = 0; i < 40; i++) {
      commit('pushToPortfolio', {
        coin: 'btc',
        amount: i + 1,
        exchanges: 'Binance',
        price: `34${i},${i}`,
        day: moment()
          .add(i, 'day')
          .format('DD.MM.YYYY'),
        value: `34${i},${i}`,
        percent: `+10.${i}`,
        depositAddress: `${i}vBMSEYstWetqTFn${i}u4m4GFg7xJaNV${i}`,
        deposit: false,
        withdraw: false,
        loading: false,
        id: i,
      });
    }
  },
  downloadValues({ commit }) {
    const data = {
      holdings: 324,
      change7d: '234(23.4%)',
      original: 244,
      realised: 1234,
    };
    commit('setValues', data);
  },
  downloadAll({ dispatch, commit }) {
    commit('cleanPortfolio');
    dispatch('downloadPortfolio');
    dispatch('downloadValues');
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
