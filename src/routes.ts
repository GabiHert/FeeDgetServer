import express from "express"
import {prisma} from "./prisma";
import nodemailer from "nodemailer"
import {SubmitFeedbackUseCase} from "./usecases/submit-feedback-use-case";
import {PrismaFeedbacksRepository} from "./repositories/prisma/prisma-feedbacks-repository";
import {NodemailerMailAdapter} from "./adapters/nodemailer/nodemailer-mail-adapter";

export const routes = express.Router()


routes.post("/feedbacks", async (req, res) => {
    console.log("Got req")
    const {type, comment, screenshot} = req.body
    console.log(screenshot)
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter)

    await submitFeedbackUseCase.execute({type, comment, screenshot})

    return res.status(201).send()
})
