alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#1234567890 "
key = "f7kDBnwcAep3SE&2FjzIh6liTOrVvgZMQ9G4Hmotx0NXsbKW5Pd#qa8uLUy1JR@CY"

const encryption=(s)=>{
    encrypt_s=""
    for(let c in s)
    {
        encrypt_s+=key.charAt(alphabet.indexOf(s.charAt(c)))
    }
    return encrypt_s
}

module.exports=encryption;