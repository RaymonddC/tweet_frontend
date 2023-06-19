import React, { useEffect, useState } from 'react';
import { TweetCard } from '../../Components/TweetCard/TweetCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsTweetAsync, getTweetAsync } from '../../Features/Tweet/TweetSlice';
import { NewTweet } from '../../Components/NewTweet/NewTweet';
import InfiniteScroll from 'react-infinite-scroller';
import AddIcon from '@mui/icons-material/Add';

export const DetailTweet = () => {
  const params = useParams();
  let dispatch = useDispatch();

  const tweet = useSelector((state) => state.tweet.tweet);
  const comments = useSelector((state) => state.tweet.commentList);
  const more = useSelector((state) => state.tweet.hasMoreComment);
  const [openAdd, setOpenAdd] = useState(false);
  const [replyId, setreplyId] = useState(null);

  useEffect(() => {
    dispatch(getTweetAsync(params.id));
    dispatch(getCommentsTweetAsync({ id: params?.id }));
  }, []);
  console.log(comments);
  return (
    <div>
      <TweetCard values={tweet} />
      <NewTweet replyTo={params.id} />
      <InfiniteScroll
        pageStart={1}
        loadMore={(page) => {
          console.log(page);
          dispatch(getCommentsTweetAsync({ page, id: params?.id }));
        }}
        hasMore={more}
        loader={
          <div className="loader" key="loader">
            Loading ...
          </div>
        }
      >
        {comments.map((value, key) => {
          return (
            <div
            // onClick={() => {
            //   setreplyId(value.id);
            //   setOpenAdd(true);
            // }}
            >
              <TweetCard key={key} values={value} comment={setOpenAdd} reply={setreplyId} />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
