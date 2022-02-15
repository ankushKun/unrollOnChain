import { useParams } from "react-router-dom";
import React from 'react';
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

    const params = useParams();
    const postHashHex = params.postHashHex;

    React.useEffect(() => {
        if (loading) {
            const getSinglePost = baseApi() + "get-single-post";
            const payload = {
                PostHashHex: postHashHex,
                ReaderPublicKeyBase58Check: "BC1YLhF5DHfgqM7rwYK8PVnfKDmMXyVeQqJyeJ8YGsmbVb14qTm123G"
            }
            axios.post(getSinglePost, payload)
                .then((res) => {
                    setData(res.data.PostFound);
                    console.log(data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err);

                })
        }
    }, [data, loading, postHashHex]);

    return (
        <div className="content">
            {data ? <>
                <div className="VAlign">
                    <img className="avatar" src={"https://bitclout.com/api/v0/get-single-profile-picture/" + data.PosterPublicKeyBase58Check + "?fallback=https://bitclout.com/assets/img/default_profile_pic.png"} alt="avatar" />
                    <div className="HAlign">
                        <div className="username">{data.ProfileEntryResponse.Username}</div>
                        <div className="date">{timeConverter(data.TimestampNanos)}</div>
                    </div>
                </div>
                <div className="HAlign">
                    <br />
                    <div className="postBody">
                        {data.Body}<br />
                        {data.ImageURLs ? <img className="postImage" src={data.ImageURLs[0]} alt="post-attachment" /> : <></>}
                    </div>
                </div>
            </>
                : <>Loading post ...</>}
        </div>
    )

    // console.log(res.data.PostFound.Body);
}

export default Post;