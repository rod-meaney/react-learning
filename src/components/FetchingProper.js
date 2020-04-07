
import { useState } from 'react'

const FetchingProper = (props) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  
  !(data || error) && fetch("http://worldtimeapi.org/api/timezone/"+props.location, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
      "Accept-Charset": "utf-8"
    }
  }).then(result => result.json()
  ).then(setData
  ).catch(setError);

  return data ? data.datetime : (error ? error : "loading");
}
export default FetchingProper;