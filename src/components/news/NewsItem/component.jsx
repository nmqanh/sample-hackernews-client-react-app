import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { List } from 'antd';
import {
  MessageOutlined,
  ClockCircleOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import IconText from '../../shared/IconText';

const HN_NEWS_URL = 'https://news.ycombinator.com/item?id=';
const HN_USER_URL = 'https://news.ycombinator.com/user?id=';

const NewsItem = ({ item }) => (
  <List.Item
    key={item.title}
    actions={[
      <IconText href={HN_NEWS_URL + item.objectID} icon={StarOutlined} text={(item.points).toString()} key="list-vertical-star-o" />,
      <IconText href={HN_USER_URL + item.author} icon={UserOutlined} text={item.author} key="list-vertical-like-o" />,
      <IconText href={HN_NEWS_URL + item.objectID} icon={ClockCircleOutlined} text={moment(item.created_at).fromNow()} key="list-vertical-time-o" />,
      <IconText href={HN_NEWS_URL + item.objectID} icon={MessageOutlined} text={item.num_comments.toString()} key="list-vertical-message" />,
    ]}
  >
    <List.Item.Meta
      title={<a target="blank" href={item.url}>{item.title}</a>}
      description={<a target="blank" href={item.url}>{item.url}</a>}
    />
  </List.Item>
);

export const ItemPropType = PropTypes.shape({
  objectID: PropTypes.string.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,
  points: PropTypes.number,
  num_comments: PropTypes.number,
  author: PropTypes.string,
  created_at: PropTypes.string,
});

NewsItem.propTypes = {
  item: ItemPropType.isRequired,
};

export default NewsItem;
