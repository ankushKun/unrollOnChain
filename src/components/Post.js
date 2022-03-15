import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import baseApi from "../tools/baseApi";
import { TwitterTweetEmbed } from "react-twitter-embed";
function timeConverter(epochs) {
  var myDate = new Date(epochs / 1000000);
  //return myDate.toGMTString(); // Sun, 06 Feb 2022 09:12:49 GMT
  // return myDate.toString(); // 'Sun Feb 06 2022 14:42:49 GMT+0530 (India Standard Time)'
  return myDate.toLocaleString(); // '06/02/2022, 14:42:49'
}

function Post() {
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
      {data ? (
        <>
          <div className='flex justify-center my-6'>
            <div className=''>
              <div className='userCard flex'>
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
                    {timeConverter(data.TimestampNanos)}
                  </div>{" "}
                </div>
               {/*  <button className='button'>Claim this NFT</button> */}
              </div>
              <div className='my-7'>
                {threadPosts.map((post, index) => {
                  return (
                    <div key={index} className='threadText my-4'>
                      <div className='container max-w-3xl'>
                        <p className='text-xl'>{post}</p>
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
        </>
      ) : (
        <>Loading post ...</>
      )}
    </div>
  );
}

export default Post;
