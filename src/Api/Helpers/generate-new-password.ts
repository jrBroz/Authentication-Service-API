export function generateNewPassword() : string {

    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const integers = "0123456789";
    const exCharacters = "!@#$*_-=+";
    let newpassword = '';
    
    for(let i = 0; i < 3; i++) {

        let randomNumber = Math.floor(Math.random() * 10);

        newpassword += alpha[Math.floor(Math.random() * alpha.length)];
        newpassword += integers.at(randomNumber);
        newpassword += exCharacters.at(randomNumber);
    }
    console.log(newpassword); // debug remove later
    return newpassword;
}