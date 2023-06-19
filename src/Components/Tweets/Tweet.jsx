import React, { useEffect, useState } from 'react';
import { TweetCard } from '../TweetCard/TweetCard';
import KeepMountedModal from '../Modal/KeepMountedModal';
import { useDispatch, useSelector } from 'react-redux';
import { getTweetsAsync } from '../../Features/Tweet/TweetSlice';
import InfiniteScroll from 'react-infinite-scroller';
import AddIcon from '@mui/icons-material/Add';
import { NewTweet } from '../NewTweet/NewTweet';

export const Tweet = () => {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state?.tweet?.list);
  const more = useSelector((state) => state?.tweet?.hasMore);
  const [selected, setSelected] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [replyId, setreplyId] = useState(null);

  useEffect(() => {
    dispatch(getTweetsAsync());
    console.log('test');
  }, []);

  if (Object.keys(tweets).length == 0) return <div className="dark:text-white">No Tweet</div>;

  return (
    <div>
      <KeepMountedModal icon={<AddIcon />} button={<span>Tweet Reply</span>} open={openAdd} setOpen={setOpenAdd} formBox={<NewTweet handleClose={() => setOpenAdd(false)} tweet={null} replyTo={replyId} />} />
      <InfiniteScroll
        pageStart={1}
        loadMore={(page) => {
          console.log(page);
          dispatch(getTweetsAsync({ page }));
        }}
        hasMore={more}
        loader={
          <div className="loader" key="loader">
            Loading ...
          </div>
        }
      >
        {tweets.map((value, key) => {
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
      {/* <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard /> */}
    </div>
  );
};
