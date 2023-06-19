import React, { useEffect } from 'react';
import { TweetCard } from '../../Components/TweetCard/TweetCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTweetAsync } from '../../Features/Tweet/TweetSlice';

export const DetailTweet = () => {
  const params = useParams();
  let dispatch = useDispatch();

  const tweet = useSelector((state) => state.tweet.tweet);

  useEffect(() => {
    dispatch(getTweetAsync(params.id));
  }, []);

  return (
    <div>
      <TweetCard values={tweet} />
    </div>
  );
};
