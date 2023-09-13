export interface CognitoIdentityToken {
    at_hash: string;
    sub: string;
    email_verified: boolean;
    iss: string;
    'cognito:username': string;
    oringin_jti: string;
    aud: string;
    event_id: string;
    token_use: string;
    auth_time: number;
    exp: number;
    iat: number;
    jti: string;   
    email: string;
}

/*
{
  at_hash: 'E8-cBzMdrB30yGT8og9acQ',
  sub: 'c498d458-70b1-7071-eb34-b269954de60f',
  email_verified: true,
  iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_NYQZdi7Ww',
  'cognito:username': 'vaninv_test',
  origin_jti: '9111cfdd-fec9-4e56-bae6-d021b17305fe',
  aud: 'q8k92hbp77bnins1j4icfvddr',
  event_id: 'bfc5c762-dc40-48f7-bfb2-683d9449cf4b',
  token_use: 'id',
  auth_time: 1693925236,
  exp: 1693928836,
  iat: 1693925236,
  jti: '1b34fd95-4871-4605-95d0-27ecd0272e9c',
  email: 'useremail@gmail.com'
}
*/