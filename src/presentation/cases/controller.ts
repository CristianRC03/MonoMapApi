import { Request, Response } from "express";
import { caseModel } from "../../data/models/case-model";


export class CaseController {

    public createCase = async (req: Request, res: Response) => {
        try {
            const { lat, lng, genre, age } = req.body;
            const newCase = await caseModel.create({
                lat,
                lng,
                genre,
                age
            });

            return res.json(newCase);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public getCases = async (req: Request, res: Response) => {
        try {
            const cases = await caseModel.find();
            return res.json(cases);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public getCasesInLastWeek = async (re: Request, res: Response) => {
        try {
            const today = new Date();
            const sevenDaysBefore = new Date();
            sevenDaysBefore.setDate(today.getDate() - 7);
            sevenDaysBefore.setTime(0);
            const cases = await caseModel.
                                    find({ creationDate: { $gte: sevenDaysBefore, $lte: today } }).
                                    sort({ creationDate: 1 });
            return res.json(cases);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public updateCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { lat, lng, genre, age } = req.body;
            const updatedCase = await caseModel.findByIdAndUpdate(id, {
                lat,
                lng,
                genre,
                age
            })

            res.json(updatedCase);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public deleteCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedCase = await caseModel.findByIdAndDelete(id);

            return res.json(deletedCase);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}