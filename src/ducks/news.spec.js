import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import newsReducer, {
  getNewsAsync,
  selectCurrentNewsItems,
  selectCurrentPage,
  selectCurrentTotal,
  PAGE_SIZE,
} from './news';

const mockAxios = new MockAdapter(axios);

const sampleNewsItems = [1, 2, 3, 4, 5].map((idx) => ({
  objectID: idx.toString(),
  title: `News ${idx}`,
  url: `http://news${idx}.test`,
  points: idx * 10,
  num_comments: idx * 6,
  author: `Author ${idx}`,
  created_at: `2020-04-0${idx}T03:09:30.000Z`,
}));

const rootReducer = combineReducers({
  news: newsReducer,
});

let store;

describe('news ducks', () => {
  beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should prepare correct default state', () => {
    expect(selectCurrentNewsItems(store.getState())).toEqual([]);
    expect(selectCurrentPage(store.getState())).toEqual(1);
    expect(selectCurrentTotal(store.getState())).toEqual(0);
  });

  describe('getNewsAsync', () => {
    it('fetches getNewsAsync correctly and update correct state', async () => {
      mockAxios.onGet('https://hn.algolia.com/api/v1/search', {
        params: {
          page: 2,
          query: 'Hello World',
          hitsPerPage: PAGE_SIZE,
          tags: 'story',
        },
      }).reply(200, {
        hits: sampleNewsItems,
        hitsPerPage: PAGE_SIZE,
        nbPages: 11,
      });

      await store.dispatch(getNewsAsync({
        page: 3,
        searchQuery: 'Hello World',
      }));

      expect(selectCurrentNewsItems(store.getState())).toEqual(sampleNewsItems);
      expect(selectCurrentPage(store.getState())).toEqual(3);
      expect(selectCurrentTotal(store.getState())).toEqual(66);
    });
  });
});
