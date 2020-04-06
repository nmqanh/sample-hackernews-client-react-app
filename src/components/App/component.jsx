import React from 'react';
import { Layout } from 'antd';
import NewsList from '../news/NewsList';

const { Content } = Layout;

const App = () => (
  <div>
    <Content style={{ padding: 25 }}>
      <NewsList />
    </Content>
  </div>
);

export default App;
