import DataTable from './src/components/DataTable';
import DataTableRedux from './src/components/DataTableRedux';
import dataTableReducer from './src/reducers/dataTableReducer';

require("babel-core").transform("code", {
  presets: ["stage-2"]
});


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
