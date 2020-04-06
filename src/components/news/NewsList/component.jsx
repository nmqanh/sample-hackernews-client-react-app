import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { List, Input } from 'antd';
import debounce from 'lodash.debounce';

import NewsItem, { ItemPropType } from '../NewsItem';
import { PAGE_SIZE } from '../../../ducks/news';

const { Search } = Input;

const NewsList = ({
  currentNewsItems,
  currentPage,
  currentTotal,
  isLoadingNews,
  getNewsAsync,
}) => {
  useEffect(() => {
    getNewsAsync({ page: 1 });
  }, [getNewsAsync]);

  const handleSearchDelay = useCallback(debounce((value) => {
    getNewsAsync({ page: currentPage, searchQuery: value });
  }, 500), []);

  const handleSearch = (e) => {
    handleSearchDelay(e.target.value);
  };

  return (
    <>
      <Search size="large" placeholder="input search text" onChange={handleSearch} enterButton />
      <List
        loading={isLoadingNews}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            getNewsAsync({ page });
          },
          showSizeChanger: false,
          pageSize: PAGE_SIZE,
          total: currentTotal,
          current: currentPage,
        }}
        dataSource={currentNewsItems}
        renderItem={(item) => (
          <NewsItem item={item} />
        )}
      />
    </>
  );
};

NewsList.propTypes = {
  currentNewsItems: PropTypes.arrayOf(ItemPropType).isRequired,
  currentPage: PropTypes.number.isRequired,
  currentTotal: PropTypes.number.isRequired,
  isLoadingNews: PropTypes.bool.isRequired,
  getNewsAsync: PropTypes.func.isRequired,
};

export default NewsList;
