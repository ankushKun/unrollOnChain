import logo from "../assets/unrollOnChainLogo.svg";
import { Link } from "react-router-dom";

import timeConverter from "../tools/functions";
import DesoApi from "../../src/tools/desoAPI";
import { useState, useEffect } from "react";
import Loader from "./Loader";
export default function Home(props) {
  const [isLoadingRecentTweets, setIsLoadingRecentTweets] = useState(true);
  const [latestMintedPosts, setLatestMintedPosts] = useState(null);
  const initLatestMintedTweets = async () => {
    try {
      const da = new DesoApi();

      const latestMints = await da.getPostsForPublicKey("MintedTweet");

      setLatestMintedPosts(latestMints["Posts"]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    setIsLoadingRecentTweets(true);
    await initLatestMintedTweets();
    console.log("all loading done...");
    setIsLoadingRecentTweets(false);
  }, []);
  return (
    <div className='gradient leading-relaxed tracking-wide flex flex-col'>
      <nav id='header' className='w-full z-30 top-0  py-1 lg:py-6'>
        <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-2 lg:py-6'>
          <div className='flex items-center'>
            <Link
              to='/'
              className='no-underline flex hover:no-underline font-bold text-2xl lg:text-4xl'
              href='#'>
              <img src={logo} alt='logo' className='h-16 w-16' />
              <span className='mx-2 my-2'> Minted Tweets </span>
            </Link>
          </div>

          <div className='' id='nav-content'>
            <button
              id='navAction'
              className='mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded mt-4 lg:mt-0 py-4 px-8 shadow opacity-80'>
              Follow
            </button>
          </div>
        </div>
      </nav>

      <div className='container mx-auto py-20'>
        <div className='text-center px-3 lg:px-0'>
          <h1 className='my-4 text-2xl md:text-3xl lg:text-6xl font-black leading-tight'>
            Monetize and Own Tweets like never before.
          </h1>
          <p className='leading-normal text-gray-800 text-base md:text-xl lg:text-2xl mb-8'>
            Mint, unroll and monetize tweets by simply tagging @mintAsNFT!
          </p>
          <p className='leading-normal text-gray-800 text-base md:text-xl lg:text-2xl mb-8'>
            No gas. No bullshit. Only Ownership 🔑
          </p>

          <button className='mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded my-2 md:my-6 py-4 px-8 shadow-lg w-70'>
            Continue with Twitter{" "}
          </button>
          <a
            href='/'
            className='inline-block mx-auto lg:mx-0 hover:underline bg-transparent text-gray-600 font-extrabold my-2 md:my-6 py-2 lg:py-4 px-8'>
            View Market place
          </a>
        </div>
      </div>

      <section className='bg-white border-b py-8'>
        <div className='container mx-auto flex flex-wrap pt-4 pb-12'>
          <h2 className='w-full my-2 text-5xl font-black leading-tight text-center text-gray-800'>
            Latest Minted Tweets and Threads
          </h2>
          <div className='w-full mb-4'>
            <div className='h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
          </div>
        </div>
        {isLoadingRecentTweets ? (
          <Loader />
        ) : (
          <div className='container mx-auto flex flex-wrap pt-4 pb-12'>
            {latestMintedPosts.map((post, index) => {
              return (
                <div className='w-full md:w-1/2 lg:w-1/3 p-4 ' key={index}>
                  <div className='bg-white rounded-lg shadow-lg '>
                    <div className='container'>
                      <a className='flex profileSection flex-wrap p-6'
                      target={'_blank'}
                      href = {`https://twitter.com/${post.PostExtraData.twitterTag.slice(1)}`}>
                        <div className='w-50 h-50 rounded-full'>
                          <img
                            className='w-50 h-50 w-full object-cover object-center  rounded-full'
                            src={post.PostExtraData.twitterPFP}
                            alt='post'
                          />
                        </div>
                        <div className='mx-2'>
                          <div className='username font-bold'>
                            {post.PostExtraData.twitterUsername}
                          </div>
                          <div className='twitterTag font-medium text-blue-600 text-sm'>
                            {post.PostExtraData.twitterTag}
                          </div>
                        </div>
                      </a>

                      <div className='flex flex-wrap justify-center align-text-bottom'>
                        <div className='flex justify-center'>
                          <div className='text-gray-800 text-sm'>
                            {timeConverter(post.PostExtraData.created_at)}
                          </div>
                        </div>
                      </div>
                      <div className='px-6 py-6 flex justify-center overflow-hidden container-md h-56'>
                        <div className='text-slate-800 text-xl mb-2'>
                          {post.Body}
                        </div>
                      </div>

                      <div className='flex justify-center mt-auto  rounded-b rounded-t-none overflow-hidden shadow '>
                        <div className='flex items-center justify-center'>
                          <Link
                            to={`/NFT/${post.PostHashHex}`}
                            className='mx-auto lg:mx-0 hover:underline gradient2 text-gray-800 font-extrabold rounded my-6 py-4 px-8 shadow-lg '>
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

{
  /*
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
</div> */
}
