import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
} from '@coreui/react';
// routes config
import routes from '../../routes';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getEmployees } from '../../reducers/app/action-creators'

class DefaultLayout extends Component {
  componentDidMount () {
    // just simulate fetching data from some external source
    setTimeout(() => this.props.getEmployees(), 500)
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getEmployees }, dispatch)
export default connect(null, mapDispatchToProps)(DefaultLayout)
