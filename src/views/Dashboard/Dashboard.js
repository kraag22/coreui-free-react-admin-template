import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import Charts from '../Charts'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.onLabelClick = this.onLabelClick.bind(this);

    this.state = {
      sortBy: 'name',
      sortAsc: true,
    }
  }

  onLabelClick(label) {
    let newState = {
      sortBy: label
    }

    if (this.state.sortBy === label) {
      newState.sortAsc = !this.state.sortAsc
    }

    this.setState(newState)
  }

  sortEmployees(employees, sortBy, asc) {
    // slice is used just to clone array
    return employees.slice(0).sort((a, b) => {
      const first = asc ? a : b
      const second = asc ? b : a

      if (sortBy === 'tenure') {
        return first.tenure - second.tenure
      } else {
        return first[sortBy].localeCompare(second[sortBy])
      }
    })
  }

  render() {
    // this could be made more efficient - not sorted on every render
    const sortedEmployees = this.sortEmployees(this.props.employees, this.state.sortBy, this.state.sortAsc)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Users
              </CardHeader>
              <CardBody>
                <Row>
                  <Col col="6" sm="4" md="3" xl className="mb-3 mb-xl-0">
                    <Link to="/add-user">Add employee</Link>
                  </Col>
                </Row>
                <Row>
                  <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="sortable" onClick={() => {this.onLabelClick('name')}}>Name</th>
                    <th className="sortable" onClick={() => {this.onLabelClick('jobTitle')}}>Job title</th>
                    <th className="sortable" onClick={() => {this.onLabelClick('tenure')}}>Tenure</th>
                    <th className="sortable" onClick={() => {this.onLabelClick('gender')}}>Gender</th>
                  </tr>
                  </thead>
                  <tbody>
                  {sortedEmployees.length == 0 && <tr><td colSpan="4" className="load-bar">Loading</td></tr>}
                  {sortedEmployees.map((employee, i) => {
                     return (<tr key={i}>
                      <td>
                        <div>{employee.name}</div>
                      </td>
                      <td>
                        <div>{employee.jobTitle}</div>
                      </td>
                      <td>
                        <div>{employee.tenure}</div>
                      </td>
                      <td>
                        <div>{employee.gender}</div>
                      </td>
                    </tr>)
                  })}
                  </tbody>
                  </Table>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {this.props.employees.length == 0 && <div className="load-bar full-size">Loading</div>}
          {this.props.employees.length > 0 && <Charts employees={this.props.employees}/>}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  employees: state.app.employees,
});

export default connect(mapStateToProps, null)(Dashboard)
