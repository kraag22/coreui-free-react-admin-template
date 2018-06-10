import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addEmployee } from '../../reducers/app/action-creators'

import {
  Button,
  Card,
  CardColumns,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  FormFeedback,
  Input,
  Label,
} from 'reactstrap';

class AddUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      tenure: 0,
      jobTitle: '',
      gender: 'Male',
      errors: {}
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleInput(e) {
    const name = e.target.id
    const value = e.target.value
    this.setState({[name]: value})
  }

  validate() {
    let errors = this.state.errors

    errors.name = String(this.state.name).length == 0
    errors.jobTitle = String(this.state.jobTitle).length == 0
    errors.tenure = String(this.state.tenure).length == 0 || parseInt(this.state.tenure) != this.state.tenure
    errors.gender = String(this.state.gender) !== 'Male' && String(this.state.gender) !== 'Female'

    this.setState({'errors': errors})
  }

  onFormSubmit() {
    this.validate()
    for (let i in this.state.errors) {
      if (this.state.errors[i]) {
        return
      }
    }

    this.props.addEmployee(this.state.name, this.state.jobTitle, this.state.tenure, this.state.gender)

    // I would redirect thru redux action instead of this, if I have more time
    this.setState({'redirect': true})
  }

  render() {
    return (
      <div className="animated fadeIn">
        {this.state.redirect && <Redirect to="/dashboard" />}
        <CardColumns className="cols-2">
          <Card>
            <CardHeader>
              Add Employee
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name"
                    placeholder="Enter name" required
                    invalid={this.state.errors.name}
                    value={this.state.name} onChange={(e) => this.handleInput(e)} />
                  <FormFeedback>Set employee name</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="jobTitle">JobTitle</Label>
                  <Input type="text" id="jobTitle" placeholder="Enter job title" required
                    invalid={this.state.errors.jobTitle}
                    value={this.state.jobTitle}
                    onChange={(e) => this.handleInput(e)} />
                  <FormFeedback>Set employee job title</FormFeedback>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="tenure">Tenure</Label>
                      <Input type="text" id="tenure" placeholder="Enter tenure" required
                        invalid={this.state.errors.tenure}
                        value={this.state.tenure}
                        onChange={(e) => this.handleInput(e)} />
                      <FormFeedback>Set employee tenure (numeric only)</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="gender">Gender</Label>
                      <Input type="select" name="gender" id="gender" required
                        invalid={this.state.errors.gender}
                        value={this.state.gender}
                        onChange={(e) => this.handleInput(e)} >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Input>
                      <FormFeedback>Set employee gender</FormFeedback>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <div className="form-actions">
                  <Button color="primary"
                    onClick={() => this.onFormSubmit()}>
                    Add Employee
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addEmployee }, dispatch)
export default connect(null, mapDispatchToProps)(AddUser)

// export default AddUser;
