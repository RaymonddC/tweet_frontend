import React from 'react';
import { FaRegComment } from 'react-icons/fa';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

export const TweetButtons = (props) => {
  return (
    <div className="buttons flex items-center justify-around">
      <div className="comment ">
        <FaRegComment size={'17px'} />
      </div>
      <div className="retweet"></div>
      <div className="like">
        <FavoriteBorderOutlinedIcon fontSize="small" />
      </div>
      <div className="view flex gap-[1em] items-center">
        <BarChartOutlinedIcon fontSize="small" />
        <p className="text-sm">{props?.values?.viewed + 1}</p>
      </div>
      <div className="share"></div>
    </div>
  );
};
