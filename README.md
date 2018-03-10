# redux-remote-datatable

![project example](https://storage.googleapis.com/brrrr/redux-datatable.gif)

## Installation

`npm i redux-remote-datatable --save`

## Usage

- Add the reducer.

```javascript
import { dataTableReducer } from 'redux-remote-datatable';

...

const appReducer = persistCombineReducers(config, {
  dataTableReducer,
  ...
});
```

- Add the DataTableRedux component with its requred initialization props.

```javascript
import { DataTableRedux } from 'redux-remote-datatable';

...

<DataTable
  fields={{"Name": "official_name", "Birthday": "birthday", "Thomas ID": "thomas_id" }}
  ajax="http://localhost:3000/legislators"
  idField="id" />
```