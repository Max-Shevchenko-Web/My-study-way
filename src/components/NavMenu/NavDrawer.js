import React from 'react';
import clsx from 'clsx';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// Redux stuff
import { connect } from 'react-redux';
import { toggleDrawer } from '../../redux/actions/uiAction'

const drawerWidth = 240;
const styles = (theme) => ({
  ...theme.spreadIt,
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },  
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
});

const NavDrawer = (props) => {
  const { classes } = props;
    return (
      <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: props.openDrawer,
              [classes.drawerClose]: !props.openDrawer,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: props.openDrawer,
                [classes.drawerClose]: !props.openDrawer,
              }),
            }}
          >            
              <IconButton onClick={props.toggleDrawer} className={classes.toolbar}> 
                <ChevronRightIcon />
              </IconButton>
            
            <Divider />
            <List>
              {[{text:'Учить слова', link:'learnwords'}, {text:'Home', link:''}, {text:'Send email', link:'login'}, {text:'Drafts', link:'login'}].map((text, index) => (
                <Link to={`/${text.link}`} key={text.text}>
                  <ListItem button>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text.text} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              </List>
            <Divider />
          </Drawer>
    )  
}

const mapStateToProps = (state) => ({
  openDrawer: state.nav.openDrawer,  
});

const mapActionsToProps = {
  toggleDrawer
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(NavDrawer));