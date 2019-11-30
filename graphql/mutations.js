import {request} from 'graphql-request';

const API = 'https://daydrink.herokuapp.com/v1/graphql';

export const voteOnDeal = ({dealId, upvoted, userId}, userDeal) => {
    if (userDeal) {
        const updateUserDealMutation = `mutation updateUserDeal($upvoted: Boolean!, $dealId: uuid!, $userId: String!) {
            update_user_deal(where: {
                dealId: {_eq: $dealId},
                userId: {_eq: $userId}},
                _set: {upvoted: $upvoted}
            ){
                returning {
                  upvoted
                }
            }
          }
        `;

        return request(API, updateUserDealMutation, {
            dealId,
            upvoted,
            userId
        });
    }

    const insertUserDealMutation = `mutation insertUserDeal($upvoted: Boolean!, $dealId: uuid!, $userId: String!) {
        insert_user_deal(objects: {
            upvoted: $upvoted,
            dealId: $dealId,
            userId: $userId
        }) {
            returning {
              id
            }
        }
      }
    `;

    return request(API, insertUserDealMutation, {
        dealId,
        upvoted,
        userId
    });
};
