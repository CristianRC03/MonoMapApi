import { CaseModel } from "../../data/models/case-model"
import { ICaseDocument } from "../entities/case.entity"


export class CaseDataSource {

    public updateCase = async (id: String, caseData: Partial<ICaseDocument>) => {
        await CaseModel.findByIdAndUpdate(id, {
            lat: caseData.lat,
            lng: caseData.lng,
            isSent: caseData.isSent,
            genre: caseData.genre,
            age: caseData.age
        });
    }
}