import * as action from './actions'

const users = [
  {
    "name": "Mike Potts",
    "jobTitle": "CEO",
    "tenure": "5",
    "gender": "Male"
  },
  {
    "name": "Tom Connor",
    "jobTitle": "Developer",
    "tenure": "2",
    "gender": "Male"
  },
  {
    "name": "Jesse Karl",
    "jobTitle": "Developer",
    "tenure": "3",
    "gender": "Male"
  },
  {
    "name": "Kelly Turner",
    "jobTitle": "QA",
    "tenure": "8",
    "gender": "Female"
  },
  {
    "name": "Allison Rogers",
    "jobTitle": "Marketing Specialist",
    "tenure": "1",
    "gender": "Female"
  },
  {
    "name": "Brian Phillips",
    "jobTitle": "QA",
    "tenure": "12",
    "gender": "Male"
  },
  {
    "name": "Matthew Moody",
    "jobTitle": "Developer",
    "tenure": "7",
    "gender": "Male"
  },
  {
    "name": "Alex Boone",
    "jobTitle": "Marketing Specialist",
    "tenure": "5",
    "gender": "Female"
  },
  {
    "name": "Zachary Zane",
    "jobTitle": "CFO",
    "tenure": "4",
    "gender": "Male"
  },
  {
    "name": "Scott Holder",
    "jobTitle": "Developer",
    "tenure": "4",
    "gender": "Male"
  },
  {
    "name": "Joseph Bale",
    "jobTitle": "QA",
    "tenure": "15",
    "gender": "Male"
  },
  {
    "name": "Rebecca Reuben",
    "jobTitle": "Developer",
    "tenure": "6",
    "gender": "Female"
  }
]


export const getEmployees = () => ({
  type: action.GET_EMPLOYEES,
  payload: users
})

export const addEmployee = (name, jobTitle, tenure, gender) => ({
  type: action.ADD_EMPLOYEE,
  payload: {name, jobTitle, tenure, gender}
})
