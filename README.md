# redux-remote-datatable

![project example](https://storage.googleapis.com/brrrr/better-datatable.gif)

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

- Add the DataTableRedux component with its required initialization props.

```javascript
import { DataTableRedux as DataTable } from 'redux-remote-datatable';

...

<DataTable
  fields={{"Name": "official_name", "Birthday": "birthday", "Thomas ID": "thomas_id" }}
  ajax="http://localhost:3000/legislators"
  idField="id" />
```

### Initialization props

- `fields`: An object whose keys are the table header titles and whose values correspond with values in the received data objects.
- `ajax`: The data url.
- `idField`: The unique identifier field of the received data objects. Used when assigning keys to child elements.

The component will make POST requests to the `ajax` endpoint for data to populate the table. In the body of the POST request will be a JSON object with the following parameters:

### Request parameters

- `draw`: starts at 1 and is incremented by 1 every time data is requested from the remote server and the table is re-drawn.
- `page`: The current page.
- `perPage`: The amount of data objects to be requested and displayed per page.
- `sortField`: The field to sort the data by. Can be null.
- `sortDirection`: One of `asc` and `desc`.
- `searchValue`: The user-inputted search string. Default is a blank string.

### Response parameters

- `draw`: echo the draw from the request.
- `totalRecords`: Record count before pagination.
- `data`: An array of JSON objects with keys corresponding to the pre-defined fields.

### Example response

```json
{
    "draw": "1",
    "totalRecords": 473,
    "data": [
        {
            "id": 52,
            "official_name": "Roy Blunt",
            "thomas_id": "01464",
            "birthday": "1950-01-10"
        },
        {
            "id": 51,
            "official_name": "Richard Blumenthal",
            "thomas_id": "02076",
            "birthday": "1946-02-13"
        },
        ...
    ]
}
```

## Example backend

- An example backend, written in Ruby on Rails, is available [here](https://github.com/kenforthewin/legislators-api).
- A separate example backend written in Elixir (Phoenix) [here](https://github.com/kenforthewin/legislators-api-phoenix).
