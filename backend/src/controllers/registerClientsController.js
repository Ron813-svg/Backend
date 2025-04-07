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
        
        const passwordHash = await bcryptjs.hash(password, 10)

        const newClient = new clientsModel({name, lastName, birthday, email, password: passwordHash, telephone, dui: dui || null, isVerified: isVerified || false});

        await newClient.save()

        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(

            {email, verificationCode},
            

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

        const mailOptions = {
            from: config.email.email_user,
            to: email,
            subject: "Verificación de correo",
            html: `
                <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden; border: 2px solid #ffb3ff; font-family: Arial, sans-serif;">
                    <div style="background-color: #ffccf9; color: #6a0572; text-align: center; padding: 20px; font-size: 24px; font-weight: bold;">
                        🌸 Verificación de Correo 🌸
                    </div>
                    <div style="padding: 20px; color: #333333; line-height: 1.6;">
                        <p>Hola,</p>
                        <p>¡Gracias por registrarte! Para verificar tu cuenta, utiliza el siguiente código:</p>
                        <div style="display: block; margin: 20px auto; padding: 10px 20px; background-color: #ffe6fa; color: #6a0572; font-size: 20px; font-weight: bold; text-align: center; border-radius: 8px; border: 1px dashed #ffb3ff; width: fit-content;">
                            ${verificationCode}
                        </div>
                        <p>Este código expirará en 2 horas.</p>
                        <p>Si no solicitaste este correo, por favor ignóralo.</p>
                    </div>
                    <div style="background-color: #ffe6fa; text-align: center; padding: 10px; font-size: 12px; color: #6a0572;">
                        🌸 Con cariño, el equipo de [Tu Empresa] 🌸
                    </div>
                </div>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({ message: "Error sending email: " + error });
            }
            console.log("Email sent: " + info.response);
        });

        res.json({message: "Client register, Please verify your email with the code"})

    } 
    catch (error) {
        console.log("Error: "+ error)
    }
};

registerClientsController.verificationCodeEmail = async (req, res) => {
    const { requirecode } = req.body;
    const token = req.cookie.verificationCode;

    try {
        console.log("JWT Secret:", config.JWT.secret);
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
