import { TextField } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { postTweetAsync } from '../../Features/Tweet/TweetSlice';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  // name: Yup.string().email('Invalid name').required('Required'),
  // image: Yup.mixed()
  //   .required('Required')
  //   .test('is-valid-type', 'Not a valid image type', (value) => isValidFileType(value && value.image.toLowerCase(), 'image')),
});

export const NewTweet = (props) => {
  const dispatch = useDispatch();
  const isSubmit = useSelector((state) => state?.tweet?.isSubmitting);

  const toBlob = (imageRaw) => {
    if (!imageRaw) {
      setViewImage(null);
      return;
    }
    let file = imageRaw;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setViewImage(reader.result);
    };
  };
  const [viewImage, setViewImage] = useState(null);

  const [initialData, setInitialData] = useState({
    caption: '',
    image: '',
  });

  const replyId = props.replyTo;

  useEffect(() => {
    setInitialData({
      caption: props?.tweet?.caption || '',
      image: '',
    });
    setViewImage(props.tweet?.image);
  }, [props?.tweet?.caption]);

  console.log(replyId, 'replyId<+++++++==');
  return (
    <div className="px-[1em] py-[0.5em]">
      <div className="content flex gap-[0.5em]">
        <div className="userImage w-[3em]  flex justify-center">
          <img src={`${process.env.REACT_APP_API_URL}/UserProfile/default.png`} alt={`${process.env.REACT_APP_API_URL}/UserProfile/default.png`} className="max-h-[3em]" />
        </div>
        <div className="form grow">
          <Formik
            initialValues={initialData}
            enableReinitialize={true}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={(values, { resetForm }) => {
              try {
                dispatch(postTweetAsync({ ...values, replyId }));
                resetForm();
                setViewImage(null);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting, handleBlur, handleChange, setValues, resetForm }) => {
              return (
                <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
                  <div className="inputCaption border-b pb-5">
                    <textarea type="text" onChange={handleChange} onBlur={handleBlur} className="bg-black w-full  outline-none h-[3em] grow" placeholder="What is happening?!" multiple value={values.caption} name="caption" />
                    {/* <TextField
                    // multiline
                    sx={{ input: { color: 'white' } }}
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="pl-[20px] pr-[15px] py-[20px]  rounded-xl w-full "
                  /> */}
                    {touched.caption && errors.caption && <div>{errors.caption}</div>}
                    {viewImage ? <p className="img-preview-wrapper flex justify-center">{<img className="max-h-[400px]" src={viewImage} alt="preview" />}</p> : null}
                  </div>
                  <div className="buttons flex justify-between items-center">
                    <div className="inputIcon" aria-hidden="true">
                      <input
                        id="file"
                        name="image"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                          values.image = e.target.files[0];
                          toBlob(e.target.files[0]);
                        }}
                        className="pl-[20px] pr-[15px] py-[5px]  rounded-xl max-w-[5em]"
                      />
                      {touched.image && errors.image && <div>{errors.image}</div>}
                    </div>
                    <button
                      onClick={() => {
                        if (values.caption || values.image) props?.handleClose ? props.handleClose() : console.log();
                      }}
                      type="submit"
                      className="dark:bg-[#1DA1F2] hover:dark:bg-[#1da0f2da] text-[white] rounded-3xl py-[10px] shrink-0 w-[90px] my-[10px]"
                      disabled={isSubmit}
                    >
                      Tweet
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
