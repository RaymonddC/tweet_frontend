import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const token = localStorage.getItem('token') ? localStorage?.getItem('token') : '';

const initialState = {
  list: [],
  tweet: {},
  commentList: [],
  comment: {},
  isSubmitting: false,
  hasMore: true,
  hasMoreComment: false,
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
    onNewCommentList: (initialState, action) => {
      initialState.commentList = [];
      initialState.hasMore = true;
    },
    onGetCommentList: (initialState, action) => {
      initialState.commentList = [...initialState.commentList, ...action.payload];
    },
    onSetHasMoreComment: (initialState, action) => {
      console.log(action.payload, initialState.list.length);
      initialState.hasMoreComment = initialState.commentList.length >= action.payload ? false : true;
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
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tweets/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    // console.log(response);
    dispatch(onSaveTweet(response.data.data));
    dispatch(onNewCommentList());
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
  }
};

export const getCommentsTweetAsync = (values) => async (dispatch) => {
  try {
    // console.log('getProduct');
    let param = { page: values?.page || 1, limitPage: 5 };
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tweets/comments/${values.id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    console.log(response);
    dispatch(onGetCommentList(response?.data?.data));
    dispatch(onSetHasMoreComment(response?.data?.pageCount));
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
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

    if (replyId) {
      dispatch(onNewCommentList());
      dispatch(getCommentsTweetAsync({ id: replyId }));
    } else {
      dispatch(onNewList());
      dispatch(getTweetsAsync());
    }
    toast.success('Tweet Created');
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const deleteTweet = (value) => async (dispatch) => {
  try {
    const { id } = value;
    let result = await axios.delete(`${process.env.REACT_APP_API_URL}/tweets/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (result.status === 200) {
      if (result.data.reply_id) {
        dispatch(onNewCommentList());
        dispatch(getCommentsTweetAsync({ id: result?.replyId }));
      } else {
        dispatch(onNewList());
        dispatch(getTweetsAsync());
      }
      toast.success('Tweet Deleted!');
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const updateTweet = (values) => async (dispatch) => {
  try {
    const { id, caption, image } = values;
    console.log(id);
    const result = axios.put(
      `${process.env.REACT_APP_API_URL}/tweets/${id}`,
      {
        caption,
        image,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (result.data?.reply_id) {
      dispatch(onNewCommentList());
      dispatch(getCommentsTweetAsync({ id: result?.replyId }));
    } else {
      dispatch(onNewList());
      dispatch(getTweetsAsync());
    }
    toast.success('Tweet Updated');
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const { onNewList, onSetHasMore, onGetList, onSaveTweet, onGetCommentList, onSetHasMoreComment, onNewCommentList, toggleBtn } = TweetSlice.actions;
export default TweetSlice.reducer;
