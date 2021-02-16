import React, { useState, useEffect }from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Links from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import './styles.css';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import {Api, ApiDolar} from '../../services/Api';
import { Card, Row, Col ,CardImg, CardTitle, CardText, CardColumns, CardBody, Alert} from 'reactstrap';
import { Container } from 'reactstrap';


function Copyright() {
  return (
    <Typography variant="body1" color="textSecondary" align="center">
      {'Copyright © '}
      <Links color="inherit" href="https://material-ui.com/">
        Luna
      </Links>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
},
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
const AlertExemple = (props) =>{
    return(
        <Alert color="success">
            Bem-vindo <a href="#" className="alert-link">A Luna </a>. Melhor site para ajudar você a operar.
        </Alert>
    )
}




export default function Dashboard() {

// secket key mMpEwsMvSLQ9YFMuHaRvUI782GRLzEbQBZ4SYomZg4SOyOmUKJkwRKVgnsCbQZXV
//        
useEffect( async ()=>{

    const retornoDolarToReal = await ApiDolar.get('/USD-BRL');

    const valorDolar = (Number(retornoDolarToReal.data[0]['ask']));

    console.log(valorDolar.toFixed(2));
    
    const retorno = await Api.get('/api/v3/ticker/price?symbol=BTCUSDT');

    const el = document.getElementById('btc-usd');
    
    const ele = document.getElementById('btc-real');
    
    const btcusd = Number(retorno.data['price']);

    const real = btcusd * valorDolar;

    el.innerHTML =  'US$ ' + btcusd.toFixed(2) + " USD"
    
    ele.innerHTML = 'R$ '+real.toFixed(2) + ' Reais';

    // const retornoapi = await Api.get('/api/v3/account')
    // var dataquerryString = 'recWindow=20000&timestamp=' + Date.now();
    // var key = 'mADZ8gFqk915uXI95wF76CdwcN7m32erIHTzPlq4M69IrUqIIysYinRgiLX6AKI5'
    // var assinatura = 'mMpEwsMvSLQ9YFMuHaRvUI782GRLzEbQBZ4SYomZg4SOyOmUKJkwRKVgnsCbQZXV'.HmacSHA256(dataquerryString, key)

  },[])

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [itemMoeda, setItemMoeda] = useState([]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Row>
                <Col>
                    <AlertExemple/>
                </Col>
            </Row>
        <Container className="themed-container" fluid={true}>
            <Row>
                <Col sm="2">
                   <Card>
                       <CardBody>
                         <CardText className="text-right">5</CardText>
                            <CardText className="text-center text-warning h6"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="btc" className="svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M310.204 242.638c27.73-14.18 45.377-39.39 41.28-81.3-5.358-57.351-52.458-76.573-114.85-81.929V0h-48.528v77.203c-12.605 0-25.525.315-38.444.63V0h-48.528v79.409c-17.842.539-38.622.276-97.37 0v51.678c38.314-.678 58.417-3.14 63.023 21.427v217.429c-2.925 19.492-18.524 16.685-53.255 16.071L3.765 443.68c88.481 0 97.37.315 97.37.315V512h48.528v-67.06c13.234.315 26.154.315 38.444.315V512h48.528v-68.005c81.299-4.412 135.647-24.894 142.895-101.467 5.671-61.446-23.32-88.862-69.326-99.89zM150.608 134.553c27.415 0 113.126-8.507 113.126 48.528 0 54.515-85.71 48.212-113.126 48.212v-96.74zm0 251.776V279.821c32.772 0 133.127-9.138 133.127 53.255-.001 60.186-100.355 53.253-133.127 53.253z"></path></svg></CardText>
                            <CardTitle className="text-center h5">BitCoin</CardTitle>
                            <CardText className="text-primary text-center h6" id="btc-usd"></CardText>
                            <CardText className="text-success text-center h6" id="btc-real"></CardText>

                       </CardBody>
                   </Card>
                </Col>
            </Row>
        </Container>
      </main>
    </div>
  );
}