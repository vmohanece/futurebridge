import UserModel from "../models/user.model.js";
import {uservalidate, userUpdatevalidate, userDeletevalidate} from "../validations/user.validation.js";

export class UserController {

    getUserList = (async (req, res)=>{
        const userList = await UserModel.find({active: true});
        if(!userList || userList.length == 0){
            return res.status(400).send({
                err: true,
                message: "No records found",
            });
        }
        try {
            return res.status(200).send({
                err: false,
                data: userList,
                message: 'success'
            });
        } catch (error) {
            return res.status(500).send({
                err: true,
                message: 'Failed',
            });
        }
    });

    removeUser = (async (req, res)=>{

        try {
            const inData = await userDeletevalidate.validate(req.body);
            if(inData.error){
                return res.status(400).send({
                    err: true,
                    message: inData.error.message,
                });
            }
            const userList = await UserModel.findOne({_id: inData.value.id, active: true});
            if(!userList || userList.length == 0){
                return res.status(400).send({
                    err: true,
                    message: "No records found",
                });
            }
            const updateRecord = await UserModel.findOneAndUpdate({_id: userList._id}, {active: false});
            if(!updateRecord){
                return res.status(400).send({
                    err: true,
                    message: 'Failed to update'
                });
            }
            return res.status(200).send({
                err: false,
                message: 'success'
            });

        } catch (error) {
            return res.status(500).send({
                err: true,
                message: 'Failed',
            });
        }
    });

    storeUser = (async (req, res)=>{
        try {
            const inData = await uservalidate.validate(req.body);
            if(inData.error){
                return res.status(400).send({
                    err: true,
                    message: inData.error.message,
                });
            }
            const emailExists = await UserModel.findOne({email: inData.value.email});
            if(emailExists){
                return res.status(400).send({
                    err: true,
                    message: 'Email exists!'
                });
            }
            const result = await UserModel.create(inData.value);
            if(!result){
                return res.status(400).send({
                    err: true,
                    message: 'failed to insert'
                });
            }
            return res.status(200).send({
                err: false,
                message: 'success'
            });
        } catch (error) {
            return res.status(500).send({
                err: true,
                message: 'Failed',
            });
        }
    });

    updateUser = (async (req, res)=>{
        
        try {
            const inData = await userUpdatevalidate.validate(req.body);
            if(inData.error){
                return res.status(400).send({
                    err: true,
                    message: inData.error.message,
                });
            }
            const result = inData.value;
            const dataExists = await UserModel.findOne({_id: result.id});
            if(!dataExists){
                return res.status(400).send({
                    err: true,
                    message: 'No records found'
                });
            }
            delete result.id;
            const updateRecord = await UserModel.findOneAndUpdate({_id: dataExists._id}, result);
            if(!updateRecord){
                return res.status(400).send({
                    err: true,
                    message: 'Failed to update'
                });
            }
            return res.status(200).send({
                err: false,
                message: 'success'
            });
        } catch (error) {
            return res.status(500).send({
                err: true,
                message: error+'Failed',
            });
        }
    });
}
const userController = new UserController();
export default userController;