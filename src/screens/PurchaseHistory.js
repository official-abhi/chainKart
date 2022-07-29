import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { userContext } from '../services/AddressProvider';
import { FetchOrder } from '../services/firebaseAPI';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';








//{user,prductId,name,expire_date,SerialNumber,price,productNFTHash,warrentyNFTHash,productNFT,warrentyNFT,timeStamp:new Date()});


export default function TransactionHistory() {
    const{Address} = React.useContext(userContext);
const [loading,setLoading] = React.useState(false);
const[data,setData]=React.useState([]);

React.useEffect(()=>{
    getOrder();
},[])
async function getOrder(){
    setLoading(true);
const res = await FetchOrder(Address.toString());
console.log(res);
if(res){
    setData(res);
}
setLoading(false);

}
const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
   <div style={{flex:1}}>
       <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <Link to={'/'} style={{backgroundColor:'transparent',color:"white"}}  color={'#fff'}><ArrowBackIosNewIcon /></Link>
            {/* <img src="https://cdn-icons-png.flaticon.com/512/60/60992.png"
            width={30} height={30}/> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Purchase History
          </Typography>
          {/* <Button color="inherit"><Link to={'/'} style={{backgroundColor:'transparent',color:"white"}}  color={'#fff'}>Switch to Buyer</Link></Button> */}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1,justifyContent:'flex-end',textAlign:'right' }}>
            Wellcome {Address.toString()}
          </Typography></Toolbar>
      </AppBar>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">expire date</TableCell>
            <TableCell align="right">ProductNFT</TableCell>
            <TableCell align="right">WarrentyNFT</TableCell>
            <TableCell align="right">Timestamp</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (

            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.price+" ETH"}</TableCell>
              <TableCell align="right">{new Date(row.expire_date).toDateString()}</TableCell>
              <TableCell align="right">{<Button variant='outlined' onClick={()=>{openInNewTab(`https://rinkeby.etherscan.io/tx/${row.productNFTHash}`)}}>Open</Button>}</TableCell>
              <TableCell align="right">{<Button variant='outlined' onClick={()=>{openInNewTab(`https://rinkeby.etherscan.io/tx/${row.warrentyNFTHash}`)}}>Open</Button>}</TableCell>
              <TableCell align="right">{new Date(row.timeStamp).toDateString()}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></div>
  );
}