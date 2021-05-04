import Tea from './encryptionService';

const tokenKey = "token";

export async function authenticate(username, password){
    const registeredUser = await findOne(username);
    if (registeredUser !== null) {
        console.log(`Email address exists`);
        if (password !== registeredUser.password){
            console.log("Wrong password!");
            throw 'Wrong cridentials provided!';
        }
    
        registeredUser.loginKey = generateJWTLike(registeredUser);
        localStorage.setItem('user-'+username, JSON.stringify(registeredUser));
        console.log("JWTlike is: "+registeredUser.loginKey);
        login(registeredUser.loginKey);
        return true;
    } else {
        throw 'Not found user';
    }

}


export function generateJWTLike(user){
    const encKey = 'key';
    const encBody = {'username':user.username, "first_name":user.first_name, "last_name":user.last_name};
    return Tea.encrypt(JSON.stringify(encBody), encKey);
}


export function getCurrentUser(){
    try{
        const JWTlike = localStorage.getItem(tokenKey);
        return JSON.parse(Tea.decrypt(JWTlike, "key"));    
    }catch( ex ){
        return false;
    }
    
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function login(token){
    localStorage.setItem(tokenKey, token);
}

export function register(user){
    console.log("Do Registration");

    user.loginKey = generateJWTLike(user);
    localStorage.setItem('user-'+user.username, JSON.stringify(user));
    
    login(user.loginKey);

    return true;
    //JSON.parse(localStorage.getItem('user'))
}

export function findOne(username){
    try{
        const foundUser =  localStorage.getItem('user-'+username);
        return JSON.parse(foundUser);
    }catch( ex ){
        return false;
    }
    
}

export default {
    login,
    logout,
    authenticate,
    getCurrentUser,
    generateJWTLike,
    register,
    findOne
}
