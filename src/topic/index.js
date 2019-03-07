import axios from 'axios';
import { ExportToCsv } from 'export-to-csv';
import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import ReactVirtualizedTable from '../table/';


const options = { 
  fieldSeparator: ';',
  quoteStrings: '|',
  decimalSeparator: '.',
  showLabels: true, 
  showTitle: true,
  title: 'Trending topic',
  useTextFile: false,
  useBom: false,
  useKeysAsHeaders: true,
};

const csvExporter = new ExportToCsv(options);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  centered: {
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  
});


function Topic(props) {
  const { classes } = props;
  const [q, setTopic] = useState('deepfake');
  const [apiKey, setApiKey] = useState('');
  const [language, setLanguage] = useState('en');
  const [results, setResults] = useState([]);
  const pageSize = 100;

  const languages = [
    {
      value: null,
      label: 'All',
    },
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'es',
      label: 'russian',
    },
    {
      value: 'fr',
      label: 'French',
    },
    {
      value: 'he',
      label: 'Hungarian',
    },
    {
      value: 'it',
      label: 'Italian',
    },
    {
      value: 'nl',
      label: 'Dutch',
    },
    {
      value: 'no',
      label: 'Norwegian',
    },
    {
      value: 'pt',
      label: 'Portuguese',
    },
    {
      value: 'ru',
      label: 'Russian',
    },
    {
      value: 'zh',
      label: 'Chinese',
    },

  ]

  const getResults = (page=1) => {
    let params = {
      q:q,
      apiKey:apiKey,
      language:language,
      pageSize:pageSize,
      page:page,
    }
    return axios.get('https://newsapi.org/v2/everything/', {params:params})
  }
  const getAllResults = async function(e){
    let page = 1
    let datas = []
    let res = await getResults(page)
    res.data.articles.map(x => datas.push({
      source_id: x.source.id,
      source_name: x.source.name, 
      author: x.author,
      title: x.title,
      description: x.description,
      url: x.url,
      published_at: x.publishedAt,
      content: x.content
    }))
    page = page + 1
    console.log(page)
    let mp = Math.ceil(res.data.totalResults / pageSize)
    for (page; page <= mp; page++){
      let res = await getResults(page)
      res.data.articles.map(x => datas.push({
        source_id: x.source.id,
        source_name: x.source.name, 
        author: x.author,
        title: x.title,
        description: x.description,
        url: x.url,
        published_at: x.publishedAt,
        content: x.content
      }))
      
    }
    setResults([...datas])
  }
  let results_display = results.length ? <ReactVirtualizedTable data={results} /> : null
  return (
    <div className={classes.centered}>
      <TextField
          id="outlined-select-language"
          select
          label="Select"
          className={classes.textField}
          value={language}
          onChange={e => setLanguage(e.target.value)}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your language"
          margin="normal"
          variant="outlined"
        >
        {languages.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="api-key"
        style={{ margin: 8 }}
        placeholder="put your NewApi.org API KEY"
        margin="normal"
        InputLabelProps={{
          shrink: false,
        }}
        onChange={e => setApiKey(e.target.value)}
      />
      <TextField
          id="topic-search"
          style={{ margin: 8 }}
          placeholder="Search a trending topic"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => setTopic(e.target.value)}
        />
      <Button 
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={(e) => getAllResults(e)} >
        Search
        <SearchIcon className={classes.rightIcon} />
      </Button>
      <Button 
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={(e) => csvExporter.generateCsv(results)} >
        Save as CSV
        <SaveIcon className={classes.rightIcon} />
      </Button>
      {results_display}
    </div>
  )
}

Topic.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Topic)
