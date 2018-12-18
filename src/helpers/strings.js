const LOGIN_LABEL = 'Users reports'
const BUTTON_LOGIN_TEXT = 'Log in'
const DATA_STORAGE = 'usersReports'
const USER_PASS_ERROR = 'Error in user or password'
const USER_PASS_EMPTY = 'Remember fill all the blanks'
const CREATE_REGISTRY = 'Create'
const REGISTRY_MSJ = 'Registry'
const DIFFERENT_PASSWORDS = 'The passwords must be the same'

const USERS_REPORTS = 
  { users: [{ email: 'robertopccon@gmail.com', password: '123' }], reports: []}

function saveDataLocalStorage(){
  localStorage.setItem(DATA_STORAGE, JSON.stringify(USERS_REPORTS))
}

const GET_DATA_LOCALSTORAGE = () => (
  JSON.parse(localStorage.getItem(DATA_STORAGE))
)

export {
  LOGIN_LABEL,
  BUTTON_LOGIN_TEXT,
  saveDataLocalStorage,
  GET_DATA_LOCALSTORAGE,
  USER_PASS_ERROR,
  USER_PASS_EMPTY,
  CREATE_REGISTRY,
  REGISTRY_MSJ,
  DIFFERENT_PASSWORDS
}