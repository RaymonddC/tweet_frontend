import { TextField } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  // name: Yup.string().email('Invalid name').required('Required'),
  // image: Yup.mixed()
  //   .required('Required')
  //   .test('is-valid-type', 'Not a valid image type', (value) => isValidFileType(value && value.image.toLowerCase(), 'image')),
});

export const NewTweet = (props) => {
  const dispatch = useDispatch();

  const toBlob = (imageRaw) => {
    let file = imageRaw;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setViewImage(reader.result);
    };
  };
  const [viewImage, setViewImage] = useState(null);

  const [initialData, setInitialData] = useState({
    name: '',
    image: '',
  });

  useEffect(() => {
    setInitialData({
      caption: props.category?.category_name,
      image: '',
    });
    setViewImage(props.category?.category_image);
    console.log('anjing');
  }, [props.category?.category_name]);
  console.log(props.category);
  return (
    <div>
      <div className="content flex">
        <div className="userImage w-[5em]">
          <img src="" alt="" />a
        </div>
        <div className="form grow">
          <Formik
            initialValues={initialData}
            enableReinitialize={true}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={(values, { setSubmitting }) => {
              try {
                setTimeout(() => {
                  if (props.tweet) {
                    // dispatch(updateCategory({ id: props.category.id, category_name: values.name, category_image: values.image }));
                  } else {
                    // dispatch(postCategoryAsync(values));
                  }
                  console.log('yokk');
                  //   alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting, handleBlur, handleChange, setValues }) => {
              return (
                <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
                  {/* <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.name} name="name" /> */}
                  <TextField
                    // multiline
                    sx={{ input: { color: 'white' } }}
                    id="outlined-basic"
                    label="What is happening?!"
                    variant="outlined"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="pl-[20px] pr-[15px] py-[20px]  rounded-xl w-full "
                  />
                  {touched.name && errors.name && <div>{errors.name}</div>}
                  <input
                    id="file"
                    name="image"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      values.image = e.target.files[0];
                      toBlob(e.target.files[0]);
                    }}
                    className="pl-[20px] pr-[15px] py-[15px]  rounded-xl w-full border "
                  />
                  {touched.image && errors.image && <div>{errors.image}</div>}
                  {viewImage ? <p className="img-preview-wrapper">{<img src={viewImage} alt="preview" />}</p> : null}

                  <button onClick={() => props.handleClose()} type="submit" className="bg-[#FF2351] text-[white] rounded-xl py-[20px] w-full my-[10px]" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
