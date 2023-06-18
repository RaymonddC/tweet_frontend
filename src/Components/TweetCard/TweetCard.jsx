import React from 'react';

export const TweetCard = () => {
  return (
    <div className="flex border border-[#808080] ">
      <div className="imgProfile">
        <img src="" alt="" />
      </div>
      <div className="content w-full">
        <div className="profile flex justify-between w-[100%]">
          <div className="details flex">
            <p className="font-bold">Name</p> icon verified
            <p>username</p> icon titik
            <p>53m</p>
          </div>
          icon
        </div>
        <div className="caption text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae cum aspernatur ex ipsa blanditiis distinctio magni a eligendi, velit natus molestias accusantium reprehenderit voluptates veritatis corrupti quaerat dignissimos
          sequi obcaecati. Praesentium voluptate eaque, nam expedita sit sint odio nobis vel? Tempora accusantium incidunt porro nam autem illum atque commodi voluptas error ab aperiam quo totam quod blanditiis laudantium sint recusandae
          assumenda, id eius officia consequuntur? Voluptas iure doloribus voluptates impedit culpa consectetur ullam dolor dolores officia, odio fugiat, eos porro commodi rem suscipit nulla? Repellat quasi temporibus placeat repudiandae
          exercitationem eveniet hic, qui excepturi mollitia inventore dolores! Atque, quis excepturi!
        </div>
        <div className="image">
          <img src="" alt="" />
        </div>
        <div className="buttons flex">
          <div className="comment"></div>
          <div className="retweet"></div>
          <div className="like"></div>
          <div className="view"></div>
          <div className="share"></div>
        </div>
      </div>
    </div>
  );
};
