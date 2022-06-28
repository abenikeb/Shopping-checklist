import React, { Component } from 'react'

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn }
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
    else {
      sortColumn.path = path
      sortColumn.order = 'asc'
    }
    this.props.onSort(sortColumn)
  }
  raiseColumnIcon = (column) => {
    if (column.path !== this.props.sortColumn.path) return null
    if (this.props.sortColumn.order === 'asc')
      return <i className="fa fa-sort-desc"></i>
    else return <i className="fa fa-sort-asc"></i>
  }
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              onClick={() => this.raiseSort(column.path)}
              key={column.path || column.key}
              style={{ cursor: 'pointer' }}
            >
              {column.label}
              {this.raiseColumnIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    )
  }
}

export default TableHeader
