import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//MUI
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

//Icon
// Redux stuff
import { connect } from 'react-redux';
import { getWordsList } from './../redux/actions/dataActions';

//Сделать нормальное получение стартовой инфы  
import wordsList1 from '../util/wordsList';

import AddWords from '../components/AddWords';
import EditWord from '../components/EditWord';



const styles = (theme) => ({
  ...theme.spreadIt, 
});

class learningWords extends Component {
  state = {
    
  }

  componentDidMount() {
    if(!this.props.wordsList.length>0){
      this.props.getWordsList(wordsList1);
    }    
  }

  handleEditWord = ()=> {
    console.log('hi')
  }
  
  render() {
    const  wordsList  = this.props.wordsList;
    return (
      <Fragment>
        <AddWords/>        
        <List>
          {wordsList.map((word, index) => (  
            <ListItem button key={index + Math.random } title={'Нажмите чтобы редактировать'} onClick={this.handleEditWord}>          
              <ListItemText primary={word.learnWord} />
              <EditWord
              wordIndex={index}              
              openDialog={this.props.openDialog}
              />    
            </ListItem>            
          ))}        
        </List>
      </Fragment>
    )
  }
}




learningWords.propTypes = {
  getWordsList: PropTypes.func.isRequired,
  wordsList: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  wordsList: state.data.wordsList,
});

export default connect(
  mapStateToProps,
  {getWordsList }
)(withStyles(styles)(learningWords));


