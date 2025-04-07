import  jsonwebtoken  from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import clientsModel from "../models/Clients.js"
import { config } from "../config.js";

const registerClientsController = {};

registerClientsController.register = async (req, res) =>{
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    try{
        const existingClient = await clientsModel.findOne({email})
        if(existingClient){
            return res.json({message: "Client already exist"})
        }
        
        const passwordHash = bcryptjs.hash(password, 10)

        const newClient = new clientsModel({name, lastName, birthday, email, password: passwordHash, telephone, dui: dui || null, isVerified: isVerified || false});

        await newClient.save()

        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(

            {email, verificationCode},
            
            config.JWT.secret,

            {expiresIn: "2h"}
        )

        res.cookie("verificationToken", tokenCode, {maxAge: 2*60*60*1000})

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass
            }
        })

        const mailOptions ={
            from: config.email.email_user,
            to: email,
            subject: "Verificacion de correo",
            text: "Para verificar tu cuenta utiliza el siguiente codigo:" + verificationCode + "\n Experica en dos horas"
        };

        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                return res.json({message: "Error sending email"+ error})
            }
            console.log("Email send"+ info)
        })

        res.json({message: "Client registeres, Please verify your email with the code"})

    } 
    catch (error) {
        console.log("Error: "+ error)
    }
};

registerClientsController.verificationCodeEmail = async (req, res) => {
    const { requirecode } = req.body;
    const token = req.cookie.verificationCode;

    try {
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;

        if(requirecode !== storedCode){
            return res.json ({message: "Invalid code"})
        }
        const client = await clientsModel.findOne({email})
        client.isVerified = true;
        await client.save()

        res.clearCookie("verificationToken")

        res.json({message: "Email verified Successfuly"})


    } catch (error) {
        console.log("Error: " + error)
    }
}

export default registerClientsController;


