import registerModel from '../models/Register.js';
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from '../config.js';

const registerController = {};

registerController.Register = async (req, res) => {
    const {name , lastName, birthday, email, address, password, hireDate, telephone, dui, isVerifield, issNumber } = req.body;
    try{
        const existeEmployee = await EmployeeModel.findOne({email})
        if(existeEmployee){
            return res.status(400).json({message: "El email ya se encuentra registrado"})
        }

        const passwordHash = await bcryptjs.hash(password,10)

        const newEmployee = await EmployeeModel({name , lastName, birthday, email, address, password: passwordHash, hireDate, telephone, dui, isVerifield, issNumber })

        await newEmployee.save()
        
    } catch(error){
        console.log(error)
        res.status(500).json({message: "Hubo un error en el registro"})
    }
}