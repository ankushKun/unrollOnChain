import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import baseApi from "../tools/baseApi";

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
    <div className='container justify-self-center py-3'>
      {data ? (
        <>
          <div className='VAlign'>
            <img
              className='avatar'
              src={data.PostExtraData.twitterPFP}
              alt='avatar'
            />
            <div className='HAlign'>
              <div className='username'>
                {data.PostExtraData.twitterUsername}
              </div>
              <div className='username'>{data.PostExtraData.twitterTag}</div>
              <div className='date'>{timeConverter(data.TimestampNanos)}</div>
            </div>
          </div>
          <div className='HAlign'>
            <br />
            <div className='postBody'>
              {threadPosts.map((post, index) => {
                return (
                  <div key={index}>
                    <div>{post}</div>
                    {listOfImages[index] !== "" ? (
                      <img
                        className='postImage'
                        src={listOfImages[index]}
                        alt='post-attachment'
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>Loading post ...</>
      )}
    </div>
  );

  // console.log(res.data.PostFound.Body);
}

export default Post;
