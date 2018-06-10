import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

const bar = {
  labels: ['Male', 'Female'],
  datasets: [
    {
      label: 'Employees',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [0, 0],
    },
  ],
};

const colors = [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FFAA33',
        '#00AA2F',
        '#123456',
        '#654321',
      ]

const pie = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: colors,
      hoverBackgroundColor: colors,
    }],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

export const parseGender = function(employees) {
  let male = 0
  let female = 0
  employees.forEach((employee) => {
    if (employee.gender === 'Male') {
      male++
    } else {
      female++
    }
  })
  return [male, female, 0]
}

export const parseJobs = function(employees) {
  let employeesObj = {}
  employees.forEach((employee) => {
    if (employeesObj[employee.jobTitle]) {
      employeesObj[employee.jobTitle] = employeesObj[employee.jobTitle] + 1
    } else {
      employeesObj[employee.jobTitle] = 1
    }
  })

  const labels = []
  const data = []

  for(let name in employeesObj) {
    labels.push(name)
    data.push(employeesObj[name])
  }

  return {labels, data}
}

class Charts extends Component {
  render() {

    bar.datasets[0].data = parseGender(this.props.employees)
    const jobs = parseJobs(this.props.employees)
    pie.labels = jobs.labels
    pie.datasets[0].data = jobs.data

    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          <Card>
            <CardHeader>
              Employees by Job Title
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Gender
              <div className="card-header-actions">
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar} options={options} />
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </div>
    );
  }
}

export default Charts;
