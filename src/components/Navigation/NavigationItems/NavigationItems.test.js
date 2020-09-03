import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {NavigationItems} from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import Typography from '@material-ui/core/Typography';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it('should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it('contains a logout button', () => {
    wrapper.setProps({ isAuthenticated: true, desktop: true });
    expect(wrapper.contains(<NavigationItem desktop={true} onClick={ null} link='/logout'><Typography variant='button' style={{fontWeight: 'bold'}}>Logout</Typography></NavigationItem>)).toEqual(true);
  });
});
