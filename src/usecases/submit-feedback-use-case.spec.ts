import {SubmitFeedbackUseCase} from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn()
const sendEmailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase({
    create: createFeedbackSpy
}, {
    sendMail: sendEmailSpy
})

describe("submit-feedback-use-case test", () => {


    it("should be able to submit a feedback ", async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "comment",
            screenshot: "data:image/png;base64"
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendEmailSpy).toHaveBeenCalled()
    })


    it("should not be able to submit a feedback whithout a type", async () => {

        await expect(submitFeedback.execute({
            type: "",
            comment: "comment",
            screenshot: "data:image/png;base64"
        })).rejects.toThrow();
    })

    it("should not be able to submit a feedback whithout a comment", async () => {

        await expect(submitFeedback.execute({
            type: "type",
            comment: "",
            screenshot: "data:image/png;base64"
        })).rejects.toThrow();
    })

    it("should not be able to submit a feedback with a invalid screenshot", async () => {

        await expect(submitFeedback.execute({
            type: "type",
            comment: "qweqwe",
            screenshot: "dqwe"
        })).rejects.toThrow();
    })
})