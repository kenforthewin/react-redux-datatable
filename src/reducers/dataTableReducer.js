var merge = require('merge')

const INITIAL_STATE = {
  draw: 0,
  page: 1,
  perPage: 10,
  data: [],
  loading: true,
  ajax: '',
  totalRecords: 0,
  fields: {},
  idField: '',
  sortField: null,
  sortDirection: null,
  searchValue: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'table_loading':
      return state.merge({
        loading: true,
        draw: state.draw + 1 })
    case 'search_table':
      return state.merge({
        loading: false,
        data: action.data,
        totalRecords: action.totalRecords,
        page: action.page,
        searchValue: action.searchValue })
    case 'go_to_page':
      return state.merge({
        loading: false,
        page: action.page,
        data: action.data })
    case 'change_per_page':
      return state.merge({
        loading: false,
        perPage: action.perPage,
        data: action.data,
        page: 1 })
    case 'sort_table':
      return state.merge({
        loading: false,
        data: action.data,
        sortField: action.sortField,
        sortDirection: action.sortDirection })
    case 'initialize_table':
      return state.merge({
        data: action.data,
        loading: false,
        draw: 1,
        ajax: action.ajax,
        totalRecords: action.totalRecords,
        fields: action.fields,
        idField: action.idField })
    case 'next_page':
      return state.merge({
        data: action.data,
        page: state.page + 1,
        loading: false })
    case 'previous_page':
      return state.merge({
        data: action.data,
        page: state.page - 1,
        loading: false })
    default:
      return state;
  }
}