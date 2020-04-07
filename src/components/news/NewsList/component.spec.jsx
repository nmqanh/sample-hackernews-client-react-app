import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, fireEvent, act } from '@testing-library/react';
import { advanceTo, clear } from 'jest-date-mock';
import NewsList from './component';
import { waitForTimeout } from '../../../../tests/helpers';

const sampleNewsItems = [1, 2, 3, 4, 5].map((idx) => ({
  objectID: idx.toString(),
  title: `News ${idx}`,
  url: `http://news${idx}.test`,
  points: idx * 10,
  num_comments: idx * 6,
  author: `Author ${idx}`,
  created_at: `2020-04-0${idx}T03:09:30.000Z`,
}));

const defaultProps = {
  currentNewsItems: [],
  currentPage: 1,
  currentTotal: 0,
  isLoadingNews: false,
  getNewsAsync: jest.fn(),
};

describe('<NewsList />', () => {
  it('expects to show loading animation when loading', () => {
    const { container } = render(<NewsList {...defaultProps} isLoadingNews />);
    expect(container.getElementsByClassName('ant-spin-spinning').length).toEqual(1);
  });

  it('expects call getNewsAsync one time onLoad', () => {
    const { getNewsAsync } = defaultProps;
    render(<NewsList {...defaultProps} />);
    expect(getNewsAsync).toHaveBeenCalledWith({ page: 1 });
    expect(getNewsAsync).toHaveBeenCalledTimes(1);
  });

  it('expects to re-call getNewsAsync with the clicked page', () => {
    const { getNewsAsync } = defaultProps;
    const { container } = render(
      <NewsList
        {...defaultProps}
        currentPage={1}
        currentTotal={10}
      />,
    );
    expect(getNewsAsync).toHaveBeenCalledWith({ page: 1 });
    expect(getNewsAsync).toHaveBeenCalledTimes(1);
    fireEvent.click(container.getElementsByClassName('ant-pagination-item-2')[0]);
    expect(getNewsAsync).toHaveBeenCalledWith({ page: 2 });
    expect(getNewsAsync).toHaveBeenCalledTimes(2);
  });

  it('expects to re-call getNewsAsync with entererd search query and reset currentPage to 1', async () => {
    const { getNewsAsync } = defaultProps;
    const { container } = render(
      <NewsList
        {...defaultProps}
        currentPage={2}
        currentTotal={10}
      />,
    );
    expect(getNewsAsync).toHaveBeenCalledWith({ page: 1 });
    expect(getNewsAsync).toHaveBeenCalledTimes(1);
    await act(async () => {
      await fireEvent.change(container.querySelector('#searchTxt'), { target: { value: 'Test Search' } });
      await waitForTimeout(600);
    });
    expect(getNewsAsync).toHaveBeenCalledWith({ page: 1, searchQuery: 'Test Search' });
    expect(getNewsAsync).toHaveBeenCalledTimes(2);
  });

  describe('snapshots', () => {
    beforeAll(() => {
      advanceTo(new Date(2020, 3, 7, 0, 0, 0));
    });

    afterAll(() => {
      clear();
    });

    // Follow are two examples to compare between full snapshot and shallow rendering snapshot
    // Based on what the development needs, they can mix solutions and decide when to use which
    it('expects to render correctly with given list of items', () => {
      const { container } = render(
        <NewsList
          {...defaultProps}
          currentPage={1}
          currentTotal={10}
          currentNewsItems={sampleNewsItems}
        />,
      );

      expect(container).toMatchSnapshot();
    });

    it('expectss to render the shallow rendering correctly with given list of items', () => {
      const renderer = new ShallowRenderer();
      renderer.render(
        <NewsList
          {...defaultProps}
          currentPage={1}
          currentTotal={10}
          currentNewsItems={sampleNewsItems}
        />,
      );
      const result = renderer.getRenderOutput();
      expect(result).toMatchSnapshot();
    });
  });
});
