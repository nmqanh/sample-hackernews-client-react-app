import React from 'react';
import { render } from '@testing-library/react';
import { UserOutlined } from '@ant-design/icons';
import IconText from './component';

describe('<IconText />', () => {
  describe('snapshots', () => {
    it('should render IconText correctly', () => {
      const { container } = render(
        <IconText
          href="http://localhost.test"
          icon={UserOutlined}
          text="Sample Text"
        />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
