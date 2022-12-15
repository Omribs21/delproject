import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArgentinaShirt from '../../images/ArgentinaShirt.jpeg'
import ArgentinaShirtBack from '../../images/ArgentinaShritBack.jpeg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItem, selecttotalQuantity, selectItems, selectCartItems } from '../../Slicers/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPersonalProductsAsync, selectAllPersonalprods } from '../../Slicers/GetAllPersonalProductsSlice';
import chelseaShirtFront from "../../images/ChelseaShirtFront.jpeg"
import chelseaShirtBack from "../../images/ChelseaShirtBack.jpeg"
import juventusShirtFront from "../../images/juventusShirtFront.jpeg"
import juventusShirtBack from "../../images/juventusShirtBack.jpeg"
import psgShirtFront from "../../images/PSGshirtFront.jpeg"
import psgShirtBack from "../../images/PSGshirtBack.jpeg"
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[900],
                        opacity: 0.5
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function Testmodal() {
    const [open, setOpen] = React.useState(false);
    const cardIds = [0,1,2,3]
    const [unclickedcardIds, setunclickedcardIds] = useState(cardIds)

    //  THE FUNCTION THAT OPENS THE DIALOG IN LINE: 220
    const handleClickOpen =  () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
      dispatch(GetAllPersonalProductsAsync())
    }, [])
    
    const [Size, setSize] = useState("")
    const [Quantitycount, setQuantitycount] = useState(0)
    const [BackName, setBackName] = useState("")
    const [BackNumber, setBackNumber] = useState(0)
    const [Comments, setComments] = useState("")
    const [over, setOver] = useState(false);
    const totalQuantity = useSelector(selecttotalQuantity)
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()
    const AllPersonalProducts = useSelector(selectAllPersonalprods)
    


    const pictures = [
        { front: ArgentinaShirt, back: ArgentinaShirtBack },
        { front: juventusShirtFront, back: juventusShirtBack },
        { front: psgShirtFront, back: psgShirtBack },
        { front: chelseaShirtFront, back: chelseaShirtBack },
    ]
    // create the data for choosing the patch and handle it.
    const options = [

        { value: 'empty', text: 'without' },
        { value: 'SpanishLeague', text: 'Spanish League' },
        { value: 'FrenchLeague', text: 'French League' },
        { value: 'ChampionsLeague', text: 'Champions League' },
    ];
    const [selected, setSelected] = useState(options[0].value);

    const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value);
    };

    // Create empty textBox
    const ref = useRef(null);
    
    
    

    const handleClickComments = event => {
        // 👇️ access textarea value
        console.log(ref.current.value);
        setComments(ref.current.value);
    };

    const clean = () => {
        setSize("");
        setQuantitycount(0);
        setBackName("");
        setBackNumber(0);
    }
    // Check if modal is closed to clean the data
    useEffect(() => {
        if (!open) { clean(); }
    }, [open])

    const notify = () => {

        if (BackName == '') {
            toast.error('Please fill the Name field.', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (Size == "") {
            toast.error('Please fill the Size field.', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (Quantitycount == 0) {
            toast.error('Please fill the Quantity field.', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }
        else {
            toast.success('Your item was added!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }
    }


    const FinalAddToCart = (desc, price) => {
        if (Quantitycount >= 1 && BackName.length > 1 && BackNumber >= 0 && BackNumber < 100 && Size != "") {
            dispatch(addItem({
                id: cartItems.length + 1,
                desc: desc,
                quantity: Number(Quantitycount),
                back_name: BackName,
                number: BackNumber,
                price: price,
                size: Size,
                patch: selected,
                comments: Comments,
                total: Quantitycount * price
            }))
            handleClose();
        }

    }

    return (
        <div style={{ marginTop:"2.5%" }} className="container">
            <div className="row">
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {AllPersonalProducts.map((prod, index) =>
                        <div className="col-sm-3">
                            <div key={index} className="panel panel-primary">
                                <div style={{ fontSize: "medium" }} className="panel-heading">{prod.desc}</div> {/*name of the product */}
                                <div className="panel-body">
                                    <div key={index} >
                                        {console.log(index)}
                                        {console.log(prod._id)}
                                        {/* HERE IM TRYING TO OPEN BY ID OR INDEX */}
                                        <Button  onClick={ handleClickOpen}>
                                            <img style={{ width: "250px", height: "250px" }} src={pictures[index].front}></img>
                                        </Button>
                                        <BootstrapDialog
                                            onClose={handleClose}
                                            aria-labelledby="customized-dialog-title"
                                            open={open}
                                        >
                                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                                <p style={{ fontSize: "20px", textAlign: 'center' }}>{prod.desc} 2022/2023</p>
                                                <p style={{ fontSize: "35px", textAlign: 'center' }}>{prod.price}</p>
                                            </BootstrapDialogTitle>
                                            <DialogContent dividers>
                                                <div>
                                                    <div>
                                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                                            <div style={{ display: "flex", flexDirection: "column", fontSize: "15px" }}>
                                                                <p style={{ fontSize: "15px" }}>Please choose the following:</p>
                                                                Name at the back:
                                                                <input required placeholder='Choose Name' value={BackName} onChange={(e) => setBackName(e.target.value)} /><br></br>
                                                                Number at the back:
                                                                <input required style={{ width: "45%", marginLeft: "0px", blockSize: "30px", fontSize: "15px" }} type={"number"} min={0} max={99} value={BackNumber} onChange={(e) => setBackNumber(e.target.value)} /><br></br>
                                                                Patch:
                                                                <select style={{ marginLeft: "0px", marginRight: "10px" }} value={selected} onChange={handleChange}>
                                                                    {options.map(option => (
                                                                        <option key={option.value} value={option.value}>
                                                                            {option.text}
                                                                        </option>
                                                                    ))}
                                                                </select><br></br>
                                                                Size:
                                                                <div style={{ padding: "10px" }}>
                                                                    <form>
                                                                        <input type="radio" id="small" name="check" value="S" onChange={(e) => setSize(e.target.value)} />
                                                                        <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="small">S</label>
                                                                        <input type="radio" id="medium" name="check" value="M" onChange={(e) => setSize(e.target.value)} />
                                                                        <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="medium">M</label>
                                                                        <input type="radio" id="large" name="check" value="L" onChange={(e) => setSize(e.target.value)} />
                                                                        <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="large">L</label>
                                                                        <input type="radio" id="xlarge" name="check" value="XL" onChange={(e) => setSize(e.target.value)} />
                                                                        <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="xlarge">XL</label>
                                                                        <input type="radio" id="xxlarge" name="check" value="XXL" onChange={(e) => setSize(e.target.value)} />
                                                                        <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="xxlarge">XX-L</label>{" "}
                                                                    </form>
                                                                </div>
                                                                Quantity:
                                                                <input required style={{ width: "45%", marginLeft: "0px", blockSize: "30px", fontSize: "15px" }} type={"number"} min={1} max={10} value={Number(Quantitycount)} onChange={(e) => setQuantitycount(e.target.value)} />
                                                            </div>
                                                            <div onMouseOver={() => setOver(true)}
                                                            onMouseOut={() => setOver(false)} style={{ paddingLeft: "15px", height: "250px" }}>
                                                            <img src={over ? pictures[index].back : pictures[index].front}
                                                                alt="arrow"
                                                                width="250"
                                                                height="250" ></img>
                                                        </div>
                                                        

                                                        </div><br></br>
                                                        <div>
                                                            <label style={{ fontSize: "15px" }} htmlFor="message">Comments:</label><br></br>
                                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                                <textarea rows={1} style={{ fontSize: "15px" }} ref={ref} id="message" name="message" />
                                                                <button style={{ marginLeft: "10px" }} onClick={handleClickComments}>Save</button>
                                                            </div>
                                                        </div>
                                                        <hr></hr>
                                                        <div>
                                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                                                <p style={{ paddingTop: "0px" }}>Quantity:{Quantitycount}  |   Price:{prod.price}</p>
                                                            </div>
                                                            <p style={{ textAlign: "center" }}>Total: {Quantitycount * prod.price}₪</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogContent>

                                            <Button style={{ fontSize: "large", color: "white", backgroundColor: "#1E90FF" }} onClick={() => { FinalAddToCart(); notify(); }}>
                                                Add to cart
                                            </Button>

                                        </BootstrapDialog>

                                    </div>

                                </div>
                                <div style={{ color: "black", fontSize: "25px", display: "flex", flexDirection: "row", justifyContent: "center" }} className="panel-footer"><p><del>{prod.price}₪</del> {prod.discount_price}₪</p></div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
