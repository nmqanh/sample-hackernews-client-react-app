import axios from 'axios';
import { createAction, createReducer } from 'redux-act';

const HN_API_URL = 'https://hn.algolia.com/api/v1/search';
export const PAGE_SIZE = 6;

// Actions
const getNewsCompleted = createAction('news/get');
const setLoadingStatus = createAction('news/load/status');

// Async Actions
export const getNewsAsync = ({ page = 1, searchQuery = undefined }) => async (dispatch) => {
  await dispatch(setLoadingStatus(true));
  const axiosConfig = {
    url: HN_API_URL,
    method: 'GET',
    params: {
      page: page - 1,
      query: searchQuery,
      hitsPerPage: PAGE_SIZE,
      tags: 'story',
    },
    json: true,
  };

  const { data } = await axios(axiosConfig);
  await dispatch(getNewsCompleted({
    currentNewsItems: data.hits,
    currentTotal: data.nbPages * data.hitsPerPage,
    currentPage: page,
  }));
  await dispatch(setLoadingStatus(false));
};

// Initial State
const initialState = {
  currentNewsItems: [],
  currentPage: 1,
  currentTotal: 0,
  isLoadingNews: false,
};

export default createReducer({
  [getNewsCompleted]: (state, nextState) => ({
    ...state,
    ...nextState,
  }),
  [setLoadingStatus]: (state, isLoadingNews) => ({
    ...state,
    isLoadingNews,
  }),
}, initialState);

export const selectCurrentNewsItems = (state) => state.news.currentNewsItems;
export const selectCurrentPage = (state) => state.news.currentPage;
export const selectCurrentTotal = (state) => state.news.currentTotal;
export const selectIsLoadingNews = (state) => state.news.isLoadingNews;
