const LOGIN_LABEL = 'Users reports'
const BUTTON_LOGIN_TEXT = 'Log in'
const DATA_STORAGE = 'usersReports'
const USER_PASS_ERROR = 'Error in user or password'
const USER_PASS_EMPTY = 'Remember fill all the blanks'
const CREATE_REGISTRY = 'Create'
const EMPTY_STRING = ''
const CREATE_NEW_REPORT = 'Create new report'
const REGISTRY_MSJ = 'Registry'
const DIFFERENT_PASSWORDS = 'The passwords must be the same'
const EXIST_USER = 'Email unavailable'
const SUCCESS_NEW_USER = 'User added'
const USER_LOGGED = 'userLogged'
const API = 'https://www.beenverified.com/hk/dd/email?email='

const USERS_REPORTS = {
  users: [{ email: 'skip.suva@gmail.com', password: 'BV-API-Challenge​' }],
  reports: []
}

function saveDataLocalStorage(){
  localStorage.setItem(DATA_STORAGE, JSON.stringify(USERS_REPORTS))
}

function setUserLogged(email, password) {
  localStorage.setItem(USER_LOGGED, JSON.stringify({ email, password }))
}

function refreshReportsUser(emailUser, report){
  const { users, reports } = GET_DATA_LOCALSTORAGE()
  const findUser = reports.map((elem) => elem.email === emailUser)

  if(findUser.length === 0){
    reports.push(report)

    const newDataStorage = { users, reports }
  
    updateDataLocalStorage(newDataStorage)
  }
}
const GET_DATA_FROM_USER = (email) => {
  const { reports } = GET_DATA_LOCALSTORAGE()
  const data = reports.find((elem) => (elem.email = email))

  return data
}
const GET_USER_LOGGED = () => (
  JSON.parse(localStorage.getItem(USER_LOGGED))
)

const GET_DATA_LOCALSTORAGE = () => (
  JSON.parse(localStorage.getItem(DATA_STORAGE))
)

function updateDataLocalStorage(newData){
  localStorage.setItem(DATA_STORAGE, JSON.stringify(newData))
}

export {
  LOGIN_LABEL,
  BUTTON_LOGIN_TEXT,
  saveDataLocalStorage,
  GET_DATA_LOCALSTORAGE,
  USER_PASS_ERROR,
  updateDataLocalStorage,
  USER_PASS_EMPTY,
  CREATE_REGISTRY,
  REGISTRY_MSJ,
  DIFFERENT_PASSWORDS,
  EXIST_USER,
  SUCCESS_NEW_USER,
  API,
  setUserLogged,
  GET_USER_LOGGED,
  refreshReportsUser,
  GET_DATA_FROM_USER,
  CREATE_NEW_REPORT,
  EMPTY_STRING
}