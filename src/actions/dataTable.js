export const initializeDataTable = (ajax, fields, idField) => {
  return (dispatch, getState) => {
    const state = getState();
    const { 
      draw,
      page,
      perPage
    } = state.dataTableReducer;
    if (draw === 0) {
      return requestData(ajax, draw, page, perPage, null, null, "")
      .then(responseJson => {
        dispatch({
          type: 'initialize_table',
          data: responseJson.data,
          ajax: ajax,
          totalRecords: responseJson.totalRecords,
          fields: fields,
          idField: idField,
          perPage: perPage
        });
      })
    } else {
      // TODO handle the error.
    }
  }
};

export const sort = (field, direction = 'asc') => {
  return (dispatch, getState) => {
    const state = getState();
    const {
      ajax,
      draw,
      perPage,
      page,
      fields,
      searchValue
    } = state.dataTableReducer;
    if (Object.values(fields).includes(field) || field === null) {
      dispatch({ type: 'table_loading' });
      return requestData(ajax, draw, page, perPage, direction, field, searchValue)
      .then(responseJson => {
        dispatch({
          type: 'sort_table',
          data: responseJson.data,
          sortField: field,
          sortDirection: direction
        });
      });
    }
  }
}

export const searchTable = (searchValue) => {
  return (dispatch, getState) => {
    if (searchValue.length < 3) searchValue = '';
    dispatch({ type: 'table_loading' });
    const state = getState();
    const {
      ajax,
      draw,
      perPage,
      sortDirection, 
      sortField
    } = state.dataTableReducer;

    return requestData(ajax, draw, 1, perPage, sortDirection, sortField, searchValue)
    .then(responseJson => {
      const newPage = 1;
      dispatch({
        type: 'search_table',
        data: responseJson.data,
        totalRecords: responseJson.totalRecords,
        page: newPage,
        searchValue
      })
    });
  }
}

export const goToPage = (page) => {
  return (dispatch, getState) => {
    const state = getState();
    const {
      ajax,
      draw,
      perPage,
      totalRecords,
      sortDirection, 
      sortField,
      searchValue
    } = state.dataTableReducer;
    page = Number(page);
    if (page > 0 && page <= Math.ceil(totalRecords / perPage)) {
      dispatch({ type: 'table_loading' });
      return requestData(ajax, draw, page, perPage, sortDirection, sortField, searchValue)
      .then(responseJson => {
        dispatch({
          type: 'go_to_page',
          data: responseJson.data,
          page
        })
      });
    }
  };
}

export const changePerPage = (perPage) => {
  return (dispatch, getState) => {
    perPage = Number(perPage);
    const state = getState();
    const {
      ajax,
      draw,
      sortDirection, 
      sortField,
      searchValue
    } = state.dataTableReducer;
    if ([10, 25, 50, 100].includes(perPage)) {
      dispatch({ type: 'table_loading' });
      return requestData(ajax, draw, 1, perPage, sortDirection, sortField, searchValue)
      .then(responseJson => {
        dispatch({
          type: 'change_per_page',
          data: responseJson.data,
          perPage
        })
      });
    }
  }
}

export const ellipRight = () => {
  return (dispatch, getState) => {
    const state = getState();
    const {
      ajax,
      draw,
      page,
      perPage,
      totalRecords,
      sortDirection, 
      sortField,
      searchValue
    } = state.dataTableReducer;
    const totalPages = Math.ceil(totalRecords / perPage);
    if (totalPages - 4 >= page) {
      dispatch('table_loading')
      return requestData(ajax, draw, page + 4, perPage, sortDirection, sortField, searchValue)
      .then(responseJson => {
        dispatch({
          type: 'go_to_page',
          data: responseJson.data,
          page: page + 4
        })
      })
    }
  }
}

export const ellipLeft = () => {
  return (dispatch, getState) => {
    const state = getState();
    const {
      ajax,
      draw,
      page,
      perPage,
      sortDirection, 
      sortField,
      searchValue
    } = state.dataTableReducer;
    if (page >= 4) {
      dispatch('table_loading')
      return requestData(ajax, draw, page - 4, perPage, sortDirection, sortField, searchValue)
      .then(responseJson => {
        dispatch({
          type: 'go_to_page',
          data: responseJson.data,
          page: page - 4
        })
      })
    }
  }
}

export const nextPage = () => {
  return (dispatch, getState) => {
    const state = getState();
    const {
      ajax,
      draw,
      page,
      perPage,
      totalRecords,
      sortDirection, 
      sortField,
      searchValue
    } = state.dataTableReducer;
    
    if (page * perPage + 1 <= totalRecords) {
      dispatch({ type: 'table_loading' });

      return requestData(ajax, draw, page + 1, perPage, sortDirection, sortField, searchValue)
      .then(responseJson => {
        dispatch({
          type: 'next_page',
          data: responseJson.data
        })
      });
    }
  }
};

export const previousPage = () => {
  return (dispatch, getState) => {
    const state = getState();
    const {
      ajax,
      draw,
      page,
      perPage,
      sortDirection, 
      sortField,
      searchValue
    } = state.dataTableReducer;
    
    if (page > 1) {
      dispatch({ type: 'table_loading' });

      return requestData(ajax, draw, page - 1, perPage, sortDirection, sortField, searchValue)
      .then(responseJson => {
        dispatch({
          type: 'previous_page',
          data: responseJson.data
        })
      });
    }
  }
};

const requestBody = (draw, page, perPage, sortDirection, sortField, searchValue) => {
  return JSON.stringify({
    draw,
    page,
    perPage,
    sortDirection,
    sortField,
    searchValue
  });
};

const requestData = (ajax, draw, page, perPage, sortDirection, sortField, searchValue) => {
  return fetch(ajax, {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
    headers: {
      'content-type': 'application/json'
    },
    body: requestBody(draw, page, perPage, sortDirection, sortField, searchValue)
  })
  .then(response => response.json());
};