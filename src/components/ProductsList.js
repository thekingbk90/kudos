import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import ProductCard from './ProductCard';
import { productPropType } from '../views/Products/reducer';

class ProductsList extends Component {
    render() {
        const list = this.props.products.map(element => (
            <ProductCard
                key={element.id}
                id={element.id}
                src={element.image}
                name={element.name}
                permalink={'http://35.187.246.124:8081/catalog/product/view/id/'+element.id}
                price={element.price ? element.price : 0}
                // categories={element.category_ids}
            />
        ));
        return (
            <div className="ui segment-content">
                <Header textAlign="center">{this.props.title}</Header>
                {list}
            </div>
        );
    }
}

ProductsList.propTypes = {
    products: PropTypes.arrayOf(productPropType).isRequired,
    title: PropTypes.string.isRequired,
};

export default ProductsList;
