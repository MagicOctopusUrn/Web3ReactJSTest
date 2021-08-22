

import axios from 'axios';

export function sendRequest(query) {
    return new Promise((resolve, reject) => {
        axios.post("https://graphql.bitquery.io/",
            {
                query: query,
                variables: "{}"
            },
            {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'X-API-KEY': 'BQYdMnpwa4GiX08y5v94MI6CxgXE1xjI',
                },
            })
            .then(json => {
                resolve(json.data)
            })
            .catch(() => {
                reject()
            })
    })
}

export function getBalanceQuery(address){
    return `
      {
        ethereum(network: bsc) {
          address(address: {is: "${address}"}) {
            balances {
              currency {
                address
                name
                symbol
              }
              value
            }
          }
        }
      }
    `
  }