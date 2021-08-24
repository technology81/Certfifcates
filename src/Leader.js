import React,{ useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Route, useHistory } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import axios from 'axios';
import CardContent from '@material-ui/core/CardContent';
import {useState} from 'react';
import { IconButton, Box, Tooltip, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import HHicon from './HH-icon.jpg';



const imgstyle = {
  margin: '10px 60px'
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginLeft: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    // keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));



	export default function ButtonAppBar() {

  const [auth] = React.useState(true);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [value, setValue] = React.useState(0);
  const [pevent, setPevent] = useState([]);
  const dataInfo=JSON.parse(localStorage.getItem("myInfo"))
  const history = useHistory();
  
      
  useEffect(()=>{
  
   {
    
   axios.get('http://localhost:8081/account/events/pastEvents')
  .then((response) => {
  
   
   console.log(response.data)
   var id=response.data[0].event_id;
   
   setPevent(response.data)
  
   })
 };
}, [])
      
  const classes = useStyles();
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleclose = () => {
    setOpen(false);
  };
 
  const handleClose = () => {
    setAnchorEl(null);};


 /*   
    let history = useHistory();
  const home = () => {
   
    history.push('/home');

  };
  let history = useHistory();
  const login = () => {
    setAnchorEl(null);
    history.push('/login');

  };
*/


const dataInfo=JSON.parse(localStorage.getItem("myInfo"))
const history = useHistory();
const [success,setSuccess]=useState(false);
const [mesg,setMesg]=useState('');



const handleRegistration=(eventid,e)=>{
  

  axios.post(`http://localhost:8081/account/leader/sendCertificates/${eventid}`)
  .then((response) => {
      var res=response.status
      console.log(response)
      console.log(response.status)
      if (res === 200) {
          setSuccess(true);
          setMesg(response.data.message);
         alert("Certificate Sent Successfully!")
      }
  })
  .catch((error) => {
      if (error.response.status === 400) {
          // console.log(error.response.data.message);
          // alert("Already registered ")
          // setSuccess(false);
          setSuccess(true);
          setMesg(error.response.data.message);

          
      }
      else
      // setSuccess(false);
      console.log(error)
      setSuccess(true);
      setMesg(error);

     
  });
  // setSuccess(false);
  
};


  return (

    
    <Box  mb={10}> 

      
       

<div className={classes.root}>
        {/*<FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>*/}
        <CssBaseline />
        <ElevationScroll>
          <AppBar>

            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <img src={HHicon} alt="logo" height="50" width="50" align="center" />
                &nbsp;&nbsp;Helping Hands
              </Typography>
              {auth && (
                <div>
                  {/* <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
               <ArrowDropDownIcon></ArrowDropDownIcon>
              </IconButton> */}

                  <Tooltip title="Go to Home page">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Home">
                      <HomeIcon />
                    </IconButton></Tooltip>
                  <Button onClick={handleMenu} startIcon={<AccountCircleIcon />} endIcon={<ArrowDropDownIcon />} size="large" style={{ fontSize: 15, textTransform: 'none', color: 'white' }} >
                    {/* <ListItemText>*/}
                    <Typography >&nbsp;&nbsp;dataInfo.firstname&nbsp;dataInfo.lastname&nbsp;</Typography> </Button>
                  <StyledMenu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    // anchorOrigin={{
                    //   vertical: 'top',
                    //   horizontal: 'right',
                    // }}
                    // keepMounted
                    // transformOrigin={{
                    //   vertical: 'top',
                    //   horizontal: 'right',
                    // }}
                    // open={open}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem>
                      <List>
                        <ListItem alignItems='center'>
                          <ListItemIcon ><PersonIcon /></ListItemIcon>
                          <ListItemText>
                            Profile
                          </ListItemText>
                        </ListItem>
                      </List>
                    </MenuItem>
                    <MenuItem>
                      <List>
                        <ListItem alignItems='center'>
                          <ListItemIcon ><DashboardIcon /></ListItemIcon>
                          <ListItemText>
                            Dashboard
                          </ListItemText>
                        </ListItem>
                      </List>
                    </MenuItem>
                    {/*<MenuItem onClick={handleClose}>{role===admin?<Admincomp/>:null}</MenuItem>
                <MenuItem onClick={handleClose}>{role===leader?<Leadercomp/>:null}</MenuItem>*/}
                   
                    <MenuItem>
                      <List>
                        <ListItem alignItems='center'>
                          <ListItemIcon ><ExitToAppIcon /></ListItemIcon>
                          <ListItemText>
                            Signout
                          </ListItemText>
                        </ListItem>
                      </List>
                    </MenuItem>
                  </StyledMenu>
                </div>
              )}
            </Toolbar>
          </AppBar>
          </ElevationScroll>
      </div>

      
	<br/>

	
    <Box m={5}>
      <br/>
    <center> <h2 color="primary">Certificates</h2> </center>
        <Grid container  spacing={6} >
         
             
                {pevent.map((option) => (
                 
                    <Grid item xs={12} sm={6} md={6}>
                      <Card style={{minwidth:200}}>
                      <CardContent style={{backgroundColor:"#D6EAF8"}}>
                      <center><b>{option.name}</b><br/><br/></center>
                     
                    
                      
                     <b>Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>&nbsp;&nbsp;<b>{option.event_type}</b><br></br>
                     <b>Venue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        :</b>&nbsp;&nbsp;<b>{option.venue}</b><br></br>
                     <b>Description&nbsp;:</b>&nbsp;&nbsp;&nbsp;<b>{option.description}</b><br></br>
                     <b>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         :</b>&nbsp;&nbsp;<b>{moment(option.start_time).format('MMMM Do YYYY')}</b><br></br>
                     <b>Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>&nbsp;&nbsp;<b>{moment(option.start_time).format('h:mm a')}</b><br></br><br/>
                     <Button type='submit' disabled={option.isSubmitting}   variant="contained" color="primary" onClick={e=>handleRegistration(option.event_id,e)}  > Send Certificates 
                     </Button>
                      </CardContent></Card></Grid>
                   
                ))}

              
            
        </Grid>
     
  </Box>
  <BottomNavigation>
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
    showLabels
    className={classes.root}
  
  <BottomNavigationAction label="Facebook" icon={<img src={fb} style={{ height: 25, width: 25 }}/> } />
  <BottomNavigationAction label="Instagram" icon={<img src={insta} style={{ height: 25, width: 25 }}/>} />
  <BottomNavigationAction label="Youtube" icon={<img src={yt} style={{ height: 25, width: 25 }}/>} />
  
     
  </BottomNavigation>
</Box>

      
    

  )
}
/*<Dialog
       open={open}
        onClose={handleclose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
<DialogTitle id="alert-dialog-title">{"Send certificates to participants?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By clicking on <b>yes</b> the certificates will be sent to respective mail ids of the participants 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={axios.post('http://localhost:8081/account/leader/sendCertificates/{option.event_id}')} color="primary" onClose={handleClose}>
          {option.event_id}
          </Button>
          <Button onClick={handleclose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>

      </Dialog>*/

     /* onClick={()=>
        {axios.post(`http://localhost:8081/account/leader/sendCertificates/${option.event_id}`);this.disabled=true}}>*/