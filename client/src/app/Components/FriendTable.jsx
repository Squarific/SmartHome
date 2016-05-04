import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

const FriendTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Usage</TableHeaderColumn>
        <TableHeaderColumn>ranking</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableRowColumn>John Smith</TableRowColumn>
        <TableRowColumn>200</TableRowColumn>
        <TableRowColumn>1</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Randal White</TableRowColumn>
        <TableRowColumn>302</TableRowColumn>
        <TableRowColumn>2</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Stephanie Sanders</TableRowColumn>
        <TableRowColumn>500</TableRowColumn>
        <TableRowColumn>3</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Steve Brown</TableRowColumn>
        <TableRowColumn>654</TableRowColumn>
        <TableRowColumn>4</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);

export default FriendTable;