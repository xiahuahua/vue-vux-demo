import jsonp from '../utils/jsonp'
import {commonParams, options, baseURL} from './config'

import axios from 'axios';
import qs from 'qs';



export function getRecommend() {
  const url = baseURL.param + '/xqjyw/zixun/getLanmulistPage'
console.log(url)
  const data = Object.assign({}, commonParams, {
    page: '1',
    rows: '10',
  })

  axios.post('http://www.xyz.com/request', qs.stringify(params))
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });

  return jsonp(url, data, options)
}
