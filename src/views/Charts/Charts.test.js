import React from 'react';
import ReactDOM from 'react-dom';
import Charts from './Charts';
import {parseGender, parseJobs} from './Charts'

jest.mock('react-chartjs-2', () => ({
  Pie: () => null,
  Bar: () => null,
}));

it('parses gender info', () => {
  const employees = [{gender: 'Male'}, {gender: 'Female'}]
  expect(parseGender(employees)).toEqual([1,1,0])

  expect(parseGender([])).toEqual([0,0,0])
})

it('parses jobs info', () => {
  const employees = [{jobTitle: 'dev'}, {jobTitle: 'dev'}, {jobTitle: 'ceo'}]
  expect(parseJobs(employees)).toEqual({labels: ['dev', 'ceo'], data:[2, 1]})

  expect(parseJobs([])).toEqual({labels: [], data:[]})
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Charts employees={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
