import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import passport from 'passport'
import { User } from '../models/user.model.js';


export const connectPassport = ()=>{

    // console.log(process.env.GOOGLE_CLIENT_ID ,  process.env.GOOGLE_CLIENT_SECRET);

    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:process.env.GOOGLE_CALLBACK_URL,
    }, async function(accessToken, refreshToken, profile, done){

        // Database:

        const user = await User.findOne({
            googleId:profile.id,
        })

        if(!user){
            const newUser = await User.create({
                googleId:profile.id,
                name:profile.displayName,
                photo:profile.photos[0].value,
            })

            return done(null, newUser);

        }else{
            return done(null, user);
        }


    }));

    passport.serializeUser((user,done)=>{
        done(null, user.id);
    })

    passport.deserializeUser(async (id, done)=>{
        const user = await User.findById(id);
        done(null, user);
    })
}

