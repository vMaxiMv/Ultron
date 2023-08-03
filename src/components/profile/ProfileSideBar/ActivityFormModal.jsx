// import React from 'react';
// import Modal from 'react-modal';
// import { useDispatch } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import {FillActivityThunk} from "../../../redux/ProfileReducer";
//
// const buttonBlockChangeStyles = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
// };
//
// const buttonChangeStyles = {
//     padding: '8px 12px',
//     margin: '5px',
//     borderRadius: '4px',
//     background: 'rgba(255, 255, 255, 0.2)',
//     border: 'none',
//     color: 'white',
//     fontSize: '14px',
//     cursor: 'pointer',
// };
//
// const ActivityFormModal = ({ isOpen, onRequestClose, onSubmitHandler, buttonText, ActivityButtons }) => {
//     const dispatch = useDispatch();
//     const { register, handleSubmit, reset } = useForm();
//
//     const closeModal = () => {
//         reset();
//         onRequestClose();
//     };
//
//     const onSubmit = async (data) => {
//         onSubmitHandler(data);
//         closeModal();
//     };
//
//     return (
//         <Modal
//             isOpen={isOpen}
//             onRequestClose={closeModal}
//             style={{
//                 overlay: {
//                     background: 'rgba(20, 20, 20, 0.9)',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                 },
//                 content: {
//                     top: '50%',
//                     left: '50%',
//                     right: 'auto',
//                     bottom: 'auto',
//                     marginRight: '-50%',
//                     transform: 'translate(-50%, -50%)',
//                     background: '#499eb4',
//                     border: 'none',
//                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
//                     borderRadius: '8px',
//                     padding: '20px',
//                     color: 'white',
//                     width: '25%', // Adjust the width to your preference
//                 },
//             }}
//         >
//             <h3>{buttonText} активности</h3>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <input {...register('amount')} type="number" placeholder="Введите число" />
//                 <br />
//                 <input {...register('description')} type="text" placeholder="Введите текст" />
//                 <br />
//                 <input {...register('date_added')} type="date" />
//                 <br />
//                 {/*<select {...register('option')}>*/}
//                 {/*    {Object.entries(ActivityButtons).map(([key, value]) => (*/}
//                 {/*        <option  key={key}>*/}
//                 {/*            {`${value}`}*/}
//                 {/*        </option>*/}
//                 {/*    ))}*/}
//                 {/*</select>*/}
//
//                 <div style={buttonBlockChangeStyles}>
//                     <button style={buttonChangeStyles} type="submit">
//                         {buttonText}
//                     </button>
//                     <button style={buttonChangeStyles} type="button" onClick={closeModal}>
//                         Отмена
//                     </button>
//                 </div>
//             </form>
//         </Modal>
//     );
// };
//
// export default ActivityFormModal;