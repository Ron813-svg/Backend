import faqsModel from '../models/Faqs.js'

const faqsController = {}

faqsController.get = async (req, res) => {
    try {
        const faqs = await faqsModel.find()
        res.json(faqs)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

faqsController.post = async (req, res) => {
    const { question, answer, level, isActive } = req.body

    try {
        if (!question || !answer || !level || !isActive) {
            return res.status(400).json({ error: 'Question and answer are required' })
        } 
        if( level < 1 || level > 5) {
            return res.status(400).json({ error: 'Level must be between 1 and 5' })

        }
        const newFaq = new faqsModel ({ question, answer, level, isActive})
        await newFaq.save();

        res.status(201).json(newFaq)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

faqsController.put = async (req, res) => {
    try {
        const { id } = req.params
        const { question, answer, level, isActive } = req.body

        if( level < 1 || level > 5) {
            return res.status(400).json({ error: 'Level must be between 1 and 5' })

        }

        const updatedFaq = await faqsModel.findByIdAndUpdate(id, { question, answer, level, isActive }, { new: true })
        if (!updatedFaq) {
            return res.status(404).json({ error: 'FAQ not found' })
        }
        res.json(updatedFaq)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

faqsController.delete = async (req, res) => {
    try {
        const { id } = req.params
        const deletedFaq = await faqsModel.findByIdAndDelete(id)
        if (!deletedFaq) {
            return res.status(404).json({ error: 'FAQ not found' })
        }
        res.json({ message: 'FAQ deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default faqsController