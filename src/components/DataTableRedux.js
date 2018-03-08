import DataTable from './DataTable';
import { connect } from 'react-redux';
import { 
  initializeDataTable, 
  nextPage, 
  previousPage, 
  goToPage,
  ellipLeft,
  ellipRight,
  changePerPage,
  sort,
  searchTable
  } from '../actions/dataTable';

const mapStateToProps = ({ dataTableReducer }) => {
  const { draw, page, perPage, totalRecords, data, loading, sortDirection, sortField, searchValue } = dataTableReducer;

  return {
    page,
    perPage,
    draw,
    totalRecords,
    data,
    loading,
    sortDirection,
    sortField,
    searchValue
  };
};

const mapDispatchToProps = { 
  initializeDataTable,
  nextPage,
  previousPage,
  goToPage,
  ellipLeft,
  ellipRight,
  changePerPage,
  sort,
  searchTable
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);