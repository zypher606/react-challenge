import React from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import ProductsComponent from './components/products.component';


function ProductModule(routeProps: RouteComponentProps) {
    return (
        <Router basename={routeProps.match.path}>
            <Route exact path="/all" component={ProductsComponent} />
            <Redirect from="**" to="/all" />
        </Router>
    );
}

// Module export
export default ProductModule;
// Component export
export { ProductsComponent };
