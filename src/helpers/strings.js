const LOGIN_LABEL = 'Users reports'
const BUTTON_LOGIN_TEXT = 'Log in'
const DATA_STORAGE = 'usersReports'
const USER_PASS_ERROR = 'Error in user or password'
const USER_PASS_EMPTY = 'Remember fill all the blanks'
const CREATE_REGISTRY = 'Create'
const REGISTRY_MSJ = 'Registry'
const DIFFERENT_PASSWORDS = 'The passwords must be the same'
const EXIST_USER = 'Email unavailable'
const SUCCESS_NEW_USER = 'User added'

const USERS_REPORTS = {
  users: [{ email: 'robertopccon@gmail.com', password: '123' }],
  reports: []
}

function saveDataLocalStorage(){
  localStorage.setItem(DATA_STORAGE, JSON.stringify(USERS_REPORTS))
}

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
  SUCCESS_NEW_USER
}