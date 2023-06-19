import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const token = localStorage.getItem('token') ? localStorage?.getItem('token') : '';

const initialState = {
  list: [],
  tweet: {},
  commentList: {},
  comment: {},
  isSubmitting: false,
  hasMore: true,
};

export const TweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    onNewList: (initialState, action) => {
      console.log(initialState.list, action.payload);
      initialState.list = [];
      initialState.hasMore = true;
    },
    onGetList: (initialState, action) => {
      initialState.list = [...initialState.list, ...action.payload];
    },
    onSetHasMore: (initialState, action) => {
      console.log(action.payload, initialState.list.length);
      initialState.hasMore = initialState.list.length >= action.payload ? false : true;
    },
    onSaveTweet: (initialState, action) => {
      console.log(action);
      initialState.tweet = action.payload;
      //   console.log(initialState.tweet);
    },
    toggleBtn: (initialState, action) => {
      initialState.isSubmitting = !initialState.isSubmitting;
    },
  },
});

export const getTweetsAsync = (values) => async (dispatch) => {
  try {
    console.log(values);
    let param = { page: values?.page || 1, limitPage: 3 };
    // if (filter.category_id) param['searchCategory'] = filter.category_id;
    if (values?.search) param['searchQuery'] = values?.search;
    // if (filter.ordered) {
    //   param['ordered'] = filter.ordered;
    //   param['orderedBy'] = filter.orderedBy;
    // }
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/tweets`, {
      params: param,
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(response.data.data);
    dispatch(onGetList(response?.data?.data));
    dispatch(onSetHasMore(response?.data?.pageCount));
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
  }
};

export const getTweetAsync = (id) => async (dispatch) => {
  try {
    // console.log('getProduct');
    const postDetail = await axios.get(`${process.env.REACT_APP_API_URL}/tweet/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    // dispatch(onGetProduct(response.data));
  } catch (error) {
    console.log('error');
  }
};

export const postTweetAsync = (values) => async (dispatch) => {
  try {
    const { image, caption, replyId } = values;
    console.log(caption, '=====>>>', replyId);
    if (!image && !caption) throw { message: 'Tweet cannot be empty' };
    let { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/tweets`,
      {
        caption,
        image,
        reply_id: replyId,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    dispatch(onNewList());
    dispatch(getTweetsAsync());
    toast.success('Tweet Created');
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const { onNewList, onSetHasMore, onGetList, onSaveTweet, toggleBtn } = TweetSlice.actions;
export default TweetSlice.reducer;
