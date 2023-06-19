import React from 'react';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import { FaRegComment } from 'react-icons/fa';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { Link } from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTweet } from '../../Features/Tweet/TweetSlice';

function dateDiffInDays(a, b) {
  const _MS_PER_MINUTE = 1000 * 60;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  let result = Math.floor((a - b) / _MS_PER_MINUTE);
  result = result / (7 * 60 * 24) >= 1 ? Math.ceil(result / (7 * 60 * 24)) + 'w' : result / (60 * 24) >= 1 ? Math.ceil(result / (60 * 24)) + 'd' : result / 60 >= 1 ? Math.ceil(result / 60) + 'h' : result != 0 ? result + 'm' : 'just now';
  return result;
}

export const TweetCard = (props) => {
  // console.log(props.values, 'tweet');
  const { user } = useSelector((state) => state.user);
  const time = dateDiffInDays(new Date(), new Date(props?.values?.createdAt));
  let dispatch = useDispatch();

  return (
    <div className="flex border border-[#808080] p-[1em] ">
      <div className="content flex gap-[0.5em] w-full">
        <Link to={'/profile'}>
          <div className="imgProfile">
            <img src={`${process.env.REACT_APP_API_URL}/UserProfile/${props.values?.User?.profilePicture || 'default.png'}`} alt={`${process.env.REACT_APP_API_URL}/UserProfile/default.png`} className="max-h-[3em]" />
          </div>
        </Link>
        <div className="contentCaption w-full">
          <Link to={`/details/${props?.values?.id}`}>
            <div className="profile flex justify-between w-[100%]">
              <div className="details flex gap-[0.3em] items-center text-[#808080]">
                <p className="font-bold dark:text-white">{props?.values?.User?.fullName || 'Your Fullname'}</p>
                {props?.values?.User?.official ? (
                  <div className="icon text-white">
                    <VerifiedRoundedIcon />
                    {/* {props.values.User.official} */}
                  </div>
                ) : (
                  ''
                )}
                <p>@{props?.values?.User?.username}</p>
                <p className="w-[5px] h-[5px]  rounded-full bg-[#808080]">{/* <FiberManualRecordRoundedIcon  /> */}</p>
                <p>{time}</p>
              </div>
              <div className="icon ">
                <MoreHorizRoundedIcon />
              </div>
            </div>
            <div className="caption text-left">{props?.values?.caption}</div>
            {props?.values?.media ? (
              <div className="image flex justify-center">
                <img className="max-h-[400px]" src={`${process.env.REACT_APP_API_URL}/tweetImages/${props?.values?.media}`} alt="" />
              </div>
            ) : (
              ' '
            )}
          </Link>
          <div className="buttons flex items-center justify-around relative">
            <div
              className="comment"
              onClick={() => {
                console.log(props.values.id);
                props.reply(props.values.id);
                props.modal(true);
              }}
            >
              <FaRegComment size={'17px'} />
            </div>
            <div className="retweet"></div>
            <div
              className="like"
              onClick={() => {
                console.log('like');
              }}
            >
              <FavoriteBorderOutlinedIcon fontSize="small" />
            </div>
            <div className="view flex gap-[1em] items-center">
              <BarChartOutlinedIcon fontSize="small" />
              <p className="text-sm">{props?.values?.viewed + 1}</p>
            </div>
            <div className="share"></div>
            {user.id == props.values.user_id ? (
              <div className="flex gap-3 absolute right-3">
                <div
                  className="update"
                  onClick={() => {
                    props.tweet(props.values);
                    props.modal(true);
                  }}
                >
                  <ModeEditOutlineOutlinedIcon />
                </div>
                <div
                  className="delete"
                  onClick={() => {
                    dispatch(deleteTweet({ id: props.values.id }));
                  }}
                >
                  <DeleteOutlinedIcon sx={{ color: 'darkred' }} />
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
