import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import baseApi from "../tools/baseApi";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";
function timeConverter(epochs) {
  var myDate = new Date(epochs / 1000000);
  return myDate.toGMTString(); // Sun, 06 Feb 2022 09:12:49 GMT
  // return myDate.toString(); // 'Sun Feb 06 2022 14:42:49 GMT+0530 (India Standard Time)'
  // return myDate.toLocaleString(); // '06/02/2022, 14:42:49'
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
    <div className='container my-2'>
      {data ? (
        <>
          <div className=''>
            <div className='container'>
              <div>
                <div className='d-flex'>
                  <div className='  align-self-center'>
                    <div
                      style={{
                        backgroundImage: `url(${data.PostExtraData.twitterPFP})`,
                        width: "50px",
                        height: "50px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        borderRadius: "50%",
                        backgroundRepeat: "no-repeat",
                      }}></div>
                  </div>
                  <div className='mx-3'>
                    <p className='username my-2'>
                      {data.PostExtraData.twitterUsername}
                    </p>

                    <div className='twitterTag'>
                      <i className='fas fa-twitter icon'> </i>
                      {data.PostExtraData.twitterTag}
                    </div>
                    <div className='dateTweeted'>
                      {timeConverter(data.TimestampNanos)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='contanier my-4'>
              {threadPosts.map((post, index) => {
                return (
                  <div key={index} className='container my-3'>
                    <p className='threadText'>{post}</p>
                    {listOfImages[index] !== "" ? (
                      <div className='d-flex justify-content-center '>
                        <div className='threadImage'>
                          <img
                            className='img-fluid threadImg justify-self-center'
                            src={listOfImages[index]}
                            alt='post'
                          />{" "}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className='tweetContainer'>
              <TwitterTweetEmbed tweetId={data.PostExtraData.TweetID} />
            </div>
          </div>
        </>
      ) : (
        <>Loading post ...</>
      )}
    </div>
  );
}

export default Post;
