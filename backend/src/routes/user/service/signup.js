const express = require('express');
const router = express.Router();
const createPWD = require('../../../modules/createPWD');
const createToken = require('../../../middlewares/token').createToken;
const db = require('../../../sequelize/models/index');


router.post('/', async (req, res, next) => {
    try {
        let { user_id, user_pwd } = req.body;
        if (!user_id || !user_pwd) throw Error();
        await db.user.findOne({where: {id: user_id}})
        .then( async user =>{
            let newPWD = await createPWD(user_pwd);
            if(user.password !== newPWD) throw Error();
            const accessToken = createToken(user.id);
            res.cookie('user', accessToken);
            res.status(201).json({ok:true, message:"로그인에 성공하였습니다."});
        })
        .catch( err => {
            res.status(409).json({ok:false, message:"로그인에 실패하였습니다.."});
        })

    } catch (err) {
        res.status(400).json({ok:false, message:"제대로 작성하세여!"});
    }
});

module.exports = router;