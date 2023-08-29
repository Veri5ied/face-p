import * as React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import PublicIcon from '@mui/icons-material/Public';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { hoursAgo } from '@/assets/hours-ago';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Button} from '@mui/material'
import CustomDialog from './CustomDialog';
import {db} from '@/settings/firebase.setting'
import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import ActivityIndicator from '@/utils/activity-indicator';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};




export default function PostDisplay({ postID, timePosted, body, postImage }) {
    
    const { data: session } = useSession();
    const [showActivityIndicator,setShowActivityIndicator]= React.useState(false)

        //Handles Menu Control >>>> Start
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
        //Handles Menu Control >>>> END

        //Handles DIALOG Control >>>> Start
    const [openDialogBox, setOpenDialogBox] = React.useState(false);
    const handleClickOpenDialogBox = () => setOpenDialogBox(true)
    const handleCloseDialogBox = () => setOpenDialogBox(false)
        //Handles DIALOG Control >>>> End
    
    //Handles DIALOG Control >>>> Start
    const [openDialogUpdate, setOpenDialogUpdate] = React.useState(false);
    const handleClickOpenDialogUpdate = () => setOpenDialogUpdate(true)
    const handleCloseDialogUpdate = () => setOpenDialogUpdate(false)
        //Handles DIALOG Control >>>> End
        
        /////Function for Modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
        
    
    //FUNCTION FOR DELETE POST

    const handleDeletePostt = async () => {
        await deleteDoc(doc(db, 'posts', postID))
            .then(() => alert('post deleted'))
            .catch(e => console.error(e))
    }
   
    //State change for updating val :""
    const [updateValue, setUpdateValue] = useState(body);
    // const [updateImage, setUpdateImageValue] = useState(postImage);

    const handleUpdatePost = async () => {
         handleClickOpenDialogUpdate()//close dialog
        setShowActivityIndicator(true) //start activity indicator
        await updateDoc(doc(db, 'posts', postID, {
            body: updateValue,
            updatedAt: new Date().getTime(),
            
        },
            {
                merge: true,
            }
        ))
            .then(() => {
                setShowActivityIndicator(true)
                alert('updated')
            })
             .catch(error => console.error(error))
        //  console.log(updateValue);
    }

    

    return (
        <>
            {showActivityIndicator ? <ActivityIndicator /> : null}
            {/* <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box> */}
        <div className="border border-gray-100 bg-white rounded-md shadow-md py-4 mb-4">
            <ul className="flex justify-between px-4">
                <li className="flex flex-row gap-1 items-center">
                    <Image
                        className="rounded-full"
                        src={session?.user.image}
                        width={40} height={40}
                        alt="profile photo" />
                    <div className='flex flex-col'>
                        <small className="text-gray-800">{session?.user.name}</small>
                        <small className='text-gray-500'>
                            <span>{hoursAgo(timePosted)}hours ago</span>
                            <PublicIcon sx={{ fontSize: 15 }} />
                        </small>
                    </div>
                </li>
                <li>
                    <div className="text-gray-700">
                        <button className='p-2 hover:bg-gray-200 rounded-full'>
                            <MoreHorizIcon  
                            onClick={handleClick}
                                />
                        </button>
                    </div>
                </li>
            </ul>

            <p className='px-4'>{body}</p>
            <Image
                src={postImage}
                width={560}
                height={560}
                alt='post image'
                className='w-full h-auto py-4' />
            <div className='flex flex-row justify-between px-4'>
                <div className='flex items-center justify-center w-[20px] h-[20px] rounded-full bg-sky-800'>
                    <ThumbUpIcon
                        sx={{ color: 'white', fontSize: 15 }}
                    />
                </div>
                <span className='text-gray-500'>
                    2 comments
                </span>
            </div>
            <hr style={{ color: 'black' }} />

            <div className='flex flex-row justify-around  gap-4 pt-2'>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <ThumbUpIcon />
                    Like
                </button>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <ChatBubbleOutlineRoundedIcon />
                    Comment
                </button>
            </div>
            </div>

            {/* //Position it anywhere irrespective of position  */}
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleOpenModal}>Update</MenuItem>
                <MenuItem onClick={handleClickOpenDialogBox}>delete</MenuItem>
            </Menu>

            
            {/* DELETE DIALOG */}
            <CustomDialog
                openProp={openDialogBox}
                handleCloseProp={handleCloseDialogBox}
                title='Delete Post?'
            >
                <p>Confirm Post Deletion</p>
                <Button variant='outlined'
                    color='error'
                    onClick={handleDeletePostt}
                >Yes, Delete
                </Button>
            </CustomDialog>


            {/* UPDATE DIALOG
            <CustomDialog
                openProp={openDialogBox}
                handleCloseProp={handleCloseDialogBox}
                title='Update Post?'
            >
                <p>Confirm Post Deletion</p>
                <Button variant='outlined'
                    color='error'
                    onClick={handleDeletePostt}
                >Yes, Delete
                </Button>
            </CustomDialog> */}

            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Post
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        
                        sx={{ mt: 2 }}>
                        <div className='flex flex-row justify-start gap-3'>
                            <Image
                                className="rounded-full"
                                width={28}
                                height={28}
                                src={session?.user.image}
                                alt="profile photo" />
                            
                            <p className="text-gray-700 font-semibold">{session?.user.name}</p>


                            
                        </div>
                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                multiline
                                maxRows={4}
                                type="text"
                                fullWidth
                                id="filled-textarea"
                                value={updateValue}
                                onChange={(text) => setUpdateValue(text.target.value)}
                                
                            />

                            
                        </div>
                        
                    </Typography>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={handleUpdatePost}
                        style={{marginTop: 8}}
                    >
                        Update
                    </Button>
                </Box>
            </Modal>

            </>
        
    )
}

// import Image from 'next/image';
// import { useSession } from 'next-auth/react';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
// import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
// import PublicIcon from '@mui/icons-material/Public';
// import ClearIcon from '@mui/icons-material/Clear';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import { hoursAgo } from '@/assets/hours-ago';

// export default function PostDisplay({ timePosted, body, postImage }) {
//     const { data: session } = useSession();

    
//     return (
//         <>
//         <div className="border border-gray-100 bg-white rounded-md shadow-md py-4 mb-4">
//             <ul className="flex justify-between px-4">
//                 <li className="flex flex-row gap-1 items-center">
//                     <Image
//                         className="rounded-full"
//                         src={session?.user.image}
//                         width={40} height={40}
//                         alt="profile photo" />
//                     <div className='flex flex-col'>
//                         <small className="text-gray-800">{session?.user.name}</small>
//                         <small className='text-gray-500'>
//                             <span>{hoursAgo(timePosted)} hours ago</span>
//                             <PublicIcon sx={{ fontSize: 15 }} />
//                         </small>
//                     </div>
//                 </li>
//                 <li>
//                     <div className="text-gray-700">
//                         <button className='p-2 hover:bg-gray-200 rounded-full'>
//                             <MoreHorizIcon />
//                         </button>
                        
//                     </div>
//                 </li>
//             </ul>

//             <p className='px-4'>{body}</p>
//             <Image
//                 src={postImage}
//                 width={560}
//                 height={560}
//                 alt='post image'
//                 className='w-full h-auto py-4' />
//             <div className='flex flex-row justify-between px-4'>
//                 <div className='flex items-center justify-center w-[20px] h-[20px] rounded-full bg-sky-800'>
//                     <ThumbUpIcon
//                         sx={{ color: 'white', fontSize: 15 }}
//                     />
//                 </div>
//                 <span className='text-gray-500'>
//                     2 comments
//                 </span>
//             </div>
//             <hr style={{ color: 'black' }} />

//             <div className='flex flex-row justify-around  gap-4 pt-2'>
//                 <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
//                     <ThumbUpIcon />
//                     Like
//                 </button>
//                 <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
//                     <ChatBubbleOutlineRoundedIcon />
//                     Comment
//                 </button>
                
//             </div>
//         </div>
//         </>
        
//     )
// }