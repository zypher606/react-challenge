import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import React, { Component } from 'react';
import { Product } from '../models/product';

// @ts-ignore
const styles = (theme: Theme) => ({
    root: {
      minWidth: 275,
      height: 300,
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
});

interface DashboardStatsSyllabusProps {
    product: Product
}
  
class ProductCardComponent extends Component<DashboardStatsSyllabusProps> {

    render() {
        // @ts-ignore
      const { classes, product } = this.props;

      // @ts-ignore
      const images = product.images.map((url, index) => {
                            return <img key={index.toString()} src={url} style={{height: 100}} alt={'product-image-' + index.toString()} className="img-responsive" />
                        });
      return (
        <>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {product.sku}
                </Typography>
                <Typography variant="h6" component="h4">
                    {product.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Rs. {product.price}
                </Typography>
                {images}
              </CardContent>
          
            </Card>
        </>
      );
    }
}

export default withStyles(styles)(ProductCardComponent);