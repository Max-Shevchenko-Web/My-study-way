import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//Icons
import Add from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
// Redux stuff
import { connect } from 'react-redux';
import { addNewWord } from './../redux/actions/dataActions';


import MyButton from '../util/MyButton';

const styles = (theme) => ({
  ...theme.spreadIt, 
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  },
  imageWrapper: {
    textAlign: 'center',
    position: 'relative', 
    height: 200,    
    '& button': {
      position: 'absolute',
      top: '80%',
      left: '-3%'
    },
    '& .wraper': {  
      height: 200,
    },
    '& .new-word-image': { 
      width: 200,
      height: 200, 
      objectFit: 'cover',
      maxWidth: '100%',
    },
}
  //   '& .profile-details': {
  //     textAlign: 'center',
  //     '& span, svg': {
  //       verticalAlign: 'middle'
  //     },
  //     '& a': {
  //       color: '#00bcd4'
  //     }
  //   },
  //   '& hr': {
  //     border: 'none',
  //     margin: '0 0 10px 0'
  //   },
  //   '& svg.button': {
  //     '&:hover': {
  //       cursor: 'pointer'
  //     }
  //   }
  // },
  // buttons: {
  //   textAlign: 'center',
  //   '& a': {
  //     margin: '20px 10px'
  //   }
  // }
});

class AddWords extends Component {
  state = {
    open: false,
    learnWord: '',
    imgWordUrl: null,
    descriptionWord: '',
    transletedWord: '',
    createdAt: '',
    errors: {},
  };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.UI.errors) {
  //     this.setState({
  //       errors: nextProps.UI.errors
  //     });
  //   }
  //   if (!nextProps.UI.errors && !nextProps.UI.loading) {
  //     this.setState({ body: '', open: false, errors: {} });
  //   }
  // }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    // this.props.clearErrors();
    this.setState({ open: false, errors: {} });
    this.handleReset()
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addNewWord({ 
      learnWord: this.state.learnWord,
      imgWordUrl: this.state.imgWordUrl,
      descriptionWord: this.state.descriptionWord,
      transletedWord: this.state.transletedWord,
      createdAt: new Date(),
    });

    this.handleClose()
    this.handleReset()
  };

  handleReset = () => {
    window.URL.revokeObjectURL(this.imgWordUrl);
    this.imgWordUrl= null 
  }

  //?? доработать 
  //инпут загрузки файлов вызывает окошко выбрать файл и отправляет его на сервер
  handleImageChange = (event) => {
    const image = event.target.files[0];
    this.setState({ imgWordUrl: window.URL.createObjectURL(image) });  
    
    this.imgWordUrl = window.URL.createObjectURL(image);
    console.log(this.imgWordUrl);    
    
    
    //сделать работу с сервером

    //Получаем файйл и отправляем на сервер
    // const formData = new FormData();
    // formData.append('image', image, image.name);
    // this.props.uploadImage(formData);
  };
  //кастомная кнопка загрузки файлов нажимает на инпут
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  render() {
    const { errors } = this.state;
    
    const {
      classes,      
    } = this.props;

    const wordImageEl = (
      (this.imgWordUrl) ?
        <div className="wraper">
          <img src={this.imgWordUrl} alt="imgword" className="new-word-image" />
        </div>        
      :
      <div className="wraper">
        <h3>Добавте фото асоциирующееся с изучаемым словом</h3>
      </div>
    )
    return (
      <Fragment>
        <MyButton
          tip="Добавить новое слово"
          onClick={this.handleOpen}
          btnClassName="button"
        >
          <Add color="primary" />
          <span>Добавить</span> 
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
        <MyButton
          tip="Close"
          onClick={this.handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Добавить слово для изучения</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <div className={classes.imageWrapper}>
              {wordImageEl}
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <MyButton
                tip="Edit profile picture"
                onClick={this.handleEditPicture}
                btnClassName="button"
              >
                <AddAPhotoIcon color="primary" />
              </MyButton>
            </div>
            <TextField
              name="learnWord"
              type="text"
              label="Новое слово"
              rows="1"
              placeholder="Введите сюда слово которое хотите выучить"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={this.handleChange}  
              fullWidth
            />
            <TextField
              name="transletedWord"
              type="text"
              label="Перевод слова"
              rows="1"
              placeholder="Введите перевод слова"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              name="descriptionWord"
              type="text"
              label="Описание слова"
              multiline
              rows="3"
              placeholder="Опишите ваши асоциации с изучаемым словом"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Сохранить              
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      </Fragment>
    )
  }
}

AddWords.propTypes = {
  classes: PropTypes.object.isRequired,
  // postScream: PropTypes.func.isRequired,
  // clearErrors: PropTypes.func.isRequired,
  // UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
   
});

export default connect(
  mapStateToProps,
  {addNewWord  }
)(withStyles(styles)(AddWords));