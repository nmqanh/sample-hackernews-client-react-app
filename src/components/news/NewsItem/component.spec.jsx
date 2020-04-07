import React from 'react';
import { advanceTo, clear } from 'jest-date-mock';
import { render } from '@testing-library/react';
import NewsItem from './component';

const sampleNewsItem = {
  objectID: '12345',
  title: 'This is a good news',
  url: 'http://localhost.test',
  points: 20,
  num_comments: 10,
  author: 'Bob',
  created_at: '2020-04-05T03:09:30.000Z',
};

describe('<NewsItem />', () => {
  describe('snapshots', () => {
    beforeAll(() => {
      advanceTo(new Date(2020, 3, 7, 0, 0, 0));
    });

    afterAll(() => {
      clear();
    });

    it('should render NewsItem correctly', () => {
      const { container } = render(
        <NewsItem
          item={sampleNewsItem}
        />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
