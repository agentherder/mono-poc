import { render } from '@testing-library/react';

import { Hello } from './Hello';

describe('Shared', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hello />);
    expect(baseElement).toBeTruthy();
  });
});
