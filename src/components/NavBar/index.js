import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Label, Menu, Search } from 'semantic-ui-react';
import config from '../../config/config';
import { openMenu } from './actions';
import { getCart } from '../../views/Cart/reducer';
import './NavBar.css';
import list from '../ProductsList';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.showSidebar = this.showSidebar.bind(this);
  }

  getQuantity() {
    const cart = this.props.cart;
    return cart.reduce((quantity, item) => item.quantity + quantity, 0);
  }

  showSidebar(e) {
    e.stopPropagation();
    this.props.openMenu();
  }

  handleResultSelect(e) {
    alert('1');
  }

  handleSearchChange(e) {
    alert(e.getValue());
  }

  render() {
    return (
      <Segment basic color="purple" inverted size="small" className="nav-bar">
        <Menu fluid secondary>
          <Menu.Item onClick={this.showSidebar} fitted>
            <Icon name="content" size="large" onClick={this.showSidebar} className="shop-icon" />
          </Menu.Item>
          <Menu.Item className="shop-name" fitted>
            <Link to="/">{config.SHOP_NAME}</Link>
          </Menu.Item>
          <Menu.Item className="search-bar" fitted>
              <Search className={"theking"} id={"test"}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  onSelectionChange={this.handleSelectionChange}
                  minCharacters={3}
                  autoComplete={"on"}
              />
          </Menu.Item>
          <Menu.Item position="right" fitted>
            <Menu.Item fitted>
              <Icon.Group>
                <Link to="/cart" className="cart-link">
                  <Icon name="cart" size="large" className="shop-icon" />
                  {_.isEmpty(this.props.cart) ? null : (
                    <Label color="orange" size="mini" floating circular content={this.getQuantity()} className="cart-counter" />
                  )}
                </Link>
              </Icon.Group>
            </Menu.Item>
          </Menu.Item>
        </Menu>
      </Segment>
    );
  }
}

NavBar.propTypes = {
  openMenu: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  cart: getCart(state.cart),
});

export default connect(mapStateToProps, { openMenu })(NavBar);
