import { createClient } from '@supabase/supabase-js';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";

const SUPABASE_URL = 'https://uexpkvyhppcpxuhgbjxw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDY2NTExOCwiZXhwIjoxOTU2MjQxMTE4fQ.fgq8i0jvMRB0ppyPoLdIA8ga4YikAJoC1oV56ZY8ciE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const firebaseConfig = {
    apiKey: "AIzaSyCiv3KGEDCmBH1teBINVTWVXb0G40GqSe8",
    authDomain: "e-shopkart-c1aa4.firebaseapp.com",
    projectId: "e-shopkart-c1aa4",
    storageBucket: "e-shopkart-c1aa4.appspot.com",
    messagingSenderId: "543058318115",
    appId: "1:543058318115:web:135ba8cc5eadfa4f7ff296",
    measurementId: "G-KFGSG0ZSNM"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 0;
remoteConfig.defaultConfig = {
  "discount": 50
};
export {remoteConfig};