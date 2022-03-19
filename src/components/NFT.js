import { useParams } from "react-router-dom";
import React from "react";
import logo from "../assets/unrollOnChainLogo.svg";
import axios from "axios";
import baseApi from "../tools/baseApi";
import { TwitterTweetEmbed } from "react-twitter-embed";
import {  Link } from 'react-router-dom';
import Loader from "./Loader";
function timeConverter(createdAt) {
  var respectiveDate = new Date(Date.parse(createdAt));
  var responseTime = "";
  responseTime += respectiveDate.toDateString();
  //get hoour
  var hour = respectiveDate.getHours();
  var minute = respectiveDate.getMinutes();
  // convert hour and minute into am or pm
  var ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  responseTime = responseTime + " " + hour + ":" + minute + ampm;
  return responseTime;
}

function NFT() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [threadPosts, setThreadPosts] = React.useState([]);
  const [listOfImages, setListOfImages] = React.useState([]);
  const params = useParams();
  const postHashHex = params.postHashHex;

  React.useEffect(() => {
    if (loading) {
      const getSinglePost = baseApi() + "get-single-post";
      const payload = {
        PostHashHex: postHashHex,
        ReaderPublicKeyBase58Check:
          "BC1YLhF5DHfgqM7rwYK8PVnfKDmMXyVeQqJyeJ8YGsmbVb14qTm123G",
      };
      axios
        .post(getSinglePost, payload)
        .then((res) => {
          setData(res.data.PostFound);
          const postBody = res.data.PostFound.Body;
          //split postBody by '\n\n\n\n\n'
          const tweetPosts = postBody.split("\n\n\n\n\n");
          setThreadPosts(tweetPosts);
          setListOfImages(res.data.PostFound.ImageURLs);
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data, loading, postHashHex]);

  return (
    <div className='container-sm my-4  px-3'>
      <nav id='header' className='w-full z-30 top-0  py-1'>
        <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-2 lg:py-6'>
          <div className='flex items-center'>
            <Link to = "/"
              className='no-underline flex hover:no-underline font-bold text-2xl lg:text-4xl'
              >
              
                
              <img src={logo} alt='logo' className='h-16 w-16' />
              <span className='mx-2 my-2'> Minted Tweets </span>
              </Link>
          </div>

          <div className='' id='nav-content'>
            <button
              onClick={()=>{ window.open("https://twitter.com/MintAsNFT", '_blank');}}
              id='navAction'
              className='mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded mt-4 lg:mt-0 py-2 px-6 shadow opacity-90'>
              Follow
            </button>
          </div>
        </div>
      </nav>
      {data ? (
        <>
          <div className='flex justify-center my-6'>
            <div className=''>
              <div className='grid grid-rows-1 grid-flow-col'>
                <a
                  className='userCard flex'
                  href={`https://twitter.com/${data.PostExtraData.twitterTag.slice(
                    1
                  )}`}
                  target='_blank'>
                  <div
                    className='profile-pic-container my-auto'
                    style={{
                      backgroundImage: `url(${data.PostExtraData.twitterPFP})`,
                      width: "50px",
                      height: "50px",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      borderRadius: "50%",
                      backgroundRepeat: "no-repeat",
                    }}></div>
                  <div className='mx-2'>
                    <div className='username font-bold'>
                      {data.PostExtraData.twitterUsername}
                    </div>
                    <div className='twitterTag font-medium text-blue-600 text-sm'>
                      {data.PostExtraData.twitterTag}
                    </div>
                    <div className='dateTweeted font-normal text-xs my-1'>
                      {timeConverter(data.PostExtraData.created_at)}
                    </div>{" "}
                  </div>
                </a>
                <div className='flex justify-end'>
                  <button className='font-bold py-2 px-2 my-2 rounded w-34 h-10 shadow hover:shadow-sm'>
                    Claim this NFT
                  </button>
                </div>{" "}
              </div>
              <div className='my-7'>
                {threadPosts.map((post, index) => {
                  return (
                    <div key={index} className='threadText my-4'>
                      <div className='container max-w-3xl'>
                        <p className='text-xl'>
                          {post.split("\n").map(function (item, idx) {
                            return (
                              <span key={idx}>
                                {item}
                                <br />
                              </span>
                            );
                          })}
                        </p>
                      </div>

                      {listOfImages[index] !== "" ? (
                        <div className='threadImage flex justify-center px-7 my-3  max-w-3xl'>
                          <img
                            className='object-cover rounded-lg shadow-sm'
                            src={listOfImages[index]}
                            alt='post'
                          />{" "}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='tweetContainer'>
            <TwitterTweetEmbed tweetId={data.PostExtraData.TweetID} />
          </div>
          <section className='bg-white border-b py-8'>
        <div className='container mx-auto flex flex-wrap pt-4 pb-12'>
          <h2 className='w-full my-2 text-4xl font-black leading-tight text-center text-gray-800'>
            More minted tweets of {data.PostExtraData.twitterTag}
          </h2>
          <div className='w-full mb-4'>
            <div className='h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
          </div>

          <div className='w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink'>
            <div className='flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow'>
              <a
                href='#'
                className='flex flex-wrap no-underline hover:no-underline'>
                <p className='w-full text-gray-600 text-xs md:text-sm px-6 mt-6'>
                  GETTING STARTED
                </p>
                <div className='w-full font-bold text-xl text-gray-800 px-6'>
                  Lorem ipsum dolor sit amet.
                </div>
                <p className='text-gray-600 text-base px-6 mb-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                </p>
              </a>
            </div>
            <div className='flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6'>
              <div className='flex items-center justify-start'>
                <button className='mx-auto lg:mx-0 hover:underline gradient2 text-gray-800 font-extrabold rounded my-6 py-4 px-8 shadow-lg'>
                  Read
                </button>
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink'>
            <div className='flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow'>
              <a
                href='#'
                className='flex flex-wrap no-underline hover:no-underline'>
                <p className='w-full text-gray-600 text-xs md:text-sm px-6 mt-6'>
                  GETTING STARTED
                </p>
                <div className='w-full font-bold text-xl text-gray-800 px-6'>
                  Lorem ipsum dolor sit amet.
                </div>
                <p className='text-gray-600 text-base px-6 mb-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                </p>
              </a>
            </div>
            <div className='flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6'>
              <div className='flex items-center justify-center'>
                <button className='mx-auto lg:mx-0 hover:underline gradient2 text-gray-800 font-extrabold rounded my-6 py-4 px-8 shadow-lg'>
                  Action
                </button>
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink'>
            <div className='flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow'>
              <a
                href='#'
                className='flex flex-wrap no-underline hover:no-underline'>
                <p className='w-full text-gray-600 text-xs md:text-sm px-6 mt-6'>
                  GETTING STARTED
                </p>
                <div className='w-full font-bold text-xl text-gray-800 px-6'>
                  Lorem ipsum dolor sit amet.
                </div>
                <p className=' text-gray-600 text-base px-6 mb-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                </p>
              </a>
            </div>
            <div className='flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6'>
              <div className='flex items-center justify-end'>
                <button className='mx-auto lg:mx-0 hover:underline gradient2 text-gray-800 font-extrabold rounded my-6 py-4 px-8 shadow-lg'>
                  Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      ) : (
        <Loader/>
      )}
    </div>
  );
}

export default NFT;
