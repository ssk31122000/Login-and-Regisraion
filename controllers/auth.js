const mysql=require('mysql');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login=async(req,res)=>{
    try {
        const {email,password}= req.body;

        if(!email || !password){
            return res.status(400).render('login',{
                message:"Plaese provide email and password"
            });
        }

        db.query('SELECT * FROM users WHERE email=?',[email],async(error,results)=>{
            console.log(results);
            if(results.length==0){
                res.status(401).render('login',{
                    message:"Email or Password is incorrect"
                });
            }else if( !(await bcrypt.compare(password,results[0].password))){
                res.status(401).render('login',{
                    message:"Email or Password is incorrect"
                });
            }else{
                const id=results[0].id;

                const token=jwt.sign({id:id},process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_EXPIRES_IN
                });

                console.log('Te token is -'+ token);

                const cookieoptions={
                    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES *24*60*60*1000),
                    httpOnly: true  

                }
                res.render('dashbord',{
                    post:results[0]
                });
            }


        });
    } catch (error) {
        console.log(error);
    }
}

exports.register=(req,res)=>{
    console.log(req.body);
    
    const {name ,email, password, passwordConfirm,branch}=req.body;
    if(!email || !password || !name || !password || !branch){
        return res.status(400).render('register',{
            message:"Plaese provide all details"
        });
    }

    db.query('SELECT email FROM users WHERE email=?',[email],async(error,results)=>{
        if(error){
            console.log(error);
        }

        if(results.length>0){
            return res.render('register',{
                message: 'That Email is already in use'
            });
        }else if(password!==passwordConfirm){
            return res.render('register',{
                message: 'Passwords do not match'
            });
        }


        let hashedPassword=await bcrypt.hash(password,8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?',{name:name, email:email, password:hashedPassword, branch:branch},(error,results)=>{
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('register',{
                    message: 'User Registered'
                });
            }
        });

    });

}