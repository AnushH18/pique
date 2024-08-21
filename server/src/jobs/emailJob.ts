import { Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queues.js";
import { Job } from "bullmq";
import { sendEmail } from "../config/mail.js";


export const emailQueueName = "emailQueue"

interface EmailJobDataType {
    to: string,
    subject: string,
    body: string
}

export const emailQueue = new Queue(emailQueueName, {
    connection:redisConnection,
    defaultJobOptions:defaultQueueOptions
})


export const queueWorker = new Worker(emailQueueName, async (job:Job) => {
    const data:EmailJobDataType = job.data
    await sendEmail(data.to , data.subject, data.body)
    console.log("The queue data is", data)
},
{
    connection:redisConnection,
})