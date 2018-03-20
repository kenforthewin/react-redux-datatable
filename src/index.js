import DataTable from './components/DataTable';
import DataTableRedux from './components/DataTableRedux';
import dataTableReducer from './reducers/dataTableReducer';
import ReactDOM from 'react-dom';

export {
  DataTable,
  DataTableRedux,
  dataTableReducer
};

module.exports = {
  DataTable,
  DataTableRedux,
  dataTableReducer
};

// ReactDOM.render(<DataTableRedux />, document.getElementById('root'));