import { createClient } from '@supabase/supabase-js';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";
import { getPerformance } from "firebase/performance";

const SUPABASE_URL = 'https://uexpkvyhppcpxuhgbjxw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDY2NTExOCwiZXhwIjoxOTU2MjQxMTE4fQ.fgq8i0jvMRB0ppyPoLdIA8ga4YikAJoC1oV56ZY8ciE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const firebaseConfig = {
  apiKey: "AIzaSyAts-uqvZz_Vqw5gONZTwASjrf3XdG0Bxw",
  authDomain: "e-shopkart-6f9b9.firebaseapp.com",
  projectId: "e-shopkart-6f9b9",
  storageBucket: "e-shopkart-6f9b9.appspot.com",
  messagingSenderId: "882655056087",
  appId: "1:882655056087:web:b13b7a3567b6be92d92092",
  measurementId: "G-FHVPV1SYBF"
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
const perf = getPerformance(app);