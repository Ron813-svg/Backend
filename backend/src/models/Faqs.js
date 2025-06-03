import { Schema, model } from "mongoose"

const faqsSchema = new Schema ({
    question: {
        type: String,
        required: true,
        minLegth: 4,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        minLegth: 4,
        trim: true
    },
    level: {
        type: Number,
        min: 1,
        max: 5,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
}, {
    timestamps: true,
    strict: false
})

export default model("faqs", faqsSchema)