import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { asyncActions } from '../../slices';
import selectors from '../../selectors';

const ChannelRenameItem = () => {

  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const id = useSelector(selectors.getCurrentChannelId);
  const { name, removable } = useSelector((state) => selectors.selectChannelById(state, id));

  const generateOnSubmit = ({ text }, { setSubmitting }) => {
    setSubmitting(true);
    const data = { params: { id }, data: { attributes: { text } } };
    dispatch(asyncActions.renameChannel(data)).then(() => setOpenDialog(false));
  };

  const f = useFormik({
    initialValues: { text: name },
    onSubmit: generateOnSubmit,
    onReset: () => setOpenDialog(false),
  });

  const hideModal = () => setOpenDialog(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary mb-2"
        disabled={!removable}
        onClick={() => setOpenDialog(true)}
      >
        Rename channel
      </button>
      <Modal show={openDialog} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Form onSubmit={f.handleSubmit} onReset={f.handleReset}>
          <Modal.Body>
            <Form.Control
              autoFocus
              required
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              name="text"
              type="text"
              // ref={inputRef}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={f.isSubmitting}>Rename</Button>
            <Button variant="secondary" type="reset" disabled={f.isSubmitting}>Cancel</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
// const ChannelRenameItem = () => {
//   const dispatch = useDispatch();
//   const [openDialog, setOpenDialog] = useState(false);

//   const id = useSelector(selectors.getCurrentChannelId);
//   const { name, removable } = useSelector((state) => selectors.selectChannelById(state, id));

//   const onSubmit = ({ text }, { setSubmitting }) => {
//     setSubmitting(true);
//     const data = { params: { id }, data: { attributes: { name: text } } };
//     dispatch(asyncActions.renameChannel(data)).then(() => setOpenDialog(false));
//   };

//   return (
//     <>
//       <button
//         type="button"
//         className="btn btn-secondary mb-2"
//         disabled={!removable}
//         onClick={() => setOpenDialog(true)}
//       >
//         Rename channel
//       </button>
//       <Modal
//         show={openDialog}
//         onHide={() => setOpenDialog(false)}
//         animation={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Rename channel</Modal.Title>
//         </Modal.Header>
//         <Formik initialValues={{ text: name }} onSubmit={onSubmit}>
//           {(props) => {
//             const {
//               dirty,
//               values,
//               handleBlur,
//               handleSubmit,
//               handleChange,
//               isSubmitting,
//             } = props;
//             return (
//               <Form onSubmit={handleSubmit}>
//                 <Modal.Body>
//                   <FormControl
//                     autoFocus
//                     name="text"
//                     value={values.text}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     margin="dense"
//                   />
//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Button variant="secondary" onClick={() => setOpenDialog(false)}>
//                     Close
//                   </Button>
//                   <Button type="submit" variant="primary" disabled={!dirty || isSubmitting}>
//                     Save Changes
//                   </Button>
//                 </Modal.Footer>
//               </Form>
//             );
//           }}
//         </Formik>
//       </Modal>
//     </>
//   );
// };

export default ChannelRenameItem;
