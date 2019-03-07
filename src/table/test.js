import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


function SimpleTable(props) {
  const { classes } = props;
  const { articles } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>source_id</TableCell>
            <TableCell>source_name</TableCell>
            <TableCell>author</TableCell>
            <TableCell>title</TableCell>
            <TableCell>description</TableCell>
            <TableCell>url</TableCell>
            <TableCell>published_at</TableCell>
            <TableCell>content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map(row => {
            return (
              <TableRow key={row.url}>
                <TableCell component="th" scope="row">
                  {row.source.id}
                </TableCell>
                <TableCell numeric>{row.source.name}</TableCell>
                <TableCell numeric>{row.author}</TableCell>
                <TableCell numeric>{row.title}</TableCell>
                <TableCell numeric>{row.description}</TableCell>
                <TableCell numeric>{row.url}</TableCell>
                <TableCell numeric>{row.publishedAt}</TableCell>
                <TableCell numeric>{row.content}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
