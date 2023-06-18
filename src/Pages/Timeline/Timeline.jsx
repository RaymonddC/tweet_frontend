import React from 'react';
import { TweetCard } from '../../Components/TweetCard/TweetCard';
import { NewTweet } from '../../Components/NewTweet/NewTweet';

export const Timeline = () => {
  return (
    <div className="bg-black min-h-[100vh] text-white overflow-auto flex flex-col tweets shrink md:grow md:shrink-0 p-[2em]">
      <div className="tweet h-[20vh]">
        <NewTweet />
      </div>
      <div className="">
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
        <TweetCard />
        <TweetCard />
      </div>
      {/* <div className="rightBar shrink lg:grow max-w-[30vw] border border-[#808080] hidden md:block">a</div> */}
    </div>
  );
};
