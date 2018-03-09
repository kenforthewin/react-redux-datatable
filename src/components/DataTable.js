import React, { Component } from 'react';
import { Table, Pagination, Col, Glyphicon, FormGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import Loading from './DataTableLoading';
const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;
const pageInputStyle = {
  marginLeft: '5px',
  marginRight: '5px'
}
const sortLinkStyle = {
  marginLeft: '10px',
  color: 'darkgray'
}

class DataTable extends Component {
  componentWillMount() {
    this.props.searchTable('');
    this.timer = null;
    this.props.initializeDataTable(this.props.ajax, this.props.fields, this.props.idField);
  }

  renderHead() {
    const fields = this.props.fields;
    const keys = Object.keys(fields);
    const th = keys.map((key) => { return(<th key={key}>{key}<span>{this.renderSort(fields[key])}</span></th>); })
    return (
      <thead>
        <tr>
          {th}
        </tr>
      </thead>
    );
  }

  renderSort(key) {
    const ascActive = this.props.sortField === key && this.props.sortDirection === 'asc';
    const descActive = this.props.sortField === key && this.props.sortDirection === 'desc';
    const ascColor = ascActive ? 'black' : 'darkgray';
    const descColor = descActive ? 'black' : 'darkgray';
    return (
        <a style={sortLinkStyle} onClick={() => this.onSortClick(key, ascActive, descActive)}>
          <Glyphicon glyph="triangle-top" key={key + '-up'} style={{color: ascColor}}  />
          <Glyphicon glyph="triangle-bottom" key={key + '-down'} style={{color: descColor}}/>
        </a>
    );
  }

  onSortClick(field, ascActive, descActive) {
    if (ascActive) {
      this.props.sort(field, 'desc');
    } else if (descActive) {
      this.props.sort(null);
    } else {
      this.props.sort(field, 'asc')
    }
  }

  getTotalPages() {
    return Math.ceil(this.props.totalRecords / this.props.perPage);
  }

  renderPageButtons() {
    const totalPages = this.getTotalPages();
    const page = this.props.page;
    const previousActive = page > 1;
    const nextActive = page < totalPages;
    const previousLink = <Pagination.Item disabled={!previousActive} key='prev' onClick={() => this.props.previousPage()}>Previous</Pagination.Item>;
    const nextLink = <Pagination.Item disabled={!nextActive} key='next' onClick={() => this.props.nextPage()}>Next</Pagination.Item>;

    let links = [];
    if(totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        const active = page === i;
        links.push(<Pagination.Item key={i} active={active}>{i}</Pagination.Item>);
      }
    } else {
      if (page > 4)
        links.push(<Pagination.Ellipsis key='e-down' onClick={() => this.props.ellipLeft()} />);
      for (let i = page - 8; i <= page + 8; i++) {
        const active = page === i;
        if (i > 0 && i <= totalPages) {
          if (i < page - 3) {
            if (page + 4 <= totalPages && page - 4 >= 1) continue;

            const leftPad = 7 - (totalPages - page);
            if ((page - i) <= leftPad) {
              links.push(<Pagination.Item key={i} onClick={() => this.props.goToPage(i)} active={active}>{i}</Pagination.Item>);
            }
          } else if (i > page + 3) {
            if (totalPages >= page + 4 && page - 4 >= 1) continue;

            const rightPad = 8 - page;
            if ((i - page) <= rightPad) {
              links.push(<Pagination.Item key={i} onClick={() => this.props.goToPage(i)} active={active}>{i}</Pagination.Item>);
            }
          } else {
            links.push(<Pagination.Item key={i} onClick={() => this.props.goToPage(i)} active={active}>{i}</Pagination.Item>);
          }
        }
      }
      if (page <= totalPages - 4)
        links.push(<Pagination.Ellipsis key='e-up' onClick={() => this.props.ellipRight()} />);
    }

    
    return (
      <div>
        <Pagination bsSize="small">
          {previousLink}
          {links}
          {nextLink}
        </Pagination>
      </div>
    );
  }

  renderBody() {
    const values = Object.values(this.props.fields);
    const data = this.props.data;

    const tr = data.map((datum) => {
      const td = values.map((field) => {
        var tdId = String(datum[this.props.idField]) + "-" + field;
        return(<td key={tdId}>{datum[field]}</td>); 
      });

      return(
        <tr key={datum[this.props.idField]}>
          {td}
        </tr>
      );
    });
    return (
      <tbody>
        {tr}
      </tbody>
    );
  }

  handlePageInput(event) {
    clearTimeout(this.timer);
    const newPage = Number(event.target.value);
    if (newPage < 1 || newPage > this.getTotalPages()) {
      event.target.value = '';
      return;
    }
    event.persist();
    this.timer = setTimeout(() => {
      if (event.target !== null)
        this.props.goToPage(event.target.value);
        event.target.placeholder = event.target.value;
        event.target.value = '';
    }, WAIT_INTERVAL);
  }



  handlePageInputKeyDown(event) {
    const value = event.target.value;
    const newPage = Number(event.target.value);

    if (newPage < 1 || newPage > this.getTotalPages()) {
      event.target.value = '';
      return;
    }
    if (event.keyCode === ENTER_KEY) {
      clearTimeout(this.timer);
      this.props.goToPage(value);
      event.target.placeholder = value;
      event.target.value = '';
    }
  }

  handleSearchChange(event) {
    const value = event.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (value !== null)
        this.props.searchTable(value);

    }, WAIT_INTERVAL);
  }

  renderLoading() {
    if (!this.props.loading) return;
    return (
      <Loading />
    );
  }

  renderSearch() {
    return (
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Search"
          onChange={this.handleSearchChange.bind(this)}
        />
      </FormGroup>
    )
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='table-wrapper' >
        <Col xs={8} md={4} mdOffset={8}>
          {this.renderSearch()}
        </Col>
        <Table bordered condensed hover>
          {this.renderHead()}
          {this.renderBody()}
        </Table>
        {this.renderLoading()}
        <Col xs={8}>
          <div>Page
            <span>
              <input type="text" style={pageInputStyle} className="text-center page-input" size={2} onChange={(event) => this.handlePageInput(event)} onKeyDown={(event) => this.handlePageInputKeyDown(event)} placeholder={this.props.page} />
              of {this.getTotalPages()}
            </span>
          </div>
          {this.renderPageButtons()}
        </Col>
        <Col xs={4} className="text-right">
          <div>
            <span>
              <select style={pageInputStyle} value={this.props.perPage} onChange={(event) => this.props.changePerPage(event.target.value)}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              per page
            </span>
          </div>
        </Col>
      </div>
    );
  }
}

DataTable.propTypes = {
  fields: PropTypes.object,
  data: PropTypes.array,
  idField: PropTypes.string,
  totalRecords: PropTypes.number,
  perPage: PropTypes.number,
  page: PropTypes.number
}

export default DataTable;