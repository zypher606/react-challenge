import { Container, FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import fuzzysort from 'fuzzysort';
import _ from 'lodash';
import React, { Component } from 'react';
import { Product } from '../models/product';
import { productService } from '../services/product.service';
import ProductCardComponent from './product-card.component';

// @ts-ignore
const styles = theme => ({
  root: {
    paddingTop: 200
    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  productimg: {
    maxHeight: 100 
  },
  container: {
    paddingTop: 300
  }
});

interface ProductsComponentState {
  products: Product[],
  searchTerm: string,
  searchResults: Product[],
  isInStockFilter: boolean
}

class ProductsComponent extends Component<ProductsComponentState> {
    
    state = {
      products: [],
      searchTerm: '',
      searchResults: [],
      isInStockFilter: false
    }

    private products: Product[] = [];
    
    componentDidMount() {
      productService.getAllProducts()
      .subscribe(products => {
        this.setState({products: products, searchTerm: '', searchResults: products});
        this.products = products;
      });
    }

    private searchDebounce = _.debounce(e => this.productSearch(), 500);

    handleChange(event: any) {
      this.setState({ searchTerm: event.target.value});
      this.searchDebounce(event.target.value);
    };

    private productSearch() {
      let results: Product[] = []

      if (this.state.searchTerm) {
        const resultsObj = fuzzysort.go(this.state.searchTerm, this.products, {key:'name'})
        results = resultsObj.map(r => r.obj);
      } else {
        results = this.products;
      }
      // const results = this.products.filter(product =>
      //   product.name.toLowerCase().includes(event.target.value)
      // );
      this.setState({products: results});
    }

    isInStockFilterEvent(event: any) {
      this.setState({...this.state, isInStockFilter: event.target.checked})
    }

    componentDidUpdate() {
      
    }

    render() {
      // @ts-ignore
      const { classes } = this.props;

      return (
        <>
          <Container style={{marginTop: '30px'}} className="container" maxWidth="md">
            <Typography variant="h5" align="center" component="h4">
                    Products
            </Typography>

            <Grid container spacing={3}>
              <Grid item sm={6} className={classes.gridFlex}>
                <input
                  type="text"
                  placeholder="Search your product"
                  value={this.state.searchTerm}
                  onChange={ (event) => this.handleChange(event)}
                />
              </Grid>
              <Grid item sm={6} className={classes.gridFlex}>
                <FormControlLabel
                  style={{float: "right"}}
                  control={
                    <Switch
                      checked={this.state.isInStockFilter}
                      onChange={ (event) => this.isInStockFilterEvent(event)}
                      name="isInStockFilter"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  }
                  label="Show products in Stock"
                />
              </Grid>
            </Grid>
            

            
            
            <Grid container justify="center" style={{textAlign: "center"}} spacing={3}>
                {
                  this.state.products
                  .filter((product) => {
                    let p: Product = product;
                    return this.state.isInStockFilter ? (p.is_in_stock === 1) : true;
                  })
                  .map((product, index) => {
                    return (
                      <Grid key={index.toString()} item md={4} sm={6} className={classes.gridFlex}>
                          <ProductCardComponent product={product}/>
                      </Grid>
                    )
                  })
                }
            </Grid>
          </Container>
        </>
      );
    }
}

export default withStyles(styles)(ProductsComponent);