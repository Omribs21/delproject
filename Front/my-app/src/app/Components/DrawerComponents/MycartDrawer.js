import React from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../Slicers/loginSlice'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteItem, selectCartItems, selecttotalQuantity, selecttotalAmount, cleanCart } from '../../Slicers/CartSlice';

export default function MyCartDrawer() {
    const [state, setState] = React.useState({
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };


    const token = useSelector(selectToken)
    const totalQuantity = useSelector(selecttotalQuantity)
    const totalAmount = useSelector(selecttotalAmount)
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()


    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            style={{ backgroundColor: "#DDDDDD" }}
        >

        </Box>
    );

    const notify = () => {
        toast.info('Log in first', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });
    }
    return (
        <div>

            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button style={{ color: "white" }} onClick={toggleDrawer(anchor, true)}>
                        <lord-icon
                            src="https://cdn.lordicon.com/medpcfcy.json"
                            trigger="hover"
                            colors="primary:#ffffff">
                        </lord-icon>
                    </Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                        <div class="animate__animated animate__backInDown">
                            <h1 style={{ textAlign: "center" }}>My Cart</h1>
                            <hr style={{
                            borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20
                        }}></hr>
                        </div>

                        
                        <div>
                            {cartItems.map((prod) =>
                                <div class="animate__animated animate__backInRight">
                                    <div style={{ textAlign: "center", fontSize: "20px" }}>
                                        <p style={{ fontSize: "15px" }}>Product name:{prod.desc} | Price:{prod.price}</p>
                                        <p style={{ fontSize: "15px" }}>Quantity:{prod.quantity} | Number: {prod.number} | Size:{prod.size} | Name:{prod.back_name}</p>
                                        Total:{prod.total}₪<br></br>
                                        <button style={{ marginTop: "0%", height: "40%", width: "80%", fontSize: "15px", color: "white", backgroundColor: "dodgerblue", borderRadius: "10px", justifyContent: "center" }} onClick={() => dispatch(deleteItem(prod.id))}>Remove item</button>
                                        <hr style={{
                                            borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20
                                        }}></hr>
                                    </div>



                                </div>
                            )}

                            <div class="animate__animated animate__backInUp" style={{ display: "flex", justifyContent: "center" }}>
                                {cartItems.length >= 1 ? <button style={{ marginTop: "0%", height: "40%", width: "80%", fontSize: "15px", color: "white", backgroundColor: "dodgerblue", borderRadius: "10px" }} onClick={() => dispatch(cleanCart())}>Clean Cart</button> : null}

                            </div>


                        </div>
                        {cartItems.length >= 1 ?
                        <div style={{ fontWeight: "bold", marginTop: "45%" }} >
                            <p class="animate__animated animate__backInUp" style={{ textAlign: "left" }}>Cart Total:<span style={{ marginLeft: "50%" }} >{totalAmount}₪</span></p>
                        </div> : 
                        <h2 style={{ textAlign: "center",marginTop:"10%" ,paddingBottom:"200%"}}> The cart is Empty.</h2> }
                        
                        <div class="animate__animated animate__backInUp">
                            {token != '' ? <Link c to="/final_buy"><button  style={{ width: "100%", height: "100%", fontSize: "15px", color: "white", backgroundColor: "dodgerblue", borderRadius: "10px" }}>Final buy</button></Link> : <button style={{ width: "100%", fontSize: "15px", color: "white", backgroundColor: "dodgerblue", borderRadius: "10px" }} onClick={notify}>Buy</button>}
                        </div>


                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
