import { Router } from "express";
import { CaseController } from "./controller";


export class CaseRoutes {
    static get routes() : Router {
        const router = Router();
        const caseController = new CaseController();

        router.post('/', caseController.createCase);
        router.get('/', caseController.getCases);
        router.get('/lastweek', caseController.getCasesInLastWeek);
        router.put('/:id', caseController.updateCase);
        router.delete('/:id', caseController.deleteCase);

        return router;
    }
}